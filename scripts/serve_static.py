#!/usr/bin/env python3
"""Многопоточный статический HTTP-сервер для раздачи Next.js static export."""
import http.server
import socketserver
import os
import sys

PORT = 3000
DIRECTORY = "/home/z/my-project/out"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    def end_headers(self):
        # CORS + cache headers для статики
        self.send_header("Cache-Control", "public, max-age=3600")
        super().end_headers()
    # Логирование в stderr чтобы не мешать
    def log_message(self, format, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), format % args))

class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Serving {DIRECTORY} on http://127.0.0.1:{PORT}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()
