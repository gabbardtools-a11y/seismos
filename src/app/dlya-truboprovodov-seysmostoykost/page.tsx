/**
 * SEO-страница: Сейсмостойкость трубопроводов
 * Кластер: industry
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.014918+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dlya_truboprovodov_seysmostoykost } from "@/content/seo/dlya-truboprovodov-seysmostoykost";

export const metadata = {
  title: "Сейсмостойкость трубопроводов",
  description: "сейсмостойкость трубопроводов — оформление, цена, сроки. ",
  keywords: "сейсмостойкость трубопроводов",
  alternates: { canonical: "/dlya-truboprovodov-seysmostoykost" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dlya-truboprovodov-seysmostoykost",
    title: "Сейсмостойкость трубопроводов",
    cluster: "industry",
    intent: "commercial",
  }} content={pageContent_dlya_truboprovodov_seysmostoykost} />;
}
