/**
 * Страница «Справочники» — единая точка входа во все 4 раздела:
 * сейсмо, вибро, взрывы, динамика и прочность.
 *
 * URL: /spravochniki
 */
import Link from "next/link";
import { ArrowLeft, BookOpen, FileText, ArrowRight, Search } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { DOMAINS } from "@/components/site/domain-icons";

export const metadata = {
  title: "Справочники СРОСС® — глоссарии и нормативные документы по 4 областям",
  description:
    "Единая точка входа в справочники СРОСС®: сейсмология (77 терминов), вибрация (45), взрывные воздействия (45), динамика и прочность (48). Нормативные документы: ГОСТ, СП, ПНАЭ, EN, UFC, NFPA. 215 терминов и 43 нормативных документа в 4 областях.",
  keywords:
    "справочники СРОСС, глоссарий сейсмология, глоссарий вибрация, глоссарий взрывы, динамика и прочность, нормативные документы ГОСТ, СП, ПНАЭ, EN, UFC, NFPA, сейсмостойкость, вибростойкость, взрывостойкость, прочность конструкций",
  alternates: { canonical: "/spravochniki" },
};

// JSON-LD: ItemList + BreadcrumbList
const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Справочники СРОСС®",
  description:
    "4 справочника по динамическим воздействиям на конструкции: сейсмология, вибрация, взрывы, динамика и прочность.",
  url: "https://seismos.ru/spravochniki",
  numberOfItems: DOMAINS.length,
  itemListElement: DOMAINS.map((d, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Thing",
      name: d.full,
      url: `https://seismos.ru${d.glossaryHref}`,
    },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://seismos.ru/" },
    { "@type": "ListItem", position: 2, name: "Справочники", item: "https://seismos.ru/spravochniki" },
  ],
};

// Суммарные показатели
const TOTAL_TERMS = DOMAINS.reduce((s, d) => s + d.glossaryCount, 0);
const TOTAL_DOCS = DOMAINS.reduce((s, d) => s + d.normdocsCount, 0);
const TOTAL_CATEGORIES = DOMAINS.reduce((s, d) => s + d.glossaryCategories, 0);

export default function SpravochnikiPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Хлебные крошки */}
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">Справочники</span>
        </div>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow text-[#00549F]">Справочный центр</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.1] mb-4">
            Справочники СРОСС®
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed mb-6 max-w-3xl">
            Единая точка входа в справочники по динамическим воздействиям на
            конструкции. Четыре связанные области — от сейсмических и
            вибрационных нагрузок до взрывных воздействий и общей динамики
            конструкций. Каждый раздел содержит развёрнутый глоссарий терминов
            и каталог нормативных документов.
          </p>

          {/* Сводные метрики */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 py-5 border-y border-[#D6DCE3] mb-2">
            <Metric value={`${TOTAL_TERMS}`} label="терминов в глоссариях" />
            <Metric value={`${TOTAL_DOCS}`} label="нормативных документов" />
            <Metric value={`${TOTAL_CATEGORIES}`} label="категорий терминов" />
          </div>
        </div>

        {/* 4 области */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {DOMAINS.map((domain) => {
            const { Icon } = domain;
            return (
              <article
                key={domain.id}
                className="bg-white border border-[#D6DCE3] rounded-2xl p-6 hover:border-[#00549F] hover:shadow-md transition-all flex flex-col"
              >
                {/* Шапка карточки: иконка + название */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="flex-none flex items-center justify-center w-14 h-14 rounded-xl"
                    style={{ backgroundColor: domain.bgColor }}
                  >
                    <Icon
                      className="h-9 w-9"
                      // @ts-expect-error — style с custom property
                      style={{ color: domain.color }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[20px] font-bold text-[#003366] leading-tight mb-1">
                      {domain.name}
                    </h2>
                    <p className="text-[13px] text-[#4A6378] leading-snug">
                      {domain.full}
                    </p>
                  </div>
                </div>

                {/* Описание */}
                <p className="text-[14px] text-[#4A6378] leading-relaxed mb-4">
                  {domain.description}
                </p>

                {/* Ключевые слова */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {domain.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium"
                      style={{
                        backgroundColor: domain.bgColor,
                        color: domain.color,
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Ссылки на 2 раздела */}
                <div className="mt-auto grid grid-cols-2 gap-2">
                  <Link
                    href={domain.glossaryHref}
                    className="group flex flex-col items-start gap-1 p-3 bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl hover:border-[#00549F] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen
                        className="h-4 w-4 flex-none"
                        style={{ color: domain.color }}
                      />
                      <span className="text-[13px] font-bold text-[#003366]">
                        Глоссарий
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="text-[20px] font-bold leading-none"
                        style={{ color: domain.color }}
                      >
                        {domain.glossaryCount}
                      </span>
                      <span className="text-[11px] text-[#4A6378]">
                        терминов · {domain.glossaryCategories} кат.
                      </span>
                    </div>
                  </Link>
                  <Link
                    href={domain.normdocsHref}
                    className="group flex flex-col items-start gap-1 p-3 bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl hover:border-[#00549F] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText
                        className="h-4 w-4 flex-none"
                        style={{ color: domain.color }}
                      />
                      <span className="text-[13px] font-bold text-[#003366]">
                        Нормативы
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="text-[20px] font-bold leading-none"
                        style={{ color: domain.color }}
                      >
                        {domain.normdocsCount}
                      </span>
                      <span className="text-[11px] text-[#4A6378]">
                        докум. · {domain.normdocsCategories.length} типов
                      </span>
                    </div>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA: поиск по всем справочникам */}
        <div className="bg-gradient-to-br from-[#00549F]/5 to-[#003366]/5 border border-[#00549F]/20 rounded-2xl p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-none flex items-center justify-center w-12 h-12 rounded-xl bg-[#00549F]">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[20px] font-bold text-[#003366] mb-1">
                Поиск по всем справочникам
              </h2>
              <p className="text-[14px] text-[#4A6378] leading-relaxed">
                Найдите термин или нормативный документ одновременно во всех
                четырёх разделах — сейсмология, вибрация, взрывы, динамика —
                плюс каталог оборудования и SEO-страницы.
              </p>
            </div>
            <Link
              href="/search"
              className="flex-none inline-flex items-center gap-2 px-5 h-11 bg-[#00549F] hover:bg-[#003366] text-white text-[13px] font-semibold tracking-[0.08em] uppercase rounded-lg transition-colors"
            >
              Открыть поиск
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* SEO-блок снизу */}
        <div className="prose prose-slate max-w-none text-[#4A6378]">
          <h2 className="text-[20px] font-bold text-[#003366] mb-3">
            Зачем нужны справочники по 4 областям
          </h2>
          <p className="leading-relaxed mb-3">
            Сейсмические, вибрационные, взрывные и общие динамические нагрузки —
            это родственные области инженерных расчётов, в которых применяются
            схожие методы: модальный анализ, спектральные методы, прямое
            динамическое интегрирование, расчёт на усталость и трещиностойкость.
            Здание в сейсмическом районе одновременно проектируется на
            ветровые нагрузки (динамика), транспортную вибрацию (вибро) и
            потенциальные промышленные взрывы (взрыв). Знание терминологии и
            нормативов всех 4 областей необходимо инженеру-расчётчику.
          </p>
          <p className="leading-relaxed mb-3">
            <strong>Сейсмо</strong> — основная область СРОСС®: землетрясения,
            сейсмостойкость, сейсмоизоляция, ГОСТ 30546, СП 14.13330, НП-031-01.
            <strong> Вибро</strong> — родственная область: вибрация оборудования
            и зданий, виброизоляция, ГОСТ 12.1.012, ISO 10816. <strong>Взрыв</strong> —
            аварийные и враждебные воздействия: ударные волны, BLEVE, VCE,
            EN 1991-1-7, UFC 3-340-02. <strong>Динамика и прочность</strong> —
            базовые инженерные дисциплины: усталость, устойчивость,
            трещиностойкость, МКЭ, CFD, ПНАЭ Г-7-002.
          </p>
          <p className="leading-relaxed">
            Все справочники связаны перекрёстными ссылками и интегрированы в{" "}
            <Link
              href="/search"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              общий поиск
            </Link>{" "}
            по сайту. Если вы не нашли нужный термин или документ — напишите
            нам, дополним.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
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
