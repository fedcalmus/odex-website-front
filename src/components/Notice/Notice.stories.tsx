import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Notice } from "./Notice";

const meta = {
  component: Notice,
  tags: ["ai-generated"],
  args: {
    children: "Կարծիքները հրապարակային չեն։ Վարկանիշը հաշվարկվում է ավարտված միջոցառումների գնահատականներից։",
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
} satisfies Meta<typeof Notice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Կարծիքները հրապարակային չեն/)).toBeVisible();
  },
};

// Info tone: privacy and explanatory notes (the health-data disclosure at checkout).
export const InfoTone: Story = {
  args: { tone: "info", icon: "lock", children: "Օգտագործեք այն էլ. փոստը, որին հասանելիություն ունեք սարում։" },
};

// Warning tone: a condition that needs attention but isn't blocking.
export const WarningTone: Story = {
  args: { tone: "warning", children: "18-ից ցածր մասնակիցների համար անհրաժեշտ է խնամակալի համաձայնություն:" },
};
