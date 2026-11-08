/**
 * Страница «Глоссарий терминов по сейсмологии и сейсмике».
 *
 * 77 терминов в 8 категориях: основные понятия, очаг и геометрия,
 * сейсмические волны, магнитуда и интенсивность, сейсмостойкость,
 * оборудование и методы, типы землетрясений, риски и последствия.
 *
 * Нормативные документы (ГОСТ, СП, СНиП, НП) вынесены на отдельную
 * страницу /normdocs.
 *
 * Определения — рерайт из нескольких источников (Википедия, ГОСТы,
 * USGS, EMSC, MSK-64). Источник: src/content/seo/glossary.ts
 */
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { SeismoIcon } from "@/components/site/domain-icons";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { GlossaryClient } from "./glossary-client";
import { glossaryTerms } from "@/content/seo/glossary";

export const metadata = {
  title: "Глоссарий терминов по сейсмологии и сейсмике — СРОСС®",
  description:
    "Глоссарий 77 терминов по сейсмологии, сейсмике, сейсмостойкости: землетрясение, эпицентр, гипоцентр, магнитуда, MSK-64, P-волны, S-волны, акселерограмма, спектр ответа. Нормативные документы — на отдельной странице /normdocs.",
  keywords:
    "глоссарий сейсмология, термины сейсмика, определения, землетрясение, эпицентр, гипоцентр, магнитуда, MSK-64, сейсмические волны, P-волны, S-волны, сейсмостойкость, шкала Рихтера, PGA, акселерограмма, спектр ответа",
  alternates: { canonical: "/glossary" },
};

// JSON-LD: DefinedTermSet — микроразметка словаря для Google
const glossaryLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Глоссарий терминов по сейсмологии и сейсмике",
  description:
    "77 терминов по сейсмологии, сейсмике, сейсмостойкости с развёрнутыми определениями.",
  url: "https://seismos.ru/glossary",
  hasDefinedTerm: glossaryTerms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition.replace(/<[^>]+>/g, " ").trim(),
  })),
};

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryLd) }}
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
          <Link href="/spravochniki" className="hover:text-[#00549F]">Справочники</Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">Глоссарий</span>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#22C55E]" />
            <span className="eyebrow text-[#2D5F3F]">Справочник</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 flex items-start gap-3">
            <SeismoIcon className="h-9 w-9 text-[#00549F] flex-none mt-1" />
            <span>Глоссарий терминов по сейсмологии и сейсмике</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            77 развёрнутых определений в 8 категориях: от сейсмических волн
            и шкалы MSK-64 до сейсмостойкости и рисков. Определения составлены
            на основе нескольких источников — Википедии, нормативных
            документов, материалов USGS и EMSC. Нормативные документы
            (ГОСТ 30546, СП 14.13330, НП-031-01) вынесены на отдельную{" "}
            <Link href="/normdocs" className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2">страницу нормативных документов</Link>.
            Используйте поиск или фильтр по категориям.
          </p>
        </div>

        {/* Клиентская часть: поиск + фильтр + список */}
        <GlossaryClient />

        {/* SEO-блок снизу */}
        <div className="mt-12 prose prose-slate max-w-none text-[#4A6378]">
          <h2 className="text-[20px] font-bold text-[#003366] mb-3">
            Зачем нужен глоссарий сейсмологических терминов
          </h2>
          <p className="leading-relaxed mb-3">
            Сейсмология и сейсмостойкое строительство — насыщенная
            терминологией область. Инженеры, проектировщики, строители,
            заказчики и юристы сталкиваются с десятками терминов:
            <strong> магнитуда</strong> и <strong>интенсивность</strong>,
            <strong> P-волны</strong> и <strong>S-волны</strong>,
            <strong> очаг</strong> и <strong>эпицентр</strong>,
            <strong> сейсмостойкость</strong> и <strong>сейсмоизоляция</strong>,
            <strong> акселерограмма</strong> и <strong>спектр ответа</strong>,
            <strong> MSK-64</strong> и <strong>PGA</strong>. Этот глоссарий
            объединяет термины в одном месте — с развёрнутыми определениями
            и примерами. Сами нормативные документы (ГОСТ, СП, СНиП, НП)
            собраны на{" "}
            <Link href="/normdocs" className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2">отдельной странице</Link>.
          </p>
          <p className="leading-relaxed">
            Глоссарий полезен при подготовке тендерной документации,
            экспертизе проектов сейсмозащиты, обучении проектировщиков,
            журналистских материалах о землетрясениях. Если вы не нашли
            нужный термин — напишите нам, дополним.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
