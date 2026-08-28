# Changelog

All notable changes to TomaNote Blog will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.5.5] - 2026-08-28

### Added

- **Project scaffolding**: Complete Astro 7 project structure with TypeScript
- **Branding system**: 6 themes (dark, light, cozy-rose, chill-aqua, wild-forest, neon-orbit) with CSS custom properties (`--tn-*` tokens)
- **Theme toggle**: Sun/moon icons with localStorage persistence and cross-tab sync via `themeChanged` event
- **No-flash theme loading**: Inline script in `<head>` reads localStorage before paint
- **Responsive layout**: Sticky header with brand SVG, navigation (Articles, App, Docs), mobile hamburger menu
- **Footer**: 3-column layout (Products, Community, Legal) with copyright
- **Blog home page**: Responsive PostCard grid with article previews
- **Article pages**: Full markdown rendering with `marked`, share buttons (Twitter, LinkedIn, Copy link)
- **i18n support**: English (default, no prefix) and Spanish (`/es/`) with `prefixDefaultLocale: false`
- **Content Collections**: Glob loader API (`src/content.config.ts`) for type-safe blog posts
- **Placeholder articles**: Welcome posts in EN and ES
- **SEO Suite**:
  - Canonical URLs and hreflang (`en`, `es`, `x-default`)
  - OpenGraph (article/website) and Twitter Cards (`summary_large_image`)
  - JSON-LD structured data: WebSite, Organization, BlogPosting
  - RSS 2.0 feed at `/rss.xml` with XSL styling
- **PWA**: Web App Manifest (`manifest.webmanifest`), favicon, app icons (192x192, 512x512, SVG), og-image.png
- **GitHub Pages deployment**: CNAME (`blog.tomanote.app`), `.nojekyll`, robots.txt
- **CI/CD pipelines**:
  - `ci.yml`: Lint → Typecheck → Test → Build (sequential)
  - `deploy.yml`: Build + deploy to GitHub Pages with static assets
- **Testing**: Vitest suite with content parity tests (EN/ES slug matching, schema validation, date consistency)
- **Internal docs**: `GUIDE.md` (gitignored), `.context/ecosystem-context.md`
- **Contribution docs**: `CONTRIBUTING.md` with conventional commits and branch flow

### Changed

- **N/A** (initial release)

### Fixed

- **N/A** (initial release)

### Security

- **N/A** (initial release)

---

## Version Sync

This blog's version is synchronized with **TomaNote App** (source of truth).

| Blog Version | App Version | Sync Date |
|--------------|-------------|-----------|
| 0.5.5        | 0.5.5       | 2026-08-28 |

---

## Release Notes Template (for future versions)

```
## [X.Y.Z] - YYYY-MM-DD

### Added
- 

### Changed
- 

### Fixed
- 

### Security
- 
```