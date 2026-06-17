# Lee's Gallery

Sitio web de portafolio para Lee — fotografía de **Retratos**, **Brands** y **Products**.
Bilingüe (Español / Inglés), galería con lightbox, precios y contacto por WhatsApp.

Construido con **Next.js 15**, **React 19**, **TypeScript** y **Tailwind CSS**.
Paleta crema + verde oscuro, estética moderna y limpia.

## Cómo correr el sitio

```bash
npm install      # instalar dependencias (solo la primera vez)
npm run dev      # servidor de desarrollo en http://localhost:3000
npm run build    # build de producción
npm run start    # correr el build de producción
```

## Cómo personalizarlo (lo que tú editas)

| Qué cambiar | Archivo |
|-------------|---------|
| Número de WhatsApp, email, ubicación, Instagram | `lib/site.ts` |
| Fotos de la galería (categorías, alt text) | `lib/gallery.ts` |
| Precios y paquetes | `lib/pricing.ts` |
| Textos (ES / EN) | `lib/i18n.ts` |
| Colores y tipografías | `tailwind.config.ts` |

### Usar tus propias fotos

1. Copia las imágenes a la carpeta `public/gallery/` (por ejemplo `public/gallery/retrato-01.jpg`).
2. En `lib/gallery.ts`, cambia cada `src` de la URL de Unsplash a la ruta local, p. ej. `"/gallery/retrato-01.jpg"`.
3. Las fotos actuales son **placeholders de Unsplash** solo para previsualizar el diseño.

### WhatsApp

En `lib/site.ts`, pon el número en formato internacional **solo dígitos** (sin `+`, espacios ni guiones).
Ejemplo México: `"5215512345678"`.

## Publicar gratis (Vercel)

1. Sube el repo a GitHub.
2. Entra a [vercel.com](https://vercel.com), importa el repo y dale *Deploy*.
3. Listo: tendrás una URL pública. Puedes conectar un dominio propio después.

---

Diseño guiado por el skill **UI/UX Pro Max** (`.claude/skills/ui-ux-pro-max/`).
El sistema de diseño persistido vive en `design-system/`.
