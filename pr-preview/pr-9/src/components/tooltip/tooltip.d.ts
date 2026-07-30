/**
 * `<ga-tooltip>` — a styled label that appears beside its trigger.
 *
 * Wraps the thing it describes, and takes its geometry from the shared
 * `core/popup.js` primitive rather than growing a second positioner: top
 * layer, viewport-rect placement, flip when there is no room, and dismissal on
 * Escape / outside pointerdown / the anchor scrolling away. It opts out of the
 * primitive's `min-width: anchor width`, because a tooltip is sized by its own
 * words, not by the 40px button it hangs off.
 *
 *   <ga-tooltip text="Delete run">
 *     <ga-button aria-label="Delete run">…</ga-button>
 *   </ga-tooltip>
 *
 * **It opens on hover *and* on focus.** A hover-only tooltip does not exist for
 * a keyboard user, so `focusin` shows it with no delay (the user asked for this
 * control explicitly, and a delay reads as lag), while the pointer waits out
 * `delay` — a tooltip that fires while the pointer is merely crossing the
 * screen is noise. It hides on leave, on blur and on Escape; after Escape the
 * trigger keeps focus, so the user is not thrown back to the top of the page
 * for dismissing a hint.
 *
 * **It is never a tab stop.** The host carries no `tabindex` and the bubble is
 * a plain `<div>` with `pointer-events: none`, so tabbing moves between the
 * page's real controls and the pointer can still click straight through the
 * bubble to whatever is under it.
 *
 * ## Why a tooltip cannot supply the trigger's accessible name
 *
 * The tempting reading is that wrapping an unlabelled icon button in a tooltip
 * names it, and that `ga-button`'s missing-name warning should therefore learn
 * about tooltips. **It must not**, and the reason is structural rather than a
 * matter of taste:
 *
 *   - `aria-labelledby` and `aria-describedby` are **IDREFs**, and IDREFs are
 *     resolved within a single tree. They **do not cross a shadow root**.
 *   - This bubble lives in `<ga-tooltip>`'s shadow root; the trigger lives in
 *     the light DOM outside it. There is no id the trigger could point at.
 *   - Worse, `GaElement` attaches every shadow root with `delegatesFocus:
 *     true`, so for a kit component the element that actually takes focus — a
 *     `<button>` inside `ga-button`'s *own* shadow root — is a second boundary
 *     away. Even same-tree IDREFs would not reach it.
 *
 * So a tooltip is decoration. The accessible name still has to arrive on the
 * trigger itself, via `aria-label` or `title`. `ga-button`'s `_warnIfUnnamed()`
 * is deliberately left alone: an icon-only button wrapped in a tooltip and
 * given no name of its own **still warns**, and that warning is correct.
 *
 * ## What it does do: suppress the native tooltip without losing the name
 *
 * The one coupling worth having is the opposite one. A trigger carrying
 * `title` would show the browser's own tooltip alongside this one, so when no
 * `text` is given the tooltip **adopts the trigger's `title` and removes the
 * attribute**. Removing it naively would delete an accessible name, because
 * `title` is the last fallback of the name computation — so before removing
 * it, the value is promoted to `aria-label` on the trigger, which yields the
 * identical name string. The promotion happens **only** for an adopted
 * `title`, and only when the trigger has no `aria-label` / `aria-labelledby`
 * of its own; an explicit `text=` is never promoted, because that would be the
 * tooltip supplying the name, which is exactly what must not happen. Both
 * edits are reverted if the tooltip is disconnected.
 *
 * Attributes:
 *   text       the label. Omit it to adopt the trigger's `title`.
 *   placement  "top" (default) | "bottom" | "left" | "right" — preferred side;
 *              flips to the opposite one when there is no room.
 *   delay      hover show delay in ms (default 300). Focus is never delayed.
 *
 * Slots: default — the trigger.
 * Methods: show() / hide().
 * Events: `open`, `close`.
 *
 * CSS parts: `tip`. Custom property: `--ga-tooltip-max-width`.
 */
export class GaTooltip extends GaElement {
    static observed: string[];
    disconnectedCallback(): void;
    _hovered: boolean | undefined;
    _focused: boolean | undefined;
    _visible: boolean | undefined;
    _popup: {
        show: () => void;
        close: () => void;
        reposition: () => void;
        readonly open: boolean;
        destroy(): void;
    } | null | undefined;
    /** The element the tooltip describes — the first slotted element, if any. */
    _trigger(): HTMLElement | null;
    /** The label to show: an explicit `text`, else the adopted `title`. */
    _text(): string;
    _placement(): string;
    /** Hover show delay, in ms. Non-numeric or negative values fall back. */
    _delay(): number;
    /**
     * Adopt the trigger's `title` (so the native tooltip does not double up) and
     * paint the bubble. See the class JSDoc for why the value is promoted to
     * `aria-label` first, and why an explicit `text` never is.
     */
    _syncText(): void;
    _adopted: {
        trigger: HTMLElement;
        title: string;
        promoted: boolean;
    } | null | undefined;
    _adoptedTitle: string | undefined;
    /** Undo the adoption, so removing the tooltip does not strip the trigger. */
    _restoreTitle(): void;
    _onEnter: () => void;
    _onLeave: () => void;
    _onFocusIn: () => void;
    _onFocusOut: () => void;
    /** Reconcile the bubble with the two reasons it can be up. */
    _sync(immediate?: boolean): void;
    _timer: number | undefined;
    /** Show the tooltip now, regardless of pointer or focus. */
    show(): void;
    /** Hide the tooltip now. */
    hide(): void;
    /** Whether the bubble is currently shown. */
    get open(): boolean;
}
import { GaElement } from "../../core/base-element.js";
