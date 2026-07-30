import { GaElement, define, esc } from "../../core/base-element.js";
import { syncFocusTrap } from "../../core/focus-trap.js";

/**
 * `<ga-panel>` — a slide-in drawer, or with `overlay` a floating panel above a
 * full-bleed canvas.
 *
 * Ported from stereoscope's `.curtain`: a fixed panel that slides in from the
 * edge with a backdrop scrim. Close via the × button, the scrim, or Escape.
 *
 * ## Overlay mode
 *
 * `overlay` is a mode on this element rather than a separate component,
 * because a floating control surface and a drawer differ only in where they
 * sit and what they let through — same header/body/footer, same open/close
 * API, and a second element would duplicate all of it. In overlay mode the
 * panel becomes a self-contained card inset from the viewport corner, the
 * scrim is dropped (keeping the canvas beneath visible *and* clickable is the
 * whole point), and the stacking level comes from the `--ga-z-overlay` token
 * instead of the drawer's internal constant. That the level is a token is
 * deliberate: an app compositing its own layers can position relative to the
 * kit rather than guessing a z-index and losing the race to a map canvas.
 *
 * ## Focus containment
 *
 * `trap-focus` is **off by default**. An overlay panel is usually persistent —
 * it stays up for the life of the screen — and an element that permanently
 * held the keyboard would make the rest of the page unreachable. Set
 * `trap-focus` only when the panel is genuinely modal; Tab then cycles inside
 * it and focus returns to whatever opened it on close. `<ga-bottom-sheet>` is
 * the deliberate opposite: it covers what is underneath, so it traps unless
 * told not to.
 *
 * ## Composing a full-bleed canvas app
 *
 * Three layers, bottom to top:
 *
 * 1. the app's canvas fills the viewport at `--ga-z-canvas` (0);
 * 2. `<ga-panel overlay>` floats above it at `--ga-z-overlay` (900) carrying
 *    the controls. It does not trap focus, so the canvas and the rest of the
 *    page stay keyboard-reachable while the panel is up;
 * 3. at or below **640px** — the documented breakpoint, readable as
 *    `GaBottomSheet.breakpoint` — the same content moves into
 *    `<ga-bottom-sheet>`, which is modal and traps focus.
 *
 * ```html
 * <div id="map" style="position:fixed; inset:0; z-index:var(--ga-z-canvas)"></div>
 * <ga-panel overlay open title="Route">…controls…</ga-panel>
 * <ga-bottom-sheet hidden>…the same controls…</ga-bottom-sheet>
 * ```
 *
 * ```js
 * const narrow = matchMedia(`(max-width: ${GaBottomSheet.breakpoint}px)`);
 * const swap = () => { panel.hidden = narrow.matches; sheet.hidden = !narrow.matches; };
 * narrow.addEventListener("change", swap);
 * swap();
 * ```
 *
 * Attributes:
 *   open        boolean — reflected; toggles visibility
 *   side        "right" (default) | "left"
 *   title       optional header text (overridden by the `header` slot)
 *   overlay     boolean — float above page content instead of acting as a drawer
 *   trap-focus  boolean — confine Tab to the panel while open; OFF by default
 *
 * Slots: `header`, default (body), `footer`.
 * Methods: show() / close() / toggle().
 * Events: `open`, `close`.
 */
export class GaPanel extends GaElement {
  static observed = ["open", "side", "title", "overlay", "trap-focus"];

  static styles = /* css */ `
    :host { display: contents; }
    .scrim {
      position: fixed; inset: 0; z-index: 49;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0; visibility: hidden;
      transition: opacity 0.32s ease, visibility 0.32s;
    }
    :host([open]) .scrim { opacity: 1; visibility: visible; }

    .panel {
      position: fixed; top: 0; right: 0; z-index: 50;
      width: min(420px, 100%); height: 100%;
      display: flex; flex-direction: column;
      background: var(--ga-bg, #000);
      border-left: 1px solid var(--ga-border, #1a1a1a);
      box-shadow: -16px 0 40px rgba(0, 0, 0, 0.4);
      transform: translateX(100%);
      transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
      visibility: hidden;
    }
    :host([side="left"]) .panel {
      right: auto; left: 0;
      border-left: 0; border-right: 1px solid var(--ga-border, #1a1a1a);
      box-shadow: 16px 0 40px rgba(0, 0, 0, 0.4);
      transform: translateX(-100%);
    }
    :host([open]) .panel { transform: translateX(0); visibility: visible; }

    .head {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 18px 20px; border-bottom: 1px solid var(--ga-border, #1a1a1a);
      font-weight: 600; color: var(--ga-fg, #ededed);
    }
    .body { flex: 1; overflow: auto; padding: 20px; color: var(--ga-muted, #878787); line-height: 1.55; }
    .foot { padding: 16px 20px; border-top: 1px solid var(--ga-border, #1a1a1a); }
    .foot { display: none; }
    .foot.show { display: block; }
    .close {
      flex: none; background: none; border: 0; cursor: pointer;
      color: var(--ga-muted, #878787); font-size: 22px; line-height: 1; padding: 2px 6px;
      transition: color var(--ga-transition, 0.18s ease);
    }
    .close:hover { color: var(--ga-fg, #ededed); }

    /* ---- Overlay mode ---------------------------------------------------
       Every rule below is gated on [overlay] and appended after the drawer's
       rules, so a panel without the attribute matches exactly the rules it
       always did — the widening is additive by construction, not by review. */
    :host([overlay]) .scrim { display: none; }
    :host([overlay]) .panel {
      top: var(--ga-space-4, 16px);
      right: var(--ga-space-4, 16px);
      height: auto;
      max-height: calc(100% - 2 * var(--ga-space-4, 16px));
      width: min(360px, calc(100% - 2 * var(--ga-space-4, 16px)));
      z-index: var(--ga-z-overlay, 900);
      border: 1px solid var(--ga-border, #1a1a1a);
      border-radius: var(--ga-radius-lg, 8px);
      box-shadow: var(--ga-shadow, 0 8px 24px rgba(0, 0, 0, 0.4));
      overflow: hidden;
      /* Inset from the edge, so the closed position has to clear the inset too
         or a sliver of the card is left hanging off the corner mid-transition. */
      transform: translateX(calc(100% + var(--ga-space-4, 16px)));
    }
    :host([overlay][side="left"]) .panel {
      left: var(--ga-space-4, 16px); right: auto;
      transform: translateX(calc(-100% - var(--ga-space-4, 16px)));
    }
    :host([overlay][open]) .panel { transform: translateX(0); }

    /* Translucency only where the blur that justifies it is supported —
       otherwise the panel would be see-through with the canvas legible
       straight through the controls. */
    @supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
      :host([overlay]) .panel {
        background: color-mix(in srgb, var(--ga-bg, #000) 78%, transparent);
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
      }
    }
  `;

  template() {
    const title = this.attr("title");
    return /* html */ `
      <div class="scrim" part="scrim"></div>
      <div class="panel" part="panel" role="dialog" aria-modal="true">
        <div class="head" part="header">
          <span class="title"><slot name="header">${esc(title)}</slot></span>
          <button class="close" aria-label="Close">&times;</button>
        </div>
        <div class="body" part="body"><slot></slot></div>
        <div class="foot" part="footer"><slot name="footer"></slot></div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._key = (e) => { if (e.key === "Escape" && this.open) this.close(); };
    document.addEventListener("keydown", this._key);
    this.shadowRoot.addEventListener("slotchange", () => this._syncFooter());
  }

  disconnectedCallback() {
    if (this._key) document.removeEventListener("keydown", this._key);
    syncFocusTrap(this, false);
  }

  render() {
    super.render();
    this.$(".close")?.addEventListener("click", () => this.close());
    this.$(".scrim")?.addEventListener("click", () => this.close());
    this._syncFooter();
    this._syncModality();
  }

  _syncFooter() {
    const slot = this.$('slot[name="footer"]');
    const foot = this.$(".foot");
    if (slot && foot) foot.classList.toggle("show", slot.assignedNodes().length > 0);
  }

  /**
   * Keep the announced modality and the keyboard behaviour telling the same
   * story: an overlay that lets focus leave is not a modal dialog, and saying
   * `aria-modal="true"` anyway hides the rest of the page from a screen reader
   * while it is still perfectly usable.
   *
   * Only the overlay branch touches the DOM, so a drawer's rendered markup is
   * byte-for-byte what it was before overlay mode existed.
   */
  _syncModality() {
    if (this.overlay) this.$(".panel")?.setAttribute("aria-modal", String(this.trapFocus));
    syncFocusTrap(this, this.trapFocus && this.open);
  }

  get overlay() { return this.hasFlag("overlay"); }

  /**
   * Off unless explicitly asked for. The main use of an overlay panel is a
   * persistent control surface, and one that held the keyboard would lock the
   * user out of everything else on the page. `trap-focus="false"` is honoured
   * too, so the attribute reads the same way on both overlays.
   */
  get trapFocus() { return this.hasFlag("trap-focus") && this.attr("trap-focus") !== "false"; }

  get open() { return this.hasFlag("open"); }
  set open(v) { this.toggleAttribute("open", !!v); }
  show() { if (!this.open) { this.setAttribute("open", ""); this.emit("open"); } }
  close() { if (this.open) { this.removeAttribute("open"); this.emit("close"); } }
  toggle() { this.open ? this.close() : this.show(); }
}

define("ga-panel", GaPanel);
