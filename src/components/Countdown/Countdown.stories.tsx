import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Countdown } from "./Countdown";

const inFuture = (minutes: number) => new Date(Date.now() + minutes * 60_000).toISOString();

const meta = {
  component: Countdown,
  tags: ["ai-generated"],
  // 1 day 18 h 40 min away (+ a spare minute so the display can't roll over mid-test).
  args: { target: inFuture((24 + 18) * 60 + 41), labels: { days: "ՕՐ", hours: "ԺԱՄ", minutes: "ՐՈՊԵ" } },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Countdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Placeholders on the server, real numbers after hydration — never a mismatch.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByText("01")).toBeVisible();
    await expect(canvas.getByText("18")).toBeVisible();
    await expect(canvas.getByRole("timer")).toBeVisible();
  },
};

// Clamps at zero (the caller swaps to the NEXT departure rather than showing 00 00 00).
export const Departed: Story = {
  args: { target: "2020-01-01T00:00:00+04:00" },
  play: async ({ canvas }) => {
    await expect((await canvas.findAllByText("00")).length).toBe(3);
  },
};
