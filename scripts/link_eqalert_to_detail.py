"""
Правки earthquake-map.html:
1. Сохранять it.id в данных eqalert-событий
2. Формировать URL на нашу страницу /earthquake/<id> вместо eqalert.ru
3. В попапе — менять текст ссылки на 'Подробнее →' для eqalert
"""
from pathlib import Path

PATH = Path("/home/z/my-project/public/earthquake-map.html")
html = PATH.read_text(encoding="utf-8")

# 1. Сохраняем id в данных eqalert-событий
OLD_URL_LINE = "agency: it.agency || '', src: 'eqalert', url: 'https://eqalert.ru/',"
NEW_URL_LINE = "id: it.id || '', agency: it.agency || '', src: 'eqalert', url: (it.id ? '/earthquake/' + it.id : ''),"
assert OLD_URL_LINE in html, "OLD_URL_LINE not found"
html = html.replace(OLD_URL_LINE, NEW_URL_LINE, 1)

# 2. В попапе — для eqalert меняем текст ссылки
OLD_POPUP_LINK = """(p.url ? '<a class="lnk" href="' + p.url + '" target="_blank" rel="noopener">' +
      (p.src === 'eqalert' ? 'Данные: eqalert.ru →' : 'Подробнее на сайте USGS →') + '</a>' : '') +"""
NEW_POPUP_LINK = """(p.url ? '<a class="lnk" href="' + p.url + '"' +
      (p.src === 'eqalert' ? '' : ' target="_blank" rel="noopener"') + '>' +
      (p.src === 'eqalert' ? 'Подробнее →' : 'Подробнее на сайте USGS →') + '</a>' : '') +"""
assert OLD_POPUP_LINK in html, "OLD_POPUP_LINK not found"
html = html.replace(OLD_POPUP_LINK, NEW_POPUP_LINK, 1)

PATH.write_text(html, encoding="utf-8")
print("OK — eqalert events now link to /earthquake/<id> instead of eqalert.ru")
print("Changes:")
print("  1. id field added to eqalert event data")
print("  2. url formed as '/earthquake/<id>'")
print("  3. popup link text: 'Подробнее →' (internal, no target=_blank)")
