export default {
  title: "Components/Badge",
  component: "ga-badge",
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["default", "blue", "green", "amber", "purple", "red"],
    },
    solid: { control: "boolean" },
    size: { control: "inline-radio", options: ["sm", "md"] },
    label: { control: "text" },
  },
  args: { color: "blue", solid: false, size: "md", label: "Beta" },
};

export const Playground = {
  render: ({ color, solid, size, label }) =>
    `<ga-badge color="${color}" size="${size}" ${solid ? "solid" : ""}>${label}</ga-badge>`,
};

export const Colors = {
  render: () => `
    <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      <ga-badge>Default</ga-badge>
      <ga-badge color="blue">Blue</ga-badge>
      <ga-badge color="green">Green</ga-badge>
      <ga-badge color="amber">Amber</ga-badge>
      <ga-badge color="purple">Purple</ga-badge>
      <ga-badge color="red">Red</ga-badge>
    </div>
  `,
};

export const Solid = {
  render: () => `
    <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      <ga-badge color="blue" solid>Blue</ga-badge>
      <ga-badge color="green" solid>Active</ga-badge>
      <ga-badge color="amber" solid>Pending</ga-badge>
      <ga-badge color="red" solid>Error</ga-badge>
    </div>
  `,
};
