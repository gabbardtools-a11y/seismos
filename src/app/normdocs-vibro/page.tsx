/**
 * Страница «Нормативные документы по вибрации».
 *
 * 11 документов в 4 категориях: ГОСТ, СП, ISO, СанПиН.
 *
 * Источник: src/content/seo/normdocs-vibro.ts
 */
import Link from "next/link";
import { ArrowLeft, FileText, BookOpen } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { NormDocsVibroClient } from "./normdocs-vibro-client";
import { vibroDocs } from "@/content/seo/normdocs-vibro";

export const metadata = {
  title: "Нормативные документы по вибрации — ГОСТ, СП, ISO, СанПиН — СРОСС®",
  description:
    "Нормативные документы по вибрации и вибростойкости: ГОСТ 12.1.012, ГОСТ 30631, ГОСТ 17516.1, ГОСТ ИСО 10816, ГОСТ ИСО 1940, ГОСТ 31319, ГОСТ 31191, ГОСТ Р 52806, СП 22.13330, ISO 4866, СанПиН 1.2.3685.",
  keywords:
    "нормативные документы вибрация, ГОСТ 12.1.012, ГОСТ 30631, ГОСТ 17516, ГОСТ ИСО 10816, ГОСТ 31319, ГОСТ 31191, ГОСТ Р 52806, СП 22.13330, ISO 4866, СанПиН вибрация, вибрационная безопасность",
  alternates: { canonical: "/normdocs-vibro" },
};

// JSON-LD: ItemList
const normDocsVibroLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Нормативные документы по вибрации",
  description:
    "11 нормативных документов (ГОСТ, СП, ISO, СанПиН) по вибрации, вибростойкости и вибрационной безопасности.",
  url: "https://seismos.ru/normdocs-vibro",
  numberOfItems: vibroDocs.length,
  itemListElement: vibroDocs.map((d, i) => ({
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
    { "@type": "ListItem", position: 2, name: "Нормативы по вибро", item: "https://seismos.ru/normdocs-vibro" },
  ],
};

export default function NormDocsVibroPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(normDocsVibroLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold flex-wrap">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <Link href="/normdocs" className="hover:text-[#00549F]">Нормативы по сейсмике</Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">Нормативы по вибро</span>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#B45309]" />
            <span className="eyebrow text-[#B45309]">Справочник</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 flex items-start gap-3">
            <FileText className="h-9 w-9 text-[#B45309] flex-none mt-1" />
            <span>Нормативные документы по вибрации</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            11 ключевых нормативных документов в 4 категориях: ГОСТ, СП, ISO и
            СанПиН. Каждый документ — с полным наименованием, годом
            актуализации, статусом, областью применения и взаимосвязями.
            Терминология по вибрации собрана отдельно в{" "}
            <Link
              href="/glossary-vibro"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              глоссарии по вибро
            </Link>
            . Нормативы по сейсмостойкости — на странице{" "}
            <Link
              href="/normdocs"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              нормативные документы по сейсмике
            </Link>
            .
          </p>
        </div>

        <NormDocsVibroClient />

        {/* SEO-блок снизу */}
        <div className="mt-12 prose prose-slate max-w-none text-[#4A6378]">
          <h2 className="text-[20px] font-bold text-[#003366] mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#B45309]" />
            Зачем нужен отдельный справочник нормативных документов по вибрации
          </h2>
          <p className="leading-relaxed mb-3">
            Вибрационная безопасность — самостоятельная область нормирования,
            тесно связанная с сейсмостойкостью. <strong>ГОСТ 12.1.012</strong> —
            основной документ по вибрационной безопасности труда (ПДУ общей и
            локальной вибрации на рабочих местах). <strong>ГОСТ 30631</strong> и{" "}
            <strong>ГОСТ 17516.1</strong> задают требования к вибростойкости
            оборудования и применяются совместно с ГОСТ 30546 при сертификации
            сейсмостойкости.
          </p>
          <p className="leading-relaxed mb-3">
            Для контроля состояния машин применяется <strong>ГОСТ ИСО 10816</strong>{" "}
            (СКЗ виброскорости в зонах A/B/C/D), для балансировки роторов —{" "}
            <strong>ГОСТ ИСО 1940</strong> (классы точности G 0,4 – G 4000).
            Воздействие вибрации на человека в зданиях регулируют{" "}
            <strong>ГОСТ 31319</strong>, <strong>ГОСТ 31191</strong>,{" "}
            <strong>ГОСТ Р 52806</strong> и <strong>ISO 4866</strong> (вибрация
            строительных конструкций).
          </p>
          <p className="leading-relaxed">
            Сейсмические нормы (<strong>СП 14.13330.2018</strong>,{" "}
            <strong>НП-031-01</strong>) собраны на странице{" "}
            <Link
              href="/normdocs"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              нормативные документы по сейсмике
            </Link>
            . Если вы не нашли нужный документ — напишите нам, дополним.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
