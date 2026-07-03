"use client";

/**
 * Компиляция двух эмблем — отдельный блок под hero.
 *
 * Слева: эмблема СРОСС® (Silver, оправа, линза, текст по дуге, концентрические кольца)
 * Справа: дышащий овал как на видео (расходящиеся кольца, без оправы)
 */

import { MinimalOrb } from "./minimal-orb";

// Градиенты для Silver оправы
const SILVER_STOPS = [
  { offset: "0%", color: "#D4E4F0" },
  { offset: "35%", color: "#5BA8DB" },
  { offset: "70%", color: "#00549F" },
  { offset: "100%", color: "#00111F" },
];

// Deep Lens градиент
const DEEP_LENS_STOPS = [
  { offset: "0%", color: "#FFFFFF" },
  { offset: "45%", color: "#F0F4F8" },
  { offset: "80%", color: "#D0DCE8" },
  { offset: "100%", color: "#C0D0DC" },
];

export function DualEmblemBlock() {
  return (
    <section className="section-pad bg-white border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">Компиляция · Две эмблемы</span>
            <span className="h-px w-10 bg-[#00549F]" />
          </div>
          <h3 className="text-2xl font-bold text-[#003366] tracking-tight">
            Эмблема СРОСС® + дышащий овал
          </h3>
        </div>

        {/* Две эмблемы рядом */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Слева — эмблема с оправой */}
          <div className="flex flex-col items-center">
            <div className="text-[10px] tracking-[0.18em] uppercase font-bold text-[#4A6378] mb-4">
              Эмблема с оправой
            </div>
            <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px]">
              <svg viewBox="0 0 600 600" className="w-full h-full" role="img" aria-label="Эмблема СРОСС®">
                <defs>
                  <radialGradient id="dual-ring-silver" cx="50%" cy="50%" r="55%">
                    {SILVER_STOPS.map((s, i) => (
                      <stop key={i} offset={s.offset} stopColor={s.color} />
                    ))}
                  </radialGradient>
                  <radialGradient id="dual-lens" cx="50%" cy="50%" r="55%">
                    {DEEP_LENS_STOPS.map((s, i) => (
                      <stop key={i} offset={s.offset} stopColor={s.color} />
                    ))}
                  </radialGradient>
                  <path id="dual-top-arc" d="M 130,300 A 170,170 0 0 1 470,300" fill="none" />
                  <path id="dual-bottom-arc" d="M 140,335 A 160,160 0 0 0 460,335" fill="none" />
                </defs>

                {/* Оправа */}
                <circle cx="300" cy="300" r="290" fill="url(#dual-ring-silver)" />
                {/* Линза */}
                <circle cx="300" cy="300" r="220" fill="url(#dual-lens)" />
                <circle cx="300" cy="300" r="220" fill="none" stroke="#003366" strokeWidth="1.2" />
                <circle cx="300" cy="300" r="225" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

                {/* Статичные внешние круги */}
                <circle cx="300" cy="300" r="140" fill="none" stroke="#00549F" strokeWidth="1.4" opacity="0.55" />
                <circle cx="300" cy="300" r="175" fill="none" stroke="#00549F" strokeWidth="1.2" opacity="0.4" />

                {/* Концентрические опорные окружности */}
                <g fill="none" stroke="#00549F" strokeLinecap="round">
                  <circle cx="300" cy="300" r="22" strokeWidth="2.2" />
                  <circle cx="300" cy="300" r="42" strokeWidth="1.6" opacity="0.85" />
                  <circle cx="300" cy="300" r="64" strokeWidth="1.3" opacity="0.7" />
                  <circle cx="300" cy="300" r="88" strokeWidth="1.1" opacity="0.55" />
                  <circle cx="300" cy="300" r="114" strokeWidth="0.9" opacity="0.4" />
                </g>

                {/* Пульсирующие кольца — расходятся от эпицентра */}
                <g fill="none" strokeLinecap="round">
                  <circle cx="300" cy="300" r="22" stroke="#003366" strokeWidth="2.5" className="hero-pulse-ring hero-pulse-ring-1" />
                  <circle cx="300" cy="300" r="22" stroke="#00549F" strokeWidth="2" className="hero-pulse-ring hero-pulse-ring-2" />
                  <circle cx="300" cy="300" r="22" stroke="#00549F" strokeWidth="1.8" className="hero-pulse-ring hero-pulse-ring-3" />
                  <circle cx="300" cy="300" r="22" stroke="#4A6378" strokeWidth="1.5" className="hero-pulse-ring hero-pulse-ring-4" />
                  <circle cx="300" cy="300" r="22" stroke="#4A6378" strokeWidth="1.2" className="hero-pulse-ring hero-pulse-ring-5" />
                </g>

                {/* Эпицентр */}
                <circle cx="300" cy="300" r="6" fill="#C8102E" className="hero-epicenter-pulse" />
                <circle cx="300" cy="300" r="3" fill="#FFFFFF" />

                {/* Текст по дуге */}
                <text fontFamily="'PT Sans', Arial, sans-serif" fontSize="38" fontWeight="700" letterSpacing="6" fill="#FFFFFF" textAnchor="middle">
                  <textPath href="#dual-top-arc" startOffset="50%">СРОСС®</textPath>
                </text>
                <text fontFamily="'PT Sans', Arial, sans-serif" fontSize="20" fontWeight="600" letterSpacing="3" fill="#FFFFFF" textAnchor="middle">
                  <textPath href="#dual-bottom-arc" startOffset="50%">СЕЙСМОБЕЗОПАСНОСТЬ РОССИИ</textPath>
                </text>

                {/* Декоративные точки */}
                <g fill="#FFFFFF">
                  <circle cx="300" cy="80" r="3.5" />
                  <circle cx="300" cy="520" r="3.5" />
                  <circle cx="80" cy="300" r="3.5" />
                  <circle cx="520" cy="300" r="3.5" />
                </g>

                <circle cx="300" cy="300" r="288" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />
                <circle cx="300" cy="300" r="293" fill="none" stroke="#003366" strokeWidth="0.8" />
              </svg>
            </div>
          </div>

          {/* Справа — дышащий овал как на видео */}
          <div className="flex flex-col items-center">
            <div className="text-[10px] tracking-[0.18em] uppercase font-bold text-[#4A6378] mb-4">
              Дышащий овал (по видео)
            </div>
            <MinimalOrb />
          </div>
        </div>
      </div>
    </section>
  );
}
