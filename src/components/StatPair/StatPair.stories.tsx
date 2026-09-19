import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { StatPair } from "./StatPair";

const meta = {
  component: StatPair,
  tags: ["ai-generated"],
  args: { value: 18, label: "ՄԻՋՈՑԱՌՈՒՄ" },
  parameters: { layout: "centered" },
  // A StatPair is a description-list entry, so it always lives in a <dl>.
  decorators: [
    (Story) => (
      <dl>
        <Story />
      </dl>
    ),
  ],
} satisfies Meta<typeof StatPair>;

export default meta;
type Story = StoryObj<typeof meta>;

// Reads as "label, value" to assistive tech even though the figure is drawn on top.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("18")).toBeVisible();
    await expect(canvas.getByText("ՄԻՋՈՑԱՌՈՒՄ")).toBeVisible();
  },
};
export const Small: Story = { args: { value: 4, label: "ԳԻԴ", size: "small" } };
