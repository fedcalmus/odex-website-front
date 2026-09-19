import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ActivityTag } from "@/components/ActivityTag";
import { RailBlock } from "./RailBlock";

const meta = {
  component: RailBlock,
  tags: ["ai-generated"],
  args: {
    title: "Ուղղություններ",
    children: (
      <div style={{ display: "flex", gap: 8 }}>
        <ActivityTag label="Արշավ" icon="activity-hiking" />
        <ActivityTag label="Ձմեռային" icon="activity-ski" />
      </div>
    ),
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
} satisfies Meta<typeof RailBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// A landmark named by its heading.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("region", { name: "Ուղղություններ" })).toBeVisible();
  },
};
