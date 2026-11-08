/**
 * Страница «Глоссарий по взрывным воздействиям и ударным волнам».
 * 45 терминов в 9 категориях.
 */
import Link from "next/link";
import { ArrowLeft, BookOpen, Zap } from "lucide-react";
import { BlastIcon } from "@/components/site/domain-icons";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { GlossaryBlastClient } from "./glossary-blast-client";
import { blastTerms } from "@/content/seo/glossary-blast";

export const metadata = {
  title: "Глоссарий по взрывным воздействиям и ударным волнам — СРОСС®",
  description:
    "Глоссарий 45 терминов по взрывным воздействиям, ударным волнам, взрывозащите: взрыв, ударная волна, детонация, дефлаграция, BLEVE, VCE, тротиловый эквивалент, избыточное давление, импульс, P-I диаграмма, скол спины. Определения с примерами.",
  keywords:
    "глоссарий взрыв, термины ударная волна, взрывостойкость, детонация, дефлаграция, BLEVE, VCE, тротиловый эквивалент, избыточное давление, импульс взрыва, P-I диаграмма, скол спины, кумулятивная струя, ГОСТ Р 22.0.07, EN 1991-1-7, UFC 3-340-02",
  alternates: { canonical: "/glossary-blast" },
};

const glossaryBlastLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Глоссарий по взрывным воздействиям и ударным волнам",
  description:
    "45 терминов по взрывным воздействиям, ударным волнам и взрывозащите с развёрнутыми определениями.",
  url: "https://seismos.ru/glossary-blast",
  hasDefinedTerm: blastTerms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition.replace(/<[^>]+>/g, " ").trim(),
  })),
};

export default function GlossaryBlastPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryBlastLd) }}
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
          <span className="text-[#003366]">Глоссарий взрывов</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#C8102E]" />
            <span className="eyebrow text-[#C8102E]">Справочник</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 flex items-start gap-3">
            <BlastIcon className="h-9 w-9 text-[#C8102E] flex-none mt-1" />
            <span>Глоссарий по взрывным воздействиям и ударным волнам</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            45 развёрнутых определений в 9 категориях: основные понятия,
            параметры ударной волны, типы взрывов, воздействие на конструкции,
            защитные сооружения, источники взрывов, расчёт и моделирование,
            воздействие на человека, дополнительные термины. Область,
            родственная сейсмике — ударные и взрывные нагрузки как динамические
            воздействия на конструкции. Сопутствующий справочник —{" "}
            <Link
              href="/normdocs-blast"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              нормативные документы по взрывам
            </Link>
            . Термины по вибрации — в{" "}
            <Link
              href="/glossary-vibro"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              глоссарии вибрации
            </Link>
            , по сейсмологии — в основном{" "}
            <Link
              href="/glossary"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              глоссарии
            </Link>
            .
          </p>
        </div>

        <GlossaryBlastClient />

        <div className="mt-12 prose prose-slate max-w-none text-[#4A6378]">
          <h2 className="text-[20px] font-bold text-[#003366] mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#C8102E]" />
            Зачем нужен глоссарий по взрывным воздействиям
          </h2>
          <p className="leading-relaxed mb-3">
            Взрывные и сейсмические воздействия — родственные области
            динамического нагружения конструкций. Землетрясения создают
            низкочастотные колебания грунта (0,1–30 Гц); взрывы — ударные волны
            с длительностью фазы сжатия от миллисекунд до десятков миллисекунд.
            Для инженера-сейсмостроителя понимание взрывных нагрузок необходимо
            при проектировании зданий в зонах промышленных аварий, защитных
            сооружений ГО, военных объектов, критической инфраструктуры.
          </p>
          <p className="leading-relaxed mb-3">
            Глоссарий объединяет термины по физике взрыва (<strong>детонация</strong>,{" "}
            <strong>дефлаграция</strong>, <strong>BLEVE</strong>, <strong>VCE</strong>,{" "}
            <strong>кумулятивная струя</strong>), параметрам ударной волны
            (<strong>избыточное давление</strong>, <strong>импульс</strong>,{" "}
            <strong>фронт</strong>, <strong>отражённая волна</strong>), типам
            нагружения (<strong>квазистатическое</strong>, <strong>импульсное</strong>,{" "}
            <strong>динамическое</strong>), защитным сооружениям
            (<strong>противовзрывное укрытие</strong>, <strong>взрывной клапан</strong>,{" "}
            <strong>барьер</strong>, <strong>взрывозащитное остекление</strong>),
            расчёту (<strong>P-I диаграмма</strong>, <strong>формулы Садовского</strong>,{" "}
            <strong>соотношения Ренкина–Гюгонио</strong>, <strong>МКЭ</strong>,{" "}
            <strong>CFD</strong>) и воздействию на человека (<strong>баротравма</strong>,{" "}
            <strong>зона поражения</strong>, <strong>безопасное расстояние</strong>).
          </p>
          <p className="leading-relaxed">
            Нормативные документы (ГОСТ Р 22.0.07, ГОСТ 12.1.010, СП 12.13130,
            EN 1991-1-7, UFC 3-340-02, NFPA 68) собраны на{" "}
            <Link
              href="/normdocs-blast"
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
