"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin, Globe2 } from "lucide-react";

/**
 * CapitalsCarousel — интерактивная карусель столиц сейсмически активных
 * регионов ЕАЭС и СНГ. Стрелки ← → для переключения, автопрокрутка.
 *
 * Столицы те же что на SVG-карте (scripts/geo_svg_map.py):
 * Москва, Минск, Астана, Ереван, Бишкек, Душанбе, Ташкент, Ашхабад, Тбилиси.
 */
type Capital = {
  name: string;
  country: string;
  flag: string;
  seismicity: string;
  ball: number;
  description: string;
  lat: number;
  lon: number;
};

const CAPITALS: Capital[] = [
  {
    name: "Москва",
    country: "Россия",
    flag: "🇷🇺",
    seismicity: "Низкая",
    ball: 4,
    description: "Центральная часть Русской платформы — стабильный докембрийский кристаллический фундамент. Сейсмическая активность минимальна, но объекты повышенной ответственности проектируются с учётом возможных удалённых карпатских и кавказских событий.",
    lat: 55.7558,
    lon: 37.6173,
  },
  {
    name: "Минск",
    country: "Беларусь",
    flag: "🇧🇾",
    seismicity: "Низкая",
    ball: 4,
    description: "Восточно-Европейская платформа, зона низкой сейсмичности. Основной фактор — удалённые землетрясения Карпатского региона, способные вызвать слабые сотрясения на больших расстояниях.",
    lat: 53.9006,
    lon: 27.559,
  },
  {
    name: "Астана",
    country: "Казахстан",
    flag: "🇰🇿",
    seismicity: "Умеренная",
    ball: 5,
    description: "Казахская платформа — относительно стабильная. Однако на юге Казахстана (Алматы) сейсмичность достигает 9–10 баллов из-за Северного Тянь-Шаня. Астана находится в зоне 5-балльной сейсмичности.",
    lat: 51.1694,
    lon: 71.4491,
  },
  {
    name: "Ереван",
    country: "Армения",
    flag: "🇦🇲",
    seismicity: "Высокая",
    ball: 9,
    description: "Зона активной альпийской складчатости, один из самых сейсмоопасных регионов Кавказа. Спитакское землетрясение 1988 года (M6.8, 25 000 жертв) — трагическое напоминание. Город проектируется на 9 баллов MSK-64.",
    lat: 40.1792,
    lon: 44.4991,
  },
  {
    name: "Бишкек",
    country: "Кыргызстан",
    flag: "🇰🇬",
    seismicity: "Высокая",
    ball: 9,
    description: "Северный Тянь-Шань — зона высокой сейсмичности. Кеминское землетрясение 1911 года (M8.2) — одно из сильнейших в Центральной Азии. Город проектируется на 9 баллов, активны разломы в 30–60 км от столицы.",
    lat: 42.8746,
    lon: 74.5698,
  },
  {
    name: "Душанбе",
    country: "Таджикистан",
    flag: "🇹🇯",
    seismicity: "Высокая",
    ball: 9,
    description: "Памиро-Гиндукушская зона — самая сейсмически активная территория Центральной Азии. Гармское землетрясение 1941 года (M6.4), Хаитское 1949 (M7.4). Город проектируется на 9 баллов MSK-64.",
    lat: 38.5598,
    lon: 68.787,
  },
  {
    name: "Ташкент",
    country: "Узбекистан",
    flag: "🇺🇿",
    seismicity: "Высокая",
    ball: 8,
    description: "Ташкентское землетрясение 1966 года (M5.2, интенсивность 8 баллов) разрушило центр города. Сейсмичность обусловлена активностью Каржантауского и Чаткальского разломов. Проектируется на 8 баллов.",
    lat: 41.2995,
    lon: 69.2401,
  },
  {
    name: "Ашхабад",
    country: "Туркменистан",
    flag: "🇹🇲",
    seismicity: "Высокая",
    ball: 9,
    description: "Ашхабадское землетрясение 1948 года (M7.3, интенсивность 9–10 баллов) — одна из крупнейших сейсмических катастроф XX века, 110 000 жертв. Город полностью отстроен заново с сейсмостойкими нормами на 9 баллов.",
    lat: 37.9601,
    lon: 58.3261,
  },
  {
    name: "Тбилиси",
    country: "Грузия",
    flag: "🇬🇪",
    seismicity: "Умеренная",
    ball: 8,
    description: "Большой Кавказ — активная сейсмическая зона. Тбилисское землетрясение 2002 года (M4.5, 7 баллов) нанесло значительный ущерб историческому центру. Проектируется на 8 баллов, активны разломы Мтквари и Триалети.",
    lat: 41.7151,
    lon: 44.8271,
  },
];

export function CapitalsCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % CAPITALS.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + CAPITALS.length) % CAPITALS.length);
  }, []);

  // Автопрокрутка каждые 5 секунд
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, autoplay]);

  const cap = CAPITALS[activeIdx];

  // Цвет по балльности
  const ballColor =
    cap.ball >= 9
      ? "bg-red-600 text-white"
      : cap.ball >= 7
      ? "bg-orange-500 text-white"
      : cap.ball >= 5
      ? "bg-yellow-400 text-gray-900"
      : "bg-green-400 text-gray-900";

  return (
    <div className="mt-6 mb-2 bg-[#F8FBF9] border border-[#D6DCE3] rounded-2xl p-5 sm:p-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
          ЕАЭС и СНГ — столицы сейсмически активных регионов
        </div>
        <span className="text-[11px] text-[#4A6378]/60">
          {activeIdx + 1} / {CAPITALS.length}
        </span>
      </div>

      {/* Карусель */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Стрелка влево */}
        <button
          onClick={() => {
            prev();
            setAutoplay(false);
          }}
          aria-label="Предыдущая столица"
          className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-[#00549F]/30 text-[#00549F] hover:bg-[#00549F] hover:text-white hover:border-[#00549F] transition-colors"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Карточка столицы */}
        <div className="flex-1 min-w-0">
          <div
            key={activeIdx}
            className="bg-white border border-[#D6DCE3] rounded-xl p-4 sm:p-5 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-2xl flex-shrink-0">{cap.flag}</span>
                <div className="min-w-0">
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-[#003366] leading-tight truncate">
                    {cap.name}
                  </h3>
                  <p className="text-[12px] text-[#4A6378] flex items-center gap-1">
                    <Globe2 className="h-3 w-3" />
                    {cap.country}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${ballColor}`}>
                  {cap.ball} баллов
                </span>
                <span className="text-[10px] tracking-[0.1em] uppercase text-[#4A6378]/60">
                  {cap.seismicity}
                </span>
              </div>
            </div>

            <p className="text-[13px] text-[#4A6378] leading-relaxed mb-3">
              {cap.description}
            </p>

            <div className="flex items-center gap-3 text-[11px] text-[#4A6378]/70">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {cap.lat.toFixed(2)}°, {cap.lon.toFixed(2)}°
              </span>
            </div>
          </div>
        </div>

        {/* Стрелка вправо */}
        <button
          onClick={() => {
            next();
            setAutoplay(false);
          }}
          aria-label="Следующая столица"
          className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-[#00549F]/30 text-[#00549F] hover:bg-[#00549F] hover:text-white hover:border-[#00549F] transition-colors"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Точки-индикаторы */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {CAPITALS.map((c, i) => (
          <button
            key={c.name}
            onClick={() => {
              setActiveIdx(i);
              setAutoplay(false);
            }}
            aria-label={`Перейти к ${c.name}`}
            className={`h-2 rounded-full transition-all ${
              i === activeIdx
                ? "w-6 bg-[#00549F]"
                : "w-2 bg-[#00549F]/20 hover:bg-[#00549F]/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
