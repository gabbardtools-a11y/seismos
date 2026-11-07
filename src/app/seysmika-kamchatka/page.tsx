/**
 * SEO-страница: Сейсмо услуги Камчатка
 * Кластер: region
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.015741+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmika_kamchatka } from "@/content/seo/seysmika-kamchatka";

export const metadata = {
  title: "Сейсмо услуги Камчатка",
  description: "сейсмостойкость Камчатка — оформление, цена, сроки. ",
  keywords: "сейсмостойкость Камчатка",
  alternates: { canonical: "/seysmika-kamchatka" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmika-kamchatka",
    title: "Сейсмо услуги Камчатка",
    cluster: "region",
    intent: "commercial",
  }} content={pageContent_seysmika_kamchatka} />;
}
