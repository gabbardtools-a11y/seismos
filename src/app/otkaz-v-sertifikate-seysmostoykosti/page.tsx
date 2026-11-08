/**
 * SEO-страница: Отказ в сертификате сейсмостойкости — что делать
 * Кластер: faq
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.017885+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_otkaz_v_sertifikate_seysmostoykosti } from "@/content/seo/otkaz-v-sertifikate-seysmostoykosti";

export const metadata = {
  title: "Отказ в сертификате сейсмостойкости — что делать",
  description: "отказ в сертификате сейсмостойкости — оформление, цена, сроки. ",
  keywords: "отказ в сертификате сейсмостойкости",
  alternates: { canonical: "/otkaz-v-sertifikate-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "otkaz-v-sertifikate-seysmostoykosti",
    title: "Отказ в сертификате сейсмостойкости — что делать",
    cluster: "faq",
    intent: "commercial",
  }} content={pageContent_otkaz_v_sertifikate_seysmostoykosti} />;
}
