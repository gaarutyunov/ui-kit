import "../src/index.js";
import "../src/tokens/tokens.css";
import "./preview.css";

/** @type { import('@storybook/web-components-vite').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      default: "black",
      values: [
        { name: "black", value: "#000000" },
        { name: "elevated", value: "#1a1a1a" },
        { name: "light", value: "#ffffff" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Introduction", "Foundations", "Components"],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Color theme",
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "dark", title: "Dark" },
          { value: "light", title: "Light" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      document.documentElement.setAttribute("data-theme", context.globals.theme);
      return story();
    },
  ],
};

export default preview;
