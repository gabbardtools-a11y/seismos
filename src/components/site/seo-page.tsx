/**
 * SeoPage — общий шаблон для SEO-страниц платных сейсмо-услуг.
 *
 * Принимает meta (slug, title, cluster, intent) и content (массив секций).
 * Рендерит в едином стиле:
 *   - SiteHeader с шапкой сайта
 *   - breadcrumb с навигацией
 *   - hero (h1 + подзаголовок + eyebrow)
 *   - оглавление (быстрая навигация по якорям)
 *   - секции контента (H2 + абзацы/списки/таблицы)
 *   - FAQ-блок (если есть)
 *   - CTA-блок
 *   - SEO-абзац снизу
 *
 * Контент страниц лежит в src/content/seo/<slug>.ts
 */
import Link from "next/link";
import { ArrowLeft, FileText, ChevronRight, Award, Link2 } from "lucide-react";

import { SiteHeader } from "./site-header";

export type SeoSection = {
  id: string;
  title: string;
  /** HTML-контент секции (абзацы, списки, таблицы). */
  body: string;
};

export type SeoFaqItem = { q: string; a: string };

export type SeoContent = {
  intro: string;
  sections: SeoSection[];
  faq?: SeoFaqItem[];
  seoParagraph?: string;
  ctaTitle?: string;
  ctaText?: string;
  /** Связанные страницы для блока «Смотрите также» (перелинковка). */
  related?: { label: string; href: string }[];
};

export type SeoMeta = {
  slug: string;
  title: string;
  cluster: string;
  intent: string;
};

const CLUSTER_LABELS: Record<string, string> = {
  cert: "Сертификация",
  tests: "Испытания и расчёты",
  survey: "Обследование и изыскания",
  protect: "Сейсмозащита и усиление",
  iso: "Сейсмоизоляторы и материалы",
  monitor: "Мониторинг и оповещение",
  design: "Проектирование и консалтинг",
  industry: "Отраслевые решения",
  region: "Региональные услуги",
  faq: "Частые вопросы",
};

export function SeoPage({ meta, content }: { meta: SeoMeta; content: SeoContent }) {
  const clusterLabel = CLUSTER_LABELS[meta.cluster] ?? "Услуги";

  // JSON-LD: BreadcrumbList — хлебные крошки для поисковиков
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://seismos.ru/" },
      { "@type": "ListItem", position: 2, name: clusterLabel, item: `https://seismos.ru/sertifikaty` },
      { "@type": "ListItem", position: 3, name: meta.title, item: `https://seismos.ru/${meta.slug}` },
    ],
  };

  // JSON-LD: FAQPage — частые вопросы для rich snippets
  const faqLd = content.faq && content.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  } : null;

  return (
    <main className="min-h-screen bg-white">
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* JSON-LD: FAQPage (если есть FAQ) */}
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Хлебные крошки */}
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold flex-wrap">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <Link href="/sertifikaty" className="hover:text-[#00549F]">
            {clusterLabel}
          </Link>
          <ChevronRight className="h-3 w-3 text-[#D6DCE3]" />
          <span className="text-[#003366] truncate max-w-[60%]">{meta.title}</span>
        </div>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#22C55E]" />
            <span className="eyebrow text-[#2D5F3F]">{clusterLabel}</span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-4 flex items-start gap-3">
            <Award className="h-9 w-9 text-[#00549F] flex-none mt-1" />
            <span>{meta.title}</span>
          </h1>
          <div
            className="text-base sm:text-lg text-[#4A6378] leading-relaxed [&_p]:mb-4 [&_strong]:text-[#003366] [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: content.intro }}
          />
        </div>

        {/* Оглавление */}
        {content.sections.length > 0 && (
          <div className="bg-[#F8FBF9] border border-[#D6DCE3] rounded-2xl p-5 mb-10">
            <p className="text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-bold mb-3">
              Что в этой статье
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-[#00549F]">
              {content.sections.map((s) => (
                <li key={s.id}>
                  →{" "}
                  <a href={`#${s.id}`} className="hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
              {content.faq && content.faq.length > 0 && (
                <li>
                  → <a href="#faq" className="hover:underline">Частые вопросы</a>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Секции */}
        {content.sections.map((s) => (
          <section key={s.id} id={s.id} className="mb-10 scroll-mt-24">
            <h2 className="text-[22px] sm:text-[26px] font-bold text-[#003366] mb-4 flex items-center gap-2.5 leading-tight">
              <span className="text-[#00549F] flex-none">
                <FileText className="h-5 w-5" />
              </span>
              {s.title}
            </h2>
            <div
              className="text-[15px] text-[#4A6378] leading-relaxed [&_p]:mb-4 [&_strong]:text-[#003366] [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:my-3 [&_h3]:text-[18px] [&_h3]:font-bold [&_h3]:text-[#003366] [&_h3]:mt-6 [&_h3]:mb-2 [&_table]:w-full [&_table]:text-sm [&_table]:border [&_table]:border-[#D6DCE3] [&_table]:rounded [&_table]:overflow-hidden [&_th]:bg-[#F8FBF9] [&_th]:border [&_th]:border-[#D6DCE3] [&_th]:p-2 [&_th]:text-left [&_th]:font-bold [&_th]:text-[#4A6378] [&_td]:border [&_td]:border-[#E7EEF6] [&_td]:p-2 [&_td]:align-top"
              dangerouslySetInnerHTML={{ __html: s.body }}
            />
          </section>
        ))}

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section id="faq" className="mb-10 scroll-mt-24">
            <h2 className="text-[22px] sm:text-[26px] font-bold text-[#003366] mb-4 flex items-center gap-2.5 leading-tight">
              <span className="text-[#00549F] flex-none">
                <FileText className="h-5 w-5" />
              </span>
              Частые вопросы
            </h2>
            <div className="space-y-0">
              {content.faq.map((item, i) => (
                <div key={i} className="border-b border-[#D6DCE3] py-4 last:border-b-0">
                  <h3 className="text-[15px] font-bold text-[#003366] mb-2 leading-snug">
                    {item.q}
                  </h3>
                  <p className="text-[14px] text-[#4A6378] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-[#003366] to-[#00549F] rounded-2xl p-8 text-white">
          <h2 className="text-[24px] sm:text-[28px] font-bold mb-3">
            {content.ctaTitle ?? "Нужна помощь по сейсмостойкости?"}
          </h2>
          <p className="text-white/85 mb-6 leading-relaxed">
            {content.ctaText ??
              "Подскажем по нормативной базе, поможем с испытаниями, расчётом или оформлением документов. Бесплатная первичная консультация."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#contacts"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white text-[#003366] px-6 text-[13px] tracking-[0.14em] uppercase font-semibold hover:bg-white/90 transition-colors"
            >
              Получить консультацию
            </Link>
            <Link
              href="/seismo_sertifikat"
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-white/40 text-white px-6 text-[13px] tracking-[0.14em] uppercase font-semibold hover:bg-white/10 transition-colors"
            >
              Сертификат сейсмостойкости
            </Link>
          </div>
        </div>

        {/* Смотрите также — перелинковка между SEO-страницами */}
        {content.related && content.related.length > 0 && (
          <div className="mt-10 mb-10 bg-[#F8FBF9] border border-[#D6DCE3] rounded-2xl p-5">
            <h2 className="text-[18px] font-bold text-[#003366] mb-3 flex items-center gap-2">
              <Link2 className="h-5 w-5 text-[#00549F]" />
              Смотрите также
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {content.related.map((r, i) => (
                <Link
                  key={i}
                  href={r.href}
                  className="flex items-center gap-2 px-3 py-2 text-[13px] text-[#00549F] hover:text-[#003366] hover:bg-[#E7EEF6] rounded transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5 flex-none" />
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SEO-блок */}
        {content.seoParagraph && (
          <div className="mt-10 prose prose-slate max-w-none text-[#4A6378]">
            <div
              className="leading-relaxed [&_strong]:text-[#003366] [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: content.seoParagraph }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
