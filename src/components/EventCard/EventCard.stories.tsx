import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { getEventBySlug, toEventCardProps } from "@/data/events";
import { EventCard } from "./EventCard";

// Real catalog records, so the card is shown with the data it really receives.
const card = (slug: string) => toEventCardProps(getEventBySlug(slug)!);

const meta = {
  component: EventCard,
  tags: ["ai-generated"],
  args: card("dilijan-forest-loop"),
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 336 }}><Story /></div>],
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// The whole card is one link, named by the title, going to the detail page.
export const Default: Story = {
  play: async ({ canvas, args }) => {
    const link = canvas.getByRole("link", { name: args.title });
    await expect(link).toHaveAttribute("href", args.href);
  },
};

// Keyboard: Tab lands on the (stretched) title link.
export const KeyboardFocus: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("link", { name: args.title })).toHaveFocus();
  },
};

// ≤3 places left or ≥90% full: an orange badge appears, and the bar turns orange.
export const Scarce: Story = {
  args: card("khustup-summit"),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1 տեղ մնացել է")).toBeVisible();
  },
};

// Sold out: dimmed photo, quiet badge. The card stays — a vanishing event reads as a bug.
export const SoldOut: Story = {
  args: card("sevan-lake-sup"),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Լրացված")).toBeVisible();
  },
};

export const Easy: Story = { args: card("tsaghkadzor-evening-walk") };

// No forecast → no pill. A placeholder temperature is worse than none.
export const NoWeather: Story = { args: { ...card("dilijan-forest-loop"), weather: undefined } };

// Homepage grid: three across at 1360.
export const HomepageRow: Story = {
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => <div style={{ width: 1360, margin: "0 auto", padding: 24 }}><Story /></div>],
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
      {["aragats-southern-peak", "khustup-summit", "sevan-lake-sup"].map((slug) => (
        <EventCard key={slug} {...card(slug)} />
      ))}
    </div>
  ),
};

// Checkout rail: a plain summary, not a link — every link out of a checkout is a lost booking.
export const StaticSummary: Story = {
  args: { ...card("aragats-southern-peak"), static: true },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("link")).not.toBeInTheDocument();
    await expect(canvas.getByRole("heading", { name: "Արագած՝ հարավային գագաթ" })).toBeVisible();
  },
};
