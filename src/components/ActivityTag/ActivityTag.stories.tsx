import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ActivityTag } from "./ActivityTag";

const meta = {
  component: ActivityTag,
  tags: ["ai-generated"],
  args: { label: "Արշավ", icon: "activity-hiking" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof ActivityTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hiking: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Արշավ")).toBeVisible();
  },
};
export const Climbing: Story = { args: { label: "Ժայռամագլցում", icon: "activity-climbing" } };
export const Winter: Story = { args: { label: "Ձմեռային", icon: "activity-ski" } };
// Caving has no glyph yet: label only.
export const NoGlyph: Story = { args: { label: "Քարանձավ", icon: undefined } };
