"""
Пакетный перевод недостающих ключей i18n через z-ai LLM.

Извлекает из translations.ts все ключи с RU-значением,
для тех где нет EN/ZH/KK/HY/KA — переводит через z-ai chat.

Стратегия: пакеты по 15 ключей за запрос (баланс скорости/качества).
"""

import json
import re
import subprocess
import sys
import time
from pathlib import Path

PATH = Path("src/lib/i18n/translations.ts")
BATCH_SIZE = 10
TARGET_LANGS = ["en", "zh", "hy", "ka"]

LANG_NAMES = {
    "en": "English",
    "zh": "Chinese (Simplified)",
    "kk": "Kazakh",
    "hy": "Armenian",
    "ka": "Georgian",
}

LANG_INSTRUCTIONS = {
    "en": "Translate to English. Keep technical terms (PGA, MSK-64, magnitude, seismic).",
    "zh": "翻译成简体中文。保留技术术语（PGA、MSK-64、震级、地震）。",
    "kk": "Қазақ тіліне аударыңыз. Техникалық терминдерді сақтаңыз (PGA, MSK-64, магнитуда).",
    "hy": "Թարգմանիր հայերեն։ Պահպանիր տեխնիկական տերմինները (PGA, MSK-64, մագնիտուդա).",
    "ka": "თარგმნე ქართულად. შეინარჩუნე ტექნიკური ტერმინები (PGA, MSK-64, მაგნიტუდა).",
}


def extract_keys():
    """Извлечь все ключи и их переводы из translations.ts."""
    content = PATH.read_text(encoding="utf-8")
    # Паттерн: 'key': { ru: '...', en: '...', ... },
    keys = {}
    for m in re.finditer(r"'([^']+)':\s*\{([^}]+)\}", content):
        key = m.group(1)
        body = m.group(2)
        # Извлечь значения по языкам
        vals = {}
        for lang_m in re.finditer(r"(ru|en|zh|kk|hy|ka):\s*'((?:[^'\\]|\\.)*)'", body):
            vals[lang_m.group(1)] = lang_m.group(2)
        keys[key] = vals
    return keys


def translate_batch(items, target_lang):
    """
    Перевести пакет ключей через z-ai chat.
    items: list of (key, ru_text)
    target_lang: 'en', 'zh', 'kk', 'hy', 'ka'
    Возвращает dict {key: translated_text}
    """
    # Формируем промпт
    lines = []
    for i, (key, ru) in enumerate(items, 1):
        lines.append(f"{i}. {ru}")
    prompt_text = "\n".join(lines)

    prompt = (
        f"{LANG_INSTRUCTIONS[target_lang]}\n"
        f"Переведи следующие {len(items)} строк. "
        f"Верни ТОЛЬКО переводы по одному на строку, пронумерованные 1., 2., и т.д. "
        f"Без пояснений, без markdown. Сохраняй нумерацию.\n\n"
        f"{prompt_text}"
    )

    try:
        result = subprocess.run(
            ["z-ai", "chat", "-p", prompt, "-o", "/tmp/_i18n_trans.json"],
            capture_output=True, text=True, timeout=120
        )
        if result.returncode != 0:
            print(f"  ERROR: {result.stderr[:200]}", file=sys.stderr)
            return {}

        d = json.load(open("/tmp/_i18n_trans.json"))
        content = d.get("choices", [{}])[0].get("message", {}).get("content", "")

        # Парсим ответ — строки вида "1. переведённый текст"
        translations = {}
        for line in content.split("\n"):
            line = line.strip()
            if not line:
                continue
            # Пропускаем служебные
            if line.startswith("🚀") or line.startswith("✅") or line.startswith("#"):
                continue
            # Извлекаем номер и текст
            m = re.match(r"^(\d+)\.\s*(.+)$", line)
            if m:
                idx = int(m.group(1)) - 1
                text = m.group(2).strip()
                if 0 <= idx < len(items):
                    translations[items[idx][0]] = text
        return translations
    except Exception as e:
        print(f"  EXCEPTION: {e}", file=sys.stderr)
        return {}


def add_translations_to_file(translations_by_key):
    """
    Добавить переводы в translations.ts.
    translations_by_key: {key: {lang: text, ...}, ...}
    """
    content = PATH.read_text(encoding="utf-8")

    for key, trans in translations_by_key.items():
        for lang, text in trans.items():
            if not text:
                continue
            # Экранируем кавычки
            text_escaped = text.replace("\\", "\\\\").replace("'", "\\'")
            # Найдём строку с этим ключом и добавим перевод перед }
            # Паттерн: 'key': { ... } — найдём последнюю } в блоке
            pattern = rf"('{re.escape(key)}':\s*\{{[^}}]+)\}}"
            m = re.search(pattern, content)
            if m:
                old = m.group(0)
                # Проверим нет ли уже этого языка
                if f"{lang}:" in old:
                    continue
                # Добавим перед }
                new = m.group(1) + f", {lang}: '{text_escaped}'" + "}"
                content = content.replace(old, new, 1)

    PATH.write_text(content, encoding="utf-8")


def main():
    print("=== i18n: пакетный перевод недостающих ключей ===", flush=True)

    keys = extract_keys()
    print(f"Всего ключей: {len(keys)}", flush=True)

    for lang in TARGET_LANGS:
        # Найдём ключи где нет этого языка, но есть ru
        missing = [(k, v.get("ru", "")) for k, v in keys.items()
                   if lang not in v and v.get("ru")]
        print(f"\n--- {lang} ({LANG_NAMES[lang]}): {len(missing)} ключей ---", flush=True)

        if not missing:
            print("  Все переводы есть!", flush=True)
            continue

        # Разделим на пакеты
        batches = [missing[i:i+BATCH_SIZE] for i in range(0, len(missing), BATCH_SIZE)]
        print(f"  Пакетов: {len(batches)} по {BATCH_SIZE} ключей", flush=True)

        all_translations = {}
        for bi, batch in enumerate(batches, 1):
            print(f"  Пакет {bi}/{len(batches)}...", end=" ", flush=True)
            trans = translate_batch(batch, lang)
            print(f"получено {len(trans)}/{len(batch)}", flush=True)
            all_translations.update(trans)
            # Небольшая пауза между запросами
            time.sleep(3)

        # Добавим в файл
        add_translations_to_file({k: {lang: v} for k, v in all_translations.items()})
        print(f"  ✓ Добавлено в файл: {len(all_translations)} переводов", flush=True)

        # Обновим keys для следующего языка
        keys = extract_keys()

    print("\n=== Готово! ===", flush=True)
    # Финальная статистика
    keys = extract_keys()
    for lang in TARGET_LANGS:
        count = sum(1 for v in keys.values() if lang in v)
        print(f"  {lang}: {count}/{len(keys)}")


if __name__ == "__main__":
    main()
