import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { RegionCountList } from "./RegionCountList";

const meta = {
  component: RegionCountList,
  tags: ["ai-generated"],
  args: {
    regions: [
      { slug: "aragatsotn", name: "Արագածոտն", count: 8, href: "/events?region=aragatsotn" },
      { slug: "syunik", name: "Սյունիք", count: 5, href: "/events?region=syunik" },
      { slug: "vayots-dzor", name: "Վայոց ձոր", count: 3, href: "/events?region=vayots-dzor" },
      { slug: "kotayk", name: "Կոտայք", count: 2, href: "/events?region=kotayk" },
    ],
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
} satisfies Meta<typeof RegionCountList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Each row opens the event list filtered to that region.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(4);
    await expect(canvas.getByRole("link", { name: /Սյունիք/ })).toHaveAttribute("href", "/events?region=syunik");
  },
};
