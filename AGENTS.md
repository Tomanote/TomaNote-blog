# TomaNote Blog — Agent Instructions

Blog oficial de TomaNote. Sitio Astro (scaffold pendiente). Los mismos estándares de calidad y flujo de trabajo que el repo principal (TomaNote) y que TomaNote-Docs.

## Rama principal
- La rama default es `master`, no `main`

## Branch flow (convención estricta)
- Cualquier rama feature (distinta de `dev` o `master`) se mergea SIEMPRE a `dev` primero mediante PR
- El **agente crea SIEMPRE el PR de `dev` → `master`**; **solo un desarrollador humano puede aprobarlo y mergearlo desde la interfaz de GitHub** — el agente nunca mergea directo a `master` ni se auto-aprueba el PR
- `master` tiene branch protection: requiere PR aprobado por el usuario y el status check `build-and-test` (`.github/workflows/ci.yml`) — pendiente de configurar cuando se escalfe el proyecto
- Excepción: solo `dev` y `master` pueden recibir merges directos

## Commit conventions
- Conventional commits en inglés: `feat(scope): ...`, `fix(scope): ...`, `docs(scope): ...`, `refactor(scope): ...`, `test(scope): ...`, `style(scope): ...`, `chore(scope): ...`
- **Regla de autocontención**: cada commit debe poder **revertirse en aislamiento** sin afectar otras features integradas en la misma rama/milestone. Cada commit es un cambio lógico único que deja el proyecto en estado funcional. No se permite mezclar cambios de distintas features en un mismo commit; si un cambio depende de otro anterior, debe degradar con elegancia (fallback) y no romper nada al revertirse.
- **i18n**: todo artículo o clave nueva debe existir en inglés Y español con el mismo slug — respetar el mismo criterio de paridad de TomaNote-Docs
- Antes de pushear: `npm run test:run`, `npm run build` y `npx astro check` deben pasar (cuando existan)
- Convenciones de contribución completas en `CONTRIBUTING.md` (pendiente de redactar en el scaffold)

## Deploy a producción
- El sitio se servirá desde la rama `gh-pages` via GitHub Pages con dominio `blog.tomanote.app`
- **Requisito crítico**: Siempre debe incluirse un archivo `.nojekyll` vacío en `dist/` antes del deploy. Astro genera JS en `_astro/` y Jekyll (GitHub Pages) ignora carpetas que empiezan con `_`. Sin `.nojekyll` el sitio se ve en blanco.
- El CNAME debe contener `blog.tomanote.app`
- Node.js >= 22.12.0 requerido (Astro 6+)
- El deploy automático via GitHub Actions escuchará pushes a `master` y desplegará a `gh-pages` (se configura en el scaffold)

## Release flow
1. Feature branch → PR a `dev` (merge automático o aprobado por el agente)
2. El usuario crea PR de `dev` → `master` y lo revisa manualmente
3. Una vez mergeado a `master`, crear tag semver (`vX.Y.Z`)
4. Crear GitHub Release con notas
5. GitHub Actions deploya automáticamente
