import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ParticipantRow } from "./ParticipantRow";

const meta = {
  component: ParticipantRow,
  tags: ["ai-generated"],
  args: {
    title: "1 · Անուշ Օրինակյան (դուք)",
    details: "Ասթմա · Արամ Օ. (091) 55-0022 · պրոֆիլից",
    changeLabel: "Փոխել",
    changeHref: "/account/profile",
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
} satisfies Meta<typeof ParticipantRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FromProfile: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Փոխել" })).toHaveAttribute("href", "/account/profile");
  },
};
