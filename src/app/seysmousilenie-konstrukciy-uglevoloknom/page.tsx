/**
 * SEO-страница: Сейсмоусиление конструкций углеволокном
 * Кластер: protect · Intent: commercial
 * Главный ключ: сейсмоусиление углеволокном
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmousilenie_konstrukciy_uglevoloknom } from "@/content/seo/seysmousilenie-konstrukciy-uglevoloknom";

export const metadata = {
  title: "Сейсмоусиление конструкций углеволокном",
  description: "сейсмоусиление углеволокном — оформление, цена, сроки, документы. внешнее армирование, FRP, углепластик, композит",
  keywords: "сейсмоусиление углеволокном, внешнее армирование, FRP, углепластик, композит",
  alternates: { canonical: "/seysmousilenie-konstrukciy-uglevoloknom" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmousilenie-konstrukciy-uglevoloknom",
    title: "Сейсмоусиление конструкций углеволокном",
    cluster: "protect",
    intent: "commercial",
  }} content={pageContent_seysmousilenie_konstrukciy_uglevoloknom} />;
}
