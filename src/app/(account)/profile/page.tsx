import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CardGrid } from "@/components/CardGrid";
import { ButtonLink } from "@/components/Button";
import { Avatar } from "@/components/Avatar";
import { EventCard } from "@/components/EventCard";
import { Icon } from "@/components/Icon";
import { StatCard } from "@/components/StatCard";
import { Tabs } from "@/components/Tabs";
import { PROFILE_NAV, profileFullName, profileOverviewCopy as copy, statLabels } from "@/content/profile";
import {
  BADGES,
  BOOKINGS,
  FOLLOWED_CLUBS,
  FOLLOW_REQUESTS,
  GALLERY_PHOTOS,
  GALLERY_TOTAL,
  MONTHLY_ACTIVITY,
  SAVED_ITEMS,
} from "@/data/social";
import { toEventCardProps } from "@/data/events";
import { CURRENT_USER } from "@/data/user";
import { formatInteger } from "@/lib/format";
import { BadgesPanel } from "@/sections/profile/BadgesPanel";
import { ActivityBarChart } from "@/components/ActivityBarChart";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: copy.title,
  // Account screens are not for search engines.
  robots: { index: false, follow: false },
};

// The next distance badge sits at 300 km (Figma "Profile — MP-09": "300 կմ ·
// Մնացել է 52 կմ" against the current 248 km total).
const NEXT_BADGE_TARGET_KM = 300;

export default function ProfilePage() {
  const upcomingCount = BOOKINGS.filter((b) => b.status === "upcoming").length;
  const ticketsCount = BOOKINGS.filter((b) => b.ticket).length;
  const earnedBadges = BADGES.filter((b) => b.progress >= 1).length;
  const completedBookings = BOOKINGS.filter((b) => b.status === "completed");
  const remainingKm = Math.max(NEXT_BADGE_TARGET_KM - CURRENT_USER.stats.distanceKm, 0);
  const badgeProgressRatio = Math.min(CURRENT_USER.stats.distanceKm / NEXT_BADGE_TARGET_KM, 1);

  return (
    <>
      <div className={styles.navWrap}>
        <Tabs
          items={PROFILE_NAV.map((item) => ({
            ...item,
            count:
              item.key === "activities"
                ? upcomingCount
                : item.key === "tickets"
                  ? ticketsCount
                  : item.key === "saved"
                    ? SAVED_ITEMS.length
                    : undefined,
          }))}
          active="profile"
          label="Պրոֆիլի բաժիններ"
        />
      </div>

      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.identity}>
            <Avatar name={profileFullName} photo={CURRENT_USER.avatar} size="xl" />
            <div>
              <h1 className={styles.name}>{profileFullName}</h1>
              <p className={styles.meta}>{copy.memberSince(CURRENT_USER.memberSinceYear)}</p>
              <p className={styles.social}>
                <strong>{formatInteger(CURRENT_USER.social.followers)}</strong> {copy.followersSuffix} ·{" "}
                <strong>{formatInteger(CURRENT_USER.social.following)}</strong> ·{" "}
                <strong>{formatInteger(FOLLOWED_CLUBS.length)}</strong> ակումբ
                <Link href="/profile/following" className={styles.manageLink}>
                  {copy.followingManage}
                </Link>
              </p>
            </div>
          </div>
          <ButtonLink href="/profile" variant="secondary" icon="qr-code">
            {copy.qrAction}
          </ButtonLink>
        </div>

        <div className={styles.stats}>
          <StatCard icon="navigation" label={statLabels.distance} value={`${formatInteger(CURRENT_USER.stats.distanceKm)} կմ`} />
          <StatCard icon="mountain" label={statLabels.ascent} value={`${formatInteger(CURRENT_USER.stats.ascentM)} մ`} />
          <StatCard icon="calendar-check" label={statLabels.completed} value={formatInteger(CURRENT_USER.stats.completedCount)} />
          <StatCard icon="award" label={statLabels.badges} value={formatInteger(CURRENT_USER.stats.badgeCount)} />
        </div>

        <div className={styles.body}>
          <div className={styles.main}>
            <BadgesPanel badges={BADGES} title={copy.badgesTitle} countLabel={copy.badgesCount(earnedBadges, BADGES.length)} />

            <div className={styles.chartPanel}>
              <div className={styles.chartHead}>
                <h2 className={styles.chartTitle}>{copy.activityTitle}</h2>
                <span className={styles.chartYear}>{CURRENT_USER.memberSinceYear + 3}</span>
              </div>
              <ActivityBarChart data={MONTHLY_ACTIVITY} label={copy.activityTitle} />
              <p className={styles.chartNote}>{copy.activityNote(CURRENT_USER.stats.completedCount)}</p>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <p className={styles.cardTitle}>{copy.followRequestsTitle}</p>
                <ButtonLink href="/profile/follow-requests" size="small" variant="secondary">
                  {copy.followRequestsView}
                </ButtonLink>
              </div>
              <p className={styles.requestsMeta}>
                {FOLLOW_REQUESTS.length} · {FOLLOW_REQUESTS[0]?.person.name}
                {FOLLOW_REQUESTS.length > 1 ? ` և եւս ${FOLLOW_REQUESTS.length - 1}` : ""}
              </p>
            </div>

            <div className={styles.card}>
              <p className={styles.cardTitle}>{copy.nextBadgeTitle}</p>
              <div className={styles.badgeProgress}>
                <Icon name="award" size={28} color="var(--color-brand-primary)" />
                <div>
                  <p className={styles.badgeProgressText}>{NEXT_BADGE_TARGET_KM} կմ</p>
                  <p className={styles.badgeProgressCaption}>{copy.nextBadgeDistance(remainingKm)}</p>
                </div>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${badgeProgressRatio * 100}%` }} />
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHead}>
                <p className={styles.cardTitle}>{copy.followingTitle}</p>
                <Link href="/profile/following" className={styles.manageLink}>
                  {copy.followingManage}
                </Link>
              </div>
              <div className={styles.followingList}>
                {FOLLOWED_CLUBS.slice(0, 3).map((club) => (
                  <div key={club.name} className={styles.followingRow}>
                    <Avatar name={club.name} photo={club.logo} size="sm" />
                    <div>
                      <p className={styles.followingName}>{club.name}</p>
                      <p className={styles.followingMeta}>{club.eventsCount} միջոցառում</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className={styles.privacyNote}>
              <Icon name="info" size={16} />
              Պրոֆիլը հրապարակային է։ Առողջական տվյալները և արտակարգ կապը երբեք չեն ցուցադրվում հրապարակավ։
            </p>
          </aside>
        </div>

        <section aria-labelledby="recent-heading">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEyebrow}>{copy.recentEyebrow}</p>
              <h2 id="recent-heading" className={styles.sectionTitle}>
                {copy.recentTitle}
              </h2>
            </div>
            <Link href="/profile/activities" className={styles.sectionLink}>
              {copy.recentLink(CURRENT_USER.stats.completedCount)}
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
          <CardGrid columns={3}>
            {completedBookings.slice(0, 3).map((entry) => (
              <li key={entry.event.slug}>
                <EventCard {...toEventCardProps(entry.event)} />
              </li>
            ))}
          </CardGrid>
        </section>

        <section aria-labelledby="gallery-heading">
          <div className={styles.sectionHead}>
            <h2 id="gallery-heading" className={styles.sectionTitle}>
              {copy.galleryTitle(GALLERY_TOTAL)}
            </h2>
            <Link href="/profile" className={styles.sectionLink}>
              {copy.galleryAdd}
            </Link>
          </div>
          <div className={styles.gallery}>
            {GALLERY_PHOTOS.map((photo) => (
              <span key={photo} className={styles.galleryTile}>
                <Image src={photo} alt="" fill sizes="200px" className={styles.galleryImage} />
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
