import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  // Mirrors next.config.ts's sassOptions.includePaths — Storybook's Vite
  // build doesn't read Next's config, so `@use "abstracts" as tokens;`
  // needs this to resolve from any *.module.scss file.
  async viteFinal(config) {
    config.css = {
      ...config.css,
      preprocessorOptions: {
        ...config.css?.preprocessorOptions,
        scss: {
          ...config.css?.preprocessorOptions?.scss,
          // Vite 8 defaults to Dart Sass's modern API, which reads
          // `loadPaths` rather than the legacy `includePaths` key.
          loadPaths: [path.join(dirname, "../src/styles")],
        },
      },
    };
    return config;
  },
};
export default config;
