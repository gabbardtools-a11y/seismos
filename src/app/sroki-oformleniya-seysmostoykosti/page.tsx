/**
 * SEO-страница: Сроки оформления сертификата сейсмостойкости
 * Кластер: faq
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.017244+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_sroki_oformleniya_seysmostoykosti } from "@/content/seo/sroki-oformleniya-seysmostoykosti";

export const metadata = {
  title: "Сроки оформления сертификата сейсмостойкости",
  description: "сроки оформления сертификата сейсмостойкости — оформление, цена, сроки. ",
  keywords: "сроки оформления сертификата сейсмостойкости",
  alternates: { canonical: "/sroki-oformleniya-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "sroki-oformleniya-seysmostoykosti",
    title: "Сроки оформления сертификата сейсмостойкости",
    cluster: "faq",
    intent: "commercial",
  }} content={pageContent_sroki_oformleniya_seysmostoykosti} />;
}
