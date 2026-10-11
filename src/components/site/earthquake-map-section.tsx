/**
 * Карта землетрясений — интерактивный виджет на Leaflet + USGS feed.
 * Самодостаточный HTML в /public/earthquake-map.html, встраивается через iframe.
 * Размещается сразу после Hero. Под картой — CTA-блок «Симулятор».
 */
import Link from "next/link";
import { ArrowRight, Brain } from "lucide-react";

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
              Данные в реальном времени: Геологическая служба США (USGS) — глобально,
              и открытый API ФИЦ ЕГС РАН (eqalert.ru) — сейсмичность РФ и сопредельных
              районов. Обновление — каждые 2 минуты. Магнитуда, глубина и место
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
            Источники данных:{" "}
            <a
              href="https://earthquake.usgs.gov/earthquakes/feed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2"
            >
              USGS
            </a>{" "}
            ·{" "}
            <a
              href="https://eqalert.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2"
            >
              eqalert.ru
            </a>{" "}
            · Public Domain
          </span>
          <span>
            Плитки: Esri Light/Dark Gray Canvas · OpenStreetMap contributors
          </span>
        </div>

        {/* CTA-блок «Симулятор» */}
        <div className="mt-8 bg-gradient-to-r from-[#003366] to-[#00549F] rounded-2xl p-6 lg:p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="flex-none w-12 h-12 bg-[#22C55E]/20 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-[#22C55E]" />
              </div>
              <div>
                <div className="text-[11px] tracking-[0.14em] uppercase text-white/60 font-semibold mb-1">
                  Интерактивная модель
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-2 leading-tight">
                  Симулятор землетрясений
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Задайте магнитуду и глубину очага, поставьте эпицентр на карту —
                  увидите изосейсты (зоны в баллах МСК-64) и оценку баллов для
                  выбранного города. Модель: формула Блейка (1971).
                </p>
              </div>
            </div>
            <Link
              href="/simulator"
              className="flex-none inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#1ea44a] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              Открыть симулятор
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
