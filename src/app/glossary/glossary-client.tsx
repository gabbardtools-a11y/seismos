/**
 * GlossaryClient — клиентский компонент глоссария.
 * Поиск по терминам и синонимам, фильтр по категориям, аккордеон.
 */
"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, BookOpen } from "lucide-react";
import {
  glossaryTerms,
  glossaryCategories,
  type GlossaryTerm,
} from "@/content/seo/glossary";

// Транслитерация для якорей
function slugify(s: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts",
    ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
    я: "ya",
  };
  return s
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function GlossaryClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openTerms, setOpenTerms] = useState<Set<string>>(new Set());

  // Фильтрация
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossaryTerms.filter((t) => {
      // Фильтр по категории
      if (activeCategory && t.category !== activeCategory) return false;
      // Поиск по термину, синонимам, определению
      if (q) {
        const haystack = [
          t.term,
          t.definition.replace(/<[^>]+>/g, " "),
          ...(t.synonyms ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, activeCategory]);

  // Группировка по категориям
  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    for (const t of filtered) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)!.push(t);
    }
    return map;
  }, [filtered]);

  const toggle = (term: string) => {
    setOpenTerms((prev) => {
      const next = new Set(prev);
      if (next.has(term)) next.delete(term);
      else next.add(term);
      return next;
    });
  };

  const expandAll = () => {
    if (openTerms.size === filtered.length) {
      setOpenTerms(new Set());
    } else {
      setOpenTerms(new Set(filtered.map((t) => t.term)));
    }
  };

  return (
    <div>
      {/* Поиск и фильтры */}
      <div className="mb-8 bg-[#F8FBF9] border border-[#D6DCE3] rounded-2xl p-5">
        {/* Поиск */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A6378]/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск термина: сейсмостойкость, MSK-64, P-волны, ГОСТ 30546…"
            className="w-full h-12 pl-11 pr-4 border border-[#D6DCE3] rounded-xl text-sm text-[#003366] placeholder:text-[#4A6378]/50 focus:outline-none focus:border-[#00549F] focus:ring-2 focus:ring-[#00549F]/20 transition-colors"
          />
        </div>

        {/* Фильтр по категориям */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
              activeCategory === null
                ? "bg-[#00549F] text-white"
                : "bg-white border border-[#00549F]/30 text-[#00549F] hover:border-[#00549F]"
            }`}
          >
            Все ({glossaryTerms.length})
          </button>
          {glossaryCategories.map((cat) => {
            const count = glossaryTerms.filter((t) => t.category === cat).length;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(active ? null : cat)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
                  active
                    ? "bg-[#00549F] text-white"
                    : "bg-white border border-[#00549F]/30 text-[#00549F] hover:border-[#00549F]"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Счётчик и развернуть всё */}
        <div className="mt-3 flex items-center justify-between text-[11px] tracking-[0.14em] uppercase text-[#4A6378]">
          <span>
            Найдено: {filtered.length}{" "}
            {filtered.length === 1 ? "термин" : filtered.length < 5 ? "термина" : "терминов"}
          </span>
          <button
            onClick={expandAll}
            className="text-[#00549F] hover:text-[#003366] font-semibold"
          >
            {openTerms.size === filtered.length && filtered.length > 0
              ? "Свернуть всё"
              : "Развернуть всё"}
          </button>
        </div>
      </div>

      {/* Список терминов по категориям */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#4A6378]">
          <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Ничего не найдено. Попробуйте другой запрос.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {Array.from(grouped.entries()).map(([category, terms]) => (
            <div key={category}>
              {/* Заголовок категории */}
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-[#00549F]" />
                <h2 className="text-[18px] font-bold text-[#003366]">{category}</h2>
                <span className="text-[11px] tracking-[0.14em] uppercase text-[#4A6378]">
                  {terms.length}{" "}
                  {terms.length === 1 ? "термин" : terms.length < 5 ? "термина" : "терминов"}
                </span>
              </div>

              {/* Термины */}
              <div className="space-y-2">
                {terms.map((t) => {
                  const slug = slugify(t.term);
                  const isOpen = openTerms.has(t.term);
                  return (
                    <div
                      key={t.term}
                      id={slug}
                      className="bg-white border border-[#D6DCE3] rounded-xl overflow-hidden scroll-mt-24"
                    >
                      <button
                        onClick={() => toggle(t.term)}
                        className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left hover:bg-[#F8FBF9] transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-[15px] font-bold text-[#003366] truncate">
                            {t.term}
                          </span>
                          {t.synonyms && t.synonyms.length > 0 && (
                            <span className="hidden sm:inline text-[11px] text-[#4A6378]/60 truncate">
                              {t.synonyms.slice(0, 2).join(" · ")}
                            </span>
                          )}
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-[#00549F] flex-shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div
                          className="px-5 pb-4 text-[14px] text-[#4A6378] leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-[#003366] [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:my-2"
                          dangerouslySetInnerHTML={{ __html: t.definition }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
