#!/bin/bash
while true; do
  python3 /home/z/my-project/scripts/serve_static.py >> /home/z/my-project/dev.log 2>&1
  sleep 0.3
done
