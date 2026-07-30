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
    static observed: string[];
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
    attributeChangedCallback(name?: string): void;
    disconnectedCallback(): void;
    /**
     * A number attribute with a fallback. The empty check is load-bearing:
     * `Number("")` is `0`, not `NaN`, so a plain `Number.isFinite` guard would
     * silently read every unset bound as zero — which collapses `max` to 0 and
     * pins the splitter shut.
     */
    _num(name: any, fallback: any): any;
    _min(): any;
    _max(): any;
    _step(): number;
    _property(): string;
    /** The element the property is written to, and the box the drag measures. */
    _scopeElement(): HTMLElement;
    _clamp(v: any): number;
    /** Publish the position: the custom property, then the ARIA values. */
    _sync(): void;
    /**
     * Commit a position. `emitChange` separates the two events a gesture
     * produces: a drag streams `input` and fires one `change` on release, while a
     * key press is a complete gesture and fires both at once.
     */
    _set(value: any, { emitChange }?: {
        emitChange?: boolean | undefined;
    }): void;
    /** Where the pointer is, as a value in this splitter's own units. */
    _valueAt(event: any): any;
    _onPointerDown(e: any): void;
    _pointer: any;
    _onPointerMove(e: any): void;
    _onPointerUp(e: any): void;
    _onKey(e: any): void;
    /** @param {number} v */
    set value(v: number);
    get value(): number;
}
import { GaElement } from "../../core/base-element.js";
