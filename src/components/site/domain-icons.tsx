/**
 * DomainIcons — кастомные SVG-иконки для 4 областей СРОСС®.
 * Единый стиль: line-art, 24×24 viewBox, stroke-width 1.5,
 * currentColor — наследуют цвет от родителя.
 *
 * Области:
 *   - SeismoIcon (сейсмо) — разлом тектонической плиты с эпицентром
 *   - VibroIcon (вибро) — синусоида с точками-частицами
 *   - BlastIcon (взрыв) — расходящиеся ударные волны с эпицентром
 *   - DynIcon (динамика) — осциллограмма напряжений + FEM-сетка
 *
 * Использование:
 *   import { SeismoIcon, VibroIcon, BlastIcon, DynIcon } from "@/components/site/domain-icons";
 *   <SeismoIcon className="h-9 w-9 text-[#00549F]" />
 */

type IconProps = {
  className?: string;
  title?: string;
};

/** Сейсмо — разлом тектонической плиты с эпицентром (звезда) */
export function SeismoIcon({ className, title = "Сейсмо" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Верхняя плита — неровная поверхность */}
      <path d="M2 8 L5 6 L8 8 L11 5 L14 8 L17 5 L20 8 L22 6" />
      {/* Нижняя плита — сдвинута */}
      <path d="M2 17 L5 19 L8 16 L11 19 L14 16 L17 19 L20 16 L22 18" />
      {/* Разлом — зигзаг между плитами */}
      <path d="M4 9 L6 11 L4 13 L6 15" opacity="0.6" />
      <path d="M10 9 L12 11 L10 13 L12 15" opacity="0.6" />
      <path d="M16 9 L18 11 L16 13 L18 15" opacity="0.6" />
      {/* Эпицентр — 4-лучевая звезда */}
      <path d="M12 11 L12 13 M11 12 L13 12" strokeWidth={2} />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      {/* Исходящие волны */}
      <path d="M12 12 m-3 0 a3 3 0 0 1 6 0" opacity="0.4" />
      <path d="M12 12 m3 0 a3 3 0 0 1 -6 0" opacity="0.4" />
    </svg>
  );
}

/** Вибро — синусоида с точками-частицами */
export function VibroIcon({ className, title = "Вибро" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Синусоида — основная волна */}
      <path d="M2 12 Q5 4 8 12 T14 12 T20 12 T22 12" />
      {/* Точки-частицы на пиках */}
      <circle cx="5" cy="8" r="0.7" fill="currentColor" />
      <circle cx="8" cy="12" r="0.7" fill="currentColor" />
      <circle cx="11" cy="16" r="0.7" fill="currentColor" />
      <circle cx="14" cy="12" r="0.7" fill="currentColor" />
      <circle cx="17" cy="8" r="0.7" fill="currentColor" />
      <circle cx="20" cy="12" r="0.7" fill="currentColor" />
      {/* Дополнительные точки между */}
      <circle cx="6.5" cy="10" r="0.4" fill="currentColor" opacity="0.5" />
      <circle cx="9.5" cy="14" r="0.4" fill="currentColor" opacity="0.5" />
      <circle cx="12.5" cy="14" r="0.4" fill="currentColor" opacity="0.5" />
      <circle cx="15.5" cy="10" r="0.4" fill="currentColor" opacity="0.5" />
      <circle cx="18.5" cy="10" r="0.4" fill="currentColor" opacity="0.5" />
      {/* Ось снизу — пунктир */}
      <path d="M2 20 L22 20" strokeWidth={0.5} strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

/** Взрыв — расходящиеся ударные волны с эпицентром */
export function BlastIcon({ className, title = "Взрыв" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Эпицентр — точка */}
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      {/* Ударные волны — концентрические окружности */}
      <circle cx="12" cy="12" r="3" opacity="0.9" />
      <circle cx="12" cy="12" r="5.5" opacity="0.7" />
      <circle cx="12" cy="12" r="8" opacity="0.5" />
      <circle cx="12" cy="12" r="10.5" opacity="0.3" />
      {/* Лучи — расходящиеся стрелки */}
      <path d="M12 1 L12 3 M23 12 L21 12 M12 23 L12 21 M1 12 L3 12" opacity="0.6" />
      <path d="M4.2 4.2 L5.6 5.6 M19.8 4.2 L18.4 5.6 M19.8 19.8 L18.4 18.4 M4.2 19.8 L5.6 18.4" opacity="0.6" />
      {/* Осколки — мелкие частицы */}
      <path d="M16 6 L17 5 M18 8 L19 7 M18 16 L19 17 M16 18 L17 19 M8 18 L7 19 M6 16 L5 17 M6 8 L5 7 M8 6 L7 5" strokeWidth={1} opacity="0.5" />
    </svg>
  );
}

/** Динамика — осциллограмма напряжений + FEM-сетка */
export function DynIcon({ className, title = "Динамика" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* FEM-сетка — треугольные элементы */}
      <path d="M2 20 L7 12 L12 20 Z" strokeWidth={0.7} opacity="0.4" />
      <path d="M7 12 L12 20 L12 12 Z" strokeWidth={0.7} opacity="0.4" />
      <path d="M12 12 L17 20 L12 20 Z" strokeWidth={0.7} opacity="0.4" />
      <path d="M12 12 L17 20 L17 12 Z" strokeWidth={0.7} opacity="0.4" />
      <path d="M17 12 L22 20 L17 20 Z" strokeWidth={0.7} opacity="0.4" />
      <path d="M7 12 L12 12 L17 12" strokeWidth={0.7} opacity="0.4" />
      {/* Осциллограмма напряжений — основная линия */}
      <path d="M2 8 L5 8 L6 4 L7 12 L8 6 L9 14 L10 8 L12 8 L13 3 L14 13 L15 7 L16 11 L17 8 L22 8" strokeWidth={1.8} />
      {/* Узлы FEM-сетки */}
      <circle cx="7" cy="12" r="0.6" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="20" r="0.6" fill="currentColor" opacity="0.6" />
      <circle cx="17" cy="12" r="0.6" fill="currentColor" opacity="0.6" />
      <circle cx="17" cy="20" r="0.6" fill="currentColor" opacity="0.6" />
      <circle cx="2" cy="20" r="0.6" fill="currentColor" opacity="0.6" />
      <circle cx="22" cy="20" r="0.6" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/** Компактный набор: связка иконка + название для обзорной страницы */
export const DOMAINS = [
  {
    id: "seismo",
    name: "Сейсмо",
    full: "Сейсмология и сейсмостойкость",
    Icon: SeismoIcon,
    color: "#00549F",
    bgColor: "#E7EEF6",
    description: "77 терминов по сейсмологии, сейсмике, сейсмостойкости",
    glossaryHref: "/glossary",
    glossaryCount: 77,
    glossaryCategories: 9,
    normdocsHref: "/normdocs",
    normdocsCount: 8,
    normdocsCategories: ["ГОСТ", "СП", "СНиП", "НП"],
    keywords: ["землетрясение", "MSK-64", "ОСР-2015", "СП 14.13330", "НП-031-01", "ГОСТ 30546"],
  },
  {
    id: "vibro",
    name: "Вибро",
    full: "Вибрация, вибростойкость, виброизоляция",
    Icon: VibroIcon,
    color: "#B45309",
    bgColor: "#FDF8F3",
    description: "70 терминов по вибрации, вибростойкости, виброизоляции, вибродиагностике машин",
    glossaryHref: "/glossary-vibro",
    glossaryCount: 70,
    glossaryCategories: 10,
    normdocsHref: "/normdocs-vibro",
    normdocsCount: 11,
    normdocsCategories: ["ГОСТ", "СП", "ISO", "СанПиН"],
    keywords: ["вибрация", "резонанс", "FFT", "PSD", "ГОСТ 12.1.012", "ISO 10816", "вибродиагностика"],
  },
  {
    id: "blast",
    name: "Взрыв",
    full: "Взрывные воздействия и ударные волны",
    Icon: BlastIcon,
    color: "#C8102E",
    bgColor: "#FFF5F5",
    description: "45 терминов по взрывам, ударным волнам, взрывозащите",
    glossaryHref: "/glossary-blast",
    glossaryCount: 45,
    glossaryCategories: 9,
    normdocsHref: "/normdocs-blast",
    normdocsCount: 12,
    normdocsCategories: ["ГОСТ", "СП", "ФЗ", "РБ", "EN", "UFC", "NFPA"],
    keywords: ["ударная волна", "BLEVE", "VCE", "детонация", "P-I диаграмма", "EN 1991-1-7"],
  },
  {
    id: "dyn",
    name: "Динамика",
    full: "Динамика и прочность конструкций",
    Icon: DynIcon,
    color: "#4A6378",
    bgColor: "#F4F6F8",
    description: "48 терминов по динамике, прочности, усталости, разрушению",
    glossaryHref: "/glossary-dyn",
    glossaryCount: 48,
    glossaryCategories: 10,
    normdocsHref: "/normdocs-dyn",
    normdocsCount: 12,
    normdocsCategories: ["ГОСТ", "СП", "ПНАЭ", "РД", "ПБ", "ISO", "EN", "ASME"],
    keywords: ["усталость", "предел выносливости", "K_IC", "МКЭ", "CFD", "ПНАЭ Г-7-002"],
  },
] as const;
