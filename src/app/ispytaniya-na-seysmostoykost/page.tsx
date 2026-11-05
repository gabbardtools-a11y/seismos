/**
 * SEO-страница: Испытания на сейсмостойкость на вибростенде
 * Кластер: tests · Intent: commercial
 * Главный ключ: испытания на сейсмостойкость
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_ispytaniya_na_seysmostoykost } from "@/content/seo/ispytaniya-na-seysmostoykost";

export const metadata = {
  title: "Испытания на сейсмостойкость на вибростенде",
  description: "испытания на сейсмостойкость — оформление, цена, сроки, документы. электродинамический вибростенд, акселерограмма, разонансный sweep-тест",
  keywords: "испытания на сейсмостойкость, электродинамический вибростенд, акселерограмма, разонансный sweep-тест",
  alternates: { canonical: "/ispytaniya-na-seysmostoykost" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "ispytaniya-na-seysmostoykost",
    title: "Испытания на сейсмостойкость на вибростенде",
    cluster: "tests",
    intent: "commercial",
  }} content={pageContent_ispytaniya_na_seysmostoykost} />;
}
