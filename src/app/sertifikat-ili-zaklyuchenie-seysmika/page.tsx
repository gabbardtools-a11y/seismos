/**
 * SEO-страница: Сертификат или заключение о сейсмостойкости — в чем разница
 * Кластер: faq
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.018042+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_sertifikat_ili_zaklyuchenie_seysmika } from "@/content/seo/sertifikat-ili-zaklyuchenie-seysmika";

export const metadata = {
  title: "Сертификат или заключение о сейсмостойкости — в чем разница",
  description: "сертификат или заключение сейсмостойкость — оформление, цена, сроки. ",
  keywords: "сертификат или заключение сейсмостойкость",
  alternates: { canonical: "/sertifikat-ili-zaklyuchenie-seysmika" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "sertifikat-ili-zaklyuchenie-seysmika",
    title: "Сертификат или заключение о сейсмостойкости — в чем разница",
    cluster: "faq",
    intent: "commercial",
  }} content={pageContent_sertifikat_ili_zaklyuchenie_seysmika} />;
}
