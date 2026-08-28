# TomaNote Blog

Official blog for [TomaNote](https://tomanote.app). Articles, changelogs, privacy-first insights, and minimalist productivity tips.

**Live site**: [blog.tomanote.app](https://blog.tomanote.app)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Astro 7 (Static Site Generation) |
| Styling | Tailwind CSS v4 |
| Content | Content Collections (glob loader) |
| i18n | English (default) + Spanish (`/es/`) |
| Testing | Vitest |
| Linting | ESLint + Prettier |
| Deploy | GitHub Pages |

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+

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

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run Astro type checker |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run tests (watch mode) |
| `npm run test:run` | Run tests (single run) |

## Project Structure

```
src/
├── components/       # Header, Footer, ThemeToggle
├── content/blog/     # Blog posts (en/, es/)
├── layouts/          # BaseLayout, BlogLayout
├── pages/            # Routes (index, blog/[...slug], rss.xml)
├── styles/           # CSS tokens (brand.css, global.css)
└── tests/            # Vitest test files
public/               # Static assets (icons, manifest, robots.txt)
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on branching, commit conventions, and PR process.

## License

MIT
El espacio donde compartimos todo lo que ocurre alrededor de TomaNote.

Aquí encontrarás novedades y actualizaciones del producto, nuevas funcionalidades, consejos para tomar y organizar notas, recursos sobre Markdown y escritura digital, además de artículos sobre productividad, accesibilidad y diseño de herramientas sencillas.

TomaNote nace con una idea clara: **hacer que tomar notas sea simple, rápido y privado**. Este blog es también el lugar donde documentamos cómo evoluciona esa idea y todo lo que estamos construyendo para hacerla realidad.
