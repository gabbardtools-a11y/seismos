/**
 * SEO-страница: Разработка ТУ на сейсмостойкое оборудование
 * Кластер: design
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.013337+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_razrabotka_tu_seysmostoykosti } from "@/content/seo/razrabotka-tu-seysmostoykosti";

export const metadata = {
  title: "Разработка ТУ на сейсмостойкое оборудование",
  description: "разработка ТУ сейсмостойкость — оформление, цена, сроки. ",
  keywords: "разработка ТУ сейсмостойкость",
  alternates: { canonical: "/razrabotka-tu-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "razrabotka-tu-seysmostoykosti",
    title: "Разработка ТУ на сейсмостойкое оборудование",
    cluster: "design",
    intent: "commercial",
  }} content={pageContent_razrabotka_tu_seysmostoykosti} />;
}
