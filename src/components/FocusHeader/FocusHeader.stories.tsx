import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { currentLocale, locales } from "@/content/site";
import { FocusHeader } from "./FocusHeader";

const meta = {
  component: FocusHeader,
  tags: ["ai-generated"],
  args: { secureLabel: "Ապահով վճարում" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FocusHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// No navigation links — every exit is a lost sale — but wordmark and secure mark stay, or it reads as phishing.
export const Checkout: Story = {
  args: { language: { locales, current: currentLocale, label: "Լեզու" } },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Ապահով վճարում")).toBeVisible();
    await expect(canvas.queryByRole("navigation")).not.toBeInTheDocument();
  },
};
// Where returning is legitimate (registration).
export const WithBack: Story = {
  args: { back: { href: "/", label: "Հետ" } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Հետ" })).toHaveAttribute("href", "/");
  },
};
