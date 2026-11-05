/**
 * SEO-страница: Программа и методика испытаний (ПМИ) на сейсмостойкость
 * Кластер: tests · Intent: commercial
 * Главный ключ: программа методика испытаний ПМИ сейсмостойкость
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_razrabotka_pmi_seysmostoykosti } from "@/content/seo/razrabotka-pmi-seysmostoykosti";

export const metadata = {
  title: "Программа и методика испытаний (ПМИ) на сейсмостойкость",
  description: "программа методика испытаний ПМИ сейсмостойкость — оформление, цена, сроки, документы. ТУ, технические условия, согласование ПМИ",
  keywords: "программа методика испытаний ПМИ сейсмостойкость, ТУ, технические условия, согласование ПМИ",
  alternates: { canonical: "/razrabotka-pmi-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "razrabotka-pmi-seysmostoykosti",
    title: "Программа и методика испытаний (ПМИ) на сейсмостойкость",
    cluster: "tests",
    intent: "commercial",
  }} content={pageContent_razrabotka_pmi_seysmostoykosti} />;
}
