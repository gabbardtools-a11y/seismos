#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Создание OG-изображения 1200×630 для соцсетей.
Дизайн: тёмно-синий градиент, 3D-глобус с меридианами, текст СРОСС®.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

W, H = 1200, 630
OUT = '/home/z/my-project/public/og.png'

# Создаём изображение с тёмно-синим градиентом
img = Image.new('RGB', (W, H), '#001A33')
draw = ImageDraw.Draw(img)

# Градиент: от #001A33 (сверху) к #003366 (снизу)
for y in range(H):
    t = y / H
    r = int(0x00 + (0x00 - 0x00) * t)
    g = int(0x1A + (0x33 - 0x1A) * t)
    b = int(0x33 + (0x66 - 0x33) * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Шрифты
try:
    font_title = ImageFont.truetype('/usr/share/fonts/truetype/chinese/NotoSansSC-Bold.ttf', 96)
    font_sub = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 28)
    font_tag = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 22)
    font_small = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18)
except Exception as e:
    print(f'Font error: {e}')
    font_title = ImageFont.load_default()
    font_sub = ImageFont.load_default()
    font_tag = ImageFont.load_default()
    font_small = ImageFont.load_default()

# === 3D-глобус справа ===
CX, CY, R = 880, 315, 200  # центр и радиус глобуса

# Внешнее свечение
for i in range(20, 0, -1):
    alpha = int(15 * (1 - i/20))
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([CX-R-i*3, CY-R-i*3, CX+R+i*3, CY+R+i*3], fill=(91, 168, 219, alpha))
    img = Image.alpha_composite(img.convert('RGBA'), glow).convert('RGB')
    draw = ImageDraw.Draw(img)

# Сфера глобуса (заливка)
draw.ellipse([CX-R, CY-R, CX+R, CY+R], fill='#002A5C', outline='#5BA8DB', width=2)

# Меридианы (вертикальные эллипсы)
for rx in [R*0.3, R*0.6, R*0.9]:
    draw.ellipse([CX-rx, CY-R, CX+rx, CY+R], outline='#5BA8DB', width=1)

# Параллели (горизонтальные эллипсы)
for ry in [R*0.3, R*0.6, R*0.9]:
    draw.ellipse([CX-R, CY-ry, CX+R, CY+ry], outline='#5BA8DB', width=1)

# Экватор (ярче)
draw.ellipse([CX-R, CY-2, CX+R, CY+2], outline='#7FB9FF', width=2)

# Центральная ось
draw.line([(CX, CY-R), (CX, CY+R)], fill='#5BA8DB', width=1)

# Континенты — упрощённые точки (имитация суши)
import random
random.seed(42)
for _ in range(180):
    angle = random.uniform(0, 2 * math.pi)
    r = random.uniform(0, R * 0.85)
    px = CX + r * math.cos(angle)
    py = CY + r * math.sin(angle) * 0.9  # сплюснутость сферы
    # Проверяем, что точка внутри круга
    if (px - CX)**2 + (py - CY)**2 < R**2 * 0.95:
        size = random.randint(2, 4)
        draw.ellipse([px-size, py-size, px+size, py+size], fill='#5BA8DB')

# Красные маркеры землетрясений (3 точки)
for (mx, my) in [(CX-80, CY-40), (CX+30, CY+50), (CX-20, CY+80)]:
    # Пульсирующее кольцо
    draw.ellipse([mx-15, my-15, mx+15, my+15], outline='#C8102E', width=2)
    draw.ellipse([mx-12, my-12, mx+12, my+12], outline='#FF4444', width=1)
    # Центральная точка
    draw.ellipse([mx-5, my-5, mx+5, my+5], fill='#C8102E')

# === Текст слева ===
# СРОСС® (большой заголовок)
title = 'СРОСС'
# Измеряем ширину текста
bbox = draw.textbbox((0, 0), title, font=font_title)
tw = bbox[2] - bbox[0]
draw.text((80, 140), title, fill='#FFFFFF', font=font_title)
# ® маленьким шрифтом
draw.text((80 + tw + 8, 150), '®', fill='#5BA8DB', font=font_sub)

# Подзаголовок
draw.text((82, 260), 'СЕЙСМОБЕЗОПАСНОСТЬ', fill='#5BA8DB', font=font_sub)
draw.text((82, 300), 'СЕЙСМОЗАЩИТА', fill='#5BA8DB', font=font_sub)
draw.text((82, 340), 'СЕРТИФИКАЦИЯ', fill='#5BA8DB', font=font_sub)

# Третья строка — описание
draw.text((82, 410), 'Сейсмическая сертификация и испытания', fill='#FFFFFF', font=font_tag)
draw.text((82, 442), 'зданий, сооружений, оборудования и материалов', fill='#FFFFFF', font=font_tag)

# SDG 11 бейдж внизу
draw.text((82, 540), '🜨  Международный проект · Устойчивое развитие ООН (SDG 11)', fill='#7FB9FF', font=font_small)

# Домен внизу справа
draw.text((950, 580), 'seismos.ru', fill='#5BA8DB', font=font_tag)

# Сохраняем
img.save(OUT, 'PNG', optimize=True)
print(f'✓ {OUT}: {os.path.getsize(OUT) / 1024:.1f} KB')
print(f'  Размер: {W}×{H}')
