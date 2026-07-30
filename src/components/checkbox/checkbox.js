import { GaElement, define, esc } from "../../core/base-element.js";
import "../icon/icon.js";

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
  static formAssociated = true;
  static observed = [
    "checked", "indeterminate", "disabled", "label", "name", "value",
  ];

  static styles = /* css */ `
    :host { display: inline-block; }
    .wrap {
      display: inline-flex;
      align-items: center;
      gap: var(--ga-space-3, 12px);
      cursor: pointer;
      user-select: none;
    }
    :host([disabled]) .wrap { opacity: 0.5; cursor: not-allowed; }
    button {
      position: relative;
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px; height: 18px;
      padding: 0;
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: 4px;
      background: var(--ga-bg-elev, #1a1a1a);
      color: var(--ga-accent-contrast, #000);
      cursor: inherit;
      transition: background var(--ga-transition, 0.18s ease),
        border-color var(--ga-transition, 0.18s ease);
    }
    button:focus-visible {
      outline: none;
      box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
    }
    :host([checked]) button,
    :host([indeterminate]) button {
      background: var(--ga-accent, #54a2ff);
      border-color: var(--ga-accent, #54a2ff);
    }
    /* Both marks are hidden until the state asks for one. The mixed rules come
       last on purpose: when both attributes are set, mixed wins. */
    .mark { display: none; }
    :host([checked]) .tick { display: inline-flex; }
    :host([indeterminate]) .tick { display: none; }
    :host([indeterminate]) .dash { display: inline-flex; }
    .label { font-size: var(--ga-fs-sm, 14px); color: var(--ga-fg, #ededed); }
  `;

  constructor() {
    super();
    this._internals = this.attachInternals?.();
  }

  template() {
    const label = this.attr("label");
    const mixed = this.hasFlag("indeterminate");
    // A wrapping <label> names the button and makes the caption clickable:
    // <button> is a labelable element, so the browser forwards the click.
    // Without a caption the name has to come from the host — "select all" in a
    // table header is routinely a bare box with only an aria-label.
    const aria = !label && this.hasAttribute("aria-label")
      ? ` aria-label="${esc(this.getAttribute("aria-label"))}"`
      : "";
    return /* html */ `
      <label class="wrap">
        <button
          part="box"
          type="button"
          role="checkbox"
          aria-checked="${mixed ? "mixed" : this.hasFlag("checked")}"
          ${this.hasFlag("disabled") ? "disabled" : ""}
          ${aria}
        >
          <ga-icon class="mark tick" name="check" size="12"></ga-icon>
          <ga-icon class="mark dash" name="minus" size="12"></ga-icon>
        </button>
        ${label ? `<span class="label">${esc(label)}</span>` : ""}
      </label>
    `;
  }

  render() {
    super.render();
    // render() runs on every observed-attribute change, so this is also where
    // `checked` / `disabled` / `value` reach the form.
    this._syncForm();
    this.$("button")?.addEventListener("click", () => this.toggle());
  }

  /** Native rules: only a checked, enabled box submits; `value` defaults to "on". */
  _syncForm() {
    const submits = this.hasFlag("checked") && !this.hasFlag("disabled");
    this._internals?.setFormValue(submits ? this.attr("value", "on") : null);
  }

  toggle() {
    if (this.hasFlag("disabled")) return;
    // A mixed box resolves to checked rather than flipping `checked`, so
    // "select all" over a partial selection selects the rest.
    const next = this.hasFlag("indeterminate") ? true : !this.hasFlag("checked");
    this.removeAttribute("indeterminate");
    this.toggleAttribute("checked", next);
    this.emit("change", { checked: next });
  }

  get checked() { return this.hasFlag("checked"); }
  set checked(v) { this.toggleAttribute("checked", !!v); }

  get indeterminate() { return this.hasFlag("indeterminate"); }
  set indeterminate(v) { this.toggleAttribute("indeterminate", !!v); }

  get value() { return this.attr("value", "on"); }
  set value(v) { this.setAttribute("value", v); }
}

define("ga-checkbox", GaCheckbox);
