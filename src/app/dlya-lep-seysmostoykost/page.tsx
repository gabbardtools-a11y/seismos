/**
 * SEO-страница: Сейсмостойкость ЛЭП и подстанций
 * Кластер: industry
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.014787+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_dlya_lep_seysmostoykost } from "@/content/seo/dlya-lep-seysmostoykost";

export const metadata = {
  title: "Сейсмостойкость ЛЭП и подстанций",
  description: "сейсмостойкость ЛЭП подстанций — оформление, цена, сроки. ",
  keywords: "сейсмостойкость ЛЭП подстанций",
  alternates: { canonical: "/dlya-lep-seysmostoykost" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "dlya-lep-seysmostoykost",
    title: "Сейсмостойкость ЛЭП и подстанций",
    cluster: "industry",
    intent: "commercial",
  }} content={pageContent_dlya_lep_seysmostoykost} />;
}
