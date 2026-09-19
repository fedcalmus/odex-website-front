import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { SkipLink } from "./SkipLink";

const meta = {
  component: SkipLink,
  tags: ["ai-generated"],
  args: { children: "Անցնել հիմնական բովանդակությանը" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// Parked off-screen until it receives keyboard focus.
export const FocusedByKeyboard: Story = {
  play: async ({ canvas }) => {
    await userEvent.tab();
    const link = canvas.getByRole("link", { name: "Անցնել հիմնական բովանդակությանը" });
    await expect(link).toHaveFocus();
    await expect(link).toHaveAttribute("href", "#main");
  },
};
