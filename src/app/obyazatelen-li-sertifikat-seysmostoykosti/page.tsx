/**
 * SEO-страница: Обязателен ли сертификат сейсмостойкости
 * Кластер: faq
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.018360+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_obyazatelen_li_sertifikat_seysmostoykosti } from "@/content/seo/obyazatelen-li-sertifikat-seysmostoykosti";

export const metadata = {
  title: "Обязателен ли сертификат сейсмостойкости",
  description: "обязателен ли сертификат сейсмостойкости — оформление, цена, сроки. ",
  keywords: "обязателен ли сертификат сейсмостойкости",
  alternates: { canonical: "/obyazatelen-li-sertifikat-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "obyazatelen-li-sertifikat-seysmostoykosti",
    title: "Обязателен ли сертификат сейсмостойкости",
    cluster: "faq",
    intent: "commercial",
  }} content={pageContent_obyazatelen_li_sertifikat_seysmostoykosti} />;
}
