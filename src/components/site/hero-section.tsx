import Link from "next/link";
import { ArrowRight, FileText, Map, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SrossemblemMark } from "./site-header";
import { MoscowClock } from "./moscow-clock";
import { SEISMOGRAM_TILE_PATH, SEISMOGRAM_DUP_PATH } from "./seismogram-path";

/**
 * HERO — главный экран.
 * Только текстовый блок: международный статус, миссия, CTA.
 * Эмблемы и блоки с логотипами убраны по запросу.
 */
export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-paper-grid">
      {/* Декоративная боковая полоса слева */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      {/* Полоса сейсмомониторинга — сверху, под шапкой */}
      <SeismogramDivider />

      <div className="w-full px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
        {/* Резиновый контейнер на всю ширину страницы */}
        <div>
            {/* Главный заголовок — БОЛЬШИМИ БУКВАМИ */}
            <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] xl:text-[46px] leading-[1.15] font-bold tracking-[-0.01em] text-[#003366] mb-6 uppercase">
              Сейсмобезопасность и сейсмозащита зданий и сооружений в России, странах СНГ и ЕАЭС
            </h1>

            {/* Описание под заголовком — обычный размер */}
            <p className="text-base sm:text-lg lg:text-xl text-[#4A6378] leading-relaxed mb-8">
              Сейсмостойкое проектирование и строительство, сейсмоизоляция и сейсмоусиление. Защита объектов от пиковых воздействий. Мониторинг сейсмоактивности всех сейсмичных регионов.
            </p>

            {/* Подзаголовок — про СРОСС® и ЕАСА */}
            <p className="text-base sm:text-lg lg:text-xl text-[#4A6378] leading-relaxed mb-8">
              Информационная система <strong className="text-[#003366]">СРОСС®</strong>{" "}
              объединяет данные о сейсмической опасности, методологию оценки
              рисков и инструменты целевого планирования градостроительной
              деятельности. Проект развивается с 2009 года на базе патентованной
              технологии сейсмологического мониторинга и входит в международную
              экосистему Евразийской СЕЙСМО Ассоциации (ЕАСА).
            </p>

            {/* Метрики */}
            <div className="grid grid-cols-3 gap-6 mb-10 py-6 border-y border-[#D6DCE3]">
              <Metric value="50+" label="лет истории" />
              <Metric value="2009" label="запуск seismo.ru" />
              <Metric value="9" label="регионов ЕАЭС" />
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
      </div>
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
 * variant: "soft" | "medium" | "strong" | "silver" | "platinum" | "chrome" — управляет контрастом оправы.
 */
export function HeroEmblemLarge({
  variant = "medium",
  label = "Текущая",
  description,
  lensStops,
}: {
  variant?: "soft" | "medium" | "strong" | "silver" | "platinum" | "chrome";
  label?: string;
  description?: string;
  lensStops?: { offset: string; color: string }[];
}) {
  // Подпись и описание больше не рендерятся — оставлены в сигнатуре для обратной совместимости.
  void label;
  void description;
  // Шесть вариантов градиента оправы — от мягкого к хрому
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
    platinum: {
      ring: "heroRingGrad-platinum",
      // Платина — среднее между Silver и Chrome: больше серебра, мягче переход
      stops: [
        { offset: "0%", color: "#E8EEF4" },
        { offset: "30%", color: "#BCD0E4" },
        { offset: "55%", color: "#6FA0CC" },
        { offset: "80%", color: "#1A5A99" },
        { offset: "100%", color: "#05101E" },
      ],
    },
    chrome: {
      ring: "heroRingGrad-chrome",
      // Хромированная оправа — максимум серебра с лёгким синим оттенком
      stops: [
        { offset: "0%", color: "#F0F4F8" },
        { offset: "25%", color: "#C8D8E8" },
        { offset: "50%", color: "#8BB4D8" },
        { offset: "80%", color: "#2A6BA8" },
        { offset: "100%", color: "#0A1A2E" },
      ],
    },
  } as const;

  const g = gradients[variant];
  // Уникальный id для center — чтобы эмблемы на странице не конфликтовали
  const centerId = `heroCenterGrad-${variant}`;

  // Варианты объёма линзы
  const defaultLens = [
    { offset: "0%", color: "#FFFFFF" },
    { offset: "55%", color: "#FAFCFE" },
    { offset: "100%", color: "#E8EEF4" },
  ];
  const lensStopsFinal = lensStops || defaultLens;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px]">
        {/* Внешнее свечение — едва заметное */}
        <div className="absolute inset-0 rounded-full bg-[#00549F]/8 blur-2xl" />

        <svg
          viewBox="0 0 600 600"
          className="relative w-full h-full"
          role="img"
          aria-label="Эмблема СРОСС®"
        >
          <defs>
            {/* Convex metallic frame — radial gradient из центра */}
            <radialGradient id={g.ring} cx="50%" cy="50%" r="55%">
              {g.stops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </radialGradient>
            {/* Convex lens — radial gradient из центра (варьируется по вариантам) */}
            <radialGradient id={centerId} cx="50%" cy="50%" r="55%">
              {lensStopsFinal.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </radialGradient>
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
          {/* Надписи по дуге убраны — эмблема без текста */}

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

    </div>
  );
}

/**
 * Полоса сейсмомониторинга — «Live · Сейсмический мониторинг» + Москва/MSK.
 * Расположена вверху Hero, под шапкой.
 * Реалистичный паттерн: P-волны → S-волны → экспоненциальное затухание.
 */
function SeismogramDivider() {
  return (
    <div className="relative overflow-hidden border-b border-[#D6DCE3]/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <span className="text-[10px] tracking-[0.18em] uppercase text-[#2D5F3F] font-semibold whitespace-nowrap flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          Live · Сейсмический мониторинг
        </span>
        <div className="flex-1 h-10 overflow-hidden relative min-w-0">
          {/* Glow-подложка — ярко-зелёное свечение пиков */}
          <svg
            viewBox="0 0 1600 40"
            className="h-10 absolute seismogram-scroll"
            preserveAspectRatio="none"
            aria-hidden
            style={{ width: "200%" }}
          >
            <path
              d={SEISMOGRAM_TILE_PATH}
              fill="none"
              stroke="#22C55E"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.35"
              style={{ filter: "blur(2px)" }}
            />
            <path
              d={SEISMOGRAM_DUP_PATH}
              fill="none"
              stroke="#22C55E"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.35"
              style={{ filter: "blur(2px)" }}
            />
          </svg>
          {/* Основная линия — тёмно-зелёная */}
          <svg
            viewBox="0 0 1600 40"
            className="h-10 absolute seismogram-scroll"
            preserveAspectRatio="none"
            aria-hidden
            style={{ width: "200%" }}
          >
            {/* Реалистичная сейсмограмма — P/S-волны с затуханием */}
            <path
              d={SEISMOGRAM_TILE_PATH}
              fill="none"
              stroke="#2D5F3F"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Дубликат для бесшовной прокрутки */}
            <path
              d={SEISMOGRAM_DUP_PATH}
              fill="none"
              stroke="#2D5F3F"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-[#00549F] font-bold whitespace-nowrap flex items-center gap-1.5">
          <span className="text-[#4A6378] font-semibold">Москва</span>
          <span className="text-[#D6DCE3]">·</span>
          <MoscowClock className="tabular-nums tracking-[0.1em]" />
          <span className="text-[#4A6378] font-semibold text-[9px]">MSK</span>
          <span className="text-[#D6DCE3]">·</span>
          <span>ОК · 0 событий</span>
        </span>
      </div>
    </div>
  );
}
