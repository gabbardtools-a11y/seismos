/**
 * SEO-страница: Сертификат сейсмоустойчивости оборудования и материалов
 * Кластер: cert · Intent: commercial
 * Главный ключ: сертификат сейсмоустойчивости
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_sertifikat_seysmoustoychivosti } from "@/content/seo/sertifikat-seysmoustoychivosti";

export const metadata = {
  title: "Сертификат сейсмоустойчивости оборудования и материалов",
  description: "сертификат сейсмоустойчивости — оформление, цена, сроки, документы. сейсмоустойчивое исполнение, добровольный сертификат, сейсмическая устойчивость",
  keywords: "сертификат сейсмоустойчивости, сейсмоустойчивое исполнение, добровольный сертификат, сейсмическая устойчивость",
  alternates: { canonical: "/sertifikat-seysmoustoychivosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "sertifikat-seysmoustoychivosti",
    title: "Сертификат сейсмоустойчивости оборудования и материалов",
    cluster: "cert",
    intent: "commercial",
  }} content={pageContent_sertifikat_seysmoustoychivosti} />;
}
