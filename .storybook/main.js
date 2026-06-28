/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {},
  // Deployed under https://<user>.github.io/ui-kit/ — base is injected by the
  // build workflow via STORYBOOK_BASE for correct asset paths on Pages.
  async viteFinal(cfg) {
    if (process.env.STORYBOOK_BASE) cfg.base = process.env.STORYBOOK_BASE;
    return cfg;
  },
};

export default config;
