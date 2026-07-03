#!/bin/bash
cd /home/z/my-project
export NODE_OPTIONS="--max-old-space-size=4096"

while true; do
  # Если сервер не отвечает — запускаем новый
  if ! curl -s -o /dev/null --max-time 2 http://localhost:3000/ > /dev/null 2>&1; then
    # Убить старый процесс если есть
    pkill -9 -f "next start" 2>/dev/null
    pkill -9 -f "next-server" 2>/dev/null
    sleep 0.3
    # Запустить новый
    setsid node_modules/.bin/next start -p 3000 >> /home/z/my-project/dev.log 2>&1 &
    disown
    sleep 5  # подождать пока запустится
  fi
  sleep 1
done
