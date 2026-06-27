"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import {
  AlertTriangle,
  Activity,
  MapPin,
  Clock,
  Waves,
  TrendingUp,
  Info,
} from "lucide-react";
import {
  LEVELS,
  SEISMIC_MAP,
  TOP_HAZARDOUS,
  STATS,
  type RegionSeismicData,
  type SeismicLevel,
} from "./seismic-data";

const GEOJSON_URL = "/data/russia-regions.json";

/**
 * СЕЙСМИЧЕСКАЯ КАРТА РОССИИ
 *
 * Интерактивная карта 83 регионов России с цветовой кодировкой по уровню
 * сейсмической опасности (ОСР-2018 / ШСМ-2017, 5 уровней).
 */
export function SeismicMapSection() {
  const [hovered, setHovered] = useState<RegionSeismicData | null>(null);
  const [selected, setSelected] = useState<RegionSeismicData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const active = selected || hovered;

  const handleMouseEnter = useCallback(
    (geo: { properties: Record<string, unknown> }, evt: React.MouseEvent) => {
      const name = (geo.properties.name as string) || "";
      const data = SEISMIC_MAP[name];
      if (data) {
        setHovered(data);
      } else {
        setHovered({
          name,
          level: 1,
          intensity: 3,
          note: "Низкая сейсмическая активность. Регион не входит в перечень сейсмоопасных по ОСР-2018.",
        });
      }
      setTooltipPos({ x: evt.clientX, y: evt.clientY });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
  }, []);

  const handleClick = useCallback(
    (geo: { properties: Record<string, unknown> }) => {
      const name = (geo.properties.name as string) || "";
      const data = SEISMIC_MAP[name];
      if (data) {
        setSelected((prev) => (prev?.name === name ? null : data));
      }
    },
    []
  );

  return (
    <section
      id="map"
      className="section-pad bg-[#FAF7F2] border-b border-[#D6DCE3]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">03 · Карта сейсмической опасности</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            Карта сейсмической опасности{" "}
            <span className="text-[#00549F]">регионов России</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Интерактивная карта 83 субъектов Российской Федерации с цветовой
            кодировкой по уровню сейсмической опасности (ОСР-2018). Источник
            данных — карты общего сейсмического районирования СП 14.13330.2018.
            Наведите курсор на регион, чтобы увидеть краткую справку; кликните —
            чтобы открыть детальную информацию в боковой панели.
          </p>
        </div>

        {/* Сводные метрики */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#D6DCE3] border border-[#D6DCE3] mb-10">
          <StatCard
            icon={<MapPin className="h-5 w-5" />}
            value={STATS.totalRegions.toString()}
            label="регионов на карте"
          />
          <StatCard
            icon={<AlertTriangle className="h-5 w-5" />}
            value={STATS.hazardousRegions.toString()}
            label="регионов высокой опасности"
            highlight
          />
          <StatCard
            icon={<Activity className="h-5 w-5" />}
            value={STATS.monitoredRegions.toString()}
            label="регионов под мониторингом"
          />
          <StatCard
            icon={<Waves className="h-5 w-5" />}
            value={`${STATS.highestIntensity} баллов`}
            label="максимальная интенсивность"
            highlight
          />
        </div>

        {/* Основная сетка: карта + панель информации */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ====== КАРТА ====== */}
          <div className="lg:col-span-8 bg-white border border-[#D6DCE3] relative overflow-hidden">
            {/* Заголовок карты */}
            <div className="px-5 py-4 border-b border-[#D6DCE3] flex items-center justify-between bg-[#F2F4F7]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#00549F]" />
                <span className="text-[12px] tracking-[0.12em] uppercase font-bold text-[#003366]">
                  ОСР-2018 · Карта сейсмического районирования
                </span>
              </div>
              <div className="text-[10px] tracking-[0.1em] uppercase text-[#4A6378]">
                Источник: СП 14.13330.2018
              </div>
            </div>

            {/* SVG-карта */}
            <div className="relative bg-[#FAFBFC] aspect-[5/4]">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 380,
                  center: [100, 65],
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#FAFBFC",
                }}
              >
                <ZoomableGroup
                  center={[100, 65]}
                  zoom={1}
                  minZoom={0.7}
                  maxZoom={3}
                  translateExtent={[
                    [-200, -100],
                    [1000, 700],
                  ]}
                >
                  <Geographies geography={GEOJSON_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const name = geo.properties.name as string;
                        const data = SEISMIC_MAP[name];
                        const level: SeismicLevel = data?.level ?? 1;
                        const levelInfo = LEVELS[level];
                        const isSelected = selected?.name === name;
                        const isHovered = hovered?.name === name;

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={(e) => handleMouseEnter(geo, e)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(geo)}
                            style={{
                              default: {
                                fill: levelInfo.color,
                                stroke: "#FFFFFF",
                                strokeWidth: 0.4,
                                outline: "none",
                                cursor: "pointer",
                                transition: "fill 200ms",
                              },
                              hover: {
                                fill: levelInfo.colorHover,
                                stroke: "#003366",
                                strokeWidth: 1.2,
                                outline: "none",
                                cursor: "pointer",
                              },
                              pressed: {
                                fill: levelInfo.colorHover,
                                stroke: "#003366",
                                strokeWidth: 1.5,
                                outline: "none",
                              },
                            }}
                            // Подсветка выбранного региона
                            // (react-simple-maps применит стиль, но добавим
                            //  видимую обводку через дополнительный border)
                            {...(isSelected
                              ? {
                                  fill: levelInfo.colorHover,
                                  stroke: "#C8102E",
                                  strokeWidth: 2,
                                }
                              : {})}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>

              {/* Tooltip (следует за курсором) */}
              {hovered && (
                <div
                  className="pointer-events-none fixed z-50 bg-[#003366] text-white px-3 py-2 text-xs shadow-lg max-w-xs"
                  style={{
                    left: tooltipPos.x + 14,
                    top: tooltipPos.y + 14,
                  }}
                >
                  <div className="font-bold tracking-wide">{hovered.name}</div>
                  <div className="opacity-80 mt-0.5">
                    {LEVELS[hovered.level].label} · {hovered.intensity} баллов
                  </div>
                </div>
              )}

              {/* Легенда — внизу карты */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur border border-[#D6DCE3] p-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="text-[10px] tracking-[0.14em] uppercase font-bold text-[#4A6378]">
                    Шкала опасности (баллы MSK-64)
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {Object.entries(LEVELS).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center gap-1.5"
                        title={`${v.label} — ${v.range}`}
                      >
                        <span
                          className="inline-block w-3 h-3 border border-[#003366]/30"
                          style={{ backgroundColor: v.color }}
                        />
                        <span className="text-[10px] font-semibold text-[#003366]">
                          {v.range}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====== БОКОВАЯ ПАНЕЛЬ ====== */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Карточка активного региона */}
            <div className="bg-white border border-[#D6DCE3] p-6 flex-1 min-h-[300px]">
              {active ? (
                <RegionDetail data={active} />
              ) : (
                <EmptyState />
              )}
            </div>

            {/* Топ-самых опасных регионов */}
            <div className="bg-[#003366] text-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-white/80" />
                <span className="eyebrow text-white/80">
                  Топ-8 самых опасных
                </span>
              </div>
              <div className="space-y-2">
                {TOP_HAZARDOUS.map((r, i) => (
                  <button
                    key={r.name}
                    onClick={() => setSelected(r)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-sm transition ${
                      selected?.name === r.name
                        ? "bg-white/15"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[11px] tracking-wider font-mono opacity-60 shrink-0">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="truncate font-medium">{r.name}</span>
                    </div>
                    <span
                      className="shrink-0 ml-2 px-2 py-0.5 text-[10px] tracking-wide font-bold"
                      style={{
                        backgroundColor: LEVELS[r.level].color,
                        color: r.level >= 4 ? "#FFFFFF" : "#003366",
                      }}
                    >
                      {r.intensity} балл.
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Методологическая справка */}
        <div className="mt-10 p-6 lg:p-8 bg-white border border-[#D6DCE3] grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <div className="eyebrow mb-2">Методология</div>
            <h3 className="text-base font-bold text-[#003366] mb-2">
              Карты ОСР-2018
            </h3>
            <p className="text-sm text-[#4A6378] leading-relaxed">
              Общее сейсмическое районирование территории Российской Федерации.
              Разработано ИФЗ РАН, утверждено СП 14.13330.2018 «Строительство
              в сейсмических районах». Базовый документ для проектирования
              сейсмостойких сооружений.
            </p>
          </div>
          <div>
            <div className="eyebrow mb-2">Шкала интенсивности</div>
            <h3 className="text-base font-bold text-[#003366] mb-2">
              MSK-64 / ШСМ-2017
            </h3>
            <p className="text-sm text-[#4A6378] leading-relaxed">
              Шкала сейсмической интенсивности 12-балльная. Используется для
              оценки силы землетрясения по его воздействию на людей, здания и
              природные объекты. Современная редакция — ШСМ-2017 (шкала
              сейсмическая медицинская).
            </p>
          </div>
          <div>
            <div className="eyebrow mb-2">Мониторинг</div>
            <h3 className="text-base font-bold text-[#003366] mb-2">
              Геофизическая служба РАН
            </h3>
            <p className="text-sm text-[#4A6378] leading-relaxed">
              Непрерывный сейсмический мониторинг России ведётся Геофизической
              службой РАН (г. Обнинск). Данные в реальном времени доступны
              через систему СРОСС® и ЕАСА для экспертного сообщества.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Подкомпоненты
   ============================================================ */

function StatCard({
  icon,
  value,
  label,
  highlight,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-6 ${
        highlight ? "bg-[#003366] text-white" : "bg-white text-[#003366]"
      }`}
    >
      <div
        className={`mb-3 ${
          highlight ? "text-white/70" : "text-[#00549F]"
        }`}
      >
        {icon}
      </div>
      <div className="text-[28px] font-bold leading-none mb-2">{value}</div>
      <div
        className={`text-[10px] tracking-[0.12em] uppercase ${
          highlight ? "text-white/70" : "text-[#4A6378]"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center py-8">
      <div className="w-16 h-16 bg-[#E7EEF6] flex items-center justify-center mb-4">
        <Info className="h-8 w-8 text-[#00549F]" />
      </div>
      <div className="text-[11px] tracking-[0.18em] uppercase text-[#4A6378] font-bold mb-2">
        Выберите регион
      </div>
      <p className="text-sm text-[#4A6378] max-w-xs">
        Наведите курсор на любой регион карты или выберите из списка самых
        опасных справа, чтобы увидеть детальную информацию о сейсмической
        опасности.
      </p>
    </div>
  );
}

function RegionDetail({ data }: { data: RegionSeismicData }) {
  const levelInfo = LEVELS[data.level];

  return (
    <div>
      {/* Заголовок */}
      <div className="mb-4 pb-4 border-b border-[#D6DCE3]">
        <div className="eyebrow mb-2">Регион</div>
        <h3 className="text-xl font-bold text-[#003366] leading-tight tracking-tight">
          {data.name}
        </h3>
      </div>

      {/* Уровень опасности */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-bold">
            Уровень опасности
          </span>
          <span className="text-[11px] tracking-[0.1em] uppercase text-[#4A6378]">
            {data.intensity} / 12 баллов
          </span>
        </div>
        <div className="flex items-stretch h-10 border border-[#D6DCE3]">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className="flex-1 flex items-center justify-center text-[10px] tracking-wide font-bold"
              style={{
                backgroundColor:
                  lvl === data.level
                    ? LEVELS[lvl as SeismicLevel].color
                    : "#F2F4F7",
                color:
                  lvl === data.level && data.level >= 4
                    ? "#FFFFFF"
                    : "#4A6378",
              }}
            >
              {lvl}
            </div>
          ))}
        </div>
        <div
          className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 text-[11px] tracking-[0.1em] uppercase font-bold"
          style={{
            backgroundColor: levelInfo.color,
            color: data.level >= 4 ? "#FFFFFF" : "#003366",
          }}
        >
          {levelInfo.label} · {levelInfo.range}
        </div>
      </div>

      {/* Описание */}
      <div className="mb-5">
        <div className="eyebrow mb-2">Описание</div>
        <p className="text-sm text-[#4A6378] leading-relaxed">{data.note}</p>
      </div>

      {/* Уровень опасности — расширенное описание */}
      <div className="mb-5 p-3 bg-[#F2F4F7] border-l-2 border-[#00549F]">
        <p className="text-xs text-[#4A6378] leading-relaxed italic">
          {levelInfo.description}
        </p>
      </div>

      {/* Историческое событие */}
      {data.event && (
        <div>
          <div className="eyebrow mb-2">Ключевое событие</div>
          <div className="flex items-start gap-3 p-4 bg-[#003366] text-white">
            <Clock className="h-5 w-5 text-white/70 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-lg font-bold">{data.event.year}</span>
                {data.event.mag && (
                  <span className="text-xs tracking-wide opacity-70">
                    · M {data.event.mag}
                  </span>
                )}
              </div>
              <div className="text-sm">{data.event.title}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
