/**
 * SEO-страница: Сейсмические демпферы и гасители колебаний
 * Кластер: protect · Intent: commercial
 * Главный ключ: сейсмические демпферы
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dempery_seysmicheskie } from "@/content/seo/dempery-seysmicheskie";

export const metadata = {
  title: "Сейсмические демпферы и гасители колебаний",
  description: "сейсмические демпферы — оформление, цена, сроки, документы. гаситель колебаний, viscous damper, TMD, MR damper",
  keywords: "сейсмические демпферы, гаситель колебаний, viscous damper, TMD, MR damper",
  alternates: { canonical: "/dempery-seysmicheskie" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dempery-seysmicheskie",
    title: "Сейсмические демпферы и гасители колебаний",
    cluster: "protect",
    intent: "commercial",
  }} content={pageContent_dempery_seysmicheskie} />;
}
