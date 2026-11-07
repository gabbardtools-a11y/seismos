/**
 * SEO-страница: Датчики землетрясений для зданий
 * Кластер: monitor
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.012382+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_datchiki_zemletryaseniy } from "@/content/seo/datchiki-zemletryaseniy";

export const metadata = {
  title: "Датчики землетрясений для зданий",
  description: "датчики землетрясений — оформление, цена, сроки. ",
  keywords: "датчики землетрясений",
  alternates: { canonical: "/datchiki-zemletryaseniy" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "datchiki-zemletryaseniy",
    title: "Датчики землетрясений для зданий",
    cluster: "monitor",
    intent: "commercial",
  }} content={pageContent_datchiki_zemletryaseniy} />;
}
