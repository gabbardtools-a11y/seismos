"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { LangSwitch } from "./lang-switch";

type NavItem =
  | { label: string; href: string }
  | { label: string; children: { label: string; href: string }[] };

export function SiteHeader() {
  const { t, lang, switchLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const NAV_ITEMS: NavItem[] = [
    { label: t("nav.system"), href: "#about" },
    { label: t("nav.directions"), href: "#directions" },
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.media"), href: "/news" },
    { label: t("nav.partners"), href: "#partners" },
    {
      label: t("nav.info"),
      children: [
        { label: t("nav.patents"), href: "#patents" },
        { label: t("nav.author"), href: "#author" },
        { label: t("nav.publications"), href: "#publications" },
        { label: "Сейсмозащита", href: "/seismoprotection" },
        { label: "Сейсмоизоляторы", href: "/seismoizolyatory" },
      ],
    },
    { label: t("nav.contacts"), href: "#contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-[#D6DCE3]">
      {/* Тонкая верхняя полоса с международной привязкой */}
      <div className="bg-[#003366] text-white text-[11px] tracking-[0.18em] uppercase">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <span className="hidden sm:inline font-medium opacity-80">
            {t("top.intl")}
          </span>
          <span className="sm:hidden font-medium opacity-80">
            {t("top.intlShort")}
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://seismo.pro"
              className="hover:underline opacity-80 hover:opacity-100 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("top.easa")}
            </a>
            <span className="opacity-30">|</span>
            <LangSwitch lang={lang} switchLang={switchLang} compact />
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
            </div>
          </Link>

          {/* Десктоп-навигация */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              if ("children" in item) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="flex items-center gap-1 px-3 py-2 text-[13px] font-semibold tracking-[0.08em] uppercase text-[#003366] hover:text-[#00549F] hover:bg-[#E7EEF6] transition-colors rounded-sm"
                      aria-expanded={openDropdown === item.label}
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute left-0 top-full pt-1 min-w-[200px]">
                        <div className="bg-white border border-[#D6DCE3] shadow-lg rounded-sm overflow-hidden">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-2.5 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#003366] hover:text-[#00549F] hover:bg-[#E7EEF6] transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-[13px] font-semibold tracking-[0.08em] uppercase text-[#003366] hover:text-[#00549F] hover:bg-[#E7EEF6] transition-colors rounded-sm"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Мобильная кнопка */}
          <button
            className="lg:hidden p-2 text-[#003366]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("nav.openMenu")}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[#D6DCE3] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              if ("children" in item) {
                const expanded = openDropdown === item.label;
                return (
                  <div key={item.label}>
                    <button
                      className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold tracking-[0.08em] uppercase text-[#003366] hover:bg-[#E7EEF6] rounded-sm"
                      aria-expanded={expanded}
                      onClick={() =>
                        setOpenDropdown(expanded ? null : item.label)
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expanded && (
                      <div className="pl-4 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              setOpenDropdown(null);
                              setMobileOpen(false);
                            }}
                            className="px-3 py-2.5 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#4A6378] hover:text-[#00549F] hover:bg-[#E7EEF6] rounded-sm"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 text-sm font-semibold tracking-[0.08em] uppercase text-[#003366] hover:bg-[#E7EEF6] rounded-sm"
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="px-3 py-2">
              <LangSwitch lang={lang} switchLang={switchLang} />
            </div>
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
