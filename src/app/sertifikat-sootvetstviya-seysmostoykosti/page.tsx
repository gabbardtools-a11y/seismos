/**
 * SEO-страница: Сертификат соответствия сейсмостойкости ГОСТ Р
 * Кластер: cert · Intent: commercial
 * Главный ключ: сертификат соответствия сейсмостойкости
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_sertifikat_sootvetstviya_seysmostoykosti } from "@/content/seo/sertifikat-sootvetstviya-seysmostoykosti";

export const metadata = {
  title: "Сертификат соответствия сейсмостойкости ГОСТ Р",
  description: "сертификат соответствия сейсмостойкости — оформление, цена, сроки, документы. система ГОСТ Р, аккредитованный орган, реестр Росаккредитации",
  keywords: "сертификат соответствия сейсмостойкости, система ГОСТ Р, аккредитованный орган, реестр Росаккредитации",
  alternates: { canonical: "/sertifikat-sootvetstviya-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "sertifikat-sootvetstviya-seysmostoykosti",
    title: "Сертификат соответствия сейсмостойкости ГОСТ Р",
    cluster: "cert",
    intent: "commercial",
  }} content={pageContent_sertifikat_sootvetstviya_seysmostoykosti} />;
}
