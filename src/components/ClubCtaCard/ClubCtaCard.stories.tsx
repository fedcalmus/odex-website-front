import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ClubCtaCard } from "./ClubCtaCard";

const meta = {
  component: ClubCtaCard,
  tags: ["ai-generated"],
  args: {
    title: "Ակո՞ւմբ եք վարում",
    text: "Առաջին երեք ամիսը՝ առանց միջնորդավճարի։",
    actionLabel: "Գրանցել ակումբը",
    href: "/clubs/register",
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
} satisfies Meta<typeof ClubCtaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Գրանցել ակումբը" })).toHaveAttribute("href", "/clubs/register");
  },
};
