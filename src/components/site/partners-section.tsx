import Link from "next/link";
import { ExternalLink, Users, Building, Globe2, ArrowRight } from "lucide-react";
import { getLang } from "@/lib/i18n/server";
import { t } from "@/lib/i18n/translations";

/**
 * ПАРТНЁРЫ — экосистема ЕАСА и связанных организаций.
 * Названия брендов статичны, полные имена/описания/бейджи — из словаря.
 */
function buildPartners(lang: 'ru' | 'en' | 'zh') {
  return [
    {
      name: "ЕАСА",
      full: t("part.1full", lang),
      desc: t("part.1desc", lang),
      url: "https://seismo.pro",
      badge: t("part.1badge", lang),
    },
    {
      name: "ГРАДОРЕСУРС®",
      full: t("part.2full", lang),
      desc: t("part.2desc", lang),
      badge: t("part.2badge", lang),
    },
    {
      name: "100+",
      full: t("part.3full", lang),
      desc: t("part.3desc", lang),
      badge: t("part.3badge", lang),
    },
    {
      name: "ИНТЕРКОНСТРОЙ",
      full: t("part.4full", lang),
      desc: t("part.4desc", lang),
      badge: t("part.4badge", lang),
    },
    {
      name: "РНКСС",
      full: t("part.5full", lang),
      desc: t("part.5desc", lang),
      badge: t("part.5badge", lang),
    },
    {
      name: "GEOTEX",
      full: t("part.6full", lang),
      desc: t("part.6desc", lang),
      badge: t("part.6badge", lang),
    },
    {
      name: "GRADINFO",
      full: t("part.7full", lang),
      desc: t("part.7desc", lang),
      badge: t("part.7badge", lang),
    },
    {
      name: "RISK",
      full: t("part.8full", lang),
      desc: t("part.8desc", lang),
      badge: t("part.8badge", lang),
    },
  ];
}

function buildRegions(lang: 'ru' | 'en' | 'zh') {
  return [
    t("part.r1", lang), t("part.r2", lang), t("part.r3", lang),
    t("part.r4", lang), t("part.r5", lang), t("part.r6", lang),
    t("part.r7", lang), t("part.r8", lang), t("part.r9", lang),
  ];
}

export async function PartnersSection() {
  const lang = await getLang();
  const PARTNERS = buildPartners(lang);
  const REGIONS = buildRegions(lang);

  return (
    <section id="partners" className="section-pad bg-white border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">{t("part.eyebrow", lang)}</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            {t("part.h2", lang)}
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            {t("part.lead", lang)}
          </p>
        </div>

        {/* Сетка партнёров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D6DCE3] border border-[#D6DCE3] mb-16">
          {PARTNERS.map((p, i) => (
            <PartnerCard key={i} {...p} lang={lang} />
          ))}
        </div>

        {/* Региональные представительства */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Globe2 className="h-5 w-5 text-[#00549F]" />
              <span className="eyebrow">{t("part.regionsEyebrow", lang)}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#003366] mb-3 tracking-tight">
              {t("part.regionsH3", lang)}
            </h3>
            <p className="text-sm text-[#4A6378] leading-relaxed mb-6">
              {t("part.regionsLead", lang)}
            </p>
            <Link
              href="https://seismo.pro"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00549F] hover:text-[#003366] transition"
            >
              {t("part.regionsLink", lang)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {REGIONS.map((r, i) => (
                <div
                  key={i}
                  className="px-4 py-3 bg-[#F2F4F7] border-l-2 border-[#00549F] text-sm font-medium text-[#003366]"
                >
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Блок «Присоединиться» */}
        <div className="mt-16 p-8 lg:p-12 bg-gradient-to-br from-[#00549F] to-[#003366] text-white">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-6 w-6 text-white/80" />
                <span className="eyebrow text-white/80">{t("part.joinEyebrow", lang)}</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3 tracking-tight">
                {t("part.joinH", lang)}
              </h3>
              <p className="text-base text-white/85 leading-relaxed max-w-2xl">
                {t("part.joinLead", lang)}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="mailto:office@seismo.pro?subject=Запрос%20на%20участие%20в%20СРОСС"
                className="inline-flex items-center justify-center bg-white text-[#003366] px-6 py-3 text-[13px] tracking-[0.14em] uppercase font-bold hover:bg-[#E7EEF6] transition"
              >
                {t("part.joinCta1", lang)}
              </a>
              <a
                href="https://seismo.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/40 text-white px-6 py-3 text-[13px] tracking-[0.14em] uppercase font-bold hover:bg-white/10 transition"
              >
                {t("part.joinCta2", lang)}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerCard({
  name,
  full,
  desc,
  url,
  badge,
  lang,
}: {
  name: string;
  full: string;
  desc: string;
  url?: string;
  badge: string;
  lang: 'ru' | 'en' | 'zh';
}) {
  const Wrapper = url ? "a" : "div";
  const wrapperProps = url
    ? { href: url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group block bg-white p-6 hover:bg-[#E7EEF6] transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <Building className="h-6 w-6 text-[#00549F]" />
        <span className="text-[10px] tracking-[0.14em] uppercase text-[#4A6378]/60 font-mono">
          {badge}
        </span>
      </div>
      <div className="text-lg font-bold text-[#003366] mb-1 tracking-tight">
        {name}
      </div>
      <div className="text-[11px] tracking-[0.08em] uppercase text-[#00549F] font-semibold mb-3">
        {full}
      </div>
      <p className="text-xs text-[#4A6378] leading-relaxed">{desc}</p>
      {url && (
        <div className="mt-4 flex items-center gap-1 text-[11px] tracking-[0.12em] uppercase font-bold text-[#00549F] opacity-0 group-hover:opacity-100 transition">
          {t("part.open", lang)}
          <ExternalLink className="h-3 w-3" />
        </div>
      )}
    </Wrapper>
  );
}
