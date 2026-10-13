import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SrossemblemMark } from "./site-header";
import { getLang } from "@/lib/i18n/server";
import { t } from "@/lib/i18n/translations";

export async function SiteFooter() {
  const lang = await getLang();

  return (
    <footer className="bg-[#003366] text-white mt-auto">
      {/* Верхняя декоративная полоса с волной */}
      <div className="h-1 bg-gradient-to-r from-[#00549F] via-[#4A8DD2] to-[#00549F]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Колонка 1: Бренд */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <SrossemblemMark className="h-12 w-12" />
              <div className="leading-tight">
                <div className="text-lg font-bold tracking-[0.18em] text-white">
                  СРОСС<sup className="text-[9px] align-super">®</sup>
                </div>
                <div className="text-[10px] tracking-[0.16em] uppercase text-white/70">
                  seismo.ru
                </div>
              </div>
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed">
              {t("foot.brandLead", lang)}
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h4 className="eyebrow text-white/80 mb-4">{t("foot.sectionsH", lang)}</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li><Link href="#about" className="hover:text-white transition">{t("foot.fAbout", lang)}</Link></li>
              <li><Link href="#directions" className="hover:text-white transition">{t("foot.fDirections", lang)}</Link></li>
              <li><Link href="#partners" className="hover:text-white transition">{t("foot.fPartners", lang)}</Link></li>
              <li><Link href="#publications" className="hover:text-white transition">{t("foot.fPublications", lang)}</Link></li>
              <li><Link href="#contacts" className="hover:text-white transition">{t("foot.fContacts", lang)}</Link></li>
            </ul>
          </div>

          {/* Колонка 3: Связанные ресурсы */}
          <div>
            <h4 className="eyebrow text-white/80 mb-4">{t("foot.ecoH", lang)}</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <a
                  href="https://seismo.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition inline-flex items-center gap-1"
                >
                  {t("foot.eco1", lang)}
                </a>
              </li>
              <li>
                <span className="opacity-60">ГРАДОРЕСУРС® — консорциум</span>
              </li>
              <li>
                <span className="opacity-60">100+ · ИНТЕРКОНСТРОЙ</span>
              </li>
              <li>
                <span className="opacity-60">РНКСС · GEOTEX · RISK</span>
              </li>
              <li>
                <span className="opacity-60">GRADINFO · SEISMO</span>
              </li>
              <li>
                <a href="/logo-variants" className="hover:text-white transition opacity-80">
                  {t("foot.logoVariants", lang)}
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Контакты */}
          <div>
            <h4 className="eyebrow text-white/80 mb-4">{t("foot.contactsH", lang)}</h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-white/60 shrink-0" />
                <a href="tel:+74997056712" className="hover:text-white transition">
                  +7 (499) 705 6712
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-white/60 shrink-0" />
                <a
                  href="mailto:office@seismo.pro"
                  className="hover:text-white transition"
                >
                  office@seismo.pro
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-white/60 shrink-0" />
                <span>
                  {t("foot.addr", lang)}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя полоса — реквизиты СМИ */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] tracking-[0.08em] text-white/55 uppercase">
          <div>
            {t("foot.smi", lang)}
          </div>
          <div className="flex items-center gap-3">
            <span>{t("foot.copyright", lang)}</span>
            <span className="opacity-30">·</span>
            <span>{t("foot.patentTz", lang)}</span>
            <span className="opacity-30">·</span>
            <span>{t("foot.rights", lang)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
