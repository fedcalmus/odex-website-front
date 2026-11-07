import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ButtonLink } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { UserRow } from "@/components/UserRow";
import { breadcrumbNavLabel, followRequestsCopy as copy, homeBreadcrumb, profileBreadcrumb } from "@/content/profile";
import { FOLLOW_REQUESTS } from "@/data/social";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

export default function FollowRequestsPage() {
  return (
    <div className={styles.container}>
      <Breadcrumb
        label={breadcrumbNavLabel}
        items={[homeBreadcrumb, profileBreadcrumb, { label: copy.title, href: "/profile/follow-requests" }]}
      />

      <div className={styles.head}>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>{copy.count(FOLLOW_REQUESTS.length)}</h1>
          <p className={styles.description}>{copy.description}</p>
        </div>
        {FOLLOW_REQUESTS.length > 0 ? (
          <ButtonLink href="/profile/follow-requests">{copy.confirmAll}</ButtonLink>
        ) : null}
      </div>

      {FOLLOW_REQUESTS.length === 0 ? (
        <EmptyState title="Հետևելու հայցեր չկան" />
      ) : (
        <div className={styles.list}>
          {FOLLOW_REQUESTS.map(({ person, mutualCount }) => (
            <UserRow
              key={person.id}
              name={person.name}
              meta={`${person.location} · ${person.eventsCount} ${copy.eventsCountSuffix}${
                mutualCount ? ` · ${mutualCount} ${copy.mutualSuffix}` : ""
              }`}
              action={
                <div className={styles.actions}>
                  <ButtonLink href="/profile/follow-requests" variant="secondary" size="small">
                    {copy.remove}
                  </ButtonLink>
                  <ButtonLink href="/profile/follow-requests" size="small">
                    {copy.confirm}
                  </ButtonLink>
                </div>
              }
            />
          ))}
        </div>
      )}

      <p className={styles.footnote}>{copy.footnote}</p>
    </div>
  );
}
