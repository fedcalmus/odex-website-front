import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ButtonLink } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { TicketCard } from "@/components/TicketCard";
import { activitiesCopy, breadcrumbNavLabel, homeBreadcrumb, ticketDetailCopy as copy } from "@/content/profile";
import { getClub } from "@/data/clubs";
import { BOOKINGS, hasTicket } from "@/data/social";
import { formatEventDate, formatEventTime } from "@/lib/format";
import styles from "./page.module.scss";

const TICKETED_BOOKINGS = BOOKINGS.filter(hasTicket);

export function generateStaticParams() {
  return TICKETED_BOOKINGS.map((booking) => ({ id: booking.ticket.code }));
}

export async function generateMetadata({ params }: PageProps<"/profile/tickets/[id]">): Promise<Metadata> {
  const { id } = await params;
  const booking = TICKETED_BOOKINGS.find((entry) => entry.ticket.code === id);
  return {
    title: booking ? booking.event.title : "Տոմս",
    robots: { index: false, follow: false },
  };
}

export default async function TicketDetailPage({ params }: PageProps<"/profile/tickets/[id]">) {
  const { id } = await params;
  const booking = TICKETED_BOOKINGS.find((entry) => entry.ticket.code === id);
  if (!booking) notFound();

  const { event, ticket } = booking;
  const club = getClub(event.club);
  const detail = event.detail;
  // The route panel needs all three legs — a partial itinerary would be more
  // confusing than none, so it's shown only when the event has full detail.
  const route =
    detail?.meeting && detail?.departure && detail?.return
      ? { meeting: detail.meeting, departure: detail.departure, return: detail.return }
      : undefined;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    route?.meeting.place ?? club.name,
  )}`;

  return (
    <div className={styles.container}>
      <Breadcrumb
        label={breadcrumbNavLabel}
        items={[
          homeBreadcrumb,
          { label: activitiesCopy.title, href: "/profile/activities" },
          { label: event.title, href: `/profile/tickets/${ticket.code}` },
        ]}
      />

      <div className={styles.toolbar}>
        <ButtonLink href={`/profile/tickets/${ticket.code}`} variant="secondary" icon="download">
          {copy.downloadPdf}
        </ButtonLink>
      </div>

      <div className={styles.body}>
        <div className={styles.left}>
          <TicketCard title={event.title} validLabel={copy.validLabel} code={ticket.code} />

          <div className={styles.metaRow}>
            <p className={styles.metaLabel}>{copy.dateLabel}</p>
            <p className={styles.metaValue}>
              {formatEventDate(event.startsAt)} · {formatEventTime(event.startsAt)}
            </p>
          </div>
          <div className={styles.metaRow}>
            <p className={styles.metaLabel}>{copy.placeLabel}</p>
            <p className={styles.metaValue}>{route?.meeting.place ?? club.name}</p>
          </div>
          <div className={styles.metaRow}>
            <p className={styles.metaLabel}>{copy.guideLabel}</p>
            <p className={styles.metaValue}>
              {ticket.driverName} · {ticket.driverPhone}
            </p>
          </div>

          <div className={styles.actions}>
            <ButtonLink href={mapsHref} icon="navigation">
              {copy.navigate}
            </ButtonLink>
            <IconButton icon="calendar" label={copy.navigate} />
            <IconButton icon="share-2" label={copy.navigate} />
          </div>

          <div className={styles.cancelBlock}>
            <ButtonLink href={`/profile/tickets/${ticket.code}`} variant="secondary" fullWidth>
              {copy.cancel}
            </ButtonLink>
            <p className={styles.cancelCaption}>{copy.cancelDeadline(formatEventDate(event.startsAt))}</p>
          </div>
        </div>

        <div className={styles.right}>
          <div>
            <h1 className={styles.title}>{event.title}</h1>
            <p className={styles.subtitle}>
              {formatEventDate(event.startsAt)} · {club.name} · {event.route.durationHours} ժամ
            </p>
          </div>

          {route ? (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>{copy.routeTitle}</h2>
              {[
                { icon: "map-pin" as const, label: copy.meeting, place: route.meeting.place, time: route.meeting.time },
                { icon: "mountain" as const, label: copy.departure, place: route.departure.place, time: route.departure.time },
                { icon: "navigation" as const, label: copy.returnPoint, place: route.return.place, time: route.return.time },
              ].map((step) => (
                <div key={step.label} className={styles.routeStep}>
                  <div className={styles.routeStepLeft}>
                    <Icon name={step.icon} size={18} />
                    <div>
                      <p className={styles.routeStepLabel}>{step.label}</p>
                      <p className={styles.routeStepPlace}>{step.place}</p>
                    </div>
                  </div>
                  <span className={styles.routeStepTime}>{step.time}</span>
                </div>
              ))}
              <p className={styles.warning}>
                <Icon name="alert-triangle" size={16} />
                {copy.warning}
              </p>
            </div>
          ) : null}

          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>{copy.contactTitle}</h2>
            <div className={styles.contactGrid}>
              <div>
                <p className={styles.contactRole}>{copy.driverRole}</p>
                <p className={styles.contactName}>{ticket.driverName}</p>
                <p className={styles.contactPhone}>{ticket.driverPhone}</p>
              </div>
              <div>
                <p className={styles.contactRole}>{copy.guideRole}</p>
                <p className={styles.contactName}>{ticket.guideName}</p>
                <p className={styles.contactPhone}>{ticket.guidePhone}</p>
              </div>
              <div>
                <p className={styles.contactRole}>{copy.emergencyRole}</p>
                <p className={styles.contactName}>{copy.emergencyNumber}</p>
              </div>
            </div>
          </div>

          {detail?.gear?.length ? (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>{copy.gearTitle}</h2>
              <div className={styles.gearList}>
                {detail.gear.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
