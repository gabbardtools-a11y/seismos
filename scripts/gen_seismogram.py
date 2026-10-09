"""
Генератор реалистичной сейсмограммы для SeismogramDivider.

Режим «тихо» — фоновый шум ±0.5 с редкими мелкими всплесками (амплитуда 2-4).
РЕЗКИЕ ПИКИ — как на реальном сейсмографе:
  - Большинство точек — мелкий шум вокруг базовой линии
  - В месте события: ОДИН резкий вертикальный скачок (точка вверх или вниз)
  - Затем 3-5 точек быстрого затухания с пилообразным откликом
  - Без синусоид — только ломаные линии

Формирует path-data для SVG viewBox 1600x40.
"""

import math
import random

# Воспроизводимость
random.seed(11)

WIDTH = 1600
BASELINE = 20
STEP = 1.5

# Мелкие события (тихий день): (start_x, amp, decay_pts)
# amp: 4.0–6.0 — слабые толчки (видимые на фоне, но не крупные)
# decay_pts: 2-4 — короткое затухание
EVENTS = [
    (160,  5.0, 3),    # заметный мелкий толчок
    (440,  4.0, 2),    # очень слабый
    (760,  6.0, 4),    # заметнее
    (1080, 4.5, 3),    # слабый
    (1380, 5.5, 3),    # заметный мелкий
]

# Сначала сгенерируем фоновый шум для всех точек
points = []
x = 0.0
while x <= WIDTH:
    # Фоновый шум ±0.5 — мелкая дрожь
    y = BASELINE + random.uniform(-0.5, 0.5)
    points.append((round(x, 2), round(y, 2)))
    x += STEP

# Теперь накладываем события — РЕЗКИЕ ПИКИ
for sx, amp, decay_pts in EVENTS:
    # Индекс точки, ближайшей к sx
    sx_idx = round(sx / STEP)
    if sx_idx >= len(points):
        continue

    # Направление пика (вверх или вниз) — случайно для каждого события
    sign = random.choice([-1, 1])

    # Сам пик — резкий вертикальный скачок в одной точке
    px, py = points[sx_idx]
    points[sx_idx] = (px, round(BASELINE + sign * amp, 2))

    # Отклик: пилообразное затухание (3-5 точек после пика)
    # Реальный сейсмограф: после пика — обратный выброс, затем затухающие осцилляции
    for i in range(1, decay_pts + 2):
        idx = sx_idx + i
        if idx >= len(points):
            break
        # Пилообразный отклик: чередование направления с убывающей амплитудой
        decay_amp = amp * (1 - i / (decay_pts + 2))
        # Чередуем знак для пилы
        osc_sign = -sign if (i % 2 == 1) else sign
        # Добавляем случайность в отклик
        noise = random.uniform(-0.3, 0.3)
        px, py = points[idx]
        points[idx] = (px, round(BASELINE + osc_sign * decay_amp * 0.7 + noise, 2))

    # Точка сразу после отклика — резкий возврат к базовой линии
    end_idx = sx_idx + decay_pts + 2
    if end_idx < len(points):
        px, py = points[end_idx]
        points[end_idx] = (px, round(BASELINE + random.uniform(-0.5, 0.5), 2))

# Ограничение амплитуды в пределах viewBox
points = [(px, max(8, min(32, py))) for px, py in points]

# Формирование path-data — без скруглений, только L (lineto)
parts = [f"M {points[0][0]} {points[0][1]}"]
for px, py in points[1:]:
    parts.append(f"L {px} {py}")

# Замыкаем до конца тайла (1600, 20)
parts.append(f"L {WIDTH} {BASELINE}")

path_data_tile = " ".join(parts)

# Дубликат со смещением +1600 для бесшовной прокрутки
parts2 = [f"M {WIDTH} {BASELINE}"]
for px, py in points[1:]:
    parts2.append(f"L {px + WIDTH} {py}")
parts2.append(f"L {WIDTH * 2} {BASELINE}")

path_data_dup = " ".join(parts2)

print("# Tile (0..1600):")
print(path_data_tile)
print()
print("# Duplicate (1600..3200):")
print(path_data_dup)
print()
print(f"# Total points per tile: {len(points)}")
print(f"# Mode: тихо (max amplitude ~3.5, фоновый шум ±0.5)")
print(f"# Sharp peaks at: {[e[0] for e in EVENTS]}")
