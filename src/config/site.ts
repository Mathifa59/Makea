/**
 * Configuración editable de MAKEA.
 * Los datos de contacto provienen de los menús oficiales ("Sabores MAKEA").
 * Para cambiar un dato, edítalo aquí: todos los botones del sitio lo leen de este archivo.
 */
/**
 * URL pública del sitio, usada en canonical, Open Graph, sitemap y robots.
 * Prioridad: NEXT_PUBLIC_SITE_URL (defínela con tu dominio definitivo) →
 * dominio de producción de Vercel (automático) → localhost en desarrollo.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "MAKEA",
  /** Nombre comercial completo, como aparece en los menús. */
  legalName: "MAKEA Chocotejas",
  tagline: "Destapa la felicidad",
  /** Título principal para buscadores (≈60 caracteres). */
  title: "MAKEA · Chocotejas y postres cuchareables",
  /** Descripción para buscadores (≈150 caracteres). */
  description:
    "Chocotejas y postres cuchareables de MAKEA: tres leches, maracuyá, chocolate, pecana y más sabores. Cremosos, irresistibles y hechos para disfrutar.",
  url: resolveSiteUrl(),
  locale: "es_PE",
  /** Colores de marca para el navegador y el manifest. */
  themeColor: "#fff7ec",
  brandColor: "#fa8d0a",
  contact: {
    /** Número que se muestra en la web. */
    phoneDisplay: "933 881 667",
    /** Formato internacional sin "+" ni espacios para wa.me (51 = Perú). */
    whatsapp: "51933881667",
    instagram: "makea.pe",
  },
} as const;

export const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "catalogo", label: "Catálogo" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];

export function whatsappLink(message = "¡Hola MAKEA! Quiero hacer un pedido 🧡") {
  const { whatsapp } = site.contact;
  if (!whatsapp) return null;
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}

export function instagramLink() {
  const { instagram } = site.contact;
  return instagram ? `https://instagram.com/${instagram}` : null;
}
