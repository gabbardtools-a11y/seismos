/**
 * SEO-страница: Сейсмостойкость оборудования для АЭС
 * Кластер: industry
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.014443+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dlya_aes_seysmostoykost } from "@/content/seo/dlya-aes-seysmostoykost";

export const metadata = {
  title: "Сейсмостойкость оборудования для АЭС",
  description: "сейсмостойкость оборудования АЭС — оформление, цена, сроки. ",
  keywords: "сейсмостойкость оборудования АЭС",
  alternates: { canonical: "/dlya-aes-seysmostoykost" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dlya-aes-seysmostoykost",
    title: "Сейсмостойкость оборудования для АЭС",
    cluster: "industry",
    intent: "commercial",
  }} content={pageContent_dlya_aes_seysmostoykost} />;
}
