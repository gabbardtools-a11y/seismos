#!/bin/bash
# Ultra-stable watchdog — мгновенный перезапуск при падении
# Запускается в фоне через setsid, не зависит от терминальной сессии

cd /home/z/my-project

while true; do
  # Запускаем сервер и ждём его завершения
  python3 /home/z/my-project/scripts/serve_static.py >> /home/z/my-project/dev.log 2>&1
  # Если процесс упал — ждём минимум и перезапускаем
  sleep 0.1
done
