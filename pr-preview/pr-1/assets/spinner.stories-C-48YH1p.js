const c={title:"Components/Spinner",component:"ga-spinner",tags:["autodocs"],argTypes:{size:{control:"inline-radio",options:["sm","md","lg"]},color:{control:"select",options:["","green","amber","purple","red","fg"]}},args:{size:"md",color:""}},e={render:({size:t,color:r})=>`<ga-spinner size="${t}" ${r?`color="${r}"`:""}></ga-spinner>`},n={render:()=>`
    <div style="display:flex; gap:20px; align-items:center;">
      <ga-spinner size="sm"></ga-spinner>
      <ga-spinner size="md"></ga-spinner>
      <ga-spinner size="lg"></ga-spinner>
    </div>
  `};var s,i,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:'{\n  render: ({\n    size,\n    color\n  }) => `<ga-spinner size="${size}" ${color ? `color="${color}"` : ""}></ga-spinner>`\n}',...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var o,p,g;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:20px; align-items:center;">
      <ga-spinner size="sm"></ga-spinner>
      <ga-spinner size="md"></ga-spinner>
      <ga-spinner size="lg"></ga-spinner>
    </div>
  \`
}`,...(g=(p=n.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};const d=["Playground","Sizes"];export{e as Playground,n as Sizes,d as __namedExportsOrder,c as default};
