export default {
  title: "Components/Spinner",
  component: "ga-spinner",
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["", "green", "amber", "purple", "red", "fg"] },
  },
  args: { size: "md", color: "" },
};

export const Playground = {
  render: ({ size, color }) =>
    `<ga-spinner size="${size}" ${color ? `color="${color}"` : ""}></ga-spinner>`,
};

export const Sizes = {
  render: () => `
    <div style="display:flex; gap:20px; align-items:center;">
      <ga-spinner size="sm"></ga-spinner>
      <ga-spinner size="md"></ga-spinner>
      <ga-spinner size="lg"></ga-spinner>
    </div>
  `,
};
