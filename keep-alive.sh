#!/bin/bash
cd /home/z/my-project
while true; do
  echo "[$(date)] Starting server..."
  NODE_OPTIONS="--max-old-space-size=4096" node .next/standalone/server.js >> dev.log 2>&1
  echo "[$(date)] Server exited with code $?, restarting in 3s..."
  sleep 3
done
