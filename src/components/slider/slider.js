import { GaElement, define, esc } from "../../core/base-element.js";

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
  static formAssociated = true;
  static observed = [
    "min", "max", "step", "value", "label",
    "label-start", "label-end", "hide-value", "disabled",
  ];

  static styles = /* css */ `
    :host { display: block; }
    .wrap { display: flex; flex-direction: column; gap: 8px; }
    :host([disabled]) .wrap { opacity: 0.5; pointer-events: none; }
    .top { display: flex; align-items: baseline; justify-content: space-between; }
    .label { font-size: var(--ga-fs-sm, 14px); font-weight: 500; color: var(--ga-fg, #ededed); }
    .val { font-family: var(--ga-font-mono, ui-monospace, monospace); font-size: var(--ga-fs-sm, 14px); color: var(--ga-muted, #878787); }

    input[type="range"] {
      -webkit-appearance: none; appearance: none;
      width: 100%; height: 6px; margin: 6px 0;
      border-radius: var(--ga-radius-full, 9999px);
      background: var(--ga-bg-elev-hover, #1f1f1f);
      accent-color: var(--ga-accent, #54a2ff);
      cursor: pointer; outline: none;
    }
    input[type="range"]:focus-visible { box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff); }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; appearance: none;
      width: 18px; height: 18px; border-radius: 50%;
      background: var(--ga-accent, #54a2ff);
      border: 2px solid var(--ga-bg, #000);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
      cursor: pointer;
    }
    input[type="range"]::-moz-range-thumb {
      width: 16px; height: 16px; border: 2px solid var(--ga-bg, #000); border-radius: 50%;
      background: var(--ga-accent, #54a2ff); cursor: pointer;
    }
    input[type="range"]::-moz-range-track { height: 6px; border-radius: 9999px; background: var(--ga-bg-elev-hover, #1f1f1f); }

    /* End labels — rendered only when label-start / label-end are set, so
       the row does not exist (and costs no vertical space) otherwise. The two
       ends are pushed apart rather than centred under the thumb: they name the
       extremes of the range, not the current value. */
    .ends {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--ga-space-3, 12px);
      font-size: var(--ga-fs-xs, 12px);
      color: var(--ga-muted, #878787);
    }
    .ends span { min-width: 0; }
    .ends .to-end { text-align: right; }
  `;

  constructor() {
    super();
    this._internals = this.attachInternals?.();
  }

  template() {
    const label = this.attr("label");
    const value = this.attr("value", "50");
    const start = this.attr("label-start");
    const end = this.attr("label-end");
    // `hide-value` only removes the printed readout: the native range input
    // still exposes its value to assistive technology and to input/change.
    const readout = this.hasFlag("hide-value")
      ? ""
      : `<span class="val">${esc(value)}</span>`;
    // Appended without a line of its own so a slider using neither end label
    // produces exactly the markup it did before they existed.
    const ends =
      start || end
        ? `\n        <div class="ends"><span>${esc(start)}</span><span class="to-end">${esc(end)}</span></div>`
        : "";
    return /* html */ `
      <div class="wrap">
        ${label ? `<div class="top"><span class="label">${esc(label)}</span>${readout}</div>` : ""}
        <input type="range"
          min="${esc(this.attr("min", "0"))}"
          max="${esc(this.attr("max", "100"))}"
          step="${esc(this.attr("step", "1"))}"
          value="${esc(value)}"
          ${this.hasFlag("disabled") ? "disabled" : ""} />${ends}
      </div>
    `;
  }

  render() {
    super.render();
    const input = this.$("input");
    const val = this.$(".val");
    if (!input) return;
    this._internals?.setFormValue(input.value);
    input.addEventListener("input", () => {
      // Update the readout in place — do NOT re-render (would interrupt drag).
      this._value = input.value;
      if (val) val.textContent = input.value;
      this._internals?.setFormValue(input.value);
      this.emit("input", { value: input.value });
    });
    input.addEventListener("change", () => this.emit("change", { value: input.value }));
  }

  get value() { return this.$("input")?.value ?? this._value ?? this.attr("value"); }
  set value(v) { this._value = v; this.setAttribute("value", v); }
}

define("ga-slider", GaSlider);
