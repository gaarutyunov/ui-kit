/**
 * `<ga-input>` — a labelled text field. Form-associated: participates in
 * native <form> submission via ElementInternals.
 *
 * Adornments (`prefix` / `suffix` slots) render *inside* the field's border, so
 * a status dot or a trailing action button reads as part of the field instead
 * of as a sibling every app has to align by hand. The frame then has to move
 * off the `<input>` and onto a flex row — which is why it is built **only when
 * something is actually slotted**: a field with no adornments keeps emitting
 * the bare `<input>` it always did, down to the byte.
 *
 * `readonly` is a presentation, not a variant: the field keeps its shape and
 * stays selectable and focusable, it just cannot be edited — the "picked value"
 * row that a display surface needs.
 *
 * Attributes:
 *   label, placeholder, type, value, name, hint, error
 *   disabled, required, readonly (boolean)
 *
 * Slots: `prefix` (leading), `suffix` (trailing) — both inside the frame. The
 * tallest adornment sets the field's height, so a trailing action button wants
 * a compact size (`<ga-button size="sm">`) to keep the row at field height.
 *
 * Events: `input`, `change` (re-dispatched with { value } detail).
 */
export class GaInput extends GaElement {
    static formAssociated: boolean;
    static observed: string[];
    _internals: ElementInternals;
    disconnectedCallback(): void;
    /**
     * Whether leading/trailing content is slotted. Read from the light DOM rather
     * than from a `<slot>`, because the slots only exist once the answer is yes.
     */
    _adorned(): boolean;
    _framed: boolean | undefined;
    _value: any;
    set value(v: any);
    get value(): any;
}
import { GaElement } from "../../core/base-element.js";
