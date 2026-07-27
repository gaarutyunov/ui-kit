/**
 * `<ga-step-list>` — a vertical list of status-bearing steps that the reader
 * can **select**.
 *
 * This is a navigator, not a progress indicator. The distinction drives every
 * decision below: the rows are buttons because activating one is a request
 * ("take me there"), and the component therefore has to answer two questions at
 * once rather than one.
 *
 * **The two cursors.** `current` is what is playing; `selected` is what the
 * reader chose to look at. They are independent — a reader who clicks step 2
 * while step 7 is running has not stopped step 7 — so they must never collapse
 * into a single highlight. They are kept apart on two axes:
 *
 *   - *Visually*, on different channels. `current` is an edge mark: an accent
 *     bar down the left of the row plus an accent ring on the status glyph.
 *     `selected` is a surface: a filled, bordered row. An edge mark and a fill
 *     read as different kinds of thing, and both survive being drawn on the
 *     same row at the same time.
 *   - *Semantically*, on different ARIA properties. `current` is
 *     `aria-current="step"` — the attribute invented for exactly "the current
 *     one in a sequence". `selected` is `aria-pressed`, because a standalone
 *     button may not carry `aria-selected` (ARIA allows it only inside a
 *     listbox / grid / tablist). One shared property would have forced the two
 *     answers into one, which is the bug this component exists to avoid.
 *
 * **Why a real `<ol>` with an explicit `role="list"`.** The list semantics are
 * what give screen-reader users "3 of 7" for free. WebKit drops the list role
 * when `list-style: none` is applied, so the role is restated by hand rather
 * than relied upon.
 *
 * **Arrows move focus; they do not select.** Selection is a seek. Selecting on
 * every arrow keystroke would fire a seek per keypress, so the list uses the
 * manual-selection form of roving tabindex: arrows and Home/End move the focus
 * ring, Enter/Space (native button activation) commits. The list is one tab
 * stop; the tab stop follows the reader's last position.
 *
 *   <ga-step-list current="s3" selected="s1" steps='[
 *     {"id":"s1","label":"Open the checkout","meta":"0:00","status":"passed"},
 *     {"id":"s3","label":"Submit the order","meta":"0:12","status":"running",
 *      "badge":"retry 2"}
 *   ]'></ga-step-list>
 *
 * Attributes:
 *   steps     JSON: { id, label, meta?, status?, badge? }[]
 *   current   id of the step that is playing
 *   selected  id of the step the reader chose (reflected on activation)
 *   label     accessible name for the list (default "Steps")
 *
 * Statuses: pending | running | passed | failed | skipped (anything else
 * renders neutrally and is announced verbatim).
 *
 * Events: `select` with { id, index, step }.
 * Parts: list, item, row, rail, glyph, title, meta, badge.
 */
export class GaStepList extends GaElement {
    static observed: string[];
    _parse(): any[];
    /** A step's identity: its `id` when it has one, otherwise its position. */
    _idOf(step: any, index: any): string;
    _rows(): Element[];
    _onKey(e: any, rows: any): void;
    /** Move the roving tab stop, then the focus. */
    _focus(row: any, rows: any): void;
    _select(id: any, index: any): void;
    /** @param {{ id?: string, label?: string, meta?: string, status?: string, badge?: string }[]} v */
    set steps(v: {
        id?: string;
        label?: string;
        meta?: string;
        status?: string;
        badge?: string;
    }[]);
    get steps(): {
        id?: string;
        label?: string;
        meta?: string;
        status?: string;
        badge?: string;
    }[];
    /** @param {string | null} v */
    set selected(v: string | null);
    get selected(): string | null;
    /** @param {string | null} v */
    set current(v: string | null);
    get current(): string | null;
}
import { GaElement } from "../../core/base-element.js";
