/**
 * Страница «Нормативные документы по взрывным воздействиям».
 * 12 документов в 7 категориях: ГОСТ, СП, ФЗ, РБ, EN, UFC, NFPA.
 */
import Link from "next/link";
import { ArrowLeft, FileText, BookOpen } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { NormDocsBlastClient } from "./normdocs-blast-client";
import { blastDocs } from "@/content/seo/normdocs-blast";

export const metadata = {
  title: "Нормативные документы по взрывным воздействиям — ГОСТ, СП, EN, UFC — СРОСС®",
  description:
    "Нормативные документы по взрывным воздействиям, ударным волнам и взрывозащите: ГОСТ Р 22.0.07, ГОСТ Р 22.0.08, ГОСТ 12.1.010, ГОСТ 31610, СП 12.13130, ФЗ-116, РБ 03-69, EN 1991-1-7, UFC 3-340-02, NFPA 68.",
  keywords:
    "нормативные документы взрыв, ГОСТ Р 22.0.07, ГОСТ 12.1.010, ГОСТ 31610, СП 12.13130, ФЗ-116, РБ 03-69, EN 1991-1-7, UFC 3-340-02, NFPA 68, взрывобезопасность, взрывостойкость",
  alternates: { canonical: "/normdocs-blast" },
};

const normDocsBlastLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Нормативные документы по взрывным воздействиям",
  description:
    "12 нормативных документов (ГОСТ, СП, ФЗ, РБ, EN, UFC, NFPA) по взрывным воздействиям, взрывозащите и взрывостойкости.",
  url: "https://seismos.ru/normdocs-blast",
  numberOfItems: blastDocs.length,
  itemListElement: blastDocs.map((d, i) => ({
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
    { "@type": "ListItem", position: 2, name: "Нормативы по взрывам", item: "https://seismos.ru/normdocs-blast" },
  ],
};

export default function NormDocsBlastPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(normDocsBlastLd) }}
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
          <span className="text-[#003366]">Нормативы по взрывам</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#C8102E]" />
            <span className="eyebrow text-[#C8102E]">Справочник</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 flex items-start gap-3">
            <FileText className="h-9 w-9 text-[#C8102E] flex-none mt-1" />
            <span>Нормативные документы по взрывным воздействиям</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            12 ключевых нормативных документов в 7 категориях: ГОСТ, СП, ФЗ,
            РБ (Ростехнадзор), EN (Еврокод), UFC (США), NFPA. Каждый документ —
            с полным наименованием, годом актуализации, статусом, областью
            применения и взаимосвязями. Терминология по взрывам собрана отдельно
            в{" "}
            <Link
              href="/glossary-blast"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              глоссарии по взрывам
            </Link>
            . Нормативы по сейсмике —{" "}
            <Link
              href="/normdocs"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              здесь
            </Link>
            , по вибрации —{" "}
            <Link
              href="/normdocs-vibro"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              здесь
            </Link>
            .
          </p>
        </div>

        <NormDocsBlastClient />

        <div className="mt-12 prose prose-slate max-w-none text-[#4A6378]">
          <h2 className="text-[20px] font-bold text-[#003366] mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#C8102E]" />
            Зачем нужен отдельный справочник нормативных документов по взрывам
          </h2>
          <p className="leading-relaxed mb-3">
            Взрывные воздействия — самостоятельная область нормирования,
            тесно связанная с сейсмостойкостью (ударные нагрузки на здания,
            защитные сооружения, критическая инфраструктура). В России основа
            нормативной базы — <strong>ГОСТ Р 22.0.07</strong> (поражающие
            факторы) и <strong>ГОСТ 12.1.010</strong> (взрывобезопасность труда).
            Для категорирования помещений — <strong>СП 12.13130</strong>, для
            опасных производственных объектов — <strong>ФЗ-116</strong> и{" "}
            <strong>РБ 03-69</strong> (анализ риска).
          </p>
          <p className="leading-relaxed mb-3">
            Международные стандарты: <strong>EN 1991-1-7</strong> (Eurocode 1,
            аварийные нагрузки), <strong>UFC 3-340-02</strong> (защитные
            сооружения США, заменил TM 5-1300), <strong>NFPA 68</strong>{" "}
            (дефлаграционный сброс). Для оборудования взрывоопасных зон —{" "}
            <strong>ГОСТ 31610 (IEC 60079)</strong> с Ex-маркировкой. Для
            пылевых взрывов — <strong>ГОСТ Р EN 14491</strong> и NFPA 68
            (сброс давления по индексу K_st).
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
            , по вибрации —{" "}
            <Link
              href="/normdocs-vibro"
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
