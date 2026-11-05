'use client';

/**
 * Переключатель языков.
 * Всегда (и на десктопе, и на мобиле) — глобус с dropdown:
 * кнопка с иконкой Globe, кодом текущего языка и стрелкой ChevronDown,
 * по клику открывается выпадающее меню из 10 языков.
 *
 * Пропс `compact` сохранён для обратной совместимости, но больше ни на что не влияет.
 */
import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LANGUAGES, type Lang } from '@/lib/i18n/translations';

export function LangSwitch({
  lang,
  switchLang,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  compact = false,
}: {
  lang: Lang;
  switchLang: (l: Lang) => void;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLang = LANGUAGES.find((l) => l.code === lang);

  // Закрытие по клику вне меню
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Кнопка-глобус с кодом текущего языка и стрелкой */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Выбрать язык"
        aria-expanded={open}
        className="px-2.5 py-1.5 text-[11px] font-bold border border-[#00549F]/30 text-[#00549F] rounded-sm hover:border-[#00549F] flex items-center gap-1.5 transition-colors"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{currentLang?.label || 'RU'}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Выпадающее меню со списком языков */}
      {open && (
        <div className="absolute top-full right-0 mt-1 z-[70] min-w-[180px] bg-white border border-[#D6DCE3] rounded-lg shadow-xl overflow-hidden max-h-[360px] overflow-y-auto">
          {LANGUAGES.map(({ code, label, nativeName }) => {
            const active = code === lang;
            return (
              <button
                key={code}
                onClick={() => {
                  switchLang(code);
                  setOpen(false);
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
  );
}
