/**
 * `<ga-status>` — a single-line, tone-coloured status message.
 *
 * A line, not a box: `<ga-alert>` carries a title, an icon and a dismiss
 * affordance, none of which apply to "Recalculating…" under a toolbar. Folding
 * the two together would make both harder to read (design D4).
 *
 * Two things make this more than a styled `<span>`:
 *
 *   - **It is announced.** The host carries `role="status"`, so a screen reader
 *     reads the new text when it changes without the element taking focus. The
 *     role is on the *host* rather than inside the shadow root for two reasons:
 *     a live region has to exist before its content changes, and slotted text
 *     lives in the light DOM where a shadow-internal region's coverage is not
 *     something every screen reader agrees on. For the same reason the shadow
 *     tree is built once and `text` is patched in place — re-rendering would
 *     replace the live region with a fresh node that already has its content,
 *     which is exactly the case screen readers do not announce. Tone needs no
 *     re-render at all: it is a `:host([tone])` selector.
 *   - **Empty, it still occupies its line.** `min-height` of one line means a
 *     status that only appears sometimes does not collapse and shove the
 *     surrounding layout up and down as it comes and goes.
 *
 * The line never wraps — it truncates instead, so the reserved line stays one
 * line high. The full text is still in the DOM and still announced; anything
 * long enough to need wrapping wants `<ga-alert>`.
 *
 * Attributes:
 *   tone  "neutral" (default) | "ok" | "error"
 *   text  convenience for setting the message without touching light DOM
 *
 * Slot: default (the message; use instead of `text` for rich content).
 *
 * Parts: `status`, `text`.
 */
export class GaStatus extends GaElement {
    static observed: string[];
    /**
     * Patch the text in place instead of re-rendering, so the live region node
     * survives every update and the change is announced.
     */
    attributeChangedCallback(name: any, _old: any, value: any): void;
}
import { GaElement } from "../../core/base-element.js";
