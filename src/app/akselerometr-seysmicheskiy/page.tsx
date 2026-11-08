/**
 * SEO-страница: Сейсмические акселерометры и регистраторы
 * Кластер: monitor
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.012623+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_akselerometr_seysmicheskiy } from "@/content/seo/akselerometr-seysmicheskiy";

export const metadata = {
  title: "Сейсмические акселерометры и регистраторы",
  description: "сейсмический акселерометр — оформление, цена, сроки. ",
  keywords: "сейсмический акселерометр",
  alternates: { canonical: "/akselerometr-seysmicheskiy" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "akselerometr-seysmicheskiy",
    title: "Сейсмические акселерометры и регистраторы",
    cluster: "monitor",
    intent: "commercial",
  }} content={pageContent_akselerometr_seysmicheskiy} />;
}
