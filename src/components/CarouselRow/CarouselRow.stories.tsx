import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { guide } from "@/content/home";
import { DestinationCard } from "@/components/DestinationCard";
import { CarouselRow } from "./CarouselRow";

const items = guide.rows[0];

const meta = {
  component: CarouselRow,
  tags: ["ai-generated"],
  args: {
    label: "Ուղեցույց՝ առաջին շարք",
    children: items.map(({ id, ...card }) => (
      <li key={id}>
        <DestinationCard {...card} />
      </li>
    )),
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CarouselRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// A clipped, natively-scrolling row: the cards running off the edge IS the affordance.
export const Primary: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("list", { name: "Ուղեցույց՝ առաջին շարք" })).toBeVisible();
    await expect(canvas.getAllByRole("listitem")).toHaveLength(items.length);
  },
};

// Shifted 146px left so two stacked rows don't line up.
export const Staggered: Story = { args: { variant: "staggered" } };
