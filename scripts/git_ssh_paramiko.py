#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""git-ssh транспорт на paramiko — для песочниц без ssh-бинарника (R48).
Вызывается git-ом как GIT_SSH: argv = [wrapper, user@host, 'git-upload-pack ...'].
Пин-дисциплина: каждый коннект сверяет host-key с GIT_SSH_PIN, иначе exit 255.
Env: GIT_SSH_KEY (путь к приватнику), GIT_SSH_PIN (SHA256:...), GIT_SSH_USER (если в host нет user@)."""
import base64, hashlib, os, sys, threading

host_arg, cmd = sys.argv[1], sys.argv[2]
user = os.environ.get("GIT_SSH_USER", "root")
if "@" in host_arg:
    user, host = host_arg.split("@", 1)
else:
    host = host_arg

key = os.environ.get("GIT_SSH_KEY")
pin = os.environ.get("GIT_SSH_PIN")
assert key and pin, "GIT_SSH_KEY/GIT_SSH_PIN не заданы"

import paramiko
k = paramiko.Ed25519Key.from_private_key_file(key)
t = paramiko.Transport((host, 22)); t.start_client(timeout=25)
hk = t.get_remote_server_key()
fp = "SHA256:" + base64.b64encode(hashlib.sha256(hk.asbytes()).digest()).decode().rstrip("=")
if fp != pin:
    sys.stderr.write(f"git-ssh-wrapper: ПИН УЛЬЯ НЕ СОВПАЛ: {fp} != {pin}\n")
    sys.exit(255)
t.auth_publickey(user, k)
chan = t.open_session(timeout=30)
chan.exec_command(cmd)

def pump_stdin():
    try:
        while True:
            d = os.read(0, 32768)  # НЕ BufferedReader.read: os.read отдаёт сразу, без ожидания полного буфера (иначе дедлок с git want/ack)
            if not d:
                break
            chan.sendall(d)
    except Exception:
        pass
    finally:
        try:
            chan.shutdown_write()
        except Exception:
            pass

threading.Thread(target=pump_stdin, daemon=True).start()
try:
    while True:
        d = chan.recv(32768)
        if not d:
            break
        sys.stdout.buffer.write(d)
        sys.stdout.buffer.flush()
except Exception as e:
    sys.stderr.write(f"git-ssh-wrapper: transport error: {e}\n")
rc = chan.recv_exit_status()
sys.exit(rc)
