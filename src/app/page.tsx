import { About } from "@/components/about";
import { Catalog } from "@/components/catalog";
import { FlavorMarquee } from "@/components/flavor-marquee";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MotionProvider } from "@/components/motion-provider";
import { Navbar } from "@/components/navbar";
import { site } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  description: site.description,
  telephone: `+${site.contact.whatsapp}`,
  address: { "@type": "PostalAddress", streetAddress: site.contact.address },
  sameAs: [`https://instagram.com/${site.contact.instagram}`],
};

export default function Home() {
  return (
    <MotionProvider>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cacao focus:px-5 focus:py-3 focus:text-crema"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <About />
        <FlavorMarquee />
        <Catalog />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </MotionProvider>
  );
}
