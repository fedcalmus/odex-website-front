import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { activities } from "@/content/home";
import { ActivitiesSection } from "./ActivitiesSection";

const meta = {
  title: "Sections/Home/ActivitiesSection",
  component: ActivitiesSection,
  tags: ["ai-generated"],
  args: { heading: activities.heading, activities: activities.items },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ActivitiesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SevenTiles: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(7);
    await expect(canvas.getByRole("link", { name: /Արշավ/ })).toHaveAttribute("href", "/events?activity=hiking");
  },
};

// A group with no events is dropped, not shown as "0".
export const EmptyGroupHidden: Story = {
  args: { activities: activities.items.map((item) => (item.slug === "caving" ? { ...item, count: 0 } : item)) },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(6);
  },
};
