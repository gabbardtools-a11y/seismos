"use client";

/**
 * SeismoGlobe — клиентский контейнер под интерактивный 3D-глобус.
 *
 * ВРЕМЕННАЯ ЗАГЛУШКА: пока пользователь не прислал код глобуса, показываем
 * плейсхолдер с подсказкой. Когда код придёт — он вставляется сюда,
 * имя экспорта (SeismoGlobe) и сигнатура сохраняются, чтобы страница
 * /seismo-globus продолжала работать без изменений.
 *
 * Поддерживаемые форматы от пользователя:
 *   1) React-компонент на react-globe.gl / three.js — вставляем напрямую.
 *   2) Vanilla JS на three.js / globe.gl — оборачиваем в useEffect + ref.
 *   3) Чистый SVG / D3-ortho — возвращаем как <svg>...</svg>.
 *   4) <iframe> стороннего встраивания (например, USGS, Earthquake3D).
 */

import { useEffect, useRef, useState } from "react";
import { Globe2, Loader2 } from "lucide-react";

export function SeismoGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // Имитация первой загрузки данных (placeholder).
  // Когда придёт реальный код глобуса — этот блок заменяется на
  // инициализацию three.js / globe.gl и т.п.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#001A33] via-[#002A5C] to-[#003366]"
    >
      {/* Звёздное небо как фон (плейсхолдер) */}
      <Starfield />

      {loading ? (
        <div className="relative z-10 flex flex-col items-center gap-3 text-white/80">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="text-[11px] tracking-[0.18em] uppercase">
            Загрузка глобуса…
          </span>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
          {/* Стилизованный проволочный глобус-заглушка */}
          <WireGlobe />

          <div className="flex items-center gap-2 text-white/90">
            <Globe2 className="h-5 w-5 text-[#5BA8DB]" />
            <span className="text-[15px] font-semibold tracking-[0.04em]">
              Сейсмо Глобус
            </span>
          </div>

          <p className="text-[12px] tracking-[0.12em] uppercase text-white/60 max-w-md">
            Контейнер готов. Ждём код интерактивного глобуса — он будет
            вставлен сюда без изменений страницы.
          </p>

          {/* Пульс в центре — как эпицентр */}
          <span className="absolute bottom-6 right-6 inline-flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-[#C8102E] font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
            Live
          </span>
        </div>
      )}
    </div>
  );
}

/* ---------- Вспомогательные плейсхолдер-компоненты ---------- */

function Starfield() {
  // Простой генеративный звёздный фон — 80 точек со случайными позициями.
  // Стабильный сид, чтобы не дёргалось при ререндерах.
  const stars = Array.from({ length: 80 }, (_, i) => {
    const r = (n: number) => {
      const x = Math.sin(i * 9301 + n * 49297) * 233280;
      return x - Math.floor(x);
    };
    return {
      left: `${r(1) * 100}%`,
      top: `${r(2) * 100}%`,
      size: r(3) > 0.85 ? 2 : 1,
      opacity: 0.3 + r(4) * 0.5,
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}

function WireGlobe() {
  // SVG-заглушка: проволочный глобус с меридианами и параллелями.
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-32 w-32 sm:h-40 sm:w-40 text-[#5BA8DB] animate-[spin_18s_linear_infinite]"
      style={{ filter: "drop-shadow(0 0 12px rgba(91, 168, 219, 0.4))" }}
    >
      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <ellipse cx="100" cy="100" rx="80" ry="20" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <ellipse cx="100" cy="100" rx="80" ry="40" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <ellipse cx="100" cy="100" rx="80" ry="60" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <ellipse cx="100" cy="100" rx="20" ry="80" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <ellipse cx="100" cy="100" rx="40" ry="80" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <ellipse cx="100" cy="100" rx="60" ry="80" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}
