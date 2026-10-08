#!/bin/bash
# Восстановление git SSH окружения после рестарта sandbox
export GIT_SSH=/home/z/my-project/scripts/git_ssh_wrapper_pro.py
export GIT_SSH_KEY=/home/z/my-project/scripts/robot-seismos
export GIT_SSH_VARIANT=ssh
echo "✅ Git SSH окружение установлено"
echo "  GIT_SSH=$GIT_SSH"
echo "  GIT_SSH_KEY=$GIT_SSH_KEY"
