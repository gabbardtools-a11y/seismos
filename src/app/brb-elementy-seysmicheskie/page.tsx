/**
 * SEO-страница: BRB-элементы (Buckling-Restrained Braces)
 * Кластер: iso · Intent: commercial
 * Главный ключ: BRB элементы
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_brb_elementy_seysmicheskie } from "@/content/seo/brb-elementy-seysmicheskie";

export const metadata = {
  title: "BRB-элементы (Buckling-Restrained Braces)",
  description: "BRB элементы — оформление, цена, сроки, документы. buckling restrained brace, диафрагма, раскос, энергопоглощение",
  keywords: "BRB элементы, buckling restrained brace, диафрагма, раскос, энергопоглощение",
  alternates: { canonical: "/brb-elementy-seysmicheskie" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "brb-elementy-seysmicheskie",
    title: "BRB-элементы (Buckling-Restrained Braces)",
    cluster: "iso",
    intent: "commercial",
  }} content={pageContent_brb_elementy_seysmicheskie} />;
}
