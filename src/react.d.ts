/* =========================================================================
   `@gaarutyunov/ui-kit/react` — opt-in React JSX types.

   Reference this entry (once, anywhere in your app) to teach React's JSX about
   every `ga-*` element and its documented attributes:

     import "@gaarutyunov/ui-kit/react";
     // or, without emitting a runtime import:
     /// <reference types="@gaarutyunov/ui-kit/react" />

   It augments `React.JSX.IntrinsicElements`, so `<ga-card>`, `<ga-button>` …
   type-check with their attributes. This file is intentionally SEPARATE from
   the main entry so vanilla / Vue / Svelte / Solid users are unaffected.

   Boolean attributes accept `"" | boolean` (write `<ga-button loading>` or
   `loading="">`). Every element also accepts the standard React HTML props
   (className, style, ref, key, on* handlers, children).
   ========================================================================= */

// NOTE: this MUST be a value namespace import, not `import type`. A type-only
// import is elided, which detaches the `declare module "react"` augmentation
// below so it never applies when this entry is imported. Keeping a real import
// binding is what lets `import "@gaarutyunov/ui-kit/react"` register the JSX
// types in a consumer's project.
import * as React from "react";

type GaAttrs = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
/** HTML boolean attribute: present (`""`/`true`) or absent (`false`). */
type Bool = "" | boolean;
/** Attributes that are numeric but serialise to strings in HTML. */
type Numish = string | number;

interface GaButtonAttrs extends GaAttrs {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** `"icon"` is a square, glyph-only button — it requires `aria-label` or `title`. */
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
  download?: string | Bool;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  name?: string;
  disabled?: Bool;
  loading?: Bool;
  block?: Bool;
}

interface GaRadioGroupAttrs extends GaAttrs {
  /** JSON: `{ id, label, href? }[]`. */
  items?: string;
  /** Selected item id (reflected). */
  value?: string;
}

interface GaCodeAttrs extends GaAttrs {
  /** Leading glyph, e.g. `"$"`. */
  prompt?: string;
  /** Render as an external link (↗) instead of a copy button. */
  href?: string;
  target?: string;
  rel?: string;
}

interface GaBreadcrumbsAttrs extends GaAttrs {
  /** JSON: `{ label, href? }[]`; the last item is the current page. */
  items?: string;
}

interface GaTableAttrs extends GaAttrs {
  /** JSON: `{ label, align?, width?, mono? }[]`. */
  columns?: string;
}

interface GaBadgeAttrs extends GaAttrs {
  color?: "default" | "blue" | "green" | "amber" | "purple" | "red";
  solid?: Bool;
  size?: "md" | "sm";
}

interface GaCardAttrs extends GaAttrs {
  interactive?: Bool;
  href?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

interface GaAvatarAttrs extends GaAttrs {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  square?: Bool;
}

interface GaInputAttrs extends GaAttrs {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  name?: string;
  hint?: string;
  error?: string;
  required?: Bool;
  disabled?: Bool;
  readonly?: Bool;
}

interface GaSwitchAttrs extends GaAttrs {
  checked?: Bool;
  disabled?: Bool;
  label?: string;
}

interface GaSpinnerAttrs extends GaAttrs {
  size?: "sm" | "md" | "lg";
  color?: "" | "green" | "amber" | "purple" | "red" | "fg";
}

interface GaAlertAttrs extends GaAttrs {
  tone?: "info" | "success" | "warning" | "danger" | "neutral";
  title?: string;
  dismissible?: Bool;
}

interface GaTabsAttrs extends GaAttrs {
  /** JSON: `{ id, label }[]`. */
  tabs?: string;
  /** Active tab id (reflected). */
  active?: string;
}

interface GaNoteAttrs extends GaAttrs {
  tone?: "info" | "success" | "warning" | "error" | "neutral";
  title?: string;
}

interface GaSliderAttrs extends GaAttrs {
  min?: Numish;
  max?: Numish;
  step?: Numish;
  value?: Numish;
  label?: string;
  "label-start"?: string;
  "label-end"?: string;
  "hide-value"?: Bool;
  disabled?: Bool;
}

interface GaFileDropAttrs extends GaAttrs {
  accept?: string;
  multiple?: Bool;
  label?: string;
}

interface GaFabAttrs extends GaAttrs {
  color?: "" | "green" | "amber" | "purple" | "red";
  position?: "bottom-right" | "bottom-left" | "static";
  label?: string;
}

interface GaPanelAttrs extends GaAttrs {
  open?: Bool;
  side?: "right" | "left";
  title?: string;
  /** Float above page content at `--ga-z-overlay` instead of acting as a drawer. */
  overlay?: Bool;
  /** Confine Tab to the panel while open. OFF by default. */
  "trap-focus"?: Bool;
}

interface GaHeaderAttrs extends GaAttrs {
  brand?: string;
  href?: string;
  static?: Bool;
}

interface GaBottomNavAttrs extends GaAttrs {
  /** JSON: `{ id, label, icon }[]`. */
  items?: string;
  active?: string;
  static?: Bool;
}

interface GaBottomSheetAttrs extends GaAttrs {
  open?: Bool;
  snap?: "peek" | "half" | "full";
  /** Paint at `--ga-z-overlay` with a blurred backdrop, over an app's own canvas. */
  overlay?: Bool;
  /** The sheet is modal and traps focus by default; `"false"` opts out. */
  "trap-focus"?: "false" | "true";
}

interface GaKbdAttrs extends GaAttrs {}

interface GaIconAttrs extends GaAttrs {
  name?: string;
  size?: Numish;
}

interface GaCheckboxAttrs extends GaAttrs {
  checked?: Bool;
  /** The "select all" state over a partial selection; wins over `checked` visually. */
  indeterminate?: Bool;
  disabled?: Bool;
  label?: string;
  name?: string;
  /** Submitted when checked; defaults to `"on"` as in the native control. */
  value?: string;
}

interface GaFileButtonAttrs extends GaAttrs {
  accept?: string;
  multiple?: Bool;
  label?: string;
}

interface GaQuantityAttrs extends GaAttrs {
  value?: Numish;
  unit?: string;
  placeholder?: string;
}

interface GaMetricAttrs extends GaAttrs {
  label?: string;
  value?: Numish;
  unit?: string;
  placeholder?: string;
  tone?: "neutral" | "accent" | "ok" | "warn" | "error";
  /** The lead readout: a larger scale, still aligned with its neighbours. */
  primary?: Bool;
}

interface GaStatusAttrs extends GaAttrs {
  tone?: "neutral" | "ok" | "error";
  /** Convenience for setting the message without touching light DOM. */
  text?: string;
}

interface GaComboboxAttrs extends GaAttrs {
  /** JSON `{ value, label, description?, disabled? }[]` — supplied by the host, never filtered locally. */
  options?: string;
  /** The committed value: a chosen suggestion's `value`, or the typed text. */
  value?: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  name?: string;
  /** Milliseconds of quiet before `filter` fires. Default `200`. */
  debounce?: Numish;
  "no-results-text"?: string;
  "loading-text"?: string;
  /** Set while fetching, so the list says "Searching…" instead of "No results". */
  loading?: Bool;
  disabled?: Bool;
  required?: Bool;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ga-button": GaButtonAttrs;
      "ga-radio-group": GaRadioGroupAttrs;
      "ga-code": GaCodeAttrs;
      "ga-breadcrumbs": GaBreadcrumbsAttrs;
      "ga-table": GaTableAttrs;
      "ga-badge": GaBadgeAttrs;
      "ga-card": GaCardAttrs;
      "ga-avatar": GaAvatarAttrs;
      "ga-input": GaInputAttrs;
      "ga-switch": GaSwitchAttrs;
      "ga-spinner": GaSpinnerAttrs;
      "ga-alert": GaAlertAttrs;
      "ga-kbd": GaKbdAttrs;
      "ga-tabs": GaTabsAttrs;
      "ga-note": GaNoteAttrs;
      "ga-slider": GaSliderAttrs;
      "ga-file-drop": GaFileDropAttrs;
      "ga-fab": GaFabAttrs;
      "ga-panel": GaPanelAttrs;
      "ga-header": GaHeaderAttrs;
      "ga-bottom-nav": GaBottomNavAttrs;
      "ga-bottom-sheet": GaBottomSheetAttrs;
      "ga-icon": GaIconAttrs;
      "ga-select": GaSelectAttrs;
      "ga-calendar": GaCalendarAttrs;
      "ga-date-input": GaDateInputAttrs;
      "ga-chart-frame": GaChartFrameAttrs;
      "ga-chat-message": GaChatMessageAttrs;
      "ga-chat": GaChatAttrs;
      "ga-checkbox": GaCheckboxAttrs;
      "ga-file-button": GaFileButtonAttrs;
      "ga-quantity": GaQuantityAttrs;
      "ga-metric": GaMetricAttrs;
      "ga-status": GaStatusAttrs;
      "ga-combobox": GaComboboxAttrs;
    }
  }
}

export {};
