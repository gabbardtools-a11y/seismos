/**
 * SEO-страница: Проверка сертификата сейсмостойкости в реестре
 * Кластер: faq
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.017722+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_proverka_sertifikata_seysmostoykosti } from "@/content/seo/proverka-sertifikata-seysmostoykosti";

export const metadata = {
  title: "Проверка сертификата сейсмостойкости в реестре",
  description: "проверка сертификата сейсмостойкости — оформление, цена, сроки. ",
  keywords: "проверка сертификата сейсмостойкости",
  alternates: { canonical: "/proverka-sertifikata-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "proverka-sertifikata-seysmostoykosti",
    title: "Проверка сертификата сейсмостойкости в реестре",
    cluster: "faq",
    intent: "commercial",
  }} content={pageContent_proverka_sertifikata_seysmostoykosti} />;
}
