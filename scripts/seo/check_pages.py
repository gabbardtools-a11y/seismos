#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Массовая проверка всех 33 SEO-страниц этапа 1."""
import json
import re
import subprocess
import time
from pathlib import Path

ROOT = Path('/home/z/my-project')
KERNEL = ROOT / 'scripts/seo/kernel.json'

with open(KERNEL, encoding='utf-8') as f:
    kernel = json.load(f)

pages = [p for p in kernel['stage1'] if not p.get('exists')]
print(f'Проверяю {len(pages)} страниц...\n')

results = []
ok = 0
fail = 0
for i, p in enumerate(pages, 1):
    slug = p['slug']
    url = f'http://localhost:3000/{slug}'
    # Первый запрос — компиляция (может быть долгим)
    if i <= 3:
        timeout = 60
    else:
        timeout = 30
    
    try:
        r = subprocess.run(
            ['curl', '-s', '-o', '/tmp/_p.html', '-w', '%{http_code}|%{size_download}|%{time_total}',
             '--max-time', str(timeout), url],
            capture_output=True, text=True
        )
        parts = r.stdout.split('|')
        code = parts[0] if parts else '000'
        size = int(parts[1]) if len(parts) > 1 else 0
        t = float(parts[2]) if len(parts) > 2 else 0
        
        if code == '200' and size > 5000:
            # Извлечём текст и посчитаем длину
            html = Path('/tmp/_p.html').read_text(encoding='utf-8', errors='ignore')
            text = re.sub(r'<[^>]+>', ' ', html)
            text = re.sub(r'\s+', ' ', text).strip()
            text_len = len(text)
            
            # Проверим наличие ключевых элементов
            has_h1 = '<h1' in html
            has_faq = 'Частые вопросы' in html or 'частые вопросы' in html
            has_cta = 'Консультация' in html or 'консультацию' in html or 'Помощь' in html
            has_sections = html.count('<section') >= 5
            
            status = 'OK' if (has_h1 and has_faq and has_sections) else 'WARN'
            results.append((slug, code, size, text_len, has_h1, has_faq, has_sections, status))
            if status == 'OK':
                ok += 1
            else:
                fail += 1
        else:
            results.append((slug, code, size, 0, False, False, False, 'FAIL'))
            fail += 1
    except Exception as e:
        results.append((slug, 'ERR', 0, 0, False, False, False, str(e)[:30]))
        fail += 1
    
    print(f'  [{i:2}/{len(pages)}] {slug[:50]:50} HTTP={code} size={size:>6} text={0 if "text_len" not in dir() else text_len:>6} {status if "status" in dir() else "ERR"}')
    time.sleep(0.3)

print(f'\nИТОГО: OK={ok}, FAIL={fail}, всего={len(pages)}')

# Покажем FAIL/WARN подробно
print('\n=== Проблемные ===')
for r in results:
    if r[7] != 'OK':
        print(f'  {r[0]}: HTTP={r[1]} size={r[2]} h1={r[4]} faq={r[5]} sec={r[6]} status={r[7]}')
