/**
 * Лендинг группы услуг — /services/[group]
 * Заменяет 37-ссылочный дропдаун: одна страница на группу, переходы на конкретные услуги.
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { serviceGroups, findServiceGroup } from "@/content/seo/services-groups";
import { DOMAINS } from "@/components/site/domain-icons";

export function generateStaticParams() {
  return serviceGroups.map((g) => ({ group: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params;
  const g = findServiceGroup(group);
  if (!g) return { title: "Группа услуг не найдена" };
  return {
    title: `${g.title} — услуги СРОСС®`,
    description: g.description,
    alternates: { canonical: `/services/${g.slug}` },
  };
}

export default async function ServiceGroupPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group } = await params;
  const g = findServiceGroup(group);
  if (!g) notFound();

  const domain = DOMAINS.find((d) => d.id === g.domain);

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: g.title,
            description: g.description,
            numberOfItems: g.services.length,
            itemListElement: g.services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.label,
              url: `https://seismos.ru${s.href}`,
            })),
          }),
        }}
      />
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        {/* Хлебные крошки */}
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold flex-wrap">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <Link href="/services" className="hover:text-[#00549F]">Услуги</Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">{g.title}</span>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-br from-[#F8FBF9] to-white border border-[#D6DCE3] rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold tracking-[0.08em] text-white"
              style={{ backgroundColor: domain?.color || "#00549F" }}
            >
              {domain?.name || "Сейсмо"}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold bg-white border border-[#D6DCE3] text-[#4A6378]">
              {g.services.length} услуг в группе
            </span>
          </div>
          <h1 className="text-[24px] sm:text-[32px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3">
            {g.title}
          </h1>
          <p className="text-[15px] sm:text-lg text-[#4A6378] leading-relaxed">{g.description}</p>
        </div>

        {/* Список услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {g.services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center justify-between gap-3 bg-white border border-[#D6DCE3] rounded-xl p-5 hover:border-[#00549F]/50 hover:shadow-md transition-all"
            >
              <span className="text-[15px] font-semibold text-[#003366] group-hover:text-[#00549F] transition-colors">
                {s.label}
              </span>
              <span className="flex items-center gap-2 flex-none text-[#00549F]">
                <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100" />
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* Навигация между группами */}
        <div className="mt-10 pt-6 border-t border-[#D6DCE3]">
          <p className="text-[12px] tracking-[0.1em] uppercase text-[#4A6378] font-semibold mb-3">
            Другие направления
          </p>
          <div className="flex flex-wrap gap-2">
            {serviceGroups
              .filter((og) => og.slug !== g.slug)
              .map((og) => (
                <Link
                  key={og.slug}
                  href={`/services/${og.slug}`}
                  className="inline-flex items-center px-3 py-2 rounded-lg text-[13px] font-semibold text-[#003366] bg-[#F5E6E6] hover:bg-[#EBD0D0] transition-colors"
                >
                  {og.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
