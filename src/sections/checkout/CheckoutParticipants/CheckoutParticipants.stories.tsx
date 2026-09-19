import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, userEvent, waitFor } from "storybook/test";
import { getEventBySlug, toEventCardProps } from "@/data/events";
import { CheckoutParticipants } from "./CheckoutParticipants";

const event = getEventBySlug("aragats-southern-peak")!;

const meta = {
  title: "Sections/Checkout/CheckoutParticipants",
  component: CheckoutParticipants,
  tags: ["ai-generated"],
  args: {
    slug: event.slug,
    event: toEventCardProps(event),
    eventMeta: "11 սեպտեմբերի · 06:00 · Հայաստանի արահետներ",
    maxTickets: 4,
    initialQuantity: 2,
    holdEndsAt: new Date(Date.now() + 15 * 60_000).toISOString(),
    buyer: { name: "Անուշ Օրինակյան", health: "Ասթմա", contact: "Արամ Օ. (091) 55-0022" },
    nextHref: "/events/aragats-southern-peak/book/payment",
    buyerChangeHref: "/account/profile",
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CheckoutParticipants>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoTickets: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("2 · Երկրորդ մասնակից")).toBeVisible();
    await expect(canvas.getByText("Տոմս × 2")).toBeVisible();
  },
};

// The quantity drives everything: blocks, the order summary and the price on the CTA.
export const QuantityDrivesTheOrder: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Ավելացնել" }));
    await expect(canvas.getByText("3 · Երրորդ մասնակից")).toBeVisible();
    await expect(canvas.getByRole("button", { name: /Շարունակել · 36/ })).toBeVisible();
  },
};

// Nothing is submitted while a required field is empty; optional fields never complain.
export const BlocksIncompleteSubmit: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: /Շարունակել · 24/ }));
    await waitFor(() => expect(canvas.getAllByRole("alert").length).toBe(5));
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};

// "Send a link": the participant fills their own details, so nothing more is asked of the buyer.
export const InviteContinues: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("radio", { name: /Ուղարկել հղում/ }));
    await expect(canvas.queryByRole("textbox", { name: /Անուն/ })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /Շարունակել · 24/ }));
    await waitFor(() =>
      expect(getRouter().push).toHaveBeenCalledWith("/events/aragats-southern-peak/book/payment?participants=2"),
    );
  },
};

export const OneTicket: Story = {
  args: { initialQuantity: 1 },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText("2 · Երկրորդ մասնակից")).not.toBeInTheDocument();
  },
};

export const OnlyOnePlaceLeft: Story = {
  args: { maxTickets: 1, initialQuantity: 1 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Ավելացնել" })).toBeDisabled();
  },
};
