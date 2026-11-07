/**
 * SEO-страница: Оборудование для сейсмомониторинга объектов
 * Кластер: monitor
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.013110+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_oborudovanie_seysmomonitoringa } from "@/content/seo/oborudovanie-seysmomonitoringa";

export const metadata = {
  title: "Оборудование для сейсмомониторинга объектов",
  description: "обортдование сейсмомониторинга — оформление, цена, сроки. ",
  keywords: "обортдование сейсмомониторинга",
  alternates: { canonical: "/oborudovanie-seysmomonitoringa" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "oborudovanie-seysmomonitoringa",
    title: "Оборудование для сейсмомониторинга объектов",
    cluster: "monitor",
    intent: "commercial",
  }} content={pageContent_oborudovanie_seysmomonitoringa} />;
}
