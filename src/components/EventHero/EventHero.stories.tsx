import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { eventDetailCopy } from "@/content/event-detail";
import { EventHero } from "./EventHero";

const meta = {
  component: EventHero,
  tags: ["ai-generated"],
  args: {
    title: "Արագած՝ հարավային գագաթ",
    breadcrumb: [
      { label: "Միջոցառումներ", href: "/events" },
      { label: "Արագածոտն", href: "/events?region=aragatsotn" },
    ],
    images: [
      "/images/events/aragats-hero.png",
      "/images/events/aragats-thumb-1.png",
      "/images/events/aragats-thumb-2.png",
      "/images/events/aragats-thumb-3.png",
      "/images/events/aragats-thumb-4.png",
    ],
    moreCount: 7,
    weather: { condition: "clear", temperature: 6, conditionLabel: "Պարզ" },
    startsAt: "2026-09-11T06:00:00+04:00",
    difficulty: "moderate",
    club: { name: "Հայաստանի արահետներ", href: "/clubs/armenia-trails", logo: "/images/clubs/club-logo-detail.png" },
    rating: { value: 4.9, count: 128 },
    labels: eventDetailCopy.heroLabels,
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof EventHero>;

export default meta;
type Story = StoryObj<typeof meta>;

// The page's one <h1>; the strip swaps the photo.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 1, name: "Արագած՝ հարավային գագաթ" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Լուսանկար 2" }));
    await expect(canvas.getByRole("button", { name: "Լուսանկար 2" })).toHaveAttribute("aria-pressed", "true");
  },
};

// Favourite is a toggle.
export const Favourite: Story = {
  play: async ({ canvas }) => {
    const heart = canvas.getByRole("button", { name: "Ավելացնել ընտրյալներում" });
    await userEvent.click(heart);
    await expect(heart).toHaveAttribute("aria-pressed", "true");
  },
};

// "+N" opens the full gallery in a native dialog (modal; Escape closes it in a real browser).
export const GalleryDialog: Story = {
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Բոլոր լուսանկարները" }));
    const dialog = canvasElement.querySelector("dialog")!;
    await expect(dialog).toHaveAttribute("open");
    await userEvent.click(within(dialog).getByRole("button", { name: "Փակել" }));
    await expect(dialog).not.toHaveAttribute("open");
  },
};

// A single photo hides the strip.
export const SinglePhoto: Story = { args: { images: ["/images/events/aragats-hero.png"], moreCount: undefined } };
