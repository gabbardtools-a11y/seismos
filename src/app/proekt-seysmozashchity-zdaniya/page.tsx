/**
 * SEO-страница: Проект сейсмозащиты здания
 * Кластер: design
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.013453+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_proekt_seysmozashchity_zdaniya } from "@/content/seo/proekt-seysmozashchity-zdaniya";

export const metadata = {
  title: "Проект сейсмозащиты здания",
  description: "проект сейсмозащиты здания — оформление, цена, сроки. ",
  keywords: "проект сейсмозащиты здания",
  alternates: { canonical: "/proekt-seysmozashchity-zdaniya" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "proekt-seysmozashchity-zdaniya",
    title: "Проект сейсмозащиты здания",
    cluster: "design",
    intent: "commercial",
  }} content={pageContent_proekt_seysmozashchity_zdaniya} />;
}
