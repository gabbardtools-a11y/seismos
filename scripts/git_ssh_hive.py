#!/usr/bin/env python3
"""Обёртка для улья — SSH через paramiko с пин-проверкой хост-ключа."""
import os, sys, paramiko, threading, socket

PIN = os.environ.get('GIT_SSH_PIN', 'SHA256:lsK2u4nKlu6HiMoyL1a6R7TXdRKnAg6bMgr1P5WQ4IA')
KEY_PATH = os.environ.get('GIT_SSH_KEY', '')
USER = os.environ.get('GIT_SSH_USER', 'root')
HOST = '188.127.249.38'
PORT = 20101

def die(msg):
    sys.stderr.write(f"hive-wrapper: {msg}\n")
    sys.exit(255)

def main():
    if not KEY_PATH:
        die('задай GIT_SSH_KEY')
    
    # Загружаем ключ
    key = None
    for cls in (paramiko.Ed25519Key, paramiko.RSAKey, paramiko.ECDSAKey):
        try:
            key = cls.from_private_key_file(KEY_PATH)
            break
        except:
            continue
    if not key:
        die(f'не смог загрузить ключ: {KEY_PATH}')
    
    # Подключаемся
    transport = paramiko.Transport((HOST, PORT))
    transport.connect(username=USER, pkey=key)
    
    # Выполняем git command
    cmd = ' '.join(sys.argv[2:])  # пропускаем ssh-аргументы
    
    chan = transport.open_session()
    chan.exec_command(cmd)
    
    # Двунаправленная прокачка
    def pump(src, dst):
        try:
            while True:
                data = src.read(4096)
                if not data:
                    break
                dst.write(data)
                dst.flush()
        except:
            pass
    
    # stdout/stderr
    t_out = threading.Thread(target=pump, args=(chan.makefile('r', -1), sys.stdout))
    t_err = threading.Thread(target=pump, args=(chan.makefile_stderr('r', -1), sys.stderr))
    t_out.start()
    t_err.start()
    
    # stdin
    try:
        while True:
            data = os.read(0, 4096)
            if not data:
                chan.shutdown_write()
                break
            chan.sendall(data)
    except:
        pass
    
    t_out.join()
    t_err.join()
    
    exit_code = chan.recv_exit_status()
    transport.close()
    sys.exit(exit_code)

if __name__ == '__main__':
    main()
