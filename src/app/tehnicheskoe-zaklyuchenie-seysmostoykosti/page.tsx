/**
 * SEO-страница: Техническое заключение о сейсмостойкости
 * Кластер: survey · Intent: commercial
 * Главный ключ: техническое заключение о сейсмостойкости
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_tehnicheskoe_zaklyuchenie_seysmostoykosti } from "@/content/seo/tehnicheskoe-zaklyuchenie-seysmostoykosti";

export const metadata = {
  title: "Техническое заключение о сейсмостойкости",
  description: "техническое заключение о сейсмостойкости — оформление, цена, сроки, документы. ТЗ, обследование, расчёт, рекомендации",
  keywords: "техническое заключение о сейсмостойкости, ТЗ, обследование, расчёт, рекомендации",
  alternates: { canonical: "/tehnicheskoe-zaklyuchenie-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "tehnicheskoe-zaklyuchenie-seysmostoykosti",
    title: "Техническое заключение о сейсмостойкости",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_tehnicheskoe_zaklyuchenie_seysmostoykosti} />;
}
