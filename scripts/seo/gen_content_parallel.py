#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Параллельный раннер gen_content.py — запускает N процессов одновременно.

60 страниц × 30 сек / 5 потоков = ~6 минут (вместо 30 минут последовательно).
"""
import re
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path('/home/z/my-project')
CONTENT_DIR = ROOT / 'src/content/seo'
STUB_MARKER = "drip-publish заглушка"

def find_stubs() -> list[str]:
    stubs = []
    for f in CONTENT_DIR.glob('*.ts'):
        if STUB_MARKER in f.read_text(encoding='utf-8'):
            stubs.append(f.stem)
    return stubs

def gen_one(slug: str) -> tuple[str, str]:
    """Генерирует одну страницу с retry. Возвращает (slug, status)."""
    import time
    last_err = ''
    for attempt in range(3):
        t0 = time.time()
        try:
            r = subprocess.run(
                ['python3', str(ROOT / 'scripts/seo/gen_content.py'), '--slug', slug],
                capture_output=True, text=True, timeout=180
            )
        except subprocess.TimeoutExpired:
            last_err = 'timeout 180s'
            time.sleep(10)
            continue
        dt = time.time() - t0
        out = r.stdout
        if '✓ Сохранён' in out:
            m = re.search(r'✓ Сохранён: (.+?)$', out, re.MULTILINE)
            msg = m.group(1) if m else 'OK'
            return slug, f'OK ({dt:.0f}s) — {msg}'
        elif '✗' in out:
            m = re.search(r'✗ (.+?)$', out, re.MULTILINE)
            last_err = m.group(1) if m else 'fail'
            # Если LLM не вернул контент (concurrency) — ждём и retry
            if 'LLM не вернул' in last_err or '0s' in last_err or 'concurrency' in last_err.lower():
                time.sleep(20)
                continue
            return slug, f'FAIL ({dt:.0f}s) — {last_err}'
        else:
            last_err = f'stdout tail: {out[-200:]}'
            time.sleep(10)
    return slug, f'FAIL (3 attempts) — {last_err}'

def main():
    workers = int(sys.argv[1]) if len(sys.argv) > 1 else 5
    stubs = find_stubs()
    print(f'Найдено заглушек: {len(stubs)}')
    print(f'Параллелизм: {workers} потоков')
    print(f'Оценка времени: ~{len(stubs) * 32 / workers / 60:.1f} мин')
    print()
    
    if not stubs:
        print('Нечего генерировать.')
        return
    
    ok, fail = 0, 0
    t0 = time.time()
    with ThreadPoolExecutor(max_workers=workers) as ex:
        futures = {ex.submit(gen_one, s): s for s in stubs}
        for i, fut in enumerate(as_completed(futures), 1):
            slug, status = fut.result()
            mark = '✓' if status.startswith('OK') else '✗'
            print(f'  [{i:2}/{len(stubs)}] {mark} {slug:50} {status}')
            if status.startswith('OK'):
                ok += 1
            else:
                fail += 1
    
    dt = time.time() - t0
    print()
    print(f'ИТОГО: ok={ok}, fail={fail}, всего={len(stubs)}, время={dt:.0f}s ({dt/60:.1f} мин)')
    
    if fail > 0:
        print('\n⚠ Есть неудачные — можно повторить: python3 scripts/seo/gen_content.py --slug <slug>')
        sys.exit(1)

if __name__ == '__main__':
    main()
