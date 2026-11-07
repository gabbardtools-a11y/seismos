/**
 * SEO-страница: Категории грунтов по сейсмическим свойствам
 * Кластер: survey
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.011888+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_kategorii_gruntov_po_seysmicheskim_svoystvam } from "@/content/seo/kategorii-gruntov-po-seysmicheskim-svoystvam";

export const metadata = {
  title: "Категории грунтов по сейсмическим свойствам",
  description: "категории грунтов по сейсмическим свойствам — оформление, цена, сроки. ",
  keywords: "категории грунтов по сейсмическим свойствам",
  alternates: { canonical: "/kategorii-gruntov-po-seysmicheskim-svoystvam" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "kategorii-gruntov-po-seysmicheskim-svoystvam",
    title: "Категории грунтов по сейсмическим свойствам",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_kategorii_gruntov_po_seysmicheskim_svoystvam} />;
}
