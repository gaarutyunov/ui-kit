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
      { id: "checkbox", label: "Checkbox" },
      { id: "combobox", label: "Combobox" },
      { id: "spinner", label: "Spinner" },
      { id: "alert", label: "Alert" },
      { id: "kbd", label: "Kbd" },
      { id: "code", label: "Code" },
      { id: "tabs", label: "Tabs" },
      { id: "breadcrumbs", label: "Breadcrumbs" },
      { id: "table", label: "Table" },
      { id: "quantity", label: "Quantity" },
      { id: "metric", label: "Metric" },
      { id: "note", label: "Note" },
      { id: "status", label: "Status" },
      { id: "slider", label: "Slider" },
      { id: "file-drop", label: "File drop" },
      { id: "file-button", label: "File button" },
      { id: "fab", label: "FAB" },
      { id: "panel", label: "Panel" },
      { id: "header", label: "Header" },
      { id: "bottom-nav", label: "Bottom nav" },
      { id: "bottom-sheet", label: "Bottom sheet" },
      { id: "chart-frame", label: "Chart frame" },
      { id: "chat", label: "Chat" },
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
     notes      (optional) prose HTML rendered after the examples — design
                rationale, CSS recipes, "reach for that element instead"
   ------------------------------------------------------------------------- */
export const COMPONENTS = {
  button: {
    title: "Button",
    tag: "ga-button",
    lead: "The primary action element. Set href to render it as a link, or size=\"icon\" for a square, glyph-only button. Works in any framework — it's a native custom element.",
    playground: {
      tag: "ga-button",
      slot: "Button",
      attrs: [
        { name: "variant", type: "select", options: ["secondary", "primary", "ghost", "danger"], value: "primary" },
        { name: "size", type: "select", options: ["sm", "md", "lg", "icon"], value: "md" },
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
      { title: "Icon buttons (size=\"icon\")", code: `<ga-button variant="primary" size="icon" aria-label="Add"><ga-icon name="plus" size="18"></ga-icon></ga-button>
<ga-button variant="secondary" size="icon" aria-label="Search"><ga-icon name="search" size="18"></ga-icon></ga-button>
<ga-button variant="ghost" size="icon" title="Settings"><ga-icon name="settings" size="18"></ga-icon></ga-button>
<ga-button variant="danger" size="icon" aria-label="Delete"><ga-icon name="trash" size="18"></ga-icon></ga-button>
<ga-button variant="secondary" size="icon" aria-label="Refresh" loading></ga-button>` },
      { title: "Link options", code: `<ga-button variant="primary" href="/report.pdf" download="report.pdf">Download PDF</ga-button>
<ga-button variant="secondary" href="https://github.com/gaarutyunov/ui-kit" target="_blank" rel="noopener">Open repo ↗</ga-button>` },
    ],
    api: [
      { name: "variant", type: `"secondary" | "primary" | "ghost" | "danger"`, def: "secondary", desc: "Visual style." },
      { name: "size", type: `"sm" | "md" | "lg" | "icon"`, def: "md", desc: "Control height. \"icon\" is the md footprint made square with the text padding removed — a size rather than a separate element, so every variant, the loading spinner and the start/end slots keep working." },
      { name: "href", type: "string", def: "—", desc: "Render as an anchor link." },
      { name: "download", type: "string | boolean", def: "—", desc: "(link) Forwarded to the <a>: download the target, with an optional filename." },
      { name: "target", type: "string", def: "—", desc: "(link) Forwarded to the <a>, e.g. \"_blank\"." },
      { name: "rel", type: "string", def: "—", desc: "(link) Forwarded to the <a>, e.g. \"noopener\"." },
      { name: "type", type: `"button" | "submit" | "reset"`, def: "button", desc: "(button) Forwarded to the <button>." },
      { name: "name", type: "string", def: "—", desc: "(button) Form control name, forwarded to the <button>." },
      { name: "aria-label", type: "string", def: "—", desc: "Accessible label, forwarded to the inner <a>/<button>. Required on an icon button." },
      { name: "title", type: "string", def: "—", desc: "(icon size only) Tooltip, forwarded to the inner <a>/<button> so it also becomes the accessible name." },
      { name: "disabled", type: "boolean", def: "false", desc: "Disable interaction." },
      { name: "loading", type: "boolean", def: "false", desc: "Show a spinner and block clicks." },
      { name: "block", type: "boolean", def: "false", desc: "Full-width." },
    ],
    slots: [
      { name: "(default)", desc: "Button label — or, at size=\"icon\", the glyph itself." },
      { name: "start", desc: "Leading icon." },
      { name: "end", desc: "Trailing icon." },
    ],
    notes: /* html */ `
      <h2>Icon buttons need a name</h2>
      <p>A glyph carries no accessible name, so an icon button is announced as
      "button" and nothing else — the most common accessibility defect in exactly
      this shape, and silent in the browser. <code>&lt;ga-button&gt;</code> catches
      it: a <code>size="icon"</code> button with neither <code>aria-label</code> nor
      <code>title</code> logs a console warning once, on connect.</p>
      <pre class="code"><code>&lt;!-- announced as "Delete, button" --&gt;
&lt;ga-button size="icon" aria-label="Delete"&gt;&lt;ga-icon name="trash"&gt;&lt;/ga-icon&gt;&lt;/ga-button&gt;

&lt;!-- warns: no accessible name --&gt;
&lt;ga-button size="icon"&gt;&lt;ga-icon name="trash"&gt;&lt;/ga-icon&gt;&lt;/ga-button&gt;</code></pre>
      <p class="muted">The warning is advice, not enforcement — refusing to render
      would be worse than a button that is merely unlabelled.</p>
    `,
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
    lead: "A labelled text field. Form-associated — it participates in native <form> submission. Adornments slot inside the field frame, and readonly keeps the field's shape while making it non-editable.",
    examples: [
      { title: "States", code: `<div style="display:flex; flex-direction:column; gap:16px; max-width:320px;">
  <ga-input label="Default" placeholder="Type here"></ga-input>
  <ga-input label="With hint" placeholder="Username" hint="3–20 characters"></ga-input>
  <ga-input label="Required" placeholder="Required field" required></ga-input>
  <ga-input label="Error" value="nope" error="That username is taken"></ga-input>
  <ga-input label="Disabled" placeholder="Can't touch this" disabled></ga-input>
</div>` },
      { title: "Adornments (prefix / suffix)", code: `<div style="display:flex; flex-direction:column; gap:16px; max-width:340px;">
  <ga-input label="Search" placeholder="Find a place">
    <ga-icon slot="prefix" name="search" size="16"></ga-icon>
  </ga-input>
  <ga-input label="Distance" value="12.4" hint="The unit rides inside the frame, not beside it.">
    <span slot="suffix" style="color:var(--ga-muted); font-size:13px;">km</span>
  </ga-input>
  <ga-input label="Filter" placeholder="Tag">
    <span slot="prefix" style="width:8px; height:8px; border-radius:50%; background:var(--ga-green);"></span>
    <ga-button slot="suffix" variant="ghost" size="sm">Clear</ga-button>
  </ga-input>
</div>` },
      { title: "Read-only display rows", code: `<div style="display:flex; flex-direction:column; gap:16px; max-width:340px;">
  <ga-input label="Start" value="Current location" readonly>
    <span slot="prefix" style="width:8px; height:8px; border-radius:50%; background:var(--ga-green);"></span>
  </ga-input>
  <ga-input label="Destination" value="Gorky Park, Moscow" readonly>
    <span slot="prefix" style="width:8px; height:8px; border-radius:50%; background:var(--ga-red);"></span>
    <ga-button slot="suffix" variant="ghost" size="sm">Change</ga-button>
  </ga-input>
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
      { name: "readonly", type: "boolean", def: "false", desc: "Keep the field's shape, focus ring and selectability, but stop it being edited — the \"picked value\" row a display surface needs." },
    ],
    slots: [
      { name: "prefix", desc: "Leading adornment, rendered inside the field frame (icon, status dot, currency symbol)." },
      { name: "suffix", desc: "Trailing adornment, inside the frame. The tallest adornment sets the field's height, so an action button wants a compact size (ga-button size=\"sm\")." },
    ],
    events: [
      { name: "input", desc: "Fires on every keystroke. detail: { value }." },
      { name: "change", desc: "Fires on commit. detail: { value }." },
    ],
    notes: /* html */ `
      <h2>The frame only exists when something is slotted</h2>
      <p>Adornments render <em>inside</em> the border, so a status dot or a trailing
      action reads as part of the field instead of as a sibling every app aligns by
      hand. That requires moving the frame off the <code>&lt;input&gt;</code> and onto
      a flex row — which is why it is only built when <code>prefix</code> or
      <code>suffix</code> actually has content. A field with no adornments still emits
      the bare <code>&lt;input&gt;</code> it always did, so existing usages render
      unchanged.</p>
    `,
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

  checkbox: {
    title: "Checkbox",
    tag: "ga-checkbox",
    lead: "A single boolean choice you fill in — the form-field counterpart to ga-switch's immediate on/off command. Form-associated and tri-state: indeterminate is the \"select all\" state over a partial selection.",
    playground: {
      tag: "ga-checkbox",
      attrs: [
        { name: "label", type: "text", value: "Avoid main roads" },
        { name: "checked", type: "boolean", value: false },
        { name: "indeterminate", type: "boolean", value: false },
        { name: "disabled", type: "boolean", value: false },
      ],
    },
    examples: [
      { title: "States", code: `<div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
  <ga-checkbox label="Unchecked"></ga-checkbox>
  <ga-checkbox label="Checked" checked></ga-checkbox>
  <ga-checkbox label="Mixed (indeterminate)" indeterminate></ga-checkbox>
  <ga-checkbox label="Disabled" disabled></ga-checkbox>
  <ga-checkbox label="Disabled, checked" checked disabled></ga-checkbox>
</div>` },
      { title: "Select all (the tri-state at work)", code: `<div style="display:flex; flex-direction:column; gap:10px; align-items:flex-start;"
  onchange="const a=this.querySelector('.all'), k=[...this.querySelectorAll('.item')]; if(event.target===a) k.forEach(c=>c.checked=a.checked); const n=k.filter(c=>c.checked).length; a.indeterminate=n>0&&n<k.length; a.checked=n===k.length;">
  <ga-checkbox class="all" label="All layers" indeterminate></ga-checkbox>
  <ga-checkbox class="item" label="Bike lanes" checked style="margin-left:24px"></ga-checkbox>
  <ga-checkbox class="item" label="Bike parking" style="margin-left:24px"></ga-checkbox>
  <ga-checkbox class="item" label="Repair stations" style="margin-left:24px"></ga-checkbox>
</div>` },
      { title: "Form participation", code: `<form style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
  <ga-checkbox name="lanes" label="Bike lanes — value defaults to “on”" checked></ga-checkbox>
  <ga-checkbox name="hills" value="avoid" label="Avoid hills — value is “avoid”"></ga-checkbox>
  <ga-checkbox name="off" label="Disabled — contributes nothing" checked disabled></ga-checkbox>
  <ga-button variant="primary" size="sm"
    onclick="const f=this.closest('form'); f.querySelector('ga-status').setAttribute('text', [...new FormData(f)].map(([k,v])=>k+'='+v).join(', ') || 'nothing submitted');">
    Read the form data
  </ga-button>
  <ga-status tone="ok" text="—"></ga-status>
</form>` },
    ],
    api: [
      { name: "checked", type: "boolean", def: "false", desc: "The value (reflected). Also the .checked property." },
      { name: "indeterminate", type: "boolean", def: "false", desc: "The mixed display state. Wins over checked visually and in ARIA (aria-checked=\"mixed\"), but the submitted value is still the one checked says." },
      { name: "disabled", type: "boolean", def: "false", desc: "Disable interaction. A disabled box contributes nothing to the form." },
      { name: "label", type: "string", def: "—", desc: "Text beside the box; clicking it toggles." },
      { name: "name", type: "string", def: "—", desc: "Form control name." },
      { name: "value", type: "string", def: "on", desc: "Value submitted when checked, as in the native control." },
    ],
    events: [{ name: "change", desc: "Fires on toggle (click, Space, or a label click). detail: { checked }." }],
    notes: /* html */ `
      <h2>Checkbox or switch?</h2>
      <p>A <strong>switch</strong> is an immediate command — "dark mode, now". A
      <strong>checkbox</strong> is a value you are filling in, usually alongside other
      fields and usually submitted with a form. That is why this one is
      form-associated: a named, checked, enabled box contributes
      <code>name=value</code> (<code>value</code> defaults to <code>"on"</code>) and a
      disabled one contributes nothing at all.</p>

      <h2>The mixed state resolves to checked</h2>
      <p><code>indeterminate</code> is a display state, not a third value: activating a
      mixed box turns it <em>on</em> rather than flipping <code>checked</code> — the
      behaviour "select all" depends on, and what the native control does. Set it back
      from the host whenever the partial selection changes.</p>
      <p class="muted">Rendered as a <code>&lt;button role="checkbox"&gt;</code>, not a
      native <code>&lt;input&gt;</code>: the mixed state has no HTML attribute
      (<code>input.indeterminate</code> is IDL-only), so a declarative
      <code>indeterminate</code> attribute could never be expressed in the template.
      Nothing is lost — form participation comes from <code>ElementInternals</code>
      either way, and the button is focusable, in the tab order and toggles on Space.</p>
    `,
  },

  combobox: {
    title: "Combobox",
    tag: "ga-combobox",
    lead: "A text field with an asynchronous suggestion list. The host owns matching: answer the debounced filter event by replacing options.",
    examples: [
      { title: "Suggestions", code: `<ga-combobox label="City" placeholder="Start typing…"
  style="max-width:320px; display:block;"
  options='[{"value":"lis","label":"Lisbon","description":"Portugal"},{"value":"lju","label":"Ljubljana","description":"Slovenia"},{"value":"lim","label":"Lima","description":"Peru"},{"value":"lon","label":"London","description":"United Kingdom"}]'
  hint="Arrow down to browse, Enter to choose."></ga-combobox>` },
      { title: "No results, and the pending state", code: `<div style="display:flex; flex-direction:column; gap:20px; max-width:320px;">
  <ga-combobox label="Nothing matched" value="qqq" options="[]"
    no-results-text="No city by that name"></ga-combobox>

  <ga-combobox label="While the host fetches" value="lis" loading
    loading-text="Searching cities…"></ga-combobox>
</div>` },
      { title: "Free text and errors", code: `<div style="display:flex; flex-direction:column; gap:20px; max-width:320px;">
  <ga-combobox label="Tag" placeholder="Anything goes"
    hint="Not in the list? Type it and press Enter."
    options='[{"value":"commute","label":"Commute"},{"value":"leisure","label":"Leisure"}]'></ga-combobox>

  <ga-combobox label="Destination" value="Nowhere" required
    error="Pick a destination from the list"></ga-combobox>
</div>` },
    ],
    api: [
      { name: "options", type: "JSON", def: "—", desc: "Array of { value, label, description?, disabled? }. Rendered exactly as given — never filtered locally. Falls back to slotted <option>s." },
      { name: "value", type: "string", def: "—", desc: "The committed value: a chosen suggestion's value, or the typed text." },
      { name: "loading", type: "boolean", def: "false", desc: "Set while fetching, so the list reads “Searching…” instead of flashing “No results”." },
      { name: "debounce", type: "number", def: "200", desc: "Milliseconds of quiet before filter fires." },
      { name: "no-results-text / loading-text", type: "string", def: "No results / Searching…", desc: "The two empty states, for translation." },
      { name: "placeholder", type: "string", def: "—", desc: "Shown while the field is empty." },
      { name: "label / hint / error", type: "string", def: "—", desc: "Field chrome, as on ga-input." },
      { name: "name / required / disabled", type: "—", def: "—", desc: "Form participation." },
    ],
    events: [
      { name: "filter", desc: "Debounced typing — the async hook. detail: { text }. Answer it by replacing options." },
      { name: "input", desc: "Every keystroke, undebounced. detail: { text }." },
      { name: "change", desc: "A value was committed, by choosing, Enter or blur. detail: { value, label }." },
    ],
    slots: [{ name: "(default)", desc: "<option> elements, a static alternative to the options attribute." }],
    notes: /* html */ `
      <p>This is <code>ga-select</code>'s free-text sibling and shares its
      machinery — the same anchored top-layer popup, the same listbox rows and
      roving <code>aria-activedescendant</code>. Reach for <code>ga-select</code>
      when the answer must be one of a known set, and for
      <code>ga-combobox</code> when the set is too large to ship, comes from a
      server, or the user may type something that is not in it at all.</p>

      <p><strong>Wiring the async source.</strong> Nothing is filtered locally,
      and that is the point: a server that answers <code>"sf"</code> with
      "San Francisco" would have its own result filtered straight back out by a
      substring pass. Answer <code>filter</code> instead, and hold
      <code>loading</code> across the round trip so the list says
      "Searching…" rather than flashing "No results" on every letter:</p>
      <pre class="code"><code>box.addEventListener("filter", async (e) => {
  box.loading = true;
  box.options = await search(e.detail.text);
  box.loading = false;
});</code></pre>
      <p class="muted">New options never re-render the field, so they can land
      mid-word without disturbing the caret.</p>

      <p><strong>Two values.</strong> Choosing a suggestion puts its
      <code>label</code> in the field and its <code>value</code> on the element,
      so an id-backed list keeps its id — <code>change</code> carries both.
      Typing something that is not in the list commits that text as the value.</p>

      <p><strong>Keyboard.</strong> <ga-kbd>↓</ga-kbd> opens and moves into the
      list, <ga-kbd>↑</ga-kbd>/<ga-kbd>↓</ga-kbd>/<ga-kbd>Home</ga-kbd>/<ga-kbd>End</ga-kbd>
      move, <ga-kbd>Enter</ga-kbd> chooses the active suggestion or commits the
      typed text, and <ga-kbd>Esc</ga-kbd> closes the list — then clears the
      field if pressed again. <ga-kbd>Tab</ga-kbd> deliberately leaves the text
      alone: a suggestion merely arrowed past is not the value. Disabled options
      are skipped by keyboard and pointer alike.</p>
    `,
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

  quantity: {
    title: "Quantity",
    tag: "ga-quantity",
    lead: "A number with its unit: 24.5 km/h. One measured value — not a summary of a distribution, which is why it isn't called a stat. It flows inline, so it drops into a sentence or a table cell; give it a label and you have a ga-metric.",
    playground: {
      tag: "ga-quantity",
      attrs: [
        { name: "value", type: "text", value: "24.5" },
        { name: "unit", type: "text", value: "km/h" },
        { name: "placeholder", type: "text", value: "–" },
      ],
    },
    examples: [
      { title: "In a sentence", code: `<p style="margin:0; max-width:52ch; line-height:1.7;">
  The route is <ga-quantity value="12.4" unit="km"></ga-quantity> long, climbs
  <ga-quantity value="184" unit="m"></ga-quantity>, and should take about
  <ga-quantity value="41" unit="min"></ga-quantity> at your average of
  <ga-quantity value="18.2" unit="km/h"></ga-quantity>.
</p>` },
      { title: "Unitless, and with no value yet", code: `<div style="display:flex; gap:28px; align-items:baseline; font-size:20px;">
  <span><ga-quantity value="7"></ga-quantity> — no unit, no trailing space</span>
  <span><ga-quantity unit="km/h"></ga-quantity> — waiting for the first reading</span>
  <span><ga-quantity placeholder="n/a" unit="km"></ga-quantity> — custom placeholder</span>
</div>` },
      { title: "In a table cell", code: `<ga-table columns='[{"label":"Segment"},{"label":"Length","align":"right"},{"label":"Climb","align":"right"}]'>
  <div><span>Embankment</span><span><ga-quantity value="4.1" unit="km"></ga-quantity></span><span><ga-quantity value="12" unit="m"></ga-quantity></span></div>
  <div><span>Park loop</span><span><ga-quantity value="6.0" unit="km"></ga-quantity></span><span><ga-quantity value="98" unit="m"></ga-quantity></span></div>
  <div><span>Bridge</span><span><ga-quantity value="2.3" unit="km"></ga-quantity></span><span><ga-quantity unit="m"></ga-quantity></span></div>
</ga-table>` },
    ],
    api: [
      { name: "value", type: "string | number", def: "—", desc: "The number. Formatting is the app's job — the element never rounds or localises." },
      { name: "unit", type: "string", def: "—", desc: "Rendered subordinate to the value. Omit it and there is no leftover spacing: the element ends at the last digit." },
      { name: "placeholder", type: "string", def: "–", desc: "Shown in the value's place while value is empty, so a readout that fills in mid-flight doesn't make the layout jump." },
    ],
    notes: /* html */ `
      <h2>Quantity or metric?</h2>
      <p>A <strong>quantity</strong> is a number with its unit. A
      <strong>metric</strong> is a quantity that carries a label. Reach for
      <code>&lt;ga-quantity&gt;</code> when the surrounding text — a sentence, a
      column header — already says what the number is;
      <a href="#/metric"><code>&lt;ga-metric&gt;</code></a> when it doesn't and the
      number needs its own caption.</p>
      <p class="muted">Neither is a "stat": a statistic summarises a distribution
      (a mean, a median, a spread). <code>24.5 km/h</code> right now is one measured
      value.</p>

      <h2>Styling</h2>
      <p>It renders <code>display: inline</code> and inherits the surrounding font, so
      a quantity in a sentence looks like the sentence. Colours come from three custom
      properties — the same contract <code>&lt;ga-metric&gt;</code> composes through —
      and the two spans are exposed as the <code>value</code> and <code>unit</code>
      parts.</p>
      <pre class="code"><code>--ga-quantity-color              /* the value */
--ga-quantity-unit-color         /* the unit  */
--ga-quantity-placeholder-color  /* the "–" while there is no value */</code></pre>
    `,
  },

  metric: {
    title: "Metric",
    tag: "ga-metric",
    lead: "A labelled quantity — 24.5 with \"km/h now\" underneath. Built from ga-quantity, with shared baselines so a group lines up without per-app CSS and a placeholder that holds the tile's footprint until the first value arrives. There is deliberately no row container: lay a group out with the grid recipe below.",
    playground: {
      tag: "ga-metric",
      attrs: [
        { name: "label", type: "text", value: "km/h now" },
        { name: "value", type: "text", value: "24.5" },
        { name: "unit", type: "text", value: "" },
        { name: "tone", type: "select", options: ["neutral", "accent", "ok", "warn", "error"], value: "accent" },
        { name: "primary", type: "boolean", value: true },
      ],
    },
    examples: [
      { title: "The grid recipe — a HUD of six readouts, one primary", code: `<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr));
            gap:20px 24px; max-width:440px; padding:18px;
            border:1px solid var(--ga-border); border-radius:var(--ga-radius);">
  <ga-metric primary tone="accent" label="km/h now" value="24.5"></ga-metric>
  <ga-metric label="avg km/h" value="18.2"></ga-metric>
  <ga-metric label="max km/h" value="41.0"></ga-metric>
  <ga-metric label="distance" value="12.4" unit="km"></ga-metric>
  <ga-metric label="elapsed" value="41:07"></ga-metric>
  <ga-metric label="ETA" value="18:32"></ga-metric>
</div>` },
      { title: "A group with no primary member", code: `<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:16px 24px; max-width:420px;
            --ga-metric-primary-size: var(--ga-fs-xl, 24px);">
  <ga-metric label="distance" value="12.4" unit="km"></ga-metric>
  <ga-metric label="climb" value="184" unit="m"></ga-metric>
  <ga-metric label="elapsed" value="41:07"></ga-metric>
</div>` },
      { title: "Tones", code: `<div style="display:grid; grid-template-columns:repeat(5, minmax(0, 1fr)); gap:24px; max-width:520px;">
  <ga-metric label="neutral" value="18.2"></ga-metric>
  <ga-metric tone="accent" label="accent" value="24.5"></ga-metric>
  <ga-metric tone="ok" label="ok" value="41.0"></ga-metric>
  <ga-metric tone="warn" label="warn" value="4.2"></ga-metric>
  <ga-metric tone="error" label="error" value="0.0"></ga-metric>
</div>` },
      { title: "Waiting for the first value", code: `<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:20px 24px; max-width:440px;">
  <ga-metric primary tone="accent" label="km/h now"></ga-metric>
  <ga-metric label="avg km/h"></ga-metric>
  <ga-metric label="ETA" placeholder="—"></ga-metric>
</div>` },
      { title: "A bare quantity, inline", code: `<p style="margin:0; max-width:54ch; line-height:1.7;">
  Six metrics belong in the HUD above — but in prose the sentence already says what
  the number is, so the primitive is enough: you rode
  <ga-quantity value="12.4" unit="km"></ga-quantity> in
  <ga-quantity value="41" unit="min"></ga-quantity>.
</p>` },
    ],
    api: [
      { name: "label", type: "string", def: "—", desc: "The word for what was measured, rendered under the value. Kept to one line (it ellipsises, with the full text in the tooltip) so it cannot change the tile's height." },
      { name: "value", type: "string | number", def: "—", desc: "The number, passed straight to the inner ga-quantity." },
      { name: "unit", type: "string", def: "—", desc: "Optional unit, rendered subordinate to the value." },
      { name: "placeholder", type: "string", def: "–", desc: "Shown while value is empty." },
      { name: "tone", type: `"neutral" | "accent" | "ok" | "warn" | "error"`, def: "neutral", desc: "Colours the value; the unit follows at 60% of it." },
      { name: "primary", type: "boolean", def: "false", desc: "The lead readout — a speedometer among its trip counters. Larger scale, still baseline-aligned with its neighbours." },
    ],
    notes: /* html */ `
      <h2>The grid recipe</h2>
      <p>A set of metrics is laid out by the app. There is <strong>no row or grid
      container element</strong>: a wrapper whose whole job is
      <code>display: grid</code> does not earn a component, so the recipe lives here
      instead — copy it and change the track count.</p>
      <pre class="code"><code>.hud {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* minmax(0,·) so long values can ellipsise */
  gap: var(--ga-space-5, 20px) var(--ga-space-6, 24px);
}</code></pre>
      <pre class="code"><code>&lt;div class="hud"&gt;
  &lt;ga-metric primary tone="accent" label="km/h now" value="24.5"&gt;&lt;/ga-metric&gt;
  &lt;ga-metric label="avg km/h" value="18.2"&gt;&lt;/ga-metric&gt;
  &lt;ga-metric label="max km/h" value="41.0"&gt;&lt;/ga-metric&gt;
&lt;/div&gt;</code></pre>
      <p>No <code>align-items</code> is needed, and nothing has to be told how tall the
      big tile is. Every metric carries an invisible zero-width strut sized at
      <code>--ga-metric-primary-size</code> — the group's largest scale — so the
      <code>primary</code> tile and its subordinate neighbours put their value baselines
      in exactly the same place, and the labels below line up too. It works the same
      inside a flex row or under <code>align-items: start</code>: alignment is a
      property of the element, not of the container it is dropped into.</p>
      <p>A group with <em>no</em> primary member is still reserving that taller band —
      set <code>--ga-metric-primary-size</code> to the subordinate scale on the
      container to reclaim it:</p>
      <pre class="code"><code>.hud--flat { --ga-metric-primary-size: var(--ga-fs-xl, 24px); }</code></pre>
      <pre class="code"><code>--ga-metric-value-size    /* subordinate value scale (default --ga-fs-xl)  */
--ga-metric-primary-size  /* primary value scale AND the shared strut     */
--ga-metric-label-size    /* label scale (default --ga-fs-xs)             */</code></pre>

      <h2>When to reach for ga-table instead</h2>
      <p>A group of metrics is <strong>not</strong> tabular data, and
      <a href="#/table"><code>&lt;ga-table&gt;</code></a> is the wrong element for it on
      three counts:</p>
      <ul>
        <li><strong>There are no columns.</strong> <code>ga-table</code> takes a
        <code>columns</code> JSON attribute and slotted rows that share one grid
        template — a header plus <em>homogeneous</em> rows. A HUD is heterogeneous:
        km/h, a clock time, a distance, an elapsed duration. "km/h now" is a caption
        under one number, not a column header shared by other rows.</li>
        <li><strong>One tile is deliberately bigger.</strong> Current speed is the
        primary readout and the rest are subordinate. A table row cannot express that,
        and shouldn't.</li>
        <li><strong>A table announces itself as a table.</strong> A screen reader would
        read a grid of independent metrics as rows and columns, with navigation
        semantics that do not apply.</li>
      </ul>
      <p>Use <code>&lt;ga-table&gt;</code> when the rows really are homogeneous and share
      a header — a leaderboard, a list of segments, a token reference. Put a
      <a href="#/quantity"><code>&lt;ga-quantity&gt;</code></a> in its cells if the
      numbers want units.</p>
    `,
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

  status: {
    title: "Status",
    tag: "ga-status",
    lead: "A single-line, tone-coloured status message. A line, not a box — it carries role=\"status\" so a screen reader announces every change without the element taking focus, and it occupies its line even when empty so the layout never jumps.",
    playground: {
      tag: "ga-status",
      slot: "Recalculating the route…",
      attrs: [
        { name: "tone", type: "select", options: ["neutral", "ok", "error"], value: "neutral" },
      ],
    },
    examples: [
      { title: "Tones", code: `<div style="display:flex; flex-direction:column; gap:8px; max-width:420px;">
  <ga-status text="Recalculating the route…"></ga-status>
  <ga-status tone="ok" text="Route found — 12.4 km, mostly bike lanes."></ga-status>
  <ga-status tone="error" text="No route: the bridge is closed."></ga-status>
</div>` },
      { title: "Announced on change", code: `<div style="display:flex; flex-direction:column; gap:14px; max-width:460px;"
  onclick="const b=event.target.closest('ga-button'); if(!b) return; const s=this.querySelector('ga-status'); s.setAttribute('tone', b.dataset.tone); s.setAttribute('text', b.dataset.text);">
  <ga-status text="Ready."></ga-status>
  <div style="display:flex; gap:8px; flex-wrap:wrap;">
    <ga-button size="sm" data-tone="neutral" data-text="Recalculating the route…">Working</ga-button>
    <ga-button size="sm" data-tone="ok" data-text="Route found — 12.4 km.">Done</ga-button>
    <ga-button size="sm" data-tone="error" data-text="No route: the bridge is closed.">Failed</ga-button>
    <ga-button size="sm" data-tone="neutral" data-text="">Clear</ga-button>
  </div>
</div>` },
      { title: "Empty, it still holds its line", code: `<div style="max-width:420px; border:1px solid var(--ga-border); border-radius:var(--ga-radius); padding:14px;">
  <div style="display:flex; gap:8px; margin-bottom:10px;">
    <ga-button variant="primary" size="sm">Route</ga-button>
    <ga-button size="sm">Reset</ga-button>
  </div>
  <ga-status></ga-status>
  <p style="margin:10px 0 0; color:var(--ga-muted); font-size:13px;">
    The empty status above still reserves one line, so this paragraph does not jump
    when a message appears.
  </p>
</div>` },
    ],
    api: [
      { name: "tone", type: `"neutral" | "ok" | "error"`, def: "neutral", desc: "Text colour. \"success\" and \"danger\" are accepted as aliases of ok / error." },
      { name: "text", type: "string", def: "—", desc: "The message. Convenience for setting it without touching light DOM — written with textContent, so it needs no escaping." },
    ],
    slots: [{ name: "(default)", desc: "The message, when it needs rich content. Use instead of text." }],
    notes: /* html */ `
      <h2>Status or alert?</h2>
      <p><a href="#/alert"><code>&lt;ga-alert&gt;</code></a> is a box: it carries a
      title, an icon and a dismiss affordance. None of those apply to
      "Recalculating…" under a toolbar, and folding the two together would make both
      harder to read. This is the line; the alert is the box.</p>

      <h2>Why it is announced</h2>
      <p><code>role="status"</code> sits on the <em>host</em>, not inside the shadow
      root: a live region has to exist before its content changes, and slotted text
      lives in the light DOM, where a shadow-internal region's coverage is not something
      every screen reader agrees on. For the same reason the shadow tree is built once
      and <code>text</code> is patched in place — re-rendering would swap the live region
      for a fresh node that already has its content, which is exactly the case screen
      readers stay silent about.</p>
      <p class="muted">The line never wraps; it truncates, so the reserved line stays one
      line high. The full text is still in the DOM and still announced. Anything long
      enough to need wrapping wants <code>&lt;ga-alert&gt;</code>.</p>
    `,
  },

  slider: {
    title: "Slider",
    tag: "ga-slider",
    lead: "A range slider with an optional label and live value readout. Form-associated. Name the two ends with label-start / label-end for the \"this ↔ that\" preference slider where the number itself means nothing.",
    examples: [
      { title: "Default", code: `<div style="display:flex; flex-direction:column; gap:20px; max-width:360px;">
  <ga-slider label="Depth" value="65"></ga-slider>
  <ga-slider label="Disabled" value="40" disabled></ga-slider>
</div>` },
      { title: "End labels", code: `<div style="display:flex; flex-direction:column; gap:24px; max-width:360px;">
  <ga-slider label="Route preference" value="70"
    label-start="Shortest" label-end="Safest"></ga-slider>
  <ga-slider value="35" hide-value
    label-start="Flat" label-end="Hilly"></ga-slider>
  <ga-slider label="Detour tolerance" value="20" hide-value
    label-start="None" label-end="Any"></ga-slider>
</div>` },
    ],
    api: [
      { name: "min / max / step", type: "number", def: "0 / 100 / 1", desc: "Range bounds." },
      { name: "value", type: "number", def: "50", desc: "Current value (reflected on set)." },
      { name: "label", type: "string", def: "—", desc: "Label above the track." },
      { name: "label-start", type: "string", def: "—", desc: "Caption under the low end of the track." },
      { name: "label-end", type: "string", def: "—", desc: "Caption under the high end. Either end label may be used on its own." },
      { name: "hide-value", type: "boolean", def: "false", desc: "Drop the printed readout — for a preference slider whose number means nothing to the user. The native range still exposes its value to assistive technology and to the input / change events." },
      { name: "disabled", type: "boolean", def: "false", desc: "Disable interaction." },
    ],
    events: [
      { name: "input", desc: "Fires while dragging. detail: { value }." },
      { name: "change", desc: "Fires on release. detail: { value }." },
    ],
    notes: /* html */ `
      <h2>Attributes, not slots</h2>
      <p>The three additions are attributes so the common case stays one line of
      markup. All three are inert when absent: a slider written against the original
      <code>label</code>-only API renders exactly the markup it always did.</p>
    `,
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

  "file-button": {
    title: "File button",
    tag: "ga-file-button",
    lead: "A compact control that opens the file dialog — the same job as ga-file-drop, for the places a 100px dashed drop area does not fit: a toolbar, a table row, next to an existing field. It emits the same files event, so a host can swap one for the other without touching its handler.",
    playground: {
      tag: "ga-file-button",
      attrs: [
        { name: "label", type: "text", value: "Choose file" },
        { name: "accept", type: "text", value: "image/*" },
        { name: "multiple", type: "boolean", value: false },
      ],
    },
    examples: [
      { title: "Default", code: `<ga-file-button></ga-file-button>` },
      { title: "Label, filter, multiple", code: `<div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
  <ga-file-button label="Import GPX" accept=".gpx,application/gpx+xml"></ga-file-button>
  <ga-file-button label="Add photos" accept="image/*" multiple></ga-file-button>
</div>` },
      { title: "In a toolbar", code: `<div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; padding:10px;
            border:1px solid var(--ga-border); border-radius:var(--ga-radius);">
  <ga-button size="icon" aria-label="Add"><ga-icon name="plus" size="18"></ga-icon></ga-button>
  <ga-button size="icon" aria-label="Layers"><ga-icon name="layers" size="18"></ga-icon></ga-button>
  <ga-file-button label="Import GPX" accept=".gpx"></ga-file-button>
  <ga-button size="icon" aria-label="Download"><ga-icon name="download" size="18"></ga-icon></ga-button>
</div>` },
    ],
    api: [
      { name: "accept", type: "string", def: "—", desc: "Native file-input accept filter — passed straight through to the hidden input, so it filters the dialog." },
      { name: "multiple", type: "boolean", def: "false", desc: "Allow selecting multiple files." },
      { name: "label", type: "string", def: "Choose file", desc: "Button text." },
    ],
    events: [{ name: "files", desc: "Fires on selection. detail: { files: File[] } — identical to ga-file-drop." }],
    notes: /* html */ `
      <h2>Wiring it up</h2>
      <pre class="code"><code>picker.addEventListener("files", (e) =&gt; {
  for (const file of e.detail.files) importTrack(file);
});</code></pre>
      <p>Picking the <em>same</em> file twice in a row still fires: the hidden input's
      value is cleared after every selection, because a native file input stays silent
      when its value is unchanged.</p>

      <h2>Why it composes ga-button</h2>
      <p>This <em>is</em> a button, so it renders one rather than restyling a button of
      its own — it picks up the kit's variants, sizes, focus ring and hover treatment as
      they evolve instead of drifting from them. The native
      <code>&lt;input type="file"&gt;</code> stays hidden and is only ever clicked
      programmatically: the native widget cannot be styled and stops being keyboard
      reachable once hidden, whereas the button is focusable and activates on
      Enter / Space.</p>
      <p class="muted">Reach for
      <a href="#/file-drop"><code>&lt;ga-file-drop&gt;</code></a> when the drop area is
      the primary affordance of the screen, and this when it is one control among
      many.</p>
    `,
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
    lead: "A slide-in drawer with a backdrop — ported from stereoscope's curtain — or, with overlay, a floating control surface above a full-bleed canvas. Close via ×, the scrim, or Escape.",
    examples: [
      { title: "Drawer", code: `<ga-button variant="primary" onclick="this.nextElementSibling.show()">Open panel</ga-button>
<ga-panel title="Settings">
  <p style="margin:0 0 14px;">Drawer body content goes here.</p>
  <ga-switch label="Enable previews" checked></ga-switch>
  <div slot="footer"><ga-button variant="primary" onclick="this.closest('ga-panel').close()">Done</ga-button></div>
</ga-panel>` },
      { title: "Overlay mode — no scrim, the canvas stays live", code: `<div style="height:170px; border-radius:var(--ga-radius); display:flex; align-items:center; justify-content:center;
            background:repeating-linear-gradient(45deg, var(--ga-bg-elev) 0 14px, var(--ga-bg) 14px 28px);
            border:1px solid var(--ga-border); color:var(--ga-muted); font-size:13px; text-align:center; padding:12px;">
  A stand-in for the app's canvas. Open the panel and this stays visible,
  clickable and keyboard-reachable — that is the whole point of overlay mode.
</div>
<ga-button variant="primary" style="margin-top:12px" onclick="this.nextElementSibling.show()">Open overlay panel</ga-button>
<ga-panel overlay title="Route">
  <ga-metric primary tone="accent" label="km/h now" value="24.5"></ga-metric>
  <ga-slider label="Detour tolerance" value="30" hide-value label-start="None" label-end="Any"></ga-slider>
  <ga-checkbox label="Prefer bike lanes" checked></ga-checkbox>
  <ga-status tone="ok" text="Route found — 12.4 km." style="margin-top:10px"></ga-status>
</ga-panel>` },
      { title: "Modal overlay (trap-focus)", code: `<ga-button onclick="this.nextElementSibling.show()">Open a panel that holds the keyboard</ga-button>
<ga-panel overlay trap-focus title="Filters">
  <p style="margin:0 0 14px;">Tab cycles inside this panel, and focus returns to the
  opener when it closes. Escape still dismisses it.</p>
  <ga-checkbox label="Bike lanes" checked></ga-checkbox>
  <div slot="footer"><ga-button variant="primary" onclick="this.closest('ga-panel').close()">Apply</ga-button></div>
</ga-panel>` },
    ],
    api: [
      { name: "open", type: "boolean", def: "false", desc: "Reflected open state." },
      { name: "side", type: `"right" | "left"`, def: "right", desc: "Edge it slides from." },
      { name: "title", type: "string", def: "—", desc: "Header text (or use the header slot)." },
      { name: "overlay", type: "boolean", def: "false", desc: "Float above page content instead of acting as a drawer: a card inset from the viewport corner, no scrim, backdrop blur, stacked at --ga-z-overlay." },
      { name: "trap-focus", type: "boolean", def: "false", desc: "Confine Tab to the panel while it is open and restore focus to the opener on close. OFF by default — a persistent control panel must not hold the keyboard." },
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
    notes: /* html */ `
      <h2>Overlay is a mode, not a second component</h2>
      <p>A floating control surface and a drawer differ only in where they sit and what
      they let through — same header / body / footer, same open/close API — so a second
      element would duplicate all of it. With <code>overlay</code> the panel becomes a
      self-contained card inset from the viewport corner, the scrim is dropped (keeping
      the canvas beneath visible <em>and</em> clickable is the whole point), and the
      stacking level comes from a token instead of the drawer's internal constant.</p>
      <pre class="code"><code>--ga-z-canvas:  0;   /* the app's own full-bleed content, underneath */
--ga-z-overlay: 900; /* a floating panel or sheet above it          */</code></pre>
      <p>That the level is a <em>token</em> is deliberate: an app compositing its own
      layers can position relative to the kit instead of guessing a z-index and losing
      the race to a map canvas.</p>

      <h2>Focus containment is opt-in</h2>
      <p><code>trap-focus</code> is <strong>off by default</strong>. An overlay panel is
      usually persistent — it stays up for the life of the screen — and an element that
      permanently held the keyboard would make the rest of the page unreachable. Set it
      only when the panel is genuinely modal.
      <a href="#/bottom-sheet"><code>&lt;ga-bottom-sheet&gt;</code></a> is the deliberate
      opposite: it covers what is underneath, so it traps unless told not to.</p>

      <h2>Composing a full-bleed canvas app</h2>
      <p>Three layers, bottom to top:</p>
      <ol>
        <li>the app's canvas fills the viewport at <code>--ga-z-canvas</code> (0);</li>
        <li><code>&lt;ga-panel overlay&gt;</code> floats above it at
        <code>--ga-z-overlay</code> (900) carrying the controls. It does not trap focus,
        so the canvas and the rest of the page stay keyboard-reachable while the panel
        is up;</li>
        <li>at or below <strong>640px</strong> — the documented breakpoint, readable as
        <code>GaBottomSheet.breakpoint</code> — the same content moves into
        <code>&lt;ga-bottom-sheet&gt;</code>, which is modal and traps focus.</li>
      </ol>
      <pre class="code"><code>&lt;div id="map" style="position:fixed; inset:0; z-index:var(--ga-z-canvas)"&gt;&lt;/div&gt;
&lt;ga-panel overlay open title="Route"&gt;…controls…&lt;/ga-panel&gt;
&lt;ga-bottom-sheet hidden&gt;…the same controls…&lt;/ga-bottom-sheet&gt;</code></pre>
      <pre class="code"><code>import { GaBottomSheet } from "@gaarutyunov/ui-kit";

const narrow = matchMedia(\`(max-width: \${GaBottomSheet.breakpoint}px)\`);
const swap = () =&gt; {
  panel.hidden = narrow.matches;
  sheet.hidden = !narrow.matches;
};
narrow.addEventListener("change", swap);
swap();</code></pre>
      <p class="muted">The breakpoint is a static on the element so an app's
      <code>matchMedia</code> query and the kit's documentation cannot drift apart.</p>
    `,
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
    lead: "A draggable sheet that rises from the bottom with snap points — like Google Maps. Drag the handle between peek / half / full, or drag past peek to dismiss; Escape dismisses it too. It is the narrow-viewport half of ga-panel[overlay], and being modal, it traps focus by default.",
    examples: [
      { title: "Draggable sheet", code: `<ga-button variant="primary" onclick="this.nextElementSibling.show('half')">Open bottom sheet</ga-button>
<ga-bottom-sheet snap="half">
  <div slot="header"><strong>Nearby places</strong></div>
  <p style="margin:0 0 14px;">Drag the grab handle up for full height, down to peek — or drag past peek to dismiss. Escape works too, and Tab stays inside the sheet.</p>
  <ga-slider label="Search radius" value="50"></ga-slider>
</ga-bottom-sheet>` },
      { title: "Overlay treatment, over a canvas", code: `<div style="height:150px; border-radius:var(--ga-radius); display:flex; align-items:center; justify-content:center;
            background:repeating-linear-gradient(45deg, var(--ga-bg-elev) 0 14px, var(--ga-bg) 14px 28px);
            border:1px solid var(--ga-border); color:var(--ga-muted); font-size:13px; text-align:center; padding:12px;">
  A stand-in for the app's canvas. The sheet paints above it at --ga-z-overlay,
  with a blurred backdrop so it stays legible over whatever is moving underneath.
</div>
<ga-button variant="primary" style="margin-top:12px" onclick="this.nextElementSibling.show('half')">Open overlay sheet</ga-button>
<ga-bottom-sheet overlay snap="half">
  <div slot="header"><strong>Route</strong></div>
  <ga-metric primary tone="accent" label="km/h now" value="24.5"></ga-metric>
  <ga-checkbox label="Prefer bike lanes" checked style="margin-top:12px"></ga-checkbox>
  <ga-status tone="ok" text="Route found — 12.4 km." style="margin-top:12px"></ga-status>
</ga-bottom-sheet>` },
      { title: "Persistent, Maps-style (opts out of the trap)", code: `<ga-button onclick="this.nextElementSibling.show('peek')">Open a peeking sheet</ga-button>
<ga-bottom-sheet snap="peek" trap-focus="false">
  <div slot="header"><strong>Nearby repair stations</strong></div>
  <p style="margin:0 0 14px;">A sheet that only ever sits at peek is a persistent
  surface, not a modal one — so it hands the keyboard back to the page.</p>
</ga-bottom-sheet>` },
    ],
    api: [
      { name: "open", type: "boolean", def: "false", desc: "Reflected visibility." },
      { name: "snap", type: `"peek" | "half" | "full"`, def: "half", desc: "Current detent (reflected)." },
      { name: "overlay", type: "boolean", def: "false", desc: "Paint at --ga-z-overlay with a blurred backdrop, for a sheet floating over an app's own full-bleed canvas." },
      { name: "trap-focus", type: `"true" | "false"`, def: "true", desc: "The sheet is modal, so it confines Tab and restores focus to the opener without the app asking. Set \"false\" for the persistent, Maps-style sheet that only ever sits at peek." },
    ],
    events: [
      { name: "open", desc: "Fires when shown." },
      { name: "close", desc: "Fires when dismissed (drag past peek, or Escape)." },
      { name: "snapchange", desc: "Fires on detent change. detail: { snap }." },
    ],
    slots: [
      { name: "header", desc: "Fixed header under the grab handle." },
      { name: "(default)", desc: "Scrollable body." },
    ],
    notes: /* html */ `
      <h2>The mobile half of the overlay pair</h2>
      <p>This is the narrow-viewport form of
      <a href="#/panel"><code>&lt;ga-panel overlay&gt;</code></a>: the same content, the
      same <code>--ga-z-overlay</code> stacking token under <code>overlay</code>, but
      anchored to the bottom edge where a thumb can reach it. The width at which an app
      should swap one for the other is <strong>640px</strong>, readable as
      <code>GaBottomSheet.breakpoint</code> rather than left to each app to invent — the
      full composition recipe lives on the
      <a href="#/panel">Panel</a> page.</p>

      <h2>Escape, and why it traps focus</h2>
      <p>A drag gesture is not an affordance for anyone driving the page from a
      keyboard, so <strong>Escape dismisses the sheet</strong> as well.</p>
      <p>And a sheet at <code>half</code> or <code>full</code> covers the content beneath
      it, so letting Tab wander behind it would let the keyboard drive a UI the user
      cannot see. That is why containment is <strong>on by default</strong> here and off
      on the panel: a panel is a persistent control surface and must not hold the
      keyboard; a sheet is modal and must.</p>
    `,
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
    lead: "A scrollable transcript with a header, a composer footer, and scroll-follow that stops when you scroll up. Messages are <ga-chat-message> children.",
    examples: [
      { title: "Transcript", code: `<ga-chat height="260px" style="max-width:520px;">
  <span slot="header">Coach</span>
  <ga-chat-message role="user" author="You" time="09:12">Log 3x5 at 100kg</ga-chat-message>
  <ga-chat-message role="assistant" author="Coach" time="09:12">Logged — that is a 2.5kg jump on last week.</ga-chat-message>
  <ga-chat-message role="assistant" state="pending"></ga-chat-message>
  <div slot="footer" style="display:flex; gap:8px;">
    <ga-input placeholder="Message…" style="flex:1;"></ga-input>
    <ga-button>Send</ga-button>
  </div>
</ga-chat>` },
      { title: "Message states", code: `<div style="display:flex; flex-direction:column; gap:12px; max-width:420px;">
  <ga-chat-message role="user">A sent turn.</ga-chat-message>
  <ga-chat-message role="assistant" state="streaming">A turn still arriving</ga-chat-message>
  <ga-chat-message role="assistant" state="error">Could not reach the model.</ga-chat-message>
  <ga-chat-message role="system">Session started</ga-chat-message>
</div>` },
    ],
    api: [
      { name: "height", type: "CSS length", def: "360px", desc: "Height of the scrolling transcript." },
      { name: "empty-text", type: "string", def: "No messages yet.", desc: "Shown when there are no messages." },
      { name: "role (message)", type: "user | assistant | system", def: "assistant", desc: "Alignment and treatment of a ga-chat-message." },
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
