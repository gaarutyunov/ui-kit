export default {
  title: "Components/Avatar",
  component: "ga-avatar",
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    name: { control: "text" },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    square: { control: "boolean" },
  },
  args: { src: "", name: "German Arutyunov", size: "md", square: false },
};

export const Playground = {
  render: ({ src, name, size, square }) =>
    `<ga-avatar name="${name}" size="${size}" ${src ? `src="${src}"` : ""} ${square ? "square" : ""}></ga-avatar>`,
};

export const Initials = {
  render: () => `
    <div style="display:flex; gap:12px; align-items:center;">
      <ga-avatar name="German Arutyunov" size="sm"></ga-avatar>
      <ga-avatar name="German Arutyunov"></ga-avatar>
      <ga-avatar name="German Arutyunov" size="lg"></ga-avatar>
      <ga-avatar name="German Arutyunov" square></ga-avatar>
    </div>
  `,
};
