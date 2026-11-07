import type { Metadata } from "next";
import { ActivityTag } from "@/components/ActivityTag";
import { ButtonLink } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { EventRow } from "@/components/EventRow";
import { Icon } from "@/components/Icon";
import { PillTabs } from "@/components/PillTabs";
import { Tabs } from "@/components/Tabs";
import { PROFILE_NAV, savedCopy as copy } from "@/content/profile";
import { getActivity } from "@/data/activities";
import { getClub } from "@/data/clubs";
import { BOOKINGS, SAVED_ITEMS } from "@/data/social";
import { formatInteger, formatPrice, getDateBox } from "@/lib/format";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

type SavedFilter = "all" | "upcoming" | "past";

export default async function SavedPage({ searchParams }: PageProps<"/profile/saved">) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.when) ? sp.when[0] : sp.when;
  const when: SavedFilter = raw === "upcoming" || raw === "past" ? raw : "all";

  const upcoming = SAVED_ITEMS.filter((item) => item.when === "upcoming");
  const past = SAVED_ITEMS.filter((item) => item.when === "past");
  const visible = when === "all" ? SAVED_ITEMS : when === "upcoming" ? upcoming : past;

  const byClub = new Map<string, number>();
  for (const item of SAVED_ITEMS) {
    const club = getClub(item.event.club);
    byClub.set(club.name, (byClub.get(club.name) ?? 0) + 1);
  }

  const upcomingBookingCount = BOOKINGS.filter((b) => b.status === "upcoming").length;

  return (
    <>
      <div className={styles.navWrap}>
        <Tabs
          items={PROFILE_NAV.map((item) => ({
            ...item,
            count:
              item.key === "activities" ? upcomingBookingCount : item.key === "saved" ? SAVED_ITEMS.length : undefined,
          }))}
          active="saved"
          label="Պրոֆիլի բաժիններ"
        />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>{copy.title}</h1>

        <div className={styles.body}>
          <div className={styles.main}>
            <PillTabs
              label={copy.title}
              active={when}
              items={[
                { key: "all", href: "/profile/saved?when=all", label: copy.filters.all, count: SAVED_ITEMS.length },
                { key: "upcoming", href: "/profile/saved?when=upcoming", label: copy.filters.upcoming, count: upcoming.length },
                { key: "past", href: "/profile/saved?when=past", label: copy.filters.past, count: past.length },
              ]}
            />

            {visible.length === 0 ? (
              <EmptyState title={copy.emptyTitle} description={copy.emptyDescription} action={{ label: copy.emptyAction, href: "/events" }} />
            ) : (
              <div className={styles.rows}>
                {visible.map(({ event }) => {
                  const club = getClub(event.club);
                  const activity = getActivity(event.activity);
                  return (
                    <EventRow
                      key={event.slug}
                      date={getDateBox(event.startsAt)}
                      image={event.image}
                      club={{ name: club.name, logo: club.logo }}
                      title={event.title}
                      href={`/events/${event.slug}`}
                      tag={activity ? <ActivityTag label={activity.title} icon={activity.icon} /> : undefined}
                      meta={`${formatInteger(event.route.distanceKm)} կմ · ${formatInteger(event.capacity.total - event.capacity.taken)} տեղ մնացել է`}
                      action={
                        <>
                          <span className={styles.price}>{formatPrice(event.price.amount)}</span>
                          <ButtonLink href={`/events/${event.slug}/book`} size="small">
                            {copy.book}
                          </ButtonLink>
                        </>
                      }
                    />
                  );
                })}
              </div>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <Icon name="bell" size={18} color="var(--color-brand-primary)" />
                <p className={styles.cardTitle}>{copy.notificationsTitle}</p>
              </div>
              <p className={styles.cardBody}>{copy.notificationsBody}</p>
              <ButtonLink href="/profile/settings" variant="secondary" size="small" className={styles.cardAction}>
                {copy.notificationsAction}
              </ButtonLink>
            </div>

            <div className={styles.card}>
              <p className={styles.cardTitle}>{copy.fromClubsTitle}</p>
              {Array.from(byClub.entries()).map(([name, count]) => (
                <div key={name} className={styles.clubRow}>
                  <span className={styles.clubName}>{name}</span>
                  <span className={styles.clubCount}>{count}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
