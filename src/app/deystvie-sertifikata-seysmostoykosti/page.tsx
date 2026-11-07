/**
 * SEO-страница: Срок действия сертификата сейсмостойкости
 * Кластер: faq
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.017559+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_deystvie_sertifikata_seysmostoykosti } from "@/content/seo/deystvie-sertifikata-seysmostoykosti";

export const metadata = {
  title: "Срок действия сертификата сейсмостойкости",
  description: "срок действия сертификата сейсмостойкости — оформление, цена, сроки. ",
  keywords: "срок действия сертификата сейсмостойкости",
  alternates: { canonical: "/deystvie-sertifikata-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "deystvie-sertifikata-seysmostoykosti",
    title: "Срок действия сертификата сейсмостойкости",
    cluster: "faq",
    intent: "commercial",
  }} content={pageContent_deystvie_sertifikata_seysmostoykosti} />;
}
