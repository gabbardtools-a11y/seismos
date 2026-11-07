/**
 * SEO-страница: Сейсмостойкость дата-центров
 * Кластер: industry
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.015268+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dlya_data_centrov_seysmostoykost } from "@/content/seo/dlya-data-centrov-seysmostoykost";

export const metadata = {
  title: "Сейсмостойкость дата-центров",
  description: "сейсмостойкость дата-центров — оформление, цена, сроки. ",
  keywords: "сейсмостойкость дата-центров",
  alternates: { canonical: "/dlya-data-centrov-seysmostoykost" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dlya-data-centrov-seysmostoykost",
    title: "Сейсмостойкость дата-центров",
    cluster: "industry",
    intent: "commercial",
  }} content={pageContent_dlya_data_centrov_seysmostoykost} />;
}
