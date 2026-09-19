import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CheckoutParticipants } from "@/sections/checkout/CheckoutParticipants";
import { checkoutCopy, HOLD_MINUTES, MAX_TICKETS_PER_BOOKING } from "@/content/checkout";
import { getClub } from "@/data/clubs";
import { getEventBySlug, toEventCardProps } from "@/data/events";
import { CURRENT_USER } from "@/data/user";
import { getAvailability } from "@/lib/capacity";
import { formatDayMonthGenitive, formatEventTime } from "@/lib/format";

// A booking in progress is private to the visitor.
export const metadata: Metadata = {
  title: checkoutCopy.title,
  robots: { index: false, follow: false },
};

export default async function BookPage({ params, searchParams }: PageProps<"/events/[slug]/book">) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const { remaining, soldOut } = getAvailability(event.capacity.taken, event.capacity.total);
  // Nothing to book: back to the event, whose page offers the waitlist.
  if (soldOut) redirect(`/events/${slug}`);

  // ?participants= comes from the booking widget; never trust it beyond what can actually be booked.
  const maxTickets = Math.min(MAX_TICKETS_PER_BOOKING, remaining);
  const requested = Number.parseInt(String((await searchParams).participants ?? "1"), 10);
  const initialQuantity = Math.min(Math.max(Number.isFinite(requested) ? requested : 1, 1), maxTickets);

  const club = getClub(event.club);
  // The hold starts when the page is served; a real booking API would create it server-side.
  const holdEndsAt = new Date(Date.now() + HOLD_MINUTES * 60_000).toISOString();

  return (
    <CheckoutParticipants
      slug={slug}
      event={toEventCardProps(event)}
      eventMeta={`${formatDayMonthGenitive(event.startsAt)} · ${formatEventTime(event.startsAt)} · ${club.name}`}
      maxTickets={maxTickets}
      initialQuantity={initialQuantity}
      holdEndsAt={holdEndsAt}
      buyer={{
        name: `${CURRENT_USER.firstName} ${CURRENT_USER.lastName}`,
        health: CURRENT_USER.healthNote,
        contact: `${CURRENT_USER.emergencyName} ${CURRENT_USER.emergencyPhone}`,
      }}
      nextHref={`/events/${slug}/book/payment`}
      buyerChangeHref="/account/profile"
    />
  );
}
