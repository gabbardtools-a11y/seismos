/**
 * SEO-страница: Инженерно-геологические изыскания в сейсмических районах
 * Кластер: survey
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.011142+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_inzhenerno_geologicheskie_izyskaniya_seysmika } from "@/content/seo/inzhenerno-geologicheskie-izyskaniya-seysmika";

export const metadata = {
  title: "Инженерно-геологические изыскания в сейсмических районах",
  description: "инженерно-геологические изыскания сейсмика — оформление, цена, сроки. ",
  keywords: "инженерно-геологические изыскания сейсмика",
  alternates: { canonical: "/inzhenerno-geologicheskie-izyskaniya-seysmika" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "inzhenerno-geologicheskie-izyskaniya-seysmika",
    title: "Инженерно-геологические изыскания в сейсмических районах",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_inzhenerno_geologicheskie_izyskaniya_seysmika} />;
}
