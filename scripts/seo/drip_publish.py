#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Drip-publish скрипт: публикует по N SEO-страниц в день из ядра.

Логика:
1. Читает scripts/seo/kernel.json (блок "drip" — 60 страниц).
2. Читает scripts/seo/drip_state.json — сколько уже опубликовано.
3. Если есть непубликованные — берёт N (=10 по умолчанию), генерирует
   для каждой:
   - src/app/<slug>/page.tsx (обёртка через SeoPage)
   - src/content/seo/<slug>.ts (контент — НЕ генерирует, только заглушку
     с пометкой "TODO: заполнить контентом", потому что полный текст
     должен генерироваться отдельным LLM-вызовом)
4. Обновляет drip_state.json.
5. Коммитит и пушит.

ВАЖНО: этот скрипт создаёт только структурные файлы. Реальный контент
(10 000 ± 1 000 символов) должен генерироваться отдельным скриптом
gen_content.py, который вызывает LLM для каждой новой страницы.

Запуск:
  python3 scripts/seo/drip_publish.py           # опубликовать 10 новых
  python3 scripts/seo/drip_publish.py --count 5 # опубликовать 5
  python3 scripts/seo/drip_publish.py --dry-run # только показать, что будет

Cron (каждый день в 09:00 МСК):
  0 6 * * * cd /home/z/my-project && python3 scripts/seo/drip_publish.py >> logs/drip.log 2>&1
"""
import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path('/home/z/my-project')
KERNEL = ROOT / 'scripts/seo/kernel.json'
STATE = ROOT / 'scripts/seo/drip_state.json'
APP_DIR = ROOT / 'src/app'
LOG = ROOT / 'logs/drip.log'

DEFAULT_COUNT = 10


def load_state() -> dict:
    if STATE.exists():
        return json.loads(STATE.read_text(encoding='utf-8'))
    return {"published": [], "last_run": None, "total_drip": 0}


def save_state(state: dict) -> None:
    STATE.parent.mkdir(parents=True, exist_ok=True)
    STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding='utf-8')


def render_page_wrapper(meta: dict) -> str:
    """Рендерит page.tsx-обёртку для одной страницы."""
    slug = meta['slug']
    title = meta['title']
    primary = meta['primary_kw']
    secondary = meta.get('secondary_kw', '')
    cluster = meta.get('cluster', 'misc')
    canonical_to = meta.get('canonical_to')

    keywords = primary
    if secondary:
        keywords += ', ' + secondary.replace('|', ', ')
    canonical = f'/{canonical_to}' if canonical_to else f'/{slug}'

    export_name = f"pageContent_{slug.replace('-', '_')}"

    return f'''/**
 * SEO-страница: {title}
 * Кластер: {cluster}
 * Сгенерирована drip_publish.py: {datetime.now(timezone.utc).isoformat()}
 */
import {{ SeoPage }} from "@/components/site/seo-page";
import {{ {export_name} }} from "@/content/seo/{slug}";

export const metadata = {{
  title: {json.dumps(title, ensure_ascii=False)},
  description: {json.dumps(primary + ' — оформление, цена, сроки. ' + (secondary.replace('|', ', ') if secondary else ''), ensure_ascii=False)},
  keywords: {json.dumps(keywords, ensure_ascii=False)},
  alternates: {{ canonical: {json.dumps(canonical, ensure_ascii=False)} }},
}};

export default function Page() {{
  return <SeoPage meta={{{{
    slug: {json.dumps(slug, ensure_ascii=False)},
    title: {json.dumps(title, ensure_ascii=False)},
    cluster: {json.dumps(cluster, ensure_ascii=False)},
    intent: "commercial",
  }}}} content={{{export_name}}} />;
}}
'''


def render_content_stub(meta: dict) -> str:
    """Рендерит ЗАГЛУШКУ content-файла.
    
    ВНИМАНИЕ: это плейсхолдер. Реальный контент должен быть сгенерирован
    отдельным LLM-вызовом (gen_content.py) и заменён в этом файле.
    Заглушка нужна, чтобы:
    1. page.tsx-обёртка компилировалась без ошибок
    2. Страница отдавала 200, но с пометкой «контент скоро появится»
    """
    slug = meta['slug']
    title = meta['title']
    primary = meta['primary_kw']
    export_name = f"pageContent_{slug.replace('-', '_')}"

    return f'''import type {{ SeoContent }} from "@/components/site/seo-page";

// ВНИМАНИЕ: это drip-publish заглушка. Реальный контент (10 000 ± 1 000 символов)
// будет сгенерирован отдельным скриптом gen_content.py и заменён в этом файле.
// Пока — минимальная валидная структура, чтобы страница отдавала 200.

export const {export_name}: SeoContent = {{
  intro: "<p>Страница <strong>{title}</strong> готовится к публикации. Здесь появится подробный материал объёмом около 10 000 символов: что это за услуга, кому нужна, как оформляется, какие ГОСТы регулируют, сколько стоит и сколько занимает по времени.</p>",
  sections: [
    {{
      id: "v-rabote",
      title: "Материал в работе",
      body: "<p>Эта страница только что опубликована в рамках drip-расписания. Контент будет добавлен в течение 24 часов. Если вам нужна консультация по теме <strong>{primary}</strong> прямо сейчас — свяжитесь с нами через форму ниже.</p>",
    }},
  ],
  faq: [
    {{
      q: "Когда появится полный текст?",
      a: "Полный материал будет опубликован в течение суток. Страница уже проиндексирована поисковиками по основному ключевому запросу.",
    }},
  ],
  seoParagraph: "<p>{primary} — услуга СРОСС®. Подробный материал готовится к публикации.</p>",
  ctaTitle: "Нужна консультация?",
  ctaText: "Свяжитесь с нами — ответим в течение рабочего дня.",
}};
'''


def git_commit_push(slugs: list[str]) -> bool:
    """Коммитит и пушит новые страницы. Возвращает True при успехе."""
    try:
        # Подготовим файлы
        files = []
        for slug in slugs:
            files.append(f"src/app/{slug}/page.tsx")
            files.append(f"src/content/seo/{slug}.ts")
        
        subprocess.run(['git', 'add'] + files, cwd=ROOT, check=True)
        
        msg = f"drip: +{len(slugs)} SEO-страниц — {', '.join(s[:30] for s in slugs[:3])}{'...' if len(slugs) > 3 else ''}"
        subprocess.run(['git', 'commit', '-m', msg], cwd=ROOT, check=True)
        
        # Push через SSH-обёртку
        env = os.environ.copy()
        env['GIT_SSH_KEY'] = '/tmp/depkey'
        env['GIT_SSH'] = str(ROOT / 'scripts/git_ssh_wrapper_pro.py')
        env['PYTHONPATH'] = ''  # чтобы paramiko нашёлся
        r = subprocess.run(
            ['git', 'push', '--no-thin', 'origin', 'main'],
            cwd=ROOT, env=env, capture_output=True, text=True, timeout=180
        )
        if r.returncode != 0:
            print(f'  ! push failed: {r.stderr[:200]}', file=sys.stderr)
            return False
        return True
    except subprocess.CalledProcessError as e:
        print(f'  ! git error: {e}', file=sys.stderr)
        return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--count', type=int, default=DEFAULT_COUNT,
                    help=f'Сколько страниц опубликовать (default: {DEFAULT_COUNT})')
    ap.add_argument('--dry-run', action='store_true',
                    help='Только показать, что будет опубликовано')
    ap.add_argument('--no-push', action='store_true',
                    help='Не делать git commit/push (только файлы)')
    args = ap.parse_args()

    if not KERNEL.exists():
        print('ERROR: kernel.json not found', file=sys.stderr)
        sys.exit(1)

    kernel = json.loads(KERNEL.read_text(encoding='utf-8'))
    drip = kernel.get('drip', [])
    if not drip:
        print('No drip pages in kernel')
        return

    state = load_state()
    published = set(state.get('published', []))
    pending = [p for p in drip if p['slug'] not in published]

    if not pending:
        print(f'All {len(drip)} drip-pages already published. Nothing to do.')
        return

    batch = pending[:args.count]
    print(f'Drip publish: {len(batch)} of {len(pending)} pending (total drip: {len(drip)}, already published: {len(published)})')
    print(f'Batch: {[p["slug"] for p in batch]}')
    print()

    if args.dry_run:
        print('DRY RUN — файлы не создаются, git не вызывается.')
        return

    # Создаём файлы
    created = []
    for meta in batch:
        slug = meta['slug']
        page_dir = APP_DIR / slug
        page_dir.mkdir(parents=True, exist_ok=True)
        (page_dir / 'page.tsx').write_text(render_page_wrapper(meta), encoding='utf-8')
        
        content_path = ROOT / 'src/content/seo' / f'{slug}.ts'
        # Не перезаписываем, если уже есть реальный контент
        if not content_path.exists():
            content_path.parent.mkdir(parents=True, exist_ok=True)
            content_path.write_text(render_content_stub(meta), encoding='utf-8')
            print(f'  + {slug}: page.tsx + content stub (ЗАПОЛНИТЬ!)')
        else:
            print(f'  + {slug}: page.tsx (content уже существует)')
        created.append(slug)

    # Обновляем state
    state['published'] = sorted(published | set(created))
    state['last_run'] = datetime.now(timezone.utc).isoformat()
    state['total_drip'] = len(drip)
    save_state(state)

    print(f'\nСоздано файлов: {len(created)}')
    print(f'Опубликовано всего: {len(state["published"])}/{len(drip)}')

    if len(state["published"]) >= len(drip):
        print('\n🎉 Все drip-страницы опубликованы!')
    else:
        remaining = len(drip) - len(state["published"])
        days = (remaining + args.count - 1) // args.count
        print(f'\nОсталось: {remaining} страниц (~{days} дней по {args.count}/день)')

    # Git
    if not args.no_push:
        print('\n--- git commit & push ---')
        ok = git_commit_push(created)
        if ok:
            print('✓ Запушено в origin/main')
        else:
            print('✗ Push не удался — файлы созданы локально, можно запушить вручную')
    
    # Лог
    LOG.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG, 'a', encoding='utf-8') as f:
        f.write(f'\n[{datetime.now(timezone.utc).isoformat()}] published {len(created)}: {", ".join(created)}\n')


if __name__ == '__main__':
    main()
