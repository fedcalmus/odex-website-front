import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { SortSelect } from "./SortSelect";

const meta = {
  component: SortSelect,
  tags: ["ai-generated"],
  args: {
    pathname: "/events",
    query: "",
    defaultValue: "soonest",
    value: "soonest",
    label: "Դասավորել՝",
    options: [
      { value: "soonest", label: "Ամենամոտը", description: "Մեկնման ամսաթվով", icon: "clock" },
      { value: "cheapest", label: "Ամենաէժանը", description: "Գնով՝ ցածրից բարձր", icon: "wallet" },
    ],
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof SortSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// A native <details>: opening it reveals each option as a real link that writes ?sort= to the URL.
export const Default: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Դասավորել՝"));
    const option = await canvas.findByRole("link", { name: /Ամենաէժանը/ });
    await expect(option).toHaveAttribute("href", "/events?sort=cheapest");
  },
};

// Sorting keeps every filter that is already applied.
export const KeepsFilters: Story = {
  args: { query: "activity=hiking&maxPrice=25000" },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Դասավորել՝"));
    const option = await canvas.findByRole("link", { name: /Ամենաէժանը/ });
    await expect(option).toHaveAttribute("href", "/events?activity=hiking&maxPrice=25000&sort=cheapest");
  },
};

// The current choice is highlighted lime and marked with a check.
export const ActiveOption: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Դասավորել՝"));
    const active = await canvas.findByRole("link", { name: /Ամենամոտը/ });
    await expect(active).toHaveAttribute("aria-current", "true");
  },
};
