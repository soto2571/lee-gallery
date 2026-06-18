// Central site configuration. Update these values with Lee's real data.
export const siteConfig = {
  name: "Lee's Gallery",
  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  // Puerto Rico uses the +1 country code: 1 + 787 210 4745.
  whatsapp: "17872104745",
  email: "leesgallerytm@gmail.com",
  instagram: "https://www.instagram.com/lees_gallery",
  // City / location shown in the contact section.
  location: "Mayagüez y áreas cercanas, PR",
};

// Pre-filled WhatsApp messages per language.
export const whatsappMessages = {
  es: "Hola Lee 👋, vi tu portafolio y me encantaría reservar una sesión.",
  en: "Hi Lee 👋, I saw your portfolio and I'd love to book a session.",
};

export function whatsappLink(lang: "es" | "en") {
  const text = encodeURIComponent(whatsappMessages[lang]);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
