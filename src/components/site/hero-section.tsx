import Link from "next/link";
import { ArrowRight, FileText, Map, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SrossemblemMark } from "./site-header";
import { SoundToggle } from "./sound-toggle";

/**
 * HERO — главный экран.
 * Слева: текст (международный статус, миссия, CTA).
 * Справа: крупная эмблема СРОСС® с анимированными волнами.
 */
export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-paper-grid">
      {/* Декоративная боковая полоса слева */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ====== Левая колонка: текст ====== */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#00549F]" />
              <span className="eyebrow">
                Международный проект · Устойчивое развитие ООН (SDG 11)
              </span>
            </div>

            {/* Главный заголовок */}
            <h1 className="text-[42px] sm:text-[54px] lg:text-[64px] leading-[1.05] font-bold tracking-[-0.015em] text-[#003366] mb-6">
              Сейсмобезопасность
              <br />
              <span className="text-[#00549F]">территорий России</span>
              <br />
              <span className="text-[#4A6378] text-[28px] sm:text-[36px] lg:text-[42px] font-semibold tracking-tight">
                через открытые данные и науку
              </span>
            </h1>

            {/* Подзаголовок */}
            <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed max-w-2xl mb-8">
              Информационная система <strong className="text-[#003366]">СРОСС®</strong>{" "}
              объединяет данные о сейсмической опасности, методологию оценки
              рисков и инструменты целевого планирования градостроительной
              деятельности. Проект развивается с 2009 года на базе патентованной
              технологии сейсмологического мониторинга и входит в международную
              экосистему Евразийской СЕЙСМО Ассоциации (ЕАСА).
            </p>

            {/* Метрики */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 py-6 border-y border-[#D6DCE3]">
              <Metric value="50+" label="лет истории" />
              <Metric value="2009" label="запуск seismo.ru" />
              <Metric value="9" label="регионов ЕАЭС" />
              <Metric value="1" label="патент · ТЗ «червяк»" />
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#00549F] hover:bg-[#003366] text-white text-[13px] tracking-[0.14em] uppercase font-semibold h-12 px-7"
              >
                <Link href="#map">
                  <Map className="mr-2 h-4 w-4" />
                  Карта рисков
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#00549F] text-[#00549F] hover:bg-[#E7EEF6] hover:text-[#003366] text-[13px] tracking-[0.14em] uppercase font-semibold h-12 px-7"
              >
                <Link href="#about">
                  О системе
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* ====== Правая колонка: 3 варианта эмблемы ====== */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center justify-center">
            {/* Заголовок блока + кнопка звука */}
            <div className="mb-6 flex flex-col items-center gap-3">
              <div className="flex items-center gap-4">
                <SoundToggle />
                <div className="text-center">
                  <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#4A6378]">
                    Три варианта · Концепция оправы
                  </div>
                </div>
              </div>
              <div className="h-px w-12 bg-[#00549F]" />
              <div className="text-[10px] tracking-[0.14em] uppercase text-[#4A6378]/70 max-w-xs text-center">
                Включите эмбиент для полного эффекта присутствия
              </div>
            </div>

            {/* Сетка из 4 эмблем */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-3 items-start">
              <HeroEmblemLarge
                variant="soft"
                label="Soft"
                description="Спокойная объёмность"
              />
              <HeroEmblemLarge
                variant="medium"
                label="Medium"
                description="Сбалансированная выпуклость"
              />
              <HeroEmblemLarge
                variant="strong"
                label="Strong"
                description="Металлическая оправа"
              />
              <HeroEmblemLarge
                variant="silver"
                label="Silver"
                description="Серебряно-синяя оправа лупы"
              />
            </div>

            {/* Подпись под эмблемами */}
            <div className="mt-8 text-center max-w-sm">
              <div className="text-[15px] font-bold tracking-[0.18em] text-[#00549F] uppercase">
                СРОСС®
              </div>
              <div className="text-[12px] tracking-[0.14em] text-[#4A6378] uppercase mt-1">
                Сейсмобезопасность России
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] tracking-[0.16em] uppercase">
                <Badge>UN-Habitat aligned</Badge>
                <Badge>SDG 11</Badge>
                <Badge>ЕАЭС · Россия</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя «сейсмограмма» — бегущая волна как разделитель */}
      <SeismogramDivider />
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[28px] sm:text-[32px] font-bold text-[#00549F] leading-none">
        {value}
      </div>
      <div className="text-[10px] tracking-[0.14em] uppercase text-[#4A6378] mt-2">
        {label}
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 border border-[#00549F]/40 text-[#00549F] bg-white/60">
      {children}
    </span>
  );
}

/**
 * Крупная эмблема СРОСС® для hero — с тонкой анимацией волн.
 * variant: "soft" | "medium" | "strong" | "silver" — управляет контрастом оправы.
 */
function HeroEmblemLarge({
  variant = "medium",
  label = "Текущая",
  description,
}: {
  variant?: "soft" | "medium" | "strong" | "silver";
  label?: string;
  description?: string;
}) {
  // Три варианта градиента оправы — от мягкого к усиленному
  const gradients = {
    soft: {
      ring: "heroRingGrad-soft",
      // Минимальный контраст — спокойная объёмность
      stops: [
        { offset: "0%", color: "#3A7AB5" },
        { offset: "50%", color: "#00549F" },
        { offset: "100%", color: "#003366" },
      ],
    },
    medium: {
      ring: "heroRingGrad-medium",
      // Текущая версия — сбалансированная выпуклость
      stops: [
        { offset: "0%", color: "#5BA8DB" },
        { offset: "50%", color: "#00549F" },
        { offset: "100%", color: "#001A33" },
      ],
    },
    strong: {
      ring: "heroRingGrad-strong",
      // Максимальный контраст — выраженная металлическая оправа
      stops: [
        { offset: "0%", color: "#9DCEEA" },
        { offset: "50%", color: "#00549F" },
        { offset: "100%", color: "#000A1A" },
      ],
    },
    silver: {
      ring: "heroRingGrad-silver",
      // Серебряно-синяя металлическая оправа — серебристый блик + графитовый край
      stops: [
        { offset: "0%", color: "#D4E4F0" },
        { offset: "35%", color: "#5BA8DB" },
        { offset: "70%", color: "#00549F" },
        { offset: "100%", color: "#00111F" },
      ],
    },
  } as const;

  const g = gradients[variant];
  // Уникальные id для center и path — чтобы 3 эмблемы на странице не конфликтовали
  const centerId = `heroCenterGrad-${variant}`;
  const topArcId = `heroTopArc-${variant}`;
  const bottomArcId = `heroBottomArc-${variant}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px]">
        {/* Внешнее свечение — едва заметное */}
        <div className="absolute inset-0 rounded-full bg-[#00549F]/8 blur-2xl" />

        <svg
          viewBox="0 0 600 600"
          className="relative w-full h-full"
          role="img"
          aria-label={`Эмблема СРОСС® — вариант ${label}`}
        >
          <defs>
            {/* Convex metallic frame — radial gradient из центра */}
            <radialGradient id={g.ring} cx="50%" cy="50%" r="55%">
              {g.stops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </radialGradient>
            {/* Convex lens — radial gradient из центра */}
            <radialGradient id={centerId} cx="50%" cy="50%" r="55%">
              <stop offset="0%"   stopColor="#FFFFFF" />
              <stop offset="55%"  stopColor="#FAFCFE" />
              <stop offset="100%" stopColor="#E8EEF4" />
            </radialGradient>
            <path
              id={topArcId}
              d="M 130,300 A 170,170 0 0 1 470,300"
              fill="none"
            />
            <path
              id={bottomArcId}
              d="M 140,335 A 160,160 0 0 0 460,335"
              fill="none"
            />
          </defs>

          {/* Внешний синий круг (медальон) — convex metallic frame */}
          <circle cx="300" cy="300" r="290" fill={`url(#${g.ring})`} />

          {/* Внутреннее поле — convex lens */}
          <circle cx="300" cy="300" r="220" fill={`url(#${centerId})`} />
          <circle cx="300" cy="300" r="220" fill="none" stroke="#003366" strokeWidth="1.2" />
          <circle cx="300" cy="300" r="225" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

          {/* Статичные внешние концентрические круги внутри синего кольца */}
          <circle cx="300" cy="300" r="140" fill="none" stroke="#00549F" strokeWidth="1.4" opacity="0.55" />
          <circle cx="300" cy="300" r="175" fill="none" stroke="#00549F" strokeWidth="1.2" opacity="0.4" />

          {/* Концентрические опорные окружности (статичные) */}
          <g fill="none" stroke="#00549F" strokeLinecap="round">
            <circle cx="300" cy="300" r="22" strokeWidth="2.2" />
            <circle cx="300" cy="300" r="42" strokeWidth="1.6" opacity="0.85" />
            <circle cx="300" cy="300" r="64" strokeWidth="1.3" opacity="0.7" />
            <circle cx="300" cy="300" r="88" strokeWidth="1.1" opacity="0.55" />
            <circle cx="300" cy="300" r="114" strokeWidth="0.9" opacity="0.4" />
          </g>

          {/* Пульсирующие кольца (5 волн с задержкой) — расходятся за пределы статичных кругов */}
          <g fill="none" strokeLinecap="round">
            <circle cx="300" cy="300" r="22" stroke="#003366" strokeWidth="2.5" className="hero-pulse-ring hero-pulse-ring-1" />
            <circle cx="300" cy="300" r="22" stroke="#00549F" strokeWidth="2"   className="hero-pulse-ring hero-pulse-ring-2" />
            <circle cx="300" cy="300" r="22" stroke="#00549F" strokeWidth="1.8" className="hero-pulse-ring hero-pulse-ring-3" />
            <circle cx="300" cy="300" r="22" stroke="#4A6378" strokeWidth="1.5" className="hero-pulse-ring hero-pulse-ring-4" />
            <circle cx="300" cy="300" r="22" stroke="#4A6378" strokeWidth="1.2" className="hero-pulse-ring hero-pulse-ring-5" />
          </g>

          {/* Эпицентр — пульсирующая красная точка (±3%) */}
          <circle cx="300" cy="300" r="6" fill="#C8102E" className="hero-epicenter-pulse" />
          <circle cx="300" cy="300" r="3" fill="#FFFFFF" />

          {/* Текст по дуге */}
          <text
            fontFamily="'PT Sans', Arial, sans-serif"
            fontSize="38"
            fontWeight="700"
            letterSpacing="6"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            <textPath href={`#${topArcId}`} startOffset="50%">СРОСС®</textPath>
          </text>
          <text
            fontFamily="'PT Sans', Arial, sans-serif"
            fontSize="20"
            fontWeight="600"
            letterSpacing="3"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            <textPath href={`#${bottomArcId}`} startOffset="50%">СЕЙСМОБЕЗОПАСНОСТЬ РОССИИ</textPath>
          </text>

          {/* Декоративные точки по сторонам света */}
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

      {/* Подпись под эмблемой */}
      <div className="mt-5 text-center">
        <div className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#00549F]">
          {label}
        </div>
        {description && (
          <div className="text-[10px] tracking-[0.1em] uppercase text-[#4A6378] mt-1.5 max-w-[220px]">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Бегущая сейсмограмма — разделитель между Hero и следующим блоком.
 * Чистый SVG, CSS-анимация.
 */
function SeismogramDivider() {
  return (
    <div className="relative border-t border-[#D6DCE3] bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <span className="text-[10px] tracking-[0.18em] uppercase text-[#4A6378] font-semibold whitespace-nowrap">
          Live · Сейсмический мониторинг
        </span>
        <svg
          viewBox="0 0 800 40"
          className="flex-1 h-8"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 0 20 L 80 20 L 90 8 L 100 32 L 110 12 L 120 28 L 130 20 L 200 20 L 210 4 L 220 36 L 230 14 L 240 26 L 250 20 L 380 20 L 390 10 L 400 30 L 410 16 L 420 24 L 430 20 L 560 20 L 570 6 L 580 34 L 590 12 L 600 28 L 610 20 L 740 20 L 750 10 L 760 30 L 770 14 L 780 26 L 800 20"
            fill="none"
            stroke="#00549F"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="seismogram-line"
          />
        </svg>
        <span className="text-[10px] tracking-[0.18em] uppercase text-[#00549F] font-bold whitespace-nowrap">
          ОК · 0 событий
        </span>
      </div>
    </div>
  );
}
