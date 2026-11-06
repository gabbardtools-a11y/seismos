import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { HeroSection } from "@/components/site/hero-section";
import { EarthquakeMapSection } from "@/components/site/earthquake-map-section";
import { AboutSection } from "@/components/site/about-section";
import { DirectionsSection } from "@/components/site/directions-section";
import { PartnersSection } from "@/components/site/partners-section";
import { PatentsSection } from "@/components/site/patents-section";
import { PublicationsSection } from "@/components/site/publications-section";
import { ContactsSection } from "@/components/site/contacts-section";

export const metadata = {
  alternates: { canonical: "/" },
};

/**
 * JSON-LD: Organization + WebSite для главной страницы.
 * Помогает Google показывать rich snippets и knowledge panel.
 */
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "СРОСС®",
  alternateName: "Сейсмобезопасность России",
  url: "https://seismos.ru",
  logo: "https://seismos.ru/apple-touch-icon.png",
  description:
    "Сейсмическая сертификация и испытания зданий, сооружений, оборудования и материалов. Международный проект ООН SDG 11.",
  foundingDate: "2009",
  areaServed: ["RU", "CIS", "EAEU"],
  sameAs: ["https://seismos.ru"],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "СРОСС® — Сейсмобезопасность",
  url: "https://seismos.ru",
  inLanguage: ["ru", "en", "zh"],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://seismos.ru/news?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <EarthquakeMapSection />
        <AboutSection />
        <DirectionsSection />
        <PartnersSection />
        <PatentsSection />
        <PublicationsSection />
        <ContactsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
