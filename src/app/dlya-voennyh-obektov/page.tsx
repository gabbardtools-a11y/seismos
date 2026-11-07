/**
 * SEO-страница: Сейсмостойкость военных объектов
 * Кластер: industry
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.015387+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dlya_voennyh_obektov } from "@/content/seo/dlya-voennyh-obektov";

export const metadata = {
  title: "Сейсмостойкость военных объектов",
  description: "сейсмостойкость военных объектов — оформление, цена, сроки. ",
  keywords: "сейсмостойкость военных объектов",
  alternates: { canonical: "/dlya-voennyh-obektov" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dlya-voennyh-obektov",
    title: "Сейсмостойкость военных объектов",
    cluster: "industry",
    intent: "commercial",
  }} content={pageContent_dlya_voennyh_obektov} />;
}
