/**
 * SEO-страница: Обследование зданий после землетрясения
 * Кластер: survey · Intent: commercial
 * Главный ключ: обследование после землетрясения
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_monitoring_zdaniy_posle_zemletryaseniysa } from "@/content/seo/monitoring-zdaniy-posle-zemletryaseniysa";

export const metadata = {
  title: "Обследование зданий после землетрясения",
  description: "обследование после землетрясения — оформление, цена, сроки, документы. послеаварийное обследование, разрушения, SAR",
  keywords: "обследование после землетрясения, послеаварийное обследование, разрушения, SAR",
  alternates: { canonical: "/monitoring-zdaniy-posle-zemletryaseniysa" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "monitoring-zdaniy-posle-zemletryaseniysa",
    title: "Обследование зданий после землетрясения",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_monitoring_zdaniy_posle_zemletryaseniysa} />;
}
