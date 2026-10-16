import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { fn } from "storybook/test";
import { SocialAuthButtons } from "./SocialAuthButtons";

const meta = {
  title: "Components/SocialAuthButtons",
  component: SocialAuthButtons,
  tags: ["ai-generated"],
  args: {
    googleLabel: "Շարունակել Google-ով",
    appleLabel: "Շարունակել Apple-ով",
    dividerLabel: "կամ էլ. փոստով",
    onGoogleClick: fn(),
    onAppleClick: fn(),
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof SocialAuthButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ClickHandlers: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: args.googleLabel }));
    await expect(args.onGoogleClick).toHaveBeenCalled();
    await userEvent.click(canvas.getByRole("button", { name: args.appleLabel }));
    await expect(args.onAppleClick).toHaveBeenCalled();
  },
};
