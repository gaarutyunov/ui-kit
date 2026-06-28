/* =========================================================================
   GaElement — a tiny base class for the kit's Web Components.

   Zero dependencies. Provides:
     - a Shadow DOM root with a shared "reset" stylesheet (so tokens inherit
       in and host pages can't leak styles in),
     - constructable-stylesheet caching (one CSSStyleSheet per component, not
       one per instance),
     - attribute -> re-render reactivity,
     - small helpers (`$`, `emit`).

   Custom-element tag names are namespaced `ga-*`.
   ========================================================================= */

/** Shared reset applied to every component's shadow root. */
const RESET = /* css */ `
  :host {
    box-sizing: border-box;
    font-family: var(--ga-font-sans, ui-sans-serif, system-ui, sans-serif);
  }
  :host([hidden]) { display: none !important; }
  *, *::before, *::after { box-sizing: inherit; }
  @media (prefers-reduced-motion: reduce) {
    * { transition-duration: 0.001ms !important; animation-duration: 0.001ms !important; }
  }
`;

/** Cache of tag -> CSSStyleSheet so styles are parsed once per component. */
const sheetCache = new Map();

function makeSheet(key, css) {
  let sheet = sheetCache.get(key);
  if (!sheet) {
    sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    sheetCache.set(key, sheet);
  }
  return sheet;
}

const resetSheet = makeSheet("__reset__", RESET);

export class GaElement extends HTMLElement {
  /** Subclasses override these. */
  static styles = "";
  static observed = [];

  static get observedAttributes() {
    return this.observed;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
    const sheet = makeSheet(this.localName, this.constructor.styles);
    this.shadowRoot.adoptedStyleSheets = [resetSheet, sheet];
    this._mounted = false;
  }

  connectedCallback() {
    this._mounted = true;
    this.render();
  }

  attributeChangedCallback() {
    if (this._mounted) this.render();
  }

  /** Subclasses implement this and return an HTML string. */
  template() {
    return "";
  }

  render() {
    this.shadowRoot.innerHTML = this.template();
  }

  /** Query inside the shadow root. */
  $(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  /** Dispatch a composed, bubbling CustomEvent. */
  emit(name, detail) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true })
    );
  }

  /** Boolean attribute reader. */
  hasFlag(name) {
    return this.hasAttribute(name);
  }

  /** Attribute reader with a default. */
  attr(name, fallback = "") {
    return this.getAttribute(name) ?? fallback;
  }
}

/** Define a custom element once (no-op if already defined). */
export function define(tag, ctor) {
  if (!customElements.get(tag)) customElements.define(tag, ctor);
}

/** Escape interpolated text destined for innerHTML. */
export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
