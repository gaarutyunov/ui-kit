import { GaElement, define, esc } from "../../core/base-element.js";
import { createPopup } from "../../core/popup.js";

/**
 * `<ga-tooltip>` — a styled label that appears beside its trigger.
 *
 * Wraps the thing it describes, and takes its geometry from the shared
 * `core/popup.js` primitive rather than growing a second positioner: top
 * layer, viewport-rect placement, flip when there is no room, and dismissal on
 * Escape / outside pointerdown / the anchor scrolling away. It opts out of the
 * primitive's `min-width: anchor width`, because a tooltip is sized by its own
 * words, not by the 40px button it hangs off.
 *
 *   <ga-tooltip text="Delete run">
 *     <ga-button aria-label="Delete run">…</ga-button>
 *   </ga-tooltip>
 *
 * **It opens on hover *and* on focus.** A hover-only tooltip does not exist for
 * a keyboard user, so `focusin` shows it with no delay (the user asked for this
 * control explicitly, and a delay reads as lag), while the pointer waits out
 * `delay` — a tooltip that fires while the pointer is merely crossing the
 * screen is noise. It hides on leave, on blur and on Escape; after Escape the
 * trigger keeps focus, so the user is not thrown back to the top of the page
 * for dismissing a hint.
 *
 * **It is never a tab stop.** The host carries no `tabindex` and the bubble is
 * a plain `<div>` with `pointer-events: none`, so tabbing moves between the
 * page's real controls and the pointer can still click straight through the
 * bubble to whatever is under it.
 *
 * ## Why a tooltip cannot supply the trigger's accessible name
 *
 * The tempting reading is that wrapping an unlabelled icon button in a tooltip
 * names it, and that `ga-button`'s missing-name warning should therefore learn
 * about tooltips. **It must not**, and the reason is structural rather than a
 * matter of taste:
 *
 *   - `aria-labelledby` and `aria-describedby` are **IDREFs**, and IDREFs are
 *     resolved within a single tree. They **do not cross a shadow root**.
 *   - This bubble lives in `<ga-tooltip>`'s shadow root; the trigger lives in
 *     the light DOM outside it. There is no id the trigger could point at.
 *   - Worse, `GaElement` attaches every shadow root with `delegatesFocus:
 *     true`, so for a kit component the element that actually takes focus — a
 *     `<button>` inside `ga-button`'s *own* shadow root — is a second boundary
 *     away. Even same-tree IDREFs would not reach it.
 *
 * So a tooltip is decoration. The accessible name still has to arrive on the
 * trigger itself, via `aria-label` or `title`. `ga-button`'s `_warnIfUnnamed()`
 * is deliberately left alone: an icon-only button wrapped in a tooltip and
 * given no name of its own **still warns**, and that warning is correct.
 *
 * ## What it does do: suppress the native tooltip without losing the name
 *
 * The one coupling worth having is the opposite one. A trigger carrying
 * `title` would show the browser's own tooltip alongside this one, so when no
 * `text` is given the tooltip **adopts the trigger's `title` and removes the
 * attribute**. Removing it naively would delete an accessible name, because
 * `title` is the last fallback of the name computation — so before removing
 * it, the value is promoted to `aria-label` on the trigger, which yields the
 * identical name string. The promotion happens **only** for an adopted
 * `title`, and only when the trigger has no `aria-label` / `aria-labelledby`
 * of its own; an explicit `text=` is never promoted, because that would be the
 * tooltip supplying the name, which is exactly what must not happen. Both
 * edits are reverted if the tooltip is disconnected.
 *
 * Attributes:
 *   text       the label. Omit it to adopt the trigger's `title`.
 *   placement  "top" (default) | "bottom" | "left" | "right" — preferred side;
 *              flips to the opposite one when there is no room.
 *   delay      hover show delay in ms (default 300). Focus is never delayed.
 *
 * Slots: default — the trigger.
 * Methods: show() / hide().
 * Events: `open`, `close`.
 *
 * CSS parts: `tip`. Custom property: `--ga-tooltip-max-width`.
 */
export class GaTooltip extends GaElement {
  static observed = ["text", "placement", "delay"];

  static styles = /* css */ `
    /* inline-block rather than contents: the host is the popup's anchor, so it
       needs a box, and it is the positioning context for the no-popover
       fallback. */
    :host { display: inline-block; position: relative; }

    .tip {
      position: fixed;
      z-index: var(--ga-z-overlay, 900);
      box-sizing: border-box;
      width: max-content;
      max-width: var(--ga-tooltip-max-width, 260px);
      /* Never swallow a click meant for what is underneath. */
      pointer-events: none;
      font-size: var(--ga-fs-xs, 12px);
      line-height: 1.4;
      color: var(--ga-fg, #ededed);
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius-sm, 4px);
      box-shadow: var(--ga-shadow, 0 8px 24px rgba(0, 0, 0, 0.5));
      padding: 6px 8px;
      margin: 0;
    }
    .tip[hidden] { display: none; }
    .tip:popover-open { display: block; }
    /* The top layer paints its own backdrop; we want none. */
    .tip::backdrop { background: transparent; }

    /* A keyframe rather than a transition off a toggled class: the animation
       replays every time the bubble re-enters the render tree, so the fade
       needs no extra frame of bookkeeping — and if it never runs at all (a
       throttled tab, a reduced-motion user) the resting state is already the
       visible one, so the tooltip can never be stuck at opacity 0. */
    @media (prefers-reduced-motion: no-preference) {
      .tip:not([hidden]) { animation: ga-tip-in var(--ga-transition, 0.18s ease); }
    }
    @keyframes ga-tip-in {
      from { opacity: 0; transform: translateY(2px); }
    }
  `;

  /* --- lifecycle -------------------------------------------------------- */

  connectedCallback() {
    super.connectedCallback();
    // Bound on the host, not on the slotted trigger: pointerenter/leave fire
    // for the whole subtree, and focusin/focusout bubble out of it (they are
    // composed, so focus landing inside ga-button's shadow root arrives here).
    this.addEventListener("pointerenter", this._onEnter);
    this.addEventListener("pointerleave", this._onLeave);
    this.addEventListener("focusin", this._onFocusIn);
    this.addEventListener("focusout", this._onFocusOut);
  }

  disconnectedCallback() {
    this.removeEventListener("pointerenter", this._onEnter);
    this.removeEventListener("pointerleave", this._onLeave);
    this.removeEventListener("focusin", this._onFocusIn);
    this.removeEventListener("focusout", this._onFocusOut);
    clearTimeout(this._timer);
    this._hovered = false;
    this._focused = false;
    this._visible = false;
    this._popup?.destroy();
    this._popup = null;
    this._restoreTitle();
  }

  render() {
    super.render();
    const tip = this.$(".tip");
    if (!tip) return;

    this._popup?.destroy();
    this._popup = createPopup(this, tip, {
      placement: this._placement(),
      // A tooltip is sized by its words; stretching it to the trigger would
      // make a one-word hint as wide as a full-width field.
      matchWidth: false,
      onDismiss: () => {
        // Escape / outside click / scroll-away. Drop both reasons the tooltip
        // was up: the pointer may still be over the trigger and the trigger
        // still holds focus, and re-showing under either would make the
        // dismissal look broken.
        this._hovered = false;
        this._focused = false;
        this._visible = false;
        this.emit("close");
      },
    });

    // Slotted content can arrive after the first render, so the title is
    // adopted again on every slotchange.
    this.$("slot")?.addEventListener("slotchange", () => this._syncText());
    this._syncText();
  }

  /* --- text and the trigger's title ------------------------------------- */

  /** The element the tooltip describes — the first slotted element, if any. */
  _trigger() {
    const slot = /** @type {HTMLSlotElement | null} */ (this.$("slot"));
    return /** @type {HTMLElement | undefined} */ (
      slot?.assignedElements({ flatten: true })[0]
    ) ?? null;
  }

  /** The label to show: an explicit `text`, else the adopted `title`. */
  _text() {
    return this.attr("text").trim() || this._adoptedTitle || "";
  }

  _placement() {
    const raw = this.attr("placement", "top");
    return ["top", "bottom", "left", "right"].includes(raw) ? raw : "top";
  }

  /** Hover show delay, in ms. Non-numeric or negative values fall back. */
  _delay() {
    const raw = this.getAttribute("delay");
    if (raw === null || raw.trim() === "") return 300;
    const ms = Number(raw);
    return Number.isFinite(ms) && ms >= 0 ? ms : 300;
  }

  /**
   * Adopt the trigger's `title` (so the native tooltip does not double up) and
   * paint the bubble. See the class JSDoc for why the value is promoted to
   * `aria-label` first, and why an explicit `text` never is.
   */
  _syncText() {
    const tip = this.$(".tip");
    if (!tip) return;

    if (!this.attr("text").trim() && !this._adopted) {
      const trigger = this._trigger();
      const title = trigger?.getAttribute("title");
      if (trigger && title) {
        const named =
          trigger.hasAttribute("aria-label") || trigger.hasAttribute("aria-labelledby");
        if (!named) trigger.setAttribute("aria-label", title);
        trigger.removeAttribute("title");
        this._adopted = { trigger, title, promoted: !named };
        this._adoptedTitle = title;
      }
    }
    tip.textContent = this._text();
  }

  /** Undo the adoption, so removing the tooltip does not strip the trigger. */
  _restoreTitle() {
    if (!this._adopted) return;
    const { trigger, title, promoted } = this._adopted;
    if (promoted && trigger.getAttribute("aria-label") === title) {
      trigger.removeAttribute("aria-label");
    }
    trigger.setAttribute("title", title);
    this._adopted = null;
    this._adoptedTitle = "";
  }

  /* --- open / close ----------------------------------------------------- */

  _onEnter = () => {
    this._hovered = true;
    this._sync();
  };

  _onLeave = () => {
    this._hovered = false;
    this._sync();
  };

  _onFocusIn = () => {
    this._focused = true;
    this._sync(true);
  };

  _onFocusOut = () => {
    this._focused = false;
    this._sync();
  };

  /** Reconcile the bubble with the two reasons it can be up. */
  _sync(immediate = false) {
    clearTimeout(this._timer);
    if (!this._hovered && !this._focused) {
      this.hide();
      return;
    }
    if (this._visible) return;
    const delay = immediate ? 0 : this._delay();
    if (delay === 0) this.show();
    else this._timer = setTimeout(() => this.show(), delay);
  }

  /** Show the tooltip now, regardless of pointer or focus. */
  show() {
    if (this._visible) return;
    // A tooltip with nothing to say stays down rather than flashing an empty box.
    if (!this.$(".tip") || !this._text()) return;
    this._visible = true;
    this._popup?.show();
    this.emit("open");
  }

  /** Hide the tooltip now. */
  hide() {
    clearTimeout(this._timer);
    if (!this._visible) return;
    this._visible = false;
    this._popup?.close();
    this.emit("close");
  }

  /** Whether the bubble is currently shown. */
  get open() {
    return !!this._visible;
  }

  template() {
    // role="tooltip" describes what the box is. It is deliberately not wired
    // to the trigger with aria-describedby — see the class JSDoc: the IDREF
    // cannot cross the shadow boundary, so the text reaches assistive
    // technology through the trigger's own name instead.
    return /* html */ `
      <slot></slot>
      <div class="tip" part="tip" role="tooltip" hidden>${esc(this.attr("text"))}</div>
    `;
  }
}

define("ga-tooltip", GaTooltip);
