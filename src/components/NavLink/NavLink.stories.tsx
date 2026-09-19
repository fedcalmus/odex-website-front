import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { NavLink } from "./NavLink";

const meta = {
  component: NavLink,
  tags: ["ai-generated"],
  args: { label: "Միջոցառումներ", href: "/events" },
  parameters: { layout: "centered", nextjs: { navigation: { pathname: "/events" } } },
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// On its own page: lime, never underlined, announced as the current page.
export const Active: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Միջոցառումներ" })).toHaveAttribute("aria-current", "page");
  },
};

export const Inactive: Story = {
  args: { label: "Ակումբներ", href: "/clubs" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Ակումբներ" })).not.toHaveAttribute("aria-current");
  },
};

// The homepage is the events marketplace: `/` lights Events up visually,
// but it is NOT announced as "the current page" (it isn't).
export const HighlightedOnHome: Story = {
  args: { alsoActiveOn: ["/"] },
  parameters: { nextjs: { navigation: { pathname: "/" } } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Միջոցառումներ" })).not.toHaveAttribute("aria-current");
  },
};
