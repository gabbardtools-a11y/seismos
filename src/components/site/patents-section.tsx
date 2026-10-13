import { Award, FileText, ExternalLink, Shield, Quote } from "lucide-react";
import { getLang } from "@/lib/i18n/server";
import { t } from "@/lib/i18n/translations";

function buildPatents(lang: 'ru' | 'en' | 'zh') {
  return [
    { id: "RU101514U1", title: t("pat.k1t", lang), date: "2011", category: t("pat.k1c", lang), description: t("pat.k1d", lang) },
    { id: "RU101725U1", title: t("pat.k2t", lang), date: "2011", category: t("pat.k2c", lang), description: t("pat.k2d", lang) },
    { id: "RU101053U1", title: t("pat.k3t", lang), date: "2011", category: t("pat.k3c", lang), description: t("pat.k3d", lang) },
    { id: "RU100925U1", title: t("pat.k4t", lang), date: "2011", category: t("pat.k4c", lang), description: t("pat.k4d", lang) },
    { id: "RU101673U1", title: t("pat.k5t", lang), date: "2011", category: t("pat.k5c", lang), description: t("pat.k5d", lang) },
    { id: "RU98810U1", title: t("pat.k6t", lang), date: "2010", category: t("pat.k6c", lang), description: t("pat.k6d", lang) },
    { id: "RU90811U1", title: t("pat.k7t", lang), date: "2010", category: t("pat.k7c", lang), description: t("pat.k7d", lang) },
    { id: "RU177937U1", title: t("pat.k8t", lang), date: "2018", category: t("pat.k8c", lang), description: t("pat.k8d", lang) },
  ];
}

export async function PatentsSection() {
  const lang = await getLang();
  const KEY_PATENTS = buildPatents(lang);

  return (
    <section id="patents" className="section-pad bg-white border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">{t("pat.eyebrow", lang)}</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            {t("pat.h2Pre", lang)}{" "}
            <span className="text-[#00549F]">СРОСС®</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            {t("pat.lead", lang)}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#D6DCE3] border border-[#D6DCE3] mb-16">
          <div className="p-6 bg-white text-[#003366]">
            <FileText className="h-6 w-6 mb-3 text-[#00549F]" />
            <div className="text-[28px] font-bold leading-none mb-2">71</div>
            <div className="text-[10px] tracking-[0.12em] uppercase text-[#4A6378]">{t("pat.st1", lang)}</div>
          </div>
          <div className="p-6 bg-[#003366] text-white">
            <Shield className="h-6 w-6 mb-3 text-white/70" />
            <div className="text-[28px] font-bold leading-none mb-2">8</div>
            <div className="text-[10px] tracking-[0.12em] uppercase text-white/70">{t("pat.st2", lang)}</div>
          </div>
          <div className="p-6 bg-white text-[#003366]">
            <Award className="h-6 w-6 mb-3 text-[#00549F]" />
            <div className="text-[28px] font-bold leading-none mb-2">1973—2018</div>
            <div className="text-[10px] tracking-[0.12em] uppercase text-[#4A6378]">{t("pat.st3", lang)}</div>
          </div>
          <div className="p-6 bg-white text-[#003366]">
            <FileText className="h-6 w-6 mb-3 text-[#00549F]" />
            <div className="text-[28px] font-bold leading-none mb-2">6</div>
            <div className="text-[10px] tracking-[0.12em] uppercase text-[#4A6378]">{t("pat.st4", lang)}</div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-bold text-[#003366] mb-6 tracking-tight">
            {t("pat.keyH", lang)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {KEY_PATENTS.map((patent, i) => (
              <a
                key={i}
                href={`https://patents.google.com/patent/${patent.id}/ru`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 bg-white border border-[#D6DCE3] hover:border-[#00549F] hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="font-mono text-xs tracking-wider text-[#00549F] font-bold bg-[#E7EEF6] px-2 py-1">
                    {patent.id}
                  </div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-[#4A6378]">
                    {patent.date}
                  </div>
                </div>
                <div className="text-[10px] tracking-[0.14em] uppercase text-[#C8102E] font-bold mb-2">
                  {patent.category}
                </div>
                <h4 className="text-sm font-bold text-[#003366] mb-2 leading-snug group-hover:text-[#00549F] transition tracking-tight">
                  {patent.title}
                </h4>
                <p className="text-xs text-[#4A6378] leading-relaxed">{patent.description}</p>
                <div className="mt-3 flex items-center gap-1 text-[10px] tracking-[0.12em] uppercase font-bold text-[#00549F] opacity-0 group-hover:opacity-100 transition">
                  {t("pat.openPatent", lang)}
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mb-16 p-6 bg-[#F2F4F7] border-l-4 border-[#00549F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">{t("pat.fullEyebrow", lang)}</div>
            <div className="text-base font-semibold text-[#003366]">
              {t("pat.fullT", lang)}
            </div>
          </div>
          <a
            href="https://patents.google.com/?inventor=%D0%A0%D1%83%D1%81%D1%82%D0%B0%D0%BC+%D0%A2%D0%BE%D0%B3%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%D1%87+%D0%90%D0%BA%D0%B1%D0%B8%D0%B5%D0%B2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00549F] hover:bg-[#003366] text-white px-5 py-3 text-[12px] tracking-[0.14em] uppercase font-bold transition whitespace-nowrap"
          >
            {t("pat.fullCta", lang)}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-6 w-6 text-[#00549F]" />
                <span className="eyebrow">{t("qual.eyebrow", lang)}</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#003366] mb-4 tracking-tight leading-tight">
                {t("qual.h2a", lang)}
                <br />
                <span className="text-[#00549F]">{t("qual.h2b", lang)}</span>
              </h3>
              <p className="text-sm text-[#4A6378] leading-relaxed mb-4">
                {t("qual.lead", lang)}
              </p>
              <a
                href="https://www.serconsrus.ru/press-centr/intervyu/nasha-sistema-sejsmobezopasnost-novyj-znak-kachestva/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00549F] hover:text-[#003366] transition"
              >
                {t("qual.link", lang)}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <blockquote className="relative p-6 bg-[#FAF7F2] border-l-4 border-[#C8102E]">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-[#C8102E]/15" />
              <p className="text-base text-[#003366] leading-relaxed mb-4 font-medium">
                {t("qual.quote", lang)}
              </p>
              <footer className="text-[11px] tracking-[0.12em] uppercase text-[#00549F] font-bold">
                {t("qual.quoteBy", lang)}
              </footer>
            </blockquote>

            <div className="p-6 bg-white border border-[#D6DCE3]">
              <h4 className="text-base font-bold text-[#003366] mb-4 tracking-tight">
                {t("qual.advH", lang)}
              </h4>
              <ul className="space-y-3 text-sm text-[#4A6378] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 bg-[#00549F]" />
                  <span>{t("qual.adv1", lang)}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 bg-[#00549F]" />
                  <span>{t("qual.adv2", lang)}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 bg-[#00549F]" />
                  <span>{t("qual.adv3", lang)}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 bg-[#00549F]" />
                  <span>{t("qual.adv4", lang)}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 bg-[#00549F]" />
                  <span>{t("qual.adv5", lang)}</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-[#003366] text-white">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-white/80" />
                <span className="eyebrow text-white/80">{t("qual.tmEyebrow", lang)}</span>
              </div>
              <h4 className="text-base font-bold mb-3 tracking-tight">
                {t("qual.tmH", lang)}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-white/10 border-l-2 border-[#5BA8DB]">
                  <div className="font-bold text-base mb-1">СРОСС®</div>
                  <div className="text-xs text-white/70">{t("qual.tm1d", lang)}</div>
                </div>
                <div className="p-3 bg-white/10 border-l-2 border-[#5BA8DB]">
                  <div className="font-bold text-base mb-1">ГРАДОРЕСУРС®</div>
                  <div className="text-xs text-white/70">{t("qual.tm2d", lang)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
