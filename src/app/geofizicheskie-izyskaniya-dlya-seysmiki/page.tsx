/**
 * SEO-страница: Геофизические изыскания под сейсмостойкое строительство
 * Кластер: survey
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.010961+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_geofizicheskie_izyskaniya_dlya_seysmiki } from "@/content/seo/geofizicheskie-izyskaniya-dlya-seysmiki";

export const metadata = {
  title: "Геофизические изыскания под сейсмостойкое строительство",
  description: "геофизические изыскания под сейсмику — оформление, цена, сроки. ",
  keywords: "геофизические изыскания под сейсмику",
  alternates: { canonical: "/geofizicheskie-izyskaniya-dlya-seysmiki" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "geofizicheskie-izyskaniya-dlya-seysmiki",
    title: "Геофизические изыскания под сейсмостойкое строительство",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_geofizicheskie_izyskaniya_dlya_seysmiki} />;
}
