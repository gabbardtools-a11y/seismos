"""Идемпотентный переводчик для tg/uz/ky — 3 новых языка СНГ."""
import json, re, subprocess, sys, time
from pathlib import Path

PATH = Path("/home/z/my-project/src/lib/i18n/translations.ts")
LANGS = ["tg", "uz", "ky"]
BATCH = 5

def get_incomplete():
    content = PATH.read_text(encoding="utf-8")
    all_keys = re.findall(r"'([^']+)':\s*\{([^}]+)\}", content)
    incomplete = []
    for key, body in all_keys:
        missing = [l for l in LANGS if f"{l}:" not in body]
        if missing:
            ru = re.search(r"ru:\s*'((?:[^'\\]|\\.)*)'", body)
            if ru:
                incomplete.append((key, ru.group(1).replace("\\'", "'"), missing))
    return incomplete

def translate(items, n):
    lines = [f'"{k}": "{t}"' for k, t in items]
    prompt = f"""Переведи значения JSON на 3 языка: tg (таджикский, кириллица), uz (узбекский, латиница), ky (киргизский, кириллица).

{{{", ".join(lines)}}}

Ответ — JSON-массив (без markdown):
[{{"k":"ключ","tg":"...","uz":"...","ky":"..."}},...]

Сохраняй: СРОСС®, PGA, MSK-64, USGS, EASA, ЕАЭС, HTML-теги. Только JSON."""
    try:
        r = subprocess.run(["z-ai", "chat", "-p", prompt, "-o", f"/tmp/_tg{n}.json"],
                          capture_output=True, text=True, timeout=90)
        if r.returncode != 0: return {}
        d = json.load(open(f"/tmp/_tg{n}.json"))
        c = d.get("choices", [{}])[0].get("message", {}).get("content", "")
        m = re.search(r'\[.*\]', c, re.S)
        if not m: return {}
        return {i.get("k",""): i for i in json.loads(m.group(0))}
    except Exception as e:
        print(f"  err: {e}", file=sys.stderr)
        return {}

def apply(trans):
    content = PATH.read_text(encoding="utf-8")
    lines = content.split("\n")
    new = []
    updated = 0
    for line in lines:
        m = re.match(r"^(\s*'([^']+)':\s*\{)(.*)(\},?)$", line)
        if not m or m.group(2) not in trans:
            new.append(line)
            continue
        prefix, key, body, suffix = m.groups()
        t = trans[key]
        existing = {l: f"{l}:" in body for l in LANGS}
        add = ""
        for l in LANGS:
            if not existing[l]:
                v = t.get(l, "")
                if v:
                    v = v.replace("\\", "\\\\").replace("'", "\\'")
                    add += f", {l}: '{v}'"
        new.append(prefix + body + add + suffix if add else line)
        updated += 1 if add else 0
    if updated:
        PATH.write_text("\n".join(new), encoding="utf-8")
    return updated

n = 0
while True:
    inc = get_incomplete()
    if not inc:
        print("✓ Все переведены!")
        break
    n += 1
    batch = inc[:BATCH]
    print(f"#{n}: {len(inc)} ост. | {', '.join(k[:25] for k,_,_ in batch)}", end=" → ", flush=True)
    r = translate([(k, t) for k, t, _ in batch], n)
    if r:
        u = apply(r)
        print(f"got {len(r)}, applied {u}", flush=True)
    else:
        print("FAIL", flush=True)
    time.sleep(0.3)
    if n > 200:
        print("Лимит итераций")
        break
