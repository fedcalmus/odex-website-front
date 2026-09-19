import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { DayHeader } from "./DayHeader";

const meta = {
  component: DayHeader,
  tags: ["ai-generated"],
  args: {
    day: "11",
    weekdayShort: "ՈՒՐ",
    label: "Ուրբաթ, 11 սեպտեմբեր",
    summary: "3 մեկնում · ամենավաղը 05:30",
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 1048 }}><Story /></div>],
} satisfies Meta<typeof DayHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// The date tile is decorative; the heading carries the day for assistive tech.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 2, name: "Ուրբաթ, 11 սեպտեմբեր" })).toBeVisible();
    await expect(canvas.getByText("3 մեկնում · ամենավաղը 05:30")).toBeVisible();
  },
};
