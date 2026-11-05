/**
 * SEO-страница: Маятниковые сейсмоизоляторы (FPS)
 * Кластер: iso · Intent: commercial
 * Главный ключ: маятниковые сейсмоизоляторы
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_mayatnikovye_seysmoizolyatory } from "@/content/seo/mayatnikovye-seysmoizolyatory";

export const metadata = {
  title: "Маятниковые сейсмоизоляторы (FPS)",
  description: "маятниковые сейсмоизоляторы — оформление, цена, сроки, документы. FPS, friction pendulum, трение, скольжение",
  keywords: "маятниковые сейсмоизоляторы, FPS, friction pendulum, трение, скольжение",
  alternates: { canonical: "/mayatnikovye-seysmoizolyatory" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "mayatnikovye-seysmoizolyatory",
    title: "Маятниковые сейсмоизоляторы (FPS)",
    cluster: "iso",
    intent: "commercial",
  }} content={pageContent_mayatnikovye_seysmoizolyatory} />;
}
