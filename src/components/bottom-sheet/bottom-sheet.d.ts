/**
 * `<ga-bottom-sheet>` — a draggable sheet that rises from the bottom of the
 * screen with snap points, à la Google Maps.
 *
 * Drag the grab handle (or the header) between three detents — `peek`, `half`,
 * `full` — and drag below `peek` to dismiss. Escape dismisses it too, because
 * a gesture is not an affordance for anyone driving the page from a keyboard.
 *
 * ## The mobile half of the overlay pair
 *
 * This is the narrow-viewport form of `<ga-panel overlay>`: same content, same
 * `--ga-z-overlay` stacking token under `overlay`, but anchored to the bottom
 * edge where a thumb can reach it. The viewport width at which an app should
 * swap one for the other is **{@link GaBottomSheet.breakpoint} (640px)** —
 * stated here rather than left to each app to invent. The full composition
 * recipe for a canvas app lives in `<ga-panel>`'s documentation.
 *
 * ## Focus containment
 *
 * The sheet **traps focus by default**, and this is the deliberate opposite of
 * `<ga-panel overlay>`. A sheet at `half` or `full` covers the content beneath
 * it, so letting Tab wander behind it would let the keyboard drive a UI the
 * user cannot see. A panel is a persistent control surface and must not hold
 * the keyboard; a sheet is modal and must. Set `trap-focus="false"` for the
 * persistent, Maps-style sheet that only ever sits at `peek`.
 *
 * Attributes:
 *   open        boolean — reflected; whether the sheet is visible
 *   snap        "peek" | "half" | "full"  (reflected; default "half")
 *   overlay     boolean — paint at `--ga-z-overlay` with a blurred backdrop,
 *               for sheets floating over an app's own full-bleed canvas
 *   trap-focus  "false" opts out of the default focus containment
 *
 * Slots: `header` (sits under the handle), default (scrollable body).
 * Methods: show(snap?) / close() / snapTo(snap).
 * Events: `open`, `close`, `snapchange` ({ snap }).
 */
export class GaBottomSheet extends GaElement {
    static observed: string[];
    /**
     * The documented breakpoint at which an overlay panel becomes a sheet, in
     * CSS pixels. Exposed as a static so an app's `matchMedia` query and the
     * kit's documentation cannot drift apart.
     */
    static breakpoint: number;
    _onResize: (() => void) | undefined;
    _onMove: ((e: any) => void) | undefined;
    _onUp: (() => void) | undefined;
    _onKey: ((e: any) => void) | undefined;
    disconnectedCallback(): void;
    get open(): boolean;
    get snap(): string;
    get overlay(): boolean;
    /**
     * On unless opted out — the mirror image of `<ga-panel>`'s getter, and the
     * difference between the two is exactly this line. The sheet covers what is
     * beneath it, so the app does not have to ask for containment; a panel is
     * persistent, so it must.
     */
    get trapFocus(): boolean;
    show(snap: any): void;
    close(): void;
    snapTo(snap: any): void;
    _snaps(): {
        full: number;
        half: number;
        peek: number;
        closed: any;
    };
    _currentY(): any;
    _apply(): void;
    _down(e: any): void;
    _dragging: boolean | undefined;
    _startY: any;
    _startTf: any;
    _move(e: any): void;
    _up(): void;
}
import { GaElement } from "../../core/base-element.js";
