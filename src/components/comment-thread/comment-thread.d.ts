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
    static observed: string[];
    _draft: string;
    /** Elements the host slotted in — the comments, whatever tag they use. */
    _items(): Element[];
    /**
     * The whole of "a comment arrived": show or hide the empty state, and make
     * sure the items expose themselves as list items. Note what is absent —
     * nothing here reads or writes the scroll position, and nothing re-renders.
     */
    _syncItems(): void;
    _syncSubmit(): void;
    /** Ask the host to store the draft. Whitespace is not a comment. */
    _submit(): void;
    /**
     * The host confirms the comment was stored. This is the only thing that
     * empties the composer — see the note above on why submitting does not.
     */
    accept(): void;
    /** @param {string} v */
    set value(v: string);
    /** The draft text, readable and settable by the host (e.g. to restore one). */
    get value(): string;
}
import { GaElement } from "../../core/base-element.js";
