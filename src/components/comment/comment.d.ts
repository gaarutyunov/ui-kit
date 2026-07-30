/**
 * `<ga-comment>` — one comment in a review thread: an author, a timestamp, a
 * body, an optional anchor, and a resolution state.
 *
 *   <ga-comment author="Ada" time="2h ago" datetime="2026-07-28T09:12:00Z"
 *               anchor="step 3 · Submit the order">
 *     The retry fires before the toast clears.
 *   </ga-comment>
 *   <ga-comment author="Grace" time="1h ago" resolved>Fixed on main.</ga-comment>
 *
 * **Every author is aligned identically, on purpose.** `ga-chat-message` puts
 * the reader's own turns on the right and fills them inverse, because a
 * conversation has a "me versus them" axis. A review thread has no such axis:
 * the reviewer, the author and a bot are all just people who left a note, and
 * mirroring the layout by speaker would invent a hierarchy the data does not
 * have. So there is exactly one card treatment here and no `:host([author=…])`
 * selector anywhere — which is also why this is not `ga-chat-message` with a
 * flag. See the change design, D3.
 *
 * **Resolution is not conveyed by opacity.** A resolved comment dims, but the
 * dimming is decoration stacked on top of a distinction that already exists in
 * text: a visible "Resolved" chip, and a toggle whose `aria-pressed` reports the
 * state. Anyone who cannot see the 28% opacity difference — low vision, a
 * screen reader, forced-colours mode — still gets the answer, and forced
 * colours is restated explicitly because it flattens the dimming away entirely.
 *
 * **The timestamp is a real `<time>`.** `time` is what a person reads ("2h
 * ago"); `datetime` is what a machine reads, and falls back to `time` when the
 * host only supplies one. A relative time with no machine value is unusable to
 * anything that wants to sort, group or re-localise the thread.
 *
 * Attributes:
 *   author      who wrote it
 *   time        human-readable timestamp
 *   datetime    machine-readable timestamp (defaults to `time`)
 *   anchor      what the comment is attached to
 *   resolved    boolean — settled
 *   no-resolve  boolean — hide the toggle, for a comment that is a reply rather
 *               than an independently resolvable thread head
 *
 * Slots: (default) — the comment body.
 * Events: `resolve` with { resolved } — the NEW state, not the old one.
 * Parts: card, meta, author, time, chip, toggle, anchor, body.
 */
export class GaComment extends GaElement {
    static observed: string[];
    /**
     * Flip the resolution state and announce the state it landed on.
     *
     * The attribute moves first and the event follows, matching `ga-step-list`:
     * the control has to respond to the press whether or not a host is listening,
     * and a host that wants server confirmation before committing can put the
     * state back in its handler.
     */
    toggleResolved(): void;
    /** @param {boolean} v */
    set resolved(v: boolean);
    get resolved(): boolean;
}
import { GaElement } from "../../core/base-element.js";
