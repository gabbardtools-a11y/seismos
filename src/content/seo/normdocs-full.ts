/**
 * Реестр нормативных документов с PDF и текстом.
 *
 * Структура: для каждого документа — slug, код, название, год, область (seismo/vibro/dyn),
 * путь к PDF в /normdocs-pdf/, путь к JSON с распарсенным текстом в /data/normdocs/.
 *
 * Источник PDF: открытые базы (meganorm.ru, files.stroyinf.ru, docs.cntd.ru).
 */

export type NormDocFull = {
  /** URL-слаг: /normdocs-pdf/[slug] */
  slug: string;
  /** Код документа: ГОСТ 30546.1-98 */
  code: string;
  /** Полное название */
  title: string;
  /** Краткое название для карточек */
  shortTitle: string;
  /** Год издания */
  year: number;
  /** Область: seismo | vibro | dyn | blast */
  domain: "seismo" | "vibro" | "dyn" | "blast";
  /** Тип документа */
  type: "ГОСТ" | "СП" | "СНиП" | "НП" | "РД" | "ПНАЭ" | "ПБ" | "ФЗ" | "ISO" | "EN";
  /** Путь к PDF в /public/ */
  pdfPath: string;
  /** Путь к JSON с распарсенным текстом (относительно корня проекта) */
  jsonPath: string;
  /** Краткое описание для карточки */
  description: string;
  /** Категория документа */
  category: string;
};

export const normDocsFull: NormDocFull[] = [
  {
    slug: "gost-30546.1-98",
    code: "ГОСТ 30546.1-98",
    title:
      "Общие требования к машинам, приборам и другим техническим изделиям и методы расчёта их сложных конструкций в части сейсмостойкости",
    shortTitle: "Сейсмостойкость оборудования — общие требования",
    year: 1998,
    domain: "seismo",
    type: "ГОСТ",
    pdfPath: "/normdocs-pdf/gost-30546.1-98.pdf",
    jsonPath: "data/normdocs/gost-30546.1-98.json",
    description:
      "Часть 1 комплекса ГОСТ 30546, устанавливающая общие требования к сейсмостойкости оборудования. Классификация изделий, уровни сейсмических воздействий, общие принципы подтверждения сейсмостойкости.",
    category: "Сейсмо · Оборудование",
  },
  {
    slug: "sp-14.13330.2018",
    code: "СП 14.13330.2018",
    title:
      "Строительство в сейсмических районах. Актуализированная редакция СНиП II-7-81*",
    shortTitle: "Строительство в сейсмических районах",
    year: 2018,
    domain: "seismo",
    type: "СП",
    pdfPath: "/normdocs-pdf/sp-14.13330.2018.pdf",
    jsonPath: "data/normdocs/sp-14.13330.2018.json",
    description:
      "Основной нормативный документ для проектирования зданий и сооружений в сейсмических районах России. Карты ОСР-2015, методы расчёта сейсмических нагрузок, требования к конструктивным решениям, сейсмоизоляция.",
    category: "Сейсмо · Здания",
  },
  {
    slug: "gost-12.1.012-2004",
    code: "ГОСТ 12.1.012-2004",
    title:
      "ССБТ. Вибрационная безопасность. Общие требования",
    shortTitle: "Вибрационная безопасность труда",
    year: 2004,
    domain: "vibro",
    type: "ГОСТ",
    pdfPath: "/normdocs-pdf/gost-12.1.012-2004.pdf",
    jsonPath: "data/normdocs/gost-12.1.012-2004.json",
    description:
      "Основной нормативный документ по вибрационной безопасности в России. Классификация общей и локальной вибрации, предельно допустимые значения (ПДУ), методы контроля на рабочих местах.",
    category: "Вибро · Безопасность труда",
  },
  {
    slug: "gost-14249-89",
    code: "ГОСТ 14249-89",
    title:
      "Сосуды и аппараты. Нормы и методы расчёта на прочность",
    shortTitle: "Сосуды и аппараты — расчёт на прочность",
    year: 1989,
    domain: "dyn",
    type: "ГОСТ",
    pdfPath: "/normdocs-pdf/gost-14249-89.pdf",
    jsonPath: "data/normdocs/gost-14249-89.json",
    description:
      "Основной нормативный документ по расчёту на прочность сосудов и аппаратов, работающих под давлением. Допускаемые напряжения, методы расчёта цилиндрических обечаек, конических элементов, днищ, крышек, фланцев.",
    category: "Динамика · Сосуды давления",
  },
  {
    slug: "gost-25.504-82",
    code: "ГОСТ 25.504-82",
    title:
      "Расчёты и испытания на прочность. Методы расчёта характеристик сопротивления усталости",
    shortTitle: "Расчёт характеристик усталости",
    year: 1982,
    domain: "dyn",
    type: "ГОСТ",
    pdfPath: "/normdocs-pdf/gost-25.504-82.pdf",
    jsonPath: "data/normdocs/gost-25.504-82.json",
    description:
      "Стандарт по методам расчёта характеристик сопротивления усталости деталей машин. Предел выносливости, кривые Вёлера, правило Майнера, учёт концентрации напряжений, масштабного фактора, поверхностного упрочнения.",
    category: "Динамика · Усталость",
  },
];

/**
 * Карта: нормализованный код → slug, для построения кросс-ссылок.
 * Нормализация: upper case, удалить лишние пробелы, точки, тире.
 */
export const normDocByCode: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const doc of normDocsFull) {
    map[normalizeCode(doc.code)] = doc.slug;
    // Также — альтернативные написания
    if (doc.code.startsWith("ГОСТ")) {
      // Без года
      const noYear = doc.code.replace(/-\d+.*$/, "");
      map[normalizeCode(noYear)] = doc.slug;
    }
  }
  return map;
})();

export function normalizeCode(code: string): string {
  return code
    .toUpperCase()
    .replace(/\s+/g, " ")
    .replace(/[.\-]/g, "")
    .trim();
}

/**
 * Найти slug документа по коду из текста.
 * Возвращает slug или null.
 */
export function findDocByCode(code: string): string | null {
  return normDocByCode[normalizeCode(code)] ?? null;
}

/**
 * Все доступные коды документов (для проверки в тексте).
 */
export const allDocCodes: string[] = normDocsFull.map((d) => d.code);
