"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { EqGlobe } from "@/components/globe/eq-globe";

/**
 * HeroGlobeFlow — обёртка для hero-секции с настоящим обтеканием текста
 * вокруг круглого 3D-глобуса.
 *
 * Десктоп (lg+): глобус floated справа, текст огибает его как круг через
 *   CSS `float: right` + `shape-outside: circle(48%)`. Получается
 *   magazine-style layout: заголовок и первые абзацы идут слева от глобуса,
 *   остальное — под ним на всю ширину.
 *
 * Мобильный (<lg): обычный одноколоночный поток — сначала текст, потом
 *   глобус отдельным блоком снизу.
 *
 * SSR: по умолчанию рендерим десктоп-вариант (большинство посетителей).
 * На клиенте после mount проверяем matchMedia и при необходимости
 * переключаемся на мобильный. suppressHydrationWarning на корневых
 * элементах гасит warning о mismatch.
 */
export function HeroGlobeFlow({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // SSR и первый рендер до mount: рисуем десктоп (без suppressHydrationWarning
  // на Canvas-обёртке — иначе React ругается на различия структуры).
  const desktop = isDesktop !== false;

  const globe = (
    <EqGlobe
      variant="minimal"
      initialLon={37.6} /* Москва — при старте повёрнут к России */
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

  if (desktop) {
    // Десктоп: глобус floated справа, текст обтекает круглую форму.
    // shape-outside: circle(48%) — текст огибает круг диаметром ~96%
    // от bounding box. shape-margin — отступ текста от круга.
    return (
      <div className="relative" suppressHydrationWarning>
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

  // Мобильный: текст сначала, потом глобус отдельным блоком снизу
  return (
    <div className="relative" suppressHydrationWarning>
      {children}
      <div className="mt-8 mb-4">
        {globe}
        <div className="mt-2 text-center">{moreLink}</div>
      </div>
    </div>
  );
}
