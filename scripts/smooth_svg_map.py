#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Гладкая SVG-карта России из russia-map-clean.png.

Пайплайн:
 1. HSV-маска синей территории
 2. Морфология: close/open → убрать ступеньки и шум
 3. Gaussian blur + threshold → сгладить контур на пиксельном уровне
 4. findContours → контуры
 5. approxPolyDP с МИНИМАЛЬНЫм epsilon (сохранить форму)
 6. Catmull-Rom → cubic Bézier: замкнутые ГЛАДКИЕ пути
 7. SVG с плавными путями (viewBox 1499x878 — как у JPG)
"""
import cv2
import numpy as np
from PIL import Image
import os

SRC = 'public/images/russia-map-clean.png'
OUT = 'public/images/russia-map-vector.svg'
PREVIEW = '/tmp/smooth_preview.png'

# ---------- 1. Загрузка и маска ----------
img = cv2.imread(SRC)
h, w = img.shape[:2]
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv, np.array([95, 80, 40]), np.array([135, 255, 255]))
mask = (mask > 0).astype(np.uint8) * 255

# ---------- 2. Морфология ----------
k5 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, k5, iterations=2)   # дыры/разрывы
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, k5, iterations=1)    # мелкий шум

# ---------- 3. Пиксельное сглаживание ----------
# blur → threshold: контур становится субпиксельно гладким
blur = cv2.GaussianBlur(mask, (9, 9), 0)
_, smooth = cv2.threshold(blur, 127, 255, cv2.THRESH_BINARY)

# Ещё один проход blur+threshold с бОльшим ядром — мягче края
blur2 = cv2.GaussianBlur(smooth, (13, 13), 0)
_, smooth2 = cv2.threshold(blur2, 127, 255, cv2.THRESH_BINARY)

# ---------- 4. Контуры ----------
contours, hierarchy = cv2.findContours(smooth2, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
print(f"Raw contours: {len(contours)}")

MIN_AREA = 300
selected = [c for c in contours if cv2.contourArea(c) >= MIN_AREA]
selected.sort(key=cv2.contourArea, reverse=True)
print(f"After area filter: {len(selected)}")

# ---------- 5. Щадящая аппроксимация ----------
# epsilon = 0.15% периметра (было 0.5%) — форма сохраняется почти точно
approxes = []
for c in selected:
    eps = 0.0015 * cv2.arcLength(c, True)
    ap = cv2.approxPolyDP(c, eps, True).reshape(-1, 2).astype(float)
    if len(ap) >= 4:
        approxes.append(ap)
print(f"Approx polygons: {[len(a) for a in approxes]}")


# ---------- 6. Catmull-Rom → cubic Bézier (замкнутый) ----------
def catmull_rom_closed_to_bezier(pts):
    """pts: (N,2) float. Возвращает SVG path d с C-сегментами."""
    n = len(pts)
    d = [f"M {pts[0][0]:.1f} {pts[0][1]:.1f}"]
    for i in range(n):
        p0 = pts[(i - 1) % n]
        p1 = pts[i]
        p2 = pts[(i + 1) % n]
        p3 = pts[(i + 2) % n]
        c1 = p1 + (p2 - p0) / 6.0
        c2 = p2 - (p3 - p1) / 6.0
        d.append(f"C {c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}")
    d.append("Z")
    return ' '.join(d)


paths = [catmull_rom_closed_to_bezier(a) for a in approxes]

# ---------- 7. SVG ----------
svg = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" stroke-linejoin="round" stroke-linecap="round">',
    f'<rect width="{w}" height="{h}" fill="#FFFFFF"/>',
    '<g id="russia" fill="#1C4692" fill-opacity="0.92" stroke="#0D2855" stroke-width="1.2" stroke-opacity="0.95">',
]
for p in paths:
    svg.append(f'<path d="{p}"/>')
svg.append('</g>')
svg.append('</svg>')
svg_text = '\n'.join(svg)

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(svg_text)

size_kb = os.path.getsize(OUT) / 1024
print(f"\n✓ {OUT}: {size_kb:.1f} KB, {len(paths)} smooth paths")

# ---------- 8. Проверка IoU ----------
svg_mask = np.zeros((h, w), dtype=np.uint8)
for a in approxes:
    cv2.fillPoly(svg_mask, [np.round(a).astype(np.int32)], 255)
# учтём, что Безье слегка отклоняется от полигона — но полигон уже очень близок
orig = (mask > 0)
new = (svg_mask > 0)
iou = np.logical_and(orig, new).sum() / np.logical_or(orig, new).sum()
print(f"IoU vs исходной маски: {iou:.3f}")

# ---------- 9. Превью: растеризуем SVG через OpenCV (полигоны) и сравним ----------
pv = img.copy()
cv2.polylines(pv, [np.round(a).astype(np.int32) for a in approxes], True, (0, 0, 255), 1)
cv2.imwrite(PREVIEW, pv)
print(f"Preview: {PREVIEW}")
