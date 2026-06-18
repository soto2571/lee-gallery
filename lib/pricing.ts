export type PricingPlan = {
  id: string;
  name: { es: string; en: string };
  price: { es: string; en: string };
  description: { es: string; en: string };
  features: { es: string[]; en: string[] };
  highlighted?: boolean;
  // No fixed price — shows a "Contact" CTA instead of "Book".
  contactOnly?: boolean;
  // Pre-filled WhatsApp message for this package's button.
  whatsapp: { es: string; en: string };
};

// Lee's real session packages (prices in USD — Puerto Rico).
export const pricingPlans: PricingPlan[] = [
  {
    id: "esencia",
    name: { es: "Esencia", en: "Essence" },
    price: { es: "$80", en: "$80" },
    description: {
      es: "Perfecta para retratos, contenido personal y pequeños momentos.",
      en: "Perfect for portraits, personal content and small moments.",
    },
    features: {
      es: ["Sesión fotográfica personalizada", "10 imágenes editadas", "1 ubicación"],
      en: ["Personalized photo session", "10 edited images", "1 location"],
    },
    whatsapp: {
      es: "Hola Lee 👋, vi tu portafolio y me encantaría saber más sobre el paquete Esencia.",
      en: "Hi Lee 👋, I saw your portfolio and I'd love to know more about the Essence package.",
    },
  },
  {
    id: "luz-dorada",
    name: { es: "Luz Dorada", en: "Golden Hour" },
    price: { es: "$120", en: "$120" },
    description: {
      es: "Ideal para crear una galería llena de variedad.",
      en: "Ideal for creating a gallery full of variety.",
    },
    features: {
      es: [
        "Sesión completa",
        "20 imágenes editadas",
        "1 cambio de vestuario",
        "1 ubicación",
      ],
      en: [
        "Full session",
        "20 edited images",
        "1 outfit change",
        "1 location",
      ],
    },
    highlighted: true,
    whatsapp: {
      es: "Hola Lee 👋, vi tu portafolio y me encantaría saber más sobre el paquete Luz Dorada.",
      en: "Hi Lee 👋, I saw your portfolio and I'd love to know more about the Golden Hour package.",
    },
  },
  {
    id: "experiencia",
    name: { es: "Experiencia", en: "Experience" },
    price: { es: "$170", en: "$170" },
    description: {
      es: "Para quienes quieren una experiencia más completa.",
      en: "For those who want a more complete experience.",
    },
    features: {
      es: [
        "Sesión personalizada",
        "35 imágenes editadas",
        "Hasta 2 ubicaciones cercanas",
        "2 cambios de vestuario",
      ],
      en: [
        "Personalized session",
        "35 edited images",
        "Up to 2 nearby locations",
        "2 outfit changes",
      ],
    },
    whatsapp: {
      es: "Hola Lee 👋, vi tu portafolio y me encantaría saber más sobre el paquete Experiencia.",
      en: "Hi Lee 👋, I saw your portfolio and I'd love to know more about the Experience package.",
    },
  },
  {
    id: "marca",
    name: { es: "Marca & Producto", en: "Brand & Product" },
    price: { es: "Consultar", en: "On request" },
    description: {
      es: "Para negocios y marcas que necesitan contenido a la medida.",
      en: "For businesses and brands that need tailor-made content.",
    },
    features: {
      es: [
        "Sesión a la medida",
        "Dirección de arte",
        "Fotos de producto y lifestyle",
        "Cotización personalizada",
      ],
      en: [
        "Custom session",
        "Art direction",
        "Product & lifestyle photos",
        "Personalized quote",
      ],
    },
    contactOnly: true,
    whatsapp: {
      es: "Hola Lee 👋, vi tu portafolio y me encantaría saber más sobre el paquete para Marca & Producto.",
      en: "Hi Lee 👋, I saw your portfolio and I'd love to know more about the Brand & Product package.",
    },
  },
];
