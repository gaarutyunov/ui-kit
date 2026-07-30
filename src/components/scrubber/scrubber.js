import { GaElement, define, esc } from "../../core/base-element.js";

/** Segment status vocabulary — deliberately the same words and glyphs as
 *  `<ga-step-list>`, because a scrubber and a step list usually render the same
 *  run. Each status is carried by a glyph and a fill pattern as well as a
 *  colour, so the track survives being read without colour perception. */
const STATUS = {
  pending: { glyph: "○", word: "pending" },
  running: { glyph: "▶", word: "running" },
  passed: { glyph: "✓", word: "passed" },
  failed: { glyph: "✕", word: "failed" },
  skipped: { glyph: "–", word: "skipped" },
};

/** Milliseconds → "0:07", "1:05", "1:02:03". */
function formatTime(ms) {
  const total = Math.max(0, Math.round((Number(ms) || 0) / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

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
  static observed = ["duration", "position", "segments", "step", "label", "disabled"];

  static styles = /* css */ `
    :host { display: block; }
    .wrap { display: flex; flex-direction: column; gap: var(--ga-space-2, 8px); }
    :host([disabled]) .wrap { opacity: 0.5; }

    .track {
      position: relative;
      height: 16px;
      border-radius: var(--ga-radius, 6px);
      background: var(--ga-bg-elev, #1a1a1a);
      /* The outline is an inset shadow rather than a border on purpose: a
         border would offset the padding box the segments are positioned in
         from the border box the pointer is measured against, so a click would
         land a pixel or two away from the segment it visually hit. */
      box-shadow: inset 0 0 0 1px var(--ga-border, #1a1a1a);
      cursor: pointer;
      /* Own the gesture so a touch drag scrubs instead of scrolling the page. */
      touch-action: none;
      user-select: none;
      outline: none;
    }
    :host([disabled]) .track { cursor: default; }
    .track:focus-visible {
      box-shadow: inset 0 0 0 1px var(--ga-border, #1a1a1a),
        var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
    }

    .segments { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; }
    .seg {
      position: absolute;
      top: 0;
      bottom: 0;
      display: grid;
      place-items: center;
      overflow: hidden;
      font-size: 10px;
      line-height: 1;
      color: var(--ga-bg, #000);
      background: var(--ga-dim, #454545);
      box-shadow: inset -1px 0 0 var(--ga-bg, #000);
      transition: filter var(--ga-transition, 0.18s ease);
    }
    .seg:hover { filter: brightness(1.25); }

    /* Status: colour, plus a fill pattern, plus a glyph. Any one of the three
       is enough to tell two segments apart. */
    .seg[data-status="passed"] { background: var(--ga-success, #00c758); }
    .seg[data-status="failed"] {
      background: var(--ga-danger, #ff6568);
      background-image: repeating-linear-gradient(90deg,
        rgba(0, 0, 0, 0.42) 0 2px, transparent 2px 5px);
    }
    .seg[data-status="running"] {
      background: var(--ga-accent, #54a2ff);
      background-image: repeating-linear-gradient(45deg,
        rgba(0, 0, 0, 0.28) 0 4px, transparent 4px 8px);
      background-size: 22px 100%;
    }
    .seg[data-status="pending"] { background: var(--ga-border-strong, #2a2a2a); color: var(--ga-muted, #878787); }
    .seg[data-status="skipped"] {
      background: transparent;
      background-image: repeating-linear-gradient(45deg,
        var(--ga-border-strong, #2a2a2a) 0 1px, transparent 1px 6px);
      color: var(--ga-muted, #878787);
    }
    @media (prefers-reduced-motion: no-preference) {
      .seg[data-status="running"] { animation: ga-scrub-stripes 1.1s linear infinite; }
    }
    @keyframes ga-scrub-stripes {
      from { background-position: 0 0; }
      to { background-position: 22px 0; }
    }

    /* The playhead is independent of the segments: it is a sibling layer, and
       moving it never touches segment rendering. */
    .playhead {
      position: absolute;
      top: -4px;
      bottom: -4px;
      width: 2px;
      margin-left: -1px;
      border-radius: 2px;
      background: var(--ga-fg, #ededed);
      pointer-events: none;
    }
    .playhead::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--ga-fg, #ededed);
      border: 2px solid var(--ga-bg, #000);
      transform: translate(-50%, -50%);
      box-shadow: var(--ga-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.4));
    }

    .times {
      display: flex;
      justify-content: space-between;
      font-family: var(--ga-font-mono, ui-monospace, monospace);
      font-size: var(--ga-fs-xs, 12px);
      font-variant-numeric: tabular-nums;
      color: var(--ga-muted, #878787);
    }
    .times .now { color: var(--ga-fg, #ededed); }

    @media (forced-colors: active) {
      .seg { forced-color-adjust: none; }
      .playhead { background: Highlight; }
    }

    .sr {
      position: absolute;
      width: 1px; height: 1px;
      padding: 0; margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }
  `;

  /* ---- Model ----------------------------------------------------------- */

  _segments() {
    let raw;
    try {
      raw = JSON.parse(this.attr("segments", "[]"));
    } catch {
      return [];
    }
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((s) => s && typeof s === "object")
      .map((s, i) => ({
        id: s.id != null ? String(s.id) : String(i),
        start: Math.max(0, Number(s.start) || 0),
        duration: Math.max(0, Number(s.duration) || 0),
        status: s.status ? String(s.status) : "",
        label: s.label != null ? String(s.label) : "",
        index: i,
      }));
  }

  /** Explicit `duration`, else the end of the last segment. */
  _duration() {
    const attr = Number(this.attr("duration", ""));
    if (Number.isFinite(attr) && attr > 0) return attr;
    return this._segments().reduce((max, s) => Math.max(max, s.start + s.duration), 0);
  }

  _step() {
    const attr = Number(this.attr("step", ""));
    if (Number.isFinite(attr) && attr > 0) return attr;
    return Math.max(1, Math.round(this._duration() / 100));
  }

  /** Clamp to the track and settle on whole milliseconds, so the attribute,
   *  the event detail and `aria-valuenow` can never disagree by a fraction. */
  _clamp(ms) {
    const dur = this._duration();
    if (!Number.isFinite(ms)) return 0;
    return Math.round(Math.min(Math.max(ms, 0), dur));
  }

  _attrPosition() {
    return this._clamp(Number(this.attr("position", "0")) || 0);
  }

  _segmentAt(ms) {
    return this._segments().find((s) => ms >= s.start && ms < s.start + s.duration) || null;
  }

  /** The next (`dir` 1) or previous (`dir` -1) segment boundary from `ms`. */
  _segmentEdge(ms, dir) {
    const starts = this._segments().map((s) => s.start).sort((a, b) => a - b);
    if (dir > 0) {
      const next = starts.find((v) => v > ms + 1);
      return next != null ? next : this._duration();
    }
    const prev = [...starts].reverse().find((v) => v < ms - 1);
    return prev != null ? prev : 0;
  }

  _valueText(ms) {
    const base = `${formatTime(ms)} of ${formatTime(this._duration())}`;
    const seg = this._segmentAt(ms);
    if (!seg) return base;
    const name = seg.label || `segment ${seg.index + 1}`;
    const word = STATUS[seg.status]?.word ?? seg.status;
    return word ? `${base} — ${name} (${word})` : `${base} — ${name}`;
  }

  /* ---- Rendering -------------------------------------------------------- */

  template() {
    const dur = this._duration();
    const segments = this._segments();
    const pct = (ms) => (dur > 0 ? Math.min(100, Math.max(0, (ms / dur) * 100)) : 0);

    const regions = segments.map((s) => {
      const known = STATUS[s.status];
      const word = known ? known.word : s.status;
      const glyph = known ? known.glyph : "";
      const name = s.label || `Segment ${s.index + 1}`;
      const title = [name, word, formatTime(s.start)].filter(Boolean).join(" — ");
      return /* html */ `<span class="seg" part="segment" data-seg="${s.index}"
        ${s.status ? `data-status="${esc(s.status)}"` : ""}
        title="${esc(title)}"
        style="left:${pct(s.start)}%;width:${Math.max(0, pct(s.start + s.duration) - pct(s.start))}%"
        >${esc(glyph)}</span>`;
    }).join("");

    // One concise description instead of per-segment stops: a screen-reader
    // user gets the shape of the run on focus and the detail from
    // aria-valuetext as the playhead moves.
    const counts = new Map();
    segments.forEach((s) => {
      const word = STATUS[s.status]?.word ?? s.status;
      if (word) counts.set(word, (counts.get(word) ?? 0) + 1);
    });
    const summary = segments.length
      ? `${segments.length} segment${segments.length === 1 ? "" : "s"}` +
        (counts.size ? ": " + [...counts].map(([w, n]) => `${n} ${w}`).join(", ") : "")
      : "No segments.";

    const position = this._attrPosition();
    const disabled = this.hasFlag("disabled");

    return /* html */ `
      <div class="wrap">
        <div class="track" part="track" role="slider"
          tabindex="${disabled ? "-1" : "0"}"
          aria-label="${esc(this.attr("label", "Timeline"))}"
          aria-orientation="horizontal"
          aria-valuemin="0"
          aria-valuemax="${Math.round(dur)}"
          aria-valuenow="${Math.round(position)}"
          aria-valuetext="${esc(this._valueText(position))}"
          aria-describedby="ga-scrubber-summary"
          ${disabled ? `aria-disabled="true"` : ""}>
          <span class="segments" part="segments" aria-hidden="true">${regions}</span>
          <span class="playhead" part="playhead" aria-hidden="true" style="left:${pct(position)}%"></span>
        </div>
        <div class="times" part="times" aria-hidden="true">
          <span class="now">${esc(formatTime(position))}</span>
          <span class="dur">${esc(formatTime(dur))}</span>
        </div>
        <span class="sr" id="ga-scrubber-summary">${esc(summary)}</span>
      </div>
    `;
  }

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
  attributeChangedCallback(name) {
    if (!this._mounted) return;
    if (name === "position") this._syncPosition();
    else this.render();
  }

  render() {
    super.render();
    const track = this.$(".track");
    if (!track) return;
    track.addEventListener("keydown", (e) => this._onKey(e));
    track.addEventListener("pointerdown", (e) => this._onPointerDown(e));
    this._syncPosition();
  }

  /** Repaint the playhead and the announcements for `ms` — nothing else. */
  _paint(ms) {
    const dur = this._duration();
    const track = this.$(".track");
    if (!track) return;
    const pct = dur > 0 ? Math.min(100, Math.max(0, (ms / dur) * 100)) : 0;
    const head = this.$(".playhead");
    if (head) head.style.left = pct + "%";
    const now = this.$(".now");
    if (now) now.textContent = formatTime(ms);
    track.setAttribute("aria-valuenow", String(Math.round(ms)));
    track.setAttribute("aria-valuetext", this._valueText(ms));
  }

  /** Adopt the attribute as the truth (external drive, e.g. playback). */
  _syncPosition() {
    this._live = this._attrPosition();
    this._paint(this._live);
  }

  /** Live, uncommitted movement — no attribute write, so no re-render. */
  _apply(ms) {
    const next = this._clamp(ms);
    if (next === this._live) return;
    this._live = next;
    this._paint(next);
    this.emit("input", { position: next });
  }

  /**
   * Commit a position and report where it came from.
   *
   * @param {number} ms
   * @param {"segment" | "track" | "keyboard"} source
   * @param {object | null} [segment] the segment that was activated, if any
   */
  _commit(ms, source, segment = null) {
    const next = this._clamp(ms);
    const changed = next !== this._live;
    this._live = next;
    this.setAttribute("position", String(next));
    this._paint(next);
    if (changed) this.emit("input", { position: next });
    this.emit("change", {
      position: next,
      source,
      segment: segment ?? this._segmentAt(next),
    });
  }

  /* ---- Input ------------------------------------------------------------ */

  _positionFromEvent(e) {
    const track = this.$(".track");
    const rect = track?.getBoundingClientRect();
    if (!rect || !rect.width) return 0;
    return this._clamp(((e.clientX - rect.left) / rect.width) * this._duration());
  }

  _onPointerDown(e) {
    if (this.hasFlag("disabled")) return;
    if (e.button != null && e.button !== 0) return;
    const track = this.$(".track");
    if (!track) return;
    track.focus();

    // Level one — a segment. Seek to the segment's own start; no drag, because
    // "play this chapter" is a discrete request, not a scrub.
    const hit = e.target.closest?.("[data-seg]");
    if (hit) {
      const seg = this._segments()[Number(hit.dataset.seg)];
      if (seg) {
        e.preventDefault();
        this._commit(seg.start, "segment", seg);
        return;
      }
    }

    // Level two — bare track. Seek to the point pressed, then scrub.
    e.preventDefault();
    this._apply(this._positionFromEvent(e));

    const move = (ev) => this._apply(this._positionFromEvent(ev));
    const end = () => {
      track.removeEventListener("pointermove", move);
      track.removeEventListener("pointerup", end);
      track.removeEventListener("pointercancel", end);
      try {
        if (track.hasPointerCapture?.(e.pointerId)) track.releasePointerCapture(e.pointerId);
      } catch { /* the pointer is already gone; nothing to release */ }
      // Commit what is on screen: a cancelled pointer has no useful clientX.
      this._commit(this._live, "track");
    };
    // Capture so a drag that leaves the track keeps scrubbing. Guarded: the
    // pointer may already be released (or synthesised), and a throw here would
    // abandon the drag wiring below.
    try {
      track.setPointerCapture?.(e.pointerId);
    } catch { /* no capture available — the drag still works, just not off-track */ }
    track.addEventListener("pointermove", move);
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);
  }

  _onKey(e) {
    if (this.hasFlag("disabled")) return;
    const pos = this._live ?? this._attrPosition();
    const step = this._step();
    let next;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = pos + step;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = pos - step;
        break;
      // The keyboard equivalent of clicking a segment: a whole segment is the
      // meaningful "large step" on a chaptered timeline.
      case "PageUp":
        next = this._segmentEdge(pos, 1);
        break;
      case "PageDown":
        next = this._segmentEdge(pos, -1);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = this._duration();
        break;
      default:
        return;
    }
    e.preventDefault();
    this._commit(next, "keyboard");
  }

  /* ---- Properties ------------------------------------------------------- */

  get position() { return this._live ?? this._attrPosition(); }
  /** @param {number} v milliseconds */
  set position(v) { this.setAttribute("position", String(Number(v) || 0)); }

  get duration() { return this._duration(); }
  /** @param {number} v milliseconds */
  set duration(v) { this.setAttribute("duration", String(Number(v) || 0)); }

  get segments() { return this._segments(); }
  /** @param {{ id?: string, start: number, duration: number, status?: string, label?: string }[]} v */
  set segments(v) { this.setAttribute("segments", JSON.stringify(v ?? [])); }
}

define("ga-scrubber", GaScrubber);
