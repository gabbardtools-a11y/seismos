/**
 * Страница поиска /search?q=<запрос>
 *
 * Серверный поиск по 5 источникам:
 * 1. Глоссарий (77 терминов) — src/content/seo/glossary.ts
 * 2. Нормативные документы (8) — src/content/seo/normdocs.ts
 * 3. Каталог оборудования (35) — src/content/equipment/catalog.ts
 * 4. SEO-страницы (34) — scripts/seo/kernel.json (блок stage1)
 * 5. Служебные страницы — хардкод (главные разделы сайта)
 *
 * JSON-LD: BreadcrumbList. SearchAction объявлен на главной.
 */
import Link from "next/link";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { glossaryTerms } from "@/content/seo/glossary";
import { normDocs } from "@/content/seo/normdocs";
import { vibroTerms } from "@/content/seo/glossary-vibro";
import { vibroDocs } from "@/content/seo/normdocs-vibro";
import { equipmentCatalog } from "@/content/equipment/catalog";
import { SearchClient } from "./search-client";

export const metadata = {
  title: "Поиск по сайту — СРОСС®",
  description:
    "Поиск по сайту seismos.ru: глоссарий сейсмологических терминов, нормативные документы (ГОСТ, СП, СНиП, НП), каталог оборудования, SEO-страницы по сертификации и испытаниям.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

// Служебные страницы для поиска
const STATIC_PAGES: { title: string; href: string; description: string }[] = [
  { title: "Главная", href: "/", description: "Сейсмобезопасность и сейсмозащита зданий и сооружений" },
  { title: "Новости землетрясений", href: "/news", description: "Парсинг из 8 источников, мониторинг сейсмоактивности" },
  { title: "Сейсмо Глобус", href: "/seismo-globus", description: "Интерактивный 3D-глобус землетрясений" },
  { title: "Глоссарий", href: "/glossary", description: "77 терминов по сейсмологии и сейсмике" },
  { title: "Нормативные документы", href: "/normdocs", description: "ГОСТ, СП, СНиП, НП — 8 документов" },
  { title: "Глоссарий вибрации", href: "/glossary-vibro", description: "45 терминов по вибрации, вибростойкости, виброизоляции" },
  { title: "Нормативы по вибро", href: "/normdocs-vibro", description: "ГОСТ 12.1.012, ГОСТ ИСО 10816, ISO 4866, СанПиН — 11 документов по вибрации" },
  { title: "Каталог оборудования", href: "/oborudovanie", description: "35 единиц испытательного и сейсмометрического оборудования" },
  { title: "Автор системы", href: "/author", description: "Акбиев Рустам Тоганович" },
  { title: "Личный кабинет", href: "/login", description: "Вход в личный кабинет СРОСС®" },
  { title: "Паспорт здания с 3D-моделью STP", href: "/passport-3d-stp", description: "32 раздела, 3D-модель, паспорт сейсмостойкости" },
  { title: "Сейсмозащита", href: "/seismoprotection", description: "Методы и решения сейсмозащиты" },
  { title: "Сейсмоизоляторы", href: "/seismoizolyatory", description: "Каталог сейсмоизоляторов" },
  { title: "Сертификаты", href: "/sertifikaty", description: "Сертификаты сейсмостойкости" },
  { title: "Антидроновая защита", href: "/antidron", description: "Защита от беспилотников" },
];

// Загрузка SEO-страниц из kernel.json (stage1)
type SeoPageInfo = { slug: string; title: string; primary_kw: string; cluster: string };
function loadSeoPages(): SeoPageInfo[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const kernel = require("../../../scripts/seo/kernel.json");
    return (kernel.stage1 as SeoPageInfo[]).map((p) => ({
      slug: p.slug,
      title: p.title,
      primary_kw: p.primary_kw,
      cluster: p.cluster,
    }));
  } catch {
    return [];
  }
}

const SEO_PAGES = loadSeoPages();

// Тип результата поиска — должен совпадать с search-client.tsx
type SearchResult = {
  type: "glossary" | "normdoc" | "equipment" | "seo" | "page";
  title: string;
  href: string;
  snippet: string;
  meta?: string;
};

const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е").trim();

function slugify(s: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts",
    ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
    я: "ya",
  };
  return s
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function clusterName(c: string): string {
  const map: Record<string, string> = {
    cert: "Сертификация",
    tests: "Испытания",
    survey: "Обследование",
    protect: "Сейсмоусиление",
    iso: "Сейсмоизоляторы",
  };
  return map[c] ?? c;
}

function searchAll(query: string): SearchResult[] {
  const q = norm(query);
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const term of glossaryTerms) {
    const haystack = norm(
      [term.term, term.definition.replace(/<[^>]+>/g, " "), ...(term.synonyms ?? [])].join(" ")
    );
    if (haystack.includes(q)) {
      results.push({
        type: "glossary",
        title: term.term,
        href: `/glossary#${slugify(term.term)}`,
        snippet: term.definition.replace(/<[^>]+>/g, " ").trim().slice(0, 200) + "…",
        meta: `Глоссарий · ${term.category}`,
      });
    }
  }

  for (const doc of normDocs) {
    const haystack = norm(
      [doc.code, doc.title, doc.description.replace(/<[^>]+>/g, " "), ...(doc.keywords ?? [])].join(" ")
    );
    if (haystack.includes(q)) {
      results.push({
        type: "normdoc",
        title: doc.code,
        href: `/normdocs#${slugify(doc.code)}`,
        snippet: doc.title + ". " + doc.description.replace(/<[^>]+>/g, " ").trim().slice(0, 160) + "…",
        meta: `Нормативы · ${doc.category} · ${doc.year} · ${doc.status}`,
      });
    }
  }

  // 2b. Вибро-глоссарий
  for (const term of vibroTerms) {
    const haystack = norm(
      [term.term, term.definition.replace(/<[^>]+>/g, " "), ...(term.synonyms ?? [])].join(" ")
    );
    if (haystack.includes(q)) {
      results.push({
        type: "glossary",
        title: term.term,
        href: `/glossary-vibro#${slugify(term.term)}`,
        snippet: term.definition.replace(/<[^>]+>/g, " ").trim().slice(0, 200) + "…",
        meta: `Глоссарий вибро · ${term.category}`,
      });
    }
  }

  // 2c. Нормативные документы по вибро
  for (const doc of vibroDocs) {
    const haystack = norm(
      [doc.code, doc.title, doc.description.replace(/<[^>]+>/g, " "), ...(doc.keywords ?? [])].join(" ")
    );
    if (haystack.includes(q)) {
      results.push({
        type: "normdoc",
        title: doc.code,
        href: `/normdocs-vibro#${slugify(doc.code)}`,
        snippet: doc.title + ". " + doc.description.replace(/<[^>]+>/g, " ").trim().slice(0, 160) + "…",
        meta: `Нормативы по вибро · ${doc.category} · ${doc.year} · ${doc.status}`,
      });
    }
  }

  for (const cat of equipmentCatalog) {
    for (const item of cat.items) {
      const haystack = norm(
        [item.name, item.description.replace(/<[^>]+>/g, " "), ...(item.brands ?? [])].join(" ")
      );
      if (haystack.includes(q)) {
        results.push({
          type: "equipment",
          title: item.name,
          href: `/oborudovanie#${cat.id}`,
          snippet: item.description.replace(/<[^>]+>/g, " ").trim().slice(0, 200) + "…",
          meta: `Оборудование · ${cat.title}`,
        });
      }
    }
  }

  for (const page of SEO_PAGES) {
    const haystack = norm([page.title, page.primary_kw, page.cluster].join(" "));
    if (haystack.includes(q)) {
      results.push({
        type: "seo",
        title: page.title,
        href: `/${page.slug}`,
        snippet: `Ключевые слова: ${page.primary_kw}. Кластер: ${clusterName(page.cluster)}.`,
        meta: `Услуги · ${clusterName(page.cluster)}`,
      });
    }
  }

  for (const page of STATIC_PAGES) {
    const haystack = norm([page.title, page.description, page.href].join(" "));
    if (haystack.includes(q)) {
      results.push({
        type: "page",
        title: page.title,
        href: page.href,
        snippet: page.description,
        meta: "Раздел сайта",
      });
    }
  }

  return results;
}

// JSON-LD: BreadcrumbList
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://seismos.ru/" },
    { "@type": "ListItem", position: 2, name: "Поиск", item: "https://seismos.ru/search" },
  ],
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const query = sp.q?.trim() ?? "";
  const results = query ? searchAll(query) : [];

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">Поиск</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow text-[#00549F]">Поиск</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.15] mb-3 flex items-start gap-3">
            <SearchIcon className="h-9 w-9 text-[#00549F] flex-none mt-1" />
            <span>Поиск по сайту</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Поиск ведётся по глоссарию сейсмологии (77 терминов), глоссарию
            вибрации (45 терминов), нормативным документам по сейсмике (8) и
            вибро (11), каталогу оборудования (35), 34 SEO-страницам и разделам
            сайта.
          </p>
        </div>

        <SearchClient results={results} query={query} />
      </div>

      <SiteFooter />
    </main>
  );
}
