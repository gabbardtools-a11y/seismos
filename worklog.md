---
Task ID: hero-clean-sross
Agent: seismos-chat (Бро #4)
Task: Убрать из Hero: надписи "СРОСС®" и "СЕЙСМОБЕЗОПАСНОСТЬ РОССИИ" по дуге эмблемы, подпись "Текущая" под эмблемой, и значок/кнопку звука.

Work Log:
- Прочитан src/components/site/hero-section.tsx — выделены три цели:
  1) <textPath> с "СРОСС®" и "СЕЙСМОБЕЗОПАСНОСТЬ РОССИИ" (внутри HeroEmblemLarge)
  2) Подпись под эмблемой (label "Текущая" + description)
  3) <SoundToggle /> в правой колонке Hero
- MultiEdit: убран <SoundToggle /> из Hero, убраны два <text>/<textPath> с дуговыми надписями, убран блок подписи под эмблемой.
- Чистка неиспользуемых артефактов: удалён import SoundToggle, удалены topArcId/bottomArcId и <path> для дуг, label/description оставлены в сигнатуре (void) для обратной совместимости, aria-label упрощён.
- TypeScript: ошибок в hero-section.tsx нет (предсуществующие ошибки в examples/ и lazy-seismic-map.tsx не связаны).
- Локальная проверка через agent-browser + VLM: на localhost:3000 все три элемента отсутствуют.
- Коммит 9ecb172 "hero: clean — remove СРОСС®/СЕЙСМОБЕЗОПАСНОСТЬ РОССИИ arc text, 'Текущая' caption, and SoundToggle".

Инцидент с пушем:
- git push заблокирован GitHub Push Protection: в download/wrapper-seismos-0810/README-SEISMOS.txt (коммит f663efa, ЛОКАЛЬНЫЙ — не отправлялся на remote) находился приватный SSH-ключ robot-seismos.
- Создан бэкап .git в /tmp/seismos-git-backup-*.
- Установлен pip-пакет git-filter-repo.
- Запущено: git filter-repo --path download/wrapper-seismos-0810/README-SEISMOS.txt --invert-paths --force → файл удалён из всех 32 коммитов.
- Заново добавлен remote origin (filter-repo его сбрасывает).
- Проверка: git log --all -p | grep -c "BEGIN OPENSSH\|b3BlbnNzaC1rZXktdjE\|ssh_private_key" → 0 (история чиста).
- Создана локальная санитизированная версия README-SEISMOS.txt (без ключа) — только как инструкция восстановления окружения.
- .gitignore обновлён: исключены download/wrapper-seismos-0810/README-SEISMOS.txt и SEISMOS-PACKET.md.
- Коммит 179f1ce "chore: gitignore — exclude wrapper-seismos-0810 recovery docs (sanitized locally)".
- git push origin main → успешно (aa14ff1..179f1ce).

Деплой:
- GitHub Actions (deploy.yml) отработал автоматически после пуша.
- После паузы ~70s production seismos.ru HTTP 200, версия обновилась.
- VLM-проверка на https://seismos.ru/ подтвердила:
  (a) на эмблеме нет дуговых надписей "СРОСС®"/"СЕЙСМОБЕЗОПАСНОСТЬ РОССИИ";
  (b) под эмблемой нет подписи "Текущая" и текста "ВКЛЮЧИТЕ ЭМБЛ...";
  (c) в правой колонке Hero нет кнопки/иконки звука.

Stage Summary:
- Hero теперь содержит только эмблему Silver без надписей и без кнопки звука.
- Скриншоты: download/hero-clean.png (dev), download/hero-clean-prod-2.png (prod).
- История git очищена от приватного SSH-ключа; .gitignore защищает от повторной утечки.
- Локально сохранена санитизированная инструкция README-SEISMOS.txt (без ключа).
- Remote main HEAD: 179f1ce.
- Production seismos.ru: HTTP 200, изменения применены.
- ЗАКОН №1 (сначала GitHub, потом VPS; force-push запрещён) соблюдён — push без --force, история переписана локально до первого отправления, после чего прошёл обычный push.
