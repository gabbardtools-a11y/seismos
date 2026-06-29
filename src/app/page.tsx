import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { HeroSection } from "@/components/site/hero-section";
import { AboutSection } from "@/components/site/about-section";
import { DirectionsSection } from "@/components/site/directions-section";
import { PartnersSection } from "@/components/site/partners-section";
import { PatentsSection } from "@/components/site/patents-section";
import { AuthorSection } from "@/components/site/author-section";
import { PublicationsSection } from "@/components/site/publications-section";
import { ContactsSection } from "@/components/site/contacts-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <DirectionsSection />
        <PartnersSection />
        <PatentsSection />
        <AuthorSection />
        <PublicationsSection />
        <ContactsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
