# TomaNote Ecosystem Context

This document provides context for the TomaNote ecosystem, specifically for the **TomaNote Blog** project.

## Project Overview

| Project | Repository | Deploy URL | Purpose |
|---------|------------|------------|---------|
| **TomaNote App** | `Tomanote/TomaNote` | `https://tomanote.app` | Main PWA notepad application |
| **TomaNote Blog** | `Tomanote/TomaNote-Blog` | `https://blog.tomanote.app` | Official blog (this project) |
| **TomaNote Docs** | `Tomanote/TomaNote-Docs` | `https://docs.tomanote.app` | Documentation site |

## Version Management

- **Source of Truth**: TomaNote App (v0.5.5)
- **Sync Mechanism**: GitHub Actions workflow `.github/workflows/sync-version.yml` (in App repo)
- **Version Storage**: `version-info.json` artifact shared between repos
- **Blog Version**: Must match App version exactly (v0.5.5)

## Branding

- **Primary Brand Color**: `--tn-color-accent` (varies by theme)
- **Themes**: 6 variants (dark, light, cozy-rose, chill-aqua, wild-forest, neon-orbit)
- **Logo**: Custom SVG icon (notebook with pen)
- **Typography**: Inter (Google Fonts)

## Deployment

| Environment | URL | Branch |
|-------------|-----|--------|
| Production | `https://blog.tomanote.app` | `main` → `gh-pages` |
| Preview | GitHub Pages preview | PR branches |

**Deployment Artifacts**:
- `CNAME` file: `blog.tomanote.app`
- `.nojekyll`: Disables Jekyll processing on GitHub Pages
- `manifest.webmanifest`: PWA manifest

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Astro 7 (Static Site Generation) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Content | Content Collections (glob loader API) |
| i18n | Built-in Astro i18n (`prefixDefaultLocale: false`) |
| Testing | Vitest (unit/content tests) |
| Linting | ESLint + Prettier |
| Type Checking | `astro check` |

## CI/CD Workflows

### CI (`.github/workflows/ci.yml`)
- **Triggers**: Push to main/dev/feature/*, PR to main/dev
- **Jobs**: Lint → Typecheck → Test → Build (sequential dependencies)
- **Node**: v22

### Deploy (`.github/workflows/deploy.yml`)
- **Triggers**: Push to main, manual dispatch
- **Permissions**: Pages write, ID token write
- **Artifacts**: Static `dist/` upload with CNAME/.nojekyll/manifest
- **Environment**: `github-pages`

## Content Structure

```
src/content/blog/
├── en/
│   └── welcome-to-tomanote-blog.md
└── es/
    └── welcome-to-tomanote-blog.md
```

**Frontmatter Schema**:
```typescript
{
  title: string,
  description: string,
  publishDate: string (ISO 8601),
  author: string,
  tags: string[],
  featured: boolean,
  draft: boolean,
  ogImage?: string,
  slug?: string  // auto-generated from filename
}
```

## SEO Configuration

- **Canonical URLs**: Auto-generated from `Astro.url.pathname`
- **Hreflang**: `en`, `es`, `x-default`
- **OpenGraph**: Full article/website support
- **Twitter Cards**: `summary_large_image`
- **JSON-LD**: WebSite, Organization, BlogPosting
- **RSS Feed**: `/rss.xml` (styled with XSL)

## Theming System

- **Storage**: `localStorage.blogTheme`
- **Event**: `themeChanged` CustomEvent for cross-tab sync
- **No-Flash**: Inline script in `<head>` reads localStorage before paint
- **CSS Tokens**: `--tn-color-*`, `--tn-font-*`, `--tn-spacing-*`, `--tn-border-radius*`

## Branching Strategy

```
feature/* → dev → PR → main → gh-pages (deploy)
```

- **Main**: Production-ready, protected branch
- **Dev**: Integration branch for features
- **Feature**: Individual feature branches from dev

## Conventional Commits

Format: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `build`, `ci`

Scopes: `blog`, `layout`, `seo`, `i18n`, `theme`, `content`, `deps`, `ci`, `build`

Examples:
- `feat(blog): add article share buttons`
- `fix(seo): correct hreflang for Spanish locale`
- `docs: update ecosystem-context.md`

## Related Repositories

- **App**: `../TomaNote` — Source of truth for version, features
- **Docs**: `../TomaNote-Docs` — Documentation site (Astro Starlight)