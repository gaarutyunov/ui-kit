export default {
  title: "Components/Switch",
  component: "ga-switch",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { label: "Enable previews", checked: true, disabled: false },
};

export const Playground = {
  render: ({ label, checked, disabled }) =>
    `<ga-switch label="${label}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}></ga-switch>`,
};

export const States = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:14px; align-items:flex-start;">
      <ga-switch label="Off"></ga-switch>
      <ga-switch label="On" checked></ga-switch>
      <ga-switch label="Disabled off" disabled></ga-switch>
      <ga-switch label="Disabled on" checked disabled></ga-switch>
    </div>
  `,
};
