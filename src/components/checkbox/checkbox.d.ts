/**
 * `<ga-checkbox>` — a single boolean choice, distinct from `<ga-switch>`.
 *
 * A switch is an immediate on/off command ("dark mode, now"); a checkbox is a
 * value you are *filling in*, usually alongside other fields and usually
 * submitted with a form. Hence this is form-associated: a named, checked box
 * contributes `name=value` (`value` defaults to `"on"`, as in the native
 * control) and a disabled one contributes nothing at all.
 *
 * It is tri-state. `indeterminate` is the "select all" state over a partial
 * selection, and it is a *display* state, not a third value: it wins over
 * `checked` visually and in ARIA, but the value submitted is still the one
 * `checked` says. Activating a mixed box resolves it to checked — the
 * behaviour "select all" depends on, and what the native control does.
 *
 * ARIA: this renders a `<button role="checkbox">` rather than a real
 * `<input type="checkbox">`, for the same reason `<ga-switch>` renders
 * `role="switch"` on a button:
 *   - The mixed state has no HTML attribute. `input.indeterminate` is an
 *     IDL-only property, so a declarative `indeterminate` attribute would have
 *     to be written onto the input in JS after every render anyway — and the
 *     template could never express it.
 *   - The box is drawn by the kit (tokens, focus ring, transitions) instead of
 *     fighting `appearance` on a native control that only styles halfway.
 * Nothing is lost by it: form participation comes from `ElementInternals`
 * either way, and the button is focusable, in the tab order and toggles on
 * Space exactly like the native control.
 *
 * Attributes: checked, indeterminate, disabled (boolean), label, name, value
 * Events: `change` with { checked } detail.
 */
export class GaCheckbox extends GaElement {
    static formAssociated: boolean;
    static observed: string[];
    _internals: ElementInternals;
    /** Native rules: only a checked, enabled box submits; `value` defaults to "on". */
    _syncForm(): void;
    toggle(): void;
    set checked(v: boolean);
    get checked(): boolean;
    set indeterminate(v: boolean);
    get indeterminate(): boolean;
    set value(v: string);
    get value(): string;
}
import { GaElement } from "../../core/base-element.js";
