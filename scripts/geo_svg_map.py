#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
НАСТОЯЩАЯ карта России и соседей из географических данных Natural Earth 50m.
Один набор данных → идеальные стыки границ. Россия NE включает Крым.

Проекция Меркатора, viewBox 1499x1000, lon 19°E..192°E, lat 35°N..82°N.
Столицы — из реальных координат, SMIL-пульсация колец.
"""
import json
import numpy as np
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

RU_JSON = 'public/data/russia-regions.json'  # не используется, оставлено для истории
NE_JSON = '/tmp/ne50.geojson'
OUT = 'public/images/russia-map-vector.svg'
PREVIEW = '/tmp/geo_render.svg'

# ---------- Проекция Меркатора ----------
VW, VH = 1499, 1000
LON0, LON1 = 19.0, 192.0
LAT0, LAT1 = 35.0, 82.0

D2R = np.pi / 180.0
S = VW / ((LON1 - LON0) * D2R)                      # px на радиан
MERC_TOP = np.log(np.tan(np.pi / 4 + LAT1 * D2R / 2))
MERC_BOT = np.log(np.tan(np.pi / 4 + LAT0 * D2R / 2))


def project(lon, lat):
    x = (lon * D2R - LON0 * D2R) * S
    y = (MERC_TOP - np.log(np.tan(np.pi / 4 + lat * D2R / 2))) * S
    return x, y


# ---------- Россия: готовый полигон из NE50 (гладкий, включает Крым) ----------
with open(NE_JSON) as f:
    ne = json.load(f)

from shapely.geometry import Polygon
from shapely.validation import make_valid
BBOX = Polygon([(LON0 - 5, LAT0 - 5), (LON1 + 5, LAT0 - 5),
                (LON1 + 5, LAT1 + 5), (LON0 - 5, LAT1 + 5)])

EAEU_CIS = {'Kazakhstan', 'Belarus', 'Armenia', 'Kyrgyzstan', 'Uzbekistan',
            'Turkmenistan', 'Tajikistan', 'Georgia'}

ne_russia = None
eaeu_geoms, other_geoms = [], []
for f in ne['features']:
    admin = f['properties'].get('ADMIN', '')
    g = shape(f['geometry'])
    try:
        g = make_valid(g)
    except Exception:
        continue
    if not g.intersects(BBOX):
        continue
    if admin == 'Russia':
        ne_russia = g
        continue
    g = g.simplify(0.6 / S * D2R, preserve_topology=True)
    if admin in EAEU_CIS:
        eaeu_geoms.append(g)
    else:
        other_geoms.append(g)

# Россия: упрощение тоньше, чем соседи (главная страна)
russia = ne_russia.simplify(0.45 / S * D2R, preserve_topology=True)
print(f"Russia union: {russia.geom_type}, parts={len(russia.geoms) if russia.geom_type == 'MultiPolygon' else 1}")
print(f"Neighbors: EAEU/CIS={len(eaeu_geoms)}, others={len(other_geoms)}")


# ---------- Геометрия → SVG path ----------
def geom_to_path(g, clip_tol=0.01, min_area_px=25):
    """MultiPolygon/Polygon → список path d (в пикселях проекции).
    Отбрасывает острова меньше min_area_px и всё вне viewBox."""
    polys = g.geoms if g.geom_type == 'MultiPolygon' else [g]
    paths = []
    for poly in polys:
        rings = [poly.exterior] + list(poly.interiors)
        sub = []
        for ring in rings:
            pts = [project(x, y) for x, y in ring.coords]
            if len(pts) < 3:
                continue
            # площадь кольца в px² (abs; внешние +, дыры -)
            a = 0.0
            for i in range(len(pts) - 1):
                x1, y1 = pts[i]; x2, y2 = pts[i + 1]
                a += x1 * y2 - x2 * y1
            a = abs(a) / 2
            if a < min_area_px:
                continue
            # clip до viewBox с полем
            if (max(x for x, _ in pts) < -clip_tol * VW or
                    min(x for x, _ in pts) > VW * (1 + clip_tol) or
                    max(y for _, y in pts) < -clip_tol * VH or
                    min(y for _, y in pts) > VH * (1 + clip_tol)):
                continue
            d = 'M ' + ' L '.join(f'{x:.1f} {y:.1f}' for x, y in pts) + ' Z'
            sub.append(d)
        if sub:
            paths.append(' '.join(sub))
    return paths


ru_paths = geom_to_path(russia)
eaeu_paths = [p for g in eaeu_geoms for p in geom_to_path(g)]
other_paths = [p for g in other_geoms for p in geom_to_path(g)]
print(f"SVG paths: RU={len(ru_paths)}, EAEU={len(eaeu_paths)}, others={len(other_paths)}")

# ---------- Столицы ----------
CAPITALS = [
    ('Москва', 55.7558, 37.6173),
    ('Минск', 53.9006, 27.5590),
    ('Астана', 51.1694, 71.4491),
    ('Ереван', 40.1792, 44.4991),
    ('Бишкек', 42.8746, 74.5698),
    ('Душанбе', 38.5598, 68.7870),
    ('Ташкент', 41.2995, 69.2401),
    ('Ашхабад', 37.9601, 58.3261),
    ('Тбилиси', 41.7151, 44.8271),
]

cap_svg = []
for i, (name, lat, lon) in enumerate(CAPITALS):
    x, y = project(lon, lat)
    if not (0 <= x <= VW and 0 <= y <= VH):
        print(f"  ! {name} вне viewBox: {x:.0f},{y:.0f}")
    cap_svg.append(f'''<g id="cap-{i}">
  <circle cx="{x:.1f}" cy="{y:.1f}" r="7" fill="none" stroke="#C8102E" stroke-width="1.6" opacity="0.45">
    <animate attributeName="r" values="7;17;7" dur="2.2s" repeatCount="indefinite" begin="{i * 0.25:.2f}s"/>
    <animate attributeName="opacity" values="0.55;0;0.55" dur="2.2s" repeatCount="indefinite" begin="{i * 0.25:.2f}s"/>
  </circle>
  <circle cx="{x:.1f}" cy="{y:.1f}" r="5.5" fill="#C8102E" stroke="#FFFFFF" stroke-width="1.4"/>
  <rect x="{x - len(name) * 5.6 - 9:.1f}" y="{y - 36:.1f}" width="{len(name) * 11.2 + 18:.1f}" height="24" rx="4" fill="#003366" opacity="0.92"/>
  <text x="{x:.1f}" y="{y - 18.5:.1f}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" fill="#FFFFFF" letter-spacing="0.4">{name}</text>
</g>''')

# ---------- Сборка SVG ----------
svg = [f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VW} {VH}" stroke-linejoin="round" stroke-linecap="round">
<rect width="{VW}" height="{VH}" fill="#FFFFFF"/>''']

# прочие соседи (бледные)
svg.append('<g id="other-neighbors" fill="#DCE5EF" stroke="#B7C6D9" stroke-width="1">')
for p in other_paths:
    svg.append(f'<path d="{p}"/>')
svg.append('</g>')

# соседи ЕАЭС/СНГ
svg.append('<g id="eaeu-neighbors" fill="#9DB8D4" stroke="#7FA0C0" stroke-width="1">')
for p in eaeu_paths:
    svg.append(f'<path d="{p}"/>')
svg.append('</g>')

# Россия
svg.append('<g id="russia" fill="#1C4692" stroke="#142F63" stroke-width="1.2">')
for p in ru_paths:
    svg.append(f'<path d="{p}"/>')
svg.append('</g>')

# столицы
svg.append('<g id="capitals">' + '\n'.join(cap_svg) + '</g>')
svg.append('</svg>')

svg_text = '\n'.join(svg)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write(svg_text)
import os
print(f"\n✓ {OUT}: {os.path.getsize(OUT) / 1024:.1f} KB")
print(f"  Масштаб: {S:.1f} px/рад, 1° долготы = {S * D2R:.1f} px")
