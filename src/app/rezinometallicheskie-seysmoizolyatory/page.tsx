/**
 * SEO-страница: Резинометаллические сейсмоизоляторы (LRB, HDRB)
 * Кластер: iso · Intent: commercial
 * Главный ключ: резинометаллические сейсмоизоляторы
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_rezinometallicheskie_seysmoizolyatory } from "@/content/seo/rezinometallicheskie-seysmoizolyatory";

export const metadata = {
  title: "Резинометаллические сейсмоизоляторы (LRB, HDRB)",
  description: "резинометаллические сейсмоизоляторы — оформление, цена, сроки, документы. LRB, HDRB, lead rubber bearing, свинцовый сердечник",
  keywords: "резинометаллические сейсмоизоляторы, LRB, HDRB, lead rubber bearing, свинцовый сердечник",
  alternates: { canonical: "/rezinometallicheskie-seysmoizolyatory" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "rezinometallicheskie-seysmoizolyatory",
    title: "Резинометаллические сейсмоизоляторы (LRB, HDRB)",
    cluster: "iso",
    intent: "commercial",
  }} content={pageContent_rezinometallicheskie_seysmoizolyatory} />;
}
