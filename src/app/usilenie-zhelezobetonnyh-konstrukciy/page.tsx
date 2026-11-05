/**
 * SEO-страница: Усиление железобетонных конструкций под сейсмику
 * Кластер: protect · Intent: commercial
 * Главный ключ: усиление железобетонных конструкций
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_usilenie_zhelezobetonnyh_konstrukciy } from "@/content/seo/usilenie-zhelezobetonnyh-konstrukciy";

export const metadata = {
  title: "Усиление железобетонных конструкций под сейсмику",
  description: "усиление железобетонных конструкций — оформление, цена, сроки, документы. обетонирование, стальные обоймы, торкрет, феррополимер",
  keywords: "усиление железобетонных конструкций, обетонирование, стальные обоймы, торкрет, феррополимер",
  alternates: { canonical: "/usilenie-zhelezobetonnyh-konstrukciy" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "usilenie-zhelezobetonnyh-konstrukciy",
    title: "Усиление железобетонных конструкций под сейсмику",
    cluster: "protect",
    intent: "commercial",
  }} content={pageContent_usilenie_zhelezobetonnyh_konstrukciy} />;
}
