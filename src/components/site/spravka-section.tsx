/**
 * Справка о Землетрясениях — лента недавних событий.
 * Источник: seismo.ru/spravka-o-chs/ (спарсено в src/data/spravka-zemletryaseniya.json).
 * Размещается под Симулятором в блоке карты.
 */
import { Activity, MapPin } from "lucide-react";
import spravkaData from "@/data/spravka-zemletryaseniya.json";
import { t } from "@/lib/i18n/translations";
import type { Lang } from "@/lib/i18n/translations";

type Event = {
  date: string;
  date_display: string;
  title: string;
  location: string;
  magnitude: string;
};

type SpravkaData = {
  fetched_at: string;
  source_url: string;
  source_name: string;
  total: number;
  events: Event[];
};

function formatDateRu(dateStr: string): string {
  // dateStr в формате YYYY-MM-DD (но в данных может быть "YYYY-M-D")
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts.map(Number);
  const d2 = String(d).padStart(2, "0");
  const m2 = String(m).padStart(2, "0");
  return `${d2}.${m2}.${y}`;
}

export function SpravkaSection({ lang }: { lang: Lang }) {
  const data = spravkaData as SpravkaData;
  const events = data.events;

  return (
    <div className="mt-8 bg-white border border-[#D6DCE3] rounded-2xl p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="h-px w-10 bg-[#2D5F3F]" />
        <span className="eyebrow text-[#2D5F3F]">
          {t("spravka.count", lang).replace("{n}", String(data.total))}
        </span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <Activity className="h-7 w-7 text-[#2D5F3F] flex-none" />
        <h3 className="text-xl lg:text-2xl font-bold text-[#003366] leading-tight">
          {t("spravka.h3", lang)}
        </h3>
      </div>
      <p className="text-sm text-[#4A6378] leading-relaxed mb-5 max-w-3xl">
        {t("spravka.leadPre", lang)}{" "}
        <a
          href={data.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2"
        >
          {data.source_name}
        </a>
        .
      </p>

      {/* Лента событий */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
        {events.length === 0 && (
          <div className="text-sm text-[#4A6378] text-center py-6">
            {t("spravka.nodata", lang)}
          </div>
        )}
        {events.map((ev, i) => (
          <article
            key={i}
            className="group flex items-start gap-4 p-3 rounded-lg border border-[#D6DCE3] hover:border-[#2D5F3F]/40 hover:bg-[#F8FBF9] transition-colors"
          >
            {/* Дата */}
            <div className="flex-none text-center min-w-[70px]">
              <div className="text-[11px] tracking-[0.1em] uppercase text-[#4A6378] font-semibold">
                {formatDateRu(ev.date)}
              </div>
              {ev.magnitude && (
                <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full bg-[#FFF3E0] border border-[#FFB100]/40 text-[10px] font-bold text-[#b96a00]">
                  M {ev.magnitude}
                </div>
              )}
            </div>

            {/* Заголовок + локация */}
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold text-[#003366] leading-snug group-hover:text-[#2D5F3F] transition-colors">
                {ev.title}
              </div>
              {ev.location && (
                <div className="mt-1 flex items-center gap-1 text-[11px] text-[#4A6378]">
                  <MapPin className="h-3 w-3 flex-none" />
                  {ev.location}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Подвал */}
      <div className="mt-5 pt-4 border-t border-[#D6DCE3] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#4A6378]">
        <span>
          {t("spravka.updated", lang)}{" "}
          {new Date(data.fetched_at).toLocaleString("ru-RU", {
            timeZone: "Europe/Moscow",
          })}{" "}
          {t("spravka.msk", lang)}
        </span>
        <a
          href={data.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#2D5F3F] hover:text-[#22C55E] font-semibold"
        >
          {t("spravka.allEvents", lang)}
        </a>
      </div>
    </div>
  );
}
