import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ClubStats } from "./ClubStats";

const meta = {
  component: ClubStats,
  tags: ["ai-generated"],
  args: {
    stats: [
      { icon: "calendar", value: "18", label: "ԱՌԱՋԻԿԱ ՄԻՋՈՑԱՌՈՒՄ" },
      { icon: "users", value: "4", label: "ՈՒՂԵԿՑՈՐԴ" },
      { icon: "mountain", value: "240", label: "ԱՆՑԿԱՑՐԱԾ ԱՐՇԱՎ" },
      { icon: "star-filled", value: "4,9", label: "ՎԱՐԿԱՆԻՇ · 128 ԿԱՐԾԻՔ", accent: true },
      { icon: "shield-check", value: "2019", label: "ՎԱՎԵՐԱՑՎԱԾ Է" },
    ],
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ClubStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Five: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("240")).toBeVisible();
    await expect(canvas.getByText("ՎԱՐԿԱՆԻՇ · 128 ԿԱՐԾԻՔ")).toBeVisible();
  },
};
export const Mobile: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
