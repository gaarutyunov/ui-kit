export default {
  title: "Components/Kbd",
  component: "ga-kbd",
  tags: ["autodocs"],
};

export const Default = {
  render: () => `<ga-kbd>⌘</ga-kbd>`,
};

export const Shortcut = {
  render: () => `
    <div style="display:flex; gap:6px; align-items:center; color:var(--ga-muted);">
      <ga-kbd>⌘</ga-kbd> <span>+</span> <ga-kbd>K</ga-kbd>
      <span style="margin-left:8px;">to open the command palette</span>
    </div>
  `,
};
