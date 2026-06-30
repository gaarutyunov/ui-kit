/* =========================================================================
   GA UI Kit — custom docs site.

   A buildless, framework-free single-page app that documents the kit using
   the kit's own components. Hash routing + relative imports mean it runs at
   any deploy base (/, /ui-kit/, /ui-kit/pr-preview/pr-N/) with no config and
   in any browser — including mobile Safari.
   ========================================================================= */

import "../src/index.js"; // registers every <ga-*> element
import { NAV, DOCS, COMPONENTS, PALETTE } from "./registry.js";

const GITHUB = "https://github.com/gaarutyunov/ui-kit";

/* ---- helpers ------------------------------------------------------------ */
const el = (tag, props = {}, ...kids) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (v != null) node.setAttribute(k, v);
  }
  for (const kid of kids.flat()) {
    if (kid != null) node.append(kid.nodeType ? kid : document.createTextNode(kid));
  }
  return node;
};

const allPages = () => ({ ...DOCS, ...COMPONENTS });

/* ---- theme -------------------------------------------------------------- */
function initTheme() {
  let t = "dark";
  try { t = localStorage.getItem("ga-theme") || "dark"; } catch {}
  document.documentElement.setAttribute("data-theme", t);
}
function toggleTheme() {
  const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("ga-theme", next); } catch {}
}

/* ---- shell -------------------------------------------------------------- */
function buildShell() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const menuBtn = el("button", { class: "icon-btn menu-btn", "aria-label": "Menu",
    onclick: () => sidebar.classList.toggle("open") || scrim.classList.toggle("show") }, "☰");
  const themeBtn = el("button", { class: "icon-btn", "aria-label": "Toggle theme", onclick: toggleTheme }, "◑");
  const header = el("header", { class: "site-header" },
    menuBtn,
    el("a", { class: "brand", href: "#/introduction" }, "GA UI Kit"),
    el("span", { class: "ver" }, "v0.1"),
    el("div", { class: "spacer" }),
    el("a", { class: "ghlink", href: GITHUB, target: "_blank", rel: "noopener" }, "GitHub ↗"),
    themeBtn
  );

  const nav = el("nav", { class: "nav" });
  const sidebar = el("aside", { class: "sidebar" }, nav);
  const page = el("div", { id: "page", class: "page" });
  const main = el("main", { class: "content" }, page);
  const scrim = el("div", { class: "scrim", onclick: () => { sidebar.classList.remove("open"); scrim.classList.remove("show"); } });

  app.append(header, el("div", { class: "layout" }, sidebar, main), scrim);
  app.removeAttribute("aria-busy");
  return { nav, page, sidebar, scrim };
}

function renderNav(nav, activeId, onNavigate) {
  nav.innerHTML = "";
  for (const group of NAV) {
    nav.append(el("div", { class: "nav-group" }, group.title));
    for (const item of group.items) {
      nav.append(el("a", {
        class: "nav-link" + (item.id === activeId ? " active" : ""),
        href: "#/" + item.id,
        onclick: onNavigate,
      }, item.label));
    }
  }
}

/* ---- code block + live example ------------------------------------------ */
function codeBlock(code) {
  const pre = el("pre", { class: "code" }, el("code", {}, code));
  const copy = el("button", { class: "copy", onclick: () => {
    navigator.clipboard?.writeText(code).then(() => {
      copy.textContent = "Copied";
      setTimeout(() => (copy.textContent = "Copy"), 1200);
    });
  } }, "Copy");
  return el("div", { class: "codewrap" }, copy, pre);
}

function example(ex) {
  const canvas = el("div", { class: "canvas" });
  canvas.innerHTML = ex.code; // trusted (our own registry); upgrades ga-* live
  return el("section", { class: "example" },
    ex.title ? el("h3", {}, ex.title) : null,
    canvas,
    codeBlock(ex.code)
  );
}

/* ---- interactive playground --------------------------------------------- */
function playground(pg) {
  const state = {};
  for (const a of pg.attrs) state[a.name] = a.value;
  let slot = pg.slot || "";

  const preview = el("div", { class: "canvas pg-canvas" });
  const codeHolder = el("div");

  const buildCode = () => {
    const parts = pg.attrs
      .filter((a) => {
        const v = state[a.name];
        return a.type === "boolean" ? v === true : v !== "" && v != null;
      })
      .map((a) => (a.type === "boolean" ? a.name : `${a.name}="${state[a.name]}"`));
    const attrStr = parts.length ? " " + parts.join(" ") : "";
    return `<${pg.tag}${attrStr}>${slot}</${pg.tag}>`;
  };

  const update = () => {
    const code = buildCode();
    preview.innerHTML = code;
    codeHolder.replaceChildren(codeBlock(code));
  };

  const controls = el("div", { class: "pg-controls" });
  for (const a of pg.attrs) {
    let field;
    if (a.type === "boolean") {
      const sw = el("ga-switch", { label: a.name });
      if (a.value) sw.setAttribute("checked", "");
      sw.addEventListener("change", (e) => { state[a.name] = e.detail.checked; update(); });
      field = sw;
    } else if (a.type === "select") {
      const sel = el("select", { class: "pg-select", onchange: (e) => { state[a.name] = e.target.value; update(); } },
        ...a.options.map((o) => el("option", { value: o, ...(o === a.value ? { selected: "" } : {}) }, o)));
      field = el("label", { class: "pg-field" }, el("span", {}, a.name), sel);
    } else if (a.type === "text") {
      const inp = el("ga-input", { label: a.name, value: a.value ?? "" });
      inp.addEventListener("input", (e) => { state[a.name] = e.detail.value; update(); });
      field = el("div", { class: "pg-field-wide" }, inp);
    }
    if (field) controls.append(field);
  }
  if (pg.slot != null) {
    const inp = el("ga-input", { label: "(slot text)", value: slot });
    inp.addEventListener("input", (e) => { slot = e.detail.value; update(); });
    controls.append(el("div", { class: "pg-field-wide" }, inp));
  }

  update();
  return el("section", { class: "playground" },
    el("h3", {}, "Playground"),
    el("div", { class: "pg-grid" }, el("div", { class: "pg-stage" }, preview, codeHolder), controls)
  );
}

/* ---- tables ------------------------------------------------------------- */
function table(title, cols, rows, renderRow) {
  if (!rows || !rows.length) return null;
  return el("section", { class: "apitable" },
    el("h3", {}, title),
    el("div", { class: "table-scroll" },
      el("table", {},
        el("thead", {}, el("tr", {}, ...cols.map((c) => el("th", {}, c)))),
        el("tbody", {}, ...rows.map((r) => el("tr", {}, ...renderRow(r).map((cell) =>
          cell && cell.nodeType ? el("td", {}, cell) : el("td", { html: cell == null ? "" : String(cell) })))))
      )
    )
  );
}

/* ---- page renderers ----------------------------------------------------- */
function renderComponent(page) {
  const frag = document.createDocumentFragment();
  frag.append(
    el("div", { class: "page-head" },
      el("h1", {}, page.title),
      el("span", { class: "tag-chip" }, `<${page.tag}>`)),
    el("p", { class: "lead" }, page.lead)
  );
  if (page.playground) frag.append(playground(page.playground));
  for (const ex of page.examples || []) frag.append(example(ex));

  frag.append(table("Attributes", ["Name", "Type", "Default", "Description"], page.api,
    (r) => [`<code>${r.name}</code>`, `<code>${escapeHtml(r.type)}</code>`, `<code>${r.def}</code>`, r.desc]));
  frag.append(table("Slots", ["Slot", "Description"], page.slots,
    (r) => [`<code>${r.name}</code>`, r.desc]));
  frag.append(table("Events", ["Event", "Description"], page.events,
    (r) => [`<code>${r.name}</code>`, r.desc]));
  return frag;
}

function renderDoc(page, id) {
  const frag = document.createDocumentFragment();
  frag.append(el("h1", {}, page.title), el("p", { class: "lead" }, page.lead));
  const body = el("div", { class: "prose" });
  body.innerHTML = page.html;
  frag.append(body);

  // Special: framework usage tabs on the installation page.
  if (id === "installation") {
    const mount = body.querySelector("#framework-tabs");
    if (mount) mount.append(frameworkTabs());
  }
  return frag;
}

function frameworkTabs() {
  const t = el("ga-tabs", { tabs: JSON.stringify([
    { id: "vanilla", label: "Vanilla" }, { id: "react", label: "React" }, { id: "astro", label: "Astro" },
  ]) });
  const code = (s) => { const d = el("div"); d.append(codeBlock(s)); return d; };
  t.append(
    el("div", { slot: "vanilla" }, code(`<link rel="stylesheet" href="@gaarutyunov/ui-kit/tokens.css" />
<script type="module">import "@gaarutyunov/ui-kit";</script>

<ga-button variant="primary">Get started</ga-button>`)),
    el("div", { slot: "react" }, code(`import "@gaarutyunov/ui-kit";
import "@gaarutyunov/ui-kit/tokens.css";

export function Demo() {
  return <ga-card interactive><ga-button variant="primary">Click</ga-button></ga-card>;
}`)),
    el("div", { slot: "astro" }, code(`---
import "@gaarutyunov/ui-kit";
import "@gaarutyunov/ui-kit/tokens.css";
---
<ga-button variant="primary">Get started</ga-button>`))
  );
  return t;
}

function renderColors() {
  const frag = document.createDocumentFragment();
  frag.append(el("h1", {}, "Colors"),
    el("p", { class: "lead" }, "The palette shared by garutyunov.com and stereoscope, exposed as --ga-* custom properties."));
  const grid = el("div", { class: "swatches" });
  for (const [varName, label] of PALETTE) {
    grid.append(el("div", { class: "swatch" },
      el("div", { class: "chip", style: `background:var(${varName})` }),
      el("div", { class: "swatch-name" }, label),
      el("code", { class: "swatch-var" }, varName)));
  }
  frag.append(grid);
  return frag;
}

function renderTypography() {
  const frag = document.createDocumentFragment();
  frag.append(el("h1", {}, "Typography"),
    el("p", { class: "lead" }, "Geist Sans for UI and body; Geist/Fira Mono for code and labels."));
  const wrap = el("div", { class: "type-scale" });
  wrap.innerHTML = `
    <div style="font-size:var(--ga-fs-3xl); line-height:1.1; letter-spacing:-0.02em; font-weight:600;">Display — depth from a single photo</div>
    <div style="font-size:var(--ga-fs-xl); letter-spacing:-0.01em; font-weight:600;">Heading — universal components</div>
    <div style="font-size:var(--ga-fs-base); line-height:var(--ga-lh-base); max-width:60ch; color:var(--ga-muted);">Body — a buildless set of static ES modules and a Next.js portfolio, unified into one design language. The quick brown fox jumps over the lazy dog.</div>
    <div style="font-family:var(--ga-font-mono); font-size:var(--ga-fs-sm); color:var(--ga-muted);">Mono — const accent = "#54a2ff";</div>`;
  frag.append(wrap);
  return frag;
}

/* ---- escaping ----------------------------------------------------------- */
function escapeHtml(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ---- breadcrumbs (mirrors garutyunov.com's skill-page nav) -------------- */
function titleOf(id) {
  if (id === "colors") return "Colors";
  if (id === "typography") return "Typography";
  return allPages()[id]?.title || "GA UI Kit";
}
function groupOf(id) {
  for (const g of NAV) if (g.items.some((i) => i.id === id)) return g.title;
  return null;
}
function breadcrumbs(id) {
  const nav = el("nav", { class: "crumbs", "aria-label": "Breadcrumb" });
  nav.append(el("a", { href: "#/introduction" }, "GA UI Kit"));
  const group = groupOf(id);
  if (group) nav.append(el("span", { class: "sep" }, "/"), el("span", {}, group));
  nav.append(el("span", { class: "sep" }, "/"), el("span", { class: "current" }, titleOf(id)));
  return nav;
}

/* ---- router ------------------------------------------------------------- */
let shell;
function currentId() {
  const id = (location.hash || "").replace(/^#\/?/, "").trim();
  return id || "introduction";
}

function route() {
  const id = currentId();
  renderNav(shell.nav, id, () => { shell.sidebar.classList.remove("open"); shell.scrim.classList.remove("show"); });

  const page = shell.page;
  page.innerHTML = "";
  let content;
  if (id === "colors") content = renderColors();
  else if (id === "typography") content = renderTypography();
  else if (COMPONENTS[id]) content = renderComponent(COMPONENTS[id]);
  else if (DOCS[id]) content = renderDoc(DOCS[id], id);
  else { // unknown route → introduction
    location.hash = "#/introduction";
    return;
  }
  page.append(breadcrumbs(id), content);
  page.scrollTop = 0;
  document.querySelector(".content")?.scrollTo(0, 0);
  const title = (allPages()[id]?.title) || (id === "colors" ? "Colors" : id === "typography" ? "Typography" : "GA UI Kit");
  document.title = `${title} — GA UI Kit`;
}

/* ---- boot --------------------------------------------------------------- */
initTheme();
shell = buildShell();
window.addEventListener("hashchange", route);
route();
