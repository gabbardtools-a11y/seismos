/**
 * SEO-страница: Сейсмостойкое оборудование для нефтегазовой отрасли
 * Кластер: industry
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.014555+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dlya_neftegaza_seysmostoykost } from "@/content/seo/dlya-neftegaza-seysmostoykost";

export const metadata = {
  title: "Сейсмостойкое оборудование для нефтегазовой отрасли",
  description: "сейсмостойкое оборудование нефтегаз — оформление, цена, сроки. ",
  keywords: "сейсмостойкое оборудование нефтегаз",
  alternates: { canonical: "/dlya-neftegaza-seysmostoykost" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dlya-neftegaza-seysmostoykost",
    title: "Сейсмостойкое оборудование для нефтегазовой отрасли",
    cluster: "industry",
    intent: "commercial",
  }} content={pageContent_dlya_neftegaza_seysmostoykost} />;
}
