"use client";

import { useState, useEffect } from "react";
import { SEISMOGRAM_TILE_PATH, SEISMOGRAM_DUP_PATH } from "./seismogram-path";

/**
 * SeismogramLine — клиентская часть сейсмограммы.
 * Подписывается на регион через localStorage + window event
 * (SeismoSoundToggle меняет регион и триггерит событие).
 *
 * Цвета зависят от региона:
 * - Москва (тихо): тёмно-зелёная линия #2D5F3F, glow #22C55E
 * - Камчатка: жёлтая линия #FFB100, на пиках → красная #FF2D2D, glow #FF6B4A
 * - Сахалин/Кавказ/Байкал/Алтай: оранжевая #FF7A45, glow #FFB100
 */

type RegionKey =
  | "moscow"
  | "kamchatka"
  | "sakhalin"
  | "altai"
  | "caucasus"
  | "baikal";

type Theme = {
  line: string;
  glow: string;
  glowBlur: string;
  strokeWidth: string;
  glowWidth: string;
  glowOpacity: string;
};

const THEMES: Record<RegionKey, Theme> = {
  moscow: {
    line: "#2D5F3F",
    glow: "#22C55E",
    glowBlur: "3px",
    strokeWidth: "1.5",
    glowWidth: "3",
    glowOpacity: "0.35",
  },
  kamchatka: {
    line: "#FFB100",
    glow: "#FF2D2D",
    glowBlur: "3.5px",
    strokeWidth: "1.7",
    glowWidth: "4",
    glowOpacity: "0.5",
  },
  sakhalin: {
    line: "#FF7A45",
    glow: "#FFB100",
    glowBlur: "3px",
    strokeWidth: "1.5",
    glowWidth: "3.5",
    glowOpacity: "0.4",
  },
  altai: {
    line: "#FF9F40",
    glow: "#FFB100",
    glowBlur: "2.5px",
    strokeWidth: "1.4",
    glowWidth: "3",
    glowOpacity: "0.35",
  },
  caucasus: {
    line: "#FF7A45",
    glow: "#FF6B4A",
    glowBlur: "3px",
    strokeWidth: "1.5",
    glowWidth: "3.5",
    glowOpacity: "0.4",
  },
  baikal: {
    line: "#FF9F40",
    glow: "#FFB100",
    glowBlur: "2.5px",
    strokeWidth: "1.4",
    glowWidth: "3",
    glowOpacity: "0.35",
  },
};

export function SeismogramLine() {
  const [region, setRegion] = useState<RegionKey>("moscow");

  useEffect(() => {
    // Чтение из localStorage при монтировании
    try {
      const saved = localStorage.getItem("seismo-region");
      if (saved && saved in THEMES) {
        setRegion(saved as RegionKey);
      }
    } catch {}

    // Подписка на изменения региона от SeismoSoundToggle
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as RegionKey;
      if (detail && detail in THEMES) {
        setRegion(detail);
      }
    };
    window.addEventListener("seismo-region-change", handler);
    return () =>
      window.removeEventListener("seismo-region-change", handler);
  }, []);

  const theme = THEMES[region];

  return (
    <div className="flex-1 h-40 overflow-hidden relative min-w-0">
      {/* Glow-подложка — свечение пиков */}
      <svg
        viewBox="0 0 1600 40"
        className="h-40 absolute seismogram-scroll"
        preserveAspectRatio="none"
        aria-hidden
        style={{ width: "200%" }}
      >
        <path
          d={SEISMOGRAM_TILE_PATH}
          fill="none"
          stroke={theme.glow}
          strokeWidth={theme.glowWidth}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          opacity={theme.glowOpacity}
          style={{ filter: `blur(${theme.glowBlur})` }}
        />
        <path
          d={SEISMOGRAM_DUP_PATH}
          fill="none"
          stroke={theme.glow}
          strokeWidth={theme.glowWidth}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          opacity={theme.glowOpacity}
          style={{ filter: `blur(${theme.glowBlur})` }}
        />
      </svg>
      {/* Основная линия */}
      <svg
        viewBox="0 0 1600 40"
        className="h-40 absolute seismogram-scroll"
        preserveAspectRatio="none"
        aria-hidden
        style={{ width: "200%" }}
      >
        <path
          d={SEISMOGRAM_TILE_PATH}
          fill="none"
          stroke={theme.line}
          strokeWidth={theme.strokeWidth}
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <path
          d={SEISMOGRAM_DUP_PATH}
          fill="none"
          stroke={theme.line}
          strokeWidth={theme.strokeWidth}
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  );
}
