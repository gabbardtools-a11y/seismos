/**
 * SEO-страница: IoT-система сейсмомониторинга на объектах
 * Кластер: monitor
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.012979+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_ioT_seysmomonitoring } from "@/content/seo/ioT-seysmomonitoring";

export const metadata = {
  title: "IoT-система сейсмомониторинга на объектах",
  description: "IoT сейсмомониторинг — оформление, цена, сроки. ",
  keywords: "IoT сейсмомониторинг",
  alternates: { canonical: "/ioT-seysmomonitoring" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "ioT-seysmomonitoring",
    title: "IoT-система сейсмомониторинга на объектах",
    cluster: "monitor",
    intent: "commercial",
  }} content={pageContent_ioT_seysmomonitoring} />;
}
