import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { RegionConditions } from "./RegionConditions";

const meta = {
  component: RegionConditions,
  tags: ["ai-generated"],
  args: {
    label: "Եղանակը մարզերում",
    regions: [
      { slug: "aragatsotn", name: "Արագածոտն", condition: "clear", temperature: 6, conditionLabel: "Պարզ", count: 4, href: "/events?region=aragatsotn" },
      { slug: "syunik", name: "Սյունիք", condition: "cloud", temperature: 2, conditionLabel: "Ամպամած", count: 6, href: "/events?region=syunik" },
      { slug: "tavush", name: "Տավուշ", condition: "rain", temperature: 11, conditionLabel: "Անձրև", count: 3, href: "/events?region=tavush" },
      { slug: "gegharkunik", name: "Գեղարքունիք", condition: "wind", temperature: 8, conditionLabel: "Քամոտ", count: 5, href: "/events?region=gegharkunik" },
      { slug: "kotayk", name: "Կոտայք", condition: "snow", temperature: 4, conditionLabel: "Ձյուն", count: 2, href: "/events?region=kotayk" },
    ],
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 1360, padding: 24, background: "linear-gradient(135deg,#3f4b49,#0b1011)" }}><Story /></div>],
} satisfies Meta<typeof RegionConditions>;

export default meta;
type Story = StoryObj<typeof meta>;

// Each cell filters the list to that region.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(5);
    await expect(canvas.getByRole("link", { name: /Սյունիք/ })).toHaveAttribute("href", "/events?region=syunik");
  },
};
