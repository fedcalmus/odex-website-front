import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { hero } from "@/content/home";
import { Hero } from "./Hero";

const meta = {
  title: "Sections/Home/Hero",
  component: Hero,
  tags: ["ai-generated"],
  args: hero,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

// The page's one <h1>; the photo is decorative.
export const Desktop: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Գտնել միջոցառում" })).toHaveAttribute("href", "/events");
  },
};
export const Mobile: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
