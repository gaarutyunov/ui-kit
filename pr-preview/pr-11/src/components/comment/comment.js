import { GaElement, define, esc } from "../../core/base-element.js";

/**
 * `<ga-comment>` — one comment in a review thread: an author, a timestamp, a
 * body, an optional anchor, and a resolution state.
 *
 *   <ga-comment author="Ada" time="2h ago" datetime="2026-07-28T09:12:00Z"
 *               anchor="step 3 · Submit the order">
 *     The retry fires before the toast clears.
 *   </ga-comment>
 *   <ga-comment author="Grace" time="1h ago" resolved>Fixed on main.</ga-comment>
 *
 * **Every author is aligned identically, on purpose.** `ga-chat-message` puts
 * the reader's own turns on the right and fills them inverse, because a
 * conversation has a "me versus them" axis. A review thread has no such axis:
 * the reviewer, the author and a bot are all just people who left a note, and
 * mirroring the layout by speaker would invent a hierarchy the data does not
 * have. So there is exactly one card treatment here and no `:host([author=…])`
 * selector anywhere — which is also why this is not `ga-chat-message` with a
 * flag. See the change design, D3.
 *
 * **Resolution is not conveyed by opacity.** A resolved comment dims, but the
 * dimming is decoration stacked on top of a distinction that already exists in
 * text: a visible "Resolved" chip, and a toggle whose `aria-pressed` reports the
 * state. Anyone who cannot see the 28% opacity difference — low vision, a
 * screen reader, forced-colours mode — still gets the answer, and forced
 * colours is restated explicitly because it flattens the dimming away entirely.
 *
 * **The timestamp is a real `<time>`.** `time` is what a person reads ("2h
 * ago"); `datetime` is what a machine reads, and falls back to `time` when the
 * host only supplies one. A relative time with no machine value is unusable to
 * anything that wants to sort, group or re-localise the thread.
 *
 * Attributes:
 *   author      who wrote it
 *   time        human-readable timestamp
 *   datetime    machine-readable timestamp (defaults to `time`)
 *   anchor      what the comment is attached to
 *   resolved    boolean — settled
 *   no-resolve  boolean — hide the toggle, for a comment that is a reply rather
 *               than an independently resolvable thread head
 *
 * Slots: (default) — the comment body.
 * Events: `resolve` with { resolved } — the NEW state, not the old one.
 * Parts: card, meta, author, time, chip, toggle, anchor, body.
 */
export class GaComment extends GaElement {
  static observed = ["author", "time", "datetime", "anchor", "resolved", "no-resolve"];

  static styles = /* css */ `
    :host { display: block; }

    .card {
      display: flex;
      flex-direction: column;
      gap: var(--ga-space-2, 8px);
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border, #1f1f1f);
      border-radius: var(--ga-radius-lg, 8px);
      padding: var(--ga-space-3, 12px);
      transition: border-color var(--ga-transition, 0.18s ease),
        opacity var(--ga-transition, 0.18s ease);
    }

    .meta {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: var(--ga-space-2, 8px);
      font-size: var(--ga-fs-xs, 12px);
      color: var(--ga-muted, #878787);
    }
    .author {
      font-size: var(--ga-fs-sm, 14px);
      font-weight: 600;
      color: var(--ga-fg, #ededed);
      overflow-wrap: anywhere;
    }
    time { font-variant-numeric: tabular-nums; }

    /* The chip is the carrier of the resolved state; the dimming below is only
       an echo of it. */
    .chip {
      font-size: 11px;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      padding: 3px 8px;
      border-radius: var(--ga-radius-full, 9999px);
      border: 1px solid color-mix(in srgb, var(--ga-success, #00c758) 45%, transparent);
      color: var(--ga-success, #00c758);
    }

    /* Pushed to the far end so the toggle sits in the same place on every card
       whatever the author's name length. */
    .toggle {
      margin-left: auto;
      font-family: inherit;
      font-size: var(--ga-fs-xs, 12px);
      font-weight: 500;
      line-height: 1;
      color: var(--ga-muted, #878787);
      background: transparent;
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius, 6px);
      padding: 5px 9px;
      cursor: pointer;
      transition: color var(--ga-transition, 0.18s ease),
        border-color var(--ga-transition, 0.18s ease);
    }
    .toggle:hover { color: var(--ga-fg, #ededed); border-color: var(--ga-muted, #878787); }
    .toggle:focus-visible {
      outline: none;
      box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
    }

    /* The anchor: a quoted target, marked with a rule rather than quote glyphs
       so a path or a line number does not read as prose. */
    .anchor {
      display: block;
      font-family: var(--ga-font-mono, ui-monospace, monospace);
      font-size: var(--ga-fs-xs, 12px);
      color: var(--ga-muted, #878787);
      border-left: 2px solid var(--ga-border-strong, #2a2a2a);
      padding: 2px 0 2px var(--ga-space-2, 8px);
      overflow-wrap: anywhere;
    }

    .body {
      font-size: var(--ga-fs-sm, 14px);
      line-height: 1.55;
      color: var(--ga-fg, #ededed);
      overflow-wrap: anywhere;
    }

    /* Dimmed, not hidden: a settled comment is still part of the record and
       has to stay legible. The card keeps full contrast on its own chrome so
       the "Resolved" chip and the Reopen control never fade out of reach. */
    :host([resolved]) .card { border-color: var(--ga-border-subtle, #111); }
    :host([resolved]) .body,
    :host([resolved]) .anchor { opacity: 0.72; }

    @media (forced-colors: active) {
      :host([resolved]) .body,
      :host([resolved]) .anchor { opacity: 1; }
      .chip { border-color: CanvasText; color: CanvasText; }
    }
  `;

  template() {
    const author = this.attr("author");
    const time = this.attr("time");
    // A relative label with no machine value is still better than no time at
    // all, so `datetime` falls back rather than suppressing the element.
    const datetime = this.attr("datetime") || time;
    const anchor = this.attr("anchor");
    const resolved = this.hasFlag("resolved");
    const who = author || "this comment";

    return /* html */ `
      <article class="card" part="card">
        <div class="meta" part="meta">
          ${author ? `<span class="author" part="author">${esc(author)}</span>` : ""}
          ${time ? `<time part="time" datetime="${esc(datetime)}">${esc(time)}</time>` : ""}
          ${resolved ? `<span class="chip" part="chip">Resolved</span>` : ""}
          ${this.hasFlag("no-resolve")
            ? ""
            : `<button class="toggle" part="toggle" type="button" aria-pressed="${resolved}"
                 aria-label="${esc(resolved ? `Reopen ${who}` : `Resolve ${who}`)}"
               >${resolved ? "Reopen" : "Resolve"}</button>`}
        </div>
        ${anchor ? `<span class="anchor" part="anchor">${esc(anchor)}</span>` : ""}
        <div class="body" part="body"><slot></slot></div>
      </article>
    `;
  }

  render() {
    super.render();
    this.$(".toggle")?.addEventListener("click", () => this.toggleResolved());
  }

  /**
   * Flip the resolution state and announce the state it landed on.
   *
   * The attribute moves first and the event follows, matching `ga-step-list`:
   * the control has to respond to the press whether or not a host is listening,
   * and a host that wants server confirmation before committing can put the
   * state back in its handler.
   */
  toggleResolved() {
    const next = !this.hasFlag("resolved");
    this.resolved = next;
    this.emit("resolve", { resolved: next });
  }

  get resolved() { return this.hasFlag("resolved"); }
  /** @param {boolean} v */
  set resolved(v) {
    if (v) this.setAttribute("resolved", "");
    else this.removeAttribute("resolved");
  }
}

define("ga-comment", GaComment);
