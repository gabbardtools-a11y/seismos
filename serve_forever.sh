#!/bin/bash
cd /home/z/my-project
while true; do
  NODE_OPTIONS="--max-old-space-size=4096" node_modules/.bin/next start -p 3000 >> dev.log 2>&1
  sleep 0.5
done
