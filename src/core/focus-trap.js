/* =========================================================================
   FocusTrap — keyboard containment for the kit's overlays.

   This lives in core rather than inside either overlay because `<ga-panel
   overlay>` and `<ga-bottom-sheet>` need the identical mechanism with
   *opposite* defaults: the panel traps only when asked (it is a persistent
   control surface and must not hold the keyboard), the sheet traps unless told
   not to (it covers the content beneath it). Sharing the mechanism keeps that
   difference a one-line policy in each component instead of two
   implementations that drift.

   Shadow DOM makes this harder than the usual recipe. An overlay's focusable
   elements are split between its own shadow root (the close button) and the
   light DOM it slots in, and kit components expose no focusable element of
   their own — they delegate focus into their shadow root. So we walk the
   shadow tree in rendering order, splice each <slot>'s assigned elements in
   where they actually appear, and treat any element whose shadow root
   delegates focus as a single stop.
   ========================================================================= */

/** Natively focusable shapes. `[tabindex]` is filtered again below so that
 *  `tabindex="-1"` (programmatic focus only) never becomes a tab stop. */
const FOCUSABLE = [
  "a[href]",
  "area[href]",
  "button",
  "input",
  "select",
  "textarea",
  "iframe",
  "object",
  "embed",
  "summary",
  "audio[controls]",
  "video[controls]",
  "[tabindex]",
  '[contenteditable=""]',
  '[contenteditable="true"]',
].join(",");

/** Is this element a tab stop right now? */
function isCandidate(el) {
  if (el.hasAttribute("disabled")) return false;
  if (el.getAttribute("aria-hidden") === "true") return false;
  if (el.getAttribute("tabindex") === "-1") return false;
  // Zero client rects covers `display:none`, `visibility:hidden` and a closed
  // overlay — cheaper and more honest than reading computed styles.
  if (!el.getClientRects().length) return false;
  return el.matches(FOCUSABLE) || !!el.shadowRoot?.delegatesFocus;
}

function visit(el, out) {
  if (isCandidate(el)) {
    out.push(el);
    // A component that delegates focus owns whatever is inside it: it is one
    // tab stop, not one per element in its shadow root.
    if (el.shadowRoot?.delegatesFocus) return;
  }
  walk(el, out);
}

function walk(node, out) {
  for (const el of node.children) {
    if (el.localName === "slot") {
      for (const assigned of el.assignedElements({ flatten: true })) visit(assigned, out);
      continue;
    }
    visit(el, out);
  }
}

/** Tab stops inside `host`, in the order the user actually meets them. */
export function focusables(host) {
  const out = [];
  walk(host.shadowRoot ?? host, out);
  return out;
}

/** `document.activeElement` stops at a shadow host; we want the real one. */
function deepActive() {
  let el = document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

/** The element and every host/parent above it, crossing shadow boundaries. */
function ancestry(el) {
  const out = [];
  let node = el;
  while (node) {
    out.push(node);
    node = node.parentElement ?? /** @type {any} */ (node.getRootNode())?.host ?? null;
  }
  return out;
}

export class FocusTrap {
  /** @param {HTMLElement} host the overlay element the trap is confined to */
  constructor(host) {
    this.host = host;
    this.active = false;
    /** @type {Element | null} */
    this._opener = null;
    /** @type {((e: KeyboardEvent) => void) | null} */
    this._key = null;
  }

  /** Idempotent, because the overlays call this from every render. */
  activate() {
    if (this.active) return;
    this.active = true;
    // Remembered at activation, not at close: by the time the overlay closes
    // the opener may no longer be what the app thinks it is.
    this._opener = deepActive();
    this._key = (e) => this._onKey(e);
    // Keydown is composed, so slotted light DOM and the shadow tree both
    // bubble here — one listener covers the whole overlay.
    this.host.addEventListener("keydown", this._key);
    const first = focusables(this.host)[0];
    (first ?? this.host)?.focus?.({ preventScroll: true });
  }

  release() {
    if (!this.active) return;
    this.active = false;
    if (this._key) this.host.removeEventListener("keydown", this._key);
    this._key = null;
    const opener = this._opener;
    this._opener = null;
    // Only if it is still on the page — restoring focus to a detached node
    // silently drops focus to <body>, which is worse than leaving it be.
    if (opener?.isConnected) /** @type {any} */ (opener).focus?.({ preventScroll: true });
  }

  _onKey(e) {
    if (e.key !== "Tab") return;
    const items = focusables(this.host);
    if (!items.length) {
      e.preventDefault();
      return;
    }
    const path = ancestry(deepActive());
    const i = items.findIndex((el) => path.includes(el));
    const first = 0;
    const last = items.length - 1;
    let next = null;
    if (i === -1) next = e.shiftKey ? items[last] : items[first];
    else if (e.shiftKey && i === first) next = items[last];
    else if (!e.shiftKey && i === last) next = items[first];
    if (!next) return;
    e.preventDefault();
    next.focus({ preventScroll: true });
  }
}

/** @type {WeakMap<HTMLElement, FocusTrap>} */
const traps = new WeakMap();

/**
 * Attach or detach `host`'s trap in one call.
 *
 * The overlays re-evaluate their state on every render, so this has to be safe
 * to call repeatedly; the trap is allocated lazily so a panel that never traps
 * never pays for one.
 *
 * @param {HTMLElement} host
 * @param {boolean} shouldTrap
 */
export function syncFocusTrap(host, shouldTrap) {
  let trap = traps.get(host);
  if (!trap) {
    if (!shouldTrap) return;
    trap = new FocusTrap(host);
    traps.set(host, trap);
  }
  if (shouldTrap) trap.activate();
  else trap.release();
}
