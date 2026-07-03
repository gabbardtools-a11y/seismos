"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";

/**
 * Lazy-loaded обёртка для секции карты.
 *
 * Проблема: react-simple-maps + d3-scale + 847 КБ GeoJSON
 * при первой загрузке страницы вызывают memory spike и
 * нестабильность dev-сервера.
 *
 * Решение: компонент SeismicMapSection грузится динамически
 * только когда пользователь доскроллит до секции (через
 * IntersectionObserver). До этого момента показывается
 * лёгкий skeleton-заглушка.
 */

const SeismicMapSection = dynamic(
  () =>
    import("@/components/site/seismic-map-section").then(
      (mod) => mod.SeismicMapSection
    ),
  {
    suspense: false,
    ssr: false, // не рендерить на сервере — только в браузере
  }
);

export function LazySeismicMapSection() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // IntersectionObserver — ждём пока секция не появится в зоне видимости
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        // Загружать заранее — за 200px до появления
        rootMargin: "200px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} id="map" className="min-h-[600px]">
      {shouldLoad ? (
        <div
          onLoad={() => setIsLoaded(true)}
          onMount={() => setIsLoaded(true)}
        >
          <SeismicMapSection />
        </div>
      ) : (
        <MapSkeleton />
      )}
    </div>
  );
}

/**
 * Лёгкая skeleton-заглушка карты — показывается до загрузки.
 * Сохраняет visual layout, чтобы не было скачка страницы.
 */
function MapSkeleton() {
  return (
    <section className="section-pad bg-[#FAF7F2] border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">03 · Карта сейсмической опасности</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            Карта сейсмической опасности{" "}
            <span className="text-[#00549F]">регионов России</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Загрузка интерактивной карты…
          </p>
        </div>

        {/* Skeleton-плейсхолдер для карты */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white border border-[#D6DCE3] aspect-[5/4] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-[#4A6378]">
              <div className="w-10 h-10 border-2 border-[#00549F]/30 border-t-[#00549F] rounded-full animate-spin" />
              <div className="text-[11px] tracking-[0.16em] uppercase font-semibold">
                Загрузка геоданных…
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 bg-white border border-[#D6DCE3] p-6 min-h-[300px]">
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-[#E7EEF6] rounded w-3/4" />
              <div className="h-4 bg-[#E7EEF6] rounded w-1/2" />
              <div className="h-20 bg-[#E7EEF6] rounded mt-6" />
              <div className="h-4 bg-[#E7EEF6] rounded w-2/3 mt-6" />
              <div className="h-4 bg-[#E7EEF6] rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
