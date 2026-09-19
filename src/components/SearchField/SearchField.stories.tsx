import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { SearchField } from "./SearchField";

const meta = {
  component: SearchField,
  tags: ["ai-generated"],
  args: { action: "/events", placeholder: "Գագաթ, ակումբ…", label: "Որոնում" },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 260 }}><Story /></div>],
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Named by a (visually hidden) label — the placeholder isn't a label.
export const Default: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByRole("searchbox", { name: "Որոնում" });
    await userEvent.type(input, "Արագած");
    await expect(input).toHaveValue("Արագած");
  },
};

// A plain GET form, so it works without JavaScript.
export const IsAGetForm: Story = {
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form")!;
    await expect(form).toHaveAttribute("method", "get");
    await expect(form).toHaveAttribute("action", "/events");
  },
};
