import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";
import { FollowButton } from "./FollowButton";

const meta = {
  component: FollowButton,
  tags: ["ai-generated"],
  args: { label: "Հետևել", followingLabel: "Հետևում եք", onChange: fn() },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
} satisfies Meta<typeof FollowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// A toggle (`aria-pressed`), not a link.
export const Toggle: Story = {
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", { name: "Հետևել" });
    await expect(button).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(button);
    await expect(canvas.getByRole("button", { name: "Հետևում եք" })).toHaveAttribute("aria-pressed", "true");
    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
};
export const AlreadyFollowing: Story = { args: { defaultFollowing: true } };
