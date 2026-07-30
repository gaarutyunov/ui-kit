/**
 * `<ga-quantity>` — a number with its unit: `24.5` `km/h`.
 *
 * A quantity is one *measured value*, not a summary of a distribution — that
 * is why this is not called a stat. It is the primitive `<ga-metric>` is built
 * from, and it is what a sentence or a table cell reaches for when the
 * surrounding text already says what the number is.
 *
 * Three things it owns so apps stop re-deriving them:
 *
 *   - **The unit never competes with the value.** It is smaller, lighter and
 *     dimmer, so a row of quantities reads as numbers first.
 *   - **No leftover spacing when there is no unit.** The gap lives on the unit
 *     itself (`margin-inline-start`), and the unit element is not emitted at
 *     all when the attribute is absent — so the element ends exactly at the
 *     last digit. This is why the template is concatenated rather than written
 *     across lines: whitespace between the two spans would collapse into a
 *     visible space that survives the unit's removal.
 *   - **It flows inline.** `display: inline` (not a block, not inline-flex)
 *     means it sits in a line of text or a table cell without imposing a box
 *     of its own, and it inherits the surrounding font so a quantity in a
 *     sentence looks like the sentence. `white-space: nowrap` only prevents a
 *     break *between* the value and its unit.
 *
 * A quantity with no value yet renders a placeholder rather than collapsing:
 * the element keeps its line so a readout that fills in mid-flight does not
 * make the layout jump. The unit is kept in that state too — "– km/h" already
 * tells the reader what is coming.
 *
 * Attributes:
 *   value        the number (any text — formatting is the app's job)
 *   unit         optional unit, rendered subordinate to the value
 *   placeholder  shown in the value's place when `value` is empty (default "–")
 *
 * CSS custom properties (the contract `<ga-metric>` composes through):
 *   --ga-quantity-color              value colour
 *   --ga-quantity-unit-color         unit colour
 *   --ga-quantity-placeholder-color  placeholder colour
 *
 * Parts: `value`, `unit`.
 */
export class GaQuantity extends GaElement {
    static observed: string[];
}
import { GaElement } from "../../core/base-element.js";
