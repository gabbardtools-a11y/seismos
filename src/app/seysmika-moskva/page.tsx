/**
 * SEO-страница: Сейсмо услуги Москва и МО (офисные здания)
 * Кластер: region
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.016747+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmika_moskva } from "@/content/seo/seysmika-moskva";

export const metadata = {
  title: "Сейсмо услуги Москва и МО (офисные здания)",
  description: "сейсмостойкость Москва — оформление, цена, сроки. ",
  keywords: "сейсмостойкость Москва",
  alternates: { canonical: "/seysmika-moskva" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmika-moskva",
    title: "Сейсмо услуги Москва и МО (офисные здания)",
    cluster: "region",
    intent: "commercial",
  }} content={pageContent_seysmika_moskva} />;
}
