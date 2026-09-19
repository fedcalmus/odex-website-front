import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { Input } from "@/components/Input";
import { ParticipantCard } from "./ParticipantCard";

const meta = {
  component: ParticipantCard,
  tags: ["ai-generated"],
  args: {
    title: "2 · Երկրորդ մասնակից",
    children: <Input size="form" label="Անուն" helper="Ինչպես գրված է փաստաթղթում" required />,
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
} satisfies Meta<typeof ParticipantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// While anything inside has focus the rim turns lime — that IS the "you are here" marker.
export const FocusRim: Story = {
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("group", { name: "2 · Երկրորդ մասնակից" })).toBeVisible();
    await userEvent.click(canvas.getByRole("textbox", { name: /Անուն/ }));
    await expect(canvasElement.querySelector("fieldset:focus-within")).not.toBeNull();
  },
};
