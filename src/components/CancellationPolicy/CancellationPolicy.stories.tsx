import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { eventDetailCopy } from "@/content/event-detail";
import { CancellationPolicy } from "./CancellationPolicy";

const meta = {
  component: CancellationPolicy,
  tags: ["ai-generated"],
  args: { title: "Չեղարկման պայմաններ", terms: [...eventDetailCopy.cancellationTerms] },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 880 }}><Story /></div>],
} satisfies Meta<typeof CancellationPolicy>;

export default meta;
type Story = StoryObj<typeof meta>;

// The dot colour is a hint; the outcome is always written next to it.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(4);
    await expect(canvas.getByText("Վերադարձ չկա")).toBeVisible();
  },
};
