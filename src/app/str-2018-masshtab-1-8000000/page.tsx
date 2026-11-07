/**
 * SEO-страница: Карты СР-2018 масштаба 1:8 000 000
 * Кластер: survey
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.011513+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_str_2018_masshtab_1_8000000 } from "@/content/seo/str-2018-masshtab-1-8000000";

export const metadata = {
  title: "Карты СР-2018 масштаба 1:8 000 000",
  description: "карты СР-2018 — оформление, цена, сроки. ",
  keywords: "карты СР-2018",
  alternates: { canonical: "/str-2018-masshtab-1-8000000" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "str-2018-masshtab-1-8000000",
    title: "Карты СР-2018 масштаба 1:8 000 000",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_str_2018_masshtab_1_8000000} />;
}
