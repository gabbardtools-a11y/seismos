"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, UserCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { LangSwitch } from "./lang-switch";

type NavChild = { label: string; href: string; group?: string };
type NavItem =
  | { label: string; href: string }
  | { label: string; children: NavChild[] };

export function SiteHeader() {
  const { t, lang, switchLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Полный список SEO-страниц этапа 1, сгруппированных по кластерам.
  // Используется в выпадающем меню «Услуги» — группировка по подзаголовкам.
  const SEO_LINKS: NavChild[] = [
    // === Сертификация ===
    { label: "Сертификат сейсмостойкости", href: "/seismo_sertifikat", group: "Сертификация" },
    { label: "Сертификат сейсмоустойчивости", href: "/sertifikat-seysmoustoychivosti", group: "Сертификация" },
    { label: "Сертификат соответствия ГОСТ Р", href: "/sertifikat-sootvetstviya-seysmostoykosti", group: "Сертификация" },
    { label: "Протокол испытаний", href: "/protokol-ispytaniy-na-seysmostoykost", group: "Сертификация" },
    { label: "Заключение о сейсмостойкости", href: "/zaklyuchenie-o-seysmostoykosti", group: "Сертификация" },
    { label: "Сейсмостойкое исполнение", href: "/seysmostoykoe-ispolnenie-oborudovaniya", group: "Сертификация" },
    { label: "Категории I/II по НП-031-01", href: "/kategoriya-seysmostoykosti-i-ii-np-031", group: "Сертификация" },
    // === Испытания и расчёты ===
    { label: "Испытания на вибростенде", href: "/ispytaniya-na-seysmostoykost", group: "Испытания и расчёты" },
    { label: "Сейсмические испытания", href: "/seysmicheskie-ispytaniya", group: "Испытания и расчёты" },
    { label: "Расчёт сейсмостойкости", href: "/raschet-seysmostoykosti", group: "Испытания и расчёты" },
    { label: "Расчёт по акселерограмме", href: "/raschet-po-akselerogramme", group: "Испытания и расчёты" },
    { label: "Спектральный метод", href: "/spektralnyy-raschet-seysmiki", group: "Испытания и расчёты" },
    { label: "Разработка ПМИ", href: "/razrabotka-pmi-seysmostoykosti", group: "Испытания и расчёты" },
    { label: "Виброиспытания оборудования", href: "/vibroispytaniya-oborudovaniya", group: "Испытания и расчёты" },
    // === Обследование ===
    { label: "Обследование зданий", href: "/obsledovanie-zdaniy-na-seysmostoykost", group: "Обследование и изыскания" },
    { label: "Экспертиза сейсмостойкости", href: "/ekspertiza-seysmostoykosti-zdaniya", group: "Обследование и изыскания" },
    { label: "Оценка сейсмического риска", href: "/otsenka-seysmicheskogo-riska", group: "Обследование и изыскания" },
    { label: "Аудит сейсмической безопасности", href: "/audit-seysmicheskoy-bezopasnosti", group: "Обследование и изыскания" },
    { label: "Паспортизация сейсмостойкости", href: "/pasportizatsiya-seysmostoykosti", group: "Обследование и изыскания" },
    { label: "Паспорт здания с 3D-моделью STP", href: "/passport-3d-stp", group: "Обследование и изыскания" },
    { label: "Техническое заключение", href: "/tehnicheskoe-zaklyuchenie-seysmostoykosti", group: "Обследование и изыскания" },
    { label: "Обследование после землетрясения", href: "/monitoring-zdaniy-posle-zemletryaseniysa", group: "Обследование и изыскания" },
    // === Сейсмозащита и усиление ===
    { label: "Сейсмоусиление зданий", href: "/seysmousilenie-zdaniy", group: "Сейсмозащита и усиление" },
    { label: "Усиление углеволокном", href: "/seysmousilenie-konstrukciy-uglevoloknom", group: "Сейсмозащита и усиление" },
    { label: "Сейсмоизоляция фундаментов", href: "/seysmoizolyaciya-fundamentov", group: "Сейсмозащита и усиление" },
    { label: "Сейсмические демпферы", href: "/dempery-seysmicheskie", group: "Сейсмозащита и усиление" },
    { label: "Усиление ж/б конструкций", href: "/usilenie-zhelezobetonnyh-konstrukciy", group: "Сейсмозащита и усиление" },
    { label: "Усиление кирпичных зданий", href: "/usilenie-kirpichnyh-zdaniy", group: "Сейсмозащита и усиление" },
    { label: "Антисейсмические мероприятия", href: "/antiseysmicheskie-meropriyatiya", group: "Сейсмозащита и усиление" },
    // === Сейсмоизоляторы и материалы ===
    { label: "Сейсмоизоляторы купить", href: "/seysmoizolyatory-kupit", group: "Сейсмоизоляторы и материалы" },
    { label: "Резинометаллические (LRB/HDRB)", href: "/rezinometallicheskie-seysmoizolyatory", group: "Сейсмоизоляторы и материалы" },
    { label: "Маятниковые (FPS)", href: "/mayatnikovye-seysmoizolyatory", group: "Сейсмоизоляторы и материалы" },
    { label: "BRB-элементы", href: "/brb-elementy-seysmicheskie", group: "Сейсмоизоляторы и материалы" },
    { label: "Сейсмостойкие кабели и лотки", href: "/seysmostoykie-kabeli-i-loty", group: "Сейсмоизоляторы и материалы" },
    { label: "Сейсмические анкеры", href: "/ankery-seysmicheskie", group: "Сейсмоизоляторы и материалы" },
  ];

  const NAV_ITEMS: NavItem[] = [
    { label: t("nav.system"), href: "#about" },
    { label: t("nav.directions"), href: "#directions" },
    {
      label: "Услуги",
      children: SEO_LINKS,
    },
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
        { label: "Сейсмо Глобус", href: "/seismo-globus" },
        { label: "Сертификаты", href: "/sertifikaty" },
        { label: "Антидроновая защита", href: "/antidron" },
      ],
    },
    { label: t("nav.contacts"), href: "#contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-[#D6DCE3]">
      {/* Тонкая верхняя полоса с международной привязкой */}
      <div className="bg-[#003366] text-white text-[11px] tracking-[0.18em] uppercase">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <span className="hidden sm:inline font-medium opacity-80 flex items-center gap-1.5">
            {/* Эмблема ООН (SVG) */}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 inline-block" aria-label="UN emblem" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              {/* Азия/Африка — упрощённая карта мира в круге */}
              <path d="M7 8 L9 7 L11 8 L10 10 L8 11 L7 10 Z M12 6 L14 7 L13 9 L11 8 Z M9 12 L11 13 L10 15 L8 14 Z M13 11 L15 12 L14 14 L12 13 Z M10 16 L12 17 L11 18 Z" fill="currentColor" opacity="0.7" />
              {/* Меридианы */}
              <ellipse cx="12" cy="12" rx="5" ry="11" stroke="currentColor" strokeWidth="0.4" opacity="0.4" fill="none" />
              <ellipse cx="12" cy="12" rx="11" ry="11" stroke="currentColor" strokeWidth="0.4" opacity="0.3" fill="none" />
              <line x1="1" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
              <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
            </svg>
            {t("top.intl")}
          </span>
          <span className="sm:hidden font-medium opacity-80 flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="h-3 w-3 inline-block" aria-label="UN emblem" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              <ellipse cx="12" cy="12" rx="5" ry="11" stroke="currentColor" strokeWidth="0.4" opacity="0.4" fill="none" />
              <line x1="1" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
            </svg>
            {t("top.intlShort")}
          </span>
          <div className="flex items-center gap-3">
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
                      <div className="absolute left-0 top-full pt-1 min-w-[280px] max-w-[360px]">
                        <div className="bg-white border border-[#D6DCE3] shadow-lg rounded-sm overflow-hidden max-h-[80vh] overflow-y-auto">
                          {item.children.map((child, idx) => {
                            const prevGroup = idx > 0 ? item.children[idx - 1].group : undefined;
                            const showGroup = child.group && child.group !== prevGroup;
                            return (
                              <div key={child.href}>
                                {showGroup && (
                                  <div className="px-4 pt-3 pb-1 text-[10px] font-bold tracking-[0.16em] uppercase text-[#00549F] bg-[#F8FBF9] border-t border-[#E7EEF6] first:border-t-0">
                                    {child.group}
                                  </div>
                                )}
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="block px-4 py-2 text-[12px] font-semibold tracking-[0.06em] uppercase text-[#003366] hover:text-[#00549F] hover:bg-[#E7EEF6] transition-colors"
                                >
                                  {child.label}
                                </Link>
                              </div>
                            );
                          })}
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

          {/* Правый кластер: личный кабинет + бургер (мобайл) */}
          <div className="flex items-center gap-1">
            <Link
              href="/login"
              aria-label="Личный кабинет"
              title="Личный кабинет"
              className="p-2 text-[#003366] hover:text-[#00549F] transition-colors"
            >
              <UserCircle className="h-6 w-6 lg:h-5 lg:w-5" />
            </Link>
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
                      <div className="pl-4 flex flex-col gap-0">
                        {item.children.map((child, idx) => {
                          const prevGroup = idx > 0 ? item.children[idx - 1].group : undefined;
                          const showGroup = child.group && child.group !== prevGroup;
                          return (
                            <div key={child.href}>
                              {showGroup && (
                                <div className="px-3 pt-3 pb-1 text-[10px] font-bold tracking-[0.14em] uppercase text-[#00549F]">
                                  {child.group}
                                </div>
                              )}
                              <Link
                                href={child.href}
                                onClick={() => {
                                  setOpenDropdown(null);
                                  setMobileOpen(false);
                                }}
                                className="block px-3 py-2 text-[12px] font-semibold tracking-[0.06em] uppercase text-[#4A6378] hover:text-[#00549F] hover:bg-[#E7EEF6] rounded-sm"
                              >
                                {child.label}
                              </Link>
                            </div>
                          );
                        })}
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
