/**
 * SEO-страница: Коэффициент K1 сейсмичности — допуск упругих деформаций
 * Кластер: design
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.013819+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_koefficient_k1_seysmika } from "@/content/seo/koefficient-k1-seysmika";

export const metadata = {
  title: "Коэффициент K1 сейсмичности — допуск упругих деформаций",
  description: "коэффициент K1 сейсмичность — оформление, цена, сроки. ",
  keywords: "коэффициент K1 сейсмичность",
  alternates: { canonical: "/koefficient-k1-seysmika" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "koefficient-k1-seysmika",
    title: "Коэффициент K1 сейсмичности — допуск упругих деформаций",
    cluster: "design",
    intent: "commercial",
  }} content={pageContent_koefficient_k1_seysmika} />;
}
