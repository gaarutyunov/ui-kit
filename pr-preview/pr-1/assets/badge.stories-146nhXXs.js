const x={title:"Components/Badge",component:"ga-badge",tags:["autodocs"],argTypes:{color:{control:"select",options:["default","blue","green","amber","purple","red"]},solid:{control:"boolean"},size:{control:"inline-radio",options:["sm","md"]},label:{control:"text"}},args:{color:"blue",solid:!1,size:"md",label:"Beta"}},e={render:({color:t,solid:p,size:u,label:m})=>`<ga-badge color="${t}" size="${u}" ${p?"solid":""}>${m}</ga-badge>`},a={render:()=>`
    <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      <ga-badge>Default</ga-badge>
      <ga-badge color="blue">Blue</ga-badge>
      <ga-badge color="green">Green</ga-badge>
      <ga-badge color="amber">Amber</ga-badge>
      <ga-badge color="purple">Purple</ga-badge>
      <ga-badge color="red">Red</ga-badge>
    </div>
  `},r={render:()=>`
    <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      <ga-badge color="blue" solid>Blue</ga-badge>
      <ga-badge color="green" solid>Active</ga-badge>
      <ga-badge color="amber" solid>Pending</ga-badge>
      <ga-badge color="red" solid>Error</ga-badge>
    </div>
  `};var o,g,d;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: ({
    color,
    solid,
    size,
    label
  }) => \`<ga-badge color="\${color}" size="\${size}" \${solid ? "solid" : ""}>\${label}</ga-badge>\`
}`,...(d=(g=e.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var l,s,n;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      <ga-badge>Default</ga-badge>
      <ga-badge color="blue">Blue</ga-badge>
      <ga-badge color="green">Green</ga-badge>
      <ga-badge color="amber">Amber</ga-badge>
      <ga-badge color="purple">Purple</ga-badge>
      <ga-badge color="red">Red</ga-badge>
    </div>
  \`
}`,...(n=(s=a.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var b,c,i;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      <ga-badge color="blue" solid>Blue</ga-badge>
      <ga-badge color="green" solid>Active</ga-badge>
      <ga-badge color="amber" solid>Pending</ga-badge>
      <ga-badge color="red" solid>Error</ga-badge>
    </div>
  \`
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const f=["Playground","Colors","Solid"];export{a as Colors,e as Playground,r as Solid,f as __namedExportsOrder,x as default};
