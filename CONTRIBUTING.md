# Contributing to TomaNote Blog

Thank you for your interest in contributing! This document outlines the guidelines for contributing to the TomaNote Blog.

---

## Code of Conduct

By participating, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to the maintainers.

---

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+ (comes with Node)
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/Tomanote/TomaNote-Blog.git
cd TomaNote-Blog

# Install dependencies
npm ci

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the blog.

---

## Branching Strategy

We follow a **GitFlow-inspired** workflow:

```
feature/* → dev → PR → master → gh-pages (deploy)
```

| Branch | Purpose | Protection |
|--------|---------|------------|
| `master` | Production-ready code | Protected, requires PR + CI pass |
| `dev` | Integration branch for features | Protected, requires PR |
| `feature/*` | Individual features/fixes | Created from `dev` |
| `hotfix/*` | Critical production fixes | Created from `master` |

### Branch Naming

- **Features**: `feature/short-description` (e.g., `feature/add-rss-feed`)
- **Fixes**: `fix/short-description` (e.g., `fix/seo-hreflang-es`)
- **Docs**: `docs/short-description` (e.g., `docs/update-guide`)
- **Chores**: `chore/short-description` (e.g., `chore/update-deps`)

---

## Commit Convention

We use **Conventional Commits** (English, imperative mood):

```
<type>(<scope>): <subject>

<body> (optional)

<footer> (optional)
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style (formatting, no logic change) |
| `refactor` | Code restructuring (no behavior change) |
| `test` | Adding/updating tests |
| `chore` | Maintenance (deps, build, config) |
| `perf` | Performance improvement |
| `build` | Build system changes |
| `ci` | CI/CD changes |

### Scopes

| Scope | Area |
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

### Examples

```bash
feat(blog): add article share buttons
fix(seo): correct hreflang for Spanish locale
docs: update ecosystem-context.md
refactor(theme): consolidate color tokens
test(content): add parity test for publish dates
chore(deps): update astro to 7.5.0
```

### Commit Rules

- **One logical change per commit**
- **Subject line ≤ 50 chars**, body wrapped at 72 chars
- **Imperative mood**: "add" not "added" or "adds"
- **Reference issues**: `fixes #123` or `refs #456` in footer

---

## Pull Request Process

1. **Create feature branch** from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/my-feature
   ```

2. **Make changes** with focused commits

3. **Run quality checks** locally:
   ```bash
   npm run lint       # ESLint + Prettier
   npm run typecheck  # astro check
   npm run test       # Vitest
   npm run build      # Production build
   ```

4. **Push and open PR** targeting `dev`:
   - Fill PR template
   - Link related issues
   - Ensure CI passes (lint → typecheck → test → build)

5. **Code review**:
   - At least 1 approval required
   - Address feedback with new commits (no force-push after review starts)

6. **Merge to `dev`** (squash and merge preferred)

7. **Release**: `dev` → `master` via PR triggers deploy

---

## Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled, no `any` unless justified
- **Astro**: Use component props interfaces, avoid `<script>` in .astro when possible
- **CSS**: Tailwind v4 utilities, custom `--tn-*` tokens for theming
- **Formatting**: Prettier (run `npm run format`)

### Content Guidelines

- **New posts**: Add both EN (`en/`) and ES (`es/`) versions with matching slugs
- **Frontmatter**: All required fields (title, description, publishDate, author, tags, featured, draft)
- **Dates**: ISO 8601 (`YYYY-MM-DD`)
- **Images**: Place in `public/images/blog/`, reference with absolute paths (`/images/blog/image.png`)
- **OgImage**: 1200x630px for social sharing
- **Full guide**: See [POSTING-GUIDE.md](POSTING-GUIDE.md)

### Testing

- **Content tests**: Run `npm run test` (validates EN/ES parity, schema, dates)
- **Add tests** for new functionality in `src/tests/`
- **Test naming**: `*.test.ts` with descriptive `describe`/`it` blocks

### SEO Checklist

Every new page must include:
- [ ] `title` and `description` props
- [ ] `canonical` URL
- [ ] `ogImage` (1200x630 recommended)
- [ ] `ogType`: `"website"` or `"article"`
- [ ] `article` object for articles (publishedTime, modifiedTime, authors, tags)
- [ ] JSON-LD BlogPosting for articles
- [ ] hreflang links (auto in BaseLayout)

---

## Adding a Blog Post

**Full guide**: [POSTING-GUIDE.md](POSTING-GUIDE.md)

1. **Create EN version**: `src/content/blog/en/my-post.md`
2. **Create ES version**: `src/content/blog/es/my-post.md` (same filename)
3. **Frontmatter**:
   ```yaml
   ---
   title: "My Post Title"
   description: "Short SEO description (150-160 chars)"
   publishDate: "2026-08-28"
   author: "Your Name"
   tags: ["tutorial", "astro"]
   featured: false
   draft: false
   ogImage: "/images/blog/my-post-og.png"
   ---
   ```
4. **Add images**: Place in `public/images/blog/`
5. **Write content** in Markdown
6. **Test**: `npm run test:run && npm run build`
7. **Verify**: Check both `/blog/my-post/` (EN) and `/es/blog/my-post/` (ES)
8. **Commit**: `feat(content): add "My Post Title" article`

---

## Theming

### Adding a New Theme

1. Edit `src/styles/brand.css`
2. Add `[data-theme="my-theme"]` block with all `--tn-*` tokens
3. Add to `THEMES` array in `src/components/ThemeToggle.astro`
4. Test visually in all viewport sizes

### Token Reference

| Category | Tokens |
|----------|--------|
| Colors | `--tn-color-background`, `--tn-color-text`, `--tn-color-accent`, `--tn-color-secondary-background`, `--tn-color-border`, `--tn-color-muted` |
| Fonts | `--tn-font-sans`, `--tn-font-mono` |
| Spacing | `--tn-spacing-xs` … `--tn-spacing-3xl` |
| Border Radius | `--tn-border-radius-small`, `--tn-border-radius`, `--tn-border-radius-large` |
| Shadows | `--tn-shadow-sm`, `--tn-shadow-md`, `--tn-shadow-lg` |

---

## Version Sync (App → Blog)

The blog version **must match** TomaNote App (source of truth).

**Automatic**: App repo workflow (`.github/workflows/sync-version.yml`) publishes `version-info.json` artifact → Blog workflow consumes it.

**Manual** (if needed):
```bash
# Update package.json version
npm version 0.5.6 --no-git-tag-version
# Commit
git add package.json
git commit -m "chore(deps): sync version to 0.5.6"
```

---

## Reporting Issues

- **Bugs**: Use "Bug Report" template
- **Features**: Use "Feature Request" template
- **Security**: Email maintainers directly (do not open public issue)

---

## Questions?

- **Discussions**: [GitHub Discussions](https://github.com/Tomanote/TomaNote/discussions)
- **Issues**: [GitHub Issues](https://github.com/Tomanote/TomaNote-Blog/issues)
- **Maintainer**: @Camiicode

---

## License

By contributing, you agree that your contributions will be licensed under the project's [LICENSE](LICENSE).