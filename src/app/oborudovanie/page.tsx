/**
 * Страница «Оборудование» — каталог оборудования для сейсмических
 * испытаний, измерений и расчётов.
 *
 * 5 категорий, 35 единиц оборудования:
 * 1. Динамические испытания — вибростенды, ударные стенды
 * 2. Стенды и модели — сейсмические платформы, стенды для изоляторов
 * 3. Статические испытания — прессы, домкраты, тензометрия
 * 4. Средства измерений — сейсмометры, акселерометры, НК
 * 5. Программное обеспечение — SCAD, Lira, ANSYS, Abaqus
 *
 * Источник контента: src/content/equipment/catalog.ts
 */
import Link from "next/link";
import { ArrowLeft, Cpu } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { EquipmentCatalog } from "./equipment-catalog";

export const metadata = {
  title: "Оборудование для сейсмических испытаний и измерений — СРОСС®",
  description:
    "Каталог оборудования для сейсмических испытаний: вибростенды, сейсмические платформы, прессы, сейсмометры, акселерометры, ПО для расчёта сейсмостойкости (SCAD, Lira, ANSYS). 35 единиц в 5 категориях.",
  keywords:
    "оборудование сейсмических испытаний, вибростенд, сейсмическая платформа, сейсмометр, акселерометр, пресс гидравлический, SCAD, Lira, ANSYS, Abaqus, испытания на сейсмостойкость, средства измерений, динамические испытания, статические испытания",
  alternates: { canonical: "/oborudovanie" },
};

export default function OborudovaniePage() {
  return (
    <main className="min-h-screen bg-white">
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
          <span className="text-[#003366]">Оборудование</span>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#22C55E]" />
            <span className="eyebrow text-[#2D5F3F]">Каталог</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 flex items-start gap-3">
            <Cpu className="h-9 w-9 text-[#00549F] flex-none mt-1" />
            <span>Оборудование для сейсмических испытаний и измерений</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Каталог из 35 единиц оборудования в 5 категориях: вибростенды
            для динамических испытаний по ГОСТ 30546.2, сейсмические
            платформы, прессы для статических испытаний, средства измерений
            (сейсмометры, акселерометры, неразрушающий контроль) и
            программное обеспечение для расчёта сейсмостойкости (SCAD,
            Lira-САПР, ANSYS, Abaqus). С реальными характеристиками и
            производителями.
          </p>
        </div>

        {/* Каталог */}
        <EquipmentCatalog />

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-[#003366] to-[#00549F] rounded-2xl p-8 text-white">
          <h2 className="text-[22px] font-bold mb-3">
            Нужна помощь с подбором оборудования?
          </h2>
          <p className="text-white/85 mb-6 leading-relaxed">
            Подскажем по характеристикам, поможем выбрать вибростенд или
            сейсмометр под ваши задачи, свяжем с производителями.
            Бесплатная консультация.
          </p>
          <Link
            href="#contacts"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-white text-[#003366] px-6 text-[13px] tracking-[0.14em] uppercase font-semibold hover:bg-white/90 transition-colors"
          >
            Получить консультацию
          </Link>
        </div>

        {/* SEO-блок */}
        <div className="mt-10 prose prose-slate max-w-none text-[#4A6378]">
          <h2 className="text-[20px] font-bold text-[#003366] mb-3">
            Какое оборудование нужно для сейсмических испытаний
          </h2>
          <p className="leading-relaxed mb-3">
            Сейсмические испытания оборудования и конструкций требуют
            специализированного оборудования, которое можно разделить на
            пять основных категорий. <strong>Динамические испытания</strong>
            проводятся на электродинамических или гидравлических
            вибростендах, воспроизводящих синусоидальную, случайную и
            ударную нагрузку по ГОСТ 30546.2-98. <strong>Стенды и
            модели</strong> — это сейсмические платформы (shaking tables)
            для испытания масштабных моделей зданий и сооружений, а также
            стенды для испытания сейсмоизоляторов и демпферов.
          </p>
          <p className="leading-relaxed mb-3">
            <strong>Статические испытания</strong> включают гидравлические
            прессы (от 100 кН до 50 МН), универсальные испытательные машины
            и системы нагружения для определения прочности и
            деформативности конструкций. <strong>Средства измерений</strong>
            — это сейсмометры, акселерометры, тензодатчики и приборы
            неразрушающего контроля (ультразвук, молоток Шмидта, акустическая
            эмиссия). <strong>Программное обеспечение</strong> объединяет
            расчётные комплексы (SCAD, Lira-САПР, ANSYS, Abaqus) и системы
            обработки экспериментальных данных.
          </p>
          <p className="leading-relaxed">
            Подбор оборудования зависит от типа испытываемого объекта,
            требуемых нагрузок (кН, g), частотного диапазона и нормативной
            базы (ГОСТ 30546, НП-031-01, СП 14.13330). Мы поможем определить
            оптимальную конфигурацию под ваши задачи.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
