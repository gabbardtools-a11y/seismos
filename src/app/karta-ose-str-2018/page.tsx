/**
 * SEO-страница: Карты ОСР-2018 — общее сейсмическое районирование
 * Кластер: survey
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.011390+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_karta_ose_str_2018 } from "@/content/seo/karta-ose-str-2018";

export const metadata = {
  title: "Карты ОСР-2018 — общее сейсмическое районирование",
  description: "карты ОСР-2018 — оформление, цена, сроки. ",
  keywords: "карты ОСР-2018",
  alternates: { canonical: "/karta-ose-str-2018" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "karta-ose-str-2018",
    title: "Карты ОСР-2018 — общее сейсмическое районирование",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_karta_ose_str_2018} />;
}
