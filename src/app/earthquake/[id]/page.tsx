import Link from "next/link";
import { ArrowLeft, MapPin, Activity, Clock, Database } from "lucide-react";
import { notFound } from "next/navigation";

/**
 * Страница подробностей о землетрясении.
 * Источник: eqalert.ru (ФИЦ ЕГС РАН) через наш прокси /api/eqalert.
 *
 * URL: /earthquake/<report_id>
 */

type LocValues = {
  event_datetime?: string;
  lat?: number;
  lon?: number;
  depth?: number;
  mag?: number;
  mag_t?: string;
  rms?: number;
  sta_num?: number;
  ph_num?: number;
  hypo_gap?: number;
  origin_time_err?: number;
  lat_err?: number;
  lon_err?: number;
  depth_err?: number;
  station_near?: string | null;
};

type EqalertReport = {
  id: string;
  report_id: string;
  agency: string;
  has_final: boolean;
  has_msk64_data: boolean;
  has_pga_data: boolean;
  has_buildings_msk64_analysis: boolean;
  has_buildings_pga_analysis: boolean;
  has_cities_msk64_analysis: boolean;
  has_long_distance_objects_analysis: boolean;
  felt_reports_count: number;
  updated_at: string;
  locValues?: { data?: LocValues };
};

async function getReport(id: string): Promise<EqalertReport | null> {
  try {
    const res = await fetch(
      `https://rest-api.eqalert.ru/api/v1/reports/${encodeURIComponent(id)}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = await getReport(id);
  const mag = report?.locValues?.data?.mag;
  const title = mag
    ? `Землетрясение M${mag} · ${report?.locValues?.data?.event_datetime?.split(" ")[0] ?? ""} — СРОСС®`
    : `Землетрясение · СРОСС®`;
  return { title };
}

export default async function EarthquakeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) notFound();

  const loc = report.locValues?.data ?? {};
  const mag = loc.mag ?? null;
  const depth = loc.depth ?? null;
  const datetime = loc.event_datetime ?? "";
  const [date, time] = datetime.split(" ");

  // Карта-превью (static OSM)
  const lat = loc.lat ?? 0;
  const lon = loc.lon ?? 0;
  const delta = 2;
  const mapBbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
  const mapSrc = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=6&size=600x300&maptype=mapnik&markers=${lat},${lon},red-pushpin`;

  // Карта-ссылка на OSM
  const osmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=8/${lat}/${lon}`;
  const eqalertUrl = `https://eqalert.ru/events/${report.report_id}`;

  // Класс магнитуды
  const magClass = mag === null
    ? "—"
    : mag < 3
    ? "зелёный"
    : mag < 5
    ? "жёлтый"
    : mag < 6
    ? "оранжевый"
    : mag < 7
    ? "красный"
    : "тёмно-красный";

  return (
    <main className="min-h-screen bg-paper-grid">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-12 py-10 lg:py-16">
        {/* Хлебные крошки */}
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link
            href="/#map"
            className="hover:text-[#00549F] flex items-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" />
            Карта землетрясений
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <span>Событие {report.report_id}</span>
        </div>

        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-10 bg-[#22C55E]" />
            <span className="eyebrow text-[#2D5F3F]">
              Источник: eqalert.ru · ФИЦ ЕГС РАН
            </span>
          </div>
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.1] mb-3">
            Землетрясение {mag !== null && `M${mag.toFixed(1)}`}
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            {date && time
              ? `${date} в ${time} UTC · `
              : ""}
            Координаты: {lat.toFixed(3)}°, {lon.toFixed(3)}°
            {depth !== null && ` · глубина ${depth.toFixed(1)} км`}
          </p>
        </div>

        {/* Карточка с основной информацией */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Левая: параметры */}
          <div className="bg-white border border-[#D6DCE3] rounded-xl p-6">
            <h2 className="text-[16px] font-bold tracking-tight text-[#003366] mb-4 uppercase">
              Параметры гипоцентра
            </h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <ParamRow label="Магнитуда" value={mag !== null ? mag.toFixed(1) : "—"} highlight />
              <ParamRow label="Тип" value={loc.mag_t ?? "—"} />
              <ParamRow label="Глубина" value={depth !== null ? `${depth.toFixed(1)} км` : "—"} />
              <ParamRow label="RMS" value={loc.rms !== undefined ? loc.rms.toFixed(2) : "—"} />
              <ParamRow label="Дата (UTC)" value={date ?? "—"} />
              <ParamRow label="Время (UTC)" value={time ?? "—"} />
              <ParamRow label="Широта" value={`${lat.toFixed(3)}°`} />
              <ParamRow label="Долгота" value={`${lon.toFixed(3)}°`} />
              <ParamRow label="Агентство" value={report.agency} />
              <ParamRow label="ID отчёта" value={report.report_id} />
            </dl>

            {/* Ошибки определения */}
            {(loc.lat_err || loc.lon_err || loc.depth_err || loc.origin_time_err) && (
              <div className="mt-6 pt-4 border-t border-[#D6DCE3]">
                <h3 className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#4A6378] mb-3">
                  Погрешности
                </h3>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-[#4A6378]">
                  {loc.lat_err !== undefined && (
                    <ParamRow small label="Широта ±" value={`${loc.lat_err.toFixed(2)} км`} />
                  )}
                  {loc.lon_err !== undefined && (
                    <ParamRow small label="Долгота ±" value={`${loc.lon_err.toFixed(2)} км`} />
                  )}
                  {loc.depth_err !== undefined && (
                    <ParamRow small label="Глубина ±" value={`${loc.depth_err.toFixed(2)} км`} />
                  )}
                  {loc.origin_time_err !== undefined && (
                    <ParamRow small label="Время ±" value={`${loc.origin_time_err.toFixed(2)} с`} />
                  )}
                </dl>
              </div>
            )}
          </div>

          {/* Правая: карта + метрики наблюдательной сети */}
          <div className="bg-white border border-[#D6DCE3] rounded-xl p-6">
            <h2 className="text-[16px] font-bold tracking-tight text-[#003366] mb-4 uppercase">
              Эпицентр
            </h2>
            <a href={osmUrl} target="_blank" rel="noopener noreferrer" className="block group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mapSrc}
                alt={`Карта эпицентра на координатах ${lat}, ${lon}`}
                className="w-full h-48 object-cover rounded-lg border border-[#D6DCE3] group-hover:border-[#00549F] transition-colors"
                loading="lazy"
              />
              <div className="mt-2 text-[11px] text-[#4A6378] text-center group-hover:text-[#00549F]">
                Открыть на OpenStreetMap →
              </div>
            </a>

            {/* Наблюдательная сеть */}
            {(loc.sta_num || loc.ph_num || loc.hypo_gap) && (
              <div className="mt-6 pt-4 border-t border-[#D6DCE3]">
                <h3 className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#4A6378] mb-3">
                  Наблюдательная сеть
                </h3>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-[#4A6378]">
                  {loc.sta_num !== undefined && (
                    <ParamRow small label="Станций" value={String(loc.sta_num)} />
                  )}
                  {loc.ph_num !== undefined && (
                    <ParamRow small label="Фаз" value={String(loc.ph_num)} />
                  )}
                  {loc.hypo_gap !== undefined && (
                    <ParamRow small label="Azimuth gap" value={`${loc.hypo_gap}°`} />
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Статусы анализа */}
        <div className="bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl p-6 mb-8">
          <h2 className="text-[16px] font-bold tracking-tight text-[#003366] mb-4 uppercase">
            Доступные анализы
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <AnalysisBadge available={report.has_msk64_data} label="MSK-64 (балльность)" />
            <AnalysisBadge available={report.has_pga_data} label="PGA (ускорения)" />
            <AnalysisBadge available={report.has_cities_msk64_analysis} label="Города (MSK-64)" />
            <AnalysisBadge available={report.has_buildings_msk64_analysis} label="Здания (MSK-64)" />
            <AnalysisBadge available={report.has_buildings_pga_analysis} label="Здания (PGA)" />
            <AnalysisBadge
              available={report.has_long_distance_objects_analysis}
              label="Дальние объекты"
            />
          </div>
          <p className="mt-4 text-xs text-[#4A6378] leading-relaxed">
            Полные данные доступны в системе eqalert.ru (ФИЦ ЕГС РАН).
          </p>
        </div>

        {/* Источник и ссылки */}
        <div className="bg-[#003366] text-white rounded-xl p-6 lg:p-8">
          <div className="flex items-start gap-3 mb-3">
            <Database className="h-5 w-5 mt-1 flex-none text-[#22C55E]" />
            <div>
              <div className="text-[11px] tracking-[0.14em] uppercase text-white/60 font-semibold mb-1">
                Источник данных
              </div>
              <div className="text-lg font-bold mb-2">
                eqalert.ru · ФИЦ ЕГС РАН
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Евразийская система сейсмологических наблюдений. Данные
                предоставлены открытым API eqalert.ru (Федеральный исследовательский
                центр Единая геофизическая служба РАН).
              </p>
              <a
                href={eqalertUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#1ea44a] text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Открыть полный отчёт на eqalert.ru →
              </a>
            </div>
          </div>
        </div>

        {/* Footer-метаданные */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] text-[#4A6378]">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            Обновлено: {report.updated_at}
          </span>
          <span className="flex items-center gap-1.5">
            <Activity className="h-3 w-3" />
            Класс: {magClass}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            {report.has_final ? "Финальный отчёт" : "Автоматический отчёт"}
          </span>
        </div>
      </div>
    </main>
  );
}

function ParamRow({
  label,
  value,
  highlight,
  small,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  small?: boolean;
}) {
  return (
    <div className={small ? "" : "flex flex-col"}>
      <dt
        className={`${
          small ? "text-[10px]" : "text-[11px]"
        } tracking-[0.1em] uppercase text-[#4A6378] font-semibold`}
      >
        {label}
      </dt>
      <dd
        className={`${
          small ? "text-sm" : "text-lg"
        } font-bold ${
          highlight ? "text-[#00549F]" : "text-[#003366]"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function AnalysisBadge({
  available,
  label,
}: {
  available: boolean;
  label: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold ${
        available
          ? "bg-[#22C55E]/10 border-[#22C55E]/40 text-[#2D5F3F]"
          : "bg-white border-[#D6DCE3] text-[#4A6378]/60"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          available ? "bg-[#22C55E]" : "bg-[#D6DCE3]"
        }`}
      />
      {label}
    </div>
  );
}
