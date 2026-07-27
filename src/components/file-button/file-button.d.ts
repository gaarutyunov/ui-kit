/**
 * `<ga-file-button>` — a compact control that opens the file dialog.
 *
 * The same job as `<ga-file-drop>`, in the places a 100px dashed drop area does
 * not fit: a toolbar, a table row, next to an existing field. It therefore
 * emits the **same `files` event** — `{ files: File[] }` — so a host can swap
 * one for the other, or offer both, without touching its handler.
 *
 * It composes `<ga-button>` rather than restyling a button of its own: this is
 * a button, and it should pick up the kit's variants, sizes, focus ring and
 * hover treatment as they evolve instead of drifting from them. The native
 * `<input type="file">` stays hidden and is only ever clicked programmatically
 * — the native control's own widget cannot be styled and is not keyboard
 * reachable once hidden, whereas the button is focusable and activates on
 * Enter/Space.
 *
 * Attributes:
 *   accept    string — passed to the native file input (filters the dialog)
 *   multiple  boolean — allow multiple files
 *   label     string — button text (default "Choose file")
 *
 * Events: `files` with { files: File[] } — identical to `<ga-file-drop>`.
 */
export class GaFileButton extends GaElement {
    static observed: string[];
    _emit(fileList: any): void;
}
import { GaElement } from "../../core/base-element.js";
