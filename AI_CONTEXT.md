# AI Context — TomaNote Blog

> **Propósito**: Este archivo permite a cualquier agente de IA entender el proyecto en menos de 2 minutos.

## Qué es este proyecto

Blog oficial de [TomaNote](https://tomanote.app) — una app PWA de bloc de notas minimalista. El blog publica artículos, changelogs, y consejos de productividad.

**URL**: `https://blog.tomanote.app`

## Tech stack

| Categoría | Tecnología |
|-----------|------------|
| Framework | Astro 7 (SSG) |
| Estilos | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Contenido | Content Collections (glob loader) |
| i18n | Astro i18n (`prefixDefaultLocale: false`) |
| Testing | Vitest |
| Linting | ESLint + Prettier |
| Deploy | GitHub Pages (rama `gh-pages`) |
| Node | 22+ |

## Locales

| Locale | URL | Archivos |
|--------|-----|----------|
| `en` (default) | `/`, `/blog/slug/` | `src/content/blog/en/*.md` |
| `es` | `/es/`, `/es/blog/slug/` | `src/content/blog/es/*.md` |

## Estructura clave

```
src/
├── components/
│   ├── Header.astro          # Nav + LanguageToggle + ThemeToggle
│   ├── Footer.astro          # Footer 3 columnas
│   ├── ThemeToggle.astro     # Toggle dark/light (localStorage)
│   ├── LanguageToggle.astro  # Toggle EN↔ES
│   └── BlogHome.astro        # Grid de post cards (reutilizable)
├── content/blog/
│   ├── en/                   # Posts en inglés
│   │   └── my-post.md
│   └── es/                   # Posts en español
│       └── my-post.md
├── layouts/
│   ├── BaseLayout.astro      # SEO, i18n, JSON-LD, PWA
│   └── BlogLayout.astro      # Header + slot + Footer
├── pages/
│   ├── index.astro           # Home EN
│   ├── es/index.astro        # Home ES
│   ├── blog/[...slug].astro  # Artículo individual
│   └── rss.xml.js            # RSS feed
├── styles/
│   ├── brand.css             # 6 temas + tokens CSS
│   └── global.css            # Reset + utilidades
└── tests/
    └── content-parity.test.ts # Paridad EN/ES
```

## Convenciones de contenido

### Crear un post nuevo

1. Crear `src/content/blog/en/my-slug.md`
2. Crear `src/content/blog/es/my-slug.md` (mismo filename)
3. Frontmatter obligatorio:

```yaml
---
title: "Title in English"
description: "SEO description (150-160 chars)"
publishDate: "2026-08-28"
author: "Author Name"
tags: ["tag1", "tag2"]
featured: false
draft: false
ogImage: "/og-image.png"  # opcional
---
```

4. Contenido en Markdown
5. Correr `npm run test:run && npm run build`

### Imágenes

- Colocar en `public/images/blog/`
- Referenciar: `![alt](/images/blog/image.png)`
- OgImage: 1200x630px para sharing

## Comandos

```bash
npm run dev          # Dev server en :4321
npm run build        # Build producción
npm run lint         # ESLint
npm run typecheck    # astro check
npm run test:run     # Vitest (single run)
npm run format       # Prettier
```

## Archivos de convención

| Archivo | Propósito |
|---------|-----------|
| `AGENTS.md` | Instrucciones para agentes de IA |
| `AI_CONTEXT.md` | Este archivo — contexto rápido |
| `POSTING-GUIDE.md` | Guía paso a paso para crear posts |
| `CONTRIBUTING.md` | Guía de contribución para humanos |
| `.context/ecosystem-context.md` | Contexto del ecosistema TomaNote |

## Reglas para agentes de IA

1. **i18n**: Todo post nuevo DEBE existir en EN y ES con el mismo slug
2. **Commits**: Conventional Commits en inglés (`feat(content): ...`)
3. **Quality checks**: Siempre correr lint, typecheck, tests, y build antes de commitear
4. **Nunca mergear a main**: Solo crear PR, el humano aprueba
5. **Un commit = un cambio lógico**: No mezclar features en un mismo commit
6. **Revertibilidad**: Cada commit debe poder revertirse sin romper nada

## Temas disponibles

dark, light, cozy-rose, chill-aqua, wild-forest, neon-orbit

Tokens CSS: `--tn-color-background`, `--tn-color-text`, `--tn-color-accent`, `--tn-color-secondary-background`, `--tn-color-contrast`, `--tn-color-link`
