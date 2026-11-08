/**
 * SEO-страница: Система оповещения о землетрясении
 * Кластер: monitor
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.012250+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_sistema_opovescheniya_o_zemletryasenii } from "@/content/seo/sistema-opovescheniya-o-zemletryasenii";

export const metadata = {
  title: "Система оповещения о землетрясении",
  description: "система оповещения о землетрясении — оформление, цена, сроки. ",
  keywords: "система оповещения о землетрясении",
  alternates: { canonical: "/sistema-opovescheniya-o-zemletryasenii" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "sistema-opovescheniya-o-zemletryasenii",
    title: "Система оповещения о землетрясении",
    cluster: "monitor",
    intent: "commercial",
  }} content={pageContent_sistema_opovescheniya_o_zemletryasenii} />;
}
