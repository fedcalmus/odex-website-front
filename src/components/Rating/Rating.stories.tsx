import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Rating } from "./Rating";

const meta = {
  component: Rating,
  tags: ["ai-generated"],
  args: { value: 4.9, count: 128 },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

// Decimal COMMA, formatted the same on server and client (no hydration mismatch).
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("4,9 · 128 կարծիք")).toBeVisible();
  },
};
export const Perfect: Story = { args: { value: 5, count: 3 } };
