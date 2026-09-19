import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { AppliedFilterBar } from "./AppliedFilterBar";

const meta = {
  component: AppliedFilterBar,
  tags: ["ai-generated"],
  args: {
    resultCount: 14,
    filters: [
      { key: "activity:hiking", label: "Արշավ", href: "/events" },
      { key: "region:syunik", label: "Սյունիք", href: "/events" },
      { key: "difficulty:hard", label: "Դժվար", href: "/events" },
      { key: "price", label: "մինչև 25 000 ֏", href: "/events" },
    ],
    clearAllHref: "/events",
    clearAllLabel: "Մաքրել բոլորը",
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof AppliedFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// The count is a polite live region; every chip is a link that undoes just that filter.
export const Many: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("14 արդյունք")).toBeVisible();
    await expect(canvas.getAllByRole("link", { name: /Հեռացնել/ })).toHaveLength(4);
    await expect(canvas.getByRole("link", { name: "Մաքրել բոլորը" })).toBeVisible();
  },
};

// With nothing applied there's no "clear all" — just the count.
export const NoFilters: Story = {
  args: { filters: [], resultCount: 41 },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("link", { name: "Մաքրել բոլորը" })).not.toBeInTheDocument();
  },
};
