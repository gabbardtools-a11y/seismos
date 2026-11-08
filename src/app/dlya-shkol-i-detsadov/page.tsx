/**
 * SEO-страница: Сейсмостойкость школ и детских садов
 * Кластер: industry
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.015166+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dlya_shkol_i_detsadov } from "@/content/seo/dlya-shkol-i-detsadov";

export const metadata = {
  title: "Сейсмостойкость школ и детских садов",
  description: "сейсмостойкость школ — оформление, цена, сроки. ",
  keywords: "сейсмостойкость школ",
  alternates: { canonical: "/dlya-shkol-i-detsadov" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dlya-shkol-i-detsadov",
    title: "Сейсмостойкость школ и детских садов",
    cluster: "industry",
    intent: "commercial",
  }} content={pageContent_dlya_shkol_i_detsadov} />;
}
