/**
 * SEO-страница: Сейсмостойкость больниц и медицинских учреждений
 * Кластер: industry
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.015044+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dlya_bolnic_seysmostoykost } from "@/content/seo/dlya-bolnic-seysmostoykost";

export const metadata = {
  title: "Сейсмостойкость больниц и медицинских учреждений",
  description: "сейсмостойкость больниц — оформление, цена, сроки. ",
  keywords: "сейсмостойкость больниц",
  alternates: { canonical: "/dlya-bolnic-seysmostoykost" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dlya-bolnic-seysmostoykost",
    title: "Сейсмостойкость больниц и медицинских учреждений",
    cluster: "industry",
    intent: "commercial",
  }} content={pageContent_dlya_bolnic_seysmostoykost} />;
}
