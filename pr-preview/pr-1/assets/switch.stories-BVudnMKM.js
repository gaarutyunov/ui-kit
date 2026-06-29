const h={title:"Components/Switch",component:"ga-switch",tags:["autodocs"],argTypes:{label:{control:"text"},checked:{control:"boolean"},disabled:{control:"boolean"}},args:{label:"Enable previews",checked:!0,disabled:!1}},e={render:({label:r,checked:n,disabled:o})=>`<ga-switch label="${r}" ${n?"checked":""} ${o?"disabled":""}></ga-switch>`},a={render:()=>`
    <div style="display:flex; flex-direction:column; gap:14px; align-items:flex-start;">
      <ga-switch label="Off"></ga-switch>
      <ga-switch label="On" checked></ga-switch>
      <ga-switch label="Disabled off" disabled></ga-switch>
      <ga-switch label="Disabled on" checked disabled></ga-switch>
    </div>
  `};var s,l,c;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: ({
    label,
    checked,
    disabled
  }) => \`<ga-switch label="\${label}" \${checked ? "checked" : ""} \${disabled ? "disabled" : ""}></ga-switch>\`
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var t,d,i;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; flex-direction:column; gap:14px; align-items:flex-start;">
      <ga-switch label="Off"></ga-switch>
      <ga-switch label="On" checked></ga-switch>
      <ga-switch label="Disabled off" disabled></ga-switch>
      <ga-switch label="Disabled on" checked disabled></ga-switch>
    </div>
  \`
}`,...(i=(d=a.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};const g=["Playground","States"];export{e as Playground,a as States,g as __namedExportsOrder,h as default};
