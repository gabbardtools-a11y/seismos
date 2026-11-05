/**
 * SEO-страница: Сейсмоусиление зданий и сооружений
 * Кластер: protect · Intent: commercial
 * Главный ключ: сейсмоусиление зданий
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmousilenie_zdaniy } from "@/content/seo/seysmousilenie-zdaniy";

export const metadata = {
  title: "Сейсмоусиление зданий и сооружений",
  description: "сейсмоусиление зданий — оформление, цена, сроки, документы. усиление конструкций, антисейсмические мероприятия, СП 14.13330",
  keywords: "сейсмоусиление зданий, усиление конструкций, антисейсмические мероприятия, СП 14.13330",
  alternates: { canonical: "/seysmousilenie-zdaniy" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmousilenie-zdaniy",
    title: "Сейсмоусиление зданий и сооружений",
    cluster: "protect",
    intent: "commercial",
  }} content={pageContent_seysmousilenie_zdaniy} />;
}
