/**
 * SEO-страница: Сейсмостойкость мостов и эстакад
 * Кластер: industry
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.014672+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dlya_mostov_seysmostoykost } from "@/content/seo/dlya-mostov-seysmostoykost";

export const metadata = {
  title: "Сейсмостойкость мостов и эстакад",
  description: "сейсмостойкость мостов — оформление, цена, сроки. ",
  keywords: "сейсмостойкость мостов",
  alternates: { canonical: "/dlya-mostov-seysmostoykost" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dlya-mostov-seysmostoykost",
    title: "Сейсмостойкость мостов и эстакад",
    cluster: "industry",
    intent: "commercial",
  }} content={pageContent_dlya_mostov_seysmostoykost} />;
}
