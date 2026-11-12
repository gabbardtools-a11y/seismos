/**
 * Обзорная страница «Инфо» — /info
 * Систематизация: 4 карточки-категории вместо 18-ссылочного дропдауна.
 * Аналогично /services — обзорная страница с переходами на конкретные разделы.
 */
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { infoCategories } from "@/content/seo/info-categories";
import { DOMAINS } from "@/components/site/domain-icons";

export const metadata = {
  title: "Инфо — СРОСС®: нормативы, глоссарии, справочники",
  description:
    "Нормативная база (54 PDF), глоссарии по сейсмике/вибро/взрывам/динамике, справочные разделы и информация о проекте СРОСС®.",
  alternates: { canonical: "/info" },
};

export default function InfoOverviewPage() {
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
          <span className="text-[#003366]">Инфо</span>
        </div>

        <div className="mb-10">
          <h1 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.01em] text-[#003366] mb-3">
            Информация и справочники
          </h1>
          <p className="text-[15px] sm:text-lg text-[#4A6378] leading-relaxed max-w-3xl">
            Нормативные документы, глоссарии, справочные разделы и информация о проекте.
            Выберите категорию, чтобы перейти к разделу.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {infoCategories.map((cat) => {
            const domain = DOMAINS.find((d) => d.id === cat.domain);
            return (
              <div
                key={cat.slug}
                className="bg-gradient-to-br from-[#F8FBF9] to-white border border-[#D6DCE3] rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold tracking-[0.08em] text-white"
                    style={{ backgroundColor: domain?.color || "#00549F" }}
                  >
                    {cat.links.length} разделов
                  </span>
                </div>
                <h2 className="text-[20px] font-bold text-[#003366] mb-2">{cat.title}</h2>
                <p className="text-[14px] text-[#4A6378] leading-relaxed mb-4">{cat.description}</p>
                <div className="flex flex-col gap-1">
                  {cat.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="group flex items-center justify-between gap-2 py-2 px-3 -mx-3 rounded-lg text-[14px] font-semibold text-[#003366] hover:text-[#00549F] hover:bg-[#F5E6E6] transition-colors"
                    >
                      {l.label}
                      <ChevronRight className="h-4 w-4 text-[#00549F] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-none" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
