import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { TeamBlock } from "./TeamBlock";

const meta = {
  component: TeamBlock,
  tags: ["ai-generated"],
  args: {
    title: "Ձեր ուղեկցորդները",
    guides: [
      {
        id: "lead",
        name: "Արամ Հակոբյան",
        roleLabel: "Հիմնական ուղեկցորդ",
        experience: "9 տարի · 240 արշավ",
        photo: "/images/guides/guide-1.png",
      },
      {
        id: "sweep",
        name: "Կարեն Սարգսյան",
        roleLabel: "Հետնապահ",
        experience: "5 տարի · 120 արշավ",
        photo: "/images/guides/guide-1.png",
      },
    ],
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 880 }}><Story /></div>],
} satisfies Meta<typeof TeamBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LeadAndSweep: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(2);
  },
};
