/**
 * SEO-страница: Сейсмо услуги Северный Кавказ
 * Кластер: region
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.016139+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmika_kavkaz } from "@/content/seo/seysmika-kavkaz";

export const metadata = {
  title: "Сейсмо услуги Северный Кавказ",
  description: "сейсмостойкость Северный Кавказ — оформление, цена, сроки. ",
  keywords: "сейсмостойкость Северный Кавказ",
  alternates: { canonical: "/seysmika-kavkaz" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmika-kavkaz",
    title: "Сейсмо услуги Северный Кавказ",
    cluster: "region",
    intent: "commercial",
  }} content={pageContent_seysmika_kavkaz} />;
}
