import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { EventRow } from "@/components/EventRow";
import { Tabs } from "@/components/Tabs";
import { PROFILE_NAV, ticketsCopy as copy } from "@/content/profile";
import { getClub } from "@/data/clubs";
import { BOOKINGS, hasTicket, SAVED_ITEMS } from "@/data/social";
import { formatEventDate, formatEventTime, getDateBox } from "@/lib/format";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

export default function TicketsPage() {
  const ticketed = BOOKINGS.filter(hasTicket);
  const upcomingCount = BOOKINGS.filter((b) => b.status === "upcoming").length;

  return (
    <>
      <div className={styles.navWrap}>
        <Tabs
          items={PROFILE_NAV.map((item) => ({
            ...item,
            count:
              item.key === "activities" ? upcomingCount : item.key === "tickets" ? ticketed.length : item.key === "saved" ? SAVED_ITEMS.length : undefined,
          }))}
          active="tickets"
          label="Պրոֆիլի բաժիններ"
        />
      </div>

      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.summary}>{copy.summary(ticketed.length)}</p>
        </div>

        {ticketed.length === 0 ? (
          <EmptyState title={copy.empty} />
        ) : (
          <div className={styles.rows}>
            {ticketed.map((booking) => {
              const club = getClub(booking.event.club);
              return (
                <EventRow
                  key={booking.event.slug}
                  date={getDateBox(booking.event.startsAt)}
                  image={booking.event.image}
                  club={{ name: club.name, logo: club.logo }}
                  title={booking.event.title}
                  href={`/events/${booking.event.slug}`}
                  meta={`${formatEventDate(booking.event.startsAt)} · ${formatEventTime(booking.event.startsAt)}`}
                  action={
                    <ButtonLink href={`/profile/tickets/${booking.ticket.code}`} size="small">
                      {copy.open}
                    </ButtonLink>
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
