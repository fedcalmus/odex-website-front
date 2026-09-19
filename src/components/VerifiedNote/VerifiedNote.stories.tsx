import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { VerifiedNote } from "./VerifiedNote";

const meta = {
  component: VerifiedNote,
  tags: ["ai-generated"],
  args: {
    title: "Ամեն ակումբ ստուգված է",
    description: "Փաստաթղթերը, գիդերի հավաստագրերը և ապահովագրությունը ստուգվում են մինչև հրապարակումը։",
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
} satisfies Meta<typeof VerifiedNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Ամեն ակումբ ստուգված է")).toBeVisible();
  },
};
