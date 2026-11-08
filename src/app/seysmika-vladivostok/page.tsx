/**
 * SEO-страница: Сейсмо услуги Владивосток и Приморье
 * Кластер: region
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.016626+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmika_vladivostok } from "@/content/seo/seysmika-vladivostok";

export const metadata = {
  title: "Сейсмо услуги Владивосток и Приморье",
  description: "сейсмостойкость Владивосток — оформление, цена, сроки. ",
  keywords: "сейсмостойкость Владивосток",
  alternates: { canonical: "/seysmika-vladivostok" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmika-vladivostok",
    title: "Сейсмо услуги Владивосток и Приморье",
    cluster: "region",
    intent: "commercial",
  }} content={pageContent_seysmika_vladivostok} />;
}
