/**
 * SEO-страница: Семинары по сейсмостойкому строительству
 * Кластер: design
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.014332+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seminary_seysmostoykoe_stroitelstvo } from "@/content/seo/seminary-seysmostoykoe-stroitelstvo";

export const metadata = {
  title: "Семинары по сейсмостойкому строительству",
  description: "семинары сейсмостойкое строительство — оформление, цена, сроки. ",
  keywords: "семинары сейсмостойкое строительство",
  alternates: { canonical: "/seminary-seysmostoykoe-stroitelstvo" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seminary-seysmostoykoe-stroitelstvo",
    title: "Семинары по сейсмостойкому строительству",
    cluster: "design",
    intent: "commercial",
  }} content={pageContent_seminary_seysmostoykoe_stroitelstvo} />;
}
