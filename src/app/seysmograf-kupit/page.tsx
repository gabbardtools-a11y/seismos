/**
 * SEO-страница: Сейсмограф купить для предприятия
 * Кластер: monitor
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.012505+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmograf_kupit } from "@/content/seo/seysmograf-kupit";

export const metadata = {
  title: "Сейсмограф купить для предприятия",
  description: "сейсмограф купить — оформление, цена, сроки. ",
  keywords: "сейсмограф купить",
  alternates: { canonical: "/seysmograf-kupit" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmograf-kupit",
    title: "Сейсмограф купить для предприятия",
    cluster: "monitor",
    intent: "commercial",
  }} content={pageContent_seysmograf_kupit} />;
}
