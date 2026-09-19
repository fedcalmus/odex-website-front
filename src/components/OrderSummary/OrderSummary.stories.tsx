import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { OrderSummary } from "./OrderSummary";

const meta = {
  component: OrderSummary,
  tags: ["ai-generated"],
  args: {
    title: "Ձեր պատվերը",
    holdEndsAt: new Date(Date.now() + 14 * 60_000).toISOString(),
    holdLabel: "Տեղերը պահվում են",
    event: { title: "Խուստուփ՝ գագաթնակոհում", meta: "22 օգոստոսի · 06:00 · Լեռնագնաց", image: "/images/events/event-2.png" },
    lines: [
      { label: "Տոմս × 2", amount: "24 000 ֏" },
      { label: "Սպասարկման վճար", amount: "0 ֏" },
    ],
    totalLabel: "Ընդամենը",
    total: "24 000 ֏",
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
} satisfies Meta<typeof OrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

// Every line is named — a total that doesn't match the advertised price loses trust in one transaction.
export const Holding: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Տոմս × 2")).toBeVisible();
    await expect(canvas.getByText("Սպասարկման վճար")).toBeVisible();
    await expect(canvas.getAllByText("24 000 ֏")).toHaveLength(2);
  },
};
export const WithServiceFee: Story = {
  args: {
    lines: [
      { label: "Տոմս × 2", amount: "24 000 ֏" },
      { label: "Սպասարկման վճար", amount: "600 ֏" },
    ],
    total: "24 600 ֏",
  },
};
