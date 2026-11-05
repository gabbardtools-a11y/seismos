/**
 * SEO-страница: Сейсмоизоляторы купить с монтажом
 * Кластер: iso · Intent: commercial
 * Главный ключ: сейсмоизоляторы купить
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmoizolyatory_kupit } from "@/content/seo/seysmoizolyatory-kupit";

export const metadata = {
  title: "Сейсмоизоляторы купить с монтажом",
  description: "сейсмоизоляторы купить — оформление, цена, сроки, документы. цена, производитель, поставка, монтаж",
  keywords: "сейсмоизоляторы купить, цена, производитель, поставка, монтаж",
  alternates: { canonical: "/seysmoizolyatory-kupit" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmoizolyatory-kupit",
    title: "Сейсмоизоляторы купить с монтажом",
    cluster: "iso",
    intent: "commercial",
  }} content={pageContent_seysmoizolyatory_kupit} />;
}
