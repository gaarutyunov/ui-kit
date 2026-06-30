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
  // Ship a Storybook-free standalone demo alongside the docs. `demo/` and the
  // raw `src/` are copied verbatim so demo/index.html can import the components
  // as plain ES modules (../src/index.js) — useful for diagnosing rendering
  // outside Storybook (e.g. on mobile Safari) at <deploy>/demo/.
  staticDirs: [
    { from: "../demo", to: "/demo" },
    { from: "../src", to: "/src" },
  ],
  // Deployed under https://<user>.github.io/ui-kit/ — base is injected by the
  // build workflow via STORYBOOK_BASE for correct asset paths on Pages.
  async viteFinal(cfg) {
    if (process.env.STORYBOOK_BASE) cfg.base = process.env.STORYBOOK_BASE;
    return cfg;
  },
};

export default config;
