import { GaElement, define, esc } from "../../core/base-element.js";

/**
 * `<ga-splitter>` — the draggable divider between two regions. **It is the
 * handle, not a split pane**: it owns no layout, has no slots for the regions,
 * and never positions anything. It reports where it is; the application's own
 * grid does the rest.
 *
 *   <div class="pane" style="display:grid; grid-template-columns: var(--ga-split) auto 1fr;">
 *     <section>left</section>
 *     <ga-splitter value="32" min="18" max="60"></ga-splitter>
 *     <section>right</section>
 *   </div>
 *
 * **Why only the divider** (change design, D6): the reusable half of a split
 * pane already exists in the kit. A side region that collapses off-canvas with
 * a scrim *is* `<ga-panel side="left">`, and collapsing to tabs on a narrow
 * viewport is `<ga-tabs>`. What was left over was drag-to-resize — and a
 * container whose job is `display: grid` does not earn a component, the same
 * bar `ga-metric-row` failed to clear. So the collapse-on-narrow case is
 * documentation, not code: reach for `ga-panel side="left"` plus `ga-tabs`.
 *
 * **On the name**: in most kits a "divider" is the static `<hr>` rule. This one
 * is a drag handle, so it takes the name that says so and leaves `ga-divider`
 * free for the decorative rule the kit will eventually want.
 *
 * **The position is published as a CSS custom property** (`--ga-split` by
 * default) rather than as a layout the component imposes. It is written to the
 * splitter's *parent* because custom properties inherit downwards: set on the
 * grid, both regions and the splitter itself can read it, whereas a property
 * set on the host would never reach a sibling. The element the property is
 * written to is also the element the drag measures against, so "50%" always
 * means half of the box the app is laying out.
 *
 * **Pointer capture, not document listeners.** `setPointerCapture` keeps
 * delivering `pointermove` to the handle after the pointer leaves it — which it
 * will, immediately, since a drag is by definition a move away from a 11px-wide
 * strip. It also survives the pointer crossing an `<iframe>` and guarantees the
 * matching `pointerup`, both of which a `document`-level listener gets wrong.
 *
 * **`value` changes do not re-render.** Rebuilding the shadow tree mid-drag
 * would destroy the very element holding the pointer capture, so a moving
 * splitter only updates the ARIA values and the custom property in place.
 *
 * **No `aria-controls`.** The regions are the app's elements in the app's tree,
 * but `aria-controls` would have to be set on the shadow-root handle that
 * carries `role="separator"`, and IDREFs do not cross a shadow boundary. A host
 * that wants the association can put `aria-controls` on the `<ga-splitter>`
 * element itself, where the IDREFs resolve.
 *
 * Attributes:
 *   value        current position (default 50)
 *   min, max     bounds (defaults 0 and 100), clamped on drag and on key
 *   step         arrow-key increment (default 1); Page keys move 10 steps
 *   unit         CSS unit written with the value (default `%`; `px` also works)
 *   orientation  `vertical` (default — a vertical bar splitting left/right) or
 *                `horizontal` (a horizontal bar splitting top/bottom)
 *   property     custom property to write (default `--ga-split`)
 *   scope        where to write it: `parent` (default) or `root`
 *   label        accessible name (default "Resize panels")
 *
 * Events: `input` on every move, `change` when a gesture completes.
 * Parts: handle, line.
 */
export class GaSplitter extends GaElement {
  static observed = [
    "value", "min", "max", "step", "unit",
    "orientation", "property", "scope", "label",
  ];

  static styles = /* css */ `
    /* touch-action:none so a touch drag resizes instead of scrolling the page:
       without it the browser claims the gesture before pointermove ever fires. */
    :host {
      display: block;
      touch-action: none;
      align-self: stretch;
      justify-self: stretch;
    }

    .handle {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      min-width: 11px;
      padding: 0;
      border: 0;
      background: transparent;
      cursor: col-resize;
      /* A drag that starts on the handle must not paint a text selection
         across the panes it is resizing. */
      user-select: none;
      -webkit-user-select: none;
    }
    :host([orientation="horizontal"]) .handle {
      min-width: 0;
      min-height: 11px;
      cursor: row-resize;
    }

    /* The hit area is 11px; the rule is 1px. Drawn as a pseudo-element so the
       target stays comfortably larger than the thing it looks like — a 1px
       drag target is the most common defect in hand-rolled splitters. */
    .handle::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 1px;
      transform: translateX(-50%);
      background: var(--ga-border-strong, #2a2a2a);
      transition: background var(--ga-transition, 0.18s ease);
    }
    :host([orientation="horizontal"]) .handle::after {
      left: 0;
      right: 0;
      top: 50%;
      bottom: auto;
      width: auto;
      height: 1px;
      transform: translateY(-50%);
    }
    .handle:hover::after,
    .handle[data-dragging]::after { background: var(--ga-accent, #54a2ff); }

    .handle:focus-visible {
      outline: none;
      box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
      border-radius: var(--ga-radius, 6px);
    }

    /* Forced colours drop the accent fill, so the active rule is restated in a
       system colour or the splitter becomes invisible. */
    @media (forced-colors: active) {
      .handle::after { background: CanvasText; forced-color-adjust: none; }
      .handle:hover::after,
      .handle[data-dragging]::after { background: Highlight; }
    }
  `;

  template() {
    const horizontal = this.attr("orientation", "vertical") === "horizontal";
    return /* html */ `
      <div class="handle" part="handle" tabindex="0"
        role="separator"
        aria-orientation="${horizontal ? "horizontal" : "vertical"}"
        aria-label="${esc(this.attr("label", "Resize panels"))}"></div>
    `;
  }

  render() {
    super.render();
    const handle = this.$(".handle");
    if (!handle) return;
    handle.addEventListener("keydown", (e) => this._onKey(e));
    handle.addEventListener("pointerdown", (e) => this._onPointerDown(e));
    handle.addEventListener("pointermove", (e) => this._onPointerMove(e));
    handle.addEventListener("pointerup", (e) => this._onPointerUp(e));
    handle.addEventListener("pointercancel", (e) => this._onPointerUp(e));
    this._sync();
  }

  /**
   * `value` is the hot path — it changes on every frame of a drag, and a
   * re-render would replace the element currently holding the pointer capture,
   * ending the drag on the first move. Everything else may rebuild the tree.
   *
   * `name` is declared optional so the emitted declaration stays assignable to
   * `GaElement`'s zero-argument override; widening it fails a `tsc --noEmit`
   * pass over the generated `.d.ts`.
   *
   * @param {string} [name]
   */
  attributeChangedCallback(name) {
    if (!this._mounted) return;
    if (name === "value") this._sync();
    else this.render();
  }

  disconnectedCallback() {
    // Leave the app's grid as it was: a splitter removed from the DOM should
    // not leave a stale width behind on a container it no longer divides.
    this._scopeElement()?.style.removeProperty(this._property());
  }

  /**
   * A number attribute with a fallback. The empty check is load-bearing:
   * `Number("")` is `0`, not `NaN`, so a plain `Number.isFinite` guard would
   * silently read every unset bound as zero — which collapses `max` to 0 and
   * pins the splitter shut.
   */
  _num(name, fallback) {
    const raw = this.getAttribute(name);
    if (raw == null || raw.trim() === "") return fallback;
    const value = Number(raw);
    return Number.isFinite(value) ? value : fallback;
  }

  _min() { return this._num("min", 0); }
  _max() { return this._num("max", 100); }
  _step() { return Math.abs(this._num("step", 1)) || 1; }
  _property() { return this.attr("property", "--ga-split") || "--ga-split"; }

  /** The element the property is written to, and the box the drag measures. */
  _scopeElement() {
    if (this.attr("scope", "parent") === "root") return document.documentElement;
    return this.parentElement ?? document.documentElement;
  }

  _clamp(v) {
    const min = this._min();
    const max = this._max();
    // Guard the inverted case rather than trusting the host: a max below a min
    // would otherwise make every value invalid and freeze the splitter.
    return Math.min(Math.max(v, Math.min(min, max)), Math.max(min, max));
  }

  /** Publish the position: the custom property, then the ARIA values. */
  _sync() {
    const value = this._clamp(this._num("value", 50));
    const unit = this.attr("unit", "%");
    this._scopeElement()?.style.setProperty(this._property(), `${value}${unit}`);

    const handle = this.$(".handle");
    if (!handle) return;
    handle.setAttribute("aria-valuenow", String(value));
    handle.setAttribute("aria-valuemin", String(this._min()));
    handle.setAttribute("aria-valuemax", String(this._max()));
    // `aria-valuenow` alone is read as a bare number; the unit is the half that
    // makes "32" mean something.
    handle.setAttribute("aria-valuetext", `${value}${unit}`);
  }

  /**
   * Commit a position. `emitChange` separates the two events a gesture
   * produces: a drag streams `input` and fires one `change` on release, while a
   * key press is a complete gesture and fires both at once.
   */
  _set(value, { emitChange = false } = {}) {
    const next = this._clamp(value);
    if (next !== this._num("value", 50)) {
      // setAttribute lands in attributeChangedCallback above, which syncs
      // without re-rendering.
      this.setAttribute("value", String(next));
    }
    this._sync();
    this.emit("input", { value: next });
    if (emitChange) this.emit("change", { value: next });
  }

  /** Where the pointer is, as a value in this splitter's own units. */
  _valueAt(event) {
    const box = this._scopeElement();
    if (!box) return this._num("value", 50);
    const rect = box.getBoundingClientRect();
    const horizontal = this.attr("orientation", "vertical") === "horizontal";
    const unit = this.attr("unit", "%");

    if (horizontal) {
      const offset = event.clientY - rect.top;
      return unit === "%" ? (rect.height ? (offset / rect.height) * 100 : 0) : offset;
    }

    let offset = event.clientX - rect.left;
    // In a right-to-left container the left edge is the *end*, so a raw
    // client-x offset would make the splitter run backwards under the pointer.
    if (getComputedStyle(box).direction === "rtl") offset = rect.width - offset;
    return unit === "%" ? (rect.width ? (offset / rect.width) * 100 : 0) : offset;
  }

  _onPointerDown(e) {
    if (e.button != null && e.button !== 0) return;
    const handle = this.$(".handle");
    if (!handle) return;
    // preventDefault before capture: it suppresses the native selection drag,
    // which would otherwise paint a highlight across both regions.
    e.preventDefault();
    // Capture is how the drag survives the pointer leaving an 11px strip, but
    // it is a delivery optimisation, not the arithmetic: a synthesised
    // pointerdown (a test harness, an automation tool) has no live pointer and
    // the call throws NotFoundError. Losing capture must not lose the drag.
    try { handle.setPointerCapture(e.pointerId); } catch { /* no live pointer */ }
    handle.dataset.dragging = "";
    this._pointer = e.pointerId;
    handle.focus();
    this._set(this._valueAt(e));
  }

  _onPointerMove(e) {
    if (this._pointer !== e.pointerId) return;
    this._set(this._valueAt(e));
  }

  _onPointerUp(e) {
    if (this._pointer !== e.pointerId) return;
    this._pointer = undefined;
    const handle = this.$(".handle");
    if (handle) {
      delete handle.dataset.dragging;
      try { handle.releasePointerCapture(e.pointerId); } catch { /* never captured */ }
    }
    this._set(this._valueAt(e), { emitChange: true });
  }

  _onKey(e) {
    const step = this._step();
    const value = this._num("value", 50);
    let next;

    switch (e.key) {
      // Both axes are accepted whatever the orientation. The pair that matches
      // the orientation is the one a reader will reach for, but refusing the
      // other pair only produces a dead key — "up" and "left" both mean
      // "smaller" on a one-dimensional control.
      case "ArrowLeft":
      case "ArrowUp":
        next = value - step;
        break;
      case "ArrowRight":
      case "ArrowDown":
        next = value + step;
        break;
      case "PageUp":
        next = value - step * 10;
        break;
      case "PageDown":
        next = value + step * 10;
        break;
      case "Home":
        next = this._min();
        break;
      case "End":
        next = this._max();
        break;
      default:
        return;
    }
    // Only now: an unhandled key must keep its default, or the splitter eats
    // Tab and the reader is stuck on it.
    e.preventDefault();
    this._set(next, { emitChange: true });
  }

  get value() { return this._clamp(this._num("value", 50)); }
  /** @param {number} v */
  set value(v) { this._set(Number(v), { emitChange: true }); }
}

define("ga-splitter", GaSplitter);
