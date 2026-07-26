/**
 * `<ga-slider>` — a range slider.
 *
 * Built on a native range input (stereoscope styles ranges with
 * `accent-color`); this adds a themed track/thumb and an optional label + live
 * value readout. Form-associated.
 *
 * `label-start` / `label-end` name the two ends of the range, for the "this ↔
 * that" preference slider where the number itself means nothing to the user;
 * `hide-value` drops the readout for the same case. They are attributes rather
 * than slots so the common case stays one line of markup, and all three are
 * inert when absent — a slider written against the original `label`-only API
 * renders exactly the markup it always did.
 *
 * Attributes: min, max, step, value, label, label-start, label-end,
 *             hide-value, disabled
 * Events: `input`, `change` — both with { value }.
 */
export class GaSlider extends GaElement {
    static formAssociated: boolean;
    static observed: string[];
    _internals: ElementInternals;
    _value: any;
    set value(v: any);
    get value(): any;
}
import { GaElement } from "../../core/base-element.js";
