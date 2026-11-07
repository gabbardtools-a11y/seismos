/**
 * SEO-страница: Сейсмическое районирование России
 * Кластер: survey
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.011632+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmicheskoe_rayonirovanie_rossii } from "@/content/seo/seysmicheskoe-rayonirovanie-rossii";

export const metadata = {
  title: "Сейсмическое районирование России",
  description: "сейсмическое районирование России — оформление, цена, сроки. ",
  keywords: "сейсмическое районирование России",
  alternates: { canonical: "/seysmicheskoe-rayonirovanie-rossii" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmicheskoe-rayonirovanie-rossii",
    title: "Сейсмическое районирование России",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_seysmicheskoe_rayonirovanie_rossii} />;
}
