import { GaElement, define, esc } from "../../core/base-element.js";
import { createPopup } from "../../core/popup.js";

/**
 * `<ga-combobox>` — a text field with an asynchronous suggestion list.
 * Form-associated: participates in native <form> submission via ElementInternals.
 *
 *   <ga-combobox label="City" placeholder="Start typing…"></ga-combobox>
 *
 *   box.addEventListener("filter", async (e) => {
 *     box.loading = true;
 *     box.options = await search(e.detail.text);
 *     box.loading = false;
 *   });
 *
 * This is `ga-select`'s free-text sibling and shares its machinery: the same
 * `createPopup` for the anchored, top-layer panel, and the same listbox rows,
 * roving `aria-activedescendant` and disabled-skipping keyboard model. Three
 * things differ, and each difference is the reason the element exists rather
 * than being a `filterable` flag on `ga-select`:
 *
 *   - **Nothing is filtered locally.** `ga-select` narrows its own options by
 *     substring; here the host owns matching. A server that answers "sf" with
 *     "San Francisco" would have its own result filtered back out by a local
 *     substring pass, so the option list is rendered exactly as supplied.
 *   - **New options never re-render the tree.** The host replaces `options`
 *     *while the user is typing*, and a full re-render would recreate the very
 *     input that has focus — dropping the caret mid-word. `options` and
 *     `loading` therefore repaint the rows only.
 *   - **Tab does not commit the active suggestion.** In a select the highlight
 *     is the value; here the typed text is, and silently swapping it for a
 *     suggestion the user merely arrowed past would change what they wrote.
 *
 * `loading` exists for the same reason the debounce does: between a keystroke
 * and the host's answer there are no options, and without a pending state the
 * field would flash "No results" on every letter.
 *
 * Value model: the field's **text** is what the user sees; `value` is what is
 * committed. Choosing a suggestion puts its `label` in the field and its
 * `value` on the element, so an id-backed list keeps its id. Free text commits
 * as itself. Committing happens on Enter, on choosing, and on blur.
 *
 * Attributes:
 *   options (JSON: { value, label, disabled? }[]), value, label, placeholder,
 *   hint, error, name, debounce (ms), no-results-text, loading-text,
 *   loading, disabled, required (boolean)
 *
 * Slots: (default) — `<option>` elements, a static alternative to `options`.
 *
 * Events:
 *   `filter` — debounced typing. detail: { text }. Answer it by replacing
 *              `options`; this is the async hook.
 *   `input`  — every keystroke, undebounced. detail: { text }.
 *   `change` — a value was committed. detail: { value, label }.
 */
export class GaCombobox extends GaElement {
  static formAssociated = true;
  static observed = [
    "options", "value", "label", "placeholder", "hint", "error", "name",
    "debounce", "no-results-text", "loading-text", "loading", "disabled",
    "required",
  ];

  static styles = /* css */ `
    :host { display: block; position: relative; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    label {
      font-size: var(--ga-fs-sm, 14px);
      font-weight: 500;
      color: var(--ga-fg, #ededed);
    }
    .req { color: var(--ga-red, #ff6568); margin-left: 2px; }

    .control {
      display: flex;
      align-items: center;
      gap: var(--ga-space-2, 8px);
      padding: 0 12px;
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius, 6px);
      transition: border-color var(--ga-transition, 0.18s ease),
        box-shadow var(--ga-transition, 0.18s ease);
    }
    .control:hover { border-color: var(--ga-muted, #878787); }
    .control:focus-within {
      border-color: var(--ga-accent, #54a2ff);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--ga-accent, #54a2ff) 25%, transparent);
    }
    :host([error]) .control { border-color: var(--ga-red, #ff6568); }
    :host([disabled]) .control { opacity: 0.5; }

    input {
      flex: 1;
      min-width: 0;
      font-family: inherit;
      font-size: var(--ga-fs-sm, 14px);
      color: var(--ga-fg, #ededed);
      background: transparent;
      border: 0;
      outline: none;
      padding: 10px 0;
    }
    input::placeholder { color: var(--ga-dim, #454545); }
    input:disabled { cursor: not-allowed; }

    .caret {
      flex: none;
      width: 14px;
      height: 14px;
      color: var(--ga-muted, #878787);
      transition: transform var(--ga-transition, 0.18s ease);
    }
    :host([disabled]) .caret { cursor: not-allowed; }
    .control[data-open="true"] .caret { transform: rotate(180deg); }

    .panel {
      z-index: var(--ga-z-overlay, 900);
      box-sizing: border-box;
      max-height: 280px;
      overflow: auto;
      padding: 4px;
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius, 6px);
      box-shadow: var(--ga-shadow, 0 8px 24px rgba(0, 0, 0, 0.5));
    }
    .panel[hidden] { display: none; }
    .panel:popover-open { display: block; }
    /* The top layer paints its own backdrop; we want none. */
    .panel::backdrop { background: transparent; }

    .opt {
      display: flex;
      align-items: center;
      gap: var(--ga-space-2, 8px);
      font-size: var(--ga-fs-sm, 14px);
      color: var(--ga-fg, #ededed);
      border-radius: var(--ga-radius-sm, 4px);
      padding: 8px 10px;
      cursor: pointer;
    }
    .opt[aria-selected="true"] { color: var(--ga-accent, #54a2ff); }
    .opt.active { background: var(--ga-bg-elev-hover, #232323); }
    .opt[aria-disabled="true"] { opacity: 0.4; cursor: not-allowed; }
    .opt .desc {
      font-size: var(--ga-fs-xs, 12px);
      color: var(--ga-muted, #878787);
      margin-left: auto;
      padding-left: var(--ga-space-2, 8px);
    }
    .empty {
      font-size: var(--ga-fs-sm, 14px);
      color: var(--ga-muted, #878787);
      padding: 10px;
    }

    .hint { font-size: var(--ga-fs-xs, 12px); color: var(--ga-muted, #878787); }
    .error { font-size: var(--ga-fs-xs, 12px); color: var(--ga-red, #ff6568); }
  `;

  constructor() {
    super();
    this._internals = this.attachInternals?.();
    this._open = false;
    this._active = -1;
    // null means "derive the text from the committed value"; a string means the
    // user has typed and the field is authoritative until the next commit.
    this._text = null;
    // The label the committed value was chosen under. Held separately because
    // a host commonly drops `options` right after a selection, and deriving the
    // label from a list that no longer contains it would turn "San Francisco"
    // back into "sf" — and then commit that as free text on the next blur.
    this._label = null;
    this._filterTimer = 0;
    this._popup = null;
    this._reflecting = false;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Repaint, never re-render: `options` and `loading` land while the user is
    // mid-word, and re-rendering would replace the focused <input>.
    if ((name === "options" || name === "loading") && this._mounted) {
      this._onOptionsChanged();
      return;
    }
    // Our own mirror of a commit must not be mistaken for the host assigning a
    // new value — that would throw away the text we just put in the field.
    if (name === "value") {
      if (this._reflecting) return;
      this._text = null;
      this._label = null;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  /* --- options ---------------------------------------------------------- */

  /**
   * The suggestions exactly as the host supplied them, falling back to slotted
   * `<option>`s. Deliberately unfiltered — see the note on the class.
   */
  _options() {
    const raw = this.getAttribute("options");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.map(normalise);
      } catch {
        /* fall through to the light DOM */
      }
    }
    return [...this.querySelectorAll("option")].map((el) => ({
      value: el.value ?? el.textContent.trim(),
      label: el.textContent.trim(),
      description: "",
      disabled: el.disabled,
    }));
  }

  /** The label the committed value reads as. */
  _labelForValue() {
    if (this._label !== null) return this._label;
    const value = this.attr("value");
    if (!value) return "";
    const match = this._options().find((o) => o.value === value);
    return match ? match.label : value;
  }

  /** The text the field should show: what was typed, else the committed value. */
  _fieldText() {
    return this._text !== null ? this._text : this._labelForValue();
  }

  /* --- template --------------------------------------------------------- */

  template() {
    const label = this.attr("label");
    const error = this.attr("error");
    const hint = this.attr("hint");
    const req = this.hasFlag("required") ? `<span class="req">*</span>` : "";
    const disabled = this.hasFlag("disabled");

    return /* html */ `
      <div class="field">
        ${label ? `<label part="label" id="lbl" for="input">${esc(label)}${req}</label>` : ""}
        <div class="control" part="control" data-open="${this._open}">
          <input id="input" part="input" type="text" autocomplete="off"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded="${this._open}"
            aria-controls="listbox"
            ${label ? `aria-labelledby="lbl"` : ""}
            aria-invalid="${error ? "true" : "false"}"
            ${error ? `aria-errormessage="err"` : hint ? `aria-describedby="hint"` : ""}
            placeholder="${esc(this.attr("placeholder"))}"
            value="${esc(this._fieldText())}"
            ${disabled ? "disabled" : ""}
            ${this.hasFlag("required") ? "required" : ""} />
          <svg class="caret" viewBox="0 0 16 16" aria-hidden="true" fill="none"
            stroke="currentColor" stroke-width="1.5">
            <path d="M4 6l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="panel" part="panel" id="panel" ${this._open ? "" : "hidden"}>
          <div id="listbox" role="listbox"
            ${label ? `aria-labelledby="lbl"` : `aria-label="Suggestions"`}>${this._rows()}</div>
        </div>
        ${error ? `<span class="error" part="error" id="err">${esc(error)}</span>`
          : hint ? `<span class="hint" part="hint" id="hint">${esc(hint)}</span>` : ""}
      </div>
      <slot hidden></slot>
    `;
  }

  /**
   * The rows alone, so a new batch of suggestions can be painted without
   * touching the input. The pending and empty states are `role="option"`
   * because a `role="listbox"` may only contain options — they are inert, and
   * the keyboard never reaches them since neither is in `_options()`.
   */
  _rows() {
    if (this.hasFlag("loading")) {
      const text = this.attr("loading-text", "Searching…");
      return `<div class="empty" role="option" aria-disabled="true">${esc(text)}</div>`;
    }
    const options = this._options();
    if (!options.length) {
      const text = this.attr("no-results-text", "No results");
      return `<div class="empty" role="option" aria-disabled="true">${esc(text)}</div>`;
    }
    const value = this.attr("value");
    return options
      .map((o, i) => {
        return `<div class="opt${i === this._active ? " active" : ""}"
          part="option" role="option" id="opt-${i}" data-value="${esc(o.value)}"
          aria-selected="${o.value === value}"
          ${o.disabled ? `aria-disabled="true"` : ""}>
          <span>${esc(o.label)}</span>
          ${o.description ? `<span class="desc">${esc(o.description)}</span>` : ""}
        </div>`;
      })
      .join("");
  }

  /* --- lifecycle -------------------------------------------------------- */

  render() {
    super.render();
    this._internals?.setFormValue(this.attr("value"));

    const input = this.$("input");
    const panel = this.$(".panel");
    if (!input || !panel) return;

    this._popup?.destroy();
    this._popup = createPopup(input, panel, {
      onDismiss: (reason) => {
        this._open = false;
        this._active = -1;
        this._syncOpenState();
        // An outside click has already moved the pointer elsewhere; stealing
        // focus back would fight it. Escape, though, must leave focus here.
        if (reason === "escape") input.focus();
      },
    });
    if (this._open) this._popup.show();

    // The inner <input> fires composed `input` / `change` events of its own,
    // which would surface on the host alongside ours with a different detail
    // shape. Stop them at the boundary so the documented events are the only
    // ones a listener sees.
    input.addEventListener("input", (e) => {
      e.stopPropagation();
      this._onInput(input.value);
    });
    input.addEventListener("change", (e) => e.stopPropagation());
    input.addEventListener("keydown", (e) => this._onKeyDown(e));
    input.addEventListener("blur", () => this._onBlur());

    this._bindRows();

    // Slotted <option>s can arrive after the first render, and re-rendering
    // would replace the <slot>, firing slotchange again — an infinite loop.
    // Repaint the rows instead; that leaves the slot alone.
    this.$("slot")?.addEventListener("slotchange", () => this._onOptionsChanged());
  }

  disconnectedCallback() {
    this._popup?.destroy();
    clearTimeout(this._filterTimer);
  }

  _bindRows() {
    this.shadowRoot.querySelectorAll(".opt").forEach((row) => {
      row.addEventListener("click", () => {
        if (row.getAttribute("aria-disabled") === "true") return;
        this._choose(row.dataset.value);
      });
      // pointerdown must not pull focus out of the input — a blur here would
      // commit the half-typed text before the click ever lands.
      row.addEventListener("pointerdown", (e) => e.preventDefault());
    });
  }

  /** A fresh batch of suggestions arrived: repaint rows, keep the caret. */
  _onOptionsChanged() {
    // The active row indexes into a list that no longer exists.
    this._active = -1;
    this._repaintRows();
  }

  /** Repaint only the rows — keeps the input's focus and caret position. */
  _repaintRows() {
    const listbox = this.$("#listbox");
    if (!listbox) return;
    listbox.innerHTML = this._rows();
    this._bindRows();
    this._syncActive();
    // The panel's height just changed, so its anchoring has to be redone.
    if (this._open) this._popup?.reposition();
  }

  /* --- open / close ----------------------------------------------------- */

  _openPanel() {
    if (this._open || this.hasFlag("disabled")) return;
    this._open = true;
    this._syncOpenState();
    this._popup?.show();
  }

  _close() {
    if (!this._open) return;
    this._open = false;
    this._active = -1;
    this._popup?.close();
    this._syncOpenState();
  }

  /** Reflect open state without re-rendering, which would drop focus. */
  _syncOpenState() {
    const input = this.$("input");
    const panel = this.$(".panel");
    const control = this.$(".control");
    input?.setAttribute("aria-expanded", String(this._open));
    control?.setAttribute("data-open", String(this._open));
    if (panel) panel.hidden = !this._open;
    this._syncActive();
  }

  _syncActive() {
    const input = this.$("input");
    const rows = [...this.shadowRoot.querySelectorAll(".opt")];
    rows.forEach((row, i) => row.classList.toggle("active", i === this._active));
    const active = rows[this._active];
    if (this._open && active) {
      input?.setAttribute("aria-activedescendant", active.id);
      active.scrollIntoView({ block: "nearest" });
    } else {
      input?.removeAttribute("aria-activedescendant");
    }
  }

  /* --- typing ----------------------------------------------------------- */

  _onInput(text) {
    this._text = text;
    this._active = -1;
    this.emit("input", { text });

    if (!text) {
      this._close();
    } else {
      this._openPanel();
      this._repaintRows();
    }

    // Debounced, so a host fetching results is not hit on every keystroke.
    clearTimeout(this._filterTimer);
    const wait = Number(this.attr("debounce", "200")) || 0;
    this._filterTimer = setTimeout(() => this.emit("filter", { text }), wait);
  }

  /* --- keyboard --------------------------------------------------------- */

  _onKeyDown(e) {
    const options = this._options();

    if (!this._open) {
      if (e.key === "ArrowDown" || (e.altKey && e.key === "ArrowDown")) {
        e.preventDefault();
        this._openPanel();
        this._repaintRows();
        this._move(1, options);
      } else if (e.key === "Enter") {
        e.preventDefault();
        this._commitText();
      } else if (e.key === "Escape") {
        // Closed already: Escape clears the field, as it does on a native
        // search input and as the ARIA combobox pattern specifies.
        e.preventDefault();
        this._clear();
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        this._close();
        return;
      case "Enter": {
        e.preventDefault();
        const option = enabledAt(options, this._active);
        if (option) this._choose(option.value);
        else this._commitText();
        return;
      }
      case "Tab":
        // The typed text is the value; a suggestion merely arrowed past is not.
        this._close();
        return;
      case "ArrowDown":
        e.preventDefault();
        this._move(1, options);
        return;
      case "ArrowUp":
        e.preventDefault();
        this._move(-1, options);
        return;
      case "Home":
        // Only claim Home/End for the list once a suggestion is active —
        // otherwise they belong to the caret, as in any text field.
        if (this._active < 0) return;
        e.preventDefault();
        this._moveTo(0, options, 1);
        return;
      case "End":
        if (this._active < 0) return;
        e.preventDefault();
        this._moveTo(options.length - 1, options, -1);
        return;
      default:
        return;
    }
  }

  /** Move `dir` steps from the active row, skipping disabled options. */
  _move(dir, options) {
    if (!options.length) return;
    let i = this._active;
    for (let step = 0; step < options.length; step++) {
      i = (i + dir + options.length) % options.length;
      if (!options[i].disabled) {
        this._active = i;
        this._syncActive();
        return;
      }
    }
  }

  /** Jump to `index`, then skip on in `dir` if it landed on a disabled row. */
  _moveTo(index, options, dir) {
    if (!options.length) return;
    let i = Math.max(0, Math.min(options.length - 1, index));
    for (let step = 0; step < options.length; step++) {
      if (!options[i].disabled) {
        this._active = i;
        this._syncActive();
        return;
      }
      i = (i + dir + options.length) % options.length;
    }
  }

  /* --- committing ------------------------------------------------------- */

  /** A suggestion was chosen: its label goes in the field, its value on us. */
  _choose(value) {
    if (value == null) return;
    const option = this._options().find((o) => o.value === value);
    const label = option ? option.label : value;
    this._text = label;
    const input = this.$("input");
    if (input) input.value = label;
    this._setValue(value, label);
    this._close();
    input?.focus();
  }

  /**
   * Enter or blur on free text: the text is both the value and the label.
   * A no-op when the field still reads as the committed value — which is the
   * case straight after choosing a suggestion, so blurring afterwards must not
   * overwrite the chosen value with its own label.
   */
  _commitText() {
    const text = this._fieldText();
    this._close();
    if (text === this._labelForValue()) return;
    this._setValue(text, text);
  }

  /** Escape on a closed listbox empties the field, as on a native search box. */
  _clear() {
    const input = this.$("input");
    if (input) input.value = "";
    if (this.attr("value")) this._setValue("", "");
    else this._label = "";
    // Through the normal typing path, so the host is told the query is empty.
    this._onInput("");
  }

  _setValue(value, label) {
    this._label = label;
    this._reflecting = true;
    this.setAttribute("value", value);
    this._reflecting = false;
    this._internals?.setFormValue(value);
    this.emit("change", { value, label });
  }

  /** A pointerdown on a row prevents this, so blur means focus really left. */
  _onBlur() {
    this._commitText();
  }

  /* --- properties ------------------------------------------------------- */

  /** @returns {string} the committed value. */
  get value() {
    return this.attr("value");
  }

  set value(v) {
    this.setAttribute("value", String(v ?? ""));
  }

  /** @returns {string} the field's current text, typed or not yet committed. */
  get text() {
    return this._fieldText();
  }

  /** @returns {{ value: string, label: string, description: string, disabled: boolean }[]} */
  get options() {
    return this._options();
  }

  set options(list) {
    this.setAttribute("options", JSON.stringify(list ?? []));
  }

  /** @returns {boolean} whether the host is fetching suggestions. */
  get loading() {
    return this.hasFlag("loading");
  }

  set loading(on) {
    if (on) this.setAttribute("loading", "");
    else this.removeAttribute("loading");
  }
}

/** The option at `index`, unless disabled — the keyboard must not choose one. */
function enabledAt(options, index) {
  const option = options[index];
  return option && !option.disabled ? option : null;
}

/** Accept `{ value, label, description?, disabled? }` and a bare string alike. */
function normalise(o) {
  if (typeof o === "string") {
    return { value: o, label: o, description: "", disabled: false };
  }
  return {
    value: String(o.value ?? o.id ?? ""),
    label: String(o.label ?? o.value ?? o.id ?? ""),
    description: String(o.description ?? ""),
    disabled: Boolean(o.disabled),
  };
}

define("ga-combobox", GaCombobox);
