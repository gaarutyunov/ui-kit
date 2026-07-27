/**
 * `<ga-metric>` — a labelled quantity: `24.5 km/h` with "avg speed" underneath.
 *
 * A quantity plus the word for what was measured. It renders `<ga-quantity>`
 * rather than re-implementing the value/unit pair, so the primitive has a
 * consumer the day it lands and the two can never drift apart; tone is passed
 * down through the `--ga-quantity-*` custom properties.
 *
 * This is *not* tabular data — no columns, no shared header, and one member is
 * deliberately louder than the rest — so `<ga-table>` is the wrong element for
 * a group of these. What this element earns its place with is the three things
 * an app otherwise re-derives every time it hand-writes `<strong>`+`<small>`:
 *
 *   - **Shared baselines, with no per-app CSS.** The value row carries an
 *     invisible zero-width strut (`::before`, a ZWSP) sized at
 *     `--ga-metric-primary-size` — the largest scale in the group — and the
 *     row is `align-items: baseline`. The strut is the tallest thing in the
 *     row in *every* metric, so the value's baseline lands the same distance
 *     from the top of the tile whether the value is subordinate or `primary`,
 *     the row is the same height everywhere, and the labels below therefore
 *     line up too. Alignment is a property of the element, not of the grid it
 *     is dropped into: neighbours line up under `align-items: start`, inside a
 *     flex row, or in separate grid cells alike.
 *   - **A placeholder that holds the footprint.** `<ga-quantity>` always
 *     renders something, the strut fixes the row's height regardless of it,
 *     and `tabular-nums` keeps the width steady as digits change — so a group
 *     does not reflow when the first values arrive mid-flight.
 *   - **The type scale comes from tokens**, not from each app's stylesheet.
 *
 * There is deliberately **no row/grid container element** (design D5a): a
 * wrapper whose whole job is `display: grid` does not earn a component, so the
 * docs page carries the grid recipe instead.
 *
 * Attributes:
 *   label        the word for what was measured, rendered under the value
 *   value        the number (see `<ga-quantity>`)
 *   unit         optional unit
 *   placeholder  shown when `value` is empty (default "–")
 *   tone         "neutral" (default) | "accent" | "ok" | "warn" | "error"
 *   primary      boolean — the lead readout (a speedometer among its trip
 *                counters): a larger scale, still aligned with its neighbours
 *
 * CSS custom properties:
 *   --ga-metric-value-size    subordinate value scale
 *   --ga-metric-primary-size  `primary` value scale — and the strut that every
 *                             metric aligns to. A group with no primary member
 *                             can set it to `--ga-metric-value-size` to reclaim
 *                             the reserved band.
 *   --ga-metric-label-size    label scale
 *
 * Parts: `value`, `label`.
 */
export class GaMetric extends GaElement {
    static observed: string[];
    /**
     * A live readout changes its value many times a second. Forwarding those
     * three attributes to the quantity keeps the hot path from rebuilding this
     * element's shadow tree — stylesheet included — on every tick; only `label`,
     * which adds or removes a node, falls through to a re-render.
     */
    attributeChangedCallback(name: any, _old: any, value: any): void;
}
import { GaElement } from "../../core/base-element.js";
