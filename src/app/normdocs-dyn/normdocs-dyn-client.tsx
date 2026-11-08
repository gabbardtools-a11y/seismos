/** NormDocsDynClient — клиентский компонент страницы нормативных документов по динамике и прочности. */
"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, FileText } from "lucide-react";
import {
  dynDocs,
  dynDocCategories,
  type DynDoc,
} from "@/content/seo/normdocs-dyn";

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

function categoryColor(cat: DynDoc["category"]): string {
  switch (cat) {
    case "ГОСТ": return "bg-[#00549F] text-white";
    case "СП":   return "bg-[#2D5F3F] text-white";
    case "ПНАЭ": return "bg-[#7B1E2B] text-white";
    case "РД":   return "bg-[#B45309] text-white";
    case "ПБ":   return "bg-[#1E3A8A] text-white";
    case "ISO":  return "bg-[#4A6378] text-white";
    case "EN":   return "bg-[#4A6378] text-white";
    case "ASME": return "bg-[#C8102E] text-white";
    default:     return "bg-[#4A6378] text-white";
  }
}

function statusColor(status: DynDoc["status"]): string {
  switch (status) {
    case "Действующий": return "bg-[#22C55E]/15 text-[#2D5F3F] border-[#22C55E]/40";
    case "Заменён":     return "bg-[#B45309]/10 text-[#B45309] border-[#B45309]/40";
    case "Отменён":     return "bg-[#C8102E]/10 text-[#C8102E] border-[#C8102E]/40";
    default:            return "bg-[#F2F4F7] text-[#4A6378] border-[#D6DCE3]";
  }
}

export function NormDocsDynClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openDocs, setOpenDocs] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dynDocs.filter((d) => {
      if (activeCategory && d.category !== activeCategory) return false;
      if (q) {
        const haystack = [
          d.code, d.title, d.description.replace(/<[^>]+>/g, " "),
          ...(d.keywords ?? []),
        ].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, activeCategory]);

  const sorted = useMemo(() => {
    const order = dynDocCategories.reduce(
      (acc, cat, i) => acc.set(cat, i),
      new Map<string, number>()
    );
    return [...filtered].sort((a, b) => {
      const catDelta = (order.get(a.category) ?? 99) - (order.get(b.category) ?? 99);
      if (catDelta !== 0) return catDelta;
      return b.year - a.year;
    });
  }, [filtered]);

  const grouped = useMemo(() => {
    const map = new Map<string, DynDoc[]>();
    for (const d of sorted) {
      if (!map.has(d.category)) map.set(d.category, []);
      map.get(d.category)!.push(d);
    }
    return map;
  }, [sorted]);

  const toggle = (code: string) => {
    setOpenDocs((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const expandAll = () => {
    if (openDocs.size === sorted.length) {
      setOpenDocs(new Set());
    } else {
      setOpenDocs(new Set(sorted.map((d) => d.code)));
    }
  };

  return (
    <div>
      <div className="mb-8 bg-[#F4F6F8] border border-[#D6DCE3] rounded-2xl p-5">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A6378]/60" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск документа: ГОСТ 14249, ПНАЭ, РД 10-400, сосуды давления, усталость…"
            className="w-full h-12 pl-11 pr-4 bg-white border border-[#D6DCE3] rounded-xl text-sm text-[#003366] placeholder:text-[#4A6378]/50 focus:outline-none focus:border-[#4A6378] focus:ring-2 focus:ring-[#4A6378]/20 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
              activeCategory === null
                ? "bg-[#4A6378] text-white"
                : "bg-white border border-[#4A6378]/30 text-[#4A6378] hover:border-[#4A6378]"
            }`}
          >
            Все ({dynDocs.length})
          </button>
          {dynDocCategories.map((cat) => {
            const count = dynDocs.filter((d) => d.category === cat).length;
            if (count === 0) return null;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(active ? null : cat)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
                  active
                    ? "bg-[#4A6378] text-white"
                    : "bg-white border border-[#4A6378]/30 text-[#4A6378] hover:border-[#4A6378]"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] tracking-[0.14em] uppercase text-[#4A6378]">
          <span>
            Найдено: {sorted.length}{" "}
            {sorted.length === 1 ? "документ" : sorted.length < 5 ? "документа" : "документов"}
          </span>
          <button
            onClick={expandAll}
            className="text-[#4A6378] hover:text-[#003366] font-semibold"
          >
            {openDocs.size === sorted.length && sorted.length > 0
              ? "Свернуть всё"
              : "Развернуть всё"}
          </button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-16 text-[#4A6378]">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Ничего не найдено. Попробуйте другой запрос.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {Array.from(grouped.entries()).map(([category, docs]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-[#4A6378]" />
                <h2 className="text-[18px] font-bold text-[#003366]">{category}</h2>
                <span className="text-[11px] tracking-[0.14em] uppercase text-[#4A6378]">
                  {docs.length}{" "}
                  {docs.length === 1 ? "документ" : docs.length < 5 ? "документа" : "документов"}
                </span>
              </div>

              <div className="space-y-2">
                {docs.map((d) => {
                  const slug = slugify(d.code);
                  const isOpen = openDocs.has(d.code);
                  return (
                    <div
                      key={d.code}
                      id={slug}
                      className="bg-white border border-[#D6DCE3] rounded-xl overflow-hidden scroll-mt-24"
                    >
                      <button
                        onClick={() => toggle(d.code)}
                        className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left hover:bg-[#F4F6F8] transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-[0.08em] flex-shrink-0 ${categoryColor(d.category)}`}
                          >
                            {d.category}
                          </span>
                          <span className="text-[15px] font-bold text-[#003366] truncate">
                            {d.code}
                          </span>
                          <span className="hidden sm:inline text-[11px] text-[#4A6378]/70 flex-shrink-0">
                            {d.year}
                          </span>
                          <span
                            className={`hidden md:inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-semibold flex-shrink-0 ${statusColor(d.status)}`}
                          >
                            {d.status}
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-[#4A6378] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5">
                          <div className="flex flex-wrap items-center gap-2 mb-3 md:hidden">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-[0.08em] ${categoryColor(d.category)}`}>
                              {d.category}
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-semibold ${statusColor(d.status)}`}>
                              {d.status}
                            </span>
                            <span className="text-[11px] text-[#4A6378]/70">{d.year}</span>
                          </div>
                          <p className="text-[13px] font-semibold text-[#003366] mb-3 leading-snug">
                            {d.title}
                          </p>
                          <div
                            className="text-[14px] text-[#4A6378] leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-[#003366] [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:my-2"
                            dangerouslySetInnerHTML={{ __html: d.description }}
                          />
                          {d.keywords && d.keywords.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-[#D6DCE3]/60 flex flex-wrap gap-1.5">
                              {d.keywords.map((kw) => (
                                <span
                                  key={kw}
                                  className="inline-flex items-center px-2 py-0.5 bg-[#F4F6F8] rounded text-[10px] text-[#4A6378] font-medium"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
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
