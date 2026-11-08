/**
 * Страница «Глоссарий терминов по вибрации, вибростойкости и виброизоляции».
 *
 * 45 терминов в 9 категориях.
 *
 * Источник: src/content/seo/glossary-vibro.ts
 */
import Link from "next/link";
import { ArrowLeft, BookOpen, Activity } from "lucide-react";
import { VibroIcon } from "@/components/site/domain-icons";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { GlossaryVibroClient } from "./glossary-vibro-client";
import { vibroTerms } from "@/content/seo/glossary-vibro";

export const metadata = {
  title: "Глоссарий терминов по вибрации и вибростойкости — СРОСС®",
  description:
    "Глоссарий 70 терминов по вибрации, вибростойкости, виброизоляции, вибродиагностике машин: вибрация, резонанс, демпфирование, FFT, акселерометр, вибростенд, ударный спектр, ГОСТ 12.1.012, ISO 10816. Определения с примерами.",
  keywords:
    "глоссарий вибрация, термины вибростойкость, виброизоляция, резонанс, демпфирование, FFT, акселерометр, вибростенд, ударный спектр, спектральная плотность PSD, ГОСТ 12.1.012, ISO 10816, вибродиагностика, вибромониторинг, подшипники качения, BPFO, BPFI, oil whirl, орбита ротора, кепстр, синхронное усреднение, метод огибающей, метод ударных импульсов, дисбаланс, расцентровка, помпаж",
  alternates: { canonical: "/glossary-vibro" },
};

// JSON-LD: DefinedTermSet
const glossaryVibroLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Глоссарий терминов по вибрации и вибростойкости",
  description:
    "70 терминов по вибрации, вибростойкости, виброизоляции, вибродиагностике машин с развёрнутыми определениями.",
  url: "https://seismos.ru/glossary-vibro",
  hasDefinedTerm: vibroTerms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition.replace(/<[^>]+>/g, " ").trim(),
  })),
};

export default function GlossaryVibroPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryVibroLd) }}
      />
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Хлебные крошки */}
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
          <span className="text-[#003366]">Глоссарий вибрации</span>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#B45309]" />
            <span className="eyebrow text-[#B45309]">Справочник</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 flex items-start gap-3">
            <VibroIcon className="h-9 w-9 text-[#B45309] flex-none mt-1" />
            <span>Глоссарий терминов по вибрации и вибростойкости</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            70 развёрнутых определений в 10 категориях: основные понятия,
            кинематические параметры, динамика и резонанс, спектр и анализ,
            источники вибрации, виброизоляция, испытания, воздействие на
            человека и здания, дополнительные термины, вибродиагностика машин
            (по мотивам vibration.ru — Балтех/ИНКОТЕС). Область, близкая к
            сейсмовоздействиям — вибрация рассматривается как широкополосное
            динамическое воздействие. Сопутствующий справочник —{" "}
            <Link
              href="/normdocs-vibro"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              нормативные документы по вибро
            </Link>
            . Термины по сейсмологии — в основном{" "}
            <Link
              href="/glossary"
              className="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/30 underline-offset-2"
            >
              глоссарии
            </Link>
            .
          </p>
        </div>

        {/* Клиентская часть: поиск + фильтр + список */}
        <GlossaryVibroClient />

        {/* SEO-блок снизу */}
        <div className="mt-12 prose prose-slate max-w-none text-[#4A6378]">
          <h2 className="text-[20px] font-bold text-[#003366] mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#B45309]" />
            Зачем нужен глоссарий по вибрации
          </h2>
          <p className="leading-relaxed mb-3">
            Вибрация и сейсмовоздействия — родственные области динамического
            нагружения конструкций. Землетрясения создают низкочастотную
            случайную вибрацию в полосе 0,1–30 Гц; транспортная и промышленная
            вибрация действуют в полосе 1–250 Гц; оборудование и машины — от
            долей герца до 10 кГц. Понимание терминологии вибрации необходимо
            инженеру-сейсмостроителю для согласования требований по
            сейсмостойкости и вибрационной безопасности зданий.
          </p>
          <p className="leading-relaxed mb-3">
            Глоссарий объединяет термины по кинематике (<strong>виброперемещение</strong>,{" "}
            <strong>виброскорость</strong>, <strong>виброускорение</strong>),
            динамике (<strong>резонанс</strong>, <strong>собственная частота</strong>,{" "}
            <strong>демпфирование</strong>), спектральному анализу (<strong>FFT</strong>,{" "}
            <strong>PSD</strong>, <strong>октавный фильтр</strong>), источникам
            (транспортная, промышленная, технологическая вибрация, удар),
            виброизоляции (резиновые, пружинные, пневматические виброизоляторы,
            динамические гасители), испытаниям (вибростенд, акселерометр,
            ударный спектр) и воздействию на человека и здания.
          </p>
          <p className="leading-relaxed">
            Нормативные документы (ГОСТ 12.1.012, ГОСТ 30631, ГОСТ 17516.1,
            ГОСТ ИСО 10816, ГОСТ 31319, ГОСТ Р 52806) собраны на{" "}
            <Link
              href="/normdocs-vibro"
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
