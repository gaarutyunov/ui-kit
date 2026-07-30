/**
 * `<ga-combobox>` — a text field with an asynchronous suggestion list.
 * Form-associated: participates in native <form> submission via ElementInternals.
 *
 *   <ga-combobox label="City" placeholder="Start typing…"></ga-combobox>
 *
 *   box.addEventListener("filter", async (e) => {
 *     box.loading = true;
 *     box.options = await search(e.detail.text);
 *     box.loading = false;
 *   });
 *
 * This is `ga-select`'s free-text sibling and shares its machinery: the same
 * `createPopup` for the anchored, top-layer panel, and the same listbox rows,
 * roving `aria-activedescendant` and disabled-skipping keyboard model. Three
 * things differ, and each difference is the reason the element exists rather
 * than being a `filterable` flag on `ga-select`:
 *
 *   - **Nothing is filtered locally.** `ga-select` narrows its own options by
 *     substring; here the host owns matching. A server that answers "sf" with
 *     "San Francisco" would have its own result filtered back out by a local
 *     substring pass, so the option list is rendered exactly as supplied.
 *   - **New options never re-render the tree.** The host replaces `options`
 *     *while the user is typing*, and a full re-render would recreate the very
 *     input that has focus — dropping the caret mid-word. `options` and
 *     `loading` therefore repaint the rows only.
 *   - **Tab does not commit the active suggestion.** In a select the highlight
 *     is the value; here the typed text is, and silently swapping it for a
 *     suggestion the user merely arrowed past would change what they wrote.
 *
 * `loading` exists for the same reason the debounce does: between a keystroke
 * and the host's answer there are no options, and without a pending state the
 * field would flash "No results" on every letter.
 *
 * Value model: the field's **text** is what the user sees; `value` is what is
 * committed. Choosing a suggestion puts its `label` in the field and its
 * `value` on the element, so an id-backed list keeps its id. Free text commits
 * as itself. Committing happens on Enter, on choosing, and on blur.
 *
 * Attributes:
 *   options (JSON: { value, label, disabled? }[]), value, label, placeholder,
 *   hint, error, name, debounce (ms), no-results-text, loading-text,
 *   loading, disabled, required (boolean)
 *
 * Slots: (default) — `<option>` elements, a static alternative to `options`.
 *
 * Events:
 *   `filter` — debounced typing. detail: { text }. Answer it by replacing
 *              `options`; this is the async hook.
 *   `input`  — every keystroke, undebounced. detail: { text }.
 *   `change` — a value was committed. detail: { value, label }.
 */
export class GaCombobox extends GaElement {
    static formAssociated: boolean;
    static observed: string[];
    _internals: ElementInternals;
    _open: boolean;
    _active: number;
    _text: any;
    _label: any;
    _filterTimer: number;
    _popup: {
        show: () => void;
        close: () => void;
        reposition: () => void;
        readonly open: boolean;
        destroy(): void;
    } | null;
    _reflecting: boolean;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    /**
     * The suggestions exactly as the host supplied them, falling back to slotted
     * `<option>`s. Deliberately unfiltered — see the note on the class.
     */
    _options(): {
        value: string;
        label: string;
        description: string;
        disabled: boolean;
    }[];
    /** The label the committed value reads as. */
    _labelForValue(): any;
    /** The text the field should show: what was typed, else the committed value. */
    _fieldText(): any;
    /**
     * The rows alone, so a new batch of suggestions can be painted without
     * touching the input. The pending and empty states are `role="option"`
     * because a `role="listbox"` may only contain options — they are inert, and
     * the keyboard never reaches them since neither is in `_options()`.
     */
    _rows(): string;
    disconnectedCallback(): void;
    _bindRows(): void;
    /** A fresh batch of suggestions arrived: repaint rows, keep the caret. */
    _onOptionsChanged(): void;
    /** Repaint only the rows — keeps the input's focus and caret position. */
    _repaintRows(): void;
    _openPanel(): void;
    _close(): void;
    /** Reflect open state without re-rendering, which would drop focus. */
    _syncOpenState(): void;
    _syncActive(): void;
    _onInput(text: any): void;
    _onKeyDown(e: any): void;
    /** Move `dir` steps from the active row, skipping disabled options. */
    _move(dir: any, options: any): void;
    /** Jump to `index`, then skip on in `dir` if it landed on a disabled row. */
    _moveTo(index: any, options: any, dir: any): void;
    /** A suggestion was chosen: its label goes in the field, its value on us. */
    _choose(value: any): void;
    /**
     * Enter or blur on free text: the text is both the value and the label.
     * A no-op when the field still reads as the committed value — which is the
     * case straight after choosing a suggestion, so blurring afterwards must not
     * overwrite the chosen value with its own label.
     */
    _commitText(): void;
    /** Escape on a closed listbox empties the field, as on a native search box. */
    _clear(): void;
    _setValue(value: any, label: any): void;
    /** A pointerdown on a row prevents this, so blur means focus really left. */
    _onBlur(): void;
    set value(v: string);
    /** @returns {string} the committed value. */
    get value(): string;
    /** @returns {string} the field's current text, typed or not yet committed. */
    get text(): string;
    set options(list: {
        value: string;
        label: string;
        description: string;
        disabled: boolean;
    }[]);
    /** @returns {{ value: string, label: string, description: string, disabled: boolean }[]} */
    get options(): {
        value: string;
        label: string;
        description: string;
        disabled: boolean;
    }[];
    set loading(on: boolean);
    /** @returns {boolean} whether the host is fetching suggestions. */
    get loading(): boolean;
}
import { GaElement } from "../../core/base-element.js";
