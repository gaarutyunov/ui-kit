const P={title:"Components/Button",component:"ga-button",tags:["autodocs"],argTypes:{variant:{control:"select",options:["secondary","primary","ghost","danger"]},size:{control:"inline-radio",options:["sm","md","lg"]},label:{control:"text"},disabled:{control:"boolean"},loading:{control:"boolean"},block:{control:"boolean"},href:{control:"text"}},args:{variant:"secondary",size:"md",label:"Button",disabled:!1,loading:!1,block:!1,href:""},parameters:{docs:{description:{component:"`<ga-button>` is the primary action element. Set `href` to render it as a link. Works in any framework — it's a native custom element."}}}},L=({variant:S,size:h,label:z,disabled:D,loading:$,block:k,href:o})=>`
  <ga-button
    variant="${S}"
    size="${h}"
    ${D?"disabled":""}
    ${$?"loading":""}
    ${k?"block":""}
    ${o?`href="${o}"`:""}
  >${z}</ga-button>
`,a={render:L},t={render:()=>`
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button variant="primary">Primary</ga-button>
      <ga-button variant="secondary">Secondary</ga-button>
      <ga-button variant="ghost">Ghost</ga-button>
      <ga-button variant="danger">Danger</ga-button>
    </div>
  `},n={render:()=>`
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button size="sm" variant="primary">Small</ga-button>
      <ga-button size="md" variant="primary">Medium</ga-button>
      <ga-button size="lg" variant="primary">Large</ga-button>
    </div>
  `},r={render:()=>`
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button variant="primary">Default</ga-button>
      <ga-button variant="primary" loading>Loading</ga-button>
      <ga-button variant="primary" disabled>Disabled</ga-button>
    </div>
  `},e={render:()=>`
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button variant="primary">
        <span slot="start">→</span> Continue
      </ga-button>
      <ga-button variant="secondary">
        Download <span slot="end">↓</span>
      </ga-button>
    </div>
  `};var s,i,l;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render
}`,...(l=(i=a.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,g,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button variant="primary">Primary</ga-button>
      <ga-button variant="secondary">Secondary</ga-button>
      <ga-button variant="ghost">Ghost</ga-button>
      <ga-button variant="danger">Danger</ga-button>
    </div>
  \`
}`,...(p=(g=t.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var u,c,b;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button size="sm" variant="primary">Small</ga-button>
      <ga-button size="md" variant="primary">Medium</ga-button>
      <ga-button size="lg" variant="primary">Large</ga-button>
    </div>
  \`
}`,...(b=(c=n.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};var m,y,v;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button variant="primary">Default</ga-button>
      <ga-button variant="primary" loading>Loading</ga-button>
      <ga-button variant="primary" disabled>Disabled</ga-button>
    </div>
  \`
}`,...(v=(y=r.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var x,f,w;e.parameters={...e.parameters,docs:{...(x=e.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button variant="primary">
        <span slot="start">→</span> Continue
      </ga-button>
      <ga-button variant="secondary">
        Download <span slot="end">↓</span>
      </ga-button>
    </div>
  \`
}`,...(w=(f=e.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};const C=["Playground","Variants","Sizes","States","WithIcons"];export{a as Playground,n as Sizes,r as States,t as Variants,e as WithIcons,C as __namedExportsOrder,P as default};
