import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { clubs } from "@/content/home";
import { ClubsSection } from "./ClubsSection";

const meta = {
  title: "Sections/Home/ClubsSection",
  component: ClubsSection,
  tags: ["ai-generated"],
  args: { heading: clubs.heading, clubs: clubs.items },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ClubsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(4);
    await expect(canvas.getByText("Նոր ակումբ")).toBeVisible();
  },
};
