/**
 * SEO-страница: Аудит сейсмической безопасности предприятия
 * Кластер: survey · Intent: commercial
 * Главный ключ: аудит сейсмической безопасности
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_audit_seysmicheskoy_bezopasnosti } from "@/content/seo/audit-seysmicheskoy-bezopasnosti";

export const metadata = {
  title: "Аудит сейсмической безопасности предприятия",
  description: "аудит сейсмической безопасности — оформление, цена, сроки, документы. комплексная проверка, сейсмический аудит, инвентаризация рисков",
  keywords: "аудит сейсмической безопасности, комплексная проверка, сейсмический аудит, инвентаризация рисков",
  alternates: { canonical: "/audit-seysmicheskoy-bezopasnosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "audit-seysmicheskoy-bezopasnosti",
    title: "Аудит сейсмической безопасности предприятия",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_audit_seysmicheskoy_bezopasnosti} />;
}
