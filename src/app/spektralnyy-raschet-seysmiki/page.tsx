/**
 * SEO-страница: Спектральный метод расчёта сейсмических нагрузок
 * Кластер: tests · Intent: info
 * Главный ключ: спектральный метод сейсмостойкости
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_spektralnyy_raschet_seysmiki } from "@/content/seo/spektralnyy-raschet-seysmiki";

export const metadata = {
  title: "Спектральный метод расчёта сейсмических нагрузок",
  description: "спектральный метод сейсмостойкости — оформление, цена, сроки, документы. response spectrum, модальный анализ, СП 14.13330",
  keywords: "спектральный метод сейсмостойкости, response spectrum, модальный анализ, СП 14.13330",
  alternates: { canonical: "/raschet-seysmostoykosti" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "spektralnyy-raschet-seysmiki",
    title: "Спектральный метод расчёта сейсмических нагрузок",
    cluster: "tests",
    intent: "info",
  }} content={pageContent_spektralnyy_raschet_seysmiki} />;
}
