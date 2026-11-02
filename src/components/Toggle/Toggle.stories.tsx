import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Toggle } from "./Toggle";

function Controlled() {
  const [checked, setChecked] = useState(true);
  return (
    <Toggle
      label="SMS ծանուցումներ"
      description="Ուղարկենք SMS, երբ խումբը մեկնի և վերադառնա"
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}

const meta = {
  title: "Components/Toggle",
  component: Controlled,
  tags: ["ai-generated"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof Controlled>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TogglesOnClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/SMS ծանուցումներ/) as HTMLInputElement;
    await expect(input.checked).toBe(true);
    await userEvent.click(input);
    await expect(input.checked).toBe(false);
  },
};
