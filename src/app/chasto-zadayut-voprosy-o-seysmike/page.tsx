/**
 * SEO-страница: Частые вопросы о сейсмостойкости
 * Кластер: faq
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.016887+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_chasto_zadayut_voprosy_o_seysmike } from "@/content/seo/chasto-zadayut-voprosy-o-seysmike";

export const metadata = {
  title: "Частые вопросы о сейсмостойкости",
  description: "вопросы о сейсмостойкости — оформление, цена, сроки. ",
  keywords: "вопросы о сейсмостойкости",
  alternates: { canonical: "/chasto-zadayut-voprosy-o-seysmike" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "chasto-zadayut-voprosy-o-seysmike",
    title: "Частые вопросы о сейсмостойкости",
    cluster: "faq",
    intent: "commercial",
  }} content={pageContent_chasto_zadayut_voprosy_o_seysmike} />;
}
