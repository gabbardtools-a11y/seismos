/**
 * SEO-страница: Повышение квалификации по сейсмостойкому строительству
 * Кластер: design
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.014100+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_povyshenie_kvalifikacii_seysmika } from "@/content/seo/povyshenie-kvalifikacii-seysmika";

export const metadata = {
  title: "Повышение квалификации по сейсмостойкому строительству",
  description: "повышение квалификации сейсмостойкое строительство — оформление, цена, сроки. ",
  keywords: "повышение квалификации сейсмостойкое строительство",
  alternates: { canonical: "/povyshenie-kvalifikacii-seysmika" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "povyshenie-kvalifikacii-seysmika",
    title: "Повышение квалификации по сейсмостойкому строительству",
    cluster: "design",
    intent: "commercial",
  }} content={pageContent_povyshenie_kvalifikacii_seysmika} />;
}
