import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { HoldCountdown } from "./HoldCountdown";

const meta = {
  component: HoldCountdown,
  tags: ["ai-generated"],
  args: { endsAt: new Date(Date.now() + 14 * 60_000 + 32_000).toISOString(), label: "Տեղերը պահվում են" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof HoldCountdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mono digits so the width doesn't jump as they tick; placeholders on the server, real time after hydration.
export const Holding: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByText(/^14:\d\d$/)).toBeVisible();
    await expect(canvas.getByRole("timer")).toBeVisible();
  },
};
// Clamps at 00:00 — recovering (re-checking availability) is the caller's job, not a failure page.
export const Expired: Story = {
  args: { endsAt: "2020-01-01T00:00:00+04:00" },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText("00:00")).toBeVisible();
  },
};
