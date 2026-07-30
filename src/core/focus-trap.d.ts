/** Tab stops inside `host`, in the order the user actually meets them. */
export function focusables(host: any): any[];
/**
 * Attach or detach `host`'s trap in one call.
 *
 * The overlays re-evaluate their state on every render, so this has to be safe
 * to call repeatedly; the trap is allocated lazily so a panel that never traps
 * never pays for one.
 *
 * @param {HTMLElement} host
 * @param {boolean} shouldTrap
 */
export function syncFocusTrap(host: HTMLElement, shouldTrap: boolean): void;
export class FocusTrap {
    /** @param {HTMLElement} host the overlay element the trap is confined to */
    constructor(host: HTMLElement);
    host: HTMLElement;
    active: boolean;
    /** @type {Element | null} */
    _opener: Element | null;
    /** @type {((e: KeyboardEvent) => void) | null} */
    _key: ((e: KeyboardEvent) => void) | null;
    /** Idempotent, because the overlays call this from every render. */
    activate(): void;
    release(): void;
    _onKey(e: any): void;
}
