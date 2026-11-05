/**
 * SEO-страница: Расчёт сейсмостойкости оборудования и сооружений
 * Кластер: tests · Intent: commercial
 * Главный ключ: расчёт сейсмостойкости
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_raschet_seysmostoykosti } from "@/content/seo/raschet-seysmostoykosti";

export const metadata = {
  title: "Расчёт сейсмостойкости оборудования и сооружений",
  description: "расчёт сейсмостойкости — оформление, цена, сроки, документы. спектральный метод, ANSYS, Abaqus, конечно-элементная модель",
  keywords: "расчёт сейсмостойкости, спектральный метод, ANSYS, Abaqus, конечно-элементная модель",
  alternates: { canonical: "/raschet-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "raschet-seysmostoykosti",
    title: "Расчёт сейсмостойкости оборудования и сооружений",
    cluster: "tests",
    intent: "commercial",
  }} content={pageContent_raschet_seysmostoykosti} />;
}
