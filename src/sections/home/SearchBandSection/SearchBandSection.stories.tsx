import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { searchBand } from "@/content/home";
import { SearchBandSection } from "./SearchBandSection";

const meta = {
  title: "Sections/Home/SearchBandSection",
  component: SearchBandSection,
  tags: ["ai-generated"],
  args: searchBand,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SearchBandSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Pulled up 44px so it straddles the hero boundary.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("search")).toBeVisible();
  },
};
