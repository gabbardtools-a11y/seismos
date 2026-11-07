/**
 * SEO-страница: Документы для получения сертификата сейсмостойкости
 * Кластер: faq
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.017395+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dokumenty_dlya_seysmiki } from "@/content/seo/dokumenty-dlya-seysmiki";

export const metadata = {
  title: "Документы для получения сертификата сейсмостойкости",
  description: "документы для сертификата сейсмостойкости — оформление, цена, сроки. ",
  keywords: "документы для сертификата сейсмостойкости",
  alternates: { canonical: "/dokumenty-dlya-seysmiki" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dokumenty-dlya-seysmiki",
    title: "Документы для получения сертификата сейсмостойкости",
    cluster: "faq",
    intent: "commercial",
  }} content={pageContent_dokumenty_dlya_seysmiki} />;
}
