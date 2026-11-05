/**
 * SEO-страница: Заключение о сейсмостойкости оборудования
 * Кластер: cert · Intent: commercial
 * Главный ключ: заключение о сейсмостойкости
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_zaklyuchenie_o_seysmostoykosti } from "@/content/seo/zaklyuchenie-o-seysmostoykosti";

export const metadata = {
  title: "Заключение о сейсмостойкости оборудования",
  description: "заключение о сейсмостойкости — оформление, цена, сроки, документы. экспертное заключение, расчётный путь, конечно-элементный расчёт",
  keywords: "заключение о сейсмостойкости, экспертное заключение, расчётный путь, конечно-элементный расчёт",
  alternates: { canonical: "/zaklyuchenie-o-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "zaklyuchenie-o-seysmostoykosti",
    title: "Заключение о сейсмостойкости оборудования",
    cluster: "cert",
    intent: "commercial",
  }} content={pageContent_zaklyuchenie_o_seysmostoykosti} />;
}
