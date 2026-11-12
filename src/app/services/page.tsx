/**
 * Обзорная страница услуг СРОСС® — /services
 * Систематизация: 5 групп вместо 37 ссылок в дропдауне.
 */
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { serviceGroups } from "@/content/seo/services-groups";
import { DOMAINS } from "@/components/site/domain-icons";

export const metadata = {
  title: "Услуги СРОСС® — сейсмостойкость: сертификация, испытания, усиление",
  description:
    "Полный комплекс услуг по сейсмостойкости: сертификация, испытания и расчёты, обследование, сейсмозащита, сейсмоизоляторы. Выберите направление.",
  alternates: { canonical: "/services" },
};

export default function ServicesOverviewPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">Услуги</span>
        </div>

        <div className="mb-10">
          <h1 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.01em] text-[#003366] mb-3">
            Услуги по сейсмостойкости
          </h1>
          <p className="text-[15px] sm:text-lg text-[#4A6378] leading-relaxed max-w-3xl">
            Полный цикл работ — от сертификации и испытаний до сейсмоусиления и поставки
            сейсмоизоляторов. Выберите направление, чтобы увидеть конкретные услуги.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {serviceGroups.map((g) => {
            const domain = DOMAINS.find((d) => d.id === g.domain);
            return (
              <Link
                key={g.slug}
                href={`/services/${g.slug}`}
                className="group bg-gradient-to-br from-[#F8FBF9] to-white border border-[#D6DCE3] rounded-2xl p-6 hover:border-[#00549F]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold tracking-[0.08em] text-white"
                    style={{ backgroundColor: domain?.color || "#00549F" }}
                  >
                    {g.services.length} услуг
                  </span>
                </div>
                <h2 className="text-[20px] font-bold text-[#003366] mb-2 group-hover:text-[#00549F] transition-colors">
                  {g.title}
                </h2>
                <p className="text-[14px] text-[#4A6378] leading-relaxed mb-4">{g.description}</p>
                <div className="flex items-center gap-1 text-[#00549F] font-semibold text-[13px]">
                  Перейти к услугам
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
