/**
 * Anchor `panel` to `anchor`.
 *
 * @param {HTMLElement} anchor  the trigger the panel hangs off
 * @param {HTMLElement} panel   the panel element, inside the same shadow root
 * @param {{
 *   onDismiss?: (reason: string) => void,
 *   placement?: "bottom" | "top" | "left" | "right",
 *   matchWidth?: boolean,
 * }} [opts]
 *   `onDismiss` runs when the popup closes for a reason that is not an explicit
 *   `close()` — an outside click, Escape, or the anchor scrolling out of view.
 *   The caller decides what that means (restore focus, commit a value, …).
 *
 *   `placement` is the *preferred* side; the popup flips to the opposite one
 *   when that side cannot hold the panel and the other has more room. Defaults
 *   to `"bottom"`, which is what every consumer written before this option
 *   existed gets.
 *
 *   `matchWidth` forces `min-width` to the anchor's width. Defaults to `true`
 *   — again the pre-existing behaviour. Pass `false` for a panel that should
 *   size to its own content.
 */
export function createPopup(anchor: HTMLElement, panel: HTMLElement, opts?: {
    onDismiss?: (reason: string) => void;
    placement?: "bottom" | "top" | "left" | "right";
    matchWidth?: boolean;
}): {
    show: () => void;
    close: () => void;
    reposition: () => void;
    readonly open: boolean;
    /** Release listeners without invoking onDismiss — for disconnection. */
    destroy(): void;
};
/** Whether this browser has the Popover API. */
export const SUPPORTS_POPOVER: boolean;
