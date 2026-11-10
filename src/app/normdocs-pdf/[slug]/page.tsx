/**
 * Страница нормативного документа с PDF и текстом.
 * URL: /normdocs-pdf/[slug]
 *
 * Особенности:
 * - Значок PDF в правом верхнем углу (скачать оригинал)
 * - Метаданные: код, название, год, область, тип
 * - Структурированный текст: разделы, подразделы
 * - Кросс-ссылки: упоминания ГОСТ/СП/СНиП в тексте → ссылки на /normdocs-pdf/[slug]
 * - Боковая панель с оглавлением (sticky)
 * - SEO: title, description, canonical, JSON-LD CreativeWork
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Download, BookOpen, ExternalLink, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import {
  normDocsFull,
  findDocByCode,
  type NormDocFull,
} from "@/content/seo/normdocs-full";
import { DOMAINS } from "@/components/site/domain-icons";
import fs from "fs";
import path from "path";

type DocData = {
  metadata: { code: string; title: string; year: number | null };
  sections: { number: string; title: string; content: string }[];
  norm_refs: string[];
  stats: { chars: number; lines: number; sections_count: number; norm_refs_count: number };
};

// Список слагов для статической генерации
export function generateStaticParams() {
  return normDocsFull.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = normDocsFull.find((d) => d.slug === params.slug);
  if (!doc) return { title: "Документ не найден" };
  return {
    title: `${doc.code} — ${doc.shortTitle} | PDF скачать`,
    description: `${doc.code} «${doc.title}». ${doc.description} Полный текст документа, скачать PDF.`,
    keywords: `${doc.code}, ${doc.shortTitle}, скачать PDF, текст ГОСТ, нормативный документ`,
    alternates: { canonical: `/normdocs-pdf/${doc.slug}` },
  };
}

// JSON-LD: CreativeWork + BreadcrumbList
function buildJsonLd(doc: NormDocFull, data: DocData) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: doc.code,
    headline: doc.title,
    datePublished: `${doc.year}`,
    description: doc.description,
    url: `https://seismos.ru/normdocs-pdf/${doc.slug}`,
    encodingFormat: "application/pdf",
    encoding: {
      "@type": "MediaObject",
      contentUrl: `https://seismos.ru${doc.pdfPath}`,
      encodingFormat: "application/pdf",
    },
    about: data.sections.slice(0, 5).map((s) => s.title).join("; "),
  };
}

const breadcrumbLd = (doc: NormDocFull) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://seismos.ru/" },
    { "@type": "ListItem", position: 2, name: "Справочники", item: "https://seismos.ru/spravochniki" },
    { "@type": "ListItem", position: 3, name: doc.code, item: `https://seismos.ru/normdocs-pdf/${doc.slug}` },
  ],
});

// Домен-конфигурация
function getDomain(domain: string) {
  return DOMAINS.find((d) => d.id === domain);
}

// Преобразование текста в HTML с кросс-ссылками
function renderTextWithLinks(text: string): string {
  // Экранировать HTML
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Регулярка для поиска ГОСТ/СП/СНиП в тексте
  const refRegex =
    /(ГОСТ\s+(?:Р\s+)?[А-Яа-я]+(?:\s+ISO\s+\d+(?:-\d+)?)?\s*[\d.\-]+(?:-\d+)?|СП\s+\d+\.\d+(?:\.\d+)?|СНиП\s+[IVXLCDM.\d\-]+(?:\*?)|НП\s+\d+(?:-\d+)?|ПНАЭ\s+Г-\d-\d+)/g;

  html = html.replace(refRegex, (match) => {
    const slug = findDocByCode(match);
    if (slug) {
      return `<a href="/normdocs-pdf/${slug}" class="text-[#00549F] font-semibold hover:text-[#003366] underline decoration-[#00549F]/40 underline-offset-2 decoration-dotted">${match}</a>`;
    }
    return match;
  });

  // Перевести \n в <br>
  html = html.replace(/\n/g, "<br/>");
  return html;
}

// Извлечь подзаголовки 1.1, 1.2 — для боковой панели
function extractSubsections(content: string): { num: string; title: string }[] {
  const result: { num: string; title: string }[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const m = line.match(/^(\d+\.\d+(?:\.\d+)?)\s+([А-ЯA-Z][А-Яа-яA-Za-z\s,\.\-:]{5,80}?)$/);
    if (m) {
      result.push({ num: m[1], title: m[2].trim() });
    }
  }
  return result.slice(0, 30);
}

export default function NormDocPage({ params }: { params: { slug: string } }) {
  const doc = normDocsFull.find((d) => d.slug === params.slug);
  if (!doc) notFound();

  // Загрузить JSON с текстом
  const jsonPath = path.join(process.cwd(), doc.jsonPath);
  let data: DocData;
  try {
    const raw = fs.readFileSync(jsonPath, "utf-8");
    data = JSON.parse(raw);
  } catch {
    return (
      <main className="min-h-screen bg-white">
        <SiteHeader />
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-[#003366] mb-4">
            Текст документа не загружен
          </h1>
          <p className="text-[#4A6378] mb-6">
            PDF доступен для скачивания, но текст ещё не извлечён.
          </p>
          <a
            href={doc.pdfPath}
            className="inline-flex items-center gap-2 px-5 h-11 bg-[#00549F] hover:bg-[#003366] text-white rounded-lg"
          >
            <Download className="h-4 w-4" />
            Скачать PDF
          </a>
        </div>
        <SiteFooter />
      </main>
    );
  }

  const domain = getDomain(doc.domain);
  const jsonLd = buildJsonLd(doc, data);
  const bcLd = breadcrumbLd(doc);

  // Список встречающихся нормативных ссылок с их slug (для боковой панели)
  const refs = (data.norm_refs || [])
    .map((ref) => ({ ref, slug: findDocByCode(ref) }))
    .filter((r) => r.slug !== null) as { ref: string; slug: string }[];

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bcLd) }}
      />
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        {/* Хлебные крошки */}
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold flex-wrap">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <Link href="/spravochniki" className="hover:text-[#00549F]">Справочники</Link>
          <span className="text-[#D6DCE3]">·</span>
          <Link href={`/${domain?.id === "seismo" ? "normdocs" : `normdocs-${domain?.id}`}`} className="hover:text-[#00549F]">
            {domain?.name === "Сейсмо" ? "Нормативы по сейсмике" : `Нормативы по ${domain?.name?.toLowerCase()}`}
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">{doc.code}</span>
        </div>

        {/* Hero карточка документа */}
        <div className="relative bg-gradient-to-br from-[#F8FBF9] to-white border border-[#D6DCE3] rounded-2xl p-6 sm:p-8 mb-8 overflow-hidden">
          {/* Значок PDF в правом верхнем углу */}
          <a
            href={doc.pdfPath}
            download
            className="absolute top-5 right-5 sm:top-6 sm:right-6 group flex items-center gap-2 px-4 h-11 bg-[#C8102E] hover:bg-[#7A0A1C] text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            title={`Скачать ${doc.code} в PDF`}
          >
            <FileText className="h-5 w-5 flex-none" />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] tracking-[0.1em] uppercase opacity-80">Скачать</span>
              <span className="text-[13px] font-bold">PDF</span>
            </div>
            <Download className="h-4 w-4 flex-none opacity-80" />
          </a>

          {/* Бейдж типа документа */}
          <div className="flex flex-wrap items-center gap-2 mb-4 pr-32">
            <span className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold tracking-[0.08em] ${domain?.color ? "" : ""} text-white`}
              style={{ backgroundColor: domain?.color || "#00549F" }}
            >
              {doc.type}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold bg-white border border-[#D6DCE3] text-[#4A6378]">
              {doc.category}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold bg-white border border-[#D6DCE3] text-[#4A6378]">
              {doc.year} г.
            </span>
          </div>

          {/* Код и заголовок */}
          <h1 className="text-[24px] sm:text-[32px] lg:text-[36px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 pr-32">
            {doc.code}
          </h1>
          <p className="text-[15px] sm:text-lg text-[#4A6378] leading-relaxed mb-4 pr-32">
            {doc.title}
          </p>
          <p className="text-[14px] text-[#4A6378]/80 leading-relaxed">
            {doc.description}
          </p>

          {/* Метрики */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-[#D6DCE3]/60">
            <Metric value={String(data.stats.sections_count)} label="разделов" />
            <Metric value={String(data.stats.norm_refs_count)} label="норм. ссылок" />
            <Metric value={`${(data.stats.chars / 1000).toFixed(0)}К`} label="символов" />
            <Metric value="PDF" label={`формат`} />
          </div>
        </div>

        {/* Основная сетка: контент + боковая панель */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Контент */}
          <article className="min-w-0">
            {/* Если разделов нет — показать весь текст одним блоком */}
            {data.sections.length === 1 && !data.sections[0].number ? (
              <section className="bg-white border border-[#D6DCE3] rounded-xl p-6 sm:p-8">
                <h2 className="text-[20px] font-bold text-[#003366] mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#00549F]" />
                  Текст документа
                </h2>
                <div
                  className="text-[14px] text-[#4A6378] leading-[1.8] [&_a]:font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: renderTextWithLinks(data.sections[0].content.slice(0, 50000)),
                  }}
                />
                {data.sections[0].content.length > 50000 && (
                  <p className="mt-6 text-center text-[13px] text-[#4A6378]/60 italic">
                    …показаны первые 50К символов. Полный текст — в{" "}
                    <a href={doc.pdfPath} className="text-[#00549F] underline">PDF</a>.
                  </p>
                )}
              </section>
            ) : (
              /* Разделы по отдельности */
              <div className="space-y-6">
                {data.sections.map((section, idx) => {
                  const id = section.number
                    ? `section-${section.number}`
                    : `section-${idx}`;
                  return (
                    <section
                      key={idx}
                      id={id}
                      className="bg-white border border-[#D6DCE3] rounded-xl p-6 sm:p-8 scroll-mt-24"
                    >
                      <h2 className="text-[18px] sm:text-[20px] font-bold text-[#003366] mb-4 flex items-baseline gap-3">
                        {section.number && (
                          <span className="text-[#00549F] flex-none">{section.number}.</span>
                        )}
                        <span>{section.title}</span>
                      </h2>
                      <div
                        className="text-[14px] text-[#4A6378] leading-[1.8] [&_a]:font-semibold"
                        dangerouslySetInnerHTML={{
                          __html: renderTextWithLinks(section.content.slice(0, 30000)),
                        }}
                      />
                      {section.content.length > 30000 && (
                        <p className="mt-4 text-[13px] text-[#4A6378]/60 italic">
                          …продолжение в PDF ({(section.content.length / 1000).toFixed(0)}К символов в разделе).
                        </p>
                      )}
                    </section>
                  );
                })}
              </div>
            )}
          </article>

          {/* Боковая панель */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              {/* Кнопка скачать PDF */}
              <a
                href={doc.pdfPath}
                download
                className="flex items-center justify-between gap-3 p-4 bg-[#C8102E] hover:bg-[#7A0A1C] text-white rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 flex-none" />
                  <div className="leading-tight">
                    <div className="text-[10px] tracking-[0.1em] uppercase opacity-80">Скачать</div>
                    <div className="text-[15px] font-bold">Оригинал PDF</div>
                  </div>
                </div>
                <Download className="h-5 w-5 flex-none" />
              </a>

              {/* Оглавление */}
              {data.sections.length > 1 && (
                <div className="bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl p-4">
                  <h3 className="text-[13px] font-bold text-[#003366] mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#00549F]" />
                    Содержание
                  </h3>
                  <ul className="space-y-1.5 text-[13px]">
                    {data.sections.slice(0, 15).map((s, i) => (
                      <li key={i}>
                        <a
                          href={`#section-${s.number || i}`}
                          className="flex items-baseline gap-2 text-[#4A6378] hover:text-[#00549F] transition-colors"
                        >
                          {s.number && (
                            <span className="text-[#00549F] font-bold flex-none">{s.number}.</span>
                          )}
                          <span className="line-clamp-2 leading-tight">{s.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Нормативные ссылки */}
              {refs.length > 0 && (
                <div className="bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl p-4">
                  <h3 className="text-[13px] font-bold text-[#003366] mb-3">
                    Ссылки на документы
                  </h3>
                  <ul className="space-y-1.5 text-[12px]">
                    {refs.slice(0, 12).map((r, i) => (
                      <li key={i}>
                        <Link
                          href={`/normdocs-pdf/${r.slug}`}
                          className="flex items-baseline gap-1 text-[#00549F] hover:text-[#003366] transition-colors"
                        >
                          <ChevronRight className="h-3 w-3 flex-none mt-0.5" />
                          <span>{r.ref}</span>
                          <ExternalLink className="h-3 w-3 flex-none ml-auto opacity-50" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {refs.length > 12 && (
                    <p className="mt-2 text-[11px] text-[#4A6378]/60">
                      и ещё {refs.length - 12}…
                    </p>
                  )}
                </div>
              )}

              {/* Связанный обзорный раздел */}
              <Link
                href={`/${domain?.id === "seismo" ? "normdocs" : `normdocs-${domain?.id}`}`}
                className="block p-4 bg-white border border-[#D6DCE3] rounded-xl hover:border-[#00549F] transition-colors"
              >
                <div className="text-[11px] tracking-[0.1em] uppercase text-[#4A6378] font-semibold mb-1">
                  Все нормативы по области
                </div>
                <div className="text-[14px] font-bold text-[#003366]">
                  {domain?.name === "Сейсмо" ? "Сейсмо" : domain?.name} →{" "}
                  <span className="text-[#00549F]">обзор</span>
                </div>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[20px] font-bold text-[#00549F] leading-none">{value}</div>
      <div className="text-[10px] tracking-[0.1em] uppercase text-[#4A6378] mt-1.5">{label}</div>
    </div>
  );
}
