#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генератор контента для drip-страниц.

Находит все content-файлы в src/content/seo/, которые ещё являются
заглушками (содержат строку "drip-publish заглушка"), и для каждой
вызывает LLM для генерации полного контента (10 000 ± 1 000 символов).

Использование:
  python3 scripts/seo/gen_content.py                # все заглушки
  python3 scripts/seo/gen_content.py --limit 10     # только 10
  python3 scripts/seo/gen_content.py --slug XYZ     # конкретная страница

Этот скрипт запускается ПОСЛЕ drip_publish.py — он наполняет заглушки
реальным контентом.
"""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path('/home/z/my-project')
KERNEL = ROOT / 'scripts/seo/kernel.json'
CONTENT_DIR = ROOT / 'src/content/seo'

STUB_MARKER = "drip-publish заглушка"


def find_stubs() -> list[str]:
    """Находит все slug, чьи content-файлы ещё заглушки."""
    stubs = []
    for f in CONTENT_DIR.glob('*.ts'):
        if STUB_MARKER in f.read_text(encoding='utf-8'):
            stubs.append(f.stem)
    return stubs


def get_meta(slug: str) -> dict:
    """Достаёт метаданные страницы из kernel.json."""
    kernel = json.loads(KERNEL.read_text(encoding='utf-8'))
    for p in kernel.get('stage1', []) + kernel.get('drip', []):
        if p['slug'] == slug:
            return p
    return {'slug': slug, 'title': slug, 'primary_kw': slug, 'cluster': 'misc'}


def build_prompt(meta: dict) -> str:
    """Формирует промпт для LLM.
    
    Возвращает инструкцию: сгенерировать TypeScript-файл с контентом
    в формате SeoContent, 10 000 ± 1 000 символов, уникальность 90%+.
    """
    slug = meta['slug']
    title = meta['title']
    primary = meta['primary_kw']
    secondary = meta.get('secondary_kw', '')
    cluster = meta.get('cluster', 'misc')
    canonical_to = meta.get('canonical_to')
    export_name = f"pageContent_{slug.replace('-', '_')}"
    
    return f"""Ты пишешь SEO-контент для страницы сайта СРОСС® (сейсмическая сертификация, Россия).

ЗАДАЧА: создай TypeScript-файл с уникальным контентом 10 000 ± 1 000 символов.

Страница:
- slug: {slug}
- title: {title}
- primary_kw: {primary}
- secondary_kw: {secondary}
- cluster: {cluster}

Требования:
1. Простой разговорный русский, без канцелярита и ИИ-шаблонов
2. Главный ключ в первых 100 словах и 2-3 раза в SEO-абзаце
3. 5-7 секций с разными H2, 3-5 FAQ, таблица хотя бы в 1-2 секциях
4. Конкретные примеры (реальные объекты, цены, ГОСТы, кейсы)
5. Уникальность 90%+ — разные вступления, примеры, цены, госты

Формат вывода — ТОЛЬКО TypeScript-файл, без пояснений:

```typescript
import type {{ SeoContent }} from "@/components/site/seo-page";

export const {export_name}: SeoContent = {{
  intro: "<p>...</p>",
  sections: [
    {{ id: "...", title: "...", body: "<p>...</p>" }},
    // 5-7 секций
  ],
  faq: [
    {{ q: "...", a: "..." }},
    // 3-5 вопросов
  ],
  seoParagraph: "<p>...</p>",
  ctaTitle: "...",
  ctaText: "...",
}};
```

ВАЖНО:
- body — HTML-строка (теги <p>, <strong>, <ul><li>, <h3>, <table>)
- Все теги закрыты, НЕТ JSX-синтаксиса (className, {{/* */}})
- Длина 10 000 ± 1 000 символов (считай пробелы)

Напиши ТОЛЬКО содержимое .ts файла, без markdown-обёртки.
"""


def call_llm(prompt: str) -> str | None:
    """Вызывает z-ai chat для генерации контента."""
    try:
        result = subprocess.run(
            ['z-ai', 'chat', '-p', prompt, '-o', '/tmp/_gen_content.json'],
            capture_output=True, text=True, timeout=300
        )
        if result.returncode != 0:
            print(f'  ! z-ai error: {result.stderr[:200]}')
            return None
        d = json.load(open('/tmp/_gen_content.json'))
        content = d.get('choices', [{}])[0].get('message', {}).get('content', '')
        
        # Извлечь TypeScript из markdown-обёртки если есть
        # Ищем ```typescript ... ``` или ``` ... ```
        m = re.search(r'```(?:typescript|ts)?\s*\n(.*?)\n```', content, re.DOTALL)
        if m:
            return m.group(1).strip()
        # Иначе берём весь контент
        return content.strip()
    except Exception as e:
        print(f'  ! LLM call failed: {e}')
        return None


def validate_content(text: str, slug: str) -> tuple[bool, str]:
    """Простейшая валидация сгенерированного контента."""
    export_name = f"pageContent_{slug.replace('-', '_')}"
    if f"export const {export_name}" not in text:
        return False, f"нет экспорта {export_name}"
    if "SeoContent" not in text:
        return False, "нет типа SeoContent"
    if 'className' in text:
        return False, "найден JSX (className)"
    if text.count('<p>') != text.count('</p>'):
        return False, f"несбалансированы <p>: {text.count('<p>')} vs {text.count('</p>')}"
    if text.count('<table>') != text.count('</table>'):
        return False, f"несбалансированы <table>"
    
    # Длина (без HTML и TypeScript-обвязки)
    plain = re.sub(r'<[^>]+>', ' ', text)
    plain = re.sub(r'\s+', ' ', plain).strip()
    if len(plain) < 8000:
        return False, f"слишком коротко: {len(plain)} символов (нужно 9000+)"
    if len(plain) > 13000:
        return False, f"слишком длинно: {len(plain)} символов (нужно <12000)"
    
    return True, f"OK ({len(plain)} символов)"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--limit', type=int, default=0, help='Сколько заглушек обработать (0=все)')
    ap.add_argument('--slug', type=str, default='', help='Конкретный slug')
    args = ap.parse_args()

    if args.slug:
        stubs = [args.slug] if (CONTENT_DIR / f'{args.slug}.ts').exists() else []
    else:
        stubs = find_stubs()
    
    if args.limit > 0:
        stubs = stubs[:args.limit]
    
    if not stubs:
        print('Заглушек не найдено — все страницы уже с контентом.')
        return
    
    print(f'Найдено заглушек: {len(stubs)}')
    print(f'Список: {stubs}')
    print()
    
    ok_count = 0
    fail_count = 0
    for slug in stubs:
        meta = get_meta(slug)
        print(f'--- {slug} ---')
        print(f'  title: {meta["title"]}')
        
        prompt = build_prompt(meta)
        content = call_llm(prompt)
        if not content:
            print('  ✗ LLM не вернул контент')
            fail_count += 1
            continue
        
        valid, msg = validate_content(content, slug)
        if not valid:
            print(f'  ✗ Валидация: {msg}')
            fail_count += 1
            continue
        
        # Сохраняем
        out = CONTENT_DIR / f'{slug}.ts'
        out.write_text(content + '\n', encoding='utf-8')
        print(f'  ✓ Сохранён: {msg}')
        ok_count += 1
    
    print(f'\nИТОГО: ok={ok_count}, fail={fail_count}, всего={len(stubs)}')


if __name__ == '__main__':
    main()
