'use client';

/**
 * Переключатель языков.
 * Десктоп: кнопки в ряд (RU EN 中 KK HY KA TG UZ KY MD).
 * Мобилка: глобус с выпадающим вниз меню.
 */
import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LANGUAGES, type Lang } from '@/lib/i18n/translations';

const STYLES: Record<Lang, { on: string; off: string }> = {
  ru: {
    on: 'bg-[#00549F] text-white border-[#00549F]',
    off: 'text-[#00549F] border-[#00549F]/30 hover:border-[#00549F]',
  },
  en: {
    on: 'bg-[#059669] text-white border-[#059669]',
    off: 'text-[#059669] border-[#059669]/30 hover:border-[#059669]',
  },
  zh: {
    on: 'bg-[#DC2626] text-white border-[#DC2626]',
    off: 'text-[#DC2626] border-[#DC2626]/30 hover:border-[#DC2626]',
  },
  kk: {
    on: 'bg-[#7C3AED] text-white border-[#7C3AED]',
    off: 'text-[#7C3AED] border-[#7C3AED]/30 hover:border-[#7C3AED]',
  },
  hy: {
    on: 'bg-[#D97706] text-white border-[#D97706]',
    off: 'text-[#D97706] border-[#D97706]/30 hover:border-[#D97706]',
  },
  ka: {
    on: 'bg-[#B91C1C] text-white border-[#B91C1C]',
    off: 'text-[#B91C1C] border-[#B91C1C]/30 hover:border-[#B91C1C]',
  },
  tg: {
    on: 'bg-[#0891B2] text-white border-[#0891B2]',
    off: 'text-[#0891B2] border-[#0891B2]/30 hover:border-[#0891B2]',
  },
  uz: {
    on: 'bg-[#16A34A] text-white border-[#16A34A]',
    off: 'text-[#16A34A] border-[#16A34A]/30 hover:border-[#16A34A]',
  },
  ky: {
    on: 'bg-[#EA580C] text-white border-[#EA580C]',
    off: 'text-[#EA580C] border-[#EA580C]/30 hover:border-[#EA580C]',
  },
  md: {
    on: 'bg-[#9333EA] text-white border-[#9333EA]',
    off: 'text-[#9333EA] border-[#9333EA]/30 hover:border-[#9333EA]',
  },
};

export function LangSwitch({
  lang,
  switchLang,
  compact = false,
}: {
  lang: Lang;
  switchLang: (l: Lang) => void;
  compact?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLang = LANGUAGES.find((l) => l.code === lang);

  // Закрытие по клику вне
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      {/* Десктоп: кнопки в ряд */}
      <div className="hidden sm:flex items-center gap-1" role="group" aria-label="Language">
        {LANGUAGES.map(({ code, label }) => {
          const active = code === lang;
          const s = STYLES[code];
          return (
            <button
              key={code}
              onClick={() => switchLang(code)}
              aria-pressed={active}
              aria-label={label}
              title={label}
              className={`${
                compact ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-[11px]'
              } font-bold border transition-colors rounded-sm ${active ? s.on : s.off}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Мобилка: глобус с dropdown */}
      <div className="sm:hidden relative" ref={ref}>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Выбрать язык"
          aria-expanded={mobileOpen}
          className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold border border-[#00549F]/30 text-[#00549F] rounded-sm transition-colors hover:border-[#00549F]"
        >
          <Globe className="h-3.5 w-3.5" />
          <span>{currentLang?.label || 'RU'}</span>
          <ChevronDown className={`h-3 w-3 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>

        {mobileOpen && (
          <div className="absolute top-full right-0 mt-1 z-[70] min-w-[160px] bg-white border border-[#D6DCE3] rounded-lg shadow-xl overflow-hidden max-h-[300px] overflow-y-auto">
            {LANGUAGES.map(({ code, label, nativeName }) => {
              const active = code === lang;
              return (
                <button
                  key={code}
                  onClick={() => {
                    switchLang(code);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-[12px] font-medium border-b border-[#D6DCE3] last:border-b-0 transition-colors ${
                    active ? 'bg-[#00549F]/10 text-[#00549F] font-bold' : 'text-[#4A6378] hover:bg-[#E7EEF6]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-bold opacity-60 w-6">{label}</span>
                    {nativeName}
                  </span>
                  {active && <Check className="h-3.5 w-3.5 text-[#00549F]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
