"use client";

/**
 * Овал в оправе — вариант 2.
 * 
 * Оправа Silver + дышащий овал внутри + красная точка в центре.
 * Без текста по дуге, без декоративных точек.
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

export function OrbInFrameRed() {
  return (
    <section className="section-pad bg-white border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">Овал в оправе · Вариант 2</span>
            <span className="h-px w-10 bg-[#00549F]" />
          </div>
          <h3 className="text-2xl font-bold text-[#003366] tracking-tight">
            Дышащий овал + красная точка, без надписей
          </h3>
        </div>

        <div className="flex justify-center">
          <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px]">
            <svg viewBox="0 0 600 600" className="w-full h-full" role="img" aria-label="Овал в оправе с красной точкой">
              <defs>
                <radialGradient id="oifr-ring" cx="50%" cy="50%" r="55%">
                  {SILVER_STOPS.map((s, i) => (
                    <stop key={i} offset={s.offset} stopColor={s.color} />
                  ))}
                </radialGradient>
                <radialGradient id="oifr-lens" cx="50%" cy="50%" r="55%">
                  {DEEP_LENS_STOPS.map((s, i) => (
                    <stop key={i} offset={s.offset} stopColor={s.color} />
                  ))}
                </radialGradient>
                <filter id="oifr-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                </filter>
              </defs>

              {/* Оправа */}
              <circle cx="300" cy="300" r="290" fill="url(#oifr-ring)" />
              {/* Линза */}
              <circle cx="300" cy="300" r="220" fill="url(#oifr-lens)" />
              <circle cx="300" cy="300" r="220" fill="none" stroke="#003366" strokeWidth="1.2" />
              <circle cx="300" cy="300" r="225" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

              {/* Статичные опорные кольца */}
              <circle cx="300" cy="300" r="140" fill="none" stroke="#00549F" strokeWidth="1.4" opacity="0.55" />
              <circle cx="300" cy="300" r="175" fill="none" stroke="#00549F" strokeWidth="1.2" opacity="0.4" />

              {/* === ДЫШАЩИЙ ОВАЛ — CSS transform с правильным origin === */}
              <g style={{ transformOrigin: '300px 300px' }}>
                <circle cx="300" cy="300" r="30" fill="none" stroke="#5BA8DB" strokeWidth="3" filter="url(#oifr-blur)" style={{ transformOrigin: '300px 300px', animation: 'oifr-css 5s ease-out infinite' }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#8BB4D8" strokeWidth="2.5" filter="url(#oifr-blur)" style={{ transformOrigin: '300px 300px', animation: 'oifr-css 5s ease-out infinite', animationDelay: '1.25s' }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#D4E4F0" strokeWidth="2" filter="url(#oifr-blur)" style={{ transformOrigin: '300px 300px', animation: 'oifr-css 5s ease-out infinite', animationDelay: '2.5s' }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#5BA8DB" strokeWidth="1.5" filter="url(#oifr-blur)" style={{ transformOrigin: '300px 300px', animation: 'oifr-css 5s ease-out infinite', animationDelay: '3.75s' }} />
              </g>

              {/* Красная точка в центре */}
              <circle cx="300" cy="300" r="8" fill="#C8102E" />
              <circle cx="300" cy="300" r="4" fill="#FFFFFF" />

              {/* Внешняя кайма */}
              <circle cx="300" cy="300" r="288" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />
              <circle cx="300" cy="300" r="293" fill="none" stroke="#003366" strokeWidth="0.8" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
