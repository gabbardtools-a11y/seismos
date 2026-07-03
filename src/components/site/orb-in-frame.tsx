"use client";

/**
 * Овал внутри оправы — компиляция.
 * 
 * Берём оправу Silver (с линзой, текстом, точками),
 * но ВНУТРИ вместо концентрических колец и эпицентра —
 * дышащий овал (расходящиеся кольца как на видео).
 * 
 * Динамические концентрические круги УБРАНЫ.
 * Статичные опорные кольца оставлены для структуры.
 */

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

export function OrbInFrame() {
  return (
    <section className="section-pad bg-white border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">Овал в оправе</span>
            <span className="h-px w-10 bg-[#00549F]" />
          </div>
          <h3 className="text-2xl font-bold text-[#003366] tracking-tight">
            Дышащий овал внутри оправы СРОСС®
          </h3>
          <p className="text-sm text-[#4A6378] mt-2 max-w-xl mx-auto">
            Оправа Silver с линзой и текстом, но внутри — расходящиеся кольца
            как на видео, вместо концентрических кругов и эпицентра
          </p>
        </div>

        {/* Эмблема по центру */}
        <div className="flex justify-center">
          <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px]">
            <svg
              viewBox="0 0 600 600"
              className="w-full h-full"
              role="img"
              aria-label="Дышащий овал в оправе СРОСС®"
            >
              <defs>
                {/* Оправа */}
                <radialGradient id="oif-ring" cx="50%" cy="50%" r="55%">
                  {SILVER_STOPS.map((s, i) => (
                    <stop key={i} offset={s.offset} stopColor={s.color} />
                  ))}
                </radialGradient>
                {/* Линза */}
                <radialGradient id="oif-lens" cx="50%" cy="50%" r="55%">
                  {DEEP_LENS_STOPS.map((s, i) => (
                    <stop key={i} offset={s.offset} stopColor={s.color} />
                  ))}
                </radialGradient>
                {/* Размытие для расходящихся колец */}
                <filter id="oif-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                </filter>
                <path id="oif-top-arc" d="M 130,300 A 170,170 0 0 1 470,300" fill="none" />
                <path id="oif-bottom-arc" d="M 140,335 A 160,160 0 0 0 460,335" fill="none" />
              </defs>

              {/* Оправа (внешний синий круг) */}
              <circle cx="300" cy="300" r="290" fill="url(#oif-ring)" />

              {/* Линза (внутреннее поле) */}
              <circle cx="300" cy="300" r="220" fill="url(#oif-lens)" />
              <circle cx="300" cy="300" r="220" fill="none" stroke="#003366" strokeWidth="1.2" />
              <circle cx="300" cy="300" r="225" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

              {/* Статичные внешние круги (оставлены для структуры) */}
              <circle cx="300" cy="300" r="140" fill="none" stroke="#00549F" strokeWidth="1.4" opacity="0.55" />
              <circle cx="300" cy="300" r="175" fill="none" stroke="#00549F" strokeWidth="1.2" opacity="0.4" />

              {/* === ДЫШАЩИЙ ОВАЛ ВНУТРИ ОПРАВЫ === */}
              {/* Статичный белый центр */}
              <circle cx="300" cy="300" r="30" fill="#FFFFFF" opacity="0.9" />

              {/* Расходящиеся кольца — CSS transform с правильным origin */}
              <g style={{ transformOrigin: '300px 300px' }}>
                <circle cx="300" cy="300" r="30" fill="none" stroke="#5BA8DB" strokeWidth="3" filter="url(#oif-blur)" style={{ transformOrigin: '300px 300px', animation: 'oif-css 5s ease-out infinite' }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#8BB4D8" strokeWidth="2.5" filter="url(#oif-blur)" style={{ transformOrigin: '300px 300px', animation: 'oif-css 5s ease-out infinite', animationDelay: '1.25s' }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#D4E4F0" strokeWidth="2" filter="url(#oif-blur)" style={{ transformOrigin: '300px 300px', animation: 'oif-css 5s ease-out infinite', animationDelay: '2.5s' }} />
                <circle cx="300" cy="300" r="30" fill="none" stroke="#5BA8DB" strokeWidth="1.5" filter="url(#oif-blur)" style={{ transformOrigin: '300px 300px', animation: 'oif-css 5s ease-out infinite', animationDelay: '3.75s' }} />
              </g>

              {/* Текст по дуге */}
              <text
                fontFamily="'PT Sans', Arial, sans-serif"
                fontSize="38" fontWeight="700" letterSpacing="6"
                fill="#FFFFFF" textAnchor="middle"
              >
                <textPath href="#oif-top-arc" startOffset="50%">СРОСС®</textPath>
              </text>
              <text
                fontFamily="'PT Sans', Arial, sans-serif"
                fontSize="20" fontWeight="600" letterSpacing="3"
                fill="#FFFFFF" textAnchor="middle"
              >
                <textPath href="#oif-bottom-arc" startOffset="50%">СЕЙСМОБЕЗОПАСНОСТЬ РОССИИ</textPath>
              </text>

              {/* Декоративные точки */}
              <g fill="#FFFFFF">
                <circle cx="300" cy="80" r="3.5" />
                <circle cx="300" cy="520" r="3.5" />
                <circle cx="80" cy="300" r="3.5" />
                <circle cx="520" cy="300" r="3.5" />
              </g>

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
