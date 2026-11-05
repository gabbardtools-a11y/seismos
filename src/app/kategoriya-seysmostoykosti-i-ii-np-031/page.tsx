/**
 * SEO-страница: Категория сейсмостойкости I и II по НП-031-01 для АЭС
 * Кластер: cert · Intent: commercial
 * Главный ключ: категория сейсмостойкости I II НП-031-01
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_kategoriya_seysmostoykosti_i_ii_np_031 } from "@/content/seo/kategoriya-seysmostoykosti-i-ii-np-031";

export const metadata = {
  title: "Категория сейсмостойкости I и II по НП-031-01 для АЭС",
  description: "категория сейсмостойкости I II НП-031-01 — оформление, цена, сроки, документы. оборудование АЭС, атомные станции, сейсмостойкость核电",
  keywords: "категория сейсмостойкости I II НП-031-01, оборудование АЭС, атомные станции, сейсмостойкость核电",
  alternates: { canonical: "/kategoriya-seysmostoykosti-i-ii-np-031" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "kategoriya-seysmostoykosti-i-ii-np-031",
    title: "Категория сейсмостойкости I и II по НП-031-01 для АЭС",
    cluster: "cert",
    intent: "commercial",
  }} content={pageContent_kategoriya_seysmostoykosti_i_ii_np_031} />;
}
