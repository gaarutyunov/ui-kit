import { GaElement, define, esc } from "../../core/base-element.js";
import "../quantity/quantity.js";

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
  // `tone` and `primary` are absent on purpose: both are pure `:host([…])`
  // selectors, so they restyle without the element being told about them.
  static observed = ["label", "value", "unit", "placeholder"];

  static styles = /* css */ `
    :host {
      display: block;
      min-width: 0;
      --_c: var(--ga-fg, #ededed);
    }
    :host([tone="accent"])  { --_c: var(--ga-accent, #54a2ff); }
    :host([tone="ok"]),
    :host([tone="success"]) { --_c: var(--ga-green, #00c758); }
    :host([tone="warn"]),
    :host([tone="warning"]) { --_c: var(--ga-amber, #fcbb00); }
    :host([tone="error"]),
    :host([tone="danger"])  { --_c: var(--ga-red, #ff6568); }

    .value {
      display: flex;
      align-items: baseline;
      line-height: 1.1;
      font-size: var(--ga-metric-value-size, var(--ga-fs-xl, 24px));
    }
    /* The baseline strut. Zero-width and invisible, but sized at the group's
       largest scale, so it — not the value — decides where the baseline sits.
       Every metric therefore puts its baseline in the same place. */
    .value::before {
      content: "\\200b";
      flex: none;
      width: 0;
      font-size: var(--ga-metric-primary-size, var(--ga-fs-2xl, 34px));
    }
    :host([primary]) .value {
      font-size: var(--ga-metric-primary-size, var(--ga-fs-2xl, 34px));
    }

    ga-quantity {
      min-width: 0;
      --ga-quantity-color: var(--_c);
      --ga-quantity-unit-color: color-mix(in srgb, var(--_c) 60%, transparent);
    }

    .label {
      margin-top: var(--ga-space-1, 4px);
      font-size: var(--ga-metric-label-size, var(--ga-fs-xs, 12px));
      line-height: 1.35;
      font-weight: 500;
      color: var(--ga-muted, #878787);
      /* One line: a wrapping label would change the tile's height and undo the
         alignment the strut buys. The full text stays in the tooltip. */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;

  /**
   * A live readout changes its value many times a second. Forwarding those
   * three attributes to the quantity keeps the hot path from rebuilding this
   * element's shadow tree — stylesheet included — on every tick; only `label`,
   * which adds or removes a node, falls through to a re-render.
   */
  attributeChangedCallback(name, _old, value) {
    if (!this._mounted) return;
    const q = this.$("ga-quantity");
    if (q && name !== "label") {
      if (value === null) q.removeAttribute(name);
      else q.setAttribute(name, value);
      return;
    }
    super.attributeChangedCallback(name, _old, value);
  }

  template() {
    const label = this.attr("label");
    const unit = this.attr("unit");
    const placeholder = this.attr("placeholder");
    return /* html */ `
      <div class="value" part="value"><ga-quantity
        value="${esc(this.attr("value"))}"
        ${unit ? `unit="${esc(unit)}"` : ""}
        ${placeholder ? `placeholder="${esc(placeholder)}"` : ""}
      ></ga-quantity></div>
      ${label ? `<div class="label" part="label" title="${esc(label)}">${esc(label)}</div>` : ""}
    `;
  }
}

define("ga-metric", GaMetric);
