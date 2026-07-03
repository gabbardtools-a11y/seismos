"use client";

/**
 * Финальная эмблема v2 — с ВЫРЕЗАМИ-засечками на оправе.
 * 
 * Как в первом варианте (декоративные точки на сторонах света),
 * но вместо точек — вырезы-засечки: небольшие дуги,
 * прорезающие внутреннюю границу оправы.
 * 
 * Всё остальное как в final-emblem: оправа Silver, линза, дыхание 15с,
 * красная точка, 3 концентрических круга, прицел, без надписей.
 */

const SILVER_STOPS = [
  { offset: "0%", color: "#D4E4F0" },
  { offset: "35%", color: "#5BA8DB" },
  { offset: "70%", color: "#00549F" },
  { offset: "100%", color: "#00111F" },
];
const DEEP_LENS_STOPS = [
  { offset: "0%", color: "#FFFFFF" },
  { offset: "45%", color: "#F0F4F8" },
  { offset: "80%", color: "#D0DCE8" },
  { offset: "100%", color: "#C0D0DC" },
];

export function FinalEmblemV2() {
  return (
    <section className="section-pad bg-[#FAF7F2] border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">Финальная эмблема · Вариант 2</span>
            <span className="h-px w-10 bg-[#00549F]" />
          </div>
          <h3 className="text-2xl font-bold text-[#003366] tracking-tight">
            С засечками-вырезами на оправе
          </h3>
        </div>
        <div className="flex justify-center">
          <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]">
            <svg viewBox="0 0 600 600" className="w-full h-full" role="img" aria-label="Эмблема СРОСС® с засечками-вырезами">
              <defs>
                <radialGradient id="fe2-ring" cx="50%" cy="50%" r="55%">
                  {SILVER_STOPS.map((s, i) => (<stop key={i} offset={s.offset} stopColor={s.color} />))}
                </radialGradient>
                <radialGradient id="fe2-lens" cx="50%" cy="50%" r="55%">
                  {DEEP_LENS_STOPS.map((s, i) => (<stop key={i} offset={s.offset} stopColor={s.color} />))}
                </radialGradient>
                <filter id="fe2-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                </filter>
              </defs>

              {/* Оправа */}
              <circle cx="300" cy="300" r="290" fill="url(#fe2-ring)" />
              {/* Линза */}
              <circle cx="300" cy="300" r="220" fill="url(#fe2-lens)" />

              {/* === ЗАСЕЧКИ-ВЫРЕЗЫ на внутренней стороне оправы === */}
              {/* 4 выреза в виде узких секторов, прорезающих оправу */}
              {/* Сверху */}
              <path d="M 290,290 L 290,225 L 310,225 L 310,290 Z" fill="url(#fe2-lens)" />
              {/* Снизу */}
              <path d="M 290,310 L 290,375 L 310,375 L 310,310 Z" fill="url(#fe2-lens)" />
              {/* Слева */}
              <path d="M 290,290 L 225,290 L 225,310 L 290,310 Z" fill="url(#fe2-lens)" />
              {/* Справа */}
              <path d="M 310,290 L 375,290 L 375,310 L 310,310 Z" fill="url(#fe2-lens)" />

              {/* Внутренняя обводка линзы — рисуется ПОВЕРХ вырезов, но с разрывами */}
              {/* Используем 4 дуги вместо полного круга, с разрывами где вырезы */}
              {/* Верхняя дуга (от 45° до 135°, пропуская 12° вокруг 90°) */}
              <path d="M 456,156 A 220,220 0 0 1 456,444" fill="none" stroke="#003366" strokeWidth="1.5" />
              {/* Нижняя дуга */}
              <path d="M 144,156 A 220,220 0 0 0 144,444" fill="none" stroke="#003366" strokeWidth="1.5" />
              {/* Правая дуга (короткая, между вырезами сверху-справа и снизу-справа) */}
              <path d="M 456,156 A 220,220 0 0 1 310,80" fill="none" stroke="#003366" strokeWidth="1.5" opacity="0" />
              {/* Упрощу: нарисую 4 дуги с пропусками */}
              <circle cx="300" cy="300" r="219" fill="none" stroke="#003366" strokeWidth="1.5"
                strokeDasharray="330 30 330 30" strokeDashoffset="0" />
              <circle cx="300" cy="300" r="217" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.5"
                strokeDasharray="330 30 330 30" strokeDashoffset="0" />

              {/* ДЫШАЩИЙ ОВАЛ — 4 кольца, 15 сек */}
              <g style={{ transformOrigin: "300px 300px" }}>
                <circle cx="300" cy="300" r="30" fill="none" stroke="#5BA8DB" strokeWidth="3" filter="url(#fe2-blur)" style={{ transformOrigin: "300px 300px", animation: "fe-breathe 15s ease-out infinite" }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#8BB4D8" strokeWidth="2.5" filter="url(#fe2-blur)" style={{ transformOrigin: "300px 300px", animation: "fe-breathe 15s ease-out infinite", animationDelay: "3.75s" }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#D4E4F0" strokeWidth="2" filter="url(#fe2-blur)" style={{ transformOrigin: "300px 300px", animation: "fe-breathe 15s ease-out infinite", animationDelay: "7.5s" }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#5BA8DB" strokeWidth="1.5" filter="url(#fe2-blur)" style={{ transformOrigin: "300px 300px", animation: "fe-breathe 15s ease-out infinite", animationDelay: "11.25s" }} />
              </g>

              {/* 3 СТАТИЧНЫХ КОНЦЕНТРИЧЕСКИХ КРУГА */}
              <circle cx="300" cy="300" r="80" fill="none" stroke="#00549F" strokeWidth="1" opacity="0.4" />
              <circle cx="300" cy="300" r="130" fill="none" stroke="#00549F" strokeWidth="0.8" opacity="0.3" />
              <circle cx="300" cy="300" r="185" fill="none" stroke="#00549F" strokeWidth="0.6" opacity="0.2" />

              {/* ПРИЦЕЛ — тонкие линии */}
              <line x1="100" y1="300" x2="200" y2="300" stroke="#003366" strokeWidth="0.8" opacity="0.45" strokeLinecap="round" />
              <line x1="400" y1="300" x2="500" y2="300" stroke="#003366" strokeWidth="0.8" opacity="0.45" strokeLinecap="round" />
              <line x1="300" y1="100" x2="300" y2="200" stroke="#003366" strokeWidth="0.8" opacity="0.45" strokeLinecap="round" />
              <line x1="300" y1="400" x2="300" y2="500" stroke="#003366" strokeWidth="0.8" opacity="0.45" strokeLinecap="round" />

              {/* ПУЛЬСИРУЮЩАЯ КРАСНАЯ ТОЧКА */}
              <circle cx="300" cy="300" r="8" fill="#C8102E" style={{ transformOrigin: "300px 300px", animation: "fe-pulse 5s ease-in-out infinite" }} />
              <circle cx="300" cy="300" r="4" fill="#FFFFFF" />

              {/* Внешняя кайма */}
              <circle cx="300" cy="300" r="289" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />
              <circle cx="300" cy="300" r="291" fill="none" stroke="#003366" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
