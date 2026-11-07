/**
 * SEO-страница: Как выбрать лабораторию по сейсмостойкости
 * Кластер: faq
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.018204+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_kak_vybrat_laboratoriyu_seysmiki } from "@/content/seo/kak-vybrat-laboratoriyu-seysmiki";

export const metadata = {
  title: "Как выбрать лабораторию по сейсмостойкости",
  description: "выбор лаборатории сейсмостойкости — оформление, цена, сроки. ",
  keywords: "выбор лаборатории сейсмостойкости",
  alternates: { canonical: "/kak-vybrat-laboratoriyu-seysmiki" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "kak-vybrat-laboratoriyu-seysmiki",
    title: "Как выбрать лабораторию по сейсмостойкости",
    cluster: "faq",
    intent: "commercial",
  }} content={pageContent_kak_vybrat_laboratoriyu_seysmiki} />;
}
