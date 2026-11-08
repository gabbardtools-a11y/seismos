/**
 * SearchClient — клиентская часть страницы поиска.
 * Форма с инпутом, кнопкой «Искать» (→ /search?q=), и список результатов,
 * который пришёл с сервера (для текущего ?q=).
 *
 * Поиск срабатывает при отправке формы (Enter / клик на лупу) — сервер
 * перерисовывает страницу с новыми результатами. Это устойчиво к JS-off
 * и индексируется поисковиками.
 */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon, ArrowRight } from "lucide-react";

type SearchResult = {
  type: "glossary" | "normdoc" | "equipment" | "seo" | "page";
  title: string;
  href: string;
  snippet: string;
  meta?: string;
};

// Иконка по типу результата (повторяет серверную функцию — для SSR-консистентности)
function iconForType(type: SearchResult["type"]) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { BookOpen, FileText, Wrench, FileCheck, LayoutGrid } = require("lucide-react");
  switch (type) {
    case "glossary":
      return <BookOpen className="h-5 w-5 text-[#00549F]" />;
    case "normdoc":
      return <FileText className="h-5 w-5 text-[#2D5F3F]" />;
    case "equipment":
      return <Wrench className="h-5 w-5 text-[#B45309]" />;
    case "seo":
      return <FileCheck className="h-5 w-5 text-[#7B1E2B]" />;
    case "page":
      return <LayoutGrid className="h-5 w-5 text-[#4A6378]" />;
  }
}

export function SearchClient({
  results,
  query,
}: {
  results: SearchResult[];
  query: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(query);

  // Синхронизация инпута с URL ?q=
  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
  }, [searchParams]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      {/* Форма поиска */}
      <div className="mb-8 bg-[#F8FBF9] border border-[#D6DCE3] rounded-2xl p-5">
        <form onSubmit={submit} className="relative" role="search">
          <button
            type="submit"
            aria-label="Искать"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00549F] hover:text-[#003366] transition-colors"
          >
            <SearchIcon className="h-5 w-5" strokeWidth={2.2} />
          </button>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Введите запрос: сейсмостойкость, ГОСТ 30546, акселерограмма, вибростенд…"
            aria-label="Поиск по сайту"
            autoFocus
            className="w-full h-12 pl-11 pr-28 bg-white border border-[#D6DCE3] rounded-xl text-[15px] text-[#003366] placeholder:text-[#4A6378]/60 focus:outline-none focus:border-[#00549F] focus:ring-2 focus:ring-[#00549F]/20 transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-[#00549F] hover:bg-[#003366] text-white text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors"
          >
            Искать
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>
        <p className="mt-3 text-[11px] tracking-[0.12em] uppercase text-[#4A6378]/70">
          Поиск по: глоссарий · нормативные документы · оборудование · услуги · разделы сайта
        </p>
      </div>

      {/* Результаты */}
      {query ? (
        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-[14px] text-[#4A6378]">
              Найдено:{" "}
              <span className="font-bold text-[#003366]">{results.length}</span>{" "}
              {results.length === 1 ? "результат" : results.length < 5 ? "результата" : "результатов"}
              {" "}
              по запросу <span className="font-semibold text-[#003366]">«{query}»</span>
            </p>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-16 bg-[#F8FBF9] border border-[#D6DCE3] rounded-2xl">
              <SearchIcon className="h-12 w-12 mx-auto mb-3 text-[#4A6378]/30" />
              <p className="text-[15px] text-[#4A6378] mb-1">
                Ничего не найдено по запросу «{query}».
              </p>
              <p className="text-[13px] text-[#4A6378]/70">
                Попробуйте изменить запрос или проверить орфографию.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((r, i) => (
                <a
                  key={`${r.type}-${r.href}-${i}`}
                  href={r.href}
                  className="block bg-white border border-[#D6DCE3] rounded-xl p-4 hover:border-[#00549F] hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-none mt-0.5">{iconForType(r.type)}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="text-[16px] font-bold text-[#003366] group-hover:text-[#00549F] transition-colors truncate">
                          {r.title}
                        </h3>
                        {r.meta && (
                          <span className="text-[10px] tracking-[0.1em] uppercase text-[#4A6378]/70 font-semibold whitespace-nowrap flex-shrink-0">
                            {r.meta}
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-[#4A6378] leading-relaxed line-clamp-2">
                        {r.snippet}
                      </p>
                      <p className="mt-2 text-[11px] text-[#00549F] font-semibold tracking-[0.08em] uppercase">
                        {r.href}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Подсказки, когда нет запроса
        <div className="bg-[#F8FBF9] border border-[#D6DCE3] rounded-2xl p-6">
          <p className="text-[14px] font-bold text-[#003366] mb-3">
            Популярные запросы:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "сейсмостойкость",
              "ГОСТ 30546",
              "акселерограмма",
              "MSK-64",
              "вибростенд",
              "сейсмоизоляция",
              "СП 14.13330",
              "НП-031",
              "спектр ответа",
              "обследование зданий",
              "сертификат сейсмостойкости",
              "сейсмоусиление",
              "виброизоляция",
              "вибростойкость",
              "ГОСТ 12.1.012",
              "резонанс",
              "FFT",
              "ISO 10816",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => router.push(`/search?q=${encodeURIComponent(suggestion)}`)}
                className="inline-flex items-center px-3.5 py-1.5 bg-white border border-[#00549F]/30 rounded-full text-[13px] font-semibold text-[#00549F] hover:bg-[#00549F] hover:text-white hover:border-[#00549F] transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
