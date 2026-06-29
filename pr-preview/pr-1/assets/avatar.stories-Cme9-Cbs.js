const c={title:"Components/Avatar",component:"ga-avatar",tags:["autodocs"],argTypes:{src:{control:"text"},name:{control:"text"},size:{control:"inline-radio",options:["sm","md","lg"]},square:{control:"boolean"}},args:{src:"",name:"German Arutyunov",size:"md",square:!1}},a={render:({src:e,name:v,size:g,square:i})=>`<ga-avatar name="${v}" size="${g}" ${e?`src="${e}"`:""} ${i?"square":""}></ga-avatar>`},r={render:()=>`
    <div style="display:flex; gap:12px; align-items:center;">
      <ga-avatar name="German Arutyunov" size="sm"></ga-avatar>
      <ga-avatar name="German Arutyunov"></ga-avatar>
      <ga-avatar name="German Arutyunov" size="lg"></ga-avatar>
      <ga-avatar name="German Arutyunov" square></ga-avatar>
    </div>
  `};var n,t,s;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:'{\n  render: ({\n    src,\n    name,\n    size,\n    square\n  }) => `<ga-avatar name="${name}" size="${size}" ${src ? `src="${src}"` : ""} ${square ? "square" : ""}></ga-avatar>`\n}',...(s=(t=a.parameters)==null?void 0:t.docs)==null?void 0:s.source}}};var o,m,u;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:12px; align-items:center;">
      <ga-avatar name="German Arutyunov" size="sm"></ga-avatar>
      <ga-avatar name="German Arutyunov"></ga-avatar>
      <ga-avatar name="German Arutyunov" size="lg"></ga-avatar>
      <ga-avatar name="German Arutyunov" square></ga-avatar>
    </div>
  \`
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const l=["Playground","Initials"];export{r as Initials,a as Playground,l as __namedExportsOrder,c as default};
