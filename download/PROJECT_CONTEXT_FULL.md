# 🧊 СРОСС® — Полная капсула контекста (ДЛЯ ОБЛАКА Z.ai)

> ⚠️ **ВНИМАНИЕ: этот файл содержит секреты (ключи, IP, доступы).**
> ⚠️ **НЕ коммитить в Git! Только облако Z.ai.**
>
> Версия: 3. Обновлено: 2026-11-06.

---

## СЕКРЕТЫ И ДОСТУПЫ

### Git
- **Репозиторий:** `ssh://git@github.com:443/gabbardtools-a11y/seismos.git`
- **Деплой-ключ:** ed25519, отпечаток `SHA256:HEo1LyJZ+8O9MjkG9IWK92BNFpYMdA/69t712HbWQpA`
- **Ключ в sandbox:** `/tmp/my-project/scripts/seismos_deploy_ed25519` (выцветает при рецикле)
- **Push команда:**
  ```bash
  cp /tmp/my-project/scripts/seismos_deploy_ed25519 /tmp/depkey
  chmod 600 /tmp/depkey
  pip install paramiko
  GIT_SSH_KEY=/tmp/depkey GIT_SSH=/home/z/my-project/scripts/git_ssh_wrapper_pro.py git push --no-thin origin main
  ```

### VPS (продакшен)
- **Хост:** `188.127.249.38` (улей)
- **Папка:** `/var/www/seismos/`
- **PM2:** `seismos` (порт 3004)
- **Страж:** seismos-guard (тянет репо, выкатывает на 3004)
- **DNS:** seismos.ru → 188.127.249.38
- **Caddy:** reverse proxy :81 → localhost:3000 (или :3004?)

### VPS (старый, не используется)
- **Хост:** `91.219.151.57`
- **Хост 2:** `188.127.227.250` (пароль в `scripts/ssh_run_sh.py`)

### GitHub Actions
- **Workflow:** `.github/workflows/deploy.yml`
- **Secrets:** VPS_HOST, VPS_USER, VPS_SSH_KEY, VPS_KNOWN_HOSTS
- **Деплоит на:** улей 188.127.249.38

### Cron-задачи Z.ai
- **506005** — drip-publish, 09:00 МСК ежедневно (СТАТУС: не работает, drip_state.json пустой)
- **509858** — health-check, каждый час (read-only: докладывает, не чинит)

---

## ПОЛНАЯ ВЕРСИЯ КОНТЕКСТА

Полный контекст проекта (без секретов) — в файле `PROJECT_CONTEXT.md`
в корне git-репозитория. Эта секция — только секреты и доступы,
которые не должны быть в git.

При восстановлении в новом чате:
1. Прочитать PROJECT_CONTEXT.md из git (без секретов)
2. Прочитать PROJECT_CONTEXT_FULL.md из облака Z.ai (секреты)
3. Объединить — полный контекст с доступами

---

*Этот файл — только для облака Z.ai. Не в git!*
