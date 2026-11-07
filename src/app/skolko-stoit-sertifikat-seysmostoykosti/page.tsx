/**
 * SEO-страница: Сколько стоит сертификат сейсмостойкости
 * Кластер: faq
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.017004+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_skolko_stoit_sertifikat_seysmostoykosti } from "@/content/seo/skolko-stoit-sertifikat-seysmostoykosti";

export const metadata = {
  title: "Сколько стоит сертификат сейсмостойкости",
  description: "сколько стоит сертификат сейсмостойкости — оформление, цена, сроки. ",
  keywords: "сколько стоит сертификат сейсмостойкости",
  alternates: { canonical: "/skolko-stoit-sertifikat-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "skolko-stoit-sertifikat-seysmostoykosti",
    title: "Сколько стоит сертификат сейсмостойкости",
    cluster: "faq",
    intent: "commercial",
  }} content={pageContent_skolko_stoit_sertifikat_seysmostoykosti} />;
}
