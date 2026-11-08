/**
 * Страница «Глоссарий по динамике и прочности конструкций».
 * 48 терминов в 10 категориях.
 */
import Link from "next/link";
import { ArrowLeft, BookOpen, Activity } from "lucide-react";
import { DynIcon } from "@/components/site/domain-icons";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { GlossaryDynClient } from "./glossary-dyn-client";
import { dynTerms } from "@/content/seo/glossary-dyn";

export const metadata = {
  title: "Глоссарий по динамике и прочности конструкций — СРОСС®",
  description:
    "Глоссарий 48 терминов по динамике и прочности конструкций: прочность, усталость, устойчивость, разрушение, трещиностойкость, МКЭ, CFD, мультифизика, композиционные материалы, пьезоэлектрика, оптимизация, надёжность, термические напряжения, акустика. Определения с примерами.",
  keywords:
    "глоссарий динамика прочность, усталость, предел выносливости, кривая Вёлера, малоцикловая усталость, механика разрушения, K_IC, трещиностойкость, устойчивость, МКЭ, CFD, мультифизика, композиционные материалы, углепластик, пьезоэлектрика, топологическая оптимизация, надёжность, шесть сигм, ползучесть, акустика",
  alternates: { canonical: "/glossary-dyn" },
};

const glossaryDynLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Глоссарий по динамике и прочности конструкций",
  description:
    "48 терминов по динамике, прочности, усталости, разрушению, численным методам и мультифизике конструкций.",
  url: "https://seismos.ru/glossary-dyn",
  hasDefinedTerm: dynTerms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition.replace(/<[^>]+>/g, " ").trim(),
  })),
};

export default function GlossaryDynPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryDynLd) }}
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
          <Link href="/glossary" className="hover:text-[#00549F]">Глоссарий сейсмологии</Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">Динамика и прочность</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#4A6378]" />
            <span className="eyebrow text-[#4A6378]">Справочник</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 flex items-start gap-3">
            <DynIcon className="h-9 w-9 text-[#4A6378] flex-none mt-1" />
            <span>Глоссарий по динамике и прочности конструкций</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            48 развёрнутых определений в 10 категориях: прочность и напряжения,
            усталость и циклические нагрузки, устойчивость, разрушение и
            трещиностойкость, динамика и колебания, численные методы и CFD,
            композиционные материалы и пьезоэлектрика, оптимизация и надёжность,
            тепломеханика, акустика и шум. Область родственная сейсмике —
            динамические и статические нагрузки на конструкции. Сопутствующий
            справочник —{" "}
            <Link
              href="/normdocs-dyn"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              нормативные документы по динамике и прочности
            </Link>
            . Сейсмология, вибрация и взрывы — в{" "}
            <Link
              href="/glossary"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              основном
            </Link>
            ,{" "}
            <Link
              href="/glossary-vibro"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              вибро
            </Link>{" "}
            и{" "}
            <Link
              href="/glossary-blast"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              взрыв
            </Link>{" "}
            глоссариях.
          </p>
        </div>

        <GlossaryDynClient />

        <div className="mt-12 prose prose-slate max-w-none text-[#4A6378]">
          <h2 className="text-[20px] font-bold text-[#003366] mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#4A6378]" />
            Зачем нужен глоссарий по динамике и прочности
          </h2>
          <p className="leading-relaxed mb-3">
            Динамика и прочность — это базовые инженерные дисциплины,
            на которые опирается расчёт сейсмостойких, взрывостойких и
            вибростойких конструкций. Сейсмическое нагружение — частный
            случай динамической нагрузки; усталость — основа ресурса
            оборудования; механика разрушения — критический инструмент для
            оценки безопасности АЭС и критической инфраструктуры.
          </p>
          <p className="leading-relaxed mb-3">
            Глоссарий объединяет термины по прочности (<strong>допускаемое напряжение</strong>,{" "}
            <strong>запас прочности</strong>, <strong>эквивалентное напряжение</strong>,{" "}
            <strong>концентрация напряжений</strong>), усталости (<strong>предел выносливости</strong>,{" "}
            <strong>кривая Вёлера</strong>, <strong>малоцикловая усталость</strong>,{" "}
            <strong>правило Майнера</strong>), устойчивости (<strong>гибкость</strong>,{" "}
            <strong>критическое напряжение</strong>, <strong>потеря устойчивости оболочки</strong>),
            разрушению (<strong>K_IC</strong>, <strong>хрупкое/вязкое разрушение</strong>,{" "}
            <strong>трещиностойкость</strong>, <strong>ударная вязкость</strong>),
            численным методам (<strong>МКЭ</strong>, <strong>CFD</strong>,{" "}
            <strong>мультифизика</strong>, <strong>явная/неявная схемы</strong>),
            композитам и пьезоэлектрике (<strong>углепластик</strong>,{" "}
            <strong>слоистый композит</strong>, <strong>пьезоэффект</strong>,{" "}
            <strong>SHM-сенсоры</strong>), оптимизации (<strong>топологическая</strong>,{" "}
            <strong>параметрическая</strong>, <strong>надёжность</strong>,{" "}
            <strong>шесть сигм</strong>), тепломеханике (<strong>термонапряжения</strong>,{" "}
            <strong>ползучесть</strong>, <strong>релаксация</strong>, <strong>КРН</strong>) и
            акустике (<strong>виброакустика</strong>, <strong>кавитация</strong>,{" "}
            <strong>шум машиностроения</strong>).
          </p>
          <p className="leading-relaxed">
            Нормативные документы (ГОСТ 14249, ГОСТ 25859, ГОСТ 30780,
            ПНАЭ Г-7-002, РД 10-400, ISO 2394, EN 1990) собраны на{" "}
            <Link
              href="/normdocs-dyn"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              отдельной странице
            </Link>
            . Если вы не нашли нужный термин — напишите нам, дополним.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
