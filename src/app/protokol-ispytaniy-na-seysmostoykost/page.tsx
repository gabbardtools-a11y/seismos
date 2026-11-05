/**
 * SEO-страница: Протокол испытаний на сейсмостойкость
 * Кластер: cert · Intent: commercial
 * Главный ключ: протокол испытаний на сейсмостойкость
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_protokol_ispytaniy_na_seysmostoykost } from "@/content/seo/protokol-ispytaniy-na-seysmostoykost";

export const metadata = {
  title: "Протокол испытаний на сейсмостойкость",
  description: "протокол испытаний на сейсмостойкость — оформление, цена, сроки, документы. лабораторный протокол, аккредитованная лаборатория, вибростенд",
  keywords: "протокол испытаний на сейсмостойкость, лабораторный протокол, аккредитованная лаборатория, вибростенд",
  alternates: { canonical: "/protokol-ispytaniy-na-seysmostoykost" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "protokol-ispytaniy-na-seysmostoykost",
    title: "Протокол испытаний на сейсмостойкость",
    cluster: "cert",
    intent: "commercial",
  }} content={pageContent_protokol_ispytaniy_na_seysmostoykost} />;
}
