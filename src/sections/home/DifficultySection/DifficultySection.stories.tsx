import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { difficulty } from "@/content/home";
import { DifficultySection } from "./DifficultySection";

const meta = {
  title: "Sections/Home/DifficultySection",
  component: DifficultySection,
  tags: ["ai-generated"],
  args: { heading: difficulty.heading, levels: difficulty.levels },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DifficultySection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Teaches the four-step scale once, in human terms, before anyone books.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(4);
  },
};
