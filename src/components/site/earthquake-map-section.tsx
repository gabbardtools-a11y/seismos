/**
 * Карта землетрясений — интерактивный виджет на Leaflet + USGS feed.
 * Самодостаточный HTML в /public/earthquake-map.html, встраивается через iframe.
 * Размещается сразу после Hero.
 */
export function EarthquakeMapSection() {
  return (
    <section
      id="map"
      className="relative bg-white py-16 lg:py-20 border-y border-[#D6DCE3]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-[#22C55E]" />
              <span className="eyebrow text-[#2D5F3F]">
                Live · USGS Earthquake Feed
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold tracking-[-0.01em] text-[#003366] mb-3 leading-[1.1]">
              Интерактивная карта землетрясений России и мира
            </h2>
            <p className="text-sm sm:text-base text-[#4A6378] leading-relaxed">
              Данные в реальном времени от Геологической службы США (USGS).
              Обновление фида — каждую минуту. Магнитуда, глубина и место
              толчка отображаются по клику на маркер.
            </p>
          </div>

          {/* Легенда-плашка справа */}
          <div className="flex items-center gap-3 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FFB100]" />
              M 4–5
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF6B4A]" />
              M 5–6
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF1F1F]" />
              M 6+
            </span>
          </div>
        </div>

        {/* Iframe с картой */}
        <div
          className="relative rounded-2xl overflow-hidden border border-[#D6DCE3] shadow-xl"
          style={{ height: "640px" }}
        >
          <iframe
            src="/earthquake-map.html"
            title="Интерактивная карта землетрясений — USGS"
            loading="lazy"
            className="w-full h-full"
            style={{ border: 0, background: "#ffffff" }}
            allowFullScreen
          />
        </div>

        {/* Атрибуция */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-[#4A6378]">
          <span>
            Источник данных:{" "}
            <a
              href="https://earthquake.usgs.gov/earthquakes/feed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2"
            >
              USGS Earthquake Hazards Program
            </a>{" "}
            · Public Domain
          </span>
          <span>
            Плитки: CARTO Dark · OpenStreetMap contributors
          </span>
        </div>
      </div>
    </section>
  );
}
