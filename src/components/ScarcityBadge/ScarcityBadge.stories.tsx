import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ScarcityBadge } from "./ScarcityBadge";

const meta = {
  component: ScarcityBadge,
  tags: ["ai-generated"],
  args: { type: "last-places", children: "1 տեղ մնացել է" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof ScarcityBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Orange = "pay attention". Near-black label: white on orange fails contrast (3.13:1).
export const LastPlaces: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1 տեղ մնացել է")).toBeVisible();
  },
};
// Deliberately quiet: the card stays visible and swaps to the waitlist.
export const SoldOut: Story = { args: { type: "sold-out", children: "Լրացված" } };
// Lime is the one non-warning badge — an invitation, not urgency.
export const NewClub: Story = { args: { type: "new-club", children: "Նոր ակումբ" } };
