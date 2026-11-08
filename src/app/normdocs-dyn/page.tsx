/** Страница «Нормативные документы по динамике и прочности». 12 документов в 8 категориях. */
import Link from "next/link";
import { ArrowLeft, FileText, BookOpen } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { NormDocsDynClient } from "./normdocs-dyn-client";
import { dynDocs } from "@/content/seo/normdocs-dyn";

export const metadata = {
  title: "Нормативные документы по динамике и прочности — ГОСТ, ПНАЭ, РД, EN — СРОСС®",
  description:
    "Нормативные документы по динамике, прочности, усталости и устойчивости: ГОСТ 14249, ГОСТ 25859, ГОСТ 30780, ГОСТ 32307, ПНАЭ Г-7-002, РД 10-400, ПБ 03-576, ГОСТ Р 52857, ГОСТ 25.504, ГОСТ 25.506, ISO 2394, EN 1990.",
  keywords:
    "нормативные документы прочность, ГОСТ 14249, ГОСТ 25859, ГОСТ 30780, ПНАЭ Г-7-002, РД 10-400, ПБ 03-576, ГОСТ Р 52857, ГОСТ 25.504, ГОСТ 25.506, ISO 2394, EN 1990, сосуды давления, усталость, трещиностойкость, АЭС",
  alternates: { canonical: "/normdocs-dyn" },
};

const normDocsDynLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Нормативные документы по динамике и прочности",
  description:
    "12 нормативных документов (ГОСТ, ПНАЭ, РД, ПБ, ISO, EN) по динамике, прочности, усталости и устойчивости конструкций.",
  url: "https://seismos.ru/normdocs-dyn",
  numberOfItems: dynDocs.length,
  itemListElement: dynDocs.map((d, i) => ({
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

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://seismos.ru/" },
    { "@type": "ListItem", position: 2, name: "Нормативы по динамике", item: "https://seismos.ru/normdocs-dyn" },
  ],
};

export default function NormDocsDynPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(normDocsDynLd) }}
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
          <Link href="/spravochniki" className="hover:text-[#00549F]">Справочники</Link>
          <span className="text-[#D6DCE3]">·</span>
          <Link href="/normdocs" className="hover:text-[#00549F]">Нормативы по сейсмике</Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">Нормативы по динамике</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#4A6378]" />
            <span className="eyebrow text-[#4A6378]">Справочник</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 flex items-start gap-3">
            <FileText className="h-9 w-9 text-[#4A6378] flex-none mt-1" />
            <span>Нормативные документы по динамике и прочности</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            12 ключевых нормативных документов в 8 категориях: ГОСТ, СП, ПНАЭ
            (нормы АЭС), РД (Ростехнадзор), ПБ (правила безопасности), ISO и
            EN (Еврокод). Каждый документ — с полным наименованием, годом
            актуализации, статусом, областью применения и взаимосвязями.
            Терминология собрана отдельно в{" "}
            <Link
              href="/glossary-dyn"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              глоссарии по динамике и прочности
            </Link>
            . Нормативы по смежным областям —{" "}
            <Link href="/normdocs" className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2">сейсмика</Link>
            ,{" "}
            <Link href="/normdocs-vibro" className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2">вибро</Link>
            ,{" "}
            <Link href="/normdocs-blast" className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2">взрывы</Link>
            .
          </p>
        </div>

        <NormDocsDynClient />

        <div className="mt-12 prose prose-slate max-w-none text-[#4A6378]">
          <h2 className="text-[20px] font-bold text-[#003366] mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#4A6378]" />
            Зачем нужен отдельный справочник нормативных документов по динамике и прочности
          </h2>
          <p className="leading-relaxed mb-3">
            Динамика и прочность — это базовые инженерные дисциплины, на которые
            опираются расчёты сейсмостойких, взрывостойких и вибростойких
            конструкций. <strong>ГОСТ 14249</strong> и <strong>ГОСТ Р 52857</strong> — основа
            расчётов сосудов давления; <strong>ГОСТ 25859</strong> — малоцикловая усталость;
            <strong> ГОСТ 30780</strong> — вибропрочность сосудов. Для оборудования АЭС —
            более жёсткие <strong>ПНАЭ Г-7-002</strong> и <strong>РД 10-400-01</strong>{" "}
            (сейсмостойкость АЭС).
          </p>
          <p className="leading-relaxed mb-3">
            Трещиностойкость и усталость нормируются <strong>ГОСТ 25.504</strong> и{" "}
            <strong>ГОСТ 25.506</strong>. Международные основы проектирования —{" "}
            <strong>ISO 2394</strong> (надёжность конструкций) и <strong>EN 1990</strong>{" "}
            (Еврокод 0). Правила безопасной эксплуатации сосудов под давлением —{" "}
            <strong>ПБ 03-576-03</strong> Ростехнадзора. Применение этих стандартов
            обязательно для опасных производственных объектов (ФЗ-116), сосудов
            под давлением (ТР ТС 032/2013), кранов (ТР ТС 010/2011).
          </p>
          <p className="leading-relaxed">
            Сейсмические нормы (<strong>СП 14.13330</strong>, <strong>НП-031-01</strong>)
            — на странице{" "}
            <Link
              href="/normdocs"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              нормативные документы по сейсмике
            </Link>
            , по вибрации —{" "}
            <Link
              href="/normdocs-vibro"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              здесь
            </Link>
            , по взрывам —{" "}
            <Link
              href="/normdocs-blast"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              здесь
            </Link>
            . Если вы не нашли нужный документ — напишите нам, дополним.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
