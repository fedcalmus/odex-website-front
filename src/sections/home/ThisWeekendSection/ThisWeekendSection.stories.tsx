import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { thisWeekend } from "@/content/home";
import { ThisWeekendSection } from "./ThisWeekendSection";

const meta = {
  title: "Sections/Home/ThisWeekendSection",
  component: ThisWeekendSection,
  tags: ["ai-generated"],
  args: { heading: thisWeekend.heading, events: thisWeekend.events },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ThisWeekendSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// The heading link goes to discovery; each card goes to its detail page.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: /Բոլոր միջոցառումները/ })).toHaveAttribute("href", "/events");
    await expect(canvas.getByRole("link", { name: "Արագած՝ հարավային գագաթ" })).toHaveAttribute(
      "href",
      "/events/aragats-southern-peak",
    );
  },
};
