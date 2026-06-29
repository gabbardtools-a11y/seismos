#!/usr/bin/env python3
import sys
import paramiko

HOST = '188.127.227.250'
USER = 'root'
PASSWORD = 'bF2bB7eT4wdZ'

def run(cmd, timeout=600):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(HOST, username=USER, password=PASSWORD, timeout=30, banner_timeout=30, auth_timeout=30, allow_agent=False, look_for_keys=False)
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    code = stdout.channel.recv_exit_status()
    client.close()
    return code, out, err

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: ssh_run_sh.py "<command>"', file=sys.stderr)
        sys.exit(2)
    code, out, err = run(sys.argv[1])
    sys.stdout.write(out)
    if err:
        sys.stderr.write(err)
    sys.exit(code)
