import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { LiveStatusPanel } from "./LiveStatusPanel";

const meta = {
  component: LiveStatusPanel,
  tags: ["ai-generated"],
  args: {
    eyebrow: "ՀԻՄԱ ՈՒՂՈՒ ՎՐԱ",
    count: 4,
    countLabel: "խումբ սարում է",
    details: "62 մասնակից · վերջին ազդանշան 3 ր առաջ",
    privacyNote: "Հետագծումը տեսանելի է ակումբին",
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 320, padding: 24, background: "linear-gradient(135deg, #3f4b49, #0b1011)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LiveStatusPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// The privacy line is mandatory: advertising tracking without naming who sees it is a liability.
export const Default: Story = {
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(String(args.count))).toBeVisible();
    await expect(canvas.getByText(args.privacyNote)).toBeVisible();
  },
};
