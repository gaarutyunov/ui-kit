/* =========================================================================
   GA UI Kit — universal Web Components.

   Importing this module registers every custom element (`ga-*`) as a side
   effect. Works in any framework or none:

     import "@gaarutyunov/ui-kit";              // register all components
     import "@gaarutyunov/ui-kit/tokens.css";   // optional global theme

   Or cherry-pick a single component:

     import "@gaarutyunov/ui-kit/components/button/button.js";
   ========================================================================= */

export { GaElement, define, esc } from "./core/base-element.js";

import "./components/button/button.js";
import "./components/badge/badge.js";
import "./components/card/card.js";
import "./components/avatar/avatar.js";
import "./components/input/input.js";
import "./components/switch/switch.js";
import "./components/spinner/spinner.js";
import "./components/alert/alert.js";
import "./components/kbd/kbd.js";
import "./components/tabs/tabs.js";

export { GaButton } from "./components/button/button.js";
export { GaBadge } from "./components/badge/badge.js";
export { GaCard } from "./components/card/card.js";
export { GaAvatar } from "./components/avatar/avatar.js";
export { GaInput } from "./components/input/input.js";
export { GaSwitch } from "./components/switch/switch.js";
export { GaSpinner } from "./components/spinner/spinner.js";
export { GaAlert } from "./components/alert/alert.js";
export { GaKbd } from "./components/kbd/kbd.js";
export { GaTabs } from "./components/tabs/tabs.js";
