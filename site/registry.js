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
      { id: "badge", label: "Badge" },
      { id: "card", label: "Card" },
      { id: "avatar", label: "Avatar" },
      { id: "input", label: "Input" },
      { id: "switch", label: "Switch" },
      { id: "spinner", label: "Spinner" },
      { id: "alert", label: "Alert" },
      { id: "kbd", label: "Kbd" },
      { id: "tabs", label: "Tabs" },
      { id: "note", label: "Note" },
      { id: "slider", label: "Slider" },
      { id: "file-drop", label: "File drop" },
      { id: "fab", label: "FAB" },
      { id: "panel", label: "Panel" },
      { id: "header", label: "Header" },
      { id: "bottom-nav", label: "Bottom nav" },
      { id: "bottom-sheet", label: "Bottom sheet" },
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
    ],
    api: [
      { name: "variant", type: `"secondary" | "primary" | "ghost" | "danger"`, def: "secondary", desc: "Visual style." },
      { name: "size", type: `"sm" | "md" | "lg"`, def: "md", desc: "Control height." },
      { name: "href", type: "string", def: "—", desc: "Render as an anchor link." },
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
    lead: "A range slider with an optional label and live value readout. Form-associated.",
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
