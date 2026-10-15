# MAKEA · Destapa la felicidad

Landing page de MAKEA (chocotejas y postres cuchareables), hecha con Next.js, Tailwind CSS y Motion.

## Desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Configuración

| Qué | Dónde |
| --- | --- |
| WhatsApp, Instagram, dirección, textos SEO | `src/config/site.ts` |
| Catálogo (líneas, categorías y sabores) | `src/data/catalog.ts` |
| Datos estructurados (schema.org) | `src/config/structured-data.ts` |

### Dominio del sitio (SEO)

La URL canónica, Open Graph, `sitemap.xml` y `robots.txt` usan, en este orden:

1. `NEXT_PUBLIC_SITE_URL` (por ejemplo `https://makea.pe`), definida en el hosting.
2. El dominio de producción de Vercel, si se despliega allí (automático).
3. `http://localhost:3000` en local.

Cuando tengas el dominio definitivo, define `NEXT_PUBLIC_SITE_URL` en las variables de entorno del hosting y vuelve a desplegar.

## SEO incluido

- Título, descripción, palabras clave y URL canónica (`src/app/layout.tsx`).
- Imagen Open Graph / Twitter de 1200×630 (`src/app/opengraph-image.jpg`).
- `sitemap.xml`, `robots.txt` y `manifest.webmanifest` (`src/app/*.ts`).
- Favicon e icono de Apple con la "M" del logo.
- JSON-LD `Bakery` + `WebSite` con la carta completa como `Menu`.
