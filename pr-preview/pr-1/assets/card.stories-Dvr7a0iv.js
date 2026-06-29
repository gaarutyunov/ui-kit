const v={title:"Components/Card",component:"ga-card",tags:["autodocs"],argTypes:{interactive:{control:"boolean"},padding:{control:"inline-radio",options:["none","sm","md","lg"]},href:{control:"text"}},args:{interactive:!1,padding:"md",href:""}},e={render:({interactive:m,padding:u,href:t})=>`
    <ga-card style="max-width:360px" padding="${u}"
      ${m?"interactive":""} ${t?`href="${t}"`:""}>
      <h3 style="margin:0 0 8px; font-size:18px;">Depth from a single photo</h3>
      <p style="margin:0; color:var(--ga-muted);">
        Convert any flat image into a stereoscopic 3D pair, entirely in your browser.
      </p>
    </ga-card>
  `},r={render:()=>`
    <ga-card style="max-width:360px">
      <span slot="header">Project</span>
      <p style="margin:0; color:var(--ga-muted);">
        A buildless set of static ES modules — no bundler, no install step.
      </p>
      <div slot="footer">Updated 2 days ago</div>
    </ga-card>
  `},a={render:()=>`
    <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:16px; max-width:560px;">
      <ga-card interactive>
        <strong>stereoscope</strong>
        <p style="margin:6px 0 0; color:var(--ga-muted); font-size:14px;">WebGPU depth estimation</p>
      </ga-card>
      <ga-card interactive>
        <strong>garutyunov.com</strong>
        <p style="margin:6px 0 0; color:var(--ga-muted); font-size:14px;">Next.js portfolio</p>
      </ga-card>
    </div>
  `};var n,o,s;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: ({
    interactive,
    padding,
    href
  }) => \`
    <ga-card style="max-width:360px" padding="\${padding}"
      \${interactive ? "interactive" : ""} \${href ? \`href="\${href}"\` : ""}>
      <h3 style="margin:0 0 8px; font-size:18px;">Depth from a single photo</h3>
      <p style="margin:0; color:var(--ga-muted);">
        Convert any flat image into a stereoscopic 3D pair, entirely in your browser.
      </p>
    </ga-card>
  \`
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var i,d,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => \`
    <ga-card style="max-width:360px">
      <span slot="header">Project</span>
      <p style="margin:0; color:var(--ga-muted);">
        A buildless set of static ES modules — no bundler, no install step.
      </p>
      <div slot="footer">Updated 2 days ago</div>
    </ga-card>
  \`
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var c,g,l;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:16px; max-width:560px;">
      <ga-card interactive>
        <strong>stereoscope</strong>
        <p style="margin:6px 0 0; color:var(--ga-muted); font-size:14px;">WebGPU depth estimation</p>
      </ga-card>
      <ga-card interactive>
        <strong>garutyunov.com</strong>
        <p style="margin:6px 0 0; color:var(--ga-muted); font-size:14px;">Next.js portfolio</p>
      </ga-card>
    </div>
  \`
}`,...(l=(g=a.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};const x=["Basic","WithHeaderFooter","Interactive"];export{e as Basic,a as Interactive,r as WithHeaderFooter,x as __namedExportsOrder,v as default};
