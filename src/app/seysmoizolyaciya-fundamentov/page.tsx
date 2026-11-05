/**
 * SEO-страница: Сейсмоизоляция фундаментов зданий
 * Кластер: protect · Intent: commercial
 * Главный ключ: сейсмоизоляция фундаментов
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmoizolyaciya_fundamentov } from "@/content/seo/seysmoizolyaciya-fundamentov";

export const metadata = {
  title: "Сейсмоизоляция фундаментов зданий",
  description: "сейсмоизоляция фундаментов — оформление, цена, сроки, документы. базовая изоляция, kinematic, скользящая опора",
  keywords: "сейсмоизоляция фундаментов, базовая изоляция, kinematic, скользящая опора",
  alternates: { canonical: "/seysmoizolyaciya-fundamentov" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmoizolyaciya-fundamentov",
    title: "Сейсмоизоляция фундаментов зданий",
    cluster: "protect",
    intent: "commercial",
  }} content={pageContent_seysmoizolyaciya_fundamentov} />;
}
