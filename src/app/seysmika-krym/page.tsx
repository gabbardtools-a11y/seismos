/**
 * SEO-страница: Сейсмо услуги Крым
 * Кластер: region
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.015993+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmika_krym } from "@/content/seo/seysmika-krym";

export const metadata = {
  title: "Сейсмо услуги Крым",
  description: "сейсмостойкость Крым — оформление, цена, сроки. ",
  keywords: "сейсмостойкость Крым",
  alternates: { canonical: "/seysmika-krym" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmika-krym",
    title: "Сейсмо услуги Крым",
    cluster: "region",
    intent: "commercial",
  }} content={pageContent_seysmika_krym} />;
}
