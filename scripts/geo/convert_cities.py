#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Конвертер GeoNames cities500 → компактный JSON для поиска ближайшего города.

Источники (скачиваются в /tmp):
  - cities500.txt — 236k городов с населением ≥500
  - countryInfo.txt — коды стран → названия
  - admin1CodesASCII.txt — коды регионов → названия

Выход: public/data/cities.json
"""
import json
import math
from pathlib import Path

ROOT = Path('/home/z/my-project')
OUT = ROOT / 'public/data/cities.json'

# === Чтение стран ===
countries = {}
with open('/tmp/countryInfo.txt', encoding='utf-8') as f:
    for line in f:
        if line.startswith('#') or not line.strip():
            continue
        parts = line.split('\t')
        if len(parts) >= 5:
            code, name = parts[0], parts[4]
            countries[code] = name

print(f'Стран загружено: {len(countries)}')

# === Чтение регионов (admin1) ===
admin1 = {}
with open('/tmp/admin1Codes.txt', encoding='utf-8') as f:
    for line in f:
        parts = line.split('\t')
        if len(parts) >= 2:
            code, name = parts[0], parts[1]
            admin1[code] = name

print(f'Регионов загружено: {len(admin1)}')

# === Чтение городов ===
cities_raw = []
with open('/tmp/geonames/cities500.txt', encoding='utf-8') as f:
    for line in f:
        parts = line.rstrip('\n').split('\t')
        if len(parts) < 15:
            continue
        try:
            lat = float(parts[4])
            lon = float(parts[5])
        except (ValueError, IndexError):
            continue
        feature_class = parts[6]
        country_code = parts[8]
        admin1_code = parts[10] if len(parts) > 10 else ''
        population = int(parts[14]) if parts[14].isdigit() else 0

        # Только населённые пункты (P) с населением ≥ 1000
        if feature_class != 'P':
            continue
        if population < 1000:
            continue

        name = parts[1]  # name (локализованное, обычно латиница или родной алфавит)
        # Для стран СНГ/Восточной Европы пытаемся найти русское название.
        # Логика: среди alternatenames ищем кириллическое, предпочтение —
        # самое длинное (обычно это полный русский вариант, а не краткая
        # транскрипция типа «Маскав», «Мəскəү»).
        if country_code in ('RU', 'BY', 'UA', 'KZ', 'KG', 'UZ', 'TJ', 'TM', 'AM', 'AZ', 'GE', 'MD'):
            alts = parts[3].split(',')
            ru_candidates = []
            for a in alts:
                if not a or len(a) < 2:
                    continue
                # Только русская кириллица + пробел/дефис/точка
                if all(c in 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя -.' for c in a):
                    ru_candidates.append(a)
            if ru_candidates:
                # Берём самое длинное — обычно это полный русский вариант
                name = max(ru_candidates, key=len)
            else:
                # Fallback: любой кириллический
                ru_name = next((a for a in alts if a and any('\u0400' <= c <= '\u04ff' for c in a)), None)
                if ru_name:
                    name = ru_name

        cities_raw.append({
            'lat': lat,
            'lon': lon,
            'name': name,
            'country': country_code,
            'admin1': admin1_code,
            'pop': population,
        })

print(f'Городов загружено: {len(cities_raw)}')

# === Сортировка по населению (desc) ===
cities_raw.sort(key=lambda c: -c['pop'])

# === Создание индексов названий ===
names_list = []
names_idx = {}
countries_list = []
countries_idx = {}
admin1_list = []
admin1_idx = {}

def get_name_id(name):
    if name not in names_idx:
        names_idx[name] = len(names_list)
        names_list.append(name)
    return names_idx[name]

def get_country_id(code):
    if code not in countries_idx:
        countries_idx[code] = len(countries_list)
        countries_list.append(countries.get(code, code))
    return countries_idx[code]

def get_admin1_id(country_code, admin1_code):
    if not admin1_code:
        return -1
    full_code = f'{country_code}.{admin1_code}'
    name = admin1.get(full_code, admin1_code)
    if name not in admin1_idx:
        admin1_idx[name] = len(admin1_list)
        admin1_list.append(name)
    return admin1_idx[name]

# === Сборка компактного массива ===
cities_compact = []
for c in cities_raw:
    lat_int = int(round(c['lat'] * 1000))
    lon_int = int(round(c['lon'] * 1000))
    name_id = get_name_id(c['name'])
    country_id = get_country_id(c['country'])
    admin1_id = get_admin1_id(c['country'], c['admin1'])
    cities_compact.append([lat_int, lon_int, name_id, country_id, admin1_id])

# === Сохранение ===
OUT.parent.mkdir(parents=True, exist_ok=True)
data = {
    'cities': cities_compact,
    'names': names_list,
    'countries': countries_list,
    'admin1': admin1_list,
    '_meta': {
        'count': len(cities_compact),
        'source': 'GeoNames cities500',
        'note': 'lat/lon × 1000 (int). Поиск ближайшего через haversine.',
        'generated': '2026-11-05',
    },
}

OUT.write_text(json.dumps(data, ensure_ascii=False), encoding='utf-8')
size_mb = OUT.stat().st_size / 1024 / 1024
print(f'\n✓ {OUT}')
print(f'  Размер: {size_mb:.2f} МБ')
print(f'  Городов: {len(cities_compact)}')
print(f'  Уникальных названий: {len(names_list)}')
print(f'  Стран: {len(countries_list)}')
print(f'  Регионов: {len(admin1_list)}')

# === Тест: ближайший город к координатам ===
def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    p1 = math.radians(lat1)
    p2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlam = math.radians(lon2 - lon1)
    a = math.sin(dphi/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dlam/2)**2
    return 2*R*math.atan2(math.sqrt(a), math.sqrt(1-a))

tests = [
    (53.04, 158.65, 'Петропавловск-Камчатский (Камчатка)'),
    (35.6, 139.7, 'Токио'),
    (38.3, 141.8, 'У берегов Японии (Тохоку)'),
    (55.75, 37.62, 'Москва'),
    (-33.45, -70.66, 'Сантьяго, Чили'),
]

for lat, lon, label in tests:
    best = None
    best_dist = float('inf')
    for c in cities_compact[:20000]:  # топ-20k по населению
        clat = c[0] / 1000
        clon = c[1] / 1000
        d = haversine(lat, lon, clat, clon)
        if d < best_dist:
            best_dist = d
            best = c
    if best:
        name = names_list[best[2]]
        country = countries_list[best[3]]
        region = admin1_list[best[4]] if best[4] >= 0 else ''
        print(f'  {label}: {name}, {region}, {country} ({best_dist:.0f} км)')
