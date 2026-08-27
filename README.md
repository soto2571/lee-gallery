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
| Fotos de la galería | **el panel `/admin`** (ver abajo) |
| Precios y paquetes | `lib/pricing.ts` |
| Textos (ES / EN) | `lib/i18n.ts` |
| Colores y tipografías | `tailwind.config.ts` |

## Panel de fotos (`/admin`)

Lee sube sus propias fotos desde **https://tu-sitio.com/admin** — sin tocar código
ni hacer deploy. El enlace no aparece en ningún menú del sitio: hay que escribirlo.

- **Usuario:** `ShayAdmin` · **Contraseña:** `Password!234`
  (cámbialos con las variables `ADMIN_USER` / `ADMIN_PASSWORD`, ver `.env.example`)
- Elige la sección (Retratos / Brands / Products), arrastra o escoge las fotos,
  opcionalmente escribe una descripción, y le da a **Subir**.
- Cada foto se puede **reordenar** (← →), **renombrar** (✎) y **borrar** (✕).
  El orden del panel es el orden en el sitio.
- Las fotos se reducen a 2560 px en el navegador antes de subirse, así que una
  foto de cámara de 20 MB viaja como ~500 KB y el sitio sigue rápido.
- Los cambios se ven en el sitio al instante, sin redeploy.

### Dónde se guardan las fotos

| Entorno | Fotos | Datos de la galería |
|---------|-------|---------------------|
| Producción (Vercel) | Vercel Blob | JSON en Vercel Blob |
| `npm run dev` sin token | `public/uploads/` | `.data/gallery.json` |

Para que funcione en producción hay que conectar el almacenamiento **una sola vez**:

1. Vercel → tu proyecto → **Storage** → **Create Database** → **Blob** → conéctalo al proyecto.
2. Vercel inyecta solo la variable `BLOB_READ_WRITE_TOKEN`.
3. Añade `ADMIN_USER`, `ADMIN_PASSWORD` y `ADMIN_SECRET` en **Settings → Environment Variables**.
4. Redeploy.

Mientras no se haya subido nada desde el panel, el sitio muestra las fotos
originales de `lib/gallery.ts` (`seedImages`, servidas desde `public/images`).
El primer cambio hecho en el panel se guarda encima de esa lista; desde ahí,
editar `lib/gallery.ts` a mano ya no cambia lo que se ve.

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
