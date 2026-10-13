'use client';

/**
 * Переключатель языков [ RU ][ EN ][ 中 ] — эталон aipat/mktu/iqin.
 * Цвета: синий / изумруд / красный.
 */
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
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
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
  );
}
