/**
 * sitemap.ts — динамическая карта сайта для поисковых систем.
 * Next.js 16 автоматически отдаёт /sitemap.xml из этого файла.
 *
 * Включает:
 * - главную страницу
 * - все служебные страницы (news, seismoprotection, seismoizolyatory,
 *   sertifikaty, seismo_sertifikat, seismo-globus, passport-3d-stp, antidron)
 * - все 34 SEO-страницы из 5 кластеров
 *
 * Источник slug'ов: scripts/seo/kernel.json (блок stage1) + хардкод служебных.
 */
import type { MetadataRoute } from "next";

const BASE = "https://seismos.ru";

// Служебные страницы
const STATIC_ROUTES = [
  "/",
  "/news",
  "/author",
  "/glossary",
  "/seismoprotection",
  "/seismoizolyatory",
  "/sertifikaty",
  "/seismo_sertifikat",
  "/seismo-globus",
  "/passport-3d-stp",
  "/antidron",
];

// 34 SEO-страницы этапа 1
const SEO_ROUTES = [
  "/sertifikat-seysmoustoychivosti",
  "/sertifikat-sootvetstviya-seysmostoykosti",
  "/protokol-ispytaniy-na-seysmostoykost",
  "/zaklyuchenie-o-seysmostoykosti",
  "/seysmostoykoe-ispolnenie-oborudovaniya",
  "/kategoriya-seysmostoykosti-i-ii-np-031",
  "/ispytaniya-na-seysmostoykost",
  "/seysmicheskie-ispytaniya",
  "/raschet-seysmostoykosti",
  "/raschet-po-akselerogramme",
  "/spektralnyy-raschet-seysmiki",
  "/razrabotka-pmi-seysmostoykosti",
  "/vibroispytaniya-oborudovaniya",
  "/obsledovanie-zdaniy-na-seysmostoykost",
  "/ekspertiza-seysmostoykosti-zdaniya",
  "/otsenka-seysmicheskogo-riska",
  "/audit-seysmicheskoy-bezopasnosti",
  "/pasportizatsiya-seysmostoykosti",
  "/tehnicheskoe-zaklyuchenie-seysmostoykosti",
  "/monitoring-zdaniy-posle-zemletryaseniysa",
  "/seysmousilenie-zdaniy",
  "/seysmousilenie-konstrukciy-uglevoloknom",
  "/seysmoizolyaciya-fundamentov",
  "/dempery-seysmicheskie",
  "/usilenie-zhelezobetonnyh-konstrukciy",
  "/usilenie-kirpichnyh-zdaniy",
  "/antiseysmicheskie-meropriyatiya",
  "/seysmoizolyatory-kupit",
  "/rezinometallicheskie-seysmoizolyatory",
  "/mayatnikovye-seysmoizolyatory",
  "/brb-elementy-seysmicheskie",
  "/seysmostoykie-kabeli-i-loty",
  "/ankery-seysmicheskie",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticUrls = STATIC_ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1.0 : 0.8,
  }));

  const seoUrls = SEO_ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...seoUrls];
}
