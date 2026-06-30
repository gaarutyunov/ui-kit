export default {
  title: "Components/Tabs",
  component: "ga-tabs",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Configure with a `tabs` JSON attribute; place panels inside keyed by matching `slot` names.",
      },
    },
  },
};

export const Default = {
  render: () => `
    <ga-tabs style="max-width:480px"
      tabs='[{"id":"local","label":"Local"},{"id":"cloud","label":"Cloud"},{"id":"about","label":"About"}]'>
      <div slot="local" style="color:var(--ga-muted)">
        Runs depth estimation on-device with transformers.js and WebGPU.
      </div>
      <div slot="cloud" style="color:var(--ga-muted)">
        Uses an OpenRouter model for AI-powered image editing.
      </div>
      <div slot="about" style="color:var(--ga-muted)">
        A buildless converter shipped as static ES modules.
      </div>
    </ga-tabs>
  `,
};
