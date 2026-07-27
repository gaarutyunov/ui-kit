/* =========================================================================
   popup — anchor a panel to a trigger.

   Internal plumbing shared by `ga-select` and `ga-date-input` (and, later,
   `ga-combobox`). NOT exported from index.js: it is not part of the kit's
   public surface, and nothing outside the kit should depend on its shape.

   Two things make an anchored panel hard, and this handles both:

     - **Clipping.** A panel inside a scroll container or a card with
       `overflow: hidden` gets cut off. The native Popover API solves it by
       promoting the panel to the *top layer*, above everything, ignoring
       ancestor overflow and z-index entirely. `popover="manual"` (rather than
       "auto") because dismissal is ours to drive: "auto" light-dismisses on
       any outside pointerdown, which would fight the trigger's own click.
     - **Position.** The top layer is positioned relative to the viewport, so
       the panel is `position: fixed` and placed from the anchor's
       `getBoundingClientRect()`, flipping to the opposite side of the anchor
       when the preferred one has no room and the other has more.

   Placement is on one axis at a time: `bottom`/`top` flip vertically (the
   dropdown case), `left`/`right` flip horizontally (the tooltip case). The
   default is `bottom`, and its arithmetic is unchanged from the version that
   shipped with `ga-select` and `ga-date-input` — those two must keep flipping
   exactly as before, so the vertical branch below is the original code with
   the preferred side made a parameter rather than a constant.

   `minWidth = anchor width` is likewise opt-out rather than removed: matching
   the field is right for a dropdown and wrong for a six-word label hanging off
   a 40px icon button, so consumers that want their own size pass
   `matchWidth: false` and everything that shipped before keeps the old
   behaviour by saying nothing.

   Where `popover` is unsupported (Safari < 17, Firefox < 125), the panel falls
   back to `position: absolute` inside the host. It then *can* be clipped by an
   overflowing ancestor — the trade-off is accepted rather than hidden, because
   the alternative (reparenting the panel to <body>) breaks Shadow DOM styling
   and event retargeting.
   ========================================================================= */

/** Whether this browser has the Popover API. */
export const SUPPORTS_POPOVER =
  typeof HTMLElement !== "undefined" &&
  Object.prototype.hasOwnProperty.call(HTMLElement.prototype, "popover");

/** Gap between the anchor and the panel, in px. */
const OFFSET = 4;

/** The side a placement flips to when its preferred side has no room. */
const OPPOSITE = { bottom: "top", top: "bottom", left: "right", right: "left" };

/**
 * Anchor `panel` to `anchor`.
 *
 * @param {HTMLElement} anchor  the trigger the panel hangs off
 * @param {HTMLElement} panel   the panel element, inside the same shadow root
 * @param {{
 *   onDismiss?: (reason: string) => void,
 *   placement?: "bottom" | "top" | "left" | "right",
 *   matchWidth?: boolean,
 * }} [opts]
 *   `onDismiss` runs when the popup closes for a reason that is not an explicit
 *   `close()` — an outside click, Escape, or the anchor scrolling out of view.
 *   The caller decides what that means (restore focus, commit a value, …).
 *
 *   `placement` is the *preferred* side; the popup flips to the opposite one
 *   when that side cannot hold the panel and the other has more room. Defaults
 *   to `"bottom"`, which is what every consumer written before this option
 *   existed gets.
 *
 *   `matchWidth` forces `min-width` to the anchor's width. Defaults to `true`
 *   — again the pre-existing behaviour. Pass `false` for a panel that should
 *   size to its own content.
 */
export function createPopup(anchor, panel, opts = {}) {
  let open = false;
  const onDismiss = opts.onDismiss || (() => {});
  const placement = Object.prototype.hasOwnProperty.call(OPPOSITE, opts.placement)
    ? /** @type {"bottom" | "top" | "left" | "right"} */ (opts.placement)
    : "bottom";
  const sideways = placement === "left" || placement === "right";
  const matchWidth = opts.matchWidth !== false;

  if (SUPPORTS_POPOVER) panel.setAttribute("popover", "manual");

  function position() {
    const rect = anchor.getBoundingClientRect();
    const panelHeight = panel.offsetHeight || 0;

    if (matchWidth) panel.style.minWidth = `${rect.width}px`;
    if (sideways) positionSideways(rect, panelHeight);
    else positionVertically(rect, panelHeight);
  }

  /** Below or above the anchor — the dropdown geometry, unchanged. */
  function positionVertically(rect, panelHeight) {
    const below = window.innerHeight - rect.bottom;
    // Flip only when the preferred side genuinely cannot hold the panel *and*
    // the other has more room — otherwise a panel near the bottom of a tall
    // viewport would flip for no reason.
    const flip =
      placement === "top"
        ? rect.top < panelHeight + OFFSET && below > rect.top
        : below < panelHeight + OFFSET && rect.top > below;
    const side = flip ? OPPOSITE[placement] : placement;
    const above = side === "top";

    if (SUPPORTS_POPOVER) {
      panel.style.position = "fixed";
      panel.style.left = `${rect.left}px`;
      panel.style.top = above ? "auto" : `${rect.bottom + OFFSET}px`;
      panel.style.bottom = above ? `${window.innerHeight - rect.top + OFFSET}px` : "auto";
      panel.style.margin = "0";
    } else {
      // Absolute inside the host, which the component styles as the
      // positioning context.
      panel.style.position = "absolute";
      panel.style.left = "0";
      panel.style.top = above ? "auto" : "100%";
      panel.style.bottom = above ? "100%" : "auto";
      panel.style.marginTop = above ? "0" : `${OFFSET}px`;
      panel.style.marginBottom = above ? `${OFFSET}px` : "0";
    }
    panel.dataset.placement = side;
  }

  /** Beside the anchor, centred on its midline — the tooltip geometry. */
  function positionSideways(rect, panelHeight) {
    const panelWidth = panel.offsetWidth || 0;
    const rightRoom = window.innerWidth - rect.right;
    const flip =
      placement === "left"
        ? rect.left < panelWidth + OFFSET && rightRoom > rect.left
        : rightRoom < panelWidth + OFFSET && rect.left > rightRoom;
    const side = flip ? OPPOSITE[placement] : placement;
    const before = side === "left";

    if (SUPPORTS_POPOVER) {
      // Centre on the anchor's midline, then clamp into the viewport so a tall
      // panel beside a control near the top or bottom edge is not cut off.
      const raw = rect.top + rect.height / 2 - panelHeight / 2;
      const top = Math.max(
        OFFSET,
        Math.min(raw, window.innerHeight - panelHeight - OFFSET)
      );
      panel.style.position = "fixed";
      panel.style.top = `${top}px`;
      panel.style.bottom = "auto";
      panel.style.left = before ? "auto" : `${rect.right + OFFSET}px`;
      panel.style.right = before ? `${window.innerWidth - rect.left + OFFSET}px` : "auto";
      panel.style.margin = "0";
    } else {
      panel.style.position = "absolute";
      panel.style.top = "50%";
      panel.style.bottom = "auto";
      // A negative margin rather than translateY(-50%): a transform here would
      // overwrite whatever entry animation the consumer put on the panel.
      panel.style.marginTop = `${-panelHeight / 2}px`;
      panel.style.marginBottom = "0";
      panel.style.left = before ? "auto" : "100%";
      panel.style.right = before ? "100%" : "auto";
      panel.style.marginLeft = before ? "0" : `${OFFSET}px`;
      panel.style.marginRight = before ? `${OFFSET}px` : "0";
    }
    panel.dataset.placement = side;
  }

  function onDocumentPointerDown(e) {
    // composedPath sees through the shadow boundary, so a click on the panel
    // or the anchor is recognised even though both live in a shadow root.
    const path = e.composedPath();
    if (path.includes(panel) || path.includes(anchor)) return;
    dismiss("outside");
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      e.stopPropagation();
      dismiss("escape");
    }
  }

  function onViewportChange() {
    const rect = anchor.getBoundingClientRect();
    const visible =
      rect.bottom > 0 &&
      rect.top < window.innerHeight &&
      rect.right > 0 &&
      rect.left < window.innerWidth;
    if (!visible) {
      dismiss("scroll");
      return;
    }
    position();
  }

  function listen(on) {
    const fn = on ? "addEventListener" : "removeEventListener";
    // Capture, so the panel closes before a click reaches an app handler.
    document[fn]("pointerdown", onDocumentPointerDown, true);
    document[fn]("keydown", onKeyDown, true);
    // Capture again for scroll: scroll does not bubble from inner containers.
    window[fn]("scroll", onViewportChange, true);
    window[fn]("resize", onViewportChange);
  }

  function show() {
    if (open) return;
    open = true;
    panel.hidden = false;
    if (SUPPORTS_POPOVER) {
      try {
        panel.showPopover();
      } catch {
        // Already open, or the panel is disconnected. Neither is fatal.
      }
    }
    position();
    listen(true);
  }

  function close() {
    if (!open) return;
    open = false;
    listen(false);
    if (SUPPORTS_POPOVER) {
      try {
        panel.hidePopover();
      } catch {
        /* already closed */
      }
    }
    panel.hidden = true;
  }

  function dismiss(reason) {
    close();
    onDismiss(reason);
  }

  return {
    show,
    close,
    reposition: position,
    get open() {
      return open;
    },
    /** Release listeners without invoking onDismiss — for disconnection. */
    destroy() {
      if (open) close();
    },
  };
}
