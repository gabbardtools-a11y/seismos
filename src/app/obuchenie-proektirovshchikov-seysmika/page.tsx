/**
 * SEO-страница: Обучение проектировщиков сейсмостойкому строительству
 * Кластер: design
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.014221+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_obuchenie_proektirovshchikov_seysmika } from "@/content/seo/obuchenie-proektirovshchikov-seysmika";

export const metadata = {
  title: "Обучение проектировщиков сейсмостойкому строительству",
  description: "обучение проектировщиков сейсмостойкое строительство — оформление, цена, сроки. ",
  keywords: "обучение проектировщиков сейсмостойкое строительство",
  alternates: { canonical: "/obuchenie-proektirovshchikov-seysmika" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "obuchenie-proektirovshchikov-seysmika",
    title: "Обучение проектировщиков сейсмостойкому строительству",
    cluster: "design",
    intent: "commercial",
  }} content={pageContent_obuchenie_proektirovshchikov_seysmika} />;
}
