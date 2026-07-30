import { GaElement, define, esc } from "../../core/base-element.js";

/**
 * `<ga-button>` — the kit's primary action element.
 *
 * `size="icon"` is a size rather than a separate `<ga-icon-button>` element so
 * every visual variant keeps applying to a glyph-only button, and a button that
 * later gains a label does not have to change element. Because the glyph alone
 * carries no accessible name, an icon button without `aria-label` or `title`
 * warns in the console — the omission is silent in the browser and is the most
 * common accessibility defect in exactly this shape.
 *
 * Attributes:
 *   variant     "primary" | "secondary" | "ghost" | "danger"  (default secondary)
 *   size        "sm" | "md" | "lg" | "icon"                     (default md)
 *   href        render as a link instead of a button
 *   download    (link) filename hint / force-download           — forwarded to <a>
 *   target      (link) "_blank" | "_self" | …                   — forwarded to <a>
 *   rel         (link) e.g. "noopener noreferrer"               — forwarded to <a>
 *   type        (button) "button" | "submit" | "reset"          — forwarded to <button>
 *   name        (button) form control name                      — forwarded to <button>
 *   aria-label  accessible label                                — forwarded to <a>/<button>
 *   title       (icon size only) tooltip + accessible name      — forwarded to <a>/<button>
 *   disabled    boolean
 *   loading     boolean — shows a spinner and blocks clicks
 *   block       boolean — full width
 *
 * Slots: default (label), `start` / `end` (icons).
 */
export class GaButton extends GaElement {
  static observed = [
    "variant", "size", "href", "download", "target", "rel",
    "type", "name", "aria-label", "title", "disabled", "loading", "block",
  ];

  static styles = /* css */ `
    :host { display: inline-block; }
    :host([block]) { display: block; }

    .btn {
      --_bg: var(--ga-bg-elev, #1a1a1a);
      --_fg: var(--ga-fg, #ededed);
      --_bd: var(--ga-border-strong, #2a2a2a);
      --_bg-hover: var(--ga-bg-elev-hover, #1f1f1f);

      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ga-space-2, 8px);
      width: 100%;
      font-family: inherit;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid var(--_bd);
      border-radius: var(--ga-radius, 6px);
      background: var(--_bg);
      color: var(--_fg);
      transition: background var(--ga-transition, 0.18s ease),
        border-color var(--ga-transition, 0.18s ease),
        filter var(--ga-transition, 0.18s ease),
        transform var(--ga-transition, 0.18s ease);
    }
    .btn:hover { background: var(--_bg-hover); }
    .btn:active { transform: translateY(1px); }
    .btn:focus-visible {
      outline: none;
      box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
    }

    /* sizes */
    :host([size="sm"]) .btn { font-size: var(--ga-fs-sm, 14px); padding: 6px 12px; height: 32px; }
    .btn { font-size: var(--ga-fs-sm, 14px); padding: 8px 16px; height: 40px; }
    :host([size="lg"]) .btn { font-size: var(--ga-fs-base, 17px); padding: 12px 22px; height: 48px; }

    /* Icon size: the md footprint made square, with the text padding removed so
       the glyph sits dead centre. It is only a size, so every variant, the
       loading spinner and the start/end slots keep working unchanged. */
    :host([size="icon"]) .btn {
      width: var(--ga-space-10, 40px);
      height: var(--ga-space-10, 40px);
      padding: 0;
      gap: 0;
    }
    :host([size="icon"][block]) .btn { width: 100%; }

    /* variants */
    :host([variant="primary"]) .btn {
      --_bg: var(--ga-accent, #54a2ff);
      --_fg: var(--ga-accent-contrast, #000);
      --_bd: var(--ga-accent, #54a2ff);
    }
    :host([variant="primary"]) .btn:hover { background: var(--ga-accent, #54a2ff); filter: brightness(1.1); }

    :host([variant="ghost"]) .btn {
      --_bg: transparent;
      --_bd: transparent;
    }
    :host([variant="ghost"]) .btn:hover { background: var(--ga-bg-elev, #1a1a1a); }

    :host([variant="danger"]) .btn {
      --_bg: transparent;
      --_fg: var(--ga-red, #ff6568);
      --_bd: color-mix(in srgb, var(--ga-red, #ff6568) 40%, transparent);
    }
    :host([variant="danger"]) .btn:hover {
      background: color-mix(in srgb, var(--ga-red, #ff6568) 12%, transparent);
    }

    :host([disabled]) .btn,
    :host([loading]) .btn {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }

    .spinner {
      width: 1em; height: 1em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    ::slotted([slot="start"]), ::slotted([slot="end"]) { display: inline-flex; }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this._guard, true);
    // Checked on a microtask rather than inside render(): an icon button built
    // imperatively is often connected a step before its label is applied, and
    // render() runs again on every observed attribute, which would turn one
    // mistake into a stream of identical warnings. `_namedChecked` keeps it to
    // exactly one warning per element for the whole life of the page.
    queueMicrotask(() => this._warnIfUnnamed());
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._guard, true);
  }

  _guard = (e) => {
    if (this.hasFlag("disabled") || this.hasFlag("loading")) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  };

  /**
   * An icon button's glyph is decorative to assistive technology, so without
   * `aria-label` or `title` the control has no accessible name at all. Warn the
   * developer once — refusing to render would be worse than a button that is
   * merely unlabelled.
   */
  _warnIfUnnamed() {
    if (this._namedChecked || !this.isConnected) return;
    if (this.attr("size") !== "icon") return;
    this._namedChecked = true;
    if (this.attr("aria-label").trim() || this.attr("title").trim()) return;
    console.warn(
      '[ga-button] size="icon" has no accessible name — add aria-label (or ' +
        "title) so the button is not announced as an unlabelled button.",
      this
    );
  }

  /** Forward `name` from the host as attribute `out` on the inner element. */
  _pass(name, out = name) {
    return this.hasAttribute(name)
      ? ` ${out}="${esc(this.getAttribute(name))}"`
      : "";
  }

  template() {
    const href = this.attr("href");
    const tag = href ? "a" : "button";
    // aria-label is forwarded to whichever inner element we render. `title` is
    // forwarded only for the icon size: the inner control is the one that takes
    // focus, so a host-level title never becomes its accessible name — and
    // forwarding it unconditionally would change what already-shipped buttons
    // render.
    const aria =
      this._pass("aria-label") +
      (this.attr("size") === "icon" ? this._pass("title") : "");
    const attrs = href
      ? `href="${esc(href)}"` +
        this._pass("download") +
        this._pass("target") +
        this._pass("rel") +
        aria
      : `type="${esc(this.attr("type", "button"))}"` +
        this._pass("name") +
        aria +
        (this.hasFlag("disabled") ? " disabled" : "");
    const spinner = this.hasFlag("loading") ? `<span class="spinner" aria-hidden="true"></span>` : "";
    return /* html */ `
      <${tag} class="btn" part="button" ${attrs}>
        <slot name="start"></slot>
        ${spinner}
        <slot></slot>
        <slot name="end"></slot>
      </${tag}>
    `;
  }
}

define("ga-button", GaButton);
