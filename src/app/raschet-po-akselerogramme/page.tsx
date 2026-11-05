/**
 * SEO-страница: Расчёт сейсмостойкости по акселерограмме
 * Кластер: tests · Intent: commercial
 * Главный ключ: расчёт по акселерограмме
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_raschet_po_akselerogramme } from "@/content/seo/raschet-po-akselerogramme";

export const metadata = {
  title: "Расчёт сейсмостойкости по акселерограмме",
  description: "расчёт по акселерограмме — оформление, цена, сроки, документы. временная реализация, direct integration, землетрясение",
  keywords: "расчёт по акселерограмме, временная реализация, direct integration, землетрясение",
  alternates: { canonical: "/raschet-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "raschet-po-akselerogramme",
    title: "Расчёт сейсмостойкости по акселерограмме",
    cluster: "tests",
    intent: "commercial",
  }} content={pageContent_raschet_po_akselerogramme} />;
}
