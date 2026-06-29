const g={title:"Foundations/Colors",tags:["autodocs"],parameters:{docs:{description:{component:"The palette shared by garutyunov.com and stereoscope. Every value is exposed as a `--ga-*` custom property in `tokens.css`."}}}},e=(s,r)=>`
  <div style="display:flex; flex-direction:column; gap:6px;">
    <div style="height:64px; border-radius:8px; border:1px solid var(--ga-border-strong);
      background:var(${r});"></div>
    <code style="font-size:12px; color:var(--ga-fg);">${s}</code>
    <code style="font-size:11px; color:var(--ga-muted);">${r}</code>
  </div>
`,a={render:()=>`
    <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:16px;">
      ${e("Background","--ga-bg")}
      ${e("Elevated","--ga-bg-elev")}
      ${e("Elevated hover","--ga-bg-elev-hover")}
      ${e("Foreground","--ga-fg")}
      ${e("Muted","--ga-muted")}
      ${e("Dim","--ga-dim")}
      ${e("Border","--ga-border")}
      ${e("Accent / Blue","--ga-blue")}
      ${e("Green","--ga-green")}
      ${e("Amber","--ga-amber")}
      ${e("Purple","--ga-purple")}
      ${e("Red","--ga-red")}
    </div>
  `};var t,o,d;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:16px;">
      \${swatch("Background", "--ga-bg")}
      \${swatch("Elevated", "--ga-bg-elev")}
      \${swatch("Elevated hover", "--ga-bg-elev-hover")}
      \${swatch("Foreground", "--ga-fg")}
      \${swatch("Muted", "--ga-muted")}
      \${swatch("Dim", "--ga-dim")}
      \${swatch("Border", "--ga-border")}
      \${swatch("Accent / Blue", "--ga-blue")}
      \${swatch("Green", "--ga-green")}
      \${swatch("Amber", "--ga-amber")}
      \${swatch("Purple", "--ga-purple")}
      \${swatch("Red", "--ga-red")}
    </div>
  \`
}`,...(d=(o=a.parameters)==null?void 0:o.docs)==null?void 0:d.source}}};const n=["Palette"];export{a as Palette,n as __namedExportsOrder,g as default};
