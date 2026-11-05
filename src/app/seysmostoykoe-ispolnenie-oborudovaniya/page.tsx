/**
 * SEO-страница: Сейсмостойкое исполнение оборудования
 * Кластер: cert · Intent: commercial
 * Главный ключ: сейсмостойкое исполнение оборудования
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmostoykoe_ispolnenie_oborudovaniya } from "@/content/seo/seysmostoykoe-ispolnenie-oborudovaniya";

export const metadata = {
  title: "Сейсмостойкое исполнение оборудования",
  description: "сейсмостойкое исполнение оборудования — оформление, цена, сроки, документы. группа механического исполнения, ГОСТ 17516.1, категория I, категория II",
  keywords: "сейсмостойкое исполнение оборудования, группа механического исполнения, ГОСТ 17516.1, категория I, категория II",
  alternates: { canonical: "/seysmostoykoe-ispolnenie-oborudovaniya" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmostoykoe-ispolnenie-oborudovaniya",
    title: "Сейсмостойкое исполнение оборудования",
    cluster: "cert",
    intent: "commercial",
  }} content={pageContent_seysmostoykoe_ispolnenie_oborudovaniya} />;
}
