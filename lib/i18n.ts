export type Lang = "es" | "en";

export const dictionary = {
  es: {
    nav: {
      work: "Portafolio",
      about: "Sobre Lee",
      pricing: "Precios",
      contact: "Contacto",
      book: "Reservar sesión",
    },
    hero: {
      eyebrow: "Fotografía · Retrato · Marca · Producto",
      title: "Capturamos la luz de tu historia.",
      subtitle:
        "Lee's Gallery es un estudio de fotografía moderna. Imágenes limpias, editoriales y atemporales para personas y marcas.",
      cta: "Ver el trabajo",
      ctaSecondary: "Reservar por WhatsApp",
    },
    work: {
      title: "Portafolio",
      subtitle: "Una selección de proyectos recientes.",
      all: "Todo",
      viewAll: "Ver todas",
      empty: "Próximamente — nuevas fotos en camino.",
      categories: {
        portraits: "Retratos",
        brands: "Brands",
        products: "Products",
      },
    },
    about: {
      eyebrow: "Sobre Lee",
      title: "Una mirada cálida, un acabado impecable.",
      body: "Soy Lee, fotógrafa enfocada en retrato, marca y producto. Mi trabajo busca lo esencial: composiciones limpias, luz natural y momentos honestos. Cada sesión está pensada para que te sientas cómoda y para que el resultado se vea atemporal.",
      stats: {
        years: "Años de experiencia",
        sessions: "Sesiones realizadas",
        clients: "Clientes felices",
      },
    },
    pricing: {
      eyebrow: "Precios",
      title: "Paquetes pensados para cada historia.",
      subtitle:
        "Captura los momentos, etapas y detalles que quieras recordar. ¿Buscas algo a la medida? Escríbeme por WhatsApp.",
      perSession: "/ sesión",
      popular: "Más elegido",
      cta: "Reservar este paquete",
      contact: "Contactar",
      customNote: "¿Buscas algo distinto? Armamos un paquete a tu medida.",
    },
    contact: {
      eyebrow: "Contacto",
      title: "Hagamos algo bonito juntas.",
      subtitle:
        "Cuéntame sobre tu proyecto y te respondo lo antes posible. La forma más rápida es por WhatsApp.",
      whatsapp: "Escribir por WhatsApp",
      email: "Enviar un correo",
      location: "Ubicación",
    },
    footer: {
      tagline: "Fotografía de retrato, marca y producto.",
      rights: "Todos los derechos reservados.",
      madeWith: "Hecho con cariño",
    },
  },
  en: {
    nav: {
      work: "Portfolio",
      about: "About",
      pricing: "Pricing",
      contact: "Contact",
      book: "Book a session",
    },
    hero: {
      eyebrow: "Photography · Portrait · Brand · Product",
      title: "We capture the light of your story.",
      subtitle:
        "Lee's Gallery is a modern photography studio. Clean, editorial and timeless images for people and brands.",
      cta: "View the work",
      ctaSecondary: "Book on WhatsApp",
    },
    work: {
      title: "Work",
      subtitle: "A selection of recent projects.",
      all: "All",
      viewAll: "View all",
      empty: "Coming soon — new photos on the way.",
      categories: {
        portraits: "Portraits",
        brands: "Brands",
        products: "Products",
      },
    },
    about: {
      eyebrow: "About Lee",
      title: "A warm eye, a flawless finish.",
      body: "I'm Lee, a photographer focused on portrait, brand and product work. My images chase the essentials: clean composition, natural light and honest moments. Every session is designed to make you feel at ease — and to look timeless.",
      stats: {
        years: "Years of experience",
        sessions: "Sessions delivered",
        clients: "Happy clients",
      },
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Packages crafted for every story.",
      subtitle:
        "Capture the moments, milestones and details you want to remember. Looking for something custom? Message me on WhatsApp.",
      perSession: "/ session",
      popular: "Most chosen",
      cta: "Book this package",
      contact: "Contact",
      customNote: "Looking for something different? Let's build a custom package.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's make something beautiful.",
      subtitle:
        "Tell me about your project and I'll get back to you as soon as I can. The fastest way is WhatsApp.",
      whatsapp: "Message on WhatsApp",
      email: "Send an email",
      location: "Location",
    },
    footer: {
      tagline: "Portrait, brand and product photography.",
      rights: "All rights reserved.",
      madeWith: "Made with care",
    },
  },
} as const;

// Widen the literal string types so both `es` and `en` share one structural
// shape (otherwise `dictionary[lang]` is an incompatible union of literals).
type Widen<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly string[]
      ? string[]
      : Widen<T[K]>;
};

export type Dictionary = Widen<(typeof dictionary)["es"]>;
