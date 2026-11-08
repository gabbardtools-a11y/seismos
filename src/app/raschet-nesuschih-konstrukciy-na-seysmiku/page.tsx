/**
 * SEO-страница: Расчёт несущих конструкций на сейсмические воздействия
 * Кластер: design
 * Сгенерирована drip_publish.py: 2026-11-07T21:58:17.013961+00:00
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_raschet_nesuschih_konstrukciy_na_seysmiku } from "@/content/seo/raschet-nesuschih-konstrukciy-na-seysmiku";

export const metadata = {
  title: "Расчёт несущих конструкций на сейсмические воздействия",
  description: "расчёт несущих конструкций на сейсмику — оформление, цена, сроки. ",
  keywords: "расчёт несущих конструкций на сейсмику",
  alternates: { canonical: "/raschet-nesuschih-konstrukciy-na-seysmiku" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "raschet-nesuschih-konstrukciy-na-seysmiku",
    title: "Расчёт несущих конструкций на сейсмические воздействия",
    cluster: "design",
    intent: "commercial",
  }} content={pageContent_raschet_nesuschih_konstrukciy_na_seysmiku} />;
}
