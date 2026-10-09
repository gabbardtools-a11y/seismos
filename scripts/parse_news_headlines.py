"""
Парсер заголовков новостей о землетрясениях с 4 источников.

Источники:
- iz.ru — RSS https://iz.ru/xml/rss/all.xml (фильтрация по ключевым словам)
- russian.rt.com — RSS https://russian.rt.com/rss (фильтрация по ключевым словам)
- lenta.ru — RSS https://lenta.ru/rss (фильтрация по ключевым словам)
- vesti.ru — через z-ai page_reader (RSS отсутствует), парсинг HTML

Дедупликация: группировка по Jaccard на словах ≥ 0.55, выбор самого длинного.
Фильтр: только заголовки про землетрясения.

Выход: src/data/news-headlines.json
"""

import json
import re
import sys
import subprocess
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

SOURCES = [
    {
        "key": "iz",
        "name": "Известия",
        "page_url": "https://iz.ru/tag/zemletriasenie",
        "base": "https://iz.ru",
        # Tag-specific RSS возвращает HTML — парсим через page_reader
    },
    {
        "key": "rt",
        "name": "RT на русском",
        "page_url": "https://russian.rt.com/tag/zemletryasenie",
        "base": "https://russian.rt.com",
    },
    {
        "key": "lenta",
        "name": "Lenta.RU",
        "rss": "https://lenta.ru/rss",
        "base": "https://lenta.ru",
        # У Lenta общий RSS работает, фильтруем по ключевым словам
    },
    {
        "key": "vesti",
        "name": "Вести.RU",
        "page_url": "https://www.vesti.ru/proisshestviya/stikhiinye-bedstviya/zemletryaseniya",
        "base": "https://www.vesti.ru",
    },
]

EQ_KEYWORDS = ["землетряс", "сейсмо", "толчок", "магнитуд", "рясени", "эпицентр", "подземн"]


def is_earthquake(text):
    t = text.lower()
    return any(k in t for k in EQ_KEYWORDS)


def fetch_url(url):
    """Прямой HTTP-запрос через urllib (для RSS)."""
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
                "Accept": "application/rss+xml, application/xml, text/xml, */*",
            },
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  fetch_url error: {e}", file=sys.stderr)
        return ""


def fetch_page_reader(url):
    """Получить HTML через z-ai page_reader (обходит блокировки)."""
    try:
        result = subprocess.run(
            ["z-ai", "function", "-n", "page_reader",
             "-a", json.dumps({"url": url}),
             "-o", "/tmp/_news_vesti.json"],
            capture_output=True, text=True, timeout=90
        )
        if result.returncode != 0:
            return ""
        d = json.load(open("/tmp/_news_vesti.json"))
        return d.get("data", {}).get("html", "")
    except Exception as e:
        print(f"  page_reader error: {e}", file=sys.stderr)
        return ""


def parse_rss(xml_text, source):
    """Парсинг RSS — извлечение title, link, pubDate."""
    titles = []
    if not xml_text:
        return titles
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError as e:
        print(f"  RSS parse error: {e}", file=sys.stderr)
        return titles

    # RSS 2.0: channel/item
    items = root.findall(".//item")
    for item in items:
        title_el = item.find("title")
        link_el = item.find("link")
        date_el = item.find("pubDate")
        if title_el is None or not title_el.text:
            continue
        title = re.sub(r"\s+", " ", title_el.text).strip()
        url = link_el.text.strip() if link_el is not None and link_el.text else ""
        date = date_el.text.strip() if date_el is not None and date_el.text else ""
        if not title or len(title) < 15:
            continue
        if not is_earthquake(title):
            continue
        titles.append({
            "title": title,
            "url": url,
            "source": source["key"],
            "date": date,
        })
    return titles


def parse_html(html, source):
    """Парсинг HTML — поиск заголовков в <a>, <h2>/<h3>, и JSON-встроенных данных."""
    titles = []
    if not html:
        return titles

    # 1. Все <a> с длинным текстом
    for m in re.finditer(r'<a[^>]*href="([^"]+)"[^>]*>([^<]{15,300})</a>', html):
        url = m.group(1)
        text = re.sub(r"\s+", " ", m.group(2)).strip()
        if not text or not is_earthquake(text):
            continue
        if url.startswith("/"):
            url = source["base"] + url
        elif not url.startswith("http"):
            url = source["base"] + "/" + url.lstrip("/")
        titles.append({
            "title": text,
            "url": url,
            "source": source["key"],
            "date": "",
        })

    # 2. <h2>, <h3> с earthquake-текстом
    for tag in ["h2", "h3", "h4"]:
        for m in re.finditer(rf"<{tag}[^>]*>([^<]{{15,300}})</{tag}>", html):
            text = re.sub(r"\s+", " ", m.group(1)).strip()
            if not text or not is_earthquake(text):
                continue
            titles.append({
                "title": text,
                "url": "",
                "source": source["key"],
                "date": "",
            })

    # 3. JSON-встроенные данные — Vue/SSR часто сериализуют заголовки
    #    Паттерны: "title":"..."  или  "headline":"..."  или  "name":"..."
    for key in ["title", "headline", "name"]:
        for m in re.finditer(rf'"{key}"\s*:\s*"([^"\\]{{15,300}})"', html):
            text = m.group(1).strip()
            if not text or not is_earthquake(text):
                continue
            # Десанитизируем unicode-escape
            try:
                text = text.encode("utf-8").decode("unicode_escape", errors="replace")
            except Exception:
                pass
            titles.append({
                "title": text,
                "url": "",
                "source": source["key"],
                "date": "",
            })

    # 4. og:title и meta name=title (часто заголовок страницы в новостях)
    for m in re.finditer(r'<meta\s+(?:property|name)=["\']og:title["\']\s+content=["\']([^"\']{15,300})["\']', html):
        text = m.group(1).strip()
        if not text or not is_earthquake(text):
            continue
        titles.append({
            "title": text,
            "url": "",
            "source": source["key"],
            "date": "",
        })

    return titles


def tokenize(text):
    t = text.lower()
    t = re.sub(r"[^\w\s]", " ", t)
    t = re.sub(r"\d+", " ", t)
    return set(t.split())


def jaccard(a, b):
    if not a or not b:
        return 0
    inter = len(a & b)
    union = len(a | b)
    return inter / union if union else 0


def deduplicate(all_titles, threshold=0.55):
    """Группировка по похожести, выбор самого длинного из группы."""
    # Сортируем по длине убыв
    all_titles.sort(key=lambda x: len(x["title"]), reverse=True)

    groups = []
    for t in all_titles:
        t_tokens = tokenize(t["title"])
        matched = False
        for g in groups:
            if jaccard(t_tokens, g[0]["tokens"]) >= threshold:
                g.append(t)
                matched = True
                break
        if not matched:
            groups.append([t])

    result = []
    for g in groups:
        # Самый длинный заголовок в группе
        best = max(g, key=lambda x: len(x["title"]))
        all_sources = list(set([x["source"] for x in g]))
        # Если у best нет URL, попробуем найти URL в группе
        url = best["url"]
        if not url:
            for x in g:
                if x["url"]:
                    url = x["url"]
                    break
        result.append({
            "title": best["title"],
            "url": url,
            "source": best["source"],
            "all_sources": all_sources,
            "duplicate_count": len(g),
            "date": best.get("date", ""),
        })
    return result


def main():
    print("=== Парсинг заголовков новостей о землетрясениях ===", flush=True)
    all_titles = []

    for src in SOURCES:
        print(f"\n→ {src['name']}", flush=True)

        if "rss" in src:
            print(f"  RSS: {src['rss']}", flush=True)
            xml = fetch_url(src["rss"])
            print(f"  Получено: {len(xml)} символов", flush=True)
            titles = parse_rss(xml, src)
        else:
            print(f"  page_reader: {src['page_url']}", flush=True)
            html = fetch_page_reader(src["page_url"])
            print(f"  Получено: {len(html)} символов", flush=True)
            titles = parse_html(html, src)

        # Убираем дубли внутри источника
        seen = set()
        unique = []
        for t in titles:
            key = t["title"].lower().strip()
            if key not in seen:
                seen.add(key)
                unique.append(t)
        print(f"  Найдено: {len(titles)} → уникальных: {len(unique)}", flush=True)
        for t in unique[:5]:
            print(f"    [{len(t['title']):3}] {t['title'][:90]}", flush=True)
            if t["url"]:
                print(f"           → {t['url'][:100]}", flush=True)
        all_titles.extend(unique)

    print(f"\n=== Всего сырых заголовков: {len(all_titles)} ===", flush=True)

    # Добавляем tokens
    for t in all_titles:
        t["tokens"] = tokenize(t["title"])

    deduped = deduplicate(all_titles, threshold=0.55)
    print(f"=== После дедупликации: {len(deduped)} ===", flush=True)

    # Сортируем: пожирнее (длиннее) — выше
    deduped.sort(key=lambda x: len(x["title"]), reverse=True)

    result = {
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "total_raw": len(all_titles),
        "total_unique": len(deduped),
        "sources": [{"key": s["key"], "name": s["name"]} for s in SOURCES],
        "news": deduped,
    }

    out_path = Path("/home/z/my-project/src/data/news-headlines.json")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n✓ Сохранено: {out_path} ({out_path.stat().st_size} bytes)", flush=True)


if __name__ == "__main__":
    main()
