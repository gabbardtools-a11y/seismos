/**
 * sitemap.ts — динамическая карта сайта для поисковых систем.
 * Next.js 16 автоматически отдаёт /sitemap.xml из этого файла.
 *
 * Включает:
 * - главную страницу
 * - все служебные страницы (news, glossary, normdocs, oborudovanie, etc.)
 * - 34 SEO-страницы этапа 1 (5 кластеров)
 * - 60 drip-страниц этапа 2 (6 кластеров: survey, monitor, design, industry, region, faq)
 *
 * Источник slug'ов: scripts/seo/kernel.json (блоки stage1 + drip) + хардкод служебных.
 */
import type { MetadataRoute } from "next";

const BASE = "https://seismos.ru";

// Служебные страницы
const STATIC_ROUTES = [
  "/",
  "/news",
  "/author",
  "/glossary",
  "/normdocs",
  "/glossary-vibro",
  "/normdocs-vibro",
  "/oborudovanie",
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

// 60 drip-страниц этапа 2 (6 кластеров: survey, monitor, design, industry, region, faq)
const DRIP_ROUTES = [
  "/seysmicheskoe-mikroraionirovanie",
  "/uits-utochnenie-ischodnoy-seysmichnosti",
  "/geofizicheskie-izyskaniya-dlya-seysmiki",
  "/inzhenerno-geologicheskie-izyskaniya-seysmika",
  "/seysmologicheskoe-obsledovanie-ploschadki",
  "/karta-ose-str-2018",
  "/str-2018-masshtab-1-8000000",
  "/seysmicheskoe-rayonirovanie-rossii",
  "/ballovka-seysmichnosti",
  "/kategorii-gruntov-po-seysmicheskim-svoystvam",
  "/seysmomonitoring-zdaniy",
  "/strukturnyy-monitoring-zdaniy",
  "/sistema-opovescheniya-o-zemletryasenii",
  "/datchiki-zemletryaseniy",
  "/seysmograf-kupit",
  "/akselerometr-seysmicheskiy",
  "/p-wave-detector",
  "/monitoring-konstrukciy-v-realnom-vremeni",
  "/ioT-seysmomonitoring",
  "/oborudovanie-seysmomonitoringa",
  "/proektirovanie-v-seysmicheskih-rayonah",
  "/razrabotka-tu-seysmostoykosti",
  "/proekt-seysmozashchity-zdaniya",
  "/audit-proektnoy-dokumentacii-seysmika",
  "/raschet-seysmicheskoy-nagruzki-snip",
  "/koefficient-k1-seysmika",
  "/raschet-nesuschih-konstrukciy-na-seysmiku",
  "/povyshenie-kvalifikacii-seysmika",
  "/obuchenie-proektirovshchikov-seysmika",
  "/seminary-seysmostoykoe-stroitelstvo",
  "/dlya-aes-seysmostoykost",
  "/dlya-neftegaza-seysmostoykost",
  "/dlya-mostov-seysmostoykost",
  "/dlya-lep-seysmostoykost",
  "/dlya-truboprovodov-seysmostoykost",
  "/dlya-bolnic-seysmostoykost",
  "/dlya-shkol-i-detsadov",
  "/dlya-data-centrov-seysmostoykost",
  "/dlya-voennyh-obektov",
  "/dlya-gidrosooruzheniy",
  "/seysmika-sochi",
  "/seysmika-kamchatka",
  "/seysmika-sahalin",
  "/seysmika-krym",
  "/seysmika-kavkaz",
  "/seysmika-altay",
  "/seysmika-yakutiya",
  "/seysmika-baykal",
  "/seysmika-vladivostok",
  "/seysmika-moskva",
  "/chasto-zadayut-voprosy-o-seysmike",
  "/skolko-stoit-sertifikat-seysmostoykosti",
  "/sroki-oformleniya-seysmostoykosti",
  "/dokumenty-dlya-seysmiki",
  "/deystvie-sertifikata-seysmostoykosti",
  "/proverka-sertifikata-seysmostoykosti",
  "/otkaz-v-sertifikate-seysmostoykosti",
  "/sertifikat-ili-zaklyuchenie-seysmika",
  "/kak-vybrat-laboratoriyu-seysmiki",
  "/obyazatelen-li-sertifikat-seysmostoykosti",
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

  const dripUrls = DRIP_ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...seoUrls, ...dripUrls];
}
