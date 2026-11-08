/**
 * SEO-страница: Сейсмомониторинг зданий и сооружений (SHM)
 * Кластер: monitor
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.012000+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmomonitoring_zdaniy } from "@/content/seo/seysmomonitoring-zdaniy";

export const metadata = {
  title: "Сейсмомониторинг зданий и сооружений (SHM)",
  description: "сейсмомониторинг зданий — оформление, цена, сроки. ",
  keywords: "сейсмомониторинг зданий",
  alternates: { canonical: "/seysmomonitoring-zdaniy" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmomonitoring-zdaniy",
    title: "Сейсмомониторинг зданий и сооружений (SHM)",
    cluster: "monitor",
    intent: "commercial",
  }} content={pageContent_seysmomonitoring_zdaniy} />;
}
