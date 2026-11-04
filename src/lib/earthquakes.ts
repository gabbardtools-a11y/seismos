/**
 * Общая модель данных о землетрясениях (клиент + сервер).
 *
 * Источник: eqalert.ru (rest-api.eqalert.ru/api/v1/reports/lightweightList) —
 * открытый REST API сервиса EQAlert (ООО «Геофизические технологии» / ГС РАН).
 */

export interface EqEvent {
  /** Идентификатор отчёта в системе eqalert (например "NBx7rmyA"). */
  id: string;
  /** Агентство-источник решения: EMSC, USGS, ГС РАН и т.п. */
  agency: string;
  /** Время события в UTC (ISO 8601). */
  time: string;
  /** Широта эпицентра, градусы (положительная — север). */
  lat: number;
  /** Долгота эпицентра, градусы (положительная — восток). */
  lon: number;
  /** Глубина гипоцентра, км. */
  depthKm: number;
  /** Магнитуда. */
  mag: number;
}

export interface EqResponse {
  ok: boolean;
  /** true — отдали сохранённые данные, потому что источник недоступен. */
  stale?: boolean;
  source: string;
  fetchedAt: string;
  events: EqEvent[];
  error?: string;
}

export interface EqApiReport {
  id: string;
  agency: string;
  event_datetime: string;
  lat: number;
  lon: number;
  depth: number;
  mag: number;
}

const MAG_TIERS = [
  { max: 4, color: "#ff8c1a", label: "M < 4" },
  { max: 5.5, color: "#ff4d00", label: "M 4–5.5" },
  { max: Infinity, color: "#c81e1e", label: "M ≥ 5.5" },
] as const;

/** Цвет маркера по магнитуде. */
export function magColor(mag: number): string {
  for (const tier of MAG_TIERS) {
    if (mag < tier.max) return tier.color;
  }
  return MAG_TIERS[MAG_TIERS.length - 1].color;
}

/** Легенда: цветовые ступени магнитуды. */
export const MAG_LEGEND = MAG_TIERS.map(({ color, label }) => ({ color, label }));

/** Нормализация строки "YYYY-MM-DD HH:mm:ss" (UTC) в ISO. */
function parseUtc(raw: string): string {
  // "2026-11-04 12:56:06" -> "2026-11-04T12:56:06Z"
  const iso = raw.replace(" ", "T") + "Z";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? raw : d.toISOString();
}

/** Валидация и нормализация записи API. */
export function normalizeReport(r: EqApiReport): EqEvent | null {
  const lat = Number(r.lat);
  const lon = Number(r.lon);
  const depth = Number(r.depth);
  const mag = Number(r.mag);
  if (!r.id || !Number.isFinite(lat) || !Number.isFinite(lon) || !Number.isFinite(mag)) {
    return null;
  }
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  return {
    id: String(r.id),
    agency: String(r.agency || "—"),
    time: parseUtc(String(r.event_datetime)),
    lat,
    lon,
    depthKm: Number.isFinite(depth) ? depth : 0,
    mag,
  };
}

/** Время события по-русски: "12:56 UTC" + относительный возраст. */
export function formatEventTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const hhmmss = d.toLocaleTimeString("ru-RU", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${hhmmss} UTC`;
}

export function timeAgoRu(iso: string, now = Date.now()): string {
  const d = new Date(iso).getTime();
  if (Number.isNaN(d)) return "—";
  const sec = Math.max(0, Math.round((now - d) / 1000));
  if (sec < 60) return "только что";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} мин назад`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours} ч ${min % 60} мин назад`;
  const days = Math.floor(hours / 24);
  return `${days} дн ${hours % 24} ч назад`;
}

/** "51.51° с.ш., 15.96° в.д." */
export function formatCoords(lat: number, lon: number): string {
  const ns = lat >= 0 ? "с.ш." : "ю.ш.";
  const ew = lon >= 0 ? "в.д." : "з.д.";
  return `${Math.abs(lat).toFixed(2)}° ${ns}, ${Math.abs(lon).toFixed(2)}° ${ew}`;
}

export function formatDepth(km: number): string {
  return `${km < 10 ? km.toFixed(1) : Math.round(km)} км`;
}
