/**
 * Группы услуг СРОСС® — систематизация меню «Услуги».
 *
 * Раньше 37 отдельных SEO-страниц висели в одном дропдауне «Услуги» под 5 подзаголовками.
 * Теперь каждая группа — отдельный пункт меню → лендинг /services/[group] →
 * переходы на конкретные услуги. Сами страницы услуг не меняются.
 *
 * Источник: SEO_LINKS из site-header.tsx (те же href), сгруппированы и обогащены
 * описанием группы.
 */

export type ServiceLink = {
  label: string;
  href: string;
};

export type ServiceGroup = {
  /** URL-слаг: /services/[group] */
  slug: string;
  /** Название группы (меню + h1 лендинга) */
  title: string;
  /** Краткое описание для карточки на /services и hero лендинга */
  description: string;
  /** Область для цветового бейджа (совпадает с DOMAINS) */
  domain: "seismo" | "vibro" | "dyn" | "blast";
  /** Услуги группы */
  services: ServiceLink[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "sertifikaciya",
    title: "Сертификация сейсмостойкости",
    description:
      "Подтверждение сейсмостойкости оборудования и сооружений: сертификаты, протоколы испытаний, заключения, категории по НП-031-01. Документы для Ростехнадзора, экспертизы и тендеров.",
    domain: "seismo",
    services: [
      { label: "Сертификат сейсмостойкости", href: "/seismo_sertifikat" },
      { label: "Сертификат сейсмоустойчивости", href: "/sertifikat-seysmoustoychivosti" },
      { label: "Сертификат соответствия ГОСТ Р", href: "/sertifikat-sootvetstviya-seysmostoykosti" },
      { label: "Протокол испытаний", href: "/protokol-ispytaniy-na-seysmostoykost" },
      { label: "Заключение о сейсмостойкости", href: "/zaklyuchenie-o-seysmostoykosti" },
      { label: "Сейсмостойкое исполнение", href: "/seysmostoykoe-ispolnenie-oborudovaniya" },
      { label: "Категории I/II по НП-031-01", href: "/kategoriya-seysmostoykosti-i-ii-np-031" },
    ],
  },
  {
    slug: "ispytaniya-i-raschety",
    title: "Испытания и расчёты на сейсмостойкость",
    description:
      "Натурные и расчётные методы подтверждения сейсмостойкости: вибростенд, сейсмические испытания, расчёт по акселерограмме, спектральный метод, разработка ПМИ, виброиспытания оборудования.",
    domain: "dyn",
    services: [
      { label: "Испытания на вибростенде", href: "/ispytaniya-na-seysmostoykost" },
      { label: "Сейсмические испытания", href: "/seysmicheskie-ispytaniya" },
      { label: "Расчёт сейсмостойкости", href: "/raschet-seysmostoykosti" },
      { label: "Расчёт по акселерограмме", href: "/raschet-po-akselerogramme" },
      { label: "Спектральный метод", href: "/spektralnyy-raschet-seysmiki" },
      { label: "Разработка ПМИ", href: "/razrabotka-pmi-seysmostoykosti" },
      { label: "Виброиспытания оборудования", href: "/vibroispytaniya-oborudovaniya" },
    ],
  },
  {
    slug: "obsledovanie-i-izyskaniya",
    title: "Обследование и изыскания",
    description:
      "Обследование зданий и сооружений на сейсмостойкость, экспертиза, оценка риска, аудит безопасности, паспортизация (в т.ч. с 3D-моделью STP), обследование после землетрясения.",
    domain: "seismo",
    services: [
      { label: "Обследование зданий", href: "/obsledovanie-zdaniy-na-seysmostoykost" },
      { label: "Экспертиза сейсмостойкости", href: "/ekspertiza-seysmostoykosti-zdaniya" },
      { label: "Оценка сейсмического риска", href: "/otsenka-seysmicheskogo-riska" },
      { label: "Аудит сейсмической безопасности", href: "/audit-seysmicheskoy-bezopasnosti" },
      { label: "Паспортизация сейсмостойкости", href: "/pasportizatsiya-seysmostoykosti" },
      { label: "Паспорт здания с 3D-моделью STP", href: "/passport-3d-stp" },
      { label: "Техническое заключение", href: "/tehnicheskoe-zaklyuchenie-seysmostoykosti" },
      { label: "Обследование после землетрясения", href: "/monitoring-zdaniy-posle-zemletryaseniysa" },
    ],
  },
  {
    slug: "seysmozashchita-i-usilenie",
    title: "Сейсмозащита и усиление конструкций",
    description:
      "Сейсмоусиление зданий и сооружений: углеволокно, сейсмоизоляция фундаментов, демпферы, усиление ж/б и кирпичных конструкций, антисейсмические мероприятия.",
    domain: "seismo",
    services: [
      { label: "Сейсмоусиление зданий", href: "/seysmousilenie-zdaniy" },
      { label: "Усиление углеволокном", href: "/seysmousilenie-konstrukciy-uglevoloknom" },
      { label: "Сейсмоизоляция фундаментов", href: "/seysmoizolyaciya-fundamentov" },
      { label: "Сейсмические демпферы", href: "/dempery-seysmicheskie" },
      { label: "Усиление ж/б конструкций", href: "/usilenie-zhelezobetonnyh-konstrukciy" },
      { label: "Усиление кирпичных зданий", href: "/usilenie-kirpichnyh-zdaniy" },
      { label: "Антисейсмические мероприятия", href: "/antiseysmicheskie-meropriyatiya" },
    ],
  },
  {
    slug: "seysmoizolyatory-i-materialy",
    title: "Сейсмоизоляторы и материалы",
    description:
      "Сейсмоизоляторы и элементы сейсмозащиты: резинометаллические (LRB/HDRB), маятниковые (FPS), BRB-элементы, сейсмостойкие кабели и лотки, анкеры. Поставка и подбор.",
    domain: "seismo",
    services: [
      { label: "Сейсмоизоляторы купить", href: "/seysmoizolyatory-kupit" },
      { label: "Резинометаллические (LRB/HDRB)", href: "/rezinometallicheskie-seysmoizolyatory" },
      { label: "Маятниковые (FPS)", href: "/mayatnikovye-seysmoizolyatory" },
      { label: "BRB-элементы", href: "/brb-elementy-seysmicheskie" },
      { label: "Сейсмостойкие кабели и лотки", href: "/seysmostoykie-kabeli-i-loty" },
      { label: "Сейсмические анкеры", href: "/ankery-seysmicheskie" },
    ],
  },
];

/** Найти группу по слагу. */
export function findServiceGroup(slug: string): ServiceGroup | undefined {
  return serviceGroups.find((g) => g.slug === slug);
}
