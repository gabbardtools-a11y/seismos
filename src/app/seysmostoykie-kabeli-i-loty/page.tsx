/**
 * SEO-страница: Сейсмостойкие кабели, лотки и опоры
 * Кластер: iso · Intent: commercial
 * Главный ключ: сейсмостойкие кабели
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmostoykie_kabeli_i_loty } from "@/content/seo/seysmostoykie-kabeli-i-loty";

export const metadata = {
  title: "Сейсмостойкие кабели, лотки и опоры",
  description: "сейсмостойкие кабели — оформление, цена, сроки, документы. кабельная продукция, лотки, опоры ЛЭП, кабель-канал",
  keywords: "сейсмостойкие кабели, кабельная продукция, лотки, опоры ЛЭП, кабель-канал",
  alternates: { canonical: "/seysmostoykie-kabeli-i-loty" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmostoykie-kabeli-i-loty",
    title: "Сейсмостойкие кабели, лотки и опоры",
    cluster: "iso",
    intent: "commercial",
  }} content={pageContent_seysmostoykie_kabeli_i_loty} />;
}
