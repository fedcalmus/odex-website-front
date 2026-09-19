import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { guide } from "@/content/home";
import { GuideSection } from "./GuideSection";

const meta = {
  title: "Sections/Home/GuideSection",
  component: GuideSection,
  tags: ["ai-generated"],
  args: { heading: guide.heading, rowLabels: guide.rowLabels, rows: [guide.rows[0], guide.rows[1]] },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof GuideSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// The only full-bleed section: the heading keeps the gutter, the rows run edge to edge.
export const TwoRows: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("list")).toHaveLength(2);
  },
};
export const OneRowOnMobile: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
