import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { LoadMore } from "./LoadMore";

const meta = {
  component: LoadMore,
  tags: ["ai-generated"],
  args: {
    status: "Ցուցադրված է 8 · հաջորդ մեկնումը 18 սեպտեմբերին",
    actionLabel: "Տեսնել հաջորդ շաբաթը",
    href: "/events?when=next-week",
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof LoadMore>;

export default meta;
type Story = StoryObj<typeof meta>;

// Paging by TIME, as a crawlable link.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Տեսնել հաջորդ շաբաթը" })).toHaveAttribute(
      "href",
      "/events?when=next-week",
    );
  },
};

// "Show more" stays on the page, so it carries no forward arrow.
export const ShowMoreNoIcon: Story = {
  args: { status: "Ցուցադրված է 6 / 34", actionLabel: "Ցույց տալ ևս 12", href: "/clubs?limit=18", icon: null },
};
