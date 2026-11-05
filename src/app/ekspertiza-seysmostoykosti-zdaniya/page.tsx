/**
 * SEO-страница: Экспертиза сейсмостойкости здания
 * Кластер: survey · Intent: commercial
 * Главный ключ: экспертиза сейсмостойкости здания
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_ekspertiza_seysmostoykosti_zdaniya } from "@/content/seo/ekspertiza-seysmostoykosti-zdaniya";

export const metadata = {
  title: "Экспертиза сейсмостойкости здания",
  description: "экспертиза сейсмостойкости здания — оформление, цена, сроки, документы. независимая экспертиза, заключение эксперта, судебная экспертиза",
  keywords: "экспертиза сейсмостойкости здания, независимая экспертиза, заключение эксперта, судебная экспертиза",
  alternates: { canonical: "/ekspertiza-seysmostoykosti-zdaniya" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "ekspertiza-seysmostoykosti-zdaniya",
    title: "Экспертиза сейсмостойкости здания",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_ekspertiza_seysmostoykosti_zdaniya} />;
}
