/**
 * SEO-страница: Расчёт сейсмической нагрузки по СП 14.13330
 * Кластер: design
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.013703+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_raschet_seysmicheskoy_nagruzki_snip } from "@/content/seo/raschet-seysmicheskoy-nagruzki-snip";

export const metadata = {
  title: "Расчёт сейсмической нагрузки по СП 14.13330",
  description: "расчёт сейсмической нагрузки СП 14.13330 — оформление, цена, сроки. ",
  keywords: "расчёт сейсмической нагрузки СП 14.13330",
  alternates: { canonical: "/raschet-seysmicheskoy-nagruzki-snip" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "raschet-seysmicheskoy-nagruzki-snip",
    title: "Расчёт сейсмической нагрузки по СП 14.13330",
    cluster: "design",
    intent: "commercial",
  }} content={pageContent_raschet_seysmicheskoy_nagruzki_snip} />;
}
