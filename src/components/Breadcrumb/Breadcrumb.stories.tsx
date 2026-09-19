import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
  component: Breadcrumb,
  tags: ["ai-generated"],
  args: {
    label: "Ուղի",
    items: [
      { label: "Միջոցառումներ", href: "/events" },
      { label: "Արագածոտն", href: "/events?region=aragatsotn" },
    ],
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("navigation", { name: "Ուղի" })).toBeVisible();
    await expect(canvas.getAllByRole("listitem")).toHaveLength(2);
  },
};
export const Deep: Story = {
  args: {
    items: [
      { label: "Միջոցառումներ", href: "/events" },
      { label: "Արագածոտն", href: "/events?region=aragatsotn" },
      { label: "Արագած", href: "/events/aragats-southern-peak" },
    ],
  },
};
