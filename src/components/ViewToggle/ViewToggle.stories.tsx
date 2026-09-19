import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ViewToggle } from "./ViewToggle";

const meta = {
  component: ViewToggle,
  tags: ["ai-generated"],
  args: {
    value: "grid",
    hrefs: { grid: "/events", list: "/events?view=list" },
    labels: { group: "Տեսք", grid: "Ցանցային տեսք", list: "Ցուցակային տեսք" },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof ViewToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grid: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Ցանցային տեսք" })).toHaveAttribute("aria-current", "true");
    await expect(canvas.getByRole("link", { name: "Ցուցակային տեսք" })).toHaveAttribute("href", "/events?view=list");
  },
};
export const List: Story = { args: { value: "list" } };
