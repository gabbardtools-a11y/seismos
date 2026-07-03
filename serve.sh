#!/bin/bash
# Ultra-stable server — bind to 0.0.0.0 для доступности через Caddy

cd /home/z/my-project/out

while true; do
  python3 -m http.server 3000 --bind 0.0.0.0 > /home/z/my-project/server.log 2>&1 &
  SERVER_PID=$!
  wait $SERVER_PID 2>/dev/null
  sleep 0.2
done
