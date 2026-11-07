/**
 * SEO-страница: Сейсмо услуги Сахалин
 * Кластер: region
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.015869+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmika_sahalin } from "@/content/seo/seysmika-sahalin";

export const metadata = {
  title: "Сейсмо услуги Сахалин",
  description: "сейсмостойкость Сахалин — оформление, цена, сроки. ",
  keywords: "сейсмостойкость Сахалин",
  alternates: { canonical: "/seysmika-sahalin" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmika-sahalin",
    title: "Сейсмо услуги Сахалин",
    cluster: "region",
    intent: "commercial",
  }} content={pageContent_seysmika_sahalin} />;
}
