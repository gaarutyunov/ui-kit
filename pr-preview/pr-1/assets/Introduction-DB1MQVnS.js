import{j as e,M as i}from"./index-CQSL2Mkc.js";import{useMDXComponents as r}from"./index-C9hqAsDz.js";import"./iframe-Dbk0aXqD.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-Ca4lBP7z.js";import"./index-Bhqu_tAV.js";function s(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Introduction"}),`
`,e.jsxs("div",{style:{maxWidth:760},children:[e.jsx(n.h1,{id:"ga-ui-kit",children:"GA UI Kit"}),e.jsxs(n.p,{children:["A ",e.jsx(n.strong,{children:"universal, zero-dependency UI kit"})," built on native ",e.jsx(n.strong,{children:"Web Components"}),`. The
visual language is distilled from two projects — the
`,e.jsx(n.a,{href:"https://github.com/gaarutyunov/garutyunov.com",rel:"nofollow",children:"garutyunov.com"}),` portfolio and the
`,e.jsx(n.a,{href:"https://github.com/gaarutyunov/stereoscope",rel:"nofollow",children:"stereoscope"}),` converter — into a single
Geist-inspired, pure-black design system.`]}),e.jsxs(n.p,{children:["Because every component is a standard custom element (",e.jsx(n.code,{children:"ga-*"}),"), it runs ",e.jsx(n.strong,{children:"anywhere"}),`:
vanilla HTML, React, Astro, Vue, Svelte, SolidJS — no framework adapter required.`]}),e.jsx(n.h2,{id:"quick-start",children:"Quick start"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!-- 1. Theme (optional but recommended) -->
<link rel="stylesheet" href="https://esm.sh/@gaarutyunov/ui-kit/tokens.css" />

<!-- 2. Components (registers every <ga-*> element) -->
<script type="module">
  import "https://esm.sh/@gaarutyunov/ui-kit";
<\/script>

<ga-button variant="primary">Hello</ga-button>
`})}),e.jsx(n.h2,{id:"with-a-bundler",children:"With a bundler"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @gaarutyunov/ui-kit
`})}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import "@gaarutyunov/ui-kit";            // register all components
import "@gaarutyunov/ui-kit/tokens.css"; // global theme
`})}),e.jsx(n.h2,{id:"theming",children:"Theming"}),e.jsxs(n.p,{children:[`Re-brand the entire kit by overriding a handful of CSS variables — exactly the
`,e.jsx(n.code,{children:"--accent"})," / ",e.jsx(n.code,{children:"--radius"})," pattern stereoscope uses:"]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`:root {
  --ga-accent: #ac4bff;   /* purple instead of blue */
  --ga-radius: 10px;
  --ga-font-sans: "Inter", system-ui, sans-serif;
}
`})}),e.jsxs(n.p,{children:["Switch to the bundled light theme with ",e.jsx(n.code,{children:'<html data-theme="light">'}),"."]}),e.jsx(n.h2,{id:"why-web-components",children:"Why Web Components?"}),e.jsxs(n.p,{children:[`| Concern | How the kit handles it |
| --- | --- |
| `,e.jsx(n.strong,{children:"Framework portability"}),` | Native custom elements — no React/Vue-specific build |
| `,e.jsx(n.strong,{children:"Style isolation"}),` | Shadow DOM; host page styles can't leak in |
| `,e.jsx(n.strong,{children:"Theming"}),` | CSS custom properties pierce the shadow boundary |
| `,e.jsx(n.strong,{children:"Zero runtime deps"})," | ~3 KB base class, no Lit/Stencil |"]}),e.jsxs(n.p,{children:["Browse the ",e.jsx(n.strong,{children:"Components"})," and ",e.jsx(n.strong,{children:"Foundations"})," sections in the sidebar to explore."]})]})]})}function u(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{u as default};
