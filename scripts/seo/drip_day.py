#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
drip_day.py — ежедневная drip-публикация SEO-страниц.

Связывает два шага:
  1. drip_publish.py --count 10  — создаёт page.tsx + content-заглушки
  2. gen_content.py --limit 10   — наполняет заглушки реальным контентом через LLM
  3. git add + commit + push     — деплой

Cron (каждый день в 09:00 МСК = 06:00 UTC):
  0 6 * * * cd /home/z/my-project && python3 scripts/seo/drip_day.py >> logs/drip.log 2>&1

Запуск вручную:
  python3 scripts/seo/drip_day.py              # стандартный прогон (10 страниц)
  python3 scripts/seo/drip_day.py --count 5   # 5 страниц
"""
import argparse
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path('/home/z/my-project')
LOG = ROOT / 'logs/drip.log'


def run(cmd: list[str], label: str) -> int:
    print(f'\n=== {label} ===', flush=True)
    print(f'$ {" ".join(cmd)}', flush=True)
    env = os.environ.copy()
    env['PYTHONUNBUFFERED'] = '1'
    r = subprocess.run(cmd, cwd=ROOT, env=env)
    print(f'rc={r.returncode}', flush=True)
    return r.returncode


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--count', type=int, default=10)
    args = ap.parse_args()

    LOG.parent.mkdir(parents=True, exist_ok=True)
    print(f'\n{"="*60}', flush=True)
    print(f'DRIP DAY START: {datetime.now(timezone.utc).isoformat()}', flush=True)
    print(f'Count: {args.count}', flush=True)
    print(f'{"="*60}', flush=True)

    # Шаг 1: создать заглушки
    rc1 = run([sys.executable, 'scripts/seo/drip_publish.py',
               '--count', str(args.count), '--no-push'], 'Step 1: create stubs')
    if rc1 != 0:
        print('FAIL on step 1', flush=True)
        return 1

    # Шаг 2: наполнить контентом через LLM
    rc2 = run([sys.executable, 'scripts/seo/gen_content.py',
               '--limit', str(args.count)], 'Step 2: generate content via LLM')
    if rc2 != 0:
        print('WARN: gen_content returned non-zero, but continuing (some pages may stay stubs)', flush=True)

    # Шаг 3: git commit + push
    print('\n=== Step 3: git commit & push ===', flush=True)
    try:
        subprocess.run(['git', 'add',
                        'src/app/', 'src/content/seo/',
                        'scripts/seo/drip_state.json'],
                       cwd=ROOT, check=True)
        # commit только если есть что коммитить
        r = subprocess.run(['git', 'status', '--porcelain'], cwd=ROOT,
                           capture_output=True, text=True)
        if r.stdout.strip():
            msg = f'drip day +{args.count} SEO-страниц — {datetime.now(timezone.utc).strftime("%Y-%m-%d")}'
            subprocess.run(['git', 'commit', '-m', msg], cwd=ROOT, check=True)

            # Push через SSH-обёртку
            env = os.environ.copy()
            env['GIT_SSH_KEY'] = '/tmp/depkey'
            env['GIT_SSH'] = str(ROOT / 'scripts/git_ssh_wrapper_pro.py')
            r2 = subprocess.run(['git', 'push', '--no-thin', 'origin', 'main'],
                                cwd=ROOT, env=env, capture_output=True, text=True, timeout=300)
            if r2.returncode == 0:
                print('✓ Pushed to origin/main', flush=True)
            else:
                print(f'✗ Push failed: {r2.stderr[:300]}', flush=True)
        else:
            print('Nothing to commit', flush=True)
    except subprocess.CalledProcessError as e:
        print(f'git error: {e}', flush=True)
        return 1

    print(f'\n{"="*60}', flush=True)
    print(f'DRIP DAY DONE: {datetime.now(timezone.utc).isoformat()}', flush=True)
    print(f'{"="*60}\n', flush=True)


if __name__ == '__main__':
    main()
