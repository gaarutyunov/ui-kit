const p={title:"Components/Alert",component:"ga-alert",tags:["autodocs"],argTypes:{tone:{control:"select",options:["neutral","info","success","warning","danger"]},title:{control:"text"},dismissible:{control:"boolean"},body:{control:"text"}},args:{tone:"info",title:"Heads up",dismissible:!1,body:"Your browser supports WebGPU — local depth estimation is available."}},e={render:({tone:i,title:d,dismissible:c,body:g})=>`<ga-alert tone="${i}" title="${d}" ${c?"dismissible":""}>${g}</ga-alert>`},t={render:()=>`
    <div style="display:flex; flex-direction:column; gap:12px; max-width:480px;">
      <ga-alert tone="info" title="Info">Local processing is available.</ga-alert>
      <ga-alert tone="success" title="Success">Export complete — 3D pair saved.</ga-alert>
      <ga-alert tone="warning" title="Warning">Large images may take a while.</ga-alert>
      <ga-alert tone="danger" title="Error" dismissible>Could not load the depth model.</ga-alert>
    </div>
  `};var a,r,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: ({
    tone,
    title,
    dismissible,
    body
  }) => \`<ga-alert tone="\${tone}" title="\${title}" \${dismissible ? "dismissible" : ""}>\${body}</ga-alert>\`
}`,...(o=(r=e.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};var s,l,n;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; flex-direction:column; gap:12px; max-width:480px;">
      <ga-alert tone="info" title="Info">Local processing is available.</ga-alert>
      <ga-alert tone="success" title="Success">Export complete — 3D pair saved.</ga-alert>
      <ga-alert tone="warning" title="Warning">Large images may take a while.</ga-alert>
      <ga-alert tone="danger" title="Error" dismissible>Could not load the depth model.</ga-alert>
    </div>
  \`
}`,...(n=(l=t.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};const m=["Playground","Tones"];export{e as Playground,t as Tones,m as __namedExportsOrder,p as default};
