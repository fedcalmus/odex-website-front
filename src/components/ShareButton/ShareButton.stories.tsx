import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ShareButton } from "./ShareButton";

const meta = {
  component: ShareButton,
  tags: ["ai-generated"],
  args: { label: "Կիսվել", title: "Հայաստանի արահետներ" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof ShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Native share sheet where there is one, else copies the link (both failures are swallowed).
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Կիսվել" })).toBeVisible();
  },
};
