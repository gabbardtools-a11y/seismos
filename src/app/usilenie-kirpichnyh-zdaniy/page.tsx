/**
 * SEO-страница: Усиление кирпичных зданий под сейсмические нагрузки
 * Кластер: protect · Intent: commercial
 * Главный ключ: усиление кирпичных зданий
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_usilenie_kirpichnyh_zdaniy } from "@/content/seo/usilenie-kirpichnyh-zdaniy";

export const metadata = {
  title: "Усиление кирпичных зданий под сейсмические нагрузки",
  description: "усиление кирпичных зданий — оформление, цена, сроки, документы. кладка, сейсмопояс, армирование, надстройка",
  keywords: "усиление кирпичных зданий, кладка, сейсмопояс, армирование, надстройка",
  alternates: { canonical: "/usilenie-kirpichnyh-zdaniy" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "usilenie-kirpichnyh-zdaniy",
    title: "Усиление кирпичных зданий под сейсмические нагрузки",
    cluster: "protect",
    intent: "commercial",
  }} content={pageContent_usilenie_kirpichnyh_zdaniy} />;
}
