"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "О системе", href: "#about" },
  { label: "Направления", href: "#directions" },
  { label: "Партнёры", href: "#partners" },
  { label: "Патенты", href: "#patents" },
  { label: "Автор", href: "#author" },
  { label: "Публикации", href: "#publications" },
  { label: "Контакты", href: "#contacts" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-[#D6DCE3]">
      {/* Тонкая верхняя полоса с международной привязкой */}
      <div className="bg-[#003366] text-white text-[11px] tracking-[0.18em] uppercase">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <span className="hidden sm:inline font-medium opacity-80">
            Международный проект по устойчивому развитию · UN-Habitat aligned
          </span>
          <span className="sm:hidden font-medium opacity-80">
            UN-Habitat · УР ООН
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://seismo.pro"
              className="hover:underline opacity-80 hover:opacity-100 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              ЕАСА →
            </a>
            <span className="opacity-30">|</span>
            <button
              className="flex items-center gap-1 opacity-80 hover:opacity-100 transition"
              aria-label="Сменить язык"
            >
              <Globe className="h-3 w-3" />
              RU
            </button>
          </div>
        </div>
      </div>

      {/* Основная шапка: эмблема + навигация */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Лого-блок */}
          <Link href="#hero" className="flex items-center gap-4 group">
            <SrossemblemMark className="h-12 w-12 shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-[18px] font-bold tracking-[0.18em] text-[#00549F]">
                СРОСС<sup className="text-[9px] align-super">®</sup>
              </span>
              <span className="text-[11px] font-semibold tracking-[0.16em] text-[#003366] uppercase">
                Сейсмобезопасность России
              </span>
              <span className="text-[10px] tracking-[0.14em] text-[#4A6378] uppercase">
                информационная система · seismo.ru
              </span>
            </div>
          </Link>

          {/* Десктоп-навигация */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-[13px] font-semibold tracking-[0.08em] uppercase text-[#003366] hover:text-[#00549F] hover:bg-[#E7EEF6] transition-colors rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-[#00549F] hover:bg-[#003366] text-white text-[12px] tracking-[0.14em] uppercase font-semibold"
            >
              <Link href="#contacts">Связаться</Link>
            </Button>
          </div>

          {/* Мобильная кнопка */}
          <button
            className="lg:hidden p-2 text-[#003366]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Открыть меню"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[#D6DCE3] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 text-sm font-semibold tracking-[0.08em] uppercase text-[#003366] hover:bg-[#E7EEF6] rounded-sm"
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 bg-[#00549F] hover:bg-[#003366] text-white"
            >
              <Link href="#contacts" onClick={() => setMobileOpen(false)}>
                Связаться
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

/**
 * Inline-SVG эмблема СРОСС® для шапки.
 * v.2.0 — без волн, с пульсирующими концентрическими кольцами.
 */
export function SrossemblemMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Эмблема СРОСС®"
    >
      <circle cx="50" cy="50" r="48" fill="#00549F" />
      <circle cx="50" cy="50" r="36" fill="#FFFFFF" />
      <circle
        cx="50"
        cy="50"
        r="36"
        fill="none"
        stroke="#003366"
        strokeWidth="0.4"
      />

      {/* Пульсирующие кольца (CSS-анимация) */}
      <g fill="none" strokeLinecap="round">
        <circle
          cx="50"
          cy="50"
          r="4"
          stroke="#003366"
          strokeWidth="0.8"
          className="pulse-ring pulse-ring-1"
        />
        <circle
          cx="50"
          cy="50"
          r="4"
          stroke="#00549F"
          strokeWidth="0.6"
          className="pulse-ring pulse-ring-2"
        />
        <circle
          cx="50"
          cy="50"
          r="4"
          stroke="#00549F"
          strokeWidth="0.5"
          className="pulse-ring pulse-ring-3"
        />
        <circle
          cx="50"
          cy="50"
          r="4"
          stroke="#4A6378"
          strokeWidth="0.4"
          className="pulse-ring pulse-ring-4"
        />
        <circle
          cx="50"
          cy="50"
          r="4"
          stroke="#4A6378"
          strokeWidth="0.3"
          className="pulse-ring pulse-ring-5"
        />

        {/* Статичные опорные кольца (видны при отключённой анимации) */}
        <circle cx="50" cy="50" r="7.5" stroke="#00549F" strokeWidth="0.4" opacity="0.25" />
        <circle cx="50" cy="50" r="11" stroke="#00549F" strokeWidth="0.3" opacity="0.18" />
        <circle cx="50" cy="50" r="15" stroke="#00549F" strokeWidth="0.25" opacity="0.13" />
        <circle cx="50" cy="50" r="19" stroke="#00549F" strokeWidth="0.2" opacity="0.08" />
      </g>

      {/* Эпицентр (с пульсацией) */}
      <circle cx="50" cy="50" r="1.2" fill="#C8102E" className="epicenter-pulse" />
      <circle cx="50" cy="50" r="0.5" fill="#FFFFFF" />

      {/* Внешняя кайма */}
      <circle
        cx="50"
        cy="50"
        r="47.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.5"
        opacity="0.5"
      />
    </svg>
  );
}
