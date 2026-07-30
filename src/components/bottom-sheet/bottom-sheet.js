import { GaElement, define } from "../../core/base-element.js";
import { syncFocusTrap } from "../../core/focus-trap.js";

/**
 * `<ga-bottom-sheet>` — a draggable sheet that rises from the bottom of the
 * screen with snap points, à la Google Maps.
 *
 * Drag the grab handle (or the header) between three detents — `peek`, `half`,
 * `full` — and drag below `peek` to dismiss. Escape dismisses it too, because
 * a gesture is not an affordance for anyone driving the page from a keyboard.
 *
 * ## The mobile half of the overlay pair
 *
 * This is the narrow-viewport form of `<ga-panel overlay>`: same content, same
 * `--ga-z-overlay` stacking token under `overlay`, but anchored to the bottom
 * edge where a thumb can reach it. The viewport width at which an app should
 * swap one for the other is **{@link GaBottomSheet.breakpoint} (640px)** —
 * stated here rather than left to each app to invent. The full composition
 * recipe for a canvas app lives in `<ga-panel>`'s documentation.
 *
 * ## Focus containment
 *
 * The sheet **traps focus by default**, and this is the deliberate opposite of
 * `<ga-panel overlay>`. A sheet at `half` or `full` covers the content beneath
 * it, so letting Tab wander behind it would let the keyboard drive a UI the
 * user cannot see. A panel is a persistent control surface and must not hold
 * the keyboard; a sheet is modal and must. Set `trap-focus="false"` for the
 * persistent, Maps-style sheet that only ever sits at `peek`.
 *
 * Attributes:
 *   open        boolean — reflected; whether the sheet is visible
 *   snap        "peek" | "half" | "full"  (reflected; default "half")
 *   overlay     boolean — paint at `--ga-z-overlay` with a blurred backdrop,
 *               for sheets floating over an app's own full-bleed canvas
 *   trap-focus  "false" opts out of the default focus containment
 *
 * Slots: `header` (sits under the handle), default (scrollable body).
 * Methods: show(snap?) / close() / snapTo(snap).
 * Events: `open`, `close`, `snapchange` ({ snap }).
 */
export class GaBottomSheet extends GaElement {
  static observed = ["open", "snap", "overlay", "trap-focus"];

  /**
   * The documented breakpoint at which an overlay panel becomes a sheet, in
   * CSS pixels. Exposed as a static so an app's `matchMedia` query and the
   * kit's documentation cannot drift apart.
   */
  static breakpoint = 640;

  static styles = /* css */ `
    :host { display: contents; }
    .sheet {
      position: fixed; left: 0; right: 0; bottom: 0; z-index: 50;
      width: min(560px, 100%); height: 88vh; margin: 0 auto;
      display: flex; flex-direction: column;
      background: var(--ga-bg, #000);
      border: 1px solid var(--ga-border, #1a1a1a); border-bottom: 0;
      border-radius: 16px 16px 0 0;
      box-shadow: 0 -16px 40px rgba(0, 0, 0, 0.4);
      transform: translateY(100%);
      transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
      touch-action: none;
    }
    .sheet.dragging { transition: none; }

    .grip { flex: none; display: flex; justify-content: center; padding: 10px 0 6px; cursor: grab; }
    .grip:active { cursor: grabbing; }
    .bar { width: 40px; height: 5px; border-radius: 9999px; background: var(--ga-border-strong, #2a2a2a); }

    .head { flex: none; padding: 4px 20px 12px; color: var(--ga-fg, #ededed); cursor: grab; }
    .head:active { cursor: grabbing; }
    .head:empty { display: none; }

    .body { flex: 1; overflow-y: auto; padding: 0 20px 24px; color: var(--ga-muted, #878787); line-height: 1.55; }

    /* ---- Overlay mode ---------------------------------------------------
       Gated on [overlay] and appended last, so a sheet without the attribute
       matches exactly the rules it always did. Same treatment as an overlay
       panel: the app's canvas cannot paint over it, and the backdrop blur
       keeps the sheet legible against whatever is moving underneath. */
    :host([overlay]) .sheet { z-index: var(--ga-z-overlay, 900); }

    @supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
      :host([overlay]) .sheet {
        background: color-mix(in srgb, var(--ga-bg, #000) 82%, transparent);
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
      }
    }
  `;

  template() {
    return /* html */ `
      <div class="sheet" part="sheet">
        <div class="grip" part="handle"><span class="bar"></span></div>
        <div class="head" part="header"><slot name="header"></slot></div>
        <div class="body" part="body"><slot></slot></div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._onResize = () => this._apply();
    window.addEventListener("resize", this._onResize);
    this._onMove = (e) => this._move(e);
    this._onUp = () => this._up();
    window.addEventListener("pointermove", this._onMove);
    window.addEventListener("pointerup", this._onUp);
    // Dragging down dismisses the sheet; Escape is the same exit for anyone
    // who has no pointer to drag with.
    this._onKey = (e) => { if (e.key === "Escape" && this.open) this.close(); };
    document.addEventListener("keydown", this._onKey);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this._onResize);
    window.removeEventListener("pointermove", this._onMove);
    window.removeEventListener("pointerup", this._onUp);
    document.removeEventListener("keydown", this._onKey);
    syncFocusTrap(this, false);
  }

  // Reposition on attribute changes instead of re-rendering the DOM.
  attributeChangedCallback() {
    if (this._mounted) this._apply();
  }

  render() {
    super.render();
    const grip = this.$(".grip");
    const head = this.$(".head");
    for (const el of [grip, head]) el?.addEventListener("pointerdown", (e) => this._down(e));
    // Position after layout so offsetHeight is known.
    requestAnimationFrame(() => this._apply());
  }

  get open() { return this.hasFlag("open"); }
  get snap() { return this.attr("snap", "half"); }
  get overlay() { return this.hasFlag("overlay"); }

  /**
   * On unless opted out — the mirror image of `<ga-panel>`'s getter, and the
   * difference between the two is exactly this line. The sheet covers what is
   * beneath it, so the app does not have to ask for containment; a panel is
   * persistent, so it must.
   */
  get trapFocus() { return this.attr("trap-focus", "true") !== "false"; }

  show(snap) { if (snap) this.setAttribute("snap", snap); this.setAttribute("open", ""); this._apply(); this.emit("open"); }
  close() { this.removeAttribute("open"); this._apply(); this.emit("close"); }
  snapTo(snap) { this.setAttribute("snap", snap); this._apply(); this.emit("snapchange", { snap }); }

  _snaps() {
    const h = this.$(".sheet")?.offsetHeight || window.innerHeight * 0.88;
    const vh = window.innerHeight;
    return { full: 0, half: Math.max(0, h - vh * 0.45), peek: Math.max(0, h - 128), closed: h };
  }

  _currentY() {
    const m = /translateY\(([-0-9.]+)px\)/.exec(this.$(".sheet")?.style.transform || "");
    return m ? parseFloat(m[1]) : this._snaps().closed;
  }

  _apply() {
    const sheet = this.$(".sheet");
    if (!sheet) return;
    const s = this._snaps();
    const y = this.open ? (s[this.snap] ?? s.half) : s.closed;
    sheet.style.transform = `translateY(${y}px)`;
    // Every state change routes through here — show(), close(), a dismissing
    // drag, an attribute flip — so this is the one place the trap has to
    // follow the sheet's openness from.
    syncFocusTrap(this, this.trapFocus && this.open);
  }

  _down(e) {
    this._dragging = true;
    this._startY = e.clientY;
    this._startTf = this._currentY();
    this.$(".sheet")?.classList.add("dragging");
  }

  _move(e) {
    if (!this._dragging) return;
    const s = this._snaps();
    const y = Math.min(s.closed, Math.max(0, this._startTf + (e.clientY - this._startY)));
    this.$(".sheet").style.transform = `translateY(${y}px)`;
  }

  _up() {
    if (!this._dragging) return;
    this._dragging = false;
    this.$(".sheet")?.classList.remove("dragging");
    const s = this._snaps();
    const y = this._currentY();
    if (y > s.peek + 80) { this.close(); return; }
    let best = "full";
    for (const name of ["full", "half", "peek"]) {
      if (Math.abs(s[name] - y) < Math.abs(s[best] - y)) best = name;
    }
    if (best !== this.snap) { this.setAttribute("snap", best); this.emit("snapchange", { snap: best }); }
    this._apply();
  }
}

define("ga-bottom-sheet", GaBottomSheet);
