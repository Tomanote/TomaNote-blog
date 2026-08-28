# TomaNote Blog — Agent Instructions

Blog oficial de TomaNote. Sitio Astro 7 con i18n (EN/ES), Theming, y SEO completo.

## Convenciones de rama

```
feature/* → dev → PR → master → gh-pages (deploy)
```

| Rama | Propósito | Protección |
|------|-----------|------------|
| `master` | Código producción | Requiere PR aprobado + CI pass |
| `dev` | Integración de features | Requiere PR |
| `feature/*` | Features individuales | Creada desde `dev` |
| `hotfix/*` | Fixes críticos de producción | Creada desde `master` |

### Reglas estrictas
- Cualquier rama feature se mergea SIEMPRE a `dev` primero mediante PR
- El agente crea PR de `dev` → `master`; **solo un humano puede aprobarlo y mergearlo**
- El agente **nunca mergea directo a `master`** ni se auto-aprueba
- Solo `dev` y `master` pueden recibir merges directos

## Commit conventions

Conventional Commits en inglés, mood imperativo:

```
<type>(<scope>): <subject>
```

### Scopes del proyecto

| Scope | Área |
|-------|------|
| `blog` | Blog pages, content |
| `layout` | Layouts, base structure |
| `seo` | SEO, meta tags, structured data |
| `i18n` | Internationalization |
| `theme` | Theming, tokens, toggle |
| `content` | Blog posts, content collections |
| `deps` | Dependencies |
| `ci` | CI/CD workflows |
| `build` | Build configuration |

### Ejemplos

```bash
feat(blog): add article share buttons
fix(seo): correct hreflang for Spanish locale
docs: update POSTING-GUIDE.md
refactor(theme): consolidate color tokens
test(content): add parity test for publish dates
chore(deps): update astro to 7.5.0
```

### Reglas de commits
- **Un cambio lógico por commit** — cada commit debe poder revertirse en aislamiento
- **Subject ≤ 50 chars**, body wrapped at 72 chars
- **i18n**: todo artículo nuevo debe existir en EN Y ES con el mismo slug
- **Antes de pushear**: `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run build` deben pasar
- Cada commit debe ser autocontenido y poder revertirse en aislamiento sin afectar otros cambios.
- Cada commit debe representar un único cambio lógico.
- No mezclar features, fixes, refactors o cambios de configuración no relacionados en un mismo commit.
- Cada commit debe dejar el proyecto en un estado funcional.

## Push

- Nunca hacer push directamente a `master`.
- Los pushes normales deben realizarse únicamente sobre la rama de trabajo actual.
- Antes de hacer push, verificar `git status` y revisar los cambios staged.
- No hacer push de archivos generados, temporales o modificaciones no relacionadas con la tarea.
- Después de un cambio relevante, ejecutar los quality checks antes del push.

## Pull Requests

- Todo cambio destinado a `dev` debe llegar mediante Pull Request desde una rama feature/hotfix.
- El PR debe tener un título siguiendo Conventional Commits.
- El PR debe describir claramente:
  - qué cambia;
  - por qué cambia;
  - qué archivos/áreas principales fueron afectados;
  - qué validaciones fueron ejecutadas.
- El agente puede crear PRs.
- El agente nunca debe autoaprobar un PR.
- El agente nunca debe mergear `dev` → `master`.
- El merge de `dev` → `master` requiere aprobación humana.
- No crear PRs con cambios sin relación entre sí.

## Rama `dev`

- `dev` es la rama de integración.
- Las features se integran primero en `dev`.
- Antes de crear un PR de `dev` → `master`, `dev` debe estar en estado funcional y pasar todos los checks.
- No realizar commits directamente sobre `dev` cuando el cambio provenga de una feature branch.

## Git safety

- Antes de modificar o commitear, revisar el estado actual del repositorio.
- Nunca ejecutar `git reset --hard`, `git clean -fd`, `git push --force` o comandos destructivos sin autorización explícita.
- Nunca sobrescribir cambios locales existentes que no pertenezcan a la tarea actual.
- Si existen cambios locales previos, preservarlos y trabajar únicamente sobre el alcance solicitado.

## Estructura del proyecto

```
src/
├── components/       # Header, Footer, ThemeToggle, LanguageToggle, BlogHome
├── content/blog/     # Markdown posts (en/, es/)
├── layouts/          # BaseLayout (SEO+i18n), BlogLayout
├── pages/            # index.astro, es/index.astro, blog/[...slug].astro, rss.xml.js
├── styles/           # brand.css (tokens), global.css
├── tests/            # Vitest tests
└── assets/logo/      # Logo assets
public/               # Static: icons, manifest, robots.txt, CNAME
```

## i18n — Convenciones de contenido

- **Locales**: `en` (default, sin prefix) y `es` (con prefix `/es/`)
- **Routing**: `prefixDefaultLocale: false` — EN en `/`, ES en `/es/`
- **Paridad**: Cada post EN tiene su equivalente ES con el mismo slug
- **Estructura de archivos**:
  - `src/content/blog/en/my-post.md`
  - `src/content/blog/es/my-post.md`
- **Filtrado**: El home filtra posts por `id.startsWith(locale)` — solo muestra posts del idioma activo
- **Language toggle**: `LanguageToggle.astro` genera URLs correctas para cambiar idioma

## Imágenes en posts

- Colocar en `public/images/blog/` (crear carpeta si no existe)
- Referenciar con ruta absoluta: `![alt text](/images/blog/my-image.png)`
- **OgImage**: 1200x630px recomendado para sharing
- **Formatos**: PNG para screenshots, WebP para fotos, SVG para iconos

## Theme system

- **Tokens CSS**: `--tn-color-*`, `--tn-font-*`, `--tn-spacing-*`, `--tn-border-radius*`
- **Temas disponibles**: dark, light, cozy-rose, chill-aqua, wild-forest, neon-orbit
- **Storage**: `localStorage.blogTheme`
- **No-flash**: Inline script en `<head>` lee localStorage antes del paint

## CI/CD

### CI (`.github/workflows/ci.yml`)
- **Triggers**: Push a master/dev/feature/*, PR a master/dev
- **Jobs**: Lint → Typecheck → Test → Build (dependencias secuenciales)
- **Node**: v22

### Deploy (`.github/workflows/deploy.yml`)
- **Triggers**: Push a master, manual dispatch
- **Artifacts**: Static `dist/` upload con CNAME/.nojekyll/manifest

## Quality checks (obligatorio antes de commitear)

```bash
npm run lint        # ESLint — 0 errores
npm run typecheck   # astro check — 0 errores
npm run test:run    # Vitest — todos pasando
npm run build       # Build producción — debe compilar
```

## Release flow

1. Feature branch → PR a `dev` (merge automático o aprobado por agente)
2. El usuario crea PR de `dev` → `master` y lo revisa manualmente
3. Una vez mergeado a `master`, crear tag semver (`vX.Y.Z`)
4. Crear GitHub Release con notas
5. GitHub Actions deploya automáticamente a `gh-pages`
