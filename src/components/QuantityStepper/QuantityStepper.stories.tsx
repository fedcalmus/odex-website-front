import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { QuantityStepper } from "./QuantityStepper";

const meta = {
  component: QuantityStepper,
  tags: ["ai-generated"],
  args: {
    value: 2,
    max: 4,
    onChange: () => undefined,
    labels: { group: "Տոմսերի քանակ", decrease: "Պակասեցնել", increase: "Ավելացնել" },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof QuantityStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Bounded on both sides: the only value you can pick is one that can be booked.
export const Bounded: Story = {
  render: (args) => {
    const [value, setValue] = useState(2);
    return <QuantityStepper {...args} value={value} onChange={setValue} />;
  },
  play: async ({ canvas }) => {
    const plus = canvas.getByRole("button", { name: "Ավելացնել" });
    await userEvent.click(plus);
    await userEvent.click(plus);
    await userEvent.click(plus);
    await expect(canvas.getByRole("status")).toHaveTextContent("4");
    await expect(plus).toBeDisabled();
    const minus = canvas.getByRole("button", { name: "Պակասեցնել" });
    for (let i = 0; i < 5; i++) if (!(minus as HTMLButtonElement).disabled) await userEvent.click(minus);
    await expect(canvas.getByRole("status")).toHaveTextContent("1");
    await expect(minus).toBeDisabled();
  },
};
export const OnlyOnePlaceLeft: Story = { args: { value: 1, max: 1 } };
