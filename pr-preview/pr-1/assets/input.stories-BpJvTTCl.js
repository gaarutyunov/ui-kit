const b={title:"Components/Input",component:"ga-input",tags:["autodocs"],argTypes:{label:{control:"text"},placeholder:{control:"text"},type:{control:"select",options:["text","email","password","number","search"]},hint:{control:"text"},error:{control:"text"},required:{control:"boolean"},disabled:{control:"boolean"}},args:{label:"Email",placeholder:"you@example.com",type:"email",hint:"We'll never share it.",error:"",required:!1,disabled:!1}},e={render:({label:s,placeholder:u,type:c,hint:r,error:t,required:h,disabled:g})=>`
    <div style="max-width:320px">
      <ga-input
        label="${s}" placeholder="${u}" type="${c}"
        ${r?`hint="${r}"`:""} ${t?`error="${t}"`:""}
        ${h?"required":""} ${g?"disabled":""}>
      </ga-input>
    </div>
  `},a={render:()=>`
    <div style="display:flex; flex-direction:column; gap:16px; max-width:320px;">
      <ga-input label="Default" placeholder="Type here"></ga-input>
      <ga-input label="With hint" placeholder="Username" hint="3–20 characters"></ga-input>
      <ga-input label="Required" placeholder="Required field" required></ga-input>
      <ga-input label="Error" value="nope" error="That username is taken"></ga-input>
      <ga-input label="Disabled" placeholder="Can't touch this" disabled></ga-input>
    </div>
  `};var l,n,i;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: ({
    label,
    placeholder,
    type,
    hint,
    error,
    required,
    disabled
  }) => \`
    <div style="max-width:320px">
      <ga-input
        label="\${label}" placeholder="\${placeholder}" type="\${type}"
        \${hint ? \`hint="\${hint}"\` : ""} \${error ? \`error="\${error}"\` : ""}
        \${required ? "required" : ""} \${disabled ? "disabled" : ""}>
      </ga-input>
    </div>
  \`
}`,...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var o,d,p;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; flex-direction:column; gap:16px; max-width:320px;">
      <ga-input label="Default" placeholder="Type here"></ga-input>
      <ga-input label="With hint" placeholder="Username" hint="3–20 characters"></ga-input>
      <ga-input label="Required" placeholder="Required field" required></ga-input>
      <ga-input label="Error" value="nope" error="That username is taken"></ga-input>
      <ga-input label="Disabled" placeholder="Can't touch this" disabled></ga-input>
    </div>
  \`
}`,...(p=(d=a.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const m=["Playground","States"];export{e as Playground,a as States,m as __namedExportsOrder,b as default};
