import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ClubCtaBar } from "./ClubCtaBar";

const meta = {
  component: ClubCtaBar,
  tags: ["ai-generated"],
  args: {
    text: "Ակումբ ունե՞ս։ Առաջին երեք ամիսն՝ առանց միջնորդավճարի։",
    actionLabel: "Գրանցել ակումբը",
    href: "/clubs/register",
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ClubCtaBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// The ONLY full-width lime surface on the marketplace, with an inverted (dark) button.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Գրանցել ակումբը" })).toHaveAttribute("href", "/clubs/register");
  },
};
