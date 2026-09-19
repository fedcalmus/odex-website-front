import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { eventDetailCopy } from "@/content/event-detail";
import { SafetyAssurances } from "./SafetyAssurances";

const meta = {
  component: SafetyAssurances,
  tags: ["ai-generated"],
  args: { title: eventDetailCopy.safety.title, items: [...eventDetailCopy.safety.items] },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
} satisfies Meta<typeof SafetyAssurances>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("region", { name: "Ինչ է ապահովում Odex-ը" })).toBeVisible();
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
  },
};
