import type { Metadata } from "next";
import { Avatar } from "@/components/Avatar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ButtonLink } from "@/components/Button";
import { FollowButton } from "@/components/FollowButton";
import { SearchField } from "@/components/SearchField";
import { Tabs } from "@/components/Tabs";
import { UserRow } from "@/components/UserRow";
import { breadcrumbNavLabel, followingCopy as copy, homeBreadcrumb, profileBreadcrumb } from "@/content/profile";
import { FOLLOWED_CLUBS, FOLLOWERS, FOLLOWING_PEOPLE, FOLLOW_REQUESTS } from "@/data/social";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

type FollowingTab = "clubs" | "people" | "followers";

export default async function FollowingPage({ searchParams }: PageProps<"/profile/following">) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.tab) ? sp.tab[0] : sp.tab;
  const tab: FollowingTab = raw === "people" || raw === "followers" ? raw : "clubs";

  return (
    <div className={styles.container}>
      <Breadcrumb
        label={breadcrumbNavLabel}
        items={[homeBreadcrumb, profileBreadcrumb, { label: copy.title, href: "/profile/following" }]}
      />
      <h1 className={styles.title}>{copy.title}</h1>

      <Tabs
        label={copy.title}
        active={tab}
        items={[
          { key: "clubs", href: "/profile/following?tab=clubs", label: copy.tabs.clubs, count: FOLLOWED_CLUBS.length },
          { key: "people", href: "/profile/following?tab=people", label: copy.tabs.people, count: FOLLOWING_PEOPLE.length },
          { key: "followers", href: "/profile/following?tab=followers", label: copy.tabs.followers, count: FOLLOWERS.length },
        ]}
      />

      {tab === "followers" && FOLLOW_REQUESTS.length > 0 ? (
        <div className={styles.banner}>
          <p className={styles.bannerText}>
            <span className={styles.bannerTitle}>{copy.requestsBannerTitle(FOLLOW_REQUESTS.length)}</span>
            <span className={styles.bannerBody}>
              {copy.requestsBannerBody(FOLLOW_REQUESTS[0].person.name, FOLLOW_REQUESTS.length - 1)}
            </span>
          </p>
          <ButtonLink href="/profile/follow-requests" size="small">
            {copy.requestsBannerAction}
          </ButtonLink>
        </div>
      ) : null}

      <SearchField
        className={styles.search}
        action="/profile/following"
        name="q"
        placeholder={tab === "clubs" ? copy.searchClubsPlaceholder : copy.searchPeoplePlaceholder}
        label={tab === "clubs" ? copy.searchClubsPlaceholder : copy.searchPeoplePlaceholder}
      />

      {tab === "clubs" ? (
        <div className={styles.list}>
          {FOLLOWED_CLUBS.map((club) => (
            <div key={club.name} className={styles.clubRow}>
              <Avatar name={club.name} photo={club.logo} size="md" />
              <div className={styles.clubBody}>
                <p className={styles.clubName}>{club.name}</p>
                <p className={styles.clubMeta}>
                  {club.eventsCount} {copy.eventsCountSuffix}
                </p>
              </div>
              <FollowButton label={copy.follow} followingLabel={copy.following} defaultFollowing className={styles.follow} />
            </div>
          ))}
        </div>
      ) : null}

      {tab === "people" ? (
        <div className={styles.list}>
          {FOLLOWING_PEOPLE.map((person) => (
            <UserRow
              key={person.id}
              name={person.name}
              meta={`${person.location} · ${person.eventsCount} ${copy.eventsCountSuffix}`}
              action={<FollowButton label={copy.follow} followingLabel={copy.following} defaultFollowing className={styles.follow} />}
            />
          ))}
        </div>
      ) : null}

      {tab === "followers" ? (
        <div className={styles.list}>
          {FOLLOWERS.map(({ person, mutual }) => (
            <UserRow
              key={person.id}
              name={person.name}
              meta={`${person.location} · ${person.eventsCount} ${copy.eventsCountSuffix}`}
              action={mutual ? undefined : <FollowButton label={copy.addBack} followingLabel={copy.following} className={styles.follow} />}
            />
          ))}
        </div>
      ) : null}

      <p className={styles.footnote}>
        {tab === "clubs" ? copy.clubsNote : tab === "people" ? copy.peopleNote : copy.followersNote}
      </p>
    </div>
  );
}
