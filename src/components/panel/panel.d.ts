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
    static observed: string[];
    _key: ((e: any) => void) | undefined;
    disconnectedCallback(): void;
    _syncFooter(): void;
    /**
     * Keep the announced modality and the keyboard behaviour telling the same
     * story: an overlay that lets focus leave is not a modal dialog, and saying
     * `aria-modal="true"` anyway hides the rest of the page from a screen reader
     * while it is still perfectly usable.
     *
     * Only the overlay branch touches the DOM, so a drawer's rendered markup is
     * byte-for-byte what it was before overlay mode existed.
     */
    _syncModality(): void;
    get overlay(): boolean;
    /**
     * Off unless explicitly asked for. The main use of an overlay panel is a
     * persistent control surface, and one that held the keyboard would lock the
     * user out of everything else on the page. `trap-focus="false"` is honoured
     * too, so the attribute reads the same way on both overlays.
     */
    get trapFocus(): boolean;
    set open(v: boolean);
    get open(): boolean;
    show(): void;
    close(): void;
    toggle(): void;
}
import { GaElement } from "../../core/base-element.js";
