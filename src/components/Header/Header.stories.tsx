import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { header } from "@/content/site";
import { Header } from "./Header";

const meta = {
  component: Header,
  tags: ["ai-generated"],
  args: header,
  parameters: { layout: "fullscreen", nextjs: { navigation: { pathname: "/" } } },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Logged-out desktop: wordmark, nav, then (pushed right by a flexible spacer)
// search, language, sign in and sign up.
export const Desktop: Story = {
  globals: { viewport: { value: "desktop", isRotated: false } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("navigation", { name: "Հիմնական մենյու" })).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Գրանցվել" })).toHaveAttribute("href", "/register");
    await expect(canvas.getByRole("searchbox", { name: "Որոնում" })).toBeVisible();
  },
};

// Below xl the bar collapses to wordmark + search icon + hamburger.
export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
};
