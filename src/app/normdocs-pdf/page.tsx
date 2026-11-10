/**
 * Обзорная страница всех нормативных документов с PDF.
 * URL: /normdocs-pdf
 *
 * Показывает карточки документов с возможностью скачать PDF или открыть
 * страницу с текстом и кросс-ссылками.
 */
import Link from "next/link";
import { ArrowLeft, FileText, Download, ChevronRight, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { normDocsFull } from "@/content/seo/normdocs-full";
import { DOMAINS } from "@/components/site/domain-icons";

export const metadata = {
  title: "Нормативные документы — PDF скачать, полный текст — СРОСС®",
  description:
    "Библиотека нормативных документов: ГОСТ, СП, СНиП в PDF с полным текстом. Сейсмостойкость, вибрационная безопасность, сосуды давления, усталость материалов. Скачать PDF или читать онлайн с кросс-ссылками.",
  keywords:
    "ГОСТ PDF скачать, СП PDF, СНиП PDF, нормативные документы, сейсмостойкость, вибрационная безопасность, сосуды давления, усталость, ГОСТ 30546.1, СП 14.13330, ГОСТ 12.1.012, ГОСТ 14249, ГОСТ 25.504",
  alternates: { canonical: "/normdocs-pdf" },
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Нормативные документы СРОСС® — библиотека PDF",
  description: `Библиотека из ${normDocsFull.length} нормативных документов в PDF с полным текстом и кросс-ссылками.`,
  url: "https://seismos.ru/normdocs-pdf",
  numberOfItems: normDocsFull.length,
  itemListElement: normDocsFull.map((d, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: d.code,
      headline: d.title,
      datePublished: `${d.year}`,
      url: `https://seismos.ru/normdocs-pdf/${d.slug}`,
    },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://seismos.ru/" },
    { "@type": "ListItem", position: 2, name: "Справочники", item: "https://seismos.ru/spravochniki" },
    { "@type": "ListItem", position: 3, name: "Библиотека PDF", item: "https://seismos.ru/normdocs-pdf" },
  ],
};

export default function NormDocsPdfPage() {
  // Группировка по доменам
  const byDomain = DOMAINS.map((d) => ({
    domain: d,
    docs: normDocsFull.filter((doc) => doc.domain === d.id),
  })).filter((g) => g.docs.length > 0);

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

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Хлебные крошки */}
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold flex-wrap">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <Link href="/spravochniki" className="hover:text-[#00549F]">Справочники</Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">Библиотека PDF</span>
        </div>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#C8102E]" />
            <span className="eyebrow text-[#C8102E]">Библиотека PDF</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.1] mb-4">
            Нормативные документы — PDF и полный текст
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed mb-6 max-w-3xl">
            Библиотека из {normDocsFull.length} нормативных документов с оригинальными PDF
            и распарсенным текстом. Каждый документ — на отдельной странице с
            оглавлением, кросс-ссылками на упомянутые ГОСТы и значком PDF
            для скачивания.
          </p>

          {/* Сводные метрики */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 py-5 border-y border-[#D6DCE3]">
            <Metric value={String(normDocsFull.length)} label="документов" />
            <Metric value={String(byDomain.length)} label="областей" />
            <Metric value="PDF" label="формат" />
          </div>
        </div>

        {/* Группы документов по областям */}
        <div className="space-y-10">
          {byDomain.map(({ domain, docs }) => {
            const { Icon } = domain;
            return (
              <section key={domain.id}>
                {/* Заголовок области */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex-none flex items-center justify-center w-10 h-10 rounded-lg"
                    style={{ backgroundColor: domain.bgColor }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: domain.color }}
                    />
                  </div>
                  <div>
                    <h2 className="text-[20px] font-bold text-[#003366] leading-tight">
                      {domain.full}
                    </h2>
                    <p className="text-[12px] text-[#4A6378]">
                      {docs.length} {docs.length === 1 ? "документ" : docs.length < 5 ? "документа" : "документов"} с PDF
                    </p>
                  </div>
                </div>

                {/* Карточки документов */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {docs.map((doc) => (
                    <article
                      key={doc.slug}
                      className="group bg-white border border-[#D6DCE3] rounded-xl p-5 hover:border-[#00549F] hover:shadow-md transition-all"
                    >
                      {/* Шапка */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="flex-none flex items-center justify-center w-10 h-10 rounded-lg"
                          style={{ backgroundColor: domain.bgColor }}
                        >
                          <FileText
                            className="h-5 w-5"
                            style={{ color: domain.color }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[16px] font-bold text-[#003366] group-hover:text-[#00549F] transition-colors leading-tight mb-1">
                            {doc.code}
                          </h3>
                          <p className="text-[12px] text-[#4A6378]">
                            {doc.year} г. · {doc.type}
                          </p>
                        </div>
                      </div>

                      {/* Заголовок */}
                      <p className="text-[13px] font-semibold text-[#003366] mb-2 line-clamp-2 leading-snug">
                        {doc.shortTitle}
                      </p>

                      {/* Описание */}
                      <p className="text-[13px] text-[#4A6378] leading-relaxed mb-4 line-clamp-3">
                        {doc.description}
                      </p>

                      {/* Кнопки */}
                      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[#D6DCE3]/60">
                        <Link
                          href={`/normdocs-pdf/${doc.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-[#00549F] hover:bg-[#003366] text-white text-[12px] font-semibold rounded-lg transition-colors"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          Читать
                        </Link>
                        <a
                          href={doc.pdfPath}
                          download
                          className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-[#C8102E] hover:bg-[#7A0A1C] text-white text-[12px] font-semibold rounded-lg transition-colors"
                        >
                          <Download className="h-3.5 w-3.5" />
                          PDF
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA снизу */}
        <div className="mt-12 bg-gradient-to-br from-[#00549F]/5 to-[#003366]/5 border border-[#00549F]/20 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-none flex items-center justify-center w-12 h-12 rounded-xl bg-[#00549F]">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[20px] font-bold text-[#003366] mb-1">
                Полные справочники по 4 областям
              </h2>
              <p className="text-[14px] text-[#4A6378] leading-relaxed">
                Если PDF ещё нет — смотрите краткие карточки 43 документов
                с описаниями, статусами и ключевыми словами в обзорных
                справочниках по сейсмике, вибрации, взрывам и динамике.
              </p>
            </div>
            <Link
              href="/spravochniki"
              className="flex-none inline-flex items-center gap-2 px-5 h-11 bg-[#00549F] hover:bg-[#003366] text-white text-[13px] font-semibold tracking-[0.08em] uppercase rounded-lg transition-colors"
            >
              Все справочники
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
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
