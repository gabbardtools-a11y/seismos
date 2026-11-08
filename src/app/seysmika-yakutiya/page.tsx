/**
 * SEO-страница: Сейсмо услуги Якутия
 * Кластер: region
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.016391+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmika_yakutiya } from "@/content/seo/seysmika-yakutiya";

export const metadata = {
  title: "Сейсмо услуги Якутия",
  description: "сейсмостойкость Якутия — оформление, цена, сроки. ",
  keywords: "сейсмостойкость Якутия",
  alternates: { canonical: "/seysmika-yakutiya" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmika-yakutiya",
    title: "Сейсмо услуги Якутия",
    cluster: "region",
    intent: "commercial",
  }} content={pageContent_seysmika_yakutiya} />;
}
