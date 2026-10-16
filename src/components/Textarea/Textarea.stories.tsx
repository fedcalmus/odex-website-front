import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["ai-generated"],
  args: { label: "Հաղորդագրություն", placeholder: "Գրեք ձեր հարցը…" },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelper: Story = { args: { helper: "Նկարագրեք հարցը հնարավորինս մանրամասն" } };

export const WithError: Story = { args: { error: "Գրեք ձեր հաղորդագրությունը" } };

export const AcceptsText: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByLabelText(/Հաղորդագրություն/);
    await userEvent.type(field, "Բարև, ունեմ հարց ամրագրման մասին։");
    await expect(field).toHaveValue("Բարև, ունեմ հարց ամրագրման մասին։");
  },
};
