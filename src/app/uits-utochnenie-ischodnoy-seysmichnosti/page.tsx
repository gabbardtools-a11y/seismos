/**
 * SEO-страница: Уточнение исходной сейсмичности (УИС)
 * Кластер: survey
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.010791+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_uits_utochnenie_ischodnoy_seysmichnosti } from "@/content/seo/uits-utochnenie-ischodnoy-seysmichnosti";

export const metadata = {
  title: "Уточнение исходной сейсмичности (УИС)",
  description: "уточнение исходной сейсмичности — оформление, цена, сроки. УИС, карта ОСР, PGA, детерминистическая оценка",
  keywords: "уточнение исходной сейсмичности, УИС, карта ОСР, PGA, детерминистическая оценка",
  alternates: { canonical: "/uits-utochnenie-ischodnoy-seysmichnosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "uits-utochnenie-ischodnoy-seysmichnosti",
    title: "Уточнение исходной сейсмичности (УИС)",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_uits_utochnenie_ischodnoy_seysmichnosti} />;
}
