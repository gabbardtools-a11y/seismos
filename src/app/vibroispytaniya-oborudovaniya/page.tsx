/**
 * SEO-страница: Виброиспытания оборудования на сейсмическое воздействие
 * Кластер: tests · Intent: commercial
 * Главный ключ: виброиспытания оборудования
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_vibroispytaniya_oborudovaniya } from "@/content/seo/vibroispytaniya-oborudovaniya";

export const metadata = {
  title: "Виброиспытания оборудования на сейсмическое воздействие",
  description: "виброиспытания оборудования — оформление, цена, сроки, документы. вибрационная стойкость, ГОСТ 30631, механические ВВФ",
  keywords: "виброиспытания оборудования, вибрационная стойкость, ГОСТ 30631, механические ВВФ",
  alternates: { canonical: "/vibroispytaniya-oborudovaniya" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "vibroispytaniya-oborudovaniya",
    title: "Виброиспытания оборудования на сейсмическое воздействие",
    cluster: "tests",
    intent: "commercial",
  }} content={pageContent_vibroispytaniya_oborudovaniya} />;
}
