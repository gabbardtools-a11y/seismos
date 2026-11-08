/**
 * HeroSearch — длинная строка поиска в hero, под полосой сейсмомониторинга.
 * По Enter → редирект на /search?q=<запрос>.
 * По клику на иконку лупы — то же.
 *
 * Серверный hero (HeroSection) рендерит этот клиентский компонент как есть.
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

export function HeroSearch() {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl/Cmd+K — фокус на поиск
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="border-b border-[#D6DCE3]/70 bg-white/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
        <form onSubmit={submit} className="relative" role="search">
          {/* Иконка лупы слева */}
          <button
            type="submit"
            aria-label="Найти на сайте"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00549F] hover:text-[#003366] transition-colors flex items-center justify-center"
          >
            <Search className="h-5 w-5" strokeWidth={2.2} />
          </button>

          {/* Поле ввода — длинное, на всю ширину */}
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Найти на сайте"
            aria-label="Поиск по сайту"
            className="w-full h-11 pl-11 pr-24 bg-white border rounded-full text-[15px] text-[#003366] placeholder:text-[#4A6378]/60 placeholder:font-medium focus:outline-none transition-all shadow-sm"
            style={{
              borderColor: focused ? "#00549F" : "#D6DCE3",
              boxShadow: focused
                ? "0 0 0 3px rgba(0, 84, 159, 0.15)"
                : "0 1px 2px rgba(0, 51, 102, 0.04)",
            }}
          />

          {/* Подсказка ⌘K справа — только при пустом поле */}
          {!q && (
            <kbd
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-1 px-2 py-1 bg-[#F2F4F7] border border-[#D6DCE3] rounded text-[10px] tracking-[0.08em] uppercase text-[#4A6378]/70 font-semibold pointer-events-none"
            >
              <span className="text-[11px]">⌘</span>K
            </kbd>
          )}

          {/* Стрелка-кнопка справа — когда есть текст */}
          {q && (
            <button
              type="submit"
              aria-label="Искать"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#00549F] hover:bg-[#003366] text-white transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
