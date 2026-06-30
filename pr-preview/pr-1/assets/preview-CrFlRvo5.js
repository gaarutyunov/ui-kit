var y=Object.defineProperty;var _=(r,a,e)=>a in r?y(r,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[a]=e;var t=(r,a,e)=>_(r,typeof a!="symbol"?a+"":a,e);const w=`
  :host {
    box-sizing: border-box;
    font-family: var(--ga-font-sans, ui-sans-serif, system-ui, sans-serif);
  }
  :host([hidden]) { display: none !important; }
  *, *::before, *::after { box-sizing: inherit; }
  @media (prefers-reduced-motion: reduce) {
    * { transition-duration: 0.001ms !important; animation-duration: 0.001ms !important; }
  }
`;class i extends HTMLElement{static get observedAttributes(){return this.observed}static get _css(){return Object.prototype.hasOwnProperty.call(this,"_cssCache")||(this._cssCache=w+(this.styles||"")),this._cssCache}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0}),this._mounted=!1}connectedCallback(){this._mounted=!0,this.render()}attributeChangedCallback(){this._mounted&&this.render()}template(){return""}render(){this.shadowRoot.innerHTML="<style>"+this.constructor._css+"</style>"+this.template()}$(a){return this.shadowRoot.querySelector(a)}emit(a,e){this.dispatchEvent(new CustomEvent(a,{detail:e,bubbles:!0,composed:!0}))}hasFlag(a){return this.hasAttribute(a)}attr(a,e=""){return this.getAttribute(a)??e}}t(i,"styles",""),t(i,"observed",[]);function n(r,a){customElements.get(r)||customElements.define(r,a)}function o(r){return String(r??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}class h extends i{constructor(){super(...arguments);t(this,"_guard",e=>{(this.hasFlag("disabled")||this.hasFlag("loading"))&&(e.stopImmediatePropagation(),e.preventDefault())})}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._guard,!0)}disconnectedCallback(){this.removeEventListener("click",this._guard,!0)}template(){const e=this.attr("href"),s=e?"a":"button",l=e?`href="${o(e)}"`:`type="button"${this.hasFlag("disabled")?" disabled":""}`,c=this.hasFlag("loading")?'<span class="spinner" aria-hidden="true"></span>':"";return`
      <${s} class="btn" part="button" ${l}>
        <slot name="start"></slot>
        ${c}
        <slot></slot>
        <slot name="end"></slot>
      </${s}>
    `}}t(h,"observed",["variant","size","href","disabled","loading","block"]),t(h,"styles",`
    :host { display: inline-block; }
    :host([block]) { display: block; }

    .btn {
      --_bg: var(--ga-bg-elev, #1a1a1a);
      --_fg: var(--ga-fg, #ededed);
      --_bd: var(--ga-border-strong, #2a2a2a);
      --_bg-hover: var(--ga-bg-elev-hover, #1f1f1f);

      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ga-space-2, 8px);
      width: 100%;
      font-family: inherit;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid var(--_bd);
      border-radius: var(--ga-radius, 6px);
      background: var(--_bg);
      color: var(--_fg);
      transition: background var(--ga-transition, 0.18s ease),
        border-color var(--ga-transition, 0.18s ease),
        filter var(--ga-transition, 0.18s ease),
        transform var(--ga-transition, 0.18s ease);
    }
    .btn:hover { background: var(--_bg-hover); }
    .btn:active { transform: translateY(1px); }
    .btn:focus-visible {
      outline: none;
      box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
    }

    /* sizes */
    :host([size="sm"]) .btn { font-size: var(--ga-fs-sm, 14px); padding: 6px 12px; height: 32px; }
    .btn { font-size: var(--ga-fs-sm, 14px); padding: 8px 16px; height: 40px; }
    :host([size="lg"]) .btn { font-size: var(--ga-fs-base, 17px); padding: 12px 22px; height: 48px; }

    /* variants */
    :host([variant="primary"]) .btn {
      --_bg: var(--ga-accent, #54a2ff);
      --_fg: var(--ga-accent-contrast, #000);
      --_bd: var(--ga-accent, #54a2ff);
    }
    :host([variant="primary"]) .btn:hover { background: var(--ga-accent, #54a2ff); filter: brightness(1.1); }

    :host([variant="ghost"]) .btn {
      --_bg: transparent;
      --_bd: transparent;
    }
    :host([variant="ghost"]) .btn:hover { background: var(--ga-bg-elev, #1a1a1a); }

    :host([variant="danger"]) .btn {
      --_bg: transparent;
      --_fg: var(--ga-red, #ff6568);
      --_bd: color-mix(in srgb, var(--ga-red, #ff6568) 40%, transparent);
    }
    :host([variant="danger"]) .btn:hover {
      background: color-mix(in srgb, var(--ga-red, #ff6568) 12%, transparent);
    }

    :host([disabled]) .btn,
    :host([loading]) .btn {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }

    .spinner {
      width: 1em; height: 1em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    ::slotted([slot="start"]), ::slotted([slot="end"]) { display: inline-flex; }
  `);n("ga-button",h);class b extends i{template(){return'<span class="badge" part="badge"><slot></slot></span>'}}t(b,"observed",["color","solid","size"]),t(b,"styles",`
    :host { display: inline-block; }
    .badge {
      --_c: var(--ga-muted, #878787);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--ga-font-mono, ui-monospace, monospace);
      font-size: var(--ga-fs-xs, 12px);
      font-weight: 500;
      line-height: 1;
      letter-spacing: 0.01em;
      padding: 4px 8px;
      border-radius: var(--ga-radius-full, 9999px);
      border: 1px solid color-mix(in srgb, var(--_c) 35%, transparent);
      color: var(--_c);
      background: color-mix(in srgb, var(--_c) 12%, transparent);
      white-space: nowrap;
    }
    :host([size="sm"]) .badge { font-size: 10px; padding: 2px 6px; }

    :host([color="blue"])   .badge { --_c: var(--ga-blue, #54a2ff); }
    :host([color="green"])  .badge { --_c: var(--ga-green, #00c758); }
    :host([color="amber"])  .badge { --_c: var(--ga-amber, #fcbb00); }
    :host([color="purple"]) .badge { --_c: var(--ga-purple, #ac4bff); }
    :host([color="red"])    .badge { --_c: var(--ga-red, #ff6568); }

    :host([solid]) .badge {
      background: var(--_c);
      color: var(--ga-accent-contrast, #000);
      border-color: var(--_c);
    }
  `);n("ga-badge",b);class v extends i{connectedCallback(){super.connectedCallback(),this._sync=()=>this._toggleSlots(),this.shadowRoot.addEventListener("slotchange",this._sync)}_toggleSlots(){for(const a of["header","footer"]){const e=this.$(`slot[name="${a}"]`),s=this.$(`.${a}`);e&&s&&s.classList.toggle("show",e.assignedNodes().length>0)}}template(){const a=this.attr("href"),e=a?"a":"div",s=a?`href="${a}"`:"";return`
      <${e} class="card" part="card" ${s}>
        <div class="header" part="header"><slot name="header"></slot></div>
        <div class="body" part="body"><slot></slot></div>
        <div class="footer" part="footer"><slot name="footer"></slot></div>
      </${e}>
    `}}t(v,"observed",["interactive","href","padding"]),t(v,"styles",`
    :host { display: block; }
    .card {
      display: flex;
      flex-direction: column;
      color: var(--ga-fg, #ededed);
      text-decoration: none;
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border, #1a1a1a);
      border-radius: var(--ga-radius-lg, 12px);
      overflow: hidden;
      transition: background var(--ga-transition, 0.18s ease),
        border-color var(--ga-transition, 0.18s ease),
        transform var(--ga-transition, 0.18s ease),
        box-shadow var(--ga-transition, 0.18s ease);
    }
    :host([interactive]) .card,
    :host([href]) .card { cursor: pointer; }
    :host([interactive]) .card:hover,
    :host([href]) .card:hover {
      background: var(--ga-bg-elev-hover, #1f1f1f);
      border-color: var(--ga-border-strong, #2a2a2a);
      transform: translateY(-2px);
      box-shadow: var(--ga-shadow, 0 8px 24px rgba(0,0,0,0.4));
    }
    :host([href]) .card:focus-visible {
      outline: none;
      box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
    }

    .body { padding: var(--ga-space-6, 24px); }
    :host([padding="none"]) .body { padding: 0; }
    :host([padding="sm"]) .body { padding: var(--ga-space-3, 12px); }
    :host([padding="lg"]) .body { padding: var(--ga-space-8, 32px); }

    .header, .footer { display: none; }
    .header.show, .footer.show { display: block; }
    .header {
      padding: var(--ga-space-4, 16px) var(--ga-space-6, 24px);
      border-bottom: 1px solid var(--ga-border, #1a1a1a);
      font-weight: 600;
    }
    .footer {
      padding: var(--ga-space-4, 16px) var(--ga-space-6, 24px);
      border-top: 1px solid var(--ga-border, #1a1a1a);
      color: var(--ga-muted, #878787);
      font-size: var(--ga-fs-sm, 14px);
    }
  `);n("ga-card",v);class u extends i{_initials(a){return a.trim().split(/\s+/).slice(0,2).map(s=>{var l;return((l=s[0])==null?void 0:l.toUpperCase())??""}).join("")||"?"}template(){const a=this.attr("src"),e=this.attr("name",""),s=a?`<img src="${o(a)}" alt="${o(e)}" loading="lazy" />`:`<span aria-hidden="true">${o(this._initials(e))}</span>`;return`<div class="avatar" part="avatar" role="img" aria-label="${o(e)}">${s}</div>`}}t(u,"observed",["src","name","size","square"]),t(u,"styles",`
    :host { display: inline-block; }
    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px; height: 40px;
      overflow: hidden;
      font-family: var(--ga-font-mono, ui-monospace, monospace);
      font-size: var(--ga-fs-sm, 14px);
      font-weight: 600;
      color: var(--ga-fg, #ededed);
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius-full, 9999px);
      user-select: none;
    }
    :host([square]) .avatar { border-radius: var(--ga-radius, 6px); }
    :host([size="sm"]) .avatar { width: 28px; height: 28px; font-size: 11px; }
    :host([size="lg"]) .avatar { width: 64px; height: 64px; font-size: var(--ga-fs-lg, 20px); }
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
  `);n("ga-avatar",u);class g extends i{constructor(){var a;super(),this._internals=(a=this.attachInternals)==null?void 0:a.call(this)}template(){const a=this.attr("label"),e=this.attr("error"),s=this.attr("hint"),l=this.hasFlag("required")?'<span class="req">*</span>':"";return`
      <div class="field">
        ${a?`<label part="label">${o(a)}${l}</label>`:""}
        <input
          part="input"
          type="${o(this.attr("type","text"))}"
          placeholder="${o(this.attr("placeholder"))}"
          value="${o(this.attr("value"))}"
          ${this.hasFlag("disabled")?"disabled":""}
          ${this.hasFlag("required")?"required":""}
          aria-invalid="${e?"true":"false"}"
        />
        ${e?`<span class="error" part="error">${o(e)}</span>`:s?`<span class="hint" part="hint">${o(s)}</span>`:""}
      </div>
    `}render(){super.render();const a=this.$("input");a&&(a.addEventListener("input",()=>{var e;this._value=a.value,(e=this._internals)==null||e.setFormValue(a.value),this.emit("input",{value:a.value})}),a.addEventListener("change",()=>this.emit("change",{value:a.value})))}get value(){var a;return((a=this.$("input"))==null?void 0:a.value)??this._value??this.attr("value")}set value(a){this._value=a,this.setAttribute("value",a)}}t(g,"formAssociated",!0),t(g,"observed",["label","placeholder","type","value","name","hint","error","disabled","required"]),t(g,"styles",`
    :host { display: block; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    label {
      font-size: var(--ga-fs-sm, 14px);
      font-weight: 500;
      color: var(--ga-fg, #ededed);
    }
    .req { color: var(--ga-red, #ff6568); margin-left: 2px; }
    input {
      width: 100%;
      font-family: inherit;
      font-size: var(--ga-fs-sm, 14px);
      color: var(--ga-fg, #ededed);
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius, 6px);
      padding: 10px 12px;
      transition: border-color var(--ga-transition, 0.18s ease),
        box-shadow var(--ga-transition, 0.18s ease);
    }
    input::placeholder { color: var(--ga-dim, #454545); }
    input:hover { border-color: var(--ga-muted, #878787); }
    input:focus {
      outline: none;
      border-color: var(--ga-accent, #54a2ff);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--ga-accent, #54a2ff) 25%, transparent);
    }
    :host([disabled]) input { opacity: 0.5; cursor: not-allowed; }
    .hint { font-size: var(--ga-fs-xs, 12px); color: var(--ga-muted, #878787); }
    .error { font-size: var(--ga-fs-xs, 12px); color: var(--ga-red, #ff6568); }
    :host([error]) input { border-color: var(--ga-red, #ff6568); }
  `);n("ga-input",g);class p extends i{template(){const a=this.hasFlag("checked"),e=this.attr("label");return`
      <label class="wrap">
        <button
          part="track"
          type="button"
          role="switch"
          aria-checked="${a}"
          ${this.hasFlag("disabled")?"disabled":""}
        ><span class="knob" part="knob"></span></button>
        ${e?`<span class="label">${o(e)}</span>`:""}
      </label>
    `}render(){var a;super.render(),(a=this.$("button"))==null||a.addEventListener("click",()=>this.toggle())}toggle(){if(this.hasFlag("disabled"))return;const a=!this.hasFlag("checked");this.toggleAttribute("checked",a),this.emit("change",{checked:a})}get checked(){return this.hasFlag("checked")}set checked(a){this.toggleAttribute("checked",!!a)}}t(p,"formAssociated",!0),t(p,"observed",["checked","disabled","label"]),t(p,"styles",`
    :host { display: inline-block; }
    .wrap {
      display: inline-flex;
      align-items: center;
      gap: var(--ga-space-3, 12px);
      cursor: pointer;
      user-select: none;
    }
    :host([disabled]) .wrap { opacity: 0.5; cursor: not-allowed; }
    button {
      position: relative;
      flex: none;
      width: 40px; height: 24px;
      padding: 0;
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-radius: var(--ga-radius-full, 9999px);
      background: var(--ga-bg-elev, #1a1a1a);
      cursor: inherit;
      transition: background var(--ga-transition, 0.18s ease),
        border-color var(--ga-transition, 0.18s ease);
    }
    button:focus-visible {
      outline: none;
      box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
    }
    .knob {
      position: absolute;
      top: 2px; left: 2px;
      width: 18px; height: 18px;
      border-radius: 50%;
      background: var(--ga-muted, #878787);
      transition: transform var(--ga-transition, 0.18s ease),
        background var(--ga-transition, 0.18s ease);
    }
    :host([checked]) button {
      background: var(--ga-accent, #54a2ff);
      border-color: var(--ga-accent, #54a2ff);
    }
    :host([checked]) .knob {
      transform: translateX(16px);
      background: var(--ga-accent-contrast, #000);
    }
    .label { font-size: var(--ga-fs-sm, 14px); color: var(--ga-fg, #ededed); }
  `);n("ga-switch",p);class f extends i{template(){return'<div class="spinner" part="spinner" role="status" aria-label="Loading"></div>'}}t(f,"observed",["size","color"]),t(f,"styles",`
    :host { display: inline-flex; }
    .spinner {
      width: 20px; height: 20px;
      border: 2px solid color-mix(in srgb, currentColor 25%, transparent);
      border-top-color: currentColor;
      border-radius: 50%;
      color: var(--ga-accent, #54a2ff);
      animation: spin 0.7s linear infinite;
    }
    :host([size="sm"]) .spinner { width: 14px; height: 14px; }
    :host([size="lg"]) .spinner { width: 32px; height: 32px; border-width: 3px; }
    :host([color="green"])  .spinner { color: var(--ga-green, #00c758); }
    :host([color="amber"])  .spinner { color: var(--ga-amber, #fcbb00); }
    :host([color="purple"]) .spinner { color: var(--ga-purple, #ac4bff); }
    :host([color="red"])    .spinner { color: var(--ga-red, #ff6568); }
    :host([color="fg"])     .spinner { color: var(--ga-fg, #ededed); }
    @keyframes spin { to { transform: rotate(360deg); } }
  `);n("ga-spinner",f);class x extends i{template(){const a=this.attr("title"),e=this.hasFlag("dismissible")?'<button class="close" part="close" aria-label="Dismiss">&times;</button>':"";return`
      <div class="alert" part="alert" role="alert">
        <span class="dot" aria-hidden="true"></span>
        <div class="content">
          ${a?`<div class="title" part="title">${o(a)}</div>`:""}
          <slot></slot>
        </div>
        ${e}
      </div>
    `}render(){var a;super.render(),(a=this.$(".close"))==null||a.addEventListener("click",()=>{this.emit("dismiss"),this.remove()})}}t(x,"observed",["tone","title","dismissible"]),t(x,"styles",`
    :host { display: block; }
    .alert {
      --_c: var(--ga-muted, #878787);
      display: flex;
      gap: var(--ga-space-3, 12px);
      padding: var(--ga-space-4, 16px);
      border: 1px solid color-mix(in srgb, var(--_c) 35%, transparent);
      border-left-width: 3px;
      border-radius: var(--ga-radius, 6px);
      background: color-mix(in srgb, var(--_c) 8%, transparent);
      color: var(--ga-fg, #ededed);
      font-size: var(--ga-fs-sm, 14px);
      line-height: 1.5;
    }
    :host([tone="info"])    .alert { --_c: var(--ga-blue, #54a2ff); }
    :host([tone="success"]) .alert { --_c: var(--ga-green, #00c758); }
    :host([tone="warning"]) .alert { --_c: var(--ga-amber, #fcbb00); }
    :host([tone="danger"])  .alert { --_c: var(--ga-red, #ff6568); }

    .dot { flex: none; width: 8px; height: 8px; margin-top: 6px; border-radius: 50%; background: var(--_c); }
    .content { flex: 1; min-width: 0; }
    .title { font-weight: 600; color: var(--_c); margin-bottom: 2px; }
    .close {
      flex: none;
      background: none; border: none; cursor: pointer;
      color: var(--ga-muted, #878787);
      font-size: 18px; line-height: 1; padding: 0 4px;
      transition: color var(--ga-transition, 0.18s ease);
    }
    .close:hover { color: var(--ga-fg, #ededed); }
  `);n("ga-alert",x);class k extends i{template(){return'<kbd part="kbd"><slot></slot></kbd>'}}t(k,"styles",`
    :host { display: inline-block; }
    kbd {
      display: inline-block;
      font-family: var(--ga-font-mono, ui-monospace, monospace);
      font-size: var(--ga-fs-xs, 12px);
      line-height: 1;
      color: var(--ga-muted, #878787);
      background: var(--ga-bg-elev, #1a1a1a);
      border: 1px solid var(--ga-border-strong, #2a2a2a);
      border-bottom-width: 2px;
      border-radius: var(--ga-radius, 6px);
      padding: 4px 7px;
      min-width: 1em;
      text-align: center;
    }
  `);n("ga-kbd",k);class m extends i{_parse(){try{return JSON.parse(this.attr("tabs","[]"))}catch{return[]}}template(){var c;const a=this._parse(),e=this.attr("active")||((c=a[0])==null?void 0:c.id),s=a.map(d=>`
      <button class="tab" part="tab" role="tab" data-id="${o(d.id)}"
        aria-selected="${d.id===e}" tabindex="${d.id===e?"0":"-1"}">
        ${o(d.label)}
      </button>`).join(""),l=a.map(d=>`
      <div role="tabpanel" ${d.id===e?"":"hidden"}>
        <slot name="${o(d.id)}"></slot>
      </div>`).join("");return`
      <div class="list" part="list" role="tablist">${s}</div>
      <div class="panels" part="panels">${l}</div>
    `}render(){super.render(),this.shadowRoot.querySelectorAll(".tab").forEach(a=>{a.addEventListener("click",()=>this._select(a.dataset.id))})}_select(a){a!==this.attr("active")&&(this.setAttribute("active",a),this.emit("change",{id:a}))}}t(m,"observed",["tabs","active"]),t(m,"styles",`
    :host { display: block; }
    .list {
      display: flex;
      gap: var(--ga-space-1, 4px);
      border-bottom: 1px solid var(--ga-border, #1a1a1a);
    }
    .tab {
      position: relative;
      font-family: inherit;
      font-size: var(--ga-fs-sm, 14px);
      font-weight: 500;
      color: var(--ga-muted, #878787);
      background: none;
      border: none;
      padding: 10px 14px;
      cursor: pointer;
      transition: color var(--ga-transition, 0.18s ease);
    }
    .tab:hover { color: var(--ga-fg, #ededed); }
    .tab[aria-selected="true"] { color: var(--ga-fg, #ededed); }
    .tab[aria-selected="true"]::after {
      content: "";
      position: absolute;
      left: 8px; right: 8px; bottom: -1px;
      height: 2px;
      background: var(--ga-accent, #54a2ff);
      border-radius: 2px;
    }
    .tab:focus-visible {
      outline: none;
      box-shadow: var(--ga-ring, 0 0 0 2px #000, 0 0 0 4px #54a2ff);
      border-radius: var(--ga-radius, 6px);
    }
    .panels { padding-top: var(--ga-space-4, 16px); }
  `);n("ga-tabs",m);const z={parameters:{backgrounds:{default:"black",values:[{name:"black",value:"#000000"},{name:"elevated",value:"#1a1a1a"},{name:"light",value:"#ffffff"}]},controls:{matchers:{color:/(background|color)$/i,date:/Date$/i}},options:{storySort:{order:["Introduction","Foundations","Components"]}}},globalTypes:{theme:{description:"Color theme",defaultValue:"dark",toolbar:{title:"Theme",icon:"circlehollow",items:[{value:"dark",title:"Dark"},{value:"light",title:"Light"}],dynamicTitle:!0}}},decorators:[(r,a)=>(document.documentElement.setAttribute("data-theme",a.globals.theme),r())]};export{z as default};
