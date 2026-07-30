import { GaElement, define, esc } from "../../core/base-element.js";
import "../button/button.js";
import "../icon/icon.js";

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
  static observed = ["accept", "multiple", "label"];

  static styles = /* css */ `
    :host { display: inline-block; }
    input { display: none; }
  `;

  template() {
    const label = this.attr("label", "Choose file");
    return /* html */ `
      <ga-button part="button" size="sm">
        <ga-icon slot="start" name="upload" size="16"></ga-icon>
        ${esc(label)}
      </ga-button>
      <input type="file" ${this.hasFlag("multiple") ? "multiple" : ""} accept="${esc(this.attr("accept"))}" />
    `;
  }

  render() {
    super.render();
    const input = this.$("input");
    this.$("ga-button")?.addEventListener("click", () => input.click());
    input.addEventListener("change", () => {
      this._emit(input.files);
      // Clear the selection so picking the *same* file again still fires
      // `change` — the native input stays silent when the value is unchanged.
      input.value = "";
    });
  }

  _emit(fileList) {
    if (fileList && fileList.length) this.emit("files", { files: Array.from(fileList) });
  }
}

define("ga-file-button", GaFileButton);
