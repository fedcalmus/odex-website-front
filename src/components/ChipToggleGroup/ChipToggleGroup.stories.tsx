import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ChipToggleGroup } from "./ChipToggleGroup";

const options = [
  { value: "hiking", label: "Արշավական" },
  { value: "climbing", label: "Մագլցում" },
  { value: "cycling", label: "Հեծանիվ" },
  { value: "skiing", label: "Դահուկ" },
];

function Controlled() {
  const [value, setValue] = useState<string[]>(["hiking"]);
  return <ChipToggleGroup label="Ուղղություններ" options={options} value={value} onChange={setValue} />;
}

const meta = {
  title: "Components/ChipToggleGroup",
  component: Controlled,
  tags: ["ai-generated"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Controlled>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TogglesMultiple: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const climbing = canvas.getByRole("button", { name: "Մագլցում" });
    await userEvent.click(climbing);
    await expect(climbing).toHaveAttribute("aria-pressed", "true");
    const hiking = canvas.getByRole("button", { name: "Արշավական" });
    await expect(hiking).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(hiking);
    await expect(hiking).toHaveAttribute("aria-pressed", "false");
  },
};
