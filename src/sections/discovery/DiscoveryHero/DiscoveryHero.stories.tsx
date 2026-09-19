import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { discoveryCopy, discoveryLead } from "@/content/discovery";
import { DiscoveryHero } from "./DiscoveryHero";

const meta = {
  title: "Sections/Discovery/DiscoveryHero",
  component: DiscoveryHero,
  tags: ["ai-generated"],
  args: {
    image: "/images/hero/discovery-banner.png",
    title: discoveryCopy.title,
    lead: discoveryLead({ events: 9, clubs: 5, regions: 7 }),
    conditions: {
      label: discoveryCopy.conditionsLabel,
      regions: [
        { slug: "aragatsotn", name: "Արագածոտն", condition: "clear", temperature: 6, conditionLabel: "Պարզ", count: 2, href: "/events?region=aragatsotn" },
        { slug: "syunik", name: "Սյունիք", condition: "cloud", temperature: 2, conditionLabel: "Ամպամած", count: 1, href: "/events?region=syunik" },
        { slug: "tavush", name: "Տավուշ", condition: "rain", temperature: 11, conditionLabel: "Անձրև", count: 1, href: "/events?region=tavush" },
      ],
    },
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DiscoveryHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 1, name: "Ո՞ւր ես գնում այս շաբաթ" })).toBeVisible();
  },
};
