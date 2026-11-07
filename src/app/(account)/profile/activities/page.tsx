import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { EventRow } from "@/components/EventRow";
import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { PillTabs } from "@/components/PillTabs";
import { StatCard } from "@/components/StatCard";
import { Tabs } from "@/components/Tabs";
import { TicketCard } from "@/components/TicketCard";
import { activitiesCopy as copy, PROFILE_NAV, statLabels } from "@/content/profile";
import { getClub } from "@/data/clubs";
import { BOOKINGS, SAVED_ITEMS } from "@/data/social";
import type { Booking, BookingStatus } from "@/data/social";
import { CURRENT_USER } from "@/data/user";
import { formatEventDate, formatEventTime, formatInteger, getDateBox } from "@/lib/format";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

const STATUS_VALUES: readonly BookingStatus[] = ["upcoming", "completed", "cancelled"];

function isStatus(value: string | undefined): value is BookingStatus {
  return STATUS_VALUES.includes(value as BookingStatus);
}

export default async function ActivitiesPage({ searchParams }: PageProps<"/profile/activities">) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.status) ? sp.status[0] : sp.status;
  const status: BookingStatus = isStatus(raw) ? raw : "upcoming";

  const upcoming = BOOKINGS.filter((b) => b.status === "upcoming");
  const completed = BOOKINGS.filter((b) => b.status === "completed");
  const cancelled = BOOKINGS.filter((b) => b.status === "cancelled");
  const byStatus: Record<BookingStatus, Booking[]> = { upcoming, completed, cancelled };
  const visible = byStatus[status];

  const activeTicket = upcoming.find((b) => b.ticket);
  const totalDistanceKm = completed.reduce((sum, b) => sum + b.event.route.distanceKm, 0);

  return (
    <>
      <div className={styles.navWrap}>
        <Tabs
          items={PROFILE_NAV.map((item) => ({
            ...item,
            count:
              item.key === "activities" ? upcoming.length : item.key === "saved" ? SAVED_ITEMS.length : undefined,
          }))}
          active="activities"
          label="Պրոֆիլի բաժիններ"
        />
      </div>

      <div className={styles.container}>
        <div className={styles.head}>
          <div>
            <h1 className={styles.title}>{copy.title}</h1>
            <p className={styles.summary}>{copy.summary(upcoming.length, completed.length, totalDistanceKm)}</p>
          </div>
          <ButtonLink href="/events" icon="arrow-right">
            {copy.newBooking}
          </ButtonLink>
        </div>

        {activeTicket?.ticket ? (
          <div className={styles.hero}>
            <p className={styles.heroEyebrow}>{copy.activeTicketLabel}</p>
            <TicketCard title={activeTicket.event.title} validLabel={copy.validTicket} code={activeTicket.ticket.code} />
            <div className={styles.heroMeta}>
              <p className={styles.heroRow}>
                <Icon name="calendar" size={18} />
                {formatEventDate(activeTicket.event.startsAt)} · {formatEventTime(activeTicket.event.startsAt)}
              </p>
              <p className={styles.heroRow}>
                <Icon name="map-pin" size={18} />
                {getClub(activeTicket.event.club).name}
              </p>
              <p className={styles.heroRow}>
                <Icon name="user" size={18} />
                {activeTicket.ticket.guideName} · {activeTicket.ticket.guidePhone}
              </p>

              <div className={styles.heroActions}>
                <ButtonLink
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getClub(activeTicket.event.club).name)}`}
                  icon="navigation"
                >
                  {copy.navigate}
                </ButtonLink>
                <IconButton icon="calendar" label={copy.details} />
                <IconButton icon="share-2" label={copy.details} />
                <ButtonLink href={`/profile/tickets/${activeTicket.ticket.code}`} variant="secondary" size="small">
                  {copy.details}
                </ButtonLink>
              </div>

              <div className={styles.heroFooter}>
                <span>{formatEventDate(activeTicket.event.startsAt)} ժամը 20:00-ից անվճար չեղարկում</span>
                <ButtonLink href={`/profile/tickets/${activeTicket.ticket.code}`} variant="ghost" className={styles.cancelLink}>
                  {copy.cancelBooking}
                </ButtonLink>
              </div>
            </div>
          </div>
        ) : null}

        <div className={styles.body}>
          <div className={styles.main}>
            <PillTabs
              label={copy.title}
              active={status}
              items={[
                { key: "upcoming", href: "/profile/activities?status=upcoming", label: copy.status.upcoming, count: upcoming.length },
                { key: "completed", href: "/profile/activities?status=completed", label: copy.status.completed, count: completed.length },
                { key: "cancelled", href: "/profile/activities?status=cancelled", label: copy.status.cancelled, count: cancelled.length },
              ]}
            />

            <div className={styles.section}>
              {visible.length === 0 ? (
                <EmptyState title={copy.emptyTitle} description={copy.emptyDescription} action={{ label: copy.emptyAction, href: "/events" }} />
              ) : (
                <div className={styles.rows}>
                  {visible.map((booking) => {
                    const club = getClub(booking.event.club);
                    const action =
                      booking.status === "upcoming" && booking.ticket ? (
                        <>
                          <span className={styles.validLabel}>{copy.validTicket}</span>
                          <ButtonLink href={`/profile/tickets/${booking.ticket.code}`} size="small">
                            {copy.ticket}
                          </ButtonLink>
                        </>
                      ) : booking.status === "completed" ? (
                        <ButtonLink href="/profile/activities" variant="secondary" size="small">
                          {copy.rate}
                        </ButtonLink>
                      ) : (
                        <p className={styles.cancelledNote}>{booking.cancelledNote}</p>
                      );

                    return (
                      <EventRow
                        key={booking.event.slug}
                        date={getDateBox(booking.event.startsAt)}
                        image={booking.event.image}
                        club={{ name: club.name, logo: club.logo }}
                        title={booking.event.title}
                        href={`/events/${booking.event.slug}`}
                        meta={`${formatInteger(booking.event.route.distanceKm)} կմ · ${formatInteger(booking.event.route.ascentM)} մ`}
                        action={action}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <StatCard icon="navigation" label={statLabels.distance} value={`${formatInteger(CURRENT_USER.stats.distanceKm)} կմ`} />
            <StatCard icon="mountain" label={statLabels.ascent} value={`${formatInteger(CURRENT_USER.stats.ascentM)} մ`} />
            <StatCard icon="calendar-check" label={statLabels.completed} value={formatInteger(CURRENT_USER.stats.completedCount)} />
            <StatCard icon="award" label={statLabels.badges} value={formatInteger(CURRENT_USER.stats.badgeCount)} />
          </aside>
        </div>
      </div>
    </>
  );
}
