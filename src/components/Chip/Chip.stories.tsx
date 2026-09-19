import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Chip, FilterChip } from "./Chip";

const meta = {
  component: Chip,
  tags: ["ai-generated"],
  args: { children: "Արահետային կոշիկ" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// A static chip — the gear checklist. Not interactive.
export const Static: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Արահետային կոշիկ")).toBeVisible();
  },
};

// An applied filter: a link whose name says what it does, so it works without JS.
export const Removable: Story = {
  render: () => <FilterChip label="Արշավ" href="/events" />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Հեռացնել Արշավ" })).toHaveAttribute("href", "/events");
  },
};
