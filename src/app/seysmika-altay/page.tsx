/**
 * SEO-страница: Сейсмо услуги Алтай
 * Кластер: region
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.016263+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmika_altay } from "@/content/seo/seysmika-altay";

export const metadata = {
  title: "Сейсмо услуги Алтай",
  description: "сейсмостойкость Алтай — оформление, цена, сроки. ",
  keywords: "сейсмостойкость Алтай",
  alternates: { canonical: "/seysmika-altay" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmika-altay",
    title: "Сейсмо услуги Алтай",
    cluster: "region",
    intent: "commercial",
  }} content={pageContent_seysmika_altay} />;
}
