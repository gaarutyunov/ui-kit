/**
 * `<ga-scrubber>` — a media timeline whose track is divided into segments, each
 * with its own extent, status and label, over an independent playhead.
 *
 * **Why this is not `<ga-slider>`.** The slider is a native
 * `<input type="range">`, which is the right answer for a plain value and gives
 * form participation for free. It structurally cannot be this: a range input
 * has no per-region children, so there is nowhere to hang a coloured interval,
 * and it has exactly one movable mark. Reach for `<ga-slider>` for a value;
 * reach for `<ga-scrubber>` for a segmented media timeline. `<ga-slider>` is
 * unchanged by this component's existence.
 *
 * So the slider ARIA pattern is implemented by hand over a custom-drawn track:
 * `role="slider"` with `aria-valuemin` / `aria-valuemax` / `aria-valuenow`,
 * arrows to step, Page Up / Page Down to jump a whole segment, Home / End to
 * the ends.
 *
 * **The two-level hit behaviour**, which is the part that feels broken when it
 * is wrong:
 *
 *   - Pressing **a segment** seeks to *that segment's own start*, not to the
 *     pixel under the pointer. Clicking a chapter means "play this chapter".
 *   - Pressing **the bare track** seeks to the point pressed, and keeps
 *     scrubbing while the pointer is held (pointer capture, so leaving the
 *     element mid-drag does not drop the drag). Clicking empty track means
 *     "go exactly here".
 *
 * A press that lands on a segment is therefore discrete and does not start a
 * drag — the two levels answer different questions and mixing them would make
 * a chapter impossible to click without nudging the position.
 *
 * **`aria-valuetext` is a time, not a number.** `aria-valuenow` has to be the
 * raw millisecond count, which is meaningless read aloud ("seventy-two
 * thousand"), so every position change also rewrites `aria-valuetext` as
 * "1:12 of 3:40" plus the label and status of the segment the playhead is
 * inside.
 *
 * **The segments are not tab stops.** `role="slider"` is a leaf role, so
 * focusable children inside it would be invalid and would also bury the
 * keyboard user in stops. Instead the segment regions are `aria-hidden`
 * pointer targets, the shape of the run is summarised once via
 * `aria-describedby`, and Page Up / Page Down give the keyboard the same power
 * the pointer has: jump to the next or previous segment start.
 *
 * All times are **milliseconds**.
 *
 *   <ga-scrubber duration="90000" position="12000" segments='[
 *     {"id":"a","start":0,"duration":12000,"status":"passed","label":"Login"},
 *     {"id":"b","start":12000,"duration":30000,"status":"running","label":"Checkout"}
 *   ]'></ga-scrubber>
 *
 * Attributes:
 *   duration   total length in ms (defaults to the end of the last segment)
 *   position   playhead in ms
 *   segments   JSON: { id?, start, duration, status?, label? }[]
 *   step       ms per arrow key (default: 1% of the duration)
 *   label      accessible name (default "Timeline")
 *   disabled   boolean
 *
 * Events:
 *   `input`  { position }                     — continuous, during a drag or keying
 *   `change` { position, source, segment }    — committed; source is
 *            "segment" | "track" | "keyboard", and `segment` is the segment the
 *            position landed in (or that was activated), if any.
 *
 * Parts: track, segments, segment, playhead, times.
 */
export class GaScrubber extends GaElement {
    static observed: string[];
    _segments(): {
        id: string;
        start: number;
        duration: number;
        status: string;
        label: string;
        index: number;
    }[];
    /** Explicit `duration`, else the end of the last segment. */
    _duration(): number;
    _step(): number;
    /** Clamp to the track and settle on whole milliseconds, so the attribute,
     *  the event detail and `aria-valuenow` can never disagree by a fraction. */
    _clamp(ms: any): number;
    _attrPosition(): number;
    _segmentAt(ms: any): {
        id: string;
        start: number;
        duration: number;
        status: string;
        label: string;
        index: number;
    } | null;
    /** The next (`dir` 1) or previous (`dir` -1) segment boundary from `ms`. */
    _segmentEdge(ms: any, dir: any): number;
    _valueText(ms: any): string;
    /**
     * `position` is the one attribute that must NOT rebuild the tree: the spec is
     * that the playhead moves without altering segment rendering, and a full
     * re-render during playback would also destroy an in-flight drag.
     *
     * `name` is declared optional so the emitted declaration stays assignable to
     * `GaElement`'s zero-argument override — a widened signature would fail a
     * `tsc --noEmit` pass over the generated `.d.ts`.
     *
     * @param {string} [name]
     */
    attributeChangedCallback(name?: string): void;
    /** Repaint the playhead and the announcements for `ms` — nothing else. */
    _paint(ms: any): void;
    /** Adopt the attribute as the truth (external drive, e.g. playback). */
    _syncPosition(): void;
    _live: any;
    /** Live, uncommitted movement — no attribute write, so no re-render. */
    _apply(ms: any): void;
    /**
     * Commit a position and report where it came from.
     *
     * @param {number} ms
     * @param {"segment" | "track" | "keyboard"} source
     * @param {object | null} [segment] the segment that was activated, if any
     */
    _commit(ms: number, source: "segment" | "track" | "keyboard", segment?: object | null): void;
    _positionFromEvent(e: any): number;
    _onPointerDown(e: any): void;
    _onKey(e: any): void;
    /** @param {number} v milliseconds */
    set position(v: number);
    get position(): number;
    /** @param {number} v milliseconds */
    set duration(v: number);
    get duration(): number;
    /** @param {{ id?: string, start: number, duration: number, status?: string, label?: string }[]} v */
    set segments(v: {
        id?: string;
        start: number;
        duration: number;
        status?: string;
        label?: string;
    }[]);
    get segments(): {
        id?: string;
        start: number;
        duration: number;
        status?: string;
        label?: string;
    }[];
}
import { GaElement } from "../../core/base-element.js";
