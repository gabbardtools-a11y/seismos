/**
 * SEO-страница: Антисейсмические мероприятия при строительстве
 * Кластер: protect · Intent: info
 * Главный ключ: антисейсмические мероприятия
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_antiseysmicheskie_meropriyatiya } from "@/content/seo/antiseysmicheskie-meropriyatiya";

export const metadata = {
  title: "Антисейсмические мероприятия при строительстве",
  description: "антисейсмические мероприятия — оформление, цена, сроки, документы. сейсмозащита, превентивные меры, СП 14.13330",
  keywords: "антисейсмические мероприятия, сейсмозащита, превентивные меры, СП 14.13330",
  alternates: { canonical: "/antiseysmicheskie-meropriyatiya" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "antiseysmicheskie-meropriyatiya",
    title: "Антисейсмические мероприятия при строительстве",
    cluster: "protect",
    intent: "info",
  }} content={pageContent_antiseysmicheskie_meropriyatiya} />;
}
