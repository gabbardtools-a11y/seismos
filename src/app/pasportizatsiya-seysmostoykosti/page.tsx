/**
 * SEO-страница: Паспортизация сейсмостойкости зданий и сооружений
 * Кластер: survey · Intent: commercial
 * Главный ключ: паспорт сейсмостойкости здания
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_pasportizatsiya_seysmostoykosti } from "@/content/seo/pasportizatsiya-seysmostoykosti";

export const metadata = {
  title: "Паспортизация сейсмостойкости зданий и сооружений",
  description: "паспорт сейсмостойкости здания — оформление, цена, сроки, документы. паспортизация, реестр объектов, карточка сейсмостойкости",
  keywords: "паспорт сейсмостойкости здания, паспортизация, реестр объектов, карточка сейсмостойкости",
  alternates: { canonical: "/pasportizatsiya-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "pasportizatsiya-seysmostoykosti",
    title: "Паспортизация сейсмостойкости зданий и сооружений",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_pasportizatsiya_seysmostoykosti} />;
}
