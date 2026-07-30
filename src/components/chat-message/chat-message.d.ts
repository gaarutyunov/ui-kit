/**
 * `<ga-chat-message>` — one turn in a transcript.
 *
 *   <ga-chat-message from="user" author="You" time="09:12">Log 3x5 at 100kg</ga-chat-message>
 *   <ga-chat-message from="assistant" state="streaming">Logged. That is…</ga-chat-message>
 *
 * `from` picks the alignment and treatment; `state` says whether the turn is
 * settled. A streaming turn marks its body `aria-live="polite"` so a screen
 * reader hears the text as it arrives, and a pending one is announced once —
 * an assistant turn that silently grows is invisible to anyone not watching.
 *
 * **BREAKING (since v0.3.0): the speaker attribute was `role`; it is now
 * `from`.** The values are unchanged — `user | assistant | system` — and so is
 * everything the component renders. Only the spelling of the attribute moved.
 *
 * The old name was the global ARIA `role` attribute, so every message host
 * literally carried `role="user"` or `role="assistant"`. That was silently
 * harmless only because neither is a real ARIA role token, so browsers dropped
 * them. It stops being harmless the moment the vocabulary grows: `comment`,
 * `note`, `status` and `log` *are* real roles, and a host would start claiming
 * one by accident. Renaming now costs one find-and-replace; renaming after a
 * speaker called `comment` exists costs a bug nobody can see.
 *
 * Attributes:
 *   from (`user` | `assistant` | `system`), state (`sent` | `pending` |
 *   `streaming` | `error`), author, time
 *
 * Slots: (default) — the message body.
 */
export class GaChatMessage extends GaElement {
    static observed: string[];
}
import { GaElement } from "../../core/base-element.js";
