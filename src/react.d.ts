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
  size?: "sm" | "md" | "lg";
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
}

interface GaKbdAttrs extends GaAttrs {}

interface GaIconAttrs extends GaAttrs {
  name?: string;
  size?: Numish;
}

interface GaSelectAttrs extends GaAttrs {
  /** JSON: `{ value, label, disabled? }[]`. Falls back to slotted `<option>`s. */
  options?: string;
  /** Selected value; comma-separated when `multiple`. */
  value?: string;
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
  /** Selected date as `YYYY-MM-DD` — never a `Date`. */
  value?: string;
  /** The month on display, as `YYYY-MM`. */
  month?: string;
  locale?: string;
  /** 0 = Sunday … 6 = Saturday. Default 1 (Monday). */
  "first-day"?: Numish;
  /** `YYYY-MM-DD`. */
  min?: string;
  /** `YYYY-MM-DD`. */
  max?: string;
  disabled?: Bool;
}

interface GaDateInputAttrs extends GaAttrs {
  /** `YYYY-MM-DD` — and what the form submits. */
  value?: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  name?: string;
  locale?: string;
  /** `YYYY-MM-DD`. */
  min?: string;
  /** `YYYY-MM-DD`. */
  max?: string;
  /** 0 = Sunday … 6 = Saturday. Passed through to the calendar. */
  "first-day"?: Numish;
  disabled?: Bool;
  required?: Bool;
}

interface GaChartFrameAttrs extends GaAttrs {
  title?: string;
  /** JSON: `{ label, color? }[]`. Swatches take `--ga-chart-1…8` in order. */
  legend?: string;
  /** CSS length — minimum plot height. */
  height?: string;
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
  state?: "sent" | "pending" | "streaming" | "error";
  author?: string;
  time?: string;
}

interface GaChatAttrs extends GaAttrs {
  "empty-text"?: string;
  /** CSS length for the scrolling transcript. */
  height?: string;
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
