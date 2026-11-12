/**
 * Категории раздела «Инфо» — систематизация меню (аналогично services-groups).
 *
 * Раньше «Инфо» был плоским дропдауном на 18 ссылок. Теперь это обзорная /info
 * с 4 карточками-категориями, каждая со своими переходами на существующие страницы.
 */

export type InfoLink = { label: string; href: string };

export type InfoCategory = {
  slug: string;
  title: string;
  description: string;
  domain: "seismo" | "vibro" | "dyn" | "blast";
  links: InfoLink[];
};

export const infoCategories: InfoCategory[] = [
  {
    slug: "normativnaya-baza",
    title: "Нормативная база",
    description:
      "Библиотека PDF (54 нормативных документа с полным текстом и кросс-ссылками) и карточки нормативов по доменам: сейсмо, вибро, взрывы, динамика.",
    domain: "seismo",
    links: [
      { label: "Библиотека PDF (54 дока)", href: "/normdocs-pdf" },
      { label: "Сейсмо — карточки", href: "/normdocs" },
      { label: "Вибро — карточки", href: "/normdocs-vibro" },
      { label: "Взрывы — карточки", href: "/normdocs-blast" },
      { label: "Динамика — карточки", href: "/normdocs-dyn" },
    ],
  },
  {
    slug: "glossarii",
    title: "Глоссарии",
    description:
      "Терминологические словари по направлениям: общий глоссарий сейсмостойкости, вибрация, взрывные воздействия, динамика и прочность конструкций.",
    domain: "vibro",
    links: [
      { label: "Глоссарий общий", href: "/glossary" },
      { label: "Глоссарий вибрации", href: "/glossary-vibro" },
      { label: "Глоссарий взрывов", href: "/glossary-blast" },
      { label: "Динамика и прочность", href: "/glossary-dyn" },
    ],
  },
  {
    slug: "spravochniki-i-razdely",
    title: "Справочники и разделы",
    description:
      "Справочные разделы сайта: оборудование, сейсмозащита, сейсмоизоляторы, сертификаты, сейсмо-глобус, антидроновая защита.",
    domain: "seismo",
    links: [
      { label: "Справочники", href: "/spravochniki" },
      { label: "Оборудование", href: "/oborudovanie" },
      { label: "Сейсмозащита", href: "/seismoprotection" },
      { label: "Сейсмоизоляторы", href: "/seismoizolyatory" },
      { label: "Сертификаты", href: "/sertifikaty" },
      { label: "Сейсмо Глобус", href: "/seismo-globus" },
      { label: "Антидроновая защита", href: "/antidron" },
    ],
  },
  {
    slug: "o-proekte",
    title: "О проекте",
    description: "Патенты и публикации СРОСС® — интеллектуальная собственность и научная база проекта.",
    domain: "seismo",
    links: [
      { label: "Патенты", href: "/#patents" },
      { label: "Публикации", href: "/#publications" },
    ],
  },
];
