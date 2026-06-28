export default {
  title: "Components/Button",
  component: "ga-button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["secondary", "primary", "ghost", "danger"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    label: { control: "text" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    block: { control: "boolean" },
    href: { control: "text" },
  },
  args: {
    variant: "secondary",
    size: "md",
    label: "Button",
    disabled: false,
    loading: false,
    block: false,
    href: "",
  },
  parameters: {
    docs: {
      description: {
        component:
          "`<ga-button>` is the primary action element. Set `href` to render it as a link. Works in any framework — it's a native custom element.",
      },
    },
  },
};

const render = ({ variant, size, label, disabled, loading, block, href }) => `
  <ga-button
    variant="${variant}"
    size="${size}"
    ${disabled ? "disabled" : ""}
    ${loading ? "loading" : ""}
    ${block ? "block" : ""}
    ${href ? `href="${href}"` : ""}
  >${label}</ga-button>
`;

export const Playground = { render };

export const Variants = {
  render: () => `
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button variant="primary">Primary</ga-button>
      <ga-button variant="secondary">Secondary</ga-button>
      <ga-button variant="ghost">Ghost</ga-button>
      <ga-button variant="danger">Danger</ga-button>
    </div>
  `,
};

export const Sizes = {
  render: () => `
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button size="sm" variant="primary">Small</ga-button>
      <ga-button size="md" variant="primary">Medium</ga-button>
      <ga-button size="lg" variant="primary">Large</ga-button>
    </div>
  `,
};

export const States = {
  render: () => `
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button variant="primary">Default</ga-button>
      <ga-button variant="primary" loading>Loading</ga-button>
      <ga-button variant="primary" disabled>Disabled</ga-button>
    </div>
  `,
};

export const WithIcons = {
  render: () => `
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <ga-button variant="primary">
        <span slot="start">→</span> Continue
      </ga-button>
      <ga-button variant="secondary">
        Download <span slot="end">↓</span>
      </ga-button>
    </div>
  `,
};
