/**
 * SEO-страница: Аудит проектной документации по сейсмике
 * Кластер: design
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.013581+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_audit_proektnoy_dokumentacii_seysmika } from "@/content/seo/audit-proektnoy-dokumentacii-seysmika";

export const metadata = {
  title: "Аудит проектной документации по сейсмике",
  description: "аудит проектной документации сейсмика — оформление, цена, сроки. ",
  keywords: "аудит проектной документации сейсмика",
  alternates: { canonical: "/audit-proektnoy-dokumentacii-seysmika" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "audit-proektnoy-dokumentacii-seysmika",
    title: "Аудит проектной документации по сейсмике",
    cluster: "design",
    intent: "commercial",
  }} content={pageContent_audit_proektnoy_dokumentacii_seysmika} />;
}
