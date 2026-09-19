import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
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
      { value: "soonest", label: "Ամենամոտը" },
      { value: "cheapest", label: "Ամենաէժանը" },
    ],
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof SortSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// A native <select>: choosing an option writes ?sort= to the URL (router.replace — no history spam).
export const Default: Story = {
  play: async ({ canvas }) => {
    await userEvent.selectOptions(canvas.getByRole("combobox"), "cheapest");
    await expect(getRouter().replace).toHaveBeenCalledWith("/events?sort=cheapest", { scroll: false });
  },
};

// Sorting keeps every filter that is already applied.
export const KeepsFilters: Story = {
  args: { query: "activity=hiking&maxPrice=25000" },
  play: async ({ canvas }) => {
    await userEvent.selectOptions(canvas.getByRole("combobox"), "cheapest");
    await expect(getRouter().replace).toHaveBeenCalledWith(
      "/events?activity=hiking&maxPrice=25000&sort=cheapest",
      { scroll: false },
    );
  },
};
