/**
 * SEO-страница: Сейсмо услуги Байкальская зона
 * Кластер: region
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.016512+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_seysmika_baykal } from "@/content/seo/seysmika-baykal";

export const metadata = {
  title: "Сейсмо услуги Байкальская зона",
  description: "сейсмостойкость Байкал — оформление, цена, сроки. ",
  keywords: "сейсмостойкость Байкал",
  alternates: { canonical: "/seysmika-baykal" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "seysmika-baykal",
    title: "Сейсмо услуги Байкальская зона",
    cluster: "region",
    intent: "commercial",
  }} content={pageContent_seysmika_baykal} />;
}
