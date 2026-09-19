import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";
import { IconButton } from "./IconButton";

const meta = {
  component: IconButton,
  tags: ["ai-generated"],
  args: { icon: "heart", label: "Ավելացնել ընտրյալներում", onClick: fn() },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ padding: 24, background: "linear-gradient(135deg, #3f4b49, #172224)" }}><Story /></div>],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// No visible text, so `label` IS the accessible name.
export const Default: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Ավելացնել ընտրյալներում" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
export const Pressed: Story = {
  args: { pressed: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  },
};
export const Share: Story = { args: { icon: "share-2", label: "Կիսվել" } };
