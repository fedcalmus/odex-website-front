import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { eventDetailCopy } from "@/content/event-detail";
import { BookingWidget } from "./BookingWidget";

const meta = {
  component: BookingWidget,
  tags: ["ai-generated"],
  args: {
    price: "12 000 ֏",
    capacity: { taken: 12, total: 16 },
    bookHref: "/events/aragats-southern-peak/book",
    waitlistHref: "/events/aragats-southern-peak/waitlist",
    labels: eventDetailCopy.booking,
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
} satisfies Meta<typeof BookingWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

// The stepper can't exceed the places left, and the CTA carries the count.
export const Stepper: Story = {
  play: async ({ canvas }) => {
    const plus = canvas.getByRole("button", { name: "Ավելացնել" });
    const cta = canvas.getByRole("link", { name: "Ամրագրել տեղը" });
    await expect(canvas.getByRole("button", { name: "Պակասեցնել" })).toBeDisabled();
    for (let i = 0; i < 6; i++) {
      if (!(plus as HTMLButtonElement).disabled) await userEvent.click(plus);
    }
    await expect(canvas.getByRole("status")).toHaveTextContent("4");
    await expect(plus).toBeDisabled();
    await expect(cta).toHaveAttribute("href", "/events/aragats-southern-peak/book?participants=4");
  },
};

// Under threshold: the orange "N տեղ մնացել" pill appears (permanent urgency is noise).
export const Scarce: Story = {
  args: { capacity: { taken: 15, total: 18 } },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText(/3 տեղ մնացել/).length).toBeGreaterThan(0);
  },
};

// Sold out swaps the CTA for the waitlist: the event stays visible and keeps its demand.
export const SoldOut: Story = {
  args: { capacity: { taken: 16, total: 16 } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Սպասման ցուցակ" })).toBeVisible();
    await expect(canvas.queryByRole("link", { name: "Ամրագրել տեղը" })).not.toBeInTheDocument();
  },
};
