import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fireEvent, fn } from "storybook/test";
import { formatPrice } from "@/lib/format";
import { PriceRange } from "./PriceRange";

const meta = {
  component: PriceRange,
  tags: ["ai-generated"],
  args: {
    value: 25000,
    max: 40000,
    step: 1000,
    label: "Գին",
    format: (value: number) => `մինչև ${formatPrice(value)}`,
    onCommit: fn(),
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 244 }}><Story /></div>],
} satisfies Meta<typeof PriceRange>;

export default meta;
type Story = StoryObj<typeof meta>;

// A real <input type="range"> whose announced value is the words. The filter is
// applied when the user lets go — not once per step of a drag. (The synthetic
// events below stand in for the browser's own arrow-key stepping, which
// user-event can't perform; a real keypress is covered by the e2e check.)
export const Keyboard: Story = {
  play: async ({ canvas, args }) => {
    const slider = canvas.getByRole("slider");
    await expect(slider).toHaveAttribute("aria-valuetext", `մինչև ${formatPrice(25000)}`);
    fireEvent.change(slider, { target: { value: "26000" } });
    await expect(args.onCommit).not.toHaveBeenCalled(); // mid-drag: nothing yet
    fireEvent.keyUp(slider);
    await expect(args.onCommit).toHaveBeenCalledWith(26000);
  },
};
export const AtMaximum: Story = { args: { value: 40000 } };
