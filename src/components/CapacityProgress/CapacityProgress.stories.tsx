import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { CapacityProgress } from "./CapacityProgress";

const meta = {
  component: CapacityProgress,
  tags: ["ai-generated"],
  args: { taken: 12, total: 16 },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
} satisfies Meta<typeof CapacityProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filling: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("12/16")).toBeVisible();
    await expect(canvas.getByText("4 տեղ մնացել")).toBeVisible();
  },
};
// Scarce: orange bar + clock — same threshold as the badge and the card bar.
export const Scarce: Story = {
  args: { taken: 16, total: 18 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("2 տեղ մնացել")).toBeVisible();
  },
};
export const SoldOut: Story = { args: { taken: 18, total: 18 } };
