import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { searchBand } from "@/content/home";
import { SearchBand } from "./SearchBand";

const meta = {
  component: SearchBand,
  tags: ["ai-generated"],
  args: searchBand,
  parameters: { layout: "padded" },
} satisfies Meta<typeof SearchBand>;

export default meta;
type Story = StoryObj<typeof meta>;

// Label-over-value segments — each self-describes even when nothing is chosen.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("search", { name: "Միջոցառումների որոնում" })).toBeVisible();
    await expect(canvas.getByRole("combobox", { name: /ԱՄՍԱԹԻՎ/ })).toHaveValue("this-weekend");
    await userEvent.selectOptions(canvas.getByRole("combobox", { name: /ԲԱՐԴՈՒԹՅՈՒՆ/ }), "moderate");
    await expect(canvas.getByRole("combobox", { name: /ԲԱՐԴՈՒԹՅՈՒՆ/ })).toHaveValue("moderate");
  },
};

// Filters the band has no segment for ride along as hidden inputs.
export const CarriesOtherFilters: Story = {
  args: { hidden: [["region", "syunik"], ["sort", "cheapest"]] },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('input[name="region"]')).toHaveValue("syunik");
  },
};
