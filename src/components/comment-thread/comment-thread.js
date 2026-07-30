import { GaElement, define, esc } from "../../core/base-element.js";

/**
 * `<ga-comment-thread>` — a list of `<ga-comment>`s with a composer above them.
 *
 *   <ga-comment-thread anchor="step 3 · Submit the order"
 *                      empty-text="No comments on this step yet.">
 *     <ga-comment author="Ada" time="2h ago">The retry fires early.</ga-comment>
 *     <ga-comment author="Grace" time="1h ago" resolved>Fixed on main.</ga-comment>
 *   </ga-comment-thread>
 *
 * This is deliberately **not** `ga-chat` with different styling. The two differ
 * on the axis that matters most for a reader (change design, D3):
 *
 * **It is a list, not a live log.** `ga-chat` marks its transcript
 * `role="log" aria-live="polite"`, which is right for a stream that arrives
 * while you wait for it. A review thread is a document you read and navigate,
 * so it is `role="list"`, and there is no live region anywhere in this file. A
 * thread that re-announced itself every time a colleague left a note would
 * interrupt the reader mid-sentence, repeatedly, for content they are already
 * looking at.
 *
 * **It does not follow the scroll.** `ga-chat` pins to the newest message and
 * watches `characterData` so a streaming answer stays in view. Doing that here
 * would yank a reader off the comment they are replying to the moment anyone
 * else posts. So: adding a comment runs `_syncItems()`, which touches the empty
 * state and the item roles and nothing else. There is no `MutationObserver`, no
 * `scrollIntoView`, and the single `scrollTop` write in this file is the
 * restore half of a read/restore pair across an attribute-driven re-render —
 * it puts the reader back exactly where they were rather than moving them.
 *
 * **The composer is part of the component and sits above the list.** Chat's
 * footer is a bare slot below the transcript, because in a conversation the
 * newest thing and the thing you are writing are the same place. A review
 * composer belongs at the top, next to the target it is commenting on, so it
 * does not drift away as the thread grows.
 *
 * **Submitting does not clear the field.** The event is a request, not an
 * outcome: the host may reject it, the network may fail, and a composer that
 * empties itself optimistically loses the text. The host calls `accept()` once
 * the comment is really stored — which is also what appends it to the list.
 *
 * **The event is `comment`, not `submit`.** `emit()` dispatches composed,
 * bubbling events, and a composed `submit` reaching an ancestor `<form>`'s
 * listener is indistinguishable from a real form submission.
 *
 * **`role="listitem"` is set on the slotted children.** A `role="list"` whose
 * children are custom elements exposes no items, so the assigned elements are
 * given the role explicitly. This is the deliberate opposite of the accidental
 * `role` that D3 renames on `ga-chat-message`: children that already declare a
 * role of their own are left alone.
 *
 * Attributes:
 *   anchor        what a new comment will attach to (drives the target line)
 *   label         accessible name for the list (default "Comments")
 *   empty-text    shown when the thread has no comments
 *   placeholder   composer placeholder
 *   submit-label  composer button text (default "Comment")
 *   error         a message from the host, shown under the composer
 *   busy          boolean — a submission is in flight; the composer locks
 *   height        CSS length; when set the list scrolls inside it
 *
 * Slots: (default) — the comments.
 * Events: `comment` with { value, anchor }.
 * Parts: shell, composer, target, field, actions, hint, submit, error, list,
 *        empty.
 */
export class GaCommentThread extends GaElement {
  static observed = [
    "anchor", "label", "empty-text", "placeholder",
    "submit-label", "error", "busy", "height",
  ];

  static styles = /* css */ `
    :host { display: block; }

    .shell {
      display: flex;
      flex-direction: column;
      gap: var(--ga-space-4, 16px);
      min-height: 0;
    }

    /* ---- Composer — first in the DOM, so it is also first in the tab order. */
    .composer {
      display: flex;
      flex-direction: column;
      gap: var(--ga-space-2, 8px);
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius-lg, 8px);
      padding: var(--ga-space-3, 12px);
    }
    .target {
      font-size: var(--ga-fs-xs, 12px);
      color: var(--ga-muted, #878787);
      overflow-wrap: anywhere;
    }
    .target b { color: var(--ga-fg, #ededed); font-weight: 600; }
    .target[hidden] { display: none; }

    textarea {
      width: 100%;
      min-height: 72px;
      resize: vertical;
      font-family: inherit;
      font-size: var(--ga-fs-sm, 14px);
      line-height: 1.55;
      color: var(--ga-fg, #ededed);
      background: var(--ga-bg, #000);
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius, 6px);
      padding: 10px 12px;
      transition: border-color var(--ga-transition, 0.18s ease),
        box-shadow var(--ga-transition, 0.18s ease);
    }
    textarea::placeholder { color: var(--ga-dim, #454545); }
    textarea:hover { border-color: var(--ga-muted, #878787); }
    textarea:focus {
      outline: none;
      border-color: var(--ga-accent, #54a2ff);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--ga-accent, #54a2ff) 25%, transparent);
    }
    textarea:disabled { opacity: 0.55; cursor: not-allowed; }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--ga-space-3, 12px);
    }
    .hint {
      font-size: var(--ga-fs-xs, 12px);
      color: var(--ga-dim, #454545);
    }
    .hint kbd {
      font-family: var(--ga-font-mono, ui-monospace, monospace);
      font-size: 11px;
    }
    .submit {
      margin-left: auto;
      font-family: inherit;
      font-size: var(--ga-fs-sm, 14px);
      font-weight: 500;
      line-height: 1;
      color: var(--ga-accent-contrast, #000);
      background: var(--ga-fg, #ededed);
      border: 1px solid var(--ga-fg, #ededed);
      border-radius: var(--ga-radius, 6px);
      padding: 9px 14px;
      cursor: pointer;
      transition: opacity var(--ga-transition, 0.18s ease);
    }
    .submit:disabled { opacity: 0.45; cursor: not-allowed; }
    .submit:focus-visible {
      outline: none;
      box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
    }
    .error {
      font-size: var(--ga-fs-xs, 12px);
      color: var(--ga-red, #ff6568);
    }

    /* ---- List. No live region, no follow. -------------------------------- */
    .list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--ga-space-3, 12px);
      min-height: 0;
    }
    :host([height]) .list {
      max-height: var(--ga-thread-height, none);
      overflow-y: auto;
      overscroll-behavior: contain;
      /* Explicitly the browser default, restated because it is the mechanism
         that keeps the reader in place when a comment lands above the
         viewport. Nothing here overrides it with a manual scroll. */
      overflow-anchor: auto;
    }

    .empty {
      font-size: var(--ga-fs-sm, 14px);
      color: var(--ga-muted, #878787);
      text-align: center;
      border: 1px dashed var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius-lg, 8px);
      padding: var(--ga-space-6, 24px) var(--ga-space-4, 16px);
    }
    .empty[hidden] { display: none; }
  `;

  constructor() {
    super();
    // The draft lives on the instance, not in the DOM: a host-driven attribute
    // change re-renders the shadow tree, and the reader's half-written comment
    // must survive that. It is never reflected to an attribute — that would
    // re-render on every keystroke and drop the caret.
    this._draft = "";
  }

  template() {
    const anchor = this.attr("anchor");
    const error = this.attr("error");
    const busy = this.hasFlag("busy");
    const height = this.attr("height");

    return /* html */ `
      <div class="shell" part="shell"${height ? ` style="--ga-thread-height:${esc(height)}"` : ""}>
        <div class="composer" part="composer">
          <p class="target" part="target"${anchor ? "" : " hidden"}>
            Commenting on <b>${esc(anchor)}</b>
          </p>
          <textarea part="field" rows="3"
            placeholder="${esc(this.attr("placeholder", "Leave a comment…"))}"
            aria-label="${esc(anchor ? `Comment on ${anchor}` : "Comment")}"
            ${error ? `aria-invalid="true" aria-describedby="composer-error"` : ""}
            ${busy ? "disabled" : ""}></textarea>
          <div class="actions" part="actions">
            <span class="hint" part="hint"><kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Enter</kbd> to submit</span>
            <button class="submit" part="submit" type="button" disabled>
              ${esc(this.attr("submit-label", "Comment"))}
            </button>
          </div>
          ${error ? `<p class="error" part="error" id="composer-error">${esc(error)}</p>` : ""}
        </div>

        <div class="list" part="list" role="list"
          aria-label="${esc(this.attr("label", "Comments"))}">
          <slot></slot>
        </div>

        <p class="empty" part="empty" hidden>${esc(this.attr("empty-text", "No comments yet."))}</p>
      </div>
    `;
  }

  render() {
    // A re-render rebuilds the scroll container, which would otherwise silently
    // return the reader to the top. Read the position before, restore it after:
    // the only two lines in this file that know scrollTop exists.
    const previous = this.$(".list")?.scrollTop ?? 0;

    super.render();

    const field = /** @type {HTMLTextAreaElement | null} */ (this.$("textarea"));
    const submit = /** @type {HTMLButtonElement | null} */ (this.$(".submit"));
    if (!field || !submit) return;

    field.value = this._draft;
    this._syncSubmit();

    field.addEventListener("input", () => {
      this._draft = field.value;
      this._syncSubmit();
    });
    field.addEventListener("keydown", (e) => {
      // Cmd on macOS, Ctrl elsewhere — accept either rather than sniffing the
      // platform, which gets external keyboards wrong.
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        this._submit();
      }
    });
    submit.addEventListener("click", () => this._submit());

    this.shadowRoot.querySelector("slot")
      ?.addEventListener("slotchange", () => this._syncItems());

    const list = this.$(".list");
    if (list) list.scrollTop = previous;

    this._syncItems();
  }

  /** Elements the host slotted in — the comments, whatever tag they use. */
  _items() {
    const slot = /** @type {HTMLSlotElement | null} */ (this.shadowRoot.querySelector("slot"));
    return slot ? slot.assignedElements({ flatten: true }) : [];
  }

  /**
   * The whole of "a comment arrived": show or hide the empty state, and make
   * sure the items expose themselves as list items. Note what is absent —
   * nothing here reads or writes the scroll position, and nothing re-renders.
   */
  _syncItems() {
    const items = this._items();
    const empty = this.$(".empty");
    if (empty) empty.hidden = items.length > 0;
    for (const el of items) {
      if (!el.hasAttribute("role")) el.setAttribute("role", "listitem");
    }
  }

  _syncSubmit() {
    const submit = /** @type {HTMLButtonElement | null} */ (this.$(".submit"));
    if (submit) submit.disabled = this.hasFlag("busy") || this._draft.trim() === "";
  }

  /** Ask the host to store the draft. Whitespace is not a comment. */
  _submit() {
    const value = this._draft.trim();
    if (!value || this.hasFlag("busy")) return;
    this.emit("comment", { value, anchor: this.attr("anchor") || null });
  }

  /**
   * The host confirms the comment was stored. This is the only thing that
   * empties the composer — see the note above on why submitting does not.
   */
  accept() {
    this._draft = "";
    const field = /** @type {HTMLTextAreaElement | null} */ (this.$("textarea"));
    if (field) field.value = "";
    this._syncSubmit();
  }

  /** The draft text, readable and settable by the host (e.g. to restore one). */
  get value() { return this._draft; }
  /** @param {string} v */
  set value(v) {
    this._draft = v == null ? "" : String(v);
    const field = /** @type {HTMLTextAreaElement | null} */ (this.$("textarea"));
    if (field) field.value = this._draft;
    this._syncSubmit();
  }
}

define("ga-comment-thread", GaCommentThread);
