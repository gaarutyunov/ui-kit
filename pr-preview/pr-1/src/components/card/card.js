import { GaElement, define } from "../../core/base-element.js";

/**
 * `<ga-card>` — an elevated surface / container.
 *
 * Attributes:
 *   interactive  boolean — adds hover lift + pointer cursor
 *   href         optional — makes the whole card a link
 *   padding      "none" | "sm" | "md" | "lg"  (default md)
 *
 * Slots: `header`, default (body), `footer`.
 */
export class GaCard extends GaElement {
  static observed = ["interactive", "href", "padding"];

  static styles = /* css */ `
    :host { display: block; }
    .card {
      display: flex;
      flex-direction: column;
      color: var(--ga-fg, #ededed);
      text-decoration: none;
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border, #1a1a1a);
      border-radius: var(--ga-radius-lg, 12px);
      overflow: hidden;
      transition: background var(--ga-transition, 0.18s ease),
        border-color var(--ga-transition, 0.18s ease),
        transform var(--ga-transition, 0.18s ease),
        box-shadow var(--ga-transition, 0.18s ease);
    }
    :host([interactive]) .card,
    :host([href]) .card { cursor: pointer; }
    :host([interactive]) .card:hover,
    :host([href]) .card:hover {
      background: var(--ga-bg-elev-hover, #1f1f1f);
      border-color: var(--ga-border-strong, #2a2a2a);
      transform: translateY(-2px);
      box-shadow: var(--ga-shadow, 0 8px 24px rgba(0,0,0,0.4));
    }
    :host([href]) .card:focus-visible {
      outline: none;
      box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
    }

    .body { padding: var(--ga-space-6, 24px); }
    :host([padding="none"]) .body { padding: 0; }
    :host([padding="sm"]) .body { padding: var(--ga-space-3, 12px); }
    :host([padding="lg"]) .body { padding: var(--ga-space-8, 32px); }

    .header, .footer { display: none; }
    .header.show, .footer.show { display: block; }
    .header {
      padding: var(--ga-space-4, 16px) var(--ga-space-6, 24px);
      border-bottom: 1px solid var(--ga-border, #1a1a1a);
      font-weight: 600;
    }
    .footer {
      padding: var(--ga-space-4, 16px) var(--ga-space-6, 24px);
      border-top: 1px solid var(--ga-border, #1a1a1a);
      color: var(--ga-muted, #878787);
      font-size: var(--ga-fs-sm, 14px);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._sync = () => this._toggleSlots();
    this.shadowRoot.addEventListener("slotchange", this._sync);
  }

  _toggleSlots() {
    for (const name of ["header", "footer"]) {
      const slot = this.$(`slot[name="${name}"]`);
      const wrap = this.$(`.${name}`);
      if (slot && wrap) {
        wrap.classList.toggle("show", slot.assignedNodes().length > 0);
      }
    }
  }

  template() {
    const href = this.attr("href");
    const tag = href ? "a" : "div";
    const attrs = href ? `href="${href}"` : "";
    return /* html */ `
      <${tag} class="card" part="card" ${attrs}>
        <div class="header" part="header"><slot name="header"></slot></div>
        <div class="body" part="body"><slot></slot></div>
        <div class="footer" part="footer"><slot name="footer"></slot></div>
      </${tag}>
    `;
  }
}

define("ga-card", GaCard);
