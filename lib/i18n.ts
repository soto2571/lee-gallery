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
      subtitle: "Mi Galería",
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
      title: "Sobre Mí",
      body: "Encuentro belleza en los detalles, las emociones y las historias que nos rodean. A través de mi fotografía busco capturar momentos auténticos, crear conexiones y transformar instantes en recuerdos que se sienten.",
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
      title: "Hagamos algo bonito juntos.",
      subtitle:
        "Cuéntame sobre tu idea y te respondo lo antes posible. La forma más rápida es por WhatsApp.",
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
      title: "Portfolio",
      subtitle: "My Gallery",
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
      title: "About Me",
      body: "I find beauty in the details, the emotions and the stories around us. Through my photography I seek to capture authentic moments, create connections and turn instants into memories you can feel.",
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
        "Tell me about your idea and I'll get back to you as soon as I can. The fastest way is WhatsApp.",
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
