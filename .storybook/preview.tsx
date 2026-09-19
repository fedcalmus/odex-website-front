import type { Preview } from "@storybook/nextjs-vite";
import "../src/styles/main.scss";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        odexCanvas: { name: "Odex canvas", value: "#101817" },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  initialGlobals: {
    backgrounds: { value: "odexCanvas" },
  },
};

export default preview;
