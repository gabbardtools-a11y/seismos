#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""SSH-помощник для деплоя seismos.ru на VPS (paramiko)."""
import sys
import paramiko

HOST = '91.219.151.57'
KEY = '/home/z/my-project/scripts/seismos_deploy_ed25519'


def get_client():
    cli = paramiko.SSHClient()
    cli.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    cli.connect(HOST, username='root', key_filename=KEY,
                look_for_keys=False, allow_agent=False, timeout=15)
    return cli


def run(cli, cmd, timeout=120):
    stdin, stdout, stderr = cli.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode('utf-8', 'replace')
    err = stderr.read().decode('utf-8', 'replace')
    code = stdout.channel.recv_exit_status()
    return code, out, err


if __name__ == '__main__':
    cmd = ' '.join(sys.argv[1:]) or 'echo ok'
    cli = get_client()
    code, out, err = run(cli, cmd)
    print(out)
    if err.strip():
        print('STDERR:', err[:2000])
    sys.exit(code)
