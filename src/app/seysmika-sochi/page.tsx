/**
 * SEO-страница: Сейсмо услуги Сочи — сертификат, обследование, изоляторы
 * Кластер: region
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.015620+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmika_sochi } from "@/content/seo/seysmika-sochi";

export const metadata = {
  title: "Сейсмо услуги Сочи — сертификат, обследование, изоляторы",
  description: "сейсмостойкость Сочи — оформление, цена, сроки. ",
  keywords: "сейсмостойкость Сочи",
  alternates: { canonical: "/seysmika-sochi" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmika-sochi",
    title: "Сейсмо услуги Сочи — сертификат, обследование, изоляторы",
    cluster: "region",
    intent: "commercial",
  }} content={pageContent_seysmika_sochi} />;
}
