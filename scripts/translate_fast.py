"""
Быстрый перевод — один большой запрос на 50 ключей.
"""
import json, re, subprocess, sys, time
from pathlib import Path

PATH = Path("/home/z/my-project/src/lib/i18n/translations.ts")
LANGS = ["en", "zh", "kk", "hy", "ka"]

def translate_batch(items, batch_num):
    lines = []
    for i, (key, text) in enumerate(items):
        lines.append(f'{i+1}. [{key}] {text}')
    prompt_lines = "\n".join(lines)

    prompt = f"""Переведи строки на 5 языков: en (английский), zh (китайский), kk (казахский), hy (армянский), ka (грузинский).

{prompt_lines}

Ответ — СТРОГО JSON-массив, без markdown:
[{{"k":"key1","en":"...","zh":"...","kk":"...","hy":"...","ka":"..."}},...]

Сохраняй: СРОСС®, PGA, MSK-64, USGS, EASA, ЕАЭС, HTML-теги. Только JSON."""

    try:
        result = subprocess.run(
            ["z-ai", "chat", "-p", prompt, "-o", f"/tmp/_bt{batch_num}.json"],
            capture_output=True, text=True, timeout=180
        )
        if result.returncode != 0:
            return {}
        d = json.load(open(f"/tmp/_bt{batch_num}.json"))
        content = d.get("choices", [{}])[0].get("message", {}).get("content", "")
        json_match = re.search(r'\[.*\]', content, re.S)
        if not json_match:
            return {}
        translations = json.loads(json_match.group(0))
        return {item.get("k", ""): item for item in translations}
    except Exception as e:
        print(f"  batch {batch_num} error: {e}", file=sys.stderr)
        return {}

def main():
    content = PATH.read_text(encoding="utf-8")
    all_keys = re.findall(r"'([^']+)':\s*\{([^}]+)\}", content)

    incomplete = []
    for key, body in all_keys:
        has = {lang: f"{lang}:" in body for lang in LANGS}
        missing = [lang for lang in LANGS if not has[lang]]
        if missing:
            ru_match = re.search(r"ru:\s*'((?:[^'\\]|\\.)*)'", body)
            if ru_match:
                ru_text = ru_match.group(1).replace("\\'", "'")
                incomplete.append((key, ru_text, missing))

    print(f"Incomplete: {len(incomplete)}", flush=True)

    # Батчи по 5 (стабильно работает)
    batch_size = 5
    total_batches = (len(incomplete) + batch_size - 1) // batch_size
    print(f"Batches: {total_batches} (по {batch_size})", flush=True)

    all_translations = {}
    for batch_idx in range(total_batches):
        start = batch_idx * batch_size
        end = min(start + batch_size, len(incomplete))
        batch = incomplete[start:end]
        print(f"Batch {batch_idx+1}/{total_batches} ({len(batch)} keys)...", flush=True, end=" ")

        items = [(key, ru) for key, ru, _ in batch]
        result = translate_batch(items, batch_idx)
        all_translations.update(result)
        print(f"got {len(result)}", flush=True)
        time.sleep(0.5)

    print(f"\nTotal translations: {len(all_translations)}", flush=True)

    # Вставка
    content = PATH.read_text(encoding="utf-8")
    updated = 0
    for key, ru_text, missing in incomplete:
        if key not in all_translations:
            continue
        trans = all_translations[key]
        pattern = rf"('{re.escape(key)}':\s*\{{[^}}]+)\}}"
        m = re.search(pattern, content)
        if not m:
            continue
        old_block = m.group(1)
        addition = ""
        for lang in missing:
            val = trans.get(lang, "")
            if val:
                val = val.replace("\\", "\\\\").replace("'", "\\'")
                addition += f", {lang}: '{val}'"
        if addition:
            new_block = old_block + addition + "}"
            content = content.replace(m.group(0), new_block, 1)
            updated += 1

    print(f"Updated {updated} keys", flush=True)
    PATH.write_text(content, encoding="utf-8")
    print(f"Saved: {PATH}", flush=True)

if __name__ == "__main__":
    main()
