/**
 * Configuración editable de MAKEA.
 * Los datos de contacto provienen de los menús oficiales ("Sabores MAKEA").
 * Para cambiar un dato, edítalo aquí: todos los botones del sitio lo leen de este archivo.
 */
export const site = {
  name: "MAKEA",
  tagline: "Destapa la felicidad",
  description:
    "MAKEA: chocotejas y postres cuchareables cremosos, irresistibles y hechos para disfrutar. Tu paladar, la prioridad.",
  url: "https://makea.pe", // TODO: reemplazar por el dominio definitivo cuando exista.
  contact: {
    /** Número tal como aparece en el menú. */
    phoneDisplay: "967 819 857",
    /** Formato internacional sin "+" ni espacios para wa.me (51 = Perú). */
    whatsapp: "51967819857",
    instagram: "makea.pe",
    address: "Calle Puente y Cortes",
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
