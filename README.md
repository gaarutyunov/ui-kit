# GA UI Kit

A **universal, zero-dependency UI kit** built on native **Web Components**. One
component set that works in vanilla JS, React, Astro, Vue, Svelte, SolidJS — or
no framework at all.

The visual language is distilled from two projects into a single Geist-inspired,
pure-black design system:

- [**garutyunov.com**](https://github.com/gaarutyunov/garutyunov.com) — a Next.js portfolio
- [**stereoscope**](https://github.com/gaarutyunov/stereoscope) — a buildless WebGPU image converter

📖 **[Live docs & playground →](https://gaarutyunov.github.io/ui-kit/)**

> The documentation site is **built from the kit's own components** — a
> buildless, framework-free SPA (hash routing + ES modules) with an
> interactive playground, API tables and a dark/light toggle. No Storybook, no
> bundler, so it renders in **any browser, including mobile Safari**.

---

## Why Web Components?

Custom elements (`<ga-button>`, `<ga-card>`, …) are part of the HTML standard, so
the same kit drops into any stack with no framework-specific adapter:

| Concern | How the kit handles it |
| --- | --- |
| **Framework portability** | Native custom elements — no React/Vue build |
| **Style isolation** | Shadow DOM; host page styles can't leak in |
| **Theming** | CSS custom properties pierce the shadow boundary |
| **Runtime weight** | ~3 KB base class, no Lit/Stencil dependency |

## Components

`ga-button` · `ga-badge` · `ga-card` · `ga-avatar` · `ga-input` · `ga-switch`
· `ga-spinner` · `ga-alert` · `ga-kbd` · `ga-tabs` · `ga-note` · `ga-slider`
· `ga-file-drop` · `ga-fab` · `ga-panel`

Cards and pills follow the
[garutyunov.com](https://github.com/gaarutyunov/garutyunov.com) styling; the
note, slider, file-drop, FAB and panel are ported from
[stereoscope](https://github.com/gaarutyunov/stereoscope).

## Install

```bash
npm install @gaarutyunov/ui-kit
```

…or use it straight from a CDN with no build step (matching stereoscope's
buildless philosophy):

```html
<link rel="stylesheet" href="https://esm.sh/@gaarutyunov/ui-kit/tokens.css" />
<script type="module">import "https://esm.sh/@gaarutyunov/ui-kit";</script>
```

## Usage by framework

### Vanilla HTML / JS

```html
<link rel="stylesheet" href="@gaarutyunov/ui-kit/tokens.css" />
<script type="module">import "@gaarutyunov/ui-kit";</script>

<ga-button variant="primary">Get started</ga-button>
<ga-alert tone="success" title="Done">Saved your changes.</ga-alert>
```

### React

```jsx
import "@gaarutyunov/ui-kit";
import "@gaarutyunov/ui-kit/tokens.css";

export function Demo() {
  // Custom elements are just DOM — props become attributes, events via ref/onEvent.
  return (
    <ga-card interactive>
      <strong>Hello from React</strong>
      <ga-button variant="primary">Click</ga-button>
    </ga-card>
  );
}
```

> React 19 supports custom elements (incl. properties & events) natively. On
> React ≤18, attribute props work out of the box; for custom events attach a
> listener with a `ref`.

### Astro

```astro
---
import "@gaarutyunov/ui-kit";
import "@gaarutyunov/ui-kit/tokens.css";
---
<ga-tabs tabs='[{"id":"a","label":"One"},{"id":"b","label":"Two"}]'>
  <div slot="a">First panel</div>
  <div slot="b">Second panel</div>
</ga-tabs>
```

### Vue / Svelte / Solid

All three render custom elements directly. In Vue, mark `ga-*` as custom
elements in your compiler options (`isCustomElement: tag => tag.startsWith('ga-')`).

## Theming

Re-brand the whole kit by overriding a few CSS variables — the same
`--accent` / `--radius` pattern stereoscope uses:

```css
:root {
  --ga-accent: #ac4bff;          /* purple instead of blue */
  --ga-radius: 10px;
  --ga-font-sans: "Inter", system-ui, sans-serif;
}
```

Opt into the bundled **light theme**:

```html
<html data-theme="light">
```

See [`src/tokens/tokens.css`](src/tokens/tokens.css) for the full token set
(palette, typography, spacing, elevation, motion).

## Develop

The kit and its docs site are **zero-dependency** — there's nothing to
`npm install`. You only need Node to run the tiny static dev server (ES
modules must be served over `http://`, not `file://`):

```bash
npm run dev     # docs site at http://localhost:8000
npm run build   # assemble the static site → dist/
```

Layout:

- `src/` — the kit. Each component lives in `src/components/<name>/<name>.js`;
  `src/core/base-element.js` is the ~3 KB base class; `src/tokens/tokens.css`
  holds the design tokens.
- `site/` — the docs site (`app.js` router/renderer, `app.css`, `registry.js`
  content), built from the `ga-*` components themselves.
- `scripts/` — `build.mjs` (copies `index.html` + `site/` + `src/` into
  `dist/`) and `serve.mjs` (dev server).

To document a new component, add it to `site/registry.js` — no code changes
needed elsewhere.

## Deployment

Two GitHub Actions workflows publish the docs site to GitHub Pages. Because the
site is buildless static files, **CI installs nothing** — it just runs the copy
script and publishes `dist/`:

- **`deploy.yml`** — on every push to `main`, assembles the site and publishes
  it to the root of the `gh-pages` branch → <https://gaarutyunov.github.io/ui-kit/>.
- **`pr-preview.yml`** — on every pull request, deploys an isolated preview to
  `…/pr-preview/pr-<N>/` and posts a sticky comment with the link. The preview
  is removed automatically when the PR is closed. (Relative imports + hash
  routing mean no base-path configuration is needed.)

**One-time setup:** in the repo's **Settings → Pages**, set the source to
**Deploy from a branch** and choose the **`gh-pages`** branch (`/ root`). The
branch is created automatically by the first workflow run.

## License

MIT © German Arutyunov
