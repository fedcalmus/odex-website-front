import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Wordmark } from "./Wordmark";

const meta = {
  component: Wordmark,
  tags: ["ai-generated"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Wordmark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("ODex")).toBeVisible();
    await expect(canvas.getByText("Outdoor")).toBeVisible();
  },
};
