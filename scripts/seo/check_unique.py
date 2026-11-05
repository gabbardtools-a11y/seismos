#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Проверка уникальности 33 SEO-страниц между собой по 5-словным шинглам."""
import json
import re
from pathlib import Path
from itertools import combinations

ROOT = Path('/home/z/my-project')
KERNEL = ROOT / 'scripts/seo/kernel.json'

with open(KERNEL, encoding='utf-8') as f:
    kernel = json.load(f)

pages = [p for p in kernel['stage1'] if not p.get('exists')]

# Извлечём чистый текст из каждого файла .ts (без HTML, без TypeScript-обвязки)
def extract_text(slug: str) -> str:
    f = ROOT / 'src/content/seo' / f'{slug}.ts'
    raw = f.read_text(encoding='utf-8')
    # Уберём TypeScript-импорт и объявление типа
    raw = re.sub(r'^import.*$', '', raw, flags=re.MULTILINE)
    raw = re.sub(r'^export const.*?:\s*SeoContent\s*=\s*\{', '', raw, flags=re.MULTILINE)
    # Извлечём только содержимое строк (между кавычками)
    strings = re.findall(r'"((?:[^"\\]|\\.)*)"', raw, re.DOTALL)
    text = ' '.join(strings)
    # Уберем HTML-теги
    text = re.sub(r'<[^>]+>', ' ', text)
    # Нормализуем пробелы и приведём к нижнему регистру
    text = re.sub(r'\s+', ' ', text).strip().lower()
    # Уберем пунктуацию кроме дефисов
    text = re.sub(r'[^\w\s-]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# Сохраним тексты
texts = {}
for p in pages:
    texts[p['slug']] = extract_text(p['slug'])

# Shingles по 5 слов
def shingles(text: str, k: int = 5) -> set:
    words = text.split()
    if len(words) < k:
        return {text}
    return {' '.join(words[i:i+k]) for i in range(len(words) - k + 1)}

sh = {slug: shingles(text) for slug, text in texts.items()}

# Сравним все пары
print('=== Попарная уникальность (Jaccard similarity, %) ===')
print(f'{"slug1":45} {"slug2":45} {"sim%":>6}')
worst = []
for s1, s2 in combinations(pages, 2):
    a, b = sh[s1['slug']], sh[s2['slug']]
    if not a or not b:
        continue
    inter = len(a & b)
    union = len(a | b)
    sim = (inter / union * 100) if union else 0
    if sim > 5:  # Покажем только пары с похожестью >5%
        worst.append((s1['slug'], s2['slug'], sim))

worst.sort(key=lambda x: -x[2])
for s1, s2, sim in worst[:15]:
    print(f'{s1[:45]:45} {s2[:45]:45} {sim:5.2f}%')

print(f'\nВсего пар с похожестью >5%: {len(worst)}')
print(f'Средняя уникальность по {len(pages)} страницам: {(100 - sum(s for _,_,s in worst)/max(1,len(worst))):.2f}% (для пар >5%)')

# Дополнительно: сравним с эталоном seismo_sertifikat
print('\n=== Сравнение с эталоном /seismo_sertifikat ===')
ref_path = ROOT / 'src/app/seismo_sertifikat/page.tsx'
ref_raw = ref_path.read_text(encoding='utf-8')
ref_raw = re.sub(r'^import.*$', '', ref_raw, flags=re.MULTILINE)
ref_raw = re.sub(r'^export.*$', '', ref_raw, flags=re.MULTILINE)
# Извлечём текст из JSX
ref_text = re.sub(r'<[^>]+>', ' ', ref_raw)
ref_text = re.sub(r'\{[^}]*\}', ' ', ref_text)
ref_text = re.sub(r'[^\w\s-]', ' ', ref_text)
ref_text = re.sub(r'\s+', ' ', ref_text).strip().lower()
ref_sh = shingles(ref_text)

for slug in texts:
    a, b = sh[slug], ref_sh
    inter = len(a & b)
    union = len(a | b)
    sim = (inter / union * 100) if union else 0
    if sim > 3:
        print(f'  {slug[:60]:60} похожесть на эталон: {sim:.2f}%')
