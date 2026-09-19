import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { GuideRow } from "./GuideRow";

const meta = {
  component: GuideRow,
  tags: ["ai-generated"],
  args: {
    name: "Արամ Հակոբյան",
    roleLabel: "Հիմնական ուղեկցորդ",
    experience: "9 տարի · 240 արշավ",
    photo: "/images/guides/guide-1.png",
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
} satisfies Meta<typeof GuideRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lead: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Արամ Հակոբյան")).toBeVisible();
    await expect(canvas.getByText("Հիմնական ուղեկցորդ")).toBeVisible();
  },
};
export const Sweep: Story = {
  args: { name: "Կարեն Սարգսյան", roleLabel: "Հետնապահ", experience: "5 տարի · 120 արշավ" },
};
