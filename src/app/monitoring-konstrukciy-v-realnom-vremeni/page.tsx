/**
 * SEO-страница: Мониторинг строительных конструкций в реальном времени
 * Кластер: monitor
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.012850+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_monitoring_konstrukciy_v_realnom_vremeni } from "@/content/seo/monitoring-konstrukciy-v-realnom-vremeni";

export const metadata = {
  title: "Мониторинг строительных конструкций в реальном времени",
  description: "мониторинг конструкций в реальном времени — оформление, цена, сроки. ",
  keywords: "мониторинг конструкций в реальном времени",
  alternates: { canonical: "/monitoring-konstrukciy-v-realnom-vremeni" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "monitoring-konstrukciy-v-realnom-vremeni",
    title: "Мониторинг строительных конструкций в реальном времени",
    cluster: "monitor",
    intent: "commercial",
  }} content={pageContent_monitoring_konstrukciy_v_realnom_vremeni} />;
}
