import Link from "next/link";
import { ArrowLeft, ExternalLink, Newspaper, RefreshCw } from "lucide-react";
import headlinesData from "@/data/news-headlines.json";

export const metadata = {
  title: "Новости о землетрясениях · СРОСС®",
  description:
    "Дайджест новостей о землетрясениях в России и мире. Источники: Известия, RT на русском, Lenta.RU, Вести.RU. Обновление раз в сутки.",
};

const SOURCE_NAMES: Record<string, string> = {
  iz: "Известия",
  rt: "RT на русском",
  lenta: "Lenta.RU",
  vesti: "Вести.RU",
};

const SOURCE_URLS: Record<string, string> = {
  iz: "https://iz.ru/tag/zemletriasenie",
  rt: "https://russian.rt.com/tag/zemletryasenie",
  lenta: "https://lenta.ru/tags/story/earthquakesrussia/",
  vesti: "https://www.vesti.ru/proisshestviya/stikhiinye-bedstviya/zemletryaseniya",
};

type NewsItem = {
  title: string;
  url: string;
  source: string;
  all_sources: string[];
  duplicate_count: number;
  date: string;
};

type Headlines = {
  fetched_at: string;
  total_raw: number;
  total_unique: number;
  sources: Array<{ key: string; name: string }>;
  news: NewsItem[];
};

export default function NewsPage() {
  const headlines = headlinesData as Headlines;
  const news = headlines.news;
  const fetchedAt = headlines.fetched_at;

  return (
    <main className="min-h-screen bg-paper-grid">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Хлебные крошки */}
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link
            href="/"
            className="hover:text-[#00549F] flex items-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
        </div>

        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#22C55E]" />
            <span className="eyebrow text-[#2D5F3F]">
              Live · Дайджест СМИ
            </span>
          </div>
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.1] mb-3 flex items-center gap-3">
            <Newspaper className="h-8 w-8 text-[#2D5F3F]" />
            Новости о землетрясениях
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed mb-3">
            Дайджест заголовков о землетрясениях в России и мире из открытых
            источников. Обновление — раз в сутки.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#4A6378]">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="h-3 w-3" />
              Обновлено: {new Date(fetchedAt).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} МСК
            </span>
            <span>·</span>
            <span>Всего: {news.length} заголовков</span>
          </div>
        </div>

        {/* Источники */}
        <div className="mb-8 flex flex-wrap gap-2">
          {Object.entries(SOURCE_NAMES).map(([key, name]) => (
            <a
              key={key}
              href={SOURCE_URLS[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D6DCE3] bg-white text-[11px] tracking-[0.1em] uppercase font-semibold text-[#4A6378] hover:border-[#2D5F3F] hover:text-[#2D5F3F] transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              {name}
            </a>
          ))}
        </div>

        {/* Список новостей */}
        <div className="space-y-3">
          {news.length === 0 && (
            <div className="bg-white border border-[#D6DCE3] rounded-xl p-8 text-center text-[#4A6378]">
              Сейчас нет свежих заголовков о землетрясениях. Обновление раз в сутки.
            </div>
          )}
          {news.map((n, i) => (
            <article
              key={i}
              className="group bg-white border border-[#D6DCE3] rounded-xl p-5 hover:border-[#2D5F3F]/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Номер */}
                <div className="flex-none text-[10px] tracking-[0.14em] uppercase font-mono text-[#4A6378]/60 pt-1">
                  {(i + 1).toString().padStart(2, "0")}
                </div>

                {/* Контент */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-[15px] sm:text-[16px] font-semibold text-[#003366] leading-snug mb-2 group-hover:text-[#2D5F3F] transition-colors">
                    {n.url ? (
                      <a
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-2 decoration-[#22C55E]/50"
                      >
                        {n.title}
                      </a>
                    ) : (
                      <span>{n.title}</span>
                    )}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.1em] uppercase font-semibold">
                    {n.all_sources.map((src) => (
                      <span
                        key={src}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F8FBF9] border border-[#D6DCE3] text-[#2D5F3F]"
                      >
                        {SOURCE_NAMES[src] || src}
                      </span>
                    ))}
                    {n.duplicate_count > 1 && (
                      <span className="text-[#4A6378]/60">
                        · в {n.duplicate_count} источниках
                      </span>
                    )}
                    {n.url && (
                      <a
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1 text-[#00549F] hover:text-[#22C55E]"
                      >
                        <ExternalLink className="h-3 w-3" />
                        источник
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Дисклеймер */}
        <div className="mt-10 bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl p-6">
          <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#4A6378] mb-2">
            О дайджесте
          </h3>
          <p className="text-sm text-[#4A6378] leading-relaxed">
            Раздел автоматически собирает заголовки новостей о землетрясениях
            из открытых источников: Известия, RT на русском, Lenta.RU, Вести.RU.
            При совпадении тем в нескольких источниках выбирается наиболее
            полный заголовок. Каждая новость содержит прямую ссылку на
            оригинальный материал — все права принадлежат правообладателям.
            Обновление выполняется раз в сутки.
          </p>
        </div>
      </div>
    </main>
  );
}
