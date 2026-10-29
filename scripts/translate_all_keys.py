"""
Перевод недостающих ключей в translations.ts на EN/ZH/KK/HY/KA через z-ai LLM.
Вариант A: перевести все ~461 неполных ключей.

Стратегия:
- Для каждого ключа берём RU-строку
- Делаем 1 LLM-запрос на перевод сразу на 5 языков (EN/ZH/KK/HY/KA)
- Парсим ответ (JSON или построчно)
- Вставляем переводы в translations.ts
"""

import json
import re
import subprocess
import sys
import time
from pathlib import Path

PATH = Path("/home/z/my-project/src/lib/i18n/translations.ts")
LANGS = ["en", "zh", "kk", "hy", "ka"]

def translate_batch(items):
    """
    Перевести пакет строк на 5 языков одним запросом.
    items: list of (key, ru_text)
    Возвращает: dict {key: {en: ..., zh: ..., kk: ..., hy: ..., ka: ...}}
    """
    # Формируем промпт
    lines = []
    for i, (key, text) in enumerate(items):
        lines.append(f"{i+1}. [{key}] {text}")
    prompt_lines = "\n".join(lines)

    prompt = f"""Переведи следующие строки на 5 языков: английский (en), китайский (zh), казахский (kk), армянский (hy), грузинский (ka).

Строки для перевода:
{prompt_lines}

Ответ выдай СТРОГО в JSON-формате, массив объектов:
[
  {{"key": "ключ1", "en": "перевод", "zh": "翻译", "kk": "аударма", "hy": "թարգմանություն", "ka": "თარგმანი"}},
  ...
]

Правила:
- Сохраняй технические термины (СРОСС®, PGA, MSK-64, USGS, EASA, ЕАЭС, ЕАСА)
- Не переводи названия организаций (ЕАСА, USGS, OpenStreetMap)
- Сохраняй HTML-теги если есть (<strong>, <br/>)
- Сохраняй знаки препинания и эмодзи
- Для казахского/армянского/грузинского используй соответствующий алфавит
- Только JSON, без пояснений"""

    try:
        result = subprocess.run(
            ["z-ai", "chat", "-p", prompt, "-o", "/tmp/_batch_trans.json"],
            capture_output=True, text=True, timeout=120
        )
        if result.returncode != 0:
            print(f"  z-ai error: {result.stderr[:200]}", file=sys.stderr)
            return {}

        d = json.load(open("/tmp/_batch_trans.json"))
        content = d.get("choices", [{}])[0].get("message", {}).get("content", "")

        # Извлекаем JSON из ответа
        # LLM может обернуть в ```json ... ```
        json_match = re.search(r'\[.*\]', content, re.S)
        if not json_match:
            print(f"  No JSON found in response", file=sys.stderr)
            return {}

        translations = json.loads(json_match.group(0))
        result_dict = {}
        for item in translations:
            key = item.get("key", "")
            result_dict[key] = {
                "en": item.get("en", ""),
                "zh": item.get("zh", ""),
                "kk": item.get("kk", ""),
                "hy": item.get("hy", ""),
                "ka": item.get("ka", ""),
            }
        return result_dict
    except Exception as e:
        print(f"  batch error: {e}", file=sys.stderr)
        return {}


def main():
    content = PATH.read_text(encoding="utf-8")

    # Найдём все ключи и их RU-значения
    # Паттерн: 'key': { ru: '...', ... }
    all_keys = re.findall(r"'([^']+)':\s*\{([^}]+)\}", content)
    print(f"Total keys: {len(all_keys)}")

    # Найдём неполные (без всех 6 языков)
    incomplete = []
    for key, body in all_keys:
        has = {lang: f"{lang}:" in body for lang in ['ru', 'en', 'zh', 'kk', 'hy', 'ka']}
        missing = [lang for lang in LANGS if not has[lang]]
        if missing:
            # Извлечём RU-строку
            ru_match = re.search(r"ru:\s*'((?:[^'\\]|\\.)*)'", body)
            if ru_match:
                ru_text = ru_match.group(1).replace("\\'", "'")
                incomplete.append((key, ru_text, missing))

    print(f"Incomplete keys: {len(incomplete)}")

    # Батчами по 10 ключей
    batch_size = 10
    total_batches = (len(incomplete) + batch_size - 1) // batch_size
    print(f"Batches: {total_batches} (по {batch_size} ключей)")

    all_translations = {}
    for batch_idx in range(total_batches):
        start = batch_idx * batch_size
        end = min(start + batch_size, len(incomplete))
        batch = incomplete[start:end]
        print(f"\n--- Batch {batch_idx+1}/{total_batches} ({len(batch)} keys) ---", flush=True)

        items = [(key, ru) for key, ru, _ in batch]
        print(f"  Translating: {', '.join(k[:30] for k, _ in items)}", flush=True)

        result = translate_batch(items)
        all_translations.update(result)
        print(f"  Got {len(result)} translations", flush=True)

        # Небольшая пауза между батчами
        if batch_idx < total_batches - 1:
            time.sleep(1)

    print(f"\n=== Total translations received: {len(all_translations)} ===")

    # Теперь вставим переводы в файл
    # Для каждого ключа найдём строку и добавим недостающие языки
    content = PATH.read_text(encoding="utf-8")
    updated = 0

    for key, ru_text, missing in incomplete:
        if key not in all_translations:
            print(f"  SKIP {key} (no translation)", file=sys.stderr)
            continue

        trans = all_translations[key]
        # Найдём строку с этим ключом
        # Паттерн: 'key': { ru: '...', ... }
        pattern = rf"('{re.escape(key)}':\s*\{{[^}}]+)\}}"
        m = re.search(pattern, content)
        if not m:
            print(f"  SKIP {key} (pattern not found)", file=sys.stderr)
            continue

        old_block = m.group(1)  # без закрывающей }
        # Добавим недостающие языки
        addition = ""
        for lang in missing:
            val = trans.get(lang, "")
            if val:
                val = val.replace("'", "\\'")
                addition += f", {lang}: '{val}'"

        if addition:
            new_block = old_block + addition + "}"
            content = content.replace(m.group(0), new_block, 1)
            updated += 1

    print(f"\nUpdated {updated} keys")
    PATH.write_text(content, encoding="utf-8")
    print(f"Saved: {PATH}")


if __name__ == "__main__":
    main()
