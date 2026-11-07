/**
 * Страница «Нормативные документы по сейсмостойкости».
 *
 * 8 документов в 4 категориях: ГОСТ, СП, СНиП, НП.
 *
 * Источник: src/content/seo/normdocs.ts
 */
import Link from "next/link";
import { ArrowLeft, FileText, BookOpen } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { NormDocsClient } from "./normdocs-client";
import { normDocs } from "@/content/seo/normdocs";

export const metadata = {
  title: "Нормативные документы по сейсмостойкости — ГОСТ, СП, СНиП, НП — СРОСС®",
  description:
    "Нормативные документы по сейсмостойкости: ГОСТ 30546.1-98, ГОСТ 30546.2-98, ГОСТ 30546.3-98, ГОСТ 30631-99, ГОСТ 17516.1-90, НП-031-01, СП 14.13330.2018, СНиП II-7-81*. Область применения, статус, взаимосвязи.",
  keywords:
    "нормативные документы сейсмостойкость, ГОСТ 30546, ГОСТ 30631, ГОСТ 17516, СП 14.13330, СНиП II-7-81, НП-031-01, сейсмические нормы, проектирование в сейсмических районах, испытания на сейсмостойкость",
  alternates: { canonical: "/normdocs" },
};

// JSON-LD: ItemList — микроразметка перечня документов для Google
const normDocsLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Нормативные документы по сейсмостойкости",
  description:
    "8 нормативных документов (ГОСТ, СП, СНиП, НП) по сейсмостойкости зданий, сооружений и оборудования.",
  url: "https://seismos.ru/normdocs",
  numberOfItems: normDocs.length,
  itemListElement: normDocs.map((d, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: d.code,
      headline: d.title,
      datePublished: `${d.year}`,
      about: d.description.replace(/<[^>]+>/g, " ").trim().slice(0, 300),
    },
  })),
};

// JSON-LD: BreadcrumbList
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://seismos.ru/" },
    { "@type": "ListItem", position: 2, name: "Нормативные документы", item: "https://seismos.ru/normdocs" },
  ],
};

export default function NormDocsPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(normDocsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Хлебные крошки */}
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <Link href="/glossary" className="hover:text-[#00549F]">
            Глоссарий
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">Нормативные документы</span>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow text-[#00549F]">Справочник</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 flex items-start gap-3">
            <FileText className="h-9 w-9 text-[#00549F] flex-none mt-1" />
            <span>Нормативные документы по сейсмостойкости</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            8 ключевых нормативных документов в 4 категориях: ГОСТ, СП, СНиП и
            отраслевые правила Ростехнадзора (НП). Каждый документ — с полным
            наименованием, годом актуализации, статусом, областью применения и
            взаимосвязями с другими стандартами. Термины сейсмологии собраны
            отдельно в{" "}
            <Link
              href="/glossary"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              глоссарии
            </Link>
            .
          </p>
        </div>

        {/* Клиентская часть: фильтр + список */}
        <NormDocsClient />

        {/* SEO-блок снизу */}
        <div className="mt-12 prose prose-slate max-w-none text-[#4A6378]">
          <h2 className="text-[20px] font-bold text-[#003366] mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#00549F]" />
            Зачем нужен отдельный справочник нормативных документов
          </h2>
          <p className="leading-relaxed mb-3">
            Сейсмостойкое проектирование и сертификация в России опираются на
            иерархию из четырёх типов документов: <strong>ГОСТ</strong> (на
            изделия и методы), <strong>СП</strong> (строительные правила для
            зданий и сооружений), <strong>СНиП</strong> (исторические нормы,
            применяемые при экспертизе объектов постройки до 2018 года) и{" "}
            <strong>НП</strong> (отраслевые правила Ростехнадзора для
            потенциально опасных объектов — АЭС, ГЭС, химических производств).
          </p>
          <p className="leading-relaxed mb-3">
            Комплекс <strong>ГОСТ 30546.1–3</strong> регламентирует общие
            требования, методы испытаний и методы расчёта сейсмостойкости
            оборудования. <strong>СП 14.13330.2018</strong> — основной документ
            для проектирования зданий и сооружений в сейсмических районах,
            заменивший <strong>СНиП II-7-81*</strong>. Для оборудования АЭС
            применяется <strong>НП-031-01</strong> с двумя категориями
            сейсмостойкости.
          </p>
          <p className="leading-relaxed">
            Этот справочник объединяет ключевые документы в одном месте — с
            указанием статуса (действующий / заменён), года актуализации,
            области применения и взаимосвязей. Если вы не нашли нужный документ —
            напишите нам, дополним.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
