/**
 * `<ga-button>` — the kit's primary action element.
 *
 * `size="icon"` is a size rather than a separate `<ga-icon-button>` element so
 * every visual variant keeps applying to a glyph-only button, and a button that
 * later gains a label does not have to change element. Because the glyph alone
 * carries no accessible name, an icon button without `aria-label` or `title`
 * warns in the console — the omission is silent in the browser and is the most
 * common accessibility defect in exactly this shape.
 *
 * Attributes:
 *   variant     "primary" | "secondary" | "ghost" | "danger"  (default secondary)
 *   size        "sm" | "md" | "lg" | "icon"                     (default md)
 *   href        render as a link instead of a button
 *   download    (link) filename hint / force-download           — forwarded to <a>
 *   target      (link) "_blank" | "_self" | …                   — forwarded to <a>
 *   rel         (link) e.g. "noopener noreferrer"               — forwarded to <a>
 *   type        (button) "button" | "submit" | "reset"          — forwarded to <button>
 *   name        (button) form control name                      — forwarded to <button>
 *   aria-label  accessible label                                — forwarded to <a>/<button>
 *   title       (icon size only) tooltip + accessible name      — forwarded to <a>/<button>
 *   disabled    boolean
 *   loading     boolean — shows a spinner and blocks clicks
 *   block       boolean — full width
 *
 * Slots: default (label), `start` / `end` (icons).
 */
export class GaButton extends GaElement {
    static observed: string[];
    disconnectedCallback(): void;
    _guard: (e: any) => void;
    /**
     * An icon button's glyph is decorative to assistive technology, so without
     * `aria-label` or `title` the control has no accessible name at all. Warn the
     * developer once — refusing to render would be worse than a button that is
     * merely unlabelled.
     */
    _warnIfUnnamed(): void;
    _namedChecked: boolean | undefined;
    /** Forward `name` from the host as attribute `out` on the inner element. */
    _pass(name: any, out?: any): string;
}
import { GaElement } from "../../core/base-element.js";
