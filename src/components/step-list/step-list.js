import { GaElement, define, esc } from "../../core/base-element.js";

/** Status vocabulary. Each entry carries a glyph AND a word: colour alone
 *  cannot be the carrier of meaning, so the glyph does the visual work and the
 *  word is what assistive technology reads out. An unknown status is not an
 *  error — it renders neutrally and announces whatever the host called it. */
const STATUS = {
  pending: { glyph: "○", word: "pending" }, // ○
  running: { glyph: "▶", word: "running" }, // ▶
  passed: { glyph: "✓", word: "passed" }, //  ✓
  failed: { glyph: "✕", word: "failed" }, //  ✕
  skipped: { glyph: "–", word: "skipped" }, // –
};

/**
 * `<ga-step-list>` — a vertical list of status-bearing steps that the reader
 * can **select**.
 *
 * This is a navigator, not a progress indicator. The distinction drives every
 * decision below: the rows are buttons because activating one is a request
 * ("take me there"), and the component therefore has to answer two questions at
 * once rather than one.
 *
 * **The two cursors.** `current` is what is playing; `selected` is what the
 * reader chose to look at. They are independent — a reader who clicks step 2
 * while step 7 is running has not stopped step 7 — so they must never collapse
 * into a single highlight. They are kept apart on two axes:
 *
 *   - *Visually*, on different channels. `current` is an edge mark: an accent
 *     bar down the left of the row plus an accent ring on the status glyph.
 *     `selected` is a surface: a filled, bordered row. An edge mark and a fill
 *     read as different kinds of thing, and both survive being drawn on the
 *     same row at the same time.
 *   - *Semantically*, on different ARIA properties. `current` is
 *     `aria-current="step"` — the attribute invented for exactly "the current
 *     one in a sequence". `selected` is `aria-pressed`, because a standalone
 *     button may not carry `aria-selected` (ARIA allows it only inside a
 *     listbox / grid / tablist). One shared property would have forced the two
 *     answers into one, which is the bug this component exists to avoid.
 *
 * **Why a real `<ol>` with an explicit `role="list"`.** The list semantics are
 * what give screen-reader users "3 of 7" for free. WebKit drops the list role
 * when `list-style: none` is applied, so the role is restated by hand rather
 * than relied upon.
 *
 * **Arrows move focus; they do not select.** Selection is a seek. Selecting on
 * every arrow keystroke would fire a seek per keypress, so the list uses the
 * manual-selection form of roving tabindex: arrows and Home/End move the focus
 * ring, Enter/Space (native button activation) commits. The list is one tab
 * stop; the tab stop follows the reader's last position.
 *
 *   <ga-step-list current="s3" selected="s1" steps='[
 *     {"id":"s1","label":"Open the checkout","meta":"0:00","status":"passed"},
 *     {"id":"s3","label":"Submit the order","meta":"0:12","status":"running",
 *      "badge":"retry 2"}
 *   ]'></ga-step-list>
 *
 * Attributes:
 *   steps     JSON: { id, label, meta?, status?, badge? }[]
 *   current   id of the step that is playing
 *   selected  id of the step the reader chose (reflected on activation)
 *   label     accessible name for the list (default "Steps")
 *
 * Statuses: pending | running | passed | failed | skipped (anything else
 * renders neutrally and is announced verbatim).
 *
 * Events: `select` with { id, index, step }.
 * Parts: list, item, row, rail, glyph, title, meta, badge.
 */
export class GaStepList extends GaElement {
  static observed = ["steps", "current", "selected", "label"];

  static styles = /* css */ `
    :host { display: block; }

    .list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
    .item { position: relative; }

    /* The rail connector: a hairline from one status glyph to the next. Drawn
       on the item (not the row) so it can cross the gap between two rows, and
       stacked above the row so a selected row's fill does not swallow it. */
    .item:not(:last-child)::before {
      content: "";
      position: absolute;
      z-index: 1;
      left: calc(var(--ga-space-3, 12px) + 12px);
      top: calc(var(--ga-space-3, 12px) + 24px);
      bottom: calc(-2px - var(--ga-space-3, 12px));
      width: 1px;
      background: var(--ga-border-strong, #2a2a2a);
    }

    .row {
      position: relative;
      width: 100%;
      display: grid;
      grid-template-columns: 22px minmax(0, 1fr) auto;
      align-items: start;
      gap: var(--ga-space-3, 12px);
      text-align: left;
      font-family: inherit;
      padding: var(--ga-space-3, 12px);
      border: 1px solid transparent;
      border-radius: var(--ga-radius, 6px);
      background: transparent;
      color: var(--ga-fg, #ededed);
      cursor: pointer;
      transition: background var(--ga-transition, 0.18s ease),
        border-color var(--ga-transition, 0.18s ease);
    }
    .row:hover { background: var(--ga-bg-elev, #1a1a1a); }
    .row:focus-visible {
      outline: none;
      box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
    }

    .rail { position: relative; z-index: 2; display: flex; justify-content: center; padding-top: 1px; }
    .glyph {
      display: grid;
      place-items: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      background: var(--ga-bg, #000);
      color: var(--ga-muted, #878787);
      font-size: 11px;
      line-height: 1;
    }

    .body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .title {
      font-size: var(--ga-fs-sm, 14px);
      font-weight: 500;
      line-height: 1.35;
      color: inherit;
      overflow-wrap: anywhere;
    }
    .meta {
      font-family: var(--ga-font-mono, ui-monospace, monospace);
      font-size: var(--ga-fs-xs, 12px);
      font-variant-numeric: tabular-nums;
      color: var(--ga-muted, #878787);
    }
    .badge {
      align-self: center;
      font-size: 11px;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      padding: 3px 8px;
      border: 1px solid var(--ga-border, #1a1a1a);
      border-radius: var(--ga-radius-full, 9999px);
      color: var(--ga-muted, #878787);
    }

    /* ---- Status: glyph + word, tinted. The word lives in .sr, so the tint is
       decoration on top of a distinction that already exists. ------------- */
    .row[data-status="passed"]  .glyph { color: var(--ga-success, #00c758); border-color: color-mix(in srgb, var(--ga-success, #00c758) 45%, transparent); }
    .row[data-status="failed"]  .glyph { color: var(--ga-danger, #ff6568);  border-color: color-mix(in srgb, var(--ga-danger, #ff6568) 45%, transparent); }
    .row[data-status="running"] .glyph { color: var(--ga-accent, #54a2ff);  border-color: color-mix(in srgb, var(--ga-accent, #54a2ff) 45%, transparent); }
    .row[data-status="skipped"] .glyph { color: var(--ga-dim, #454545); }
    .row[data-status="failed"]  .title { color: var(--ga-danger, #ff6568); }
    .row[data-status="skipped"] .title { color: var(--ga-muted, #878787); }

    /* ---- Cursor 1 — SELECTED: a surface. --------------------------------- */
    .row[aria-pressed="true"] {
      background: var(--ga-bg-elev, #1a1a1a);
      border-color: var(--ga-border-strong, #2a2a2a);
    }
    .row[aria-pressed="true"] .title { font-weight: 600; color: var(--ga-fg, #ededed); }

    /* ---- Cursor 2 — CURRENT: an edge mark. Declared after the status and
       selected rules on purpose: equal specificity, so source order is what
       lets the playhead win the glyph ring while the fill stays underneath and
       both cursors remain visible at once. ------------------------------- */
    .row[aria-current="step"]::before {
      content: "";
      position: absolute;
      left: 0;
      top: 6px;
      bottom: 6px;
      width: 3px;
      border-radius: 0 3px 3px 0;
      background: var(--ga-accent, #54a2ff);
    }
    .row[aria-current="step"] .glyph {
      border-color: var(--ga-accent, #54a2ff);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--ga-accent, #54a2ff) 22%, transparent);
    }
    /* The playhead deliberately does NOT recolour the title: on a failed step
       the red title is the strongest failure signal in the row, and "this one
       is playing" must not cost the reader "this one broke". Both cursors keep
       to the rail and the surface; the title belongs to the status. */

    /* The running glyph breathes, but only for readers who want motion. */
    @media (prefers-reduced-motion: no-preference) {
      .row[data-status="running"] .glyph { animation: ga-step-pulse 1.6s ease-in-out infinite; }
    }
    @keyframes ga-step-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.55; }
    }

    /* Forced-colours mode flattens backgrounds, which would erase the selected
       cursor. Restate both cursors in system colours so they stay distinct. */
    @media (forced-colors: active) {
      .row[aria-pressed="true"] { border-color: Highlight; }
      .row[aria-current="step"]::before { background: Highlight; forced-color-adjust: none; }
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

  _parse() {
    try {
      const value = JSON.parse(this.attr("steps", "[]"));
      return Array.isArray(value) ? value.filter((s) => s && typeof s === "object") : [];
    } catch {
      return [];
    }
  }

  /** A step's identity: its `id` when it has one, otherwise its position. */
  _idOf(step, index) {
    return step.id != null ? String(step.id) : String(index);
  }

  template() {
    const steps = this._parse();
    const current = this.attr("current");
    const selected = this.attr("selected");
    // The single tab stop: where the reader last was, else what is playing,
    // else the top of the list.
    const ids = steps.map((s, i) => this._idOf(s, i));
    const stop = ids.includes(selected) ? selected : ids.includes(current) ? current : ids[0];

    const rows = steps.map((step, i) => {
      const id = ids[i];
      const status = step.status ? String(step.status) : "";
      const known = STATUS[status];
      const glyph = known ? known.glyph : status ? "•" : "○";
      const word = known ? known.word : status;
      const meta = step.meta != null ? String(step.meta) : "";
      const badge = step.badge != null ? String(step.badge) : "";
      return /* html */ `
        <li class="item" part="item" role="listitem">
          <button class="row" part="row" type="button"
            data-id="${esc(id)}" data-index="${i}"
            ${status ? `data-status="${esc(status)}"` : ""}
            aria-pressed="${id === selected}"
            ${id === current ? `aria-current="step"` : ""}
            tabindex="${id === stop ? "0" : "-1"}">
            <span class="rail" part="rail" aria-hidden="true">
              <span class="glyph" part="glyph">${esc(glyph)}</span>
            </span>
            <span class="body">
              <span class="title" part="title">${esc(step.label ?? "")}</span>
              ${word ? `<span class="sr">${esc(word)}</span>` : ""}
              ${meta ? `<span class="meta" part="meta">${esc(meta)}</span>` : ""}
            </span>
            ${badge ? `<span class="badge" part="badge">${esc(badge)}</span>` : ""}
          </button>
        </li>`;
    }).join("");

    return /* html */ `
      <ol class="list" part="list" role="list"
        aria-label="${esc(this.attr("label", "Steps"))}">${rows}</ol>
    `;
  }

  render() {
    // A re-render replaces every row, so note where the focus was first.
    const active = this.shadowRoot?.activeElement;
    const wasFocused = active?.dataset?.index != null ? Number(active.dataset.index) : -1;

    super.render();

    const list = this.$(".list");
    if (!list) return;
    const rows = this._rows();
    rows.forEach((row) => {
      row.addEventListener("click", () =>
        this._select(row.dataset.id, Number(row.dataset.index))
      );
    });
    // One delegated listener: keydown bubbles from the focused row to the list.
    list.addEventListener("keydown", (e) => this._onKey(e, rows));

    if (wasFocused >= 0 && rows[wasFocused]) this._focus(rows[wasFocused], rows);
  }

  _rows() {
    return [...this.shadowRoot.querySelectorAll(".row")];
  }

  _onKey(e, rows) {
    const row = e.target.closest?.(".row");
    const i = rows.indexOf(row);
    if (i < 0) return;
    let next;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = Math.min(i + 1, rows.length - 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = Math.max(i - 1, 0);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = rows.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    // Clamped, not wrapped: a timeline has a first and a last step, and
    // falling off the end into the beginning loses the reader's place.
    if (rows[next]) this._focus(rows[next], rows);
  }

  /** Move the roving tab stop, then the focus. */
  _focus(row, rows) {
    rows.forEach((r) => r.setAttribute("tabindex", r === row ? "0" : "-1"));
    row.focus();
  }

  _select(id, index) {
    if (id == null) return;
    // Re-activating the already-selected row still emits: a navigator's job is
    // to seek, and asking for the same target twice is a legitimate request.
    this.setAttribute("selected", id);
    this.emit("select", { id, index, step: this._parse()[index] });
  }

  get steps() { return this._parse(); }
  /** @param {{ id?: string, label?: string, meta?: string, status?: string, badge?: string }[]} v */
  set steps(v) { this.setAttribute("steps", JSON.stringify(v ?? [])); }

  get selected() { return this.attr("selected"); }
  /** @param {string | null} v */
  set selected(v) {
    if (v == null) this.removeAttribute("selected");
    else this.setAttribute("selected", String(v));
  }

  get current() { return this.attr("current"); }
  /** @param {string | null} v */
  set current(v) {
    if (v == null) this.removeAttribute("current");
    else this.setAttribute("current", String(v));
  }
}

define("ga-step-list", GaStepList);
