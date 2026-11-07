/**
 * SEO-страница: Сейсмическое микрорайонирование (СМР) площадки
 * Кластер: survey
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.010553+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmicheskoe_mikroraionirovanie } from "@/content/seo/seysmicheskoe-mikroraionirovanie";

export const metadata = {
  title: "Сейсмическое микрорайонирование (СМР) площадки",
  description: "сейсмическое микрорайонирование — оформление, цена, сроки. СМР, УИС, исходная сейсмичность, СП 14.13330",
  keywords: "сейсмическое микрорайонирование, СМР, УИС, исходная сейсмичность, СП 14.13330",
  alternates: { canonical: "/seysmicheskoe-mikroraionirovanie" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmicheskoe-mikroraionirovanie",
    title: "Сейсмическое микрорайонирование (СМР) площадки",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_seysmicheskoe_mikroraionirovanie} />;
}
