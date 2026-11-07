/**
 * SEO-страница: Балловка сейсмичности площадки по MSK-64
 * Кластер: survey
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.011754+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_ballovka_seysmichnosti } from "@/content/seo/ballovka-seysmichnosti";

export const metadata = {
  title: "Балловка сейсмичности площадки по MSK-64",
  description: "балловка сейсмичности MSK-64 — оформление, цена, сроки. ",
  keywords: "балловка сейсмичности MSK-64",
  alternates: { canonical: "/ballovka-seysmichnosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "ballovka-seysmichnosti",
    title: "Балловка сейсмичности площадки по MSK-64",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_ballovka_seysmichnosti} />;
}
