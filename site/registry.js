/* =========================================================================
   Docs content registry.

   Pure data describing every page of the docs site. The renderer in app.js
   turns this into live component previews, source blocks, API tables and
   interactive playgrounds. No build step — this is a plain ES module.
   ========================================================================= */

/** Sidebar structure: groups of links pointing at page ids. */
export const NAV = [
  {
    title: "Overview",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "installation", label: "Installation" },
      { id: "typescript", label: "TypeScript" },
      { id: "theming", label: "Theming" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "icons", label: "Icons" },
    ],
  },
  {
    title: "Components",
    items: [
      { id: "button", label: "Button" },
      { id: "radio-group", label: "Radio group" },
      { id: "badge", label: "Badge" },
      { id: "card", label: "Card" },
      { id: "avatar", label: "Avatar" },
      { id: "input", label: "Input" },
      { id: "select", label: "Select" },
      { id: "calendar", label: "Calendar" },
      { id: "date-input", label: "Date input" },
      { id: "switch", label: "Switch" },
      { id: "spinner", label: "Spinner" },
      { id: "alert", label: "Alert" },
      { id: "kbd", label: "Kbd" },
      { id: "code", label: "Code" },
      { id: "tabs", label: "Tabs" },
      { id: "breadcrumbs", label: "Breadcrumbs" },
      { id: "table", label: "Table" },
      { id: "note", label: "Note" },
      { id: "slider", label: "Slider" },
      { id: "file-drop", label: "File drop" },
      { id: "fab", label: "FAB" },
      { id: "panel", label: "Panel" },
      { id: "header", label: "Header" },
      { id: "bottom-nav", label: "Bottom nav" },
      { id: "bottom-sheet", label: "Bottom sheet" },
      { id: "chart-frame", label: "Chart frame" },
      { id: "chat", label: "Chat" },
      { id: "tooltip", label: "Tooltip" },
      { id: "step-list", label: "Step list" },
      { id: "scrubber", label: "Scrubber" },
      { id: "comment", label: "Comment" },
      { id: "comment-thread", label: "Comment thread" },
      { id: "splitter", label: "Splitter" },
    ],
  },
];

/* -------------------------------------------------------------------------
   Doc pages (prose). `html` is rendered as-is into the content column.
   ------------------------------------------------------------------------- */
export const DOCS = {
  introduction: {
    title: "GA UI Kit",
    lead: "A universal, zero-dependency UI kit built on native Web Components — and a docs site built from those same components.",
    html: /* html */ `
      <p>Every component is a standard custom element (<code>ga-*</code>), so the
      same kit runs <strong>anywhere</strong>: vanilla HTML, React, Astro, Vue,
      Svelte, SolidJS — no framework adapter required. The visual language is
      distilled from
      <a href="https://github.com/gaarutyunov/garutyunov.com" target="_blank" rel="noopener">garutyunov.com</a>
      and
      <a href="https://github.com/gaarutyunov/stereoscope" target="_blank" rel="noopener">stereoscope</a>
      into one Geist-inspired, pure-black design system.</p>

      <div class="cards-2">
        <ga-card><strong>Framework-agnostic</strong><p class="muted">Native custom elements. No React/Vue-specific build.</p></ga-card>
        <ga-card><strong>Style-isolated</strong><p class="muted">Shadow DOM — host page styles can't leak in.</p></ga-card>
        <ga-card><strong>Themable</strong><p class="muted">CSS custom properties pierce the shadow boundary.</p></ga-card>
        <ga-card><strong>Zero runtime deps</strong><p class="muted">~3&nbsp;KB base class. No Lit/Stencil.</p></ga-card>
      </div>

      <p class="muted" style="margin-top:24px">This very site is rendered with the
      kit's own components — the sidebar, theme toggle, cards, badges and tabs you
      see are all <code>ga-*</code> elements, loaded as plain ES modules. No
      Storybook, no bundler.</p>
    `,
  },

  installation: {
    title: "Installation",
    lead: "Use it from a CDN with no build step, or install from npm.",
    html: /* html */ `
      <h2>From a CDN (buildless)</h2>
      <pre class="code"><code>&lt;link rel="stylesheet" href="https://esm.sh/@gaarutyunov/ui-kit/tokens.css" /&gt;
&lt;script type="module"&gt;import "https://esm.sh/@gaarutyunov/ui-kit";&lt;/script&gt;

&lt;ga-button variant="primary"&gt;Hello&lt;/ga-button&gt;</code></pre>

      <h2>From npm</h2>
      <pre class="code"><code>npm install @gaarutyunov/ui-kit</code></pre>
      <pre class="code"><code>import "@gaarutyunov/ui-kit";            // register all components
import "@gaarutyunov/ui-kit/tokens.css"; // optional global theme</code></pre>

      <h2>Per framework</h2>
      <div id="framework-tabs"></div>
    `,
  },

  typescript: {
    title: "TypeScript",
    lead: "First-class types for every ga-* element — generated from the same JSDoc that documents the components. No @types package to install; the declarations ship inside the kit.",
    html: /* html */ `
      <h2>What ships</h2>
      <ul>
        <li>A <code>.d.ts</code> beside every component (emitted from its JSDoc), so
        <code>import { GaButton } from "@gaarutyunov/ui-kit"</code> is fully typed.</li>
        <li>An ambient augmentation of <code>HTMLElementTagNameMap</code>, so
        <code>document.querySelector("ga-card")</code> is a <code>GaCard</code> and
        <code>createElement("ga-code")</code> is a <code>GaCode</code> — automatically,
        for vanilla / Vue / Svelte / Solid users.</li>
        <li>A separate, opt-in <code>@gaarutyunov/ui-kit/react</code> entry that augments
        <code>React.JSX.IntrinsicElements</code> with every tag and its attributes.</li>
      </ul>

      <h2>DOM types (any framework)</h2>
      <p>Just import the kit — the tag map is augmented for you:</p>
      <pre class="code"><code>import "@gaarutyunov/ui-kit";

const card = document.querySelector("ga-card"); // typed as GaCard | null
card?.setAttribute("interactive", "");</code></pre>

      <h2>React (JSX)</h2>
      <p>React doesn't know about custom tags by default. Reference the types-only
      React entry <strong>once</strong>, anywhere in your app — then every
      <code>&lt;ga-*&gt;</code> element type-checks with its documented attributes.
      Boolean attributes accept <code>"" | boolean</code>; you still get
      <code>className</code>, <code>style</code>, <code>ref</code> and <code>on*</code>
      handlers.</p>
      <pre class="code"><code>// types.d.ts (or the top of any .tsx) — zero local declarations needed
import "@gaarutyunov/ui-kit/react";</code></pre>
      <pre class="code"><code>import "@gaarutyunov/ui-kit";        // registers the elements (runtime)
import "@gaarutyunov/ui-kit/react";  // teaches JSX about them (types only)

export function Demo() {
  return (
    &lt;ga-card interactive padding="lg"&gt;
      &lt;ga-button variant="primary" href="/dl" download="report.pdf"&gt;
        Download
      &lt;/ga-button&gt;
    &lt;/ga-card&gt;
  );
}</code></pre>
      <p class="muted">The React entry is deliberately separate, so importing the kit
      itself never touches React's JSX — vanilla, Vue, Svelte and Solid projects are
      unaffected. Requires a bundler-style <code>moduleResolution</code>
      (<code>"bundler"</code>, <code>"node16"</code> or <code>"nodenext"</code>);
      works great with React 19.</p>

      <h2>Regenerating types</h2>
      <p>Declarations are generated from the JSDoc with the dev-only
      <code>typescript</code> package — the kit itself stays zero-runtime-dependency:</p>
      <pre class="code"><code>npm run types</code></pre>
    `,
  },

  theming: {
    title: "Theming",
    lead: "Re-brand the whole kit by overriding a handful of CSS variables — the same --accent / --radius pattern stereoscope uses.",
    html: /* html */ `
      <pre class="code"><code>:root {
  --ga-accent: #ac4bff;          /* purple instead of blue */
  --ga-radius: 10px;
  --ga-font-sans: "Inter", system-ui, sans-serif;
}</code></pre>
      <p>Switch to the bundled light theme by setting <code>data-theme="light"</code>
      on <code>&lt;html&gt;</code> — or just use the theme toggle in this site's header.</p>
      <p class="muted">See <code>src/tokens/tokens.css</code> for the full token set
      (palette, typography, spacing, elevation, motion).</p>
    `,
  },
};

/* -------------------------------------------------------------------------
   Component pages. Each has:
     lead       short description
     examples   [{ title, code }]  — code is rendered live AND shown as source
     playground (optional) interactive attribute controls
     api/slots/events  documentation tables
   ------------------------------------------------------------------------- */
export const COMPONENTS = {
  button: {
    title: "Button",
    tag: "ga-button",
    lead: "The primary action element. Set href to render it as a link. Works in any framework — it's a native custom element.",
    playground: {
      tag: "ga-button",
      slot: "Button",
      attrs: [
        { name: "variant", type: "select", options: ["secondary", "primary", "ghost", "danger"], value: "primary" },
        { name: "size", type: "select", options: ["sm", "md", "lg"], value: "md" },
        { name: "disabled", type: "boolean", value: false },
        { name: "loading", type: "boolean", value: false },
        { name: "block", type: "boolean", value: false },
      ],
    },
    examples: [
      { title: "Variants", code: `<ga-button variant="primary">Primary</ga-button>
<ga-button variant="secondary">Secondary</ga-button>
<ga-button variant="ghost">Ghost</ga-button>
<ga-button variant="danger">Danger</ga-button>` },
      { title: "Sizes", code: `<ga-button variant="primary" size="sm">Small</ga-button>
<ga-button variant="primary" size="md">Medium</ga-button>
<ga-button variant="primary" size="lg">Large</ga-button>` },
      { title: "States", code: `<ga-button variant="primary">Default</ga-button>
<ga-button variant="primary" loading>Loading</ga-button>
<ga-button variant="primary" disabled>Disabled</ga-button>` },
      { title: "With icons", code: `<ga-button variant="primary"><span slot="start">→</span> Continue</ga-button>
<ga-button variant="secondary">Download <span slot="end">↓</span></ga-button>` },
      { title: "Link options", code: `<ga-button variant="primary" href="/report.pdf" download="report.pdf">Download PDF</ga-button>
<ga-button variant="secondary" href="https://github.com/gaarutyunov/ui-kit" target="_blank" rel="noopener">Open repo ↗</ga-button>` },
    ],
    api: [
      { name: "variant", type: `"secondary" | "primary" | "ghost" | "danger"`, def: "secondary", desc: "Visual style." },
      { name: "size", type: `"sm" | "md" | "lg"`, def: "md", desc: "Control height." },
      { name: "href", type: "string", def: "—", desc: "Render as an anchor link." },
      { name: "download", type: "string | boolean", def: "—", desc: "(link) Forwarded to the <a>: download the target, with an optional filename." },
      { name: "target", type: "string", def: "—", desc: "(link) Forwarded to the <a>, e.g. \"_blank\"." },
      { name: "rel", type: "string", def: "—", desc: "(link) Forwarded to the <a>, e.g. \"noopener\"." },
      { name: "type", type: `"button" | "submit" | "reset"`, def: "button", desc: "(button) Forwarded to the <button>." },
      { name: "name", type: "string", def: "—", desc: "(button) Form control name, forwarded to the <button>." },
      { name: "aria-label", type: "string", def: "—", desc: "Accessible label, forwarded to the inner <a>/<button>." },
      { name: "disabled", type: "boolean", def: "false", desc: "Disable interaction." },
      { name: "loading", type: "boolean", def: "false", desc: "Show a spinner and block clicks." },
      { name: "block", type: "boolean", def: "false", desc: "Full-width." },
    ],
    slots: [
      { name: "(default)", desc: "Button label." },
      { name: "start", desc: "Leading icon." },
      { name: "end", desc: "Trailing icon." },
    ],
  },

  "radio-group": {
    title: "Radio group",
    tag: "ga-radio-group",
    lead: "A single-select control in the segmented-pill style (not circular radio dots). Configure with an items JSON attribute; the selected id is the reflected value. Form-associated, with roving-tabindex arrow-key navigation.",
    examples: [
      { title: "Buttons (emits change)", code: `<ga-radio-group value="ai"
  items='[{"id":"human","label":"Human"},{"id":"ai","label":"AI"}]'>
</ga-radio-group>` },
      { title: "Three options", code: `<ga-radio-group value="month"
  items='[{"id":"day","label":"Day"},{"id":"week","label":"Week"},{"id":"month","label":"Month"}]'>
</ga-radio-group>` },
      { title: "Links (navigation)", code: `<ga-radio-group value="human"
  items='[{"id":"human","label":"Human","href":"#/typescript"},{"id":"ai","label":"AI","href":"#/installation"}]'>
</ga-radio-group>` },
    ],
    api: [
      { name: "items", type: "JSON: { id, label, href? }[]", def: "[]", desc: "Options. An item with href renders as an anchor (navigation); without href it's a selectable button." },
      { name: "value", type: "string", def: "first", desc: "Selected item id (reflected). Also the .value property." },
    ],
    events: [{ name: "change", desc: "Fires when a button item is chosen. detail: { value }." }],
  },

  badge: {
    title: "Badge",
    tag: "ga-badge",
    lead: "A small status or category label.",
    playground: {
      tag: "ga-badge",
      slot: "Beta",
      attrs: [
        { name: "color", type: "select", options: ["default", "blue", "green", "amber", "purple", "red"], value: "blue" },
        { name: "solid", type: "boolean", value: false },
        { name: "size", type: "select", options: ["md", "sm"], value: "md" },
      ],
    },
    examples: [
      { title: "Colors", code: `<ga-badge>Default</ga-badge>
<ga-badge color="blue">Blue</ga-badge>
<ga-badge color="green">Green</ga-badge>
<ga-badge color="amber">Amber</ga-badge>
<ga-badge color="purple">Purple</ga-badge>
<ga-badge color="red">Red</ga-badge>` },
      { title: "Solid", code: `<ga-badge color="blue" solid>Blue</ga-badge>
<ga-badge color="green" solid>Active</ga-badge>
<ga-badge color="amber" solid>Pending</ga-badge>
<ga-badge color="red" solid>Error</ga-badge>` },
    ],
    api: [
      { name: "color", type: `"default" | "blue" | "green" | "amber" | "purple" | "red"`, def: "default", desc: "Accent color." },
      { name: "solid", type: "boolean", def: "false", desc: "Filled instead of subtle." },
      { name: "size", type: `"md" | "sm"`, def: "md", desc: "Badge size." },
    ],
    slots: [{ name: "(default)", desc: "Badge text." }],
  },

  card: {
    title: "Card",
    tag: "ga-card",
    lead: "An elevated surface or container, optionally interactive or a link.",
    examples: [
      { title: "Basic", code: `<ga-card style="max-width:360px">
  <h3 style="margin:0 0 8px; font-size:18px;">Depth from a single photo</h3>
  <p style="margin:0; color:var(--ga-muted);">
    Convert any flat image into a stereoscopic 3D pair, in your browser.
  </p>
</ga-card>` },
      { title: "Header & footer", code: `<ga-card style="max-width:360px">
  <span slot="header">Project</span>
  <p style="margin:0; color:var(--ga-muted);">A buildless set of static ES modules.</p>
  <div slot="footer">Updated 2 days ago</div>
</ga-card>` },
      { title: "Interactive", code: `<ga-card interactive style="max-width:240px">
  <strong>stereoscope</strong>
  <p style="margin:6px 0 0; color:var(--ga-muted); font-size:14px;">WebGPU depth estimation</p>
</ga-card>` },
    ],
    api: [
      { name: "interactive", type: "boolean", def: "false", desc: "Hover lift + pointer cursor." },
      { name: "href", type: "string", def: "—", desc: "Make the whole card a link." },
      { name: "padding", type: `"none" | "sm" | "md" | "lg"`, def: "md", desc: "Body padding." },
    ],
    slots: [
      { name: "header", desc: "Optional header row." },
      { name: "(default)", desc: "Card body." },
      { name: "footer", desc: "Optional footer row." },
    ],
  },

  avatar: {
    title: "Avatar",
    tag: "ga-avatar",
    lead: "A user/image avatar with an initials fallback.",
    examples: [
      { title: "Sizes & shapes", code: `<ga-avatar name="German Arutyunov" size="sm"></ga-avatar>
<ga-avatar name="German Arutyunov"></ga-avatar>
<ga-avatar name="German Arutyunov" size="lg"></ga-avatar>
<ga-avatar name="German Arutyunov" square></ga-avatar>` },
    ],
    api: [
      { name: "src", type: "string", def: "—", desc: "Image URL. Falls back to initials." },
      { name: "name", type: "string", def: "—", desc: "Used for alt text and initials." },
      { name: "size", type: `"sm" | "md" | "lg"`, def: "md", desc: "Avatar size." },
      { name: "square", type: "boolean", def: "false", desc: "Rounded square instead of circle." },
    ],
  },

  input: {
    title: "Input",
    tag: "ga-input",
    lead: "A labelled text field. Form-associated — it participates in native <form> submission.",
    examples: [
      { title: "States", code: `<div style="display:flex; flex-direction:column; gap:16px; max-width:320px;">
  <ga-input label="Default" placeholder="Type here"></ga-input>
  <ga-input label="With hint" placeholder="Username" hint="3–20 characters"></ga-input>
  <ga-input label="Required" placeholder="Required field" required></ga-input>
  <ga-input label="Error" value="nope" error="That username is taken"></ga-input>
  <ga-input label="Disabled" placeholder="Can't touch this" disabled></ga-input>
</div>` },
    ],
    api: [
      { name: "label", type: "string", def: "—", desc: "Field label." },
      { name: "placeholder", type: "string", def: "—", desc: "Placeholder text." },
      { name: "type", type: `"text" | "email" | "password" | ...`, def: "text", desc: "Native input type." },
      { name: "value", type: "string", def: "—", desc: "Initial value." },
      { name: "hint", type: "string", def: "—", desc: "Helper text below the field." },
      { name: "error", type: "string", def: "—", desc: "Error message; turns the field red." },
      { name: "required / disabled", type: "boolean", def: "false", desc: "Standard form flags." },
    ],
    events: [
      { name: "input", desc: "Fires on every keystroke. detail: { value }." },
      { name: "change", desc: "Fires on commit. detail: { value }." },
    ],
  },

  switch: {
    title: "Switch",
    tag: "ga-switch",
    lead: "An accessible on/off toggle (role=switch).",
    examples: [
      { title: "States", code: `<div style="display:flex; flex-direction:column; gap:14px; align-items:flex-start;">
  <ga-switch label="Off"></ga-switch>
  <ga-switch label="On" checked></ga-switch>
  <ga-switch label="Disabled off" disabled></ga-switch>
  <ga-switch label="Disabled on" checked disabled></ga-switch>
</div>` },
    ],
    api: [
      { name: "checked", type: "boolean", def: "false", desc: "On/off state (reflected)." },
      { name: "disabled", type: "boolean", def: "false", desc: "Disable interaction." },
      { name: "label", type: "string", def: "—", desc: "Text beside the toggle." },
    ],
    events: [{ name: "change", desc: "Fires on toggle. detail: { checked }." }],
  },

  spinner: {
    title: "Spinner",
    tag: "ga-spinner",
    lead: "An indeterminate loading indicator.",
    examples: [
      { title: "Sizes", code: `<ga-spinner size="sm"></ga-spinner>
<ga-spinner size="md"></ga-spinner>
<ga-spinner size="lg"></ga-spinner>` },
      { title: "Colors", code: `<ga-spinner></ga-spinner>
<ga-spinner color="green"></ga-spinner>
<ga-spinner color="amber"></ga-spinner>
<ga-spinner color="red"></ga-spinner>
<ga-spinner color="fg"></ga-spinner>` },
    ],
    api: [
      { name: "size", type: `"sm" | "md" | "lg"`, def: "md", desc: "Spinner size." },
      { name: "color", type: `"" | "green" | "amber" | "purple" | "red" | "fg"`, def: "accent", desc: "Spinner color." },
    ],
  },

  alert: {
    title: "Alert",
    tag: "ga-alert",
    lead: "A callout / banner for status messages.",
    examples: [
      { title: "Tones", code: `<div style="display:flex; flex-direction:column; gap:12px; max-width:480px;">
  <ga-alert tone="info" title="Info">Local processing is available.</ga-alert>
  <ga-alert tone="success" title="Success">Export complete — 3D pair saved.</ga-alert>
  <ga-alert tone="warning" title="Warning">Large images may take a while.</ga-alert>
  <ga-alert tone="danger" title="Error" dismissible>Could not load the depth model.</ga-alert>
</div>` },
    ],
    api: [
      { name: "tone", type: `"info" | "success" | "warning" | "danger" | "neutral"`, def: "neutral", desc: "Semantic color." },
      { name: "title", type: "string", def: "—", desc: "Optional heading." },
      { name: "dismissible", type: "boolean", def: "false", desc: "Show a close button." },
    ],
    events: [{ name: "dismiss", desc: "Fires when the close button is clicked." }],
    slots: [{ name: "(default)", desc: "Message body." }],
  },

  kbd: {
    title: "Kbd",
    tag: "ga-kbd",
    lead: "Renders a keyboard key.",
    examples: [
      { title: "Shortcut", code: `<ga-kbd>⌘</ga-kbd> + <ga-kbd>K</ga-kbd>` },
    ],
    slots: [{ name: "(default)", desc: "Key label." }],
  },

  code: {
    title: "Code",
    tag: "ga-code",
    lead: "A copyable code / command block. Copies to the clipboard by default (with a check-mark confirmation); set href to render it as a link with a trailing ↗ instead. Monospace on an elevated surface.",
    examples: [
      { title: "Copyable command", code: `<ga-code prompt="$">npm install @gaarutyunov/ui-kit</ga-code>` },
      { title: "Plain snippet", code: `<ga-code>import "@gaarutyunov/ui-kit";</ga-code>` },
      { title: "As a link", code: `<ga-code href="https://github.com/gaarutyunov/ui-kit" target="_blank" rel="noopener">github.com/gaarutyunov/ui-kit</ga-code>` },
    ],
    api: [
      { name: "prompt", type: "string", def: "—", desc: "Optional leading glyph, e.g. \"$\"." },
      { name: "href", type: "string", def: "—", desc: "Render as an external link (↗) instead of a copy button." },
      { name: "target", type: "string", def: "—", desc: "(link) Forwarded to the anchor." },
      { name: "rel", type: "string", def: "—", desc: "(link) Forwarded to the anchor." },
    ],
    events: [{ name: "copy", desc: "Fires after copying. detail: { text }." }],
    slots: [{ name: "(default)", desc: "The code / command text." }],
  },

  tabs: {
    title: "Tabs",
    tag: "ga-tabs",
    lead: "A tab group. Configure with a tabs JSON attribute and place matching panels inside, keyed by slot.",
    examples: [
      { title: "Default", code: `<ga-tabs style="max-width:480px"
  tabs='[{"id":"local","label":"Local"},{"id":"cloud","label":"Cloud"},{"id":"about","label":"About"}]'>
  <div slot="local" style="color:var(--ga-muted)">On-device depth estimation with WebGPU.</div>
  <div slot="cloud" style="color:var(--ga-muted)">AI-powered editing via OpenRouter.</div>
  <div slot="about" style="color:var(--ga-muted)">A buildless converter shipped as static ES modules.</div>
</ga-tabs>` },
    ],
    api: [
      { name: "tabs", type: "JSON: { id, label }[]", def: "[]", desc: "Tab definitions." },
      { name: "active", type: "string", def: "first", desc: "Active tab id (reflected)." },
    ],
    events: [{ name: "change", desc: "Fires on tab switch. detail: { id }." }],
  },

  breadcrumbs: {
    title: "Breadcrumbs",
    tag: "ga-breadcrumbs",
    lead: "A monospace breadcrumb trail. Configure with an items JSON attribute; the last item is the current page (foreground, no link), earlier items are muted links separated by \"/\".",
    examples: [
      { title: "Trail", code: `<ga-breadcrumbs items='[
  {"label":"Home","href":"#/introduction"},
  {"label":"Components","href":"#/button"},
  {"label":"Breadcrumbs"}
]'></ga-breadcrumbs>` },
    ],
    api: [
      { name: "items", type: "JSON: { label, href? }[]", def: "[]", desc: "Trail entries. The last is the current page; earlier ones link if they have an href." },
    ],
  },

  table: {
    title: "Table",
    tag: "ga-table",
    lead: "A data table with a shared column grid. Declare columns once with a columns JSON attribute; rows are slotted light-DOM elements (a div — or an <a href> for a whole-row link) with one child per column, so rich cells stay possible.",
    examples: [
      { title: "Skills leaderboard", code: `<ga-table columns='[
  {"label":"#","width":"44px","align":"right","mono":true},
  {"label":"Skill"},
  {"label":"Score","width":"96px","align":"right","mono":true}
]'>
  <a href="#/table"><span>1</span><div><strong>TypeScript</strong><div style="color:var(--ga-muted);font-size:13px">Static types</div></div><span>982</span></a>
  <a href="#/table"><span>2</span><div><strong>Web Components</strong><div style="color:var(--ga-muted);font-size:13px">Custom elements</div></div><span>948</span></a>
  <a href="#/table"><span>3</span><div><strong>CSS</strong><div style="color:var(--ga-muted);font-size:13px">Shadow DOM</div></div><span>911</span></a>
</ga-table>` },
      { title: "Plain rows (div)", code: `<ga-table columns='[{"label":"Token"},{"label":"Value","align":"right","mono":true}]'>
  <div><span>--ga-accent</span><span>#54a2ff</span></div>
  <div><span>--ga-radius</span><span>6px</span></div>
</ga-table>` },
    ],
    api: [
      { name: "columns", type: "JSON: { label, align?, width?, mono? }[]", def: "[]", desc: "Column defs. align \"left\"|\"center\"|\"right\"; width is any grid track size; mono renders that column's cells monospace + tabular." },
    ],
    slots: [
      { name: "(default)", desc: "Row elements — a <div> or <a href> per row, each with one child element per column." },
    ],
  },

  note: {
    title: "Note",
    tag: "ga-note",
    lead: "An inline note / callout with a colored left strip — ported from stereoscope's converter note.",
    playground: {
      tag: "ga-note",
      slot: "Local processing is available in this browser.",
      attrs: [
        { name: "tone", type: "select", options: ["info", "success", "warning", "error", "neutral"], value: "info" },
        { name: "title", type: "text", value: "Heads up" },
      ],
    },
    examples: [
      { title: "Tones", code: `<div style="display:flex; flex-direction:column; gap:12px; max-width:520px;">
  <ga-note tone="info" title="Info">Local processing is available.</ga-note>
  <ga-note tone="success" title="Success">Export complete — 3D pair saved.</ga-note>
  <ga-note tone="warning" title="Warning">Large images may take a while.</ga-note>
  <ga-note tone="error" title="Error">Could not load the depth model.</ga-note>
</div>` },
    ],
    api: [
      { name: "tone", type: `"info" | "success" | "warning" | "error" | "neutral"`, def: "info", desc: "Left-strip color." },
      { name: "title", type: "string", def: "—", desc: "Optional heading." },
    ],
    slots: [{ name: "(default)", desc: "Message body." }],
  },

  slider: {
    title: "Slider",
    tag: "ga-slider",
    lead: "A range slider with an optional label and live value readout. Form-associated, because it is a native <input type=range>. Reach for it whenever you want one value. For a segmented media timeline — coloured intervals, per-segment activation, an independent playhead — reach for ga-scrubber instead: a range input has no per-region children and exactly one movable mark, so it cannot render that at any price.",
    examples: [
      { title: "Default", code: `<div style="display:flex; flex-direction:column; gap:20px; max-width:360px;">
  <ga-slider label="Depth" value="65"></ga-slider>
  <ga-slider label="Disabled" value="40" disabled></ga-slider>
</div>` },
    ],
    api: [
      { name: "min / max / step", type: "number", def: "0 / 100 / 1", desc: "Range bounds." },
      { name: "value", type: "number", def: "50", desc: "Current value (reflected on set)." },
      { name: "label", type: "string", def: "—", desc: "Label above the track." },
      { name: "disabled", type: "boolean", def: "false", desc: "Disable interaction." },
    ],
    events: [
      { name: "input", desc: "Fires while dragging. detail: { value }." },
      { name: "change", desc: "Fires on release. detail: { value }." },
    ],
  },

  "file-drop": {
    title: "File drop",
    tag: "ga-file-drop",
    lead: "A drag-and-drop file upload area — ported from stereoscope's dropzone. Click to browse or drop files.",
    examples: [
      { title: "Default", code: `<ga-file-drop multiple accept="image/*" style="max-width:420px; display:block;">
  PNG, JPG, or WebP up to 20MB
</ga-file-drop>` },
    ],
    api: [
      { name: "accept", type: "string", def: "—", desc: "Native file-input accept filter." },
      { name: "multiple", type: "boolean", def: "false", desc: "Allow selecting multiple files." },
      { name: "label", type: "string", def: "Drop files…", desc: "Primary prompt text." },
    ],
    events: [{ name: "files", desc: "Fires on drop or selection. detail: { files: File[] }." }],
    slots: [{ name: "(default)", desc: "Secondary hint text." }],
  },

  fab: {
    title: "FAB",
    tag: "ga-fab",
    lead: "A floating action button — ported from stereoscope's curtain toggle. Fixed bottom-right by default; shown inline here via position=\"static\".",
    examples: [
      { title: "Colors", code: `<ga-fab position="static" label="Add"><ga-icon name="plus" size="24"></ga-icon></ga-fab>
<ga-fab position="static" color="green" label="Confirm"><ga-icon name="check" size="24"></ga-icon></ga-fab>
<ga-fab position="static" color="red" label="Delete"><ga-icon name="trash" size="22"></ga-icon></ga-fab>` },
    ],
    api: [
      { name: "color", type: `"" | "green" | "amber" | "purple" | "red"`, def: "accent", desc: "Background color." },
      { name: "position", type: `"bottom-right" | "bottom-left" | "static"`, def: "bottom-right", desc: "Placement (use static to inline)." },
      { name: "label", type: "string", def: "Action", desc: "Accessible label." },
    ],
    slots: [{ name: "(default)", desc: "Icon / glyph (defaults to +)." }],
  },

  panel: {
    title: "Panel",
    tag: "ga-panel",
    lead: "A slide-in drawer with a backdrop — ported from stereoscope's curtain. Close via ×, the scrim, or Escape.",
    examples: [
      { title: "Drawer", code: `<ga-button variant="primary" onclick="this.nextElementSibling.show()">Open panel</ga-button>
<ga-panel title="Settings">
  <p style="margin:0 0 14px;">Drawer body content goes here.</p>
  <ga-switch label="Enable previews" checked></ga-switch>
  <div slot="footer"><ga-button variant="primary" onclick="this.closest('ga-panel').close()">Done</ga-button></div>
</ga-panel>` },
    ],
    api: [
      { name: "open", type: "boolean", def: "false", desc: "Reflected open state." },
      { name: "side", type: `"right" | "left"`, def: "right", desc: "Edge it slides from." },
      { name: "title", type: "string", def: "—", desc: "Header text (or use the header slot)." },
    ],
    events: [
      { name: "open", desc: "Fires when opened." },
      { name: "close", desc: "Fires when closed." },
    ],
    slots: [
      { name: "header", desc: "Header content (overrides title)." },
      { name: "(default)", desc: "Body content." },
      { name: "footer", desc: "Footer actions." },
    ],
  },

  header: {
    title: "Header",
    tag: "ga-header",
    lead: "A sticky app header with a brand and slotted nav actions — matches the garutyunov.com header.",
    examples: [
      { title: "Default", code: `<ga-header brand="German Arutyunov" href="#" static
  style="border:1px solid var(--ga-border); border-radius:var(--ga-radius); display:block;">
  <a href="#">CV</a>
  <a href="#">GitHub</a>
  <a href="#">LinkedIn</a>
</ga-header>` },
    ],
    api: [
      { name: "brand", type: "string", def: "—", desc: "Brand text (or use the brand slot)." },
      { name: "href", type: "string", def: "—", desc: "Brand link target." },
      { name: "static", type: "boolean", def: "false", desc: "Disable sticky positioning (for embedding)." },
    ],
    slots: [
      { name: "brand", desc: "Custom brand content (overrides the brand attribute)." },
      { name: "(default)", desc: "Right-aligned nav actions (links, buttons)." },
    ],
  },

  "bottom-nav": {
    title: "Bottom nav",
    tag: "ga-bottom-nav",
    lead: "A mobile-app bottom navigation bar — icon + label destinations, one active at a time. Fixed to the screen bottom (shown inline here via static).",
    examples: [
      { title: "Default", code: `<ga-bottom-nav static active="explore"
  items='[
    {"id":"explore","label":"Explore","icon":"compass"},
    {"id":"saved","label":"Saved","icon":"bookmark"},
    {"id":"contribute","label":"Contribute","icon":"plus"},
    {"id":"updates","label":"Updates","icon":"bell"},
    {"id":"you","label":"You","icon":"user"}
  ]'>
</ga-bottom-nav>` },
    ],
    api: [
      { name: "items", type: "JSON: { id, label, icon }[]", def: "[]", desc: "Destinations; icon is any glyph." },
      { name: "active", type: "string", def: "first", desc: "Active item id (reflected)." },
      { name: "static", type: "boolean", def: "false", desc: "Render inline instead of fixed (for embedding)." },
    ],
    events: [{ name: "change", desc: "Fires on tap. detail: { id }." }],
  },

  "bottom-sheet": {
    title: "Bottom sheet",
    tag: "ga-bottom-sheet",
    lead: "A draggable sheet that rises from the bottom with snap points — like Google Maps. Drag the handle between peek / half / full, or drag down to dismiss.",
    examples: [
      { title: "Draggable sheet", code: `<ga-button variant="primary" onclick="this.nextElementSibling.show('half')">Open bottom sheet</ga-button>
<ga-bottom-sheet snap="half">
  <div slot="header"><strong>Nearby places</strong></div>
  <p style="margin:0 0 14px;">Drag the grab handle up for full height, down to peek — or drag past peek to dismiss.</p>
  <ga-slider label="Search radius" value="50"></ga-slider>
</ga-bottom-sheet>` },
    ],
    api: [
      { name: "open", type: "boolean", def: "false", desc: "Reflected visibility." },
      { name: "snap", type: `"peek" | "half" | "full"`, def: "half", desc: "Current detent (reflected)." },
    ],
    events: [
      { name: "open", desc: "Fires when shown." },
      { name: "close", desc: "Fires when dismissed." },
      { name: "snapchange", desc: "Fires on detent change. detail: { snap }." },
    ],
    slots: [
      { name: "header", desc: "Fixed header under the grab handle." },
      { name: "(default)", desc: "Scrollable body." },
    ],
  },

  select: {
    title: "Select",
    tag: "ga-select",
    lead: "A listbox select. Form-associated, optionally filterable, optionally multi-select. Options come from a JSON attribute or from slotted <option> children.",
    examples: [
      { title: "Default", code: `<div style="display:flex; flex-direction:column; gap:20px; max-width:320px;">
  <ga-select label="Unit" value="kg"
    options='[{"value":"kg","label":"Kilograms"},{"value":"lb","label":"Pounds"}]'></ga-select>

  <ga-select label="Exercise" placeholder="Pick one" filterable
    options='[{"value":"squat","label":"Back squat"},{"value":"bench","label":"Bench press"},{"value":"dead","label":"Deadlift"},{"value":"ohp","label":"Overhead press"},{"value":"row","label":"Barbell row"}]'></ga-select>

  <ga-select label="Muscle groups" multiple placeholder="Any"
    options='[{"value":"chest","label":"Chest"},{"value":"back","label":"Back"},{"value":"legs","label":"Legs"},{"value":"arms","label":"Arms","disabled":true}]'></ga-select>
</div>` },
      { title: "From slotted options", code: `<ga-select label="Split" style="max-width:320px; display:block;">
  <option value="ppl">Push / Pull / Legs</option>
  <option value="ul" selected>Upper / Lower</option>
  <option value="fb">Full body</option>
</ga-select>` },
    ],
    api: [
      { name: "options", type: "JSON", def: "—", desc: "Array of { value, label, disabled? }. Falls back to slotted <option>s." },
      { name: "value", type: "string", def: "—", desc: "Selected value; comma-separated when multiple." },
      { name: "multiple", type: "boolean", def: "false", desc: "Toggle selection without closing; the trigger summarises as “N selected”." },
      { name: "filterable", type: "boolean", def: "false", desc: "Show a filter field in the popup." },
      { name: "placeholder", type: "string", def: "Select…", desc: "Shown when nothing is selected." },
      { name: "label / hint / error", type: "string", def: "—", desc: "Field chrome, as on ga-input." },
      { name: "name / required / disabled", type: "—", def: "—", desc: "Form participation." },
    ],
    events: [
      { name: "change", desc: "Selection committed. detail: { value } — an array when multiple." },
      { name: "input", desc: "Same payload, fired alongside change." },
      { name: "filter", desc: "Debounced typing in the filter field. detail: { text }. Replace `options` yourself to drive an async source." },
    ],
    slots: [{ name: "(default)", desc: "<option> elements, an alternative to the options attribute." }],
    notes: "Keyboard: Enter/Space/Alt+Down opens, Up/Down/Home/End/PageUp/PageDown move, type-ahead jumps, Escape closes, Tab commits and moves on. Disabled options are skipped by both keyboard and pointer.",
  },

  calendar: {
    title: "Calendar",
    tag: "ga-calendar",
    lead: "A month grid for picking one date. Values are YYYY-MM-DD strings — never Date objects, so no timezone can shift the day.",
    examples: [
      { title: "Default", code: `<ga-calendar value="2026-03-14"></ga-calendar>` },
      { title: "Bounded range", code: `<ga-calendar value="2026-03-14" min="2026-03-02" max="2026-03-24"></ga-calendar>` },
      { title: "Locale and first day", code: `<ga-calendar value="2026-03-14" locale="de-DE" first-day="1"></ga-calendar>` },
    ],
    api: [
      { name: "value", type: "YYYY-MM-DD", def: "—", desc: "Selected date." },
      { name: "month", type: "YYYY-MM", def: "value’s month", desc: "The month on display." },
      { name: "locale", type: "string", def: "browser", desc: "Passed to Intl for month and weekday names." },
      { name: "first-day", type: "0–6", def: "1", desc: "0 = Sunday. Default is Monday." },
      { name: "min / max", type: "YYYY-MM-DD", def: "—", desc: "Selectable range; days outside are disabled." },
      { name: "disabled", type: "boolean", def: "false", desc: "Disable the whole grid." },
    ],
    events: [{ name: "change", desc: "A day was chosen. detail: { value } as YYYY-MM-DD." }],
    notes: "role=grid with a roving tabindex: arrows move by day, Home/End to the week’s ends, PageUp/PageDown by month (clamped, so 31 Mar + 1 month is 30 Apr). Crossing a month boundary flips the grid and keeps focus on the day.",
  },

  "date-input": {
    title: "Date input",
    tag: "ga-date-input",
    lead: "A text field with a calendar picker. Form-associated; the submitted value is always YYYY-MM-DD.",
    examples: [
      { title: "Default", code: `<div style="display:flex; flex-direction:column; gap:20px; max-width:320px;">
  <ga-date-input label="Session date" value="2026-03-14"></ga-date-input>
  <ga-date-input label="With a range" value="2026-03-14" min="2026-03-01" max="2026-03-31"
    hint="March only"></ga-date-input>
</div>` },
    ],
    api: [
      { name: "value", type: "YYYY-MM-DD", def: "—", desc: "The date, and what the form submits." },
      { name: "min / max", type: "YYYY-MM-DD", def: "—", desc: "Accepted range; outside it the field shows an error and keeps the old value." },
      { name: "locale / first-day", type: "—", def: "—", desc: "Passed through to the calendar." },
      { name: "label / hint / error / placeholder", type: "string", def: "—", desc: "Field chrome. The placeholder defaults to the locale’s own pattern." },
      { name: "name / required / disabled", type: "—", def: "—", desc: "Form participation." },
    ],
    events: [
      { name: "change", desc: "A date was committed, by typing or by picking. detail: { value }." },
      { name: "input", desc: "Fires while typing. detail: { value } — the raw text until it parses." },
    ],
    notes: "Typing is lenient: ISO always parses, and the locale’s own numeric order is read out of Intl rather than assumed — 14/03/2026 is day-first in en-GB and nonsense in en-US, and only the locale knows which. Anything unparseable, or a real date outside min/max, flags the field instead of silently becoming a different date.",
  },

  "chart-frame": {
    title: "Chart frame",
    tag: "ga-chart-frame",
    lead: "The furniture around a chart — title, legend, loading and empty states, responsive plot area. It draws no data: slot in an <svg>, a canvas, or a charting library’s node, and take the series colours from the --ga-chart-* tokens.",
    examples: [
      { title: "With a plot", code: `<ga-chart-frame title="Volume by week" height="160px"
  legend='[{"label":"Squat"},{"label":"Bench"}]' style="max-width:520px; display:block;">
  <svg viewBox="0 0 400 160" preserveAspectRatio="none" aria-label="Volume by week">
    <polyline fill="none" stroke="var(--ga-chart-1)" stroke-width="2"
      points="0,130 80,110 160,84 240,70 320,48 400,36"></polyline>
    <polyline fill="none" stroke="var(--ga-chart-2)" stroke-width="2"
      points="0,140 80,132 160,126 240,112 320,108 400,96"></polyline>
  </svg>
  <span slot="footer">Last six weeks.</span>
</ga-chart-frame>` },
      { title: "Loading and empty", code: `<div style="display:grid; gap:16px; grid-template-columns:1fr 1fr;">
  <ga-chart-frame title="Loading" height="120px" loading></ga-chart-frame>
  <ga-chart-frame title="Empty" height="120px" empty empty-text="No sessions yet"></ga-chart-frame>
</div>` },
    ],
    api: [
      { name: "title", type: "string", def: "—", desc: "Caption above the plot." },
      { name: "legend", type: "JSON", def: "—", desc: "Array of { label, color? }. Swatches take --ga-chart-1…8 in series order." },
      { name: "height", type: "CSS length", def: "180px", desc: "Minimum plot height." },
      { name: "loading / empty", type: "boolean", def: "false", desc: "Overlay a status in the plot area." },
      { name: "empty-text", type: "string", def: "No data", desc: "Message for the empty state." },
    ],
    slots: [
      { name: "(default)", desc: "The plot itself." },
      { name: "footer", desc: "A caption or axis note." },
    ],
    notes: "The eight-series palette is colour-blind-safe by default, not as an opt-in variant. The order was picked by simulating deuteranopia and protanopia over the swatches and measuring CIEDE2000 between every pair, so the earliest tokens are the most separable: ΔE 53.6 at two series, 26.9 at three, 6.9 at six. Past six, distinguish by more than colour.",
  },

  chat: {
    title: "Chat",
    tag: "ga-chat",
    lead: "A scrollable transcript with a header, a composer footer, and scroll-follow that stops when you scroll up. Messages are <ga-chat-message> children. Reach for it when a conversation arrives while you wait — turns aligned by speaker, role=log with aria-live, following pinned to the newest one. For a code-review thread reach for ga-comment-thread instead: a list rather than a live log, uniformly aligned, and deliberately leaving the scroll alone.",
    examples: [
      { title: "Transcript", code: `<ga-chat height="260px" style="max-width:520px;">
  <span slot="header">Coach</span>
  <ga-chat-message from="user" author="You" time="09:12">Log 3x5 at 100kg</ga-chat-message>
  <ga-chat-message from="assistant" author="Coach" time="09:12">Logged — that is a 2.5kg jump on last week.</ga-chat-message>
  <ga-chat-message from="assistant" state="pending"></ga-chat-message>
  <div slot="footer" style="display:flex; gap:8px;">
    <ga-input placeholder="Message…" style="flex:1;"></ga-input>
    <ga-button>Send</ga-button>
  </div>
</ga-chat>` },
      { title: "Message states", code: `<div style="display:flex; flex-direction:column; gap:12px; max-width:420px;">
  <ga-chat-message from="user">A sent turn.</ga-chat-message>
  <ga-chat-message from="assistant" state="streaming">A turn still arriving</ga-chat-message>
  <ga-chat-message from="assistant" state="error">Could not reach the model.</ga-chat-message>
  <ga-chat-message from="system">Session started</ga-chat-message>
</div>` },
    ],
    api: [
      { name: "height", type: "CSS length", def: "360px", desc: "Height of the scrolling transcript." },
      { name: "empty-text", type: "string", def: "No messages yet.", desc: "Shown when there are no messages." },
      { name: "from (message)", type: "user | assistant | system", def: "assistant", desc: "Alignment and treatment of a ga-chat-message. BREAKING since v0.3.0: this attribute was spelled role, which collided with the global ARIA role. Same values, new name." },
      { name: "state (message)", type: "sent | pending | streaming | error", def: "sent", desc: "Whether the turn is settled." },
      { name: "author / time (message)", type: "string", def: "—", desc: "Meta line above the bubble." },
    ],
    slots: [
      { name: "header", desc: "Title row above the transcript." },
      { name: "(default)", desc: "ga-chat-message children." },
      { name: "footer", desc: "The composer — ga-input + ga-button is the recipe." },
    ],
    notes: "Following is conditional: new content pins to the newest message only while you are already at the bottom. Scroll up and a jump-to-latest button appears — a real button in the shadow root, focusable and announced — which resumes following. A streaming turn mutates text without adding a node, which slotchange never sees, so the transcript watches the subtree too.",
  },

  tooltip: {
    title: "Tooltip",
    tag: "ga-tooltip",
    lead: "A styled label that appears beside its trigger, on hover and on keyboard focus, and is never a tab stop. It is decoration, not a name: aria-labelledby and aria-describedby are IDREFs, IDREFs are resolved within a single tree, and they do not cross a shadow root — so a bubble living in ga-tooltip's shadow root can never name a trigger outside it. Give the trigger its own aria-label or title; the tooltip adds the explanation, never the name.",
    examples: [
      { title: "Placements — each flips to the opposite side when there is no room", code: `<div style="display:flex; gap:20px; flex-wrap:wrap; padding:30px 4px;">
  <ga-tooltip text="Above the trigger"><ga-button variant="secondary">Top</ga-button></ga-tooltip>
  <ga-tooltip text="Below the trigger" placement="bottom"><ga-button variant="secondary">Bottom</ga-button></ga-tooltip>
  <ga-tooltip text="To the left" placement="left"><ga-button variant="secondary">Left</ga-button></ga-tooltip>
  <ga-tooltip text="To the right" placement="right"><ga-button variant="secondary">Right</ga-button></ga-tooltip>
</div>` },
      { title: "With no text of its own it adopts the trigger's title, so the native tooltip does not double up", code: `<ga-tooltip>
  <ga-button variant="secondary" title="Last synced 2 minutes ago">Sync status</ga-button>
</ga-tooltip>` },
      { title: "The trigger still carries its own accessible name — the tooltip cannot supply one", code: `<ga-tooltip text="Delete this run">
  <ga-button variant="ghost" aria-label="Delete this run">
    <ga-icon name="trash" size="18"></ga-icon>
  </ga-button>
</ga-tooltip>` },
    ],
    api: [
      { name: "text", type: "string", def: "—", desc: "The label. Omit it to adopt the trigger's title attribute instead." },
      { name: "placement", type: `"top" | "bottom" | "left" | "right"`, def: "top", desc: "Preferred side; flips to the opposite one when the viewport has no room." },
      { name: "delay", type: "number (ms)", def: "300", desc: "Hover show delay. Focus is never delayed — a keyboard user asked for this control explicitly, and a delay there reads as lag." },
    ],
    slots: [{ name: "(default)", desc: "The trigger the tooltip describes." }],
    events: [
      { name: "open", desc: "Fires when the bubble is shown." },
      { name: "close", desc: "Fires when it is hidden — on leave, on blur, or on Escape." },
    ],
    notes: "Why a tooltip does not satisfy the accessible-name requirement: aria-labelledby and aria-describedby are IDREFs, and IDREFs are resolved within one tree. The bubble lives in ga-tooltip's shadow root while the trigger lives in the light DOM outside it, so there is no id the trigger could point at — and because GaElement attaches every shadow root with delegatesFocus, the element that actually takes focus for a kit component (a real <button> inside ga-button's own shadow root) is a second boundary away. An unnamed icon button wrapped in a tooltip is therefore still unnamed, and ga-button's missing-name warning is deliberately left alone: that warning is correct. What the tooltip does own is the opposite coupling. A trigger carrying title would show the browser's own tooltip alongside this one, so with no text of its own the tooltip adopts the title and removes the attribute — promoting the value to aria-label first, because title is the last fallback of the name computation and removing it naively would delete a name. An explicit text is never promoted, because that would be the tooltip supplying the name. Geometry comes from the shared core/popup.js rather than a second positioner, with its min-width: anchor-width opted out: a tooltip is sized by its own words, not by the 40px button it hangs off.",
  },

  "step-list": {
    title: "Step list",
    tag: "ga-step-list",
    lead: "A vertical ordered list of status-bearing steps the reader can select — a navigator, not a progress indicator. It answers two questions at once, with two independent cursors: current is what is playing, selected is what the reader chose to look at. A reader who clicks step 2 while step 4 is running has not stopped step 4, so the two never collapse into a single highlight.",
    examples: [
      { title: "Both cursors at once — step 4 is running, step 2 is selected", code: `<ga-step-list current="s4" selected="s2" label="Run steps" style="display:block; max-width:460px;"
  steps='[{"id":"s1","label":"Open the checkout","meta":"0:00 · 1.2s","status":"passed"},
          {"id":"s2","label":"Fill in the card form","meta":"0:04 · 2.0s","status":"passed"},
          {"id":"s3","label":"Apply the promo code","meta":"0:07","status":"skipped"},
          {"id":"s4","label":"Submit the order","meta":"0:09","status":"running","badge":"retry 2"},
          {"id":"s5","label":"Assert the receipt","meta":"not reached","status":"pending"}]'>
</ga-step-list>` },
      { title: "Statuses — each carries a glyph and a word, not only a colour", code: `<ga-step-list label="Statuses" style="display:block; max-width:460px;"
  steps='[{"id":"a","label":"Passed","status":"passed"},
          {"id":"b","label":"Failed","status":"failed","badge":"assert"},
          {"id":"c","label":"Skipped","status":"skipped"},
          {"id":"d","label":"Running","status":"running"},
          {"id":"e","label":"Pending","status":"pending"}]'>
</ga-step-list>` },
    ],
    api: [
      { name: "steps", type: "JSON: { id, label, meta?, status?, badge? }[]", def: "[]", desc: "The rows. status is pending | running | passed | failed | skipped; anything else renders neutrally and is announced verbatim." },
      { name: "current", type: "string", def: "—", desc: "Id of the step that is playing. Drawn as an accent edge mark and announced as aria-current=step." },
      { name: "selected", type: "string", def: "—", desc: "Id of the step the reader chose. Drawn as a filled surface and announced as aria-pressed; reflected when a row is activated." },
      { name: "label", type: "string", def: "Steps", desc: "Accessible name for the list." },
    ],
    events: [{ name: "select", desc: "A row was activated. detail: { id, index, step }." }],
    notes: "The two cursors are kept apart on two channels. Visually current is an edge mark (an accent bar down the left of the row plus a ring on the status glyph) and selected is a surface (a filled, bordered row) — an edge and a fill read as different kinds of thing, so both survive being drawn on the same row at the same time. Semantically current is aria-current=step, the property invented for exactly the current one in a sequence, and selected is aria-pressed, because a standalone button may not carry aria-selected: ARIA allows that only inside a listbox, grid or tablist. One shared property would have forced the two answers into one, which is the bug this component exists to avoid. The markup is a real <ol> with an explicit role=list restated by hand, because WebKit drops the list role when list-style: none is applied and the list semantics are what give a screen-reader user 3 of 7 for free. Arrows move focus but do not select: selection is a seek, and selecting on every arrow keystroke would fire one seek per keypress — so the list is one tab stop, arrows and Home/End move the focus ring, and Enter or Space commits.",
  },

  scrubber: {
    title: "Scrubber",
    tag: "ga-scrubber",
    lead: "A media timeline whose track is divided into segments — each with its own extent, status and label — over an independent playhead. Reach for ga-slider when you want a plain value: it is a native <input type=range>, so it gets form participation for free, and it structurally cannot be this (a range input has no per-region children to colour and exactly one movable mark). Reach for ga-scrubber for a segmented timeline. ga-slider is unchanged by this component's existence.",
    examples: [
      { title: "A run timeline — press a segment to seek to its start, press bare track to seek to the point", code: `<ga-scrubber duration="90000" position="46000" label="Run timeline"
  style="display:block; max-width:560px;"
  segments='[{"id":"a","start":0,"duration":12000,"status":"passed","label":"Open the checkout"},
             {"id":"b","start":12000,"duration":18000,"status":"passed","label":"Card form"},
             {"id":"c","start":30000,"duration":6000,"status":"skipped","label":"Promo code"},
             {"id":"d","start":36000,"duration":24000,"status":"running","label":"Submit the order"},
             {"id":"e","start":60000,"duration":30000,"status":"pending","label":"Assert the receipt"}]'>
</ga-scrubber>` },
      { title: "A failed run, and a plain timeline with no segments", code: `<div style="display:flex; flex-direction:column; gap:24px; max-width:560px;">
  <ga-scrubber duration="40000" position="28000" label="Failed run"
    segments='[{"start":0,"duration":16000,"status":"passed","label":"Setup"},
               {"start":16000,"duration":12000,"status":"failed","label":"Checkout"},
               {"start":28000,"duration":12000,"status":"skipped","label":"Teardown"}]'></ga-scrubber>
  <ga-scrubber duration="180000" position="72000" label="Recording"></ga-scrubber>
</div>` },
    ],
    api: [
      { name: "duration", type: "number (ms)", def: "end of the last segment", desc: "Total length of the timeline." },
      { name: "position", type: "number (ms)", def: "0", desc: "The playhead." },
      { name: "segments", type: "JSON: { id?, start, duration, status?, label? }[]", def: "[]", desc: "Proportional, individually activatable regions. All times in ms; status is the same vocabulary as ga-step-list." },
      { name: "step", type: "number (ms)", def: "1% of duration", desc: "Arrow-key increment. Page Up / Page Down jump a whole segment instead." },
      { name: "label", type: "string", def: "Timeline", desc: "Accessible name." },
      { name: "disabled", type: "boolean", def: "false", desc: "Disable interaction." },
    ],
    events: [
      { name: "input", desc: "Continuous, during a drag or while keying. detail: { position }." },
      { name: "change", desc: "Committed. detail: { position, source, segment } — source is \"segment\" | \"track\" | \"keyboard\"." },
    ],
    notes: "The two-level hit behaviour is the part that feels broken when it is wrong. Pressing a segment seeks to that segment's own start, not to the pixel under the pointer, because clicking a chapter means play this chapter; pressing bare track seeks to the point pressed and keeps scrubbing while the pointer is held, under pointer capture so leaving the element mid-drag does not drop the drag. A press that lands on a segment is therefore discrete and starts no drag — mixing the two levels would make a chapter impossible to click without nudging the position. aria-valuenow has to be the raw millisecond count, which is meaningless read aloud, so every move also rewrites aria-valuetext as a human time plus the label and status of the segment the playhead is inside. The segments are not tab stops: role=slider is a leaf role, so focusable children inside it would be invalid and would bury the keyboard user in stops — instead the regions are aria-hidden pointer targets, the shape of the run is summarised once through aria-describedby, and Page Up / Page Down give the keyboard the same power the pointer has.",
  },

  comment: {
    title: "Comment",
    tag: "ga-comment",
    lead: "One comment in a review thread: an author, a timestamp, a body, an optional anchor and a resolution state. Every author is aligned identically on purpose — ga-chat-message mirrors the layout by speaker because a conversation has a me-versus-them axis, and a review thread has none. There is exactly one card treatment here and no per-author selector anywhere.",
    examples: [
      { title: "Open, resolved, and a reply that is not independently resolvable", code: `<div style="display:flex; flex-direction:column; gap:12px; max-width:520px;">
  <ga-comment author="Ada" time="2h ago" datetime="2026-07-28T09:12:00Z"
    anchor="step 3 · Submit the order">The retry fires before the toast clears, so the assertion reads the old text.</ga-comment>
  <ga-comment author="Grace" time="1h ago" no-resolve>Reproduced on Firefox too.</ga-comment>
  <ga-comment author="Alan" time="12m ago" datetime="2026-07-28T11:04:00Z" resolved>Fixed on main — the toast now awaits its own transition.</ga-comment>
</div>` },
    ],
    api: [
      { name: "author", type: "string", def: "—", desc: "Who wrote it." },
      { name: "time", type: "string", def: "—", desc: "The human-readable timestamp, e.g. \"2h ago\"." },
      { name: "datetime", type: "string", def: "value of time", desc: "The machine-readable timestamp, emitted as the &lt;time&gt; element's datetime." },
      { name: "anchor", type: "string", def: "—", desc: "What the comment is attached to." },
      { name: "resolved", type: "boolean", def: "false", desc: "Settled. Shown as a chip and as aria-pressed on the toggle, not by dimming alone." },
      { name: "no-resolve", type: "boolean", def: "false", desc: "Hide the toggle — for a reply rather than an independently resolvable thread head." },
    ],
    events: [{ name: "resolve", desc: "The toggle was activated. detail: { resolved } — the NEW state, not the old one." }],
    slots: [{ name: "(default)", desc: "The comment body." }],
    notes: "Resolution is never conveyed by opacity alone. A resolved comment dims, but the dimming is decoration stacked on a distinction that already exists in text — a visible Resolved chip, and a toggle whose aria-pressed reports the state — so anyone who cannot see the opacity difference still gets the answer, and forced-colours mode is restated explicitly because it flattens the dimming away entirely. The timestamp is a real <time>: time is what a person reads and datetime is what a machine reads, falling back to time when the host supplies only one, because a relative time with no machine value is unusable to anything that wants to sort, group or re-localise the thread.",
  },

  "comment-thread": {
    title: "Comment thread",
    tag: "ga-comment-thread",
    lead: "A list of ga-comments with a composer above them. Reach for this rather than ga-chat when the thing on screen is a document you read and navigate: it is role=list, there is no live region, and it never follows the scroll. Reach for ga-chat when it is a conversation arriving while you wait — messages aligned by speaker, role=log with aria-live, and following pinned to the newest turn.",
    examples: [
      { title: "A thread with a composer", code: `<ga-comment-thread anchor="step 3 · Submit the order" height="260px"
  placeholder="Leave a note for the team…" style="display:block; max-width:520px;">
  <ga-comment author="Ada" time="2h ago" anchor="step 3 · Submit the order">The retry fires before the toast clears.</ga-comment>
  <ga-comment author="Grace" time="1h ago" no-resolve>Reproduced on Firefox too.</ga-comment>
  <ga-comment author="Alan" time="12m ago" resolved>Fixed on main.</ga-comment>
</ga-comment-thread>` },
      { title: "The empty state still offers the composer", code: `<ga-comment-thread anchor="step 5 · Assert the receipt"
  empty-text="No comments on this step yet." submit-label="Post"
  style="display:block; max-width:520px;"></ga-comment-thread>` },
    ],
    api: [
      { name: "anchor", type: "string", def: "—", desc: "What a new comment will attach to; drives the composer's target line and rides on the event." },
      { name: "label", type: "string", def: "Comments", desc: "Accessible name for the list." },
      { name: "empty-text", type: "string", def: "No comments yet.", desc: "Shown when the thread has no comments. The composer stays." },
      { name: "placeholder", type: "string", def: "—", desc: "Composer placeholder." },
      { name: "submit-label", type: "string", def: "Comment", desc: "Composer button text." },
      { name: "error", type: "string", def: "—", desc: "A message from the host, shown under the composer." },
      { name: "busy", type: "boolean", def: "false", desc: "A submission is in flight; the composer locks." },
      { name: "height", type: "CSS length", def: "—", desc: "When set, the list scrolls inside it." },
    ],
    events: [{ name: "comment", desc: "The composer was submitted, by the button or by Cmd/Ctrl+Enter. detail: { value, anchor }. It is a request, not an outcome: the field keeps its text until the host calls accept(), which is also what appends the comment." }],
    slots: [{ name: "(default)", desc: "The ga-comment children." }],
    notes: "This is deliberately not ga-chat with different styling. It is a list, not a live log: ga-chat marks its transcript role=log with aria-live=polite, which is right for a stream you wait for, but a thread that re-announced itself every time a colleague left a note would interrupt the reader mid-sentence about content they are already looking at. It does not follow the scroll: chat pins to the newest message and watches characterData so a streaming answer stays in view, which here would yank a reader off the comment they are replying to. The composer is part of the component and sits above the list, next to the target it is commenting on, so it does not drift away as the thread grows — chat's footer is a bare slot below the transcript because in a conversation the newest thing and the thing you are writing are the same place. Submitting does not clear the field, because the host may reject it and a composer that empties optimistically loses the text. The event is named comment rather than submit: these events are composed and bubbling, and a composed submit reaching an ancestor <form> is indistinguishable from a real form submission.",
  },

  splitter: {
    title: "Splitter",
    tag: "ga-splitter",
    lead: "The draggable divider between two regions — the handle, not a split pane. It owns no layout, has no slots for the regions and never positions anything; it publishes its position as a CSS custom property and the application's own grid does the rest. A container whose job is display: grid does not earn a component, so only the part apps get wrong ships here.",
    examples: [
      { title: "The split-pane recipe: this handle plus the app's own grid", code: `<div style="display:grid; grid-template-columns: var(--ga-split, 34%) auto 1fr; height:190px;
            border:1px solid var(--ga-border-strong); border-radius:8px; overflow:hidden;">
  <section style="padding:12px; overflow:auto; background:var(--ga-bg-elev);">
    <strong>Steps</strong>
    <p class="muted" style="margin:6px 0 0; font-size:13px;">Drag the divider, or focus it and press the arrow keys.</p>
  </section>
  <ga-splitter value="34" min="20" max="70" label="Resize the steps region"></ga-splitter>
  <section style="padding:12px; overflow:auto;">
    <strong>Detail</strong>
    <p class="muted" style="margin:6px 0 0; font-size:13px;">Two regions the app owns. The splitter positions neither — it only writes --ga-split to the grid.</p>
  </section>
</div>` },
      { title: "Horizontal, splitting top from bottom", code: `<div style="display:grid; grid-template-rows: var(--ga-split, 45%) auto 1fr; height:200px;
            border:1px solid var(--ga-border-strong); border-radius:8px; overflow:hidden;">
  <section style="padding:12px; overflow:auto; background:var(--ga-bg-elev);"><strong>Preview</strong></section>
  <ga-splitter orientation="horizontal" value="45" min="20" max="80" label="Resize the log"></ga-splitter>
  <section style="padding:12px; overflow:auto;"><strong>Log</strong></section>
</div>` },
      { title: "Collapse on narrow is documentation, not code: reach for ga-panel side=left plus ga-tabs", code: `<div>
  <ga-button variant="secondary" onclick="this.nextElementSibling.show()">Open the side region</ga-button>
  <ga-panel side="left" title="Steps">
    <ga-tabs tabs='[{"id":"steps","label":"Steps"},{"id":"log","label":"Log"}]'>
      <div slot="steps" style="color:var(--ga-muted)">The narrow-viewport form of the left region — off-canvas, with a scrim and Escape to close.</div>
      <div slot="log" style="color:var(--ga-muted)">Collapse-to-tabs, without a second component to maintain.</div>
    </ga-tabs>
  </ga-panel>
</div>` },
    ],
    api: [
      { name: "value", type: "number", def: "50", desc: "Current position, written out as value + unit." },
      { name: "min / max", type: "number", def: "0 / 100", desc: "Bounds, clamped on drag and on key." },
      { name: "step", type: "number", def: "1", desc: "Arrow-key increment; Page Up / Page Down move ten steps." },
      { name: "unit", type: "string", def: "%", desc: "CSS unit written with the value; px also works." },
      { name: "orientation", type: `"vertical" | "horizontal"`, def: "vertical", desc: "A vertical bar splits left from right; a horizontal one splits top from bottom." },
      { name: "property", type: "string", def: "--ga-split", desc: "The custom property to write." },
      { name: "scope", type: `"parent" | "root"`, def: "parent", desc: "Where to write it. Custom properties inherit downwards, so the parent grid is what both regions can read." },
      { name: "label", type: "string", def: "Resize panels", desc: "Accessible name for the role=separator handle." },
    ],
    events: [
      { name: "input", desc: "Fires on every move — drag or key. detail: { value }." },
      { name: "change", desc: "Fires when a gesture completes. detail: { value }." },
    ],
    notes: "Only the divider ships, because the reusable half of a split pane already exists in the kit: a side region that collapses off-canvas with a scrim is ga-panel side=left, and collapsing to tabs on a narrow viewport is ga-tabs. What was left over was drag-to-resize, which is what an app gets wrong. The position is written to the splitter's parent rather than to the host, because custom properties inherit downwards — set on the grid, both regions and the splitter can read it, whereas a property set on the host would never reach a sibling. The element written to is also the element the drag measures against, so 50% always means half of the box the app is laying out. Dragging uses setPointerCapture rather than document listeners: capture keeps delivering pointermove after the pointer leaves an 11px strip (which it does immediately), survives crossing an <iframe>, and guarantees the matching pointerup. Changing value does not re-render, because rebuilding the shadow tree mid-drag would destroy the element holding the capture. There is no aria-controls: it would have to sit on the shadow-root handle carrying role=separator, and IDREFs do not cross a shadow boundary — a host that wants the association puts aria-controls on the <ga-splitter> element itself, where the IDREFs resolve. On the name: in most kits a divider is the static <hr> rule, so this one takes the name that says it is a drag handle and leaves ga-divider free.",
  },

};

/** Palette swatches for Foundations → Colors (token name → label). */
export const PALETTE = [
  ["--ga-bg", "Background"],
  ["--ga-bg-elev", "Elevated"],
  ["--ga-bg-elev-hover", "Elevated hover"],
  ["--ga-fg", "Foreground"],
  ["--ga-muted", "Muted"],
  ["--ga-dim", "Dim"],
  ["--ga-border-strong", "Border"],
  ["--ga-blue", "Blue / accent"],
  ["--ga-green", "Green"],
  ["--ga-amber", "Amber"],
  ["--ga-purple", "Purple"],
  ["--ga-red", "Red"],
];
