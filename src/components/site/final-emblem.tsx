"use client";

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

export function FinalEmblem() {
  return (
    <section className="section-pad bg-white border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">Финальная эмблема</span>
            <span className="h-px w-10 bg-[#00549F]" />
          </div>
          <h3 className="text-2xl font-bold text-[#003366] tracking-tight">СРОСС® — компиляция</h3>
        </div>
        <div className="flex justify-center">
          <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]">
            <svg viewBox="0 0 600 600" className="w-full h-full" role="img" aria-label="Финальная эмблема СРОСС®">
              <defs>
                <radialGradient id="fe-ring" cx="50%" cy="50%" r="55%">
                  {SILVER_STOPS.map((s, i) => (<stop key={i} offset={s.offset} stopColor={s.color} />))}
                </radialGradient>
                <radialGradient id="fe-lens" cx="50%" cy="50%" r="55%">
                  {DEEP_LENS_STOPS.map((s, i) => (<stop key={i} offset={s.offset} stopColor={s.color} />))}
                </radialGradient>
                <filter id="fe-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                </filter>
              </defs>

              {/* Оправа */}
              <circle cx="300" cy="300" r="290" fill="url(#fe-ring)" />
              {/* Линза — обводка вплотную к границе оправы */}
              <circle cx="300" cy="300" r="220" fill="url(#fe-lens)" />
              <circle cx="300" cy="300" r="219" fill="none" stroke="#003366" strokeWidth="1.5" />
              <circle cx="300" cy="300" r="217" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.5" />

              {/* ДЫШАЩИЙ ОВАЛ — 4 кольца, 15 сек */}
              <g style={{ transformOrigin: "300px 300px" }}>
                <circle cx="300" cy="300" r="30" fill="none" stroke="#5BA8DB" strokeWidth="3" filter="url(#fe-blur)" style={{ transformOrigin: "300px 300px", animation: "fe-breathe 15s ease-out infinite" }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#8BB4D8" strokeWidth="2.5" filter="url(#fe-blur)" style={{ transformOrigin: "300px 300px", animation: "fe-breathe 15s ease-out infinite", animationDelay: "3.75s" }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#D4E4F0" strokeWidth="2" filter="url(#fe-blur)" style={{ transformOrigin: "300px 300px", animation: "fe-breathe 15s ease-out infinite", animationDelay: "7.5s" }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#5BA8DB" strokeWidth="1.5" filter="url(#fe-blur)" style={{ transformOrigin: "300px 300px", animation: "fe-breathe 15s ease-out infinite", animationDelay: "11.25s" }} />
              </g>

              {/* 3 СТАТИЧНЫХ КОНЦЕНТРИЧЕСКИХ КРУГА */}
              <circle cx="300" cy="300" r="80" fill="none" stroke="#00549F" strokeWidth="1" opacity="0.4" />
              <circle cx="300" cy="300" r="130" fill="none" stroke="#00549F" strokeWidth="0.8" opacity="0.3" />
              <circle cx="300" cy="300" r="185" fill="none" stroke="#00549F" strokeWidth="0.6" opacity="0.2" />

              {/* ПРИЦЕЛ — тонкие линии до внутренних границ */}
              <line x1="100" y1="300" x2="200" y2="300" stroke="#003366" strokeWidth="0.8" opacity="0.45" strokeLinecap="round" />
              <line x1="400" y1="300" x2="500" y2="300" stroke="#003366" strokeWidth="0.8" opacity="0.45" strokeLinecap="round" />
              <line x1="300" y1="100" x2="300" y2="200" stroke="#003366" strokeWidth="0.8" opacity="0.45" strokeLinecap="round" />
              <line x1="300" y1="400" x2="300" y2="500" stroke="#003366" strokeWidth="0.8" opacity="0.45" strokeLinecap="round" />

              {/* ПУЛЬСИРУЮЩАЯ КРАСНАЯ ТОЧКА */}
              <circle cx="300" cy="300" r="8" fill="#C8102E" style={{ transformOrigin: "300px 300px", animation: "fe-pulse 5s ease-in-out infinite" }} />
              <circle cx="300" cy="300" r="4" fill="#FFFFFF" />

              {/* 4 ЗАСЕЧКИ на внутренней стороне оправы */}
              <line x1="300" y1="245" x2="300" y2="225" stroke="#003366" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
              <line x1="300" y1="355" x2="300" y2="375" stroke="#003366" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
              <line x1="225" y1="300" x2="245" y2="300" stroke="#003366" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
              <line x1="355" y1="300" x2="375" y2="300" stroke="#003366" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />

              {/* Внешняя кайма — вплотную */}
              <circle cx="300" cy="300" r="289" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />
              <circle cx="300" cy="300" r="291" fill="none" stroke="#003366" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
