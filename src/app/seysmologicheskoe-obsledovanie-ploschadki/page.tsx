/**
 * SEO-страница: Сейсмологическое обследование площадки строительства
 * Кластер: survey
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.011277+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmologicheskoe_obsledovanie_ploschadki } from "@/content/seo/seysmologicheskoe-obsledovanie-ploschadki";

export const metadata = {
  title: "Сейсмологическое обследование площадки строительства",
  description: "сейсмологическое обследование площадки — оформление, цена, сроки. ",
  keywords: "сейсмологическое обследование площадки",
  alternates: { canonical: "/seysmologicheskoe-obsledovanie-ploschadki" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmologicheskoe-obsledovanie-ploschadki",
    title: "Сейсмологическое обследование площадки строительства",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_seysmologicheskoe_obsledovanie_ploschadki} />;
}
