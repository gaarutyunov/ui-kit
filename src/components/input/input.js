import { GaElement, define, esc } from "../../core/base-element.js";

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
  static formAssociated = true;
  static observed = [
    "label", "placeholder", "type", "value", "name",
    "hint", "error", "disabled", "required", "readonly",
  ];

  static styles = /* css */ `
    :host { display: block; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    label {
      font-size: var(--ga-fs-sm, 14px);
      font-weight: 500;
      color: var(--ga-fg, #ededed);
    }
    .req { color: var(--ga-red, #ff6568); margin-left: 2px; }
    input {
      width: 100%;
      font-family: inherit;
      font-size: var(--ga-fs-sm, 14px);
      color: var(--ga-fg, #ededed);
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius, 6px);
      padding: 10px 12px;
      transition: border-color var(--ga-transition, 0.18s ease),
        box-shadow var(--ga-transition, 0.18s ease);
    }
    input::placeholder { color: var(--ga-dim, #454545); }
    input:hover { border-color: var(--ga-muted, #878787); }
    input:focus {
      outline: none;
      border-color: var(--ga-accent, #54a2ff);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--ga-accent, #54a2ff) 25%, transparent);
    }
    :host([disabled]) input { opacity: 0.5; cursor: not-allowed; }
    .hint { font-size: var(--ga-fs-xs, 12px); color: var(--ga-muted, #878787); }
    .error { font-size: var(--ga-fs-xs, 12px); color: var(--ga-red, #ff6568); }
    :host([error]) input { border-color: var(--ga-red, #ff6568); }

    /* ---- Adornments -------------------------------------------------------
       Only ever rendered when a prefix/suffix is slotted. The frame (border,
       background, ring) moves from the <input> to this row and the input keeps
       only its text metrics, so the whole thing reads as one field. */
    .control {
      display: flex;
      align-items: center;
      gap: var(--ga-space-2, 8px);
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius, 6px);
      padding: 0 12px;
      transition: border-color var(--ga-transition, 0.18s ease),
        box-shadow var(--ga-transition, 0.18s ease);
    }
    .control:hover { border-color: var(--ga-muted, #878787); }
    /* One ring for the field, drawn on the frame. :focus-within keeps it lit
       while a trailing action button is tab-focused, which is the point of
       putting the button inside the frame in the first place. */
    .control:focus-within {
      border-color: var(--ga-accent, #54a2ff);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--ga-accent, #54a2ff) 25%, transparent);
    }
    .control input {
      flex: 1 1 auto;
      min-width: 0;
      padding: 10px 0;
      border: none;
      border-radius: 0;
      background: none;
    }
    /* The input must not draw a second ring inside the frame's. */
    .control input:hover, .control input:focus { box-shadow: none; }
    .control ::slotted(*) {
      flex: none;
      display: inline-flex;
      align-items: center;
      color: var(--ga-muted, #878787);
    }
    :host([error]) .control { border-color: var(--ga-red, #ff6568); }
    /* Dim the frame once, not the frame and the input it contains. */
    :host([disabled]) .control { opacity: 0.5; }
    :host([disabled]) .control input { opacity: 1; }

    /* ---- Readonly ---------------------------------------------------------
       Same shape, no editing: only the affordances change. The focus ring
       stays — the field is still focusable and its text still selectable. */
    :host([readonly]) input { cursor: default; }
    :host([readonly]) input:hover,
    :host([readonly]) .control:hover { border-color: var(--ga-border-strong, #2a2a2a); }
  `;

  constructor() {
    super();
    this._internals = this.attachInternals?.();
  }

  connectedCallback() {
    super.connectedCallback();
    // A custom element upgrades as soon as its start tag is parsed, so the
    // first render can run *before* a `<span slot="prefix">` written right
    // there in the markup exists — and apps add adornments at runtime too.
    // Watching the light DOM covers both. The callback re-renders only when the
    // answer flips, so a field without adornments never renders twice.
    this._watch ??= new MutationObserver(() => {
      if (this._adorned() === this._framed) return;
      const typed = this.value;
      this.render();
      const input = this.$("input");
      if (input && typed != null) input.value = typed;
    });
    this._watch.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this._watch?.disconnect();
  }

  /**
   * Whether leading/trailing content is slotted. Read from the light DOM rather
   * than from a `<slot>`, because the slots only exist once the answer is yes.
   */
  _adorned() {
    return !!this.querySelector(':scope > [slot="prefix"], :scope > [slot="suffix"]');
  }

  template() {
    const label = this.attr("label");
    const error = this.attr("error");
    const hint = this.attr("hint");
    const req = this.hasFlag("required") ? `<span class="req">*</span>` : "";
    // `readonly` is appended to the previous line rather than taking one of its
    // own, so its absence leaves the markup byte-for-byte what it was.
    const field = /* html */ `<input
          part="input"
          type="${esc(this.attr("type", "text"))}"
          placeholder="${esc(this.attr("placeholder"))}"
          value="${esc(this.attr("value"))}"
          ${this.hasFlag("disabled") ? "disabled" : ""}
          ${this.hasFlag("required") ? "required" : ""}${this.hasFlag("readonly") ? "\n          readonly" : ""}
          aria-invalid="${error ? "true" : "false"}"
        />`;
    // The frame exists only when there is something to put in it: no adornments
    // means no wrapper, and nothing changes for a field that never had any. The
    // answer is remembered so the observer above can tell a real change from
    // any other child mutation.
    this._framed = this._adorned();
    const control = this._framed
      ? /* html */ `<div class="control" part="control">
          <slot name="prefix"></slot>
          ${field}
          <slot name="suffix"></slot>
        </div>`
      : field;
    return /* html */ `
      <div class="field">
        ${label ? `<label part="label">${esc(label)}${req}</label>` : ""}
        ${control}
        ${error ? `<span class="error" part="error">${esc(error)}</span>`
          : hint ? `<span class="hint" part="hint">${esc(hint)}</span>` : ""}
      </div>
    `;
  }

  render() {
    super.render();
    const input = this.$("input");
    if (!input) return;
    input.addEventListener("input", () => {
      // Keep the underlying property + form value in sync, but do NOT reflect
      // back to the observed `value` attribute — that would re-render the
      // shadow tree on every keystroke and drop focus.
      this._value = input.value;
      this._internals?.setFormValue(input.value);
      this.emit("input", { value: input.value });
    });
    input.addEventListener("change", () => this.emit("change", { value: input.value }));
  }

  get value() { return this.$("input")?.value ?? this._value ?? this.attr("value"); }
  set value(v) { this._value = v; this.setAttribute("value", v); }
}

define("ga-input", GaInput);
