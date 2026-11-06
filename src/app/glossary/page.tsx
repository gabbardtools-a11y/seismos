/**
 * Страница «Глоссарий терминов по сейсмологии и сейсмике».
 *
 * 52 термина в 9 категориях: основные понятия, очаг и геометрия,
 * сейсмические волны, магнитуда и интенсивность, сейсмостойкость,
 * оборудование и методы, нормативные документы, типы землетрясений,
 * риски и последствия.
 *
 * Определения — рерайт из нескольких источников (Википедия, ГОСТы,
 * USGS, EMSC, MSK-64). Источник: src/content/seo/glossary.ts
 */
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { GlossaryClient } from "./glossary-client";
import { glossaryTerms } from "@/content/seo/glossary";

export const metadata = {
  title: "Глоссарий терминов по сейсмологии и сейсмике — СРОСС®",
  description:
    "Глоссарий 52 терминов по сейсмологии, сейсмике, сейсмостойкости: землетрясение, эпицентр, гипоцентр, магнитуда, MSK-64, P-волны, S-волны, ГОСТ 30546, СП 14.13330, НП-031-01. Определения с примерами.",
  keywords:
    "глоссарий сейсмология, термины сейсмика, определения, землетрясение, эпицентр, гипоцентр, магнитуда, MSK-64, сейсмические волны, P-волны, S-волны, сейсмостойкость, ГОСТ 30546, СП 14.13330, НП-031-01, шкала Рихтера, PGA, акселерограмма, спектр ответа",
  alternates: { canonical: "/glossary" },
};

// JSON-LD: DefinedTermSet — микроразметка словаря для Google
const glossaryLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Глоссарий терминов по сейсмологии и сейсмике",
  description:
    "52 термина по сейсмологии, сейсмике, сейсмостойкости с развёрнутыми определениями.",
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
          <span className="text-[#003366]">Глоссарий</span>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#22C55E]" />
            <span className="eyebrow text-[#2D5F3F]">Справочник</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 flex items-start gap-3">
            <BookOpen className="h-9 w-9 text-[#00549F] flex-none mt-1" />
            <span>Глоссарий терминов по сейсмологии и сейсмике</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            52 развёрнутых определения в 9 категориях: от сейсмических волн
            и шкалы MSK-64 до ГОСТов и НП-031-01. Определения составлены
            на основе нескольких источников — Википедии, нормативных
            документов (ГОСТ 30546, СП 14.13330, НП-031-01), материалов
            USGS и EMSC. Используйте поиск или фильтр по категориям.
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
            <strong> ГОСТ 30546</strong> и <strong>СП 14.13330</strong>,
            <strong> MSK-64</strong> и <strong>НП-031-01</strong>. Этот
            глоссарий объединяет их в одном месте — с развёрнутыми
            определениями, примерами и ссылками на нормативные документы.
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
