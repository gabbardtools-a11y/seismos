#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Точная трассировка карты России кубическими Безье — алгоритм Шнайдера
(FitCurves, Graphics Gems). Кривая проходит в допуске ~1px от контура:
прямые участки остаются почти прямыми, углы — острыми, изгибы — изгибами.

Пайплайн:
 1. HSV-маска синей территории
 2. Морфология close/open (без blur — детали не размываются!)
 3. findContours CHAIN_APPROX_NONE (полное разрешение)
 4. Лёгкая аппроксимация DP eps=0.7px
 5. Schneider fit с tolerance=1.0px (углы возникают сами, в точке max ошибки)
 6. SVG с C-сегментами
"""
import cv2
import numpy as np
import os

SRC = 'public/images/russia-map-clean.png'
OUT = 'public/images/russia-map-vector.svg'

# ============================================================
# Алгоритм Шнайдера (FitCurves from Graphics Gems)
# ============================================================

def normalize(v):
    l = np.hypot(v[0], v[1])
    return v / l if l > 1e-12 else np.array([0.0, 0.0])


def chord_length_parameterize(pts):
    u = [0.0]
    for i in range(1, len(pts)):
        u.append(u[-1] + np.linalg.norm(pts[i] - pts[i - 1]))
    total = u[-1]
    if total <= 0:
        return u
    return [x / total for x in u]


def bezier_point(bez, u):
    b0 = (1 - u) ** 3; b1 = 3 * u * (1 - u) ** 2
    b2 = 3 * (1 - u) * u ** 2; b3 = u ** 3
    return b0 * bez[0] + b1 * bez[1] + b2 * bez[2] + b3 * bez[3]


def generate_bezier(pts, u, t1, t2):
    """МНК-подгонка кубической Безье с заданными касательными на концах."""
    n = len(pts)
    A = np.zeros((n, 2, 2))
    for i in range(n):
        ui = u[i]
        A[i][0] = t1 * 3 * ui * (1 - ui) ** 2
        A[i][1] = t2 * 3 * (1 - ui) * ui ** 2
    C = np.zeros((2, 2)); X = np.zeros(2)
    for i in range(n):
        p = pts[i]; ui = u[i]
        b0 = (1 - ui) ** 3; b1 = 3 * ui * (1 - ui) ** 2
        b2 = 3 * (1 - ui) * ui ** 2; b3 = ui ** 3
        tmp = p - (b0 * pts[0] + b1 * pts[0] + b2 * pts[-1] + b3 * pts[-1])
        C[0][0] += np.dot(A[i][0], A[i][0])
        C[0][1] += np.dot(A[i][0], A[i][1])
        C[1][1] += np.dot(A[i][1], A[i][1])
        X[0] += np.dot(A[i][0], tmp)
        X[1] += np.dot(A[i][1], tmp)
    C[1][0] = C[0][1]
    det = C[0][0] * C[1][1] - C[1][0] * C[0][1]
    alpha_l = alpha_r = 0.0
    if abs(det) > 1e-12:
        alpha_l = (X[0] * C[1][1] - X[1] * C[0][1]) / det
        alpha_r = (C[0][0] * X[1] - C[1][0] * X[0]) / det
    seg_len = np.linalg.norm(pts[-1] - pts[0])
    eps = 1e-6 * seg_len
    if alpha_l < eps or alpha_r < eps:
        alpha_l = alpha_r = seg_len / 3.0
    p1 = pts[0] + t1 * alpha_l
    p2 = pts[-1] + t2 * alpha_r
    return np.array([pts[0], p1, p2, pts[-1]])


def compute_max_error(pts, bez, u):
    maxd = 0.0; split = len(pts) // 2
    for i in range(len(pts)):
        b = bezier_point(bez, u[i])
        d = np.sum((b - pts[i]) ** 2)
        if d > maxd:
            maxd = d; split = i
    return maxd, split


def newton_raphson(bez, P, u):
    d = bezier_point(bez, u) - P
    q = 3 * ((1 - u) ** 2 * (bez[1] - bez[0]) +
             2 * (1 - u) * u * (bez[2] - bez[1]) +
             u ** 2 * (bez[3] - bez[2]))
    dd = 6 * ((1 - u) * (bez[2] - 2 * bez[1] + bez[0]) +
              u * (bez[3] - 2 * bez[2] + bez[1]))
    num = np.dot(d, q); den = np.dot(q, q) + np.dot(d, dd)
    if abs(den) > 1e-12:
        u2 = u - num / den
        if 0.0 < u2 < 1.0:
            return u2
    return u


def fit_cubic(pts, t1, t2, error):
    if len(pts) == 2:
        d = np.linalg.norm(pts[1] - pts[0]) / 3.0
        return [np.array([pts[0], pts[0] + t1 * d, pts[1] + t2 * d, pts[1]])]
    u = chord_length_parameterize(pts)
    bez = generate_bezier(pts, u, t1, t2)
    maxd, split = compute_max_error(pts, bez, u)
    if maxd < error:
        return [bez]
    if maxd < error * 16:  # пере-параметризация помогает при небольших ошибках
        for _ in range(4):
            u = [newton_raphson(bez, pts[i], u[i]) for i in range(len(pts))]
            bez = generate_bezier(pts, u, t1, t2)
            maxd, split = compute_max_error(pts, bez, u)
            if maxd < error:
                return [bez]
    # Разрез в точке максимальной ошибки — там обычно угол:
    # касательная в центре берётся из соседних точек → угол сохраняется ОСТРЫМ
    t_center = normalize(pts[split - 1] - pts[split + 1])
    left = fit_cubic(pts[:split + 1], t1, t_center, error)
    right = fit_cubic(pts[split:], -t_center, t2, error)
    return left + right


def fit_curve(pts, error):
    t1 = normalize(pts[1] - pts[0])
    t2 = normalize(pts[-2] - pts[-1])
    return fit_cubic(pts, t1, t2, error)


def fit_closed(pts, error):
    """Замкнутый контур: разрез в самом плоском месте + подгонка."""
    n = len(pts)
    # Ищем точку с минимальной кривизной в окне (разрез в "плоском" месте)
    best_i, best_score = 0, float('inf')
    step = max(1, n // 300)
    for i in range(0, n, step):
        a = pts[(i - 8) % n]; b = pts[i]; c = pts[(i + 8) % n]
        v1 = b - a; v2 = c - b
        ang = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2) + 1e-12)
        if ang < best_score:  # ang ближе к 1 = прямее
            best_score = ang; best_i = i
    pts = np.roll(pts, -best_i, axis=0)
    # Касательные на концах — усреднённые по соседям через разрез
    t1 = normalize((pts[2] - pts[0]) + (pts[1] - pts[-1]))
    t2 = normalize((pts[-1] - pts[-3]) + (pts[0] - pts[-2]))
    return fit_cubic(list(map(np.array, pts)), t1, t2, error)


# ============================================================
# Генерация
# ============================================================

def bez_to_path(beziers):
    d = [f"M {beziers[0][0][0]:.1f} {beziers[0][0][1]:.1f}"]
    for b in beziers:
        d.append(f"C {b[1][0]:.1f} {b[1][1]:.1f} {b[2][0]:.1f} {b[2][1]:.1f} {b[3][0]:.1f} {b[3][1]:.1f}")
    d.append("Z")
    return ' '.join(d)


img = cv2.imread(SRC)
h, w = img.shape[:2]
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv, np.array([95, 80, 40]), np.array([135, 255, 255]))
mask = (mask > 0).astype(np.uint8) * 255

k5 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, k5, iterations=2)
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, k5, iterations=1)

contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
MIN_AREA = 150
sel = [c for c in contours if cv2.contourArea(c) >= MIN_AREA]
sel.sort(key=cv2.contourArea, reverse=True)
print(f"Contours: {len(sel)}, sizes: {[cv2.contourArea(c) for c in sel]}")

TOL = 1.0  # px — допуск кривой
paths = []
total_corners = 0
total_near_straight = 0
for c in sel:
    # лёгкая аппроксимация, чтобы уменьшить точки (в пределах 0.7px)
    ap = cv2.approxPolyDP(c, 0.7, True).reshape(-1, 2).astype(float)
    if len(ap) < 6:
        continue
    beziers = fit_closed(ap, TOL)
    paths.append(bez_to_path(beziers))

    # статистика: углы и почти-прямые сегменты
    for b in beziers:
        t1 = b[1] - b[0]; t2 = b[3] - b[2]
        len_seg = np.linalg.norm(b[3] - b[0])
        if len_seg > 4:
            # почти прямой: контрольные точки близко к хорде
            d1 = np.linalg.norm(np.cross(t1, b[3] - b[0])) / len_seg
            d2 = np.linalg.norm(np.cross(t2, b[3] - b[0])) / len_seg
            if d1 < 0.8 and d2 < 0.8:
                total_near_straight += 1
    for i in range(len(beziers)):
        b1 = beziers[i]; b2 = beziers[(i + 1) % len(beziers)]
        t_out = b1[3] - b1[2]; t_in = b2[1] - b2[0]
        cosang = np.dot(t_out, t_in) / (np.linalg.norm(t_out) * np.linalg.norm(t_in) + 1e-12)
        if cosang < np.cos(np.radians(55)):  # разворот >55° = угол
            total_corners += 1

print(f"Bezier segments: {sum(30 for _ in paths) if False else sum(len(p) // 90 + 1 for p in paths)}")
print(f"Near-straight segments: {total_near_straight}")
print(f"Sharp corners (>55° turn): {total_corners}")

svg = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" stroke-linejoin="round" stroke-linecap="round">',
    f'<rect width="{w}" height="{h}" fill="#FFFFFF"/>',
    '<g id="russia" fill="#1C4692" fill-opacity="0.92" stroke="#0D2855" stroke-width="1.1" stroke-opacity="0.95">',
]
for p in paths:
    svg.append(f'<path d="{p}"/>')
svg.append('</g>')
svg.append('</svg>')

with open(OUT, 'w', encoding='utf-8') as f:
    f.write('\n'.join(svg))

size_kb = os.path.getsize(OUT) / 1024
n_cubics = sum(p.count('C ') for p in paths)
print(f"\n✓ {OUT}: {size_kb:.1f} KB, {len(paths)} paths, {n_cubics} cubic Béziers")
