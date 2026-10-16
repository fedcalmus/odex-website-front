import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Select } from "./Select";

const options = [
  { value: "yerevan", label: "Երևան" },
  { value: "kotayk", label: "Կոտայք" },
  { value: "lori", label: "Լոռի" },
];

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["ai-generated"],
  args: { label: "Մարզ", placeholder: "Ընտրեք մարզը", options, required: true },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelper: Story = { args: { helper: "Որտեղ է գրանցված ակումբը" } };

export const WithError: Story = { args: { error: "Ընտրեք մարզը" } };

export const PicksAValue: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByLabelText(/Մարզ/) as HTMLSelectElement;
    await userEvent.selectOptions(select, "kotayk");
    await expect(select.value).toBe("kotayk");
  },
};
