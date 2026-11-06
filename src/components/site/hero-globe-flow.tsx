"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Globe2, Map as MapIcon } from "lucide-react";
import { EqGlobe } from "@/components/globe/eq-globe";
import { CapitalsCarousel } from "./capitals-carousel";

/**
 * HeroGlobeFlow — обёртка для hero-секции.
 *
 * Переключение между двумя видами стрелками ← →:
 *   1. «Глобус» — 3D-глобус землетрясений (EqGlobe minimal)
 *   2. «Карта» — SVG-карта ЕАЭС и СНГ + карусель столиц
 *
 * Десктоп (lg+): визуальный элемент floated справа, текст обтекает
 *   через shape-outside: circle(48%).
 * Мобильный (<lg): обычный одноколоночный поток — текст, потом визуал.
 */
export function HeroGlobeFlow({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [view, setView] = useState<"globe" | "map">("globe");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const desktop = isDesktop !== false;

  const globe = (
    <EqGlobe
      variant="minimal"
      initialLon={37.6}
      autoRotateSpeed={0.4}
      heightClass={
        desktop
          ? "absolute inset-0 w-full h-full"
          : "relative h-[300px] w-full"
      }
      className="w-full"
    />
  );

  const moreLink = (
    <Link
      href="/seismo-globus"
      className="text-[11px] tracking-[0.14em] uppercase text-[#00549F] font-semibold hover:text-[#003366] hover:underline"
    >
      подробнее →
    </Link>
  );

  // Стрелки переключения
  const switcher = (
    <div className="absolute -top-10 left-0 right-0 flex items-center justify-between z-10">
      <button
        onClick={() => setView("globe")}
        aria-label="Показать глобус"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors ${
          view === "globe"
            ? "bg-[#00549F] text-white"
            : "bg-white border border-[#00549F]/30 text-[#00549F] hover:border-[#00549F]"
        }`}
      >
        <Globe2 className="h-3.5 w-3.5" />
        Глобус
      </button>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setView(view === "globe" ? "map" : "globe")}
          aria-label={view === "globe" ? "Переключить на карту" : "Переключить на глобус"}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-[#00549F]/30 text-[#00549F] hover:bg-[#00549F] hover:text-white hover:border-[#00549F] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-[10px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          {view === "globe" ? "1 / 2" : "2 / 2"}
        </span>
        <button
          onClick={() => setView(view === "globe" ? "map" : "globe")}
          aria-label={view === "globe" ? "Переключить на карту" : "Переключить на глобус"}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-[#00549F]/30 text-[#00549F] hover:bg-[#00549F] hover:text-white hover:border-[#00549F] transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={() => setView("map")}
        aria-label="Показать карту"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors ${
          view === "map"
            ? "bg-[#00549F] text-white"
            : "bg-white border border-[#00549F]/30 text-[#00549F] hover:border-[#00549F]"
        }`}
      >
        <MapIcon className="h-3.5 w-3.5" />
        Карта
      </button>
    </div>
  );

  if (desktop) {
    // Режим "Глобус": глобус floated справа, текст обтекает круг.
    if (view === "globe") {
      return (
        <div className="relative pt-12" suppressHydrationWarning>
          {switcher}
          <div
            className="float-right relative w-[380px] h-[380px] xl:w-[440px] xl:h-[440px] ml-8 mb-6 [shape-outside:circle(48%)] [shape-margin:1.25rem]"
            suppressHydrationWarning
          >
            {globe}
            <div className="absolute -bottom-7 left-0 right-0 text-center">
              {moreLink}
            </div>
          </div>
          {children}
        </div>
      );
    }

    // Режим "Карта": SVG-карта на всю ширину + карусель столиц под ней,
    // текст ниже. Без float.
    return (
      <div className="relative pt-12" suppressHydrationWarning>
        {switcher}
        <div className="mb-6 bg-white/60 border border-[#D6DCE3] rounded-2xl p-4 sm:p-6">
          <div className="text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
            Карта филиалов
          </div>
          <div className="relative rounded-xl overflow-hidden bg-white border border-[#E7EEF6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/russia-map-vector.svg?v=3"
              alt="Карта России, стран ЕАЭС и СНГ со столицами сейсмически активных зон"
              className="w-full block"
              loading="lazy"
            />
          </div>
          {/* Карусель столиц под картой */}
          <div className="mt-4">
            <CapitalsCarousel />
          </div>
        </div>
        {children}
      </div>
    );
  }

  // Мобильный
  if (view === "globe") {
    return (
      <div className="relative pt-12" suppressHydrationWarning>
        {switcher}
        {children}
        <div className="mt-8 mb-4">
          {globe}
          <div className="mt-2 text-center">{moreLink}</div>
        </div>
      </div>
    );
  }

  // Мобильный, режим "Карта"
  return (
    <div className="relative pt-12" suppressHydrationWarning>
      {switcher}
      {children}
      <div className="mt-8 mb-4 bg-white/60 border border-[#D6DCE3] rounded-2xl p-4">
        <div className="text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold mb-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
          Карта филиалов
        </div>
        <div className="relative rounded-xl overflow-hidden bg-white border border-[#E7EEF6]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/russia-map-vector.svg?v=3"
            alt="Карта России, стран ЕАЭС и СНГ со столицами сейсмически активных зон"
            className="w-full block"
            loading="lazy"
          />
        </div>
        <div className="mt-4">
          <CapitalsCarousel />
        </div>
      </div>
    </div>
  );
}
