/**
 * SEO-страница: Проектирование в сейсмических районах
 * Кластер: design
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.013231+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_proektirovanie_v_seysmicheskih_rayonah } from "@/content/seo/proektirovanie-v-seysmicheskih-rayonah";

export const metadata = {
  title: "Проектирование в сейсмических районах",
  description: "проектирование в сейсмических районах — оформление, цена, сроки. ",
  keywords: "проектирование в сейсмических районах",
  alternates: { canonical: "/proektirovanie-v-seysmicheskih-rayonah" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "proektirovanie-v-seysmicheskih-rayonah",
    title: "Проектирование в сейсмических районах",
    cluster: "design",
    intent: "commercial",
  }} content={pageContent_proektirovanie_v_seysmicheskih_rayonah} />;
}
