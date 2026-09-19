import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { FeaturedEventCard } from "./FeaturedEventCard";

const meta = {
  component: FeaturedEventCard,
  tags: ["ai-generated"],
  args: {
    eyebrow: "ՀԱՋՈՐԴ ՄԵԿՆՈՒՄԸ",
    startsAt: new Date(Date.now() + ((24 + 18) * 60 + 41) * 60_000).toISOString(),
    countdownLabels: { days: "ՕՐ", hours: "ԺԱՄ", minutes: "ՐՈՊԵ" },
    title: "Արագած՝ հարավային գագաթ",
    meta: "Կասկադ, Երևան · 06:00 · Հայաստանի արահետներ",
    places: { free: 4, total: 16 },
    freeLabel: "ազատ",
    cta: { label: "Ամրագրել տեղը", href: "/events/aragats-southern-peak" },
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 320, padding: 24, background: "linear-gradient(135deg, #3f4b49, #0b1011)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeaturedEventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Shows places REMAINING ("4 / 16 ազատ"): on the hero the question is "can I still go".
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("4 / 16 ազատ")).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Ամրագրել տեղը" })).toHaveAttribute(
      "href",
      "/events/aragats-southern-peak",
    );
  },
};
export const AlmostFull: Story = { args: { places: { free: 1, total: 16 } } };
