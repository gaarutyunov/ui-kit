# GA UI Kit

A **universal, zero-dependency UI kit** built on native **Web Components**. One
component set that works in vanilla JS, React, Astro, Vue, Svelte, SolidJS — or
no framework at all.

The visual language is distilled from two projects into a single Geist-inspired,
pure-black design system:

- [**garutyunov.com**](https://github.com/gaarutyunov/garutyunov.com) — a Next.js portfolio
- [**stereoscope**](https://github.com/gaarutyunov/stereoscope) — a buildless WebGPU image converter

📖 **[Live Storybook →](https://gaarutyunov.github.io/ui-kit/)** (best on desktop)
&nbsp;·&nbsp; 📱 **[Standalone showcase →](https://gaarutyunov.github.io/ui-kit/demo/test.html)** (works everywhere, incl. mobile Safari)

> Storybook is a desktop-oriented dev tool and its preview UI can render
> unreliably on mobile browsers. The standalone showcase loads the components
> as plain ES modules with no Storybook, so it renders in any browser.

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
· `ga-spinner` · `ga-alert` · `ga-kbd` · `ga-tabs`

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

```bash
npm install
npm run storybook       # dev server at http://localhost:6006
npm run build-storybook # static build → storybook-static/
```

Each component lives in `src/components/<name>/` with its `.js` implementation
and a `.stories.js` next to it.

## Deployment

Two GitHub Actions workflows publish the Storybook to GitHub Pages:

- **`deploy-storybook.yml`** — on every push to `main`, builds and publishes to
  the root of the `gh-pages` branch → <https://gaarutyunov.github.io/ui-kit/>.
- **`pr-preview.yml`** — on every pull request, builds and deploys an isolated
  preview to `…/pr-preview/pr-<N>/` and posts a sticky comment with the link.
  The preview is removed automatically when the PR is closed.

**One-time setup:** in the repo's **Settings → Pages**, set the source to
**Deploy from a branch** and choose the **`gh-pages`** branch (`/ root`). The
branch is created automatically by the first workflow run.

## License

MIT © German Arutyunov
