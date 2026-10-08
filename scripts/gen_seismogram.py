"""
Генератор реалистичной сейсмограммы для SeismogramDivider.

Формирует path-data для SVG viewBox 1600x40:
- Базовая линия y=20
- Случайные события (P-волна → S-волна → экспоненциальное затухание)
- Между событиями — слабый фоновый шум ±0.5

Вывод: path-data строка для одного тайла шириной 1600 единиц.
Затем дублируется со смещением +1600 для бесшовной прокрутки.
"""

import math
import random

# Воспроизводимость
random.seed(42)

WIDTH = 1600
BASELINE = 20
STEP = 2  # шаг по x

# События: (start_x, p_amp, s_amp, decay_length)
# Разные амплитуды для реалистичности
EVENTS = [
    (120, 1.5, 5, 60),     # малое событие
    (380, 2.0, 9, 80),     # среднее событие
    (650, 2.5, 14, 100),   # сильное событие
    (920, 1.2, 4, 50),     # малое
    (1100, 1.8, 8, 70),    # среднее
    (1340, 2.2, 12, 90),   # сильное
]

# Генерация точек
points = []
x = 0
while x <= WIDTH:
    y = BASELINE

    # Фоновый шум (очень слабый)
    y += random.uniform(-0.4, 0.4)

    # Сумма вкладов от всех событий в этой точке
    for sx, p_amp, s_amp, decay in EVENTS:
        dx = x - sx
        if dx < 0:
            continue

        if dx < 15:
            # P-волна: быстрая малая осцилляция
            phase = dx / 15 * math.pi * 4
            y += math.sin(phase) * p_amp * (dx / 15)
        elif dx < 25:
            # Переход P→S
            t = (dx - 15) / 10
            phase = (dx - 15) / 10 * math.pi * 2
            y += math.sin(phase) * s_amp * 0.3 * t
        else:
            # S-волна с экспоненциальным затуханием
            t = dx - 25
            decay_factor = math.exp(-t / decay)
            # Несколько частот для естественности
            phase1 = t / 8 * math.pi * 2
            phase2 = t / 13 * math.pi * 2
            osc = math.sin(phase1) * 0.7 + math.sin(phase2) * 0.3
            y += osc * s_amp * decay_factor

    # Ограничение амплитуды в пределах viewBox
    y = max(2, min(38, y))

    points.append((x, round(y, 2)))
    x += STEP

# Формирование path-data
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
