import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { CapacityBar } from "./CapacityBar";

const meta = {
  component: CapacityBar,
  tags: ["ai-generated"],
  args: { taken: 12, total: 16, price: "12 000 ֏" },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 393 }}><Story /></div>],
} satisfies Meta<typeof CapacityBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FillingHigh: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("12 / 16 տեղ զբաղված")).toBeVisible();
    await expect(canvas.getByText("12 000 ֏")).toBeVisible();
  },
};
// ≥90% full (or ≤3 places left): the bar turns to the accent — same rule as the scarcity badge.
export const AlmostFull: Story = { args: { taken: 15 } };
export const SoldOut: Story = { args: { taken: 16 } };
export const Quiet: Story = { args: { taken: 3 } };
