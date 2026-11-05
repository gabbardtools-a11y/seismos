/**
 * SEO-страница: Сейсмические анкеры и крепёж
 * Кластер: iso · Intent: commercial
 * Главный ключ: сейсмические анкеры
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_ankery_seysmicheskie } from "@/content/seo/ankery-seysmicheskie";

export const metadata = {
  title: "Сейсмические анкеры и крепёж",
  description: "сейсмические анкеры — оформление, цена, сроки, документы. химический анкер, распорный, ETA, seismic anchor",
  keywords: "сейсмические анкеры, химический анкер, распорный, ETA, seismic anchor",
  alternates: { canonical: "/ankery-seysmicheskie" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "ankery-seysmicheskie",
    title: "Сейсмические анкеры и крепёж",
    cluster: "iso",
    intent: "commercial",
  }} content={pageContent_ankery_seysmicheskie} />;
}
