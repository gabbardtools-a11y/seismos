/**
 * SEO-страница: Обследование зданий на сейсмостойкость
 * Кластер: survey · Intent: commercial
 * Главный ключ: обследование зданий на сейсмостойкость
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_obsledovanie_zdaniy_na_seysmostoykost } from "@/content/seo/obsledovanie-zdaniy-na-seysmostoykost";

export const metadata = {
  title: "Обследование зданий на сейсмостойкость",
  description: "обследование зданий на сейсмостойкость — оформление, цена, сроки, документы. сейсмологическое обследование, паспортизация, оценка риска",
  keywords: "обследование зданий на сейсмостойкость, сейсмологическое обследование, паспортизация, оценка риска",
  alternates: { canonical: "/obsledovanie-zdaniy-na-seysmostoykost" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "obsledovanie-zdaniy-na-seysmostoykost",
    title: "Обследование зданий на сейсмостойкость",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_obsledovanie_zdaniy_na_seysmostoykost} />;
}
