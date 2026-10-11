"""
Добавляет блок «Реальные землетрясения» в earthquake-map.html:
1) CSS для #presets
2) HTML-блок после #rf-row
3) JS-логика: flyTo + маркер эпицентра + попап с информацией
"""
import re
from pathlib import Path

PATH = Path("/home/z/my-project/public/earthquake-map.html")
html = PATH.read_text(encoding="utf-8")

# ─── 1. CSS ────────────────────────────────────────────────────────────────
CSS_PRESETS = """  #presets{margin-bottom:10px;border-top:1px solid var(--line);padding-top:10px}
  #presets .ph{display:flex;align-items:center;justify-content:space-between;
    font-size:10.5px;text-transform:uppercase;letter-spacing:.6px;color:var(--dim);
    font-weight:700;margin-bottom:7px}
  #presets .ph a{font-size:11px;text-transform:none;letter-spacing:0;color:var(--link);
    text-decoration:none;font-weight:600}
  #presets .ph a:hover{text-decoration:underline}
  #presets .grid{display:grid;grid-template-columns:1fr 1fr;gap:4px}
  #presets button{border:1px solid var(--line);background:var(--chip);color:var(--txt);
    font:inherit;font-size:10.5px;padding:5px 6px;border-radius:8px;cursor:pointer;
    transition:background .15s;text-align:left;line-height:1.25}
  #presets button:hover{background:var(--chip-hover)}
  #presets button b{display:block;font-weight:700;font-size:11px;margin-bottom:1px}
  #presets button small{color:var(--dim);font-size:9.5px}

  @media (max-width:640px){"""

CSS_MARKER = "  @media (max-width:640px){"

# CSS-вставка
assert CSS_MARKER in html, "CSS marker not found"
html = html.replace(
    CSS_MARKER,
    CSS_PRESETS,
    1
)

# ─── 2. HTML блок пресетов ─────────────────────────────────────────────────
PRESETS_HTML = """  <div id="presets">
    <div class="ph">
      <span>Реальные землетрясения</span>
      <a href="https://earthquake.usgs.gov/earthquakes/browse/" target="_blank" rel="noopener">история →</a>
    </div>
    <div class="grid" id="presets-grid"></div>
  </div>
"""

# Вставляем после </div> блока #rf-row, перед <div id="stats">
STATS_MARKER = '  <div id="stats">'
assert STATS_MARKER in html, "stats marker not found"
html = html.replace(STATS_MARKER, PRESETS_HTML + STATS_MARKER, 1)

# ─── 3. JS-логика ──────────────────────────────────────────────────────────
# Список реальных землетрясений (координаты эпицентра, магнитуда, год, место, страна)
PRESETS_JS = """
/* ════════ РЕАЛЬНЫЕ ЗЕМЛЕТРЯСЕНИЯ (пресеты) ════════ */
var PRESETS = [
  { lat:52.75,  lon:160.05, mag:9.0,  year:1952, place:'Камчатка',            country:'СССР / Россия' },
  { lat:38.30,  lon:142.37, mag:9.1,  year:2011, place:'Тохоку',              country:'Япония' },
  { lat:3.30,   lon:95.98,  mag:9.1,  year:2004, place:'Суматра',             country:'Индонезия' },
  { lat:-38.14, lon:-73.61, mag:9.5,  year:1960, place:'Вальдивия',           country:'Чили' },
  { lat:40.97,  lon:44.20,  mag:6.8,  year:1988, place:'Спитак',              country:'Армения / СССР' },
  { lat:51.85,  lon:143.10, mag:7.1,  year:1995, place:'Нефтегорск',          country:'Сахалин / Россия' },
  { lat:41.30,  lon:69.25,  mag:5.2,  year:1966, place:'Ташкент',             country:'Узбекистан / СССР' },
  { lat:37.23,  lon:37.16,  mag:7.8,  year:2023, place:'Кахраманмараш',       country:'Турция' },
  { lat:37.75,  lon:-122.45,mag:7.9,  year:1906, place:'Сан-Франциско',       country:'США' },
  { lat:18.46,  lon:-72.53, mag:7.0,  year:2010, place:'Гаити',               country:'Гаити' },
  { lat:28.23,  lon:84.73,  mag:7.8,  year:2015, place:'Непал (Горкха)',      country:'Непал' },
  { lat:34.58,  lon:135.00, mag:6.9,  year:1995, place:'Кобе',                country:'Япония' },
  { lat:43.20,  lon:132.00, mag:7.2,  year:2024, place:'Японское море',       country:'Россия / Япония' },
  { lat:-3.50,  lon:101.00, mag:6.2,  year:2009, place:'Суматра (Паданг)',    country:'Индонезия' },
  { lat:39.90,  lon:140.00, mag:7.1,  year:2008, place:'Ивате',               country:'Япония' },
  { lat:32.51,  lon:130.62, mag:7.1,  year:2016, place:'Кумамото',            country:'Япония' }
];

var presetLayer = L.layerGroup().addTo(map);
var presetActive = null;

function presetColor(mag){
  if (mag < 6) return '#ff7a45';
  if (mag < 7) return '#ff4d3d';
  if (mag < 8) return '#ff2d2d';
  return '#c70000';
}
function presetRadius(mag){
  return Math.max(8, Math.min(28, 8 + (mag - 4) * 4));
}

function showPreset(p){
  presetLayer.clearLayers();
  var color = presetColor(p.mag);
  var r = presetRadius(p.mag);
  /* Внешний пульсирующий круг (для M≥7) */
  if (p.mag >= 7){
    L.circleMarker([p.lat, p.lon], {
      radius: r * 1.6, color: color, weight: 1.5, opacity: .55,
      fillColor: color, fillOpacity: .12, className: 'eq-ring'
    }).addTo(presetLayer);
  }
  /* Основной маркер */
  var m = L.circleMarker([p.lat, p.lon], {
    radius: r, color: '#fff', weight: 2, fillColor: color, fillOpacity: .9
  }).addTo(presetLayer);
  m.bindPopup(
    '<div class="eqp">' +
      '<div class="m">M ' + p.mag.toFixed(1) + '</div>' +
      '<div class="p">' + p.place + (p.country ? ' · ' + p.country : '') + '</div>' +
      '<table>' +
        '<tr><td>Год</td><td>' + p.year + '</td></tr>' +
        '<tr><td>Координаты</td><td>' + p.lat.toFixed(2) + '°, ' + p.lon.toFixed(2) + '°</td></tr>' +
        '<tr><td>Источник</td><td><a href="https://earthquake.usgs.gov/earthquakes/" target="_blank" rel="noopener">USGS</a></td></tr>' +
      '</table>' +
    '</div>',
    { className: 'eq-popup', maxWidth: 260 }
  );
  presetLayer.addTo(map);
  presetActive = p;
  /* Летим к эпицентру: зум зависит от магнитуды */
  var z = p.mag >= 8 ? 5 : p.mag >= 7 ? 6 : 7;
  map.flyTo([p.lat, p.lon], z, { duration: 1.2 });
  setTimeout(function(){ m.openPopup(); }, 1300);
}

function clearPreset(){
  presetLayer.clearLayers();
  presetActive = null;
  /* Сбрасываем активную кнопку */
  var btns = document.querySelectorAll('#presets-grid button');
  btns.forEach(function(b){ b.classList.remove('on'); });
}

/* Рендер кнопок пресетов */
(function renderPresets(){
  var grid = document.getElementById('presets-grid');
  if (!grid) return;
  PRESETS.forEach(function(p, i){
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.innerHTML = '<b>' + p.place + '</b><small>M' + p.mag.toFixed(1) + ' · ' + p.year + '</small>';
    btn.addEventListener('click', function(){
      var wasActive = btn.classList.contains('on');
      clearPreset();
      if (wasActive){
        /* Если уже был активен — сбрасываем и возвращаемся к виду по умолчанию */
        try { fitToData(); } catch(e){ map.setView(HOME, HOME_ZOOM); }
        return;
      }
      btn.classList.add('on');
      showPreset(p);
    });
    grid.appendChild(btn);
  });
})();
"""

# Вставляем JS перед закрывающим </script>
SCRIPT_CLOSE = "</script>"
# Находим ПОСЛЕДНИЙ </script> (это основной скрипт)
last_script_idx = html.rfind(SCRIPT_CLOSE)
assert last_script_idx > -1, "no </script> found"
html = html[:last_script_idx] + PRESETS_JS + "\n" + html[last_script_idx:]

# ─── 4. Сохраняем ──────────────────────────────────────────────────────────
PATH.write_text(html, encoding="utf-8")
print(f"OK — file saved ({len(html)} bytes)")
print(f"Presets added: 16 реальных землетрясений")
