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

interface GaSelectAttrs extends GaAttrs {
  /** JSON: `{ value, label, disabled? }[]`; falls back to slotted `<option>` children. */
  options?: string;
  /**
   * Selected value; comma-joined when `multiple`. The join is lossy, so a value
   * that itself contains a comma must be set through the `.value` property.
   */
  value?: string;
  /** Toggle rows without closing; the trigger summarises as "N selected". */
  multiple?: Bool;
  /** Show a filter field in the popup. */
  filterable?: Bool;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  name?: string;
  disabled?: Bool;
  required?: Bool;
}

interface GaCalendarAttrs extends GaAttrs {
  /** Selected date, as `YYYY-MM-DD`. */
  value?: string;
  /** The month on display, as `YYYY-MM`; defaults to `value`'s month. */
  month?: string;
  /** Passed to `Intl` for month and weekday names. */
  locale?: string;
  /** `0` = Sunday … `6` = Saturday. Default `1` (Monday). */
  "first-day"?: Numish;
  /** Selectable range, as `YYYY-MM-DD`; days outside it are disabled. */
  min?: string;
  max?: string;
  disabled?: Bool;
}

interface GaDateInputAttrs extends GaAttrs {
  /** The date, and what the form submits: always `YYYY-MM-DD`. */
  value?: string;
  label?: string;
  /** Defaults to the locale's own numeric pattern. */
  placeholder?: string;
  hint?: string;
  error?: string;
  name?: string;
  /** Passed through to the calendar. */
  locale?: string;
  /** Accepted range, as `YYYY-MM-DD`; outside it the field errors and keeps the old value. */
  min?: string;
  max?: string;
  /** Passed through to the calendar. `0` = Sunday … `6` = Saturday. */
  "first-day"?: Numish;
  disabled?: Bool;
  required?: Bool;
}

interface GaChartFrameAttrs extends GaAttrs {
  /** Caption above the plot. */
  title?: string;
  /** JSON: `{ label, color? }[]`; swatches take `--ga-chart-1…8` in series order. */
  legend?: string;
  /** CSS length — the minimum plot height. Default `180px`. */
  height?: string;
  /** Message for the empty state. Default `"No data"`. */
  "empty-text"?: string;
  loading?: Bool;
  empty?: Bool;
}

interface GaChatMessageAttrs extends GaAttrs {
  /**
   * Speaker — picks the alignment and treatment.
   *
   * BREAKING since v0.3.0: this attribute was spelled `role`, which collided
   * with the global ARIA `role`. The values are unchanged; only the name moved.
   */
  from?: "user" | "assistant" | "system";
  /** Whether the turn is settled. Default `"sent"`. */
  state?: "sent" | "pending" | "streaming" | "error";
  author?: string;
  time?: string;
}

interface GaChatAttrs extends GaAttrs {
  /** CSS length for the scrolling transcript. Default `360px`. */
  height?: string;
  /** Shown when there are no messages. */
  "empty-text"?: string;
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

interface GaTooltipAttrs extends GaAttrs {
  /** The label. Omit it to adopt the trigger's `title`. */
  text?: string;
  /** Preferred side; flips to the opposite one when there is no room. */
  placement?: "top" | "bottom" | "left" | "right";
  /** Hover show delay in ms (default 300). Focus is never delayed. */
  delay?: Numish;
}

interface GaStepListAttrs extends GaAttrs {
  /** JSON: `{ id, label, meta?, status?, badge? }[]`. */
  steps?: string;
  /** Id of the step that is playing (`aria-current="step"`). */
  current?: string;
  /** Id of the step the reader chose (`aria-pressed`, reflected). */
  selected?: string;
  /** Accessible name for the list (default "Steps"). */
  label?: string;
}

interface GaScrubberAttrs extends GaAttrs {
  /** Total length in ms; defaults to the end of the last segment. */
  duration?: Numish;
  /** Playhead, in ms. */
  position?: Numish;
  /** JSON: `{ id?, start, duration, status?, label? }[]` — all times in ms. */
  segments?: string;
  /** Ms per arrow key (default: 1% of the duration). */
  step?: Numish;
  /** Accessible name (default "Timeline"). */
  label?: string;
  disabled?: Bool;
}

interface GaCommentAttrs extends GaAttrs {
  author?: string;
  /** Human-readable timestamp, e.g. "2h ago". */
  time?: string;
  /** Machine-readable timestamp; defaults to `time`. */
  datetime?: string;
  /** What the comment is attached to. */
  anchor?: string;
  resolved?: Bool;
  /** Hide the resolve toggle — for a reply rather than a thread head. */
  "no-resolve"?: Bool;
}

interface GaCommentThreadAttrs extends GaAttrs {
  /** What a new comment will attach to (drives the composer's target line). */
  anchor?: string;
  /** Accessible name for the list (default "Comments"). */
  label?: string;
  "empty-text"?: string;
  placeholder?: string;
  /** Composer button text (default "Comment"). */
  "submit-label"?: string;
  /** A message from the host, shown under the composer. */
  error?: string;
  /** A submission is in flight; the composer locks. */
  busy?: Bool;
  /** CSS length; when set, the list scrolls inside it. */
  height?: string;
}

interface GaSplitterAttrs extends GaAttrs {
  /** Current position (default 50). */
  value?: Numish;
  min?: Numish;
  max?: Numish;
  /** Arrow-key increment (default 1); Page keys move 10 steps. */
  step?: Numish;
  /** CSS unit written with the value (default `%`; `px` also works). */
  unit?: string;
  orientation?: "vertical" | "horizontal";
  /** Custom property to write (default `--ga-split`). */
  property?: string;
  /** Where to write it. */
  scope?: "parent" | "root";
  /** Accessible name (default "Resize panels"). */
  label?: string;
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
      "ga-tooltip": GaTooltipAttrs;
      "ga-step-list": GaStepListAttrs;
      "ga-scrubber": GaScrubberAttrs;
      "ga-comment": GaCommentAttrs;
      "ga-comment-thread": GaCommentThreadAttrs;
      "ga-splitter": GaSplitterAttrs;
    }
  }
}

export {};
