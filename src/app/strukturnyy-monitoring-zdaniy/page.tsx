/**
 * SEO-страница: Структурный мониторинг (Structural Health Monitoring)
 * Кластер: monitor
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.012140+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_strukturnyy_monitoring_zdaniy } from "@/content/seo/strukturnyy-monitoring-zdaniy";

export const metadata = {
  title: "Структурный мониторинг (Structural Health Monitoring)",
  description: "структурный мониторинг зданий — оформление, цена, сроки. ",
  keywords: "структурный мониторинг зданий",
  alternates: { canonical: "/strukturnyy-monitoring-zdaniy" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "strukturnyy-monitoring-zdaniy",
    title: "Структурный мониторинг (Structural Health Monitoring)",
    cluster: "monitor",
    intent: "commercial",
  }} content={pageContent_strukturnyy_monitoring_zdaniy} />;
}
