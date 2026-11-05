/**
 * SEO-страница: Паспорт здания, сооружения, материала. Паспортизация. 3D-модель формат STP
 */
import { SeoPage } from "@/components/site/seo-page";
import { pageContent_passport_3d_stp } from "@/content/seo/passport-3d-stp";

export const metadata = {
  title: "Паспорт здания, сооружения, материала. Паспортизация. 3D-модель формат STP",
  description: "Паспорт здания, сооружения, материала с 3D-моделью в формате STP. Паспортизация объектов сейсмостойкости. Цены, сроки, документы, ГОСТы.",
  keywords: "паспорт здания, паспорт сооружения, паспорт материала, паспортизация, 3D-модель, STP, STEP, формат stp, 3D-модель здания, цифровая модель здания, ЦММ, BIM, паспорт сейсмостойкости, цифровой двойник здания",
  alternates: { canonical: "/passport-3d-stp" },
};

export default function Page() {
  return <SeoPage meta={{
    slug: "passport-3d-stp",
    title: "Паспорт здания, сооружения, материала. Паспортизация. 3D-модель формат STP",
    cluster: "survey",
    intent: "commercial",
  }} content={pageContent_passport_3d_stp} />;
}
