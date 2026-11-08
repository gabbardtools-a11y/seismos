/**
 * SEO-страница: Сейсмостойкость гидротехнических сооружений
 * Кластер: industry
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.015506+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dlya_gidrosooruzheniy } from "@/content/seo/dlya-gidrosooruzheniy";

export const metadata = {
  title: "Сейсмостойкость гидротехнических сооружений",
  description: "сейсмостойкость гидросооружений — оформление, цена, сроки. ",
  keywords: "сейсмостойкость гидросооружений",
  alternates: { canonical: "/dlya-gidrosooruzheniy" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dlya-gidrosooruzheniy",
    title: "Сейсмостойкость гидротехнических сооружений",
    cluster: "industry",
    intent: "commercial",
  }} content={pageContent_dlya_gidrosooruzheniy} />;
}
