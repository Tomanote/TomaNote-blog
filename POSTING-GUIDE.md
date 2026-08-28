# Guía para Crear Posts en TomaNote Blog

Guía paso a paso para publicar un artículo nuevo en el blog.

---

## Requisitos previos

- Node.js 22+
- Servidor de desarrollo corriendo: `npm run dev`
- Ambos archivos creados: versión EN y ES

---

## Paso 1: Estructura de archivos

Cada post necesita **dos archivos** — uno en cada idioma. Los filenames **pueden** ser diferentes (cada idioma tiene su propio slug):

```
src/content/blog/
├── en/
│   └── my-post.md          ← Versión en inglés (slug: my-post)
└── es/
    └── mi-post.md          ← Versión en español (slug: mi-post)
```

**Regla de oro**: Ambos archivos deben tener el campo `i18nSlug` para que el toggle de idioma funcione correctamente.

---

## Paso 2: Frontmatter

Copiar este template y rellenar cada campo:

```yaml
---
title: "Título del artículo"
description: "Descripción SEO de 150-160 caracteres para buscadores"
publishDate: "2026-08-28"
author: "Nombre del autor"
tags: ["tag1", "tag2", "tag3"]
featured: false
draft: false
ogImage: "/images/blog/mi-post/hero.png"
i18nSlug: mi-post-en-otro-idioma
---
```

### Campos explicados

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| `title` | ✅ | Título del artículo (aparece en la card y en el post) |
| `description` | ✅ | Descripción SEO (150-160 chars). Aparece en Google y en la card |
| `publishDate` | ✅ | Fecha en formato `YYYY-MM-DD` |
| `author` | ✅ | Nombre del autor |
| `tags` | ✅ | Array de etiquetas (aparecen en la card) |
| `featured` | ✅ | `true` = marcado como destacado, `false` = normal |
| `draft` | ✅ | `true` = no se publica, `false` = visible |
| `ogImage` | ❌ | Imagen para la card y redes sociales (1200x630px). Si no se pone, usa `/og-image.png` |
| `i18nSlug` | ✅ | Slug del post en el **otro** idioma. Sin extensión. Ej: EN post → `mi-post-español` |
| `updatedDate` | ❌ | Fecha de última actualización (formato `YYYY-MM-DD`) |

### Ejemplo EN (`src/content/blog/en/better-notes.md`)

```yaml
---
title: "How to Take Better Notes with TomaNote"
description: "Learn 5 minimalist note-taking techniques that work offline and respect your privacy."
publishDate: "2026-08-28"
author: "Camiicode"
tags: ["tips", "productivity", "tomanote"]
featured: true
draft: false
ogImage: "/images/blog/better-notes/hero.png"
i18nSlug: como-tomar-mejores-notas
---
```

### Ejemplo ES (`src/content/blog/es/como-tomar-mejores-notas.md`)

```yaml
---
title: "Cómo Tomar Mejores Notas con TomaNote"
description: "Aprende 5 técnicas minimalistas de toma de notas que funcionan offline y respetan tu privacidad."
publishDate: "2026-08-28"
author: "Camiicode"
tags: ["consejos", "productividad", "tomanote"]
featured: true
draft: false
ogImage: "/images/blog/better-notes/hero.png"
i18nSlug: better-notes
---
```

---

## Paso 3: Escribir el contenido

El contenido va después del frontmatter en formato Markdown:

```markdown
## Introducción

Tu introducción aquí. Puedes usar **negrita**, *cursiva*, y [links](https://ejemplo.com).

## Sección Principal

### Subsección

- Punto 1
- Punto 2
- Punto 3

## Código

Usa bloques de código con triple backtick:

```javascript
const example = "hello world";
```

## Citas

> Esto es una cita importante.

## Imágenes

![Descripción de la imagen](/images/blog/mi-imagen.png)

---

Conclusión del artículo.
```

---

## Paso 4: Agregar imágenes

### Crear la carpeta de imágenes

```bash
mkdir -p public/images/blog
```

### Colocar las imágenes

Copiar las imágenes a `public/images/blog/`:

```bash
mkdir -p public/images/blog/mi-post && cp ~/Desktop/screenshot.png public/images/blog/mi-post/screenshot.png
cp ~/Desktop/og-image.png public/images/blog/mi-post/hero.png
```

### Usar imágenes en el contenido

```markdown
## Screenshot de la app

![Captura de pantalla de TomaNote con el nuevo tab](/images/blog/mi-post/screenshot.png)
```

### OgImage para redes sociales

- **Tamaño recomendado**: 1200x630px
- **Formato**: PNG o JPG
- **Uso**: Aparece cuando alguien comparte el link en Twitter, LinkedIn, etc.
- **Ubicación**: `public/images/blog/mi-post/hero.png`
- **Referencia en frontmatter**: `ogImage: "/images/blog/mi-post/hero.png"`

### Consejos de imágenes

| Tipo | Formato | Tamaño | Ejemplo de uso |
|------|---------|--------|----------------|
| Screenshots | PNG | < 500KB | Capturas de la app |
| Fotos | WebP/JPG | < 300KB | Fotos de equipo |
| OgImage | PNG/JPG | 1200x630px | Redes sociales |
| Iconos | SVG | < 10KB | Iconos inline |

---

## Paso 5: Verificar

Correr los checks de calidad:

```bash
npm run lint         # Verificar código
npm run typecheck    # Verificar tipos
npm run test:run     # Verificar paridad EN/ES
npm run build        # Verificar que compila
```

El test `content-parity.test.ts` verifica automáticamente que:
- ✅ Ambos archivos existen (EN y ES)
- ✅ Cada post tiene `i18nSlug` que apunta al post del otro idioma
- ✅ Las fechas de publicación coinciden
- ✅ Todos los campos requeridos están presentes
- ✅ El contenido no está vacío

---

## Paso 6: Vista previa

Abrir el navegador y verificar:

```
http://localhost:4321/                      ← Home EN (debería mostrar la card)
http://localhost:4321/es/                   ← Home ES (debería mostrar la card)
http://localhost:4321/blog/mi-post/         ← Artículo EN
http://localhost:4321/es/blog/mi-post/      ← Artículo ES
```

### Checklist visual

- [ ] La card aparece en el home EN (con imagen ogImage)
- [ ] La card aparece en el home ES (con imagen ogImage)
- [ ] El artículo EN carga correctamente
- [ ] El artículo ES carga correctamente
- [ ] Las imágenes del contenido se ven correctamente
- [ ] El toggle de idioma funciona (EN ↔ ES) sin 404
- [ ] El breadcrumb "← Back to blog" funciona
- [ ] Los share buttons funcionan

---

## Paso 7: Publicar

### Commit

```bash
git add src/content/blog/en/mi-post.md src/content/blog/es/mi-post.md public/images/blog/
git commit -m 'feat(content): add "How to Take Better Notes" article'
```

### Push y PR

```bash
git push origin feature/my-post
# Abrir PR de feature/* → dev
```

---

## Ejemplo completo: Post "v0.5.5 Release"

### Archivo EN: `src/content/blog/en/v055-release.md`

```yaml
---
title: "TomaNote v0.5.5 — What's New"
description: "Discover the latest features in TomaNote v0.5.5 including new themes, offline improvements, and performance optimizations."
publishDate: "2026-08-28"
updatedDate: "2026-08-28"
author: "Camiicode"
tags: ["release", "changelog", "tomanote"]
featured: true
draft: false
ogImage: "/images/blog/v055-release/hero.png"
i18nSlug: v055-novedades
---

# TomaNote v0.5.5 — What's New 🎉

We're excited to announce TomaNote v0.5.5 with several improvements...

## New Features

### 🎨 New Themes
- **Cozy Rose**: Warm purple tones
- **Chill Aqua**: Cool blue-green palette

![New themes showcase](/images/blog/v055-release/themes.png)

## Performance Improvements
- 40% faster initial load
- Reduced localStorage usage

## Bug Fixes
- Fixed tab sync across browser windows
- Fixed theme toggle on iOS Safari

## Updated

- Updated to Astro 7
- Updated dependencies

---

*Download TomaNote v0.5.5 at [tomanote.app](https://tomanote.app)*
```

### Archivo ES: `src/content/blog/es/v055-release.md`

```yaml
---
title: "TomaNote v0.5.5 — Novedades"
description: "Descubre las últimas funciones de TomaNote v0.5.5 incluyendo nuevos temas, mejoras offline y optimizaciones de rendimiento."
publishDate: "2026-08-28"
updatedDate: "2026-08-28"
author: "Camiicode"
tags: ["release", "cambios", "tomanote"]
featured: true
draft: false
ogImage: "/images/blog/v055-release/hero.png"
i18nSlug: v055-release
---

# TomaNote v0.5.5 — Novedades 🎉

Nos emociona anunciar TomaNote v0.5.5 con varias mejoras...

## Nuevas Funciones

### 🎨 Nuevos Temas
- **Cozy Rose**: Tonos púrpura cálidos
- **Chill Aqua**: Paleta azul-verde fresca

![Demostración de nuevos temas](/images/blog/v055-release/themes.png)

## Mejoras de Rendimiento
- 40% más rápido en carga inicial
- Reducción del uso de localStorage

## Correcciones
- Corregida sincronización de pestañas entre ventanas
- Corregido toggle de temas en iOS Safari

## Actualizado

- Actualizado a Astro 7
- Actualizadas dependencias

---

*Descarga TomaNote v0.5.5 en [tomanote.app](https://tomanote.app)*
```

---

## Troubleshooting

### "No articles yet" en el home
- Verificar que `draft: false` en el frontmatter
- Verificar que el archivo está en `src/content/blog/en/` o `es/`
- Reiniciar el dev server: `Ctrl+C` y `npm run dev`

### Imagen no aparece en la card
- Verificar que la imagen está en `public/images/blog/`
- Usar ruta absoluta: `ogImage: "/images/blog/imagen.png"` (sin `public/` al inicio)
- **No usar rutas relativas** como `./img/...` — no funcionan en Astro
- Verificar que el filename coincide exactamente (case-sensitive)

### Toggle de idioma da 404 en un post
- Verificar que ambos posts tienen el campo `i18nSlug` en el frontmatter
- El `i18nSlug` debe ser el slug (filename sin `.md`) del post en el **otro** idioma
- Ejemplo: EN post con slug `my-post` → `i18nSlug: mi-post-español`

### Test de paridad falla
- Verificar que ambos archivos tienen `i18nSlug` correcto
- Verificar que las fechas coinciden
- Verificar que todos los campos requeridos están presentes

### Build falla
- Correr `npm run lint` para ver errores de código
- Correr `npm run typecheck` para ver errores de tipos
