/**
 * SEO-страница: Оценка сейсмического риска объекта
 * Кластер: survey · Intent: commercial
 * Главный ключ: оценка сейсмического риска
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_otsenka_seysmicheskogo_riska } from "@/content/seo/otsenka-seysmicheskogo-riska";

export const metadata = {
  title: "Оценка сейсмического риска объекта",
  description: "оценка сейсмического риска — оформление, цена, сроки, документы. риск-анализ, уязвимость, PGA, вероятность превышения",
  keywords: "оценка сейсмического риска, риск-анализ, уязвимость, PGA, вероятность превышения",
  alternates: { canonical: "/otsenka-seysmicheskogo-riska" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "otsenka-seysmicheskogo-riska",
    title: "Оценка сейсмического риска объекта",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_otsenka_seysmicheskogo_riska} />;
}
