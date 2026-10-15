import logo from "@/assets/logo.png";
import { productLines } from "@/data/catalog";
import { instagramLink, site } from "./site";

/**
 * Datos estructurados (schema.org) para buscadores.
 * Solo incluye información real de MAKEA: sin precios, horarios ni reseñas.
 */
export function buildStructuredData() {
  const businessId = `${site.url}/#negocio`;
  const instagram = instagramLink();

  const menu = {
    "@type": "Menu",
    name: `Carta de ${site.name}`,
    inLanguage: "es-PE",
    hasMenuSection: productLines.map((line) => ({
      "@type": "MenuSection",
      name: line.name,
      description: line.tagline,
      hasMenuSection: line.categories.map((c) => ({
        "@type": "MenuSection",
        name: `${line.name} ${c.name.toLowerCase()}`,
        hasMenuItem: c.flavors.map((f) => ({ "@type": "MenuItem", name: `${line.name}: ${f}` })),
      })),
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Bakery",
        "@id": businessId,
        name: site.name,
        alternateName: site.legalName,
        slogan: site.tagline,
        description: site.description,
        url: site.url,
        logo: `${site.url}${logo.src}`,
        image: `${site.url}/opengraph-image.jpg`,
        telephone: `+${site.contact.whatsapp}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.contact.address,
          addressCountry: "PE",
        },
        servesCuisine: ["Postres", "Chocotejas"],
        hasMenu: menu,
        sameAs: instagram ? [instagram] : undefined,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "pedidos",
          telephone: `+${site.contact.whatsapp}`,
          availableLanguage: "es",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#web`,
        url: site.url,
        name: site.name,
        inLanguage: "es-PE",
        publisher: { "@id": businessId },
      },
    ],
  };
}
