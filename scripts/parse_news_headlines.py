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
        "page_url": "https://lenta.ru/tags/story/earthquakesrussia/",
        "rss": "https://lenta.ru/rss",
        "base": "https://lenta.ru",
        # Сначала пробуем RSS, потом page_reader как fallback
    },
    {
        "key": "vesti",
        "name": "Вести.RU",
        "page_url": "https://www.vesti.ru/proisshestviya/stikhiinye-bedstviya/zemletryaseniya",
        "base": "https://www.vesti.ru",
    },
    {
        "key": "ria",
        "name": "РИА Новости",
        "rss": "https://ria.ru/export/rss2/index.xml",
        "base": "https://ria.ru",
    },
    {
        "key": "tass",
        "name": "ТАСС",
        "rss": "https://tass.ru/rss/v2.xml",
        "base": "https://tass.ru",
    },
    {
        "key": "interfax",
        "name": "Интерфакс",
        "rss": "https://www.interfax.ru/rss.asp",
        "base": "https://www.interfax.ru",
    },
    {
        "key": "nature",
        "name": "Nature (перевод)",
        "rss": "https://www.nature.com/subjects/seismology.rss",
        "base": "https://www.nature.com",
        "lang": "en",
        "needs_translation": True,
    },
]

EQ_KEYWORDS = ["землетряс", "сейсмо", "толчок", "магнитуд", "рясени", "эпицентр", "подземн"]
EQ_KEYWORDS_EN = ["earthquake", "seismic", "tremor", "magnitude", "fault", "tectonic", "tsunami"]


def is_earthquake(text, lang="ru"):
    t = text.lower()
    keywords = EQ_KEYWORDS_EN if lang == "en" else EQ_KEYWORDS
    return any(k in t for k in keywords)


def translate_title(title):
    """Перевод английского заголовка через z-ai LLM. Возвращает только перевод."""
    try:
        result = subprocess.run(
            ["z-ai", "chat", "-p",
             "Переведи на русский язык заголовок научной новости одним предложением. "
             "Сохрани технические термины (магнитуда, PGA, MSK-64, сейсмический, тектонический и т.п.). "
             "Только перевод, без пояснений и вариантов. Заголовок: " + title,
             "-o", "/tmp/_trans.json"],
            capture_output=True, text=True, timeout=60
        )
        if result.returncode == 0:
            d = json.load(open("/tmp/_trans.json"))
            content = d.get("choices", [{}])[0].get("message", {}).get("content", "")
            # Извлекаем перевод: первая строка после "**" или просто первая непустая
            lines = content.split("\n")
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                # Пропускаем служебные строки
                if line.startswith("🚀") or line.startswith("✅") or line.startswith("#"):
                    continue
                # Если строка содержит **перевод** — извлечь между **
                if line.startswith("**") and "**" in line[2:]:
                    end = line.index("**", 2)
                    return line[2:end].strip()
                # Если строка начинается с цифры-точки (вариант) — берём текст после
                if re.match(r'^\d+\.\s', line):
                    # Уберём нумерацию
                    line = re.sub(r'^\d+\.\s+', '', line)
                    if line.startswith("**") and "**" in line[2:]:
                        end = line.index("**", 2)
                        return line[2:end].strip()
                    return line
                # Иначе — первая непустая строка
                return line
        return title  # fallback — оригинал
    except Exception as e:
        print(f"  translate error: {e}", file=sys.stderr)
        return title


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
    """Парсинг RSS — извлечение title, link, pubDate. Перевод для англоязычных."""
    titles = []
    if not xml_text:
        return titles
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError as e:
        print(f"  RSS parse error: {e}", file=sys.stderr)
        return titles

    lang = source.get("lang", "ru")
    needs_translation = source.get("needs_translation", False)

    # RSS 2.0: channel/item
    items = root.findall(".//item")
    for item in items:
        title_el = item.find("title")
        link_el = item.find("link")
        date_el = item.find("pubDate")
        if title_el is None or not title_el.text:
            continue
        title_orig = re.sub(r"\s+", " ", title_el.text).strip()
        url = link_el.text.strip() if link_el is not None and link_el.text else ""
        date = date_el.text.strip() if date_el is not None and date_el.text else ""
        if not title_orig or len(title_orig) < 15:
            continue
        if not is_earthquake(title_orig, lang=lang):
            continue

        # Перевод если нужно
        title_translated = ""
        if needs_translation:
            print(f"    перевод: {title_orig[:60]}...", flush=True)
            title_translated = translate_title(title_orig)

        titles.append({
            "title": title_translated or title_orig,
            "title_orig": title_orig if needs_translation else "",
            "url": url,
            "source": source["key"],
            "date": normalize_date(date),
        })
    return titles


def parse_html(html, source):
    """
    Парсинг HTML — поиск заголовков с привязкой URL и даты.
    Возвращает список {title, url, source, date}.

    Стратегии:
    1. <a href="...">текст-заголовок</a> — URL из href, дата из ближайшего
       <time> или datePublished
    2. Заголовок в alt/img/h2 — ищем ближайший <a href> в радиусе 2000 символов
    3. JSON-встроенные данные: "title":"...", "url":"...", "date":"..."
    4. og:title — fallback, без URL
    """
    titles = []
    if not html:
        return titles

    # 1. Все <a> с длинным текстом + URL
    #    Также обрабатываем случай, когда внутри <a> есть время/категория + заголовок
    #    (vesti.ru паттерн: "02:52 вчера Происшествия Землетрясение магнитудой...")
    for m in re.finditer(r'<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', html, re.S):
        href = m.group(1)
        # Очистим контент от тегов
        raw_text = re.sub(r"<[^>]+>", " ", m.group(2))
        raw_text = re.sub(r"\s+", " ", raw_text).strip()
        if not raw_text or len(raw_text) < 15:
            continue
        if not is_earthquake(raw_text):
            continue
        # Нормализуем URL
        if href.startswith("/"):
            url = source["base"] + href
        elif not href.startswith("http"):
            url = source["base"] + "/" + href.lstrip("/")
        else:
            url = href
        # Извлекаем дату из начала текста (vesti: "HH:MM DD.MM.YYYY Категория Заголовок")
        text, date = extract_date_from_text(raw_text)
        if not text or len(text) < 15:
            continue
        # Если дата не найдена в тексте — ищем в HTML рядом
        if not date:
            date = find_date_near(html, m.start(), m.end(), radius=1500)
        titles.append({
            "title": text,
            "url": url,
            "source": source["key"],
            "date": date,
        })

    # 2. Заголовки в <h2>/<h3>/<h4>, <img alt> — ищем ближайший <a href>
    #    (для iz.ru — заголовок в alt картинки, URL в соседнем <a>)
    seen_titles = {t["title"] for t in titles}
    for tag in ["h2", "h3", "h4"]:
        for m in re.finditer(rf"<{tag}[^>]*>([^<]{{15,300}})</{tag}>", html):
            text = re.sub(r"\s+", " ", m.group(1)).strip()
            if not text or not is_earthquake(text) or text in seen_titles:
                continue
            url = find_url_near(html, m.start(), m.end(), radius=2000, base=source["base"])
            date = find_date_near(html, m.start(), m.end(), radius=2000)
            titles.append({"title": text, "url": url, "source": source["key"], "date": date})
            seen_titles.add(text)

    # 2b. Заголовки в alt="" картинок, где alt находится ВНУТРИ <a href>
    #     (точное сопоставление URL — iz.ru паттерн)
    for m in re.finditer(r'<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', html, re.S):
        href = m.group(1)
        content = m.group(2)
        if href.startswith("#") or href.startswith("javascript:"):
            continue
        alt_m = re.search(r'<img[^>]*alt="([^"]{15,300})"', content)
        if not alt_m:
            continue
        text = re.sub(r"\s+", " ", alt_m.group(1)).strip()
        if not text or not is_earthquake(text) or text in seen_titles:
            continue
        # Нормализуем URL
        if href.startswith("/"):
            url = source["base"] + href
        elif not href.startswith("http"):
            url = source["base"] + "/" + href.lstrip("/")
        else:
            url = href
        # Дата — в радиусе 1500 от этого <a>
        date = find_date_near(html, m.start(), m.end(), radius=1500)
        titles.append({"title": text, "url": url, "source": source["key"], "date": date})
        seen_titles.add(text)

    # 2c. Заголовки в alt="" картинок БЕЗ <a> вокруг — fallback на find_url_near

    # 3. JSON-встроенные данные
    for key in ["title", "headline", "name"]:
        for m in re.finditer(rf'"{key}"\s*:\s*"([^"\\]{{15,300}})"', html):
            text = m.group(1).strip()
            if not text or not is_earthquake(text) or text in seen_titles:
                continue
            try:
                text = text.encode("utf-8").decode("unicode_escape", errors="replace")
            except Exception:
                pass
            url = find_url_near(html, m.start(), m.end(), radius=1500, base=source["base"])
            date = find_date_near(html, m.start(), m.end(), radius=1500)
            titles.append({"title": text, "url": url, "source": source["key"], "date": date})
            seen_titles.add(text)

    # 4. og:title (fallback)
    for m in re.finditer(r'<meta\s+(?:property|name)=["\']og:title["\']\s+content=["\']([^"\']{15,300})["\']', html):
        text = m.group(1).strip()
        if not text or not is_earthquake(text) or text in seen_titles:
            continue
        titles.append({"title": text, "url": "", "source": source["key"], "date": ""})

    return titles


def find_url_near(html, start, end, radius=2000, base=""):
    """
    Найти ближайший URL в <a href="..."> к позиции заголовка.
    Возвращает абсолютный URL того <a>, который ближайший к [start, end].

    Логика: ищем все <a href> в радиусе `radius`, выбираем тот,
    у которого минимальное расстояние от позиции href до позиции заголовка.
    """
    search_start = max(0, start - radius)
    search_end = min(len(html), end + radius)
    snippet = html[search_start:search_end]

    # Все <a href> в сниппете с их абсолютной позицией
    candidates = []
    for m in re.finditer(r'<a[^>]*href="([^"]+)"[^>]*>', snippet):
        href = m.group(1)
        if href.startswith("#") or href.startswith("javascript:"):
            continue
        # Нормализуем
        if href.startswith("/"):
            href = base + href
        elif not href.startswith("http"):
            href = base + "/" + href.lstrip("/")
        # Абсолютная позиция href в html
        abs_pos = search_start + m.start()
        # Расстояние от href до интервала заголовка
        if abs_pos < start:
            dist = start - abs_pos
        elif abs_pos > end:
            dist = abs_pos - end
        else:
            dist = 0  # href внутри заголовка — ближайший
        candidates.append((dist, href))

    if not candidates:
        return ""

    # Берём ближайший по расстоянию
    candidates.sort(key=lambda x: x[0])
    return candidates[0][1]


def find_date_near(html, start, end, radius=1500):
    """
    Найти дату публикации в радиусе `radius` символов от [start, end].
    Возвращает ISO-строку или пустую строку.

    Ищет:
    - <meta itemprop="datePublished" content="...">
    - <time datetime="...">
    - data-date="..."
    - "date":"..." / "publishedAt":"..." в JSON
    """
    search_start = max(0, start - radius)
    search_end = min(len(html), end + radius)
    snippet = html[search_start:search_end]

    # 1. <meta itemprop="datePublished" content="...">
    m = re.search(r'datePublished"\s*content="([^"]+)"', snippet)
    if m:
        return normalize_date(m.group(1))

    # 2. <time datetime="...">
    m = re.search(r'<time[^>]*datetime="([^"]+)"', snippet)
    if m:
        return normalize_date(m.group(1))

    # 3. datetime="..." атрибут вообще
    m = re.search(r'datetime="(\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}[^"]*)"', snippet)
    if m:
        return normalize_date(m.group(1))

    # 4. data-date="..."
    m = re.search(r'data-date="([^"]+)"', snippet)
    if m:
        return normalize_date(m.group(1))

    # 5. JSON: "date":"..." / "publishedAt":"..." / "pubDate":"..."
    m = re.search(r'"(?:date|publishedAt|pubDate|publishDate|createdAt|published_time)"\s*:\s*"([^"]+)"', snippet)
    if m:
        return normalize_date(m.group(1))

    # 6. Извлечение даты из URL (например /news/2026/10/09/...)
    m = re.search(r'/(\d{4})/(\d{2})/(\d{2})/', snippet)
    if m:
        return f"{m.group(1)}-{m.group(2)}-{m.group(3)}"

    return ""


def normalize_date(s):
    """Нормализовать дату к ISO-формату YYYY-MM-DD или YYYY-MM-DDTHH:MM."""
    s = s.strip()
    if not s:
        return ""

    # Уже ISO?
    if re.match(r'^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?', s):
        return s

    # DD.MM.YYYY
    m = re.match(r'^(\d{1,2})\.(\d{1,2})\.(\d{4})', s)
    if m:
        return f"{m.group(3)}-{int(m.group(2)):02d}-{int(m.group(1)):02d}"

    # YYYY-MM-DD HH:MM
    m = re.match(r'^(\d{4})-(\d{1,2})-(\d{1,2})[ T](\d{1,2}):(\d{2})', s)
    if m:
        return f"{m.group(1)}-{int(m.group(2)):02d}-{int(m.group(3)):02d}T{int(m.group(4)):02d}:{m.group(5)}"

    # RSS pubDate: 'Fri, 9 Oct 2026 17:45:58 +0000' (RFC-822)
    try:
        from datetime import datetime
        # Нормализуем день: '9 Oct' → '09 Oct'
        normalized = re.sub(r'(\s)(\d)(\s)', r'\g<1>0\g<2>\g<3>', s, count=1)
        d = datetime.strptime(normalized, "%a, %d %b %Y %H:%M:%S %z")
        return d.isoformat()
    except (ValueError, TypeError):
        pass

    return s


def extract_date_from_text(text):
    """
    Извлечь дату/время и очистить заголовок.

    Поддерживаемые паттерны:
    1. vesti: "HH:MM DD.MM.YYYY Категория Заголовок" — дата в начале
    2. vesti: "HH:MM вчера/сегодня Категория Заголовок" — дата в начале
    3. iz.ru: "DD месяца YYYY, HH:MM Заголовок [лид...]" — дата в начале
    4. lenta: "Заголовок HH:MM, DD месяца YYYY Категория" — дата в конце
    5. lenta: "Заголовок HH:MM, DD месяца YYYY" — дата в конце

    Также убираем имя автора в конце (vesti: "... Заголовок Имя Фамилия")

    Возвращает (clean_title, iso_date).
    """
    # Паттерн 1: "HH:MM DD.MM.YYYY Категория Заголовок" (vesti)
    m = re.match(r'^(\d{1,2}:\d{2})\s+(\d{1,2}\.\d{1,2}\.\d{4})\s+\S+\s+(.+)$', text)
    if m:
        time_str, date_str, title = m.group(1), m.group(2), m.group(3).strip()
        dm = re.match(r'(\d{1,2})\.(\d{1,2})\.(\d{4})', date_str)
        tm = re.match(r'(\d{1,2}):(\d{2})', time_str)
        if dm and tm:
            iso = f"{dm.group(3)}-{int(dm.group(2)):02d}-{int(dm.group(1)):02d}T{int(tm.group(1)):02d}:{tm.group(2)}"
            return clean_title_end(title), iso
        return clean_title_end(title), ""

    # Паттерн 2: "HH:MM вчера/сегодня Категория Заголовок" (vesti)
    m = re.match(r'^(\d{1,2}:\d{2})\s+(вчера|сегодня)\s+\S+\s+(.+)$', text, re.IGNORECASE)
    if m:
        time_str, day_word, title = m.group(1), m.group(2).lower(), m.group(3).strip()
        from datetime import datetime, timedelta, timezone
        now = datetime.now(timezone.utc)
        d = now - timedelta(days=1) if day_word == "вчера" else now
        tm = re.match(r'(\d{1,2}):(\d{2})', time_str)
        if tm:
            iso = f"{d.year}-{d.month:02d}-{d.day:02d}T{int(tm.group(1)):02d}:{tm.group(2)}"
            return clean_title_end(title), iso
        return clean_title_end(title), ""

    # Паттерн 3: iz.ru — "DD месяца YYYY, HH:MM Заголовок [лид]"
    MONTHS_RU = {
        "января": 1, "февраля": 2, "марта": 3, "апреля": 4, "мая": 5, "июня": 6,
        "июля": 7, "августа": 8, "сентября": 9, "октября": 10, "ноября": 11, "декабря": 12
    }
    m = re.match(
        r'^(\d{1,2})\s+(' + "|".join(MONTHS_RU.keys()) + r')\s+(\d{4}),\s+(\d{1,2}:\d{2})\s+(.+)$',
        text
    )
    if m:
        day, month_name, year, time_str, rest = m.groups()
        month = MONTHS_RU[month_name]
        tm = re.match(r'(\d{1,2}):(\d{2})', time_str)
        # rest = "Заголовок В <лид>..." — нужно отрезать от "В " если есть
        # Обычно iz.ru: "Заголовок В [первое слово лида]"
        # Возьмём первое предложение
        title = rest.strip()
        # Если есть " В " или " На " в начале остатка — это лида, отрежем
        # Но это рискованно. Возьмём только первое предложение до точки/вопроса
        # или до двойного пробела
        # На практике iz.ru: "Заголовок Подземные толчки..." — заголовок = первое слово до "Подземные"
        # Проще: заголовок = текст до первой заглавной буквы после строчной (но это сложно)
        # Альтернатива: взять весь rest как заголовок (с лидом)
        # Лучше: отрезать по первому "В " или "На " или "За " если они после пробела
        # и перед ними стоит строчная буква (конец заголовка)
        # Простой подход: отрезать по " В " (типичный iz.ru паттерн)
        m2 = re.match(r'^(.+?[а-я])\s+(?:В|На|За|По|Как|После|Из-за)\s+', title)
        if m2:
            title = m2.group(1)
        if tm:
            iso = f"{year}-{month:02d}-{int(day):02d}T{int(tm.group(1)):02d}:{tm.group(2)}"
            return title, iso
        return title, ""

    # Паттерн 4: lenta — "Заголовок HH:MM, DD месяца YYYY Категория"
    m = re.search(r'\s+(\d{1,2}:\d{2}),\s+(\d{1,2})\s+(' + "|".join(MONTHS_RU.keys()) + r')\s+(\d{4})(?:\s+\S+)?\s*$', text)
    if m:
        time_str, day, month_name, year = m.group(1), m.group(2), m.group(3), m.group(4)
        month = MONTHS_RU[month_name]
        # Заголовок = всё до этого паттерна
        title = text[:m.start()].strip()
        tm = re.match(r'(\d{1,2}):(\d{2})', time_str)
        if tm:
            iso = f"{year}-{month:02d}-{int(day):02d}T{int(tm.group(1)):02d}:{tm.group(2)}"
            return title, iso
        return title, ""

    # Паттерн 5: просто время в конце "Заголовок HH:MM" — без даты
    m = re.search(r'\s+\d{1,2}:\d{2}\s*$', text)
    if m:
        return text[:m.start()].strip(), ""

    # Дата не найдена — возвращаем как есть
    return text, ""


def clean_title_end(title):
    """
    Очистить заголовок от имени автора в конце (vesti: "... Заголовок Имя Фамилия").
    Эвристика: если последние 1-2 слова — это имя (начинаются с заглавной,
    не содержат точек/длинных слов), отрезаем.
    """
    # Простой подход: отрезать последнее слово если оно похоже на имя
    # (одно-два слова с заглавной, до 15 символов, без цифр и знаков)
    words = title.split()
    if len(words) < 4:
        return title
    # Проверим последние 2 слова
    last1 = words[-1]
    last2 = words[-2] if len(words) >= 2 else ""
    # Имя — кириллица, заглавная, до 15 символов
    def is_name(w):
        return (
            len(w) <= 15
            and w[0].isupper() if w else False
            and re.match(r'^[А-ЯЁ][а-яё]+$', w) is not None
        )
    if is_name(last1) and is_name(last2):
        # Два слова-имени — отрезаем оба
        return " ".join(words[:-2])
    if is_name(last1):
        return " ".join(words[:-1])
    return title


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
            "title_orig": best.get("title_orig", ""),
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

        titles = []
        # Если есть RSS — пробуем сначала его
        if "rss" in src:
            print(f"  RSS: {src['rss']}", flush=True)
            xml = fetch_url(src["rss"])
            print(f"  Получено: {len(xml)} символов", flush=True)
            titles = parse_rss(xml, src)

        # Если RSS пустой или нет RSS — пробуем page_reader
        if not titles and "page_url" in src:
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
