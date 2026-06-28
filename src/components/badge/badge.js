import { GaElement, define } from "../../core/base-element.js";

/**
 * `<ga-badge>` — a small status / category label.
 *
 * Attributes:
 *   color  "default" | "blue" | "green" | "amber" | "purple" | "red"
 *   solid  boolean — filled instead of subtle
 *   size   "sm" | "md"
 *
 * Slot: default (text).
 */
export class GaBadge extends GaElement {
  static observed = ["color", "solid", "size"];

  static styles = /* css */ `
    :host { display: inline-block; }
    .badge {
      --_c: var(--ga-muted, #878787);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--ga-font-mono, ui-monospace, monospace);
      font-size: var(--ga-fs-xs, 12px);
      font-weight: 500;
      line-height: 1;
      letter-spacing: 0.01em;
      padding: 4px 8px;
      border-radius: var(--ga-radius-full, 9999px);
      border: 1px solid color-mix(in srgb, var(--_c) 35%, transparent);
      color: var(--_c);
      background: color-mix(in srgb, var(--_c) 12%, transparent);
      white-space: nowrap;
    }
    :host([size="sm"]) .badge { font-size: 10px; padding: 2px 6px; }

    :host([color="blue"])   .badge { --_c: var(--ga-blue, #54a2ff); }
    :host([color="green"])  .badge { --_c: var(--ga-green, #00c758); }
    :host([color="amber"])  .badge { --_c: var(--ga-amber, #fcbb00); }
    :host([color="purple"]) .badge { --_c: var(--ga-purple, #ac4bff); }
    :host([color="red"])    .badge { --_c: var(--ga-red, #ff6568); }

    :host([solid]) .badge {
      background: var(--_c);
      color: var(--ga-accent-contrast, #000);
      border-color: var(--_c);
    }
  `;

  template() {
    return /* html */ `<span class="badge" part="badge"><slot></slot></span>`;
  }
}

define("ga-badge", GaBadge);
