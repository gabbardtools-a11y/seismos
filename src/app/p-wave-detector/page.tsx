/**
 * SEO-страница: Детектор P-волны землетрясения (early warning)
 * Кластер: monitor
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.012730+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_p_wave_detector } from "@/content/seo/p-wave-detector";

export const metadata = {
  title: "Детектор P-волны землетрясения (early warning)",
  description: "детектор P-волны — оформление, цена, сроки. ",
  keywords: "детектор P-волны",
  alternates: { canonical: "/p-wave-detector" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "p-wave-detector",
    title: "Детектор P-волны землетрясения (early warning)",
    cluster: "monitor",
    intent: "commercial",
  }} content={pageContent_p_wave_detector} />;
}
