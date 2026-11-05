/**
 * SEO-страница: Сейсмические испытания оборудования и конструкций
 * Кластер: tests · Intent: commercial
 * Главный ключ: сейсмические испытания
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmicheskie_ispytaniya } from "@/content/seo/seysmicheskie-ispytaniya";

export const metadata = {
  title: "Сейсмические испытания оборудования и конструкций",
  description: "сейсмические испытания — оформление, цена, сроки, документы. испытания по акселерограмме, 5 циклов, трёхкомпонентный стенд",
  keywords: "сейсмические испытания, испытания по акселерограмме, 5 циклов, трёхкомпонентный стенд",
  alternates: { canonical: "/seysmicheskie-ispytaniya" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmicheskie-ispytaniya",
    title: "Сейсмические испытания оборудования и конструкций",
    cluster: "tests",
    intent: "commercial",
  }} content={pageContent_seysmicheskie_ispytaniya} />;
}
