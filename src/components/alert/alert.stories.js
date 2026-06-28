export default {
  title: "Components/Alert",
  component: "ga-alert",
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["neutral", "info", "success", "warning", "danger"] },
    title: { control: "text" },
    dismissible: { control: "boolean" },
    body: { control: "text" },
  },
  args: {
    tone: "info",
    title: "Heads up",
    dismissible: false,
    body: "Your browser supports WebGPU — local depth estimation is available.",
  },
};

export const Playground = {
  render: ({ tone, title, dismissible, body }) =>
    `<ga-alert tone="${tone}" title="${title}" ${dismissible ? "dismissible" : ""}>${body}</ga-alert>`,
};

export const Tones = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:12px; max-width:480px;">
      <ga-alert tone="info" title="Info">Local processing is available.</ga-alert>
      <ga-alert tone="success" title="Success">Export complete — 3D pair saved.</ga-alert>
      <ga-alert tone="warning" title="Warning">Large images may take a while.</ga-alert>
      <ga-alert tone="danger" title="Error" dismissible>Could not load the depth model.</ga-alert>
    </div>
  `,
};
