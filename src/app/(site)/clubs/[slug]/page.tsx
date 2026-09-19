import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivityTag } from "@/components/ActivityTag";
import { CardGrid } from "@/components/CardGrid";
import { ClubProfileHeader } from "@/components/ClubProfileHeader";
import { ClubStats } from "@/components/ClubStats";
import { DetailBlock } from "@/components/DetailBlock";
import { EventCard } from "@/components/EventCard";
import { FollowButton } from "@/components/FollowButton";
import { GuideRow } from "@/components/GuideRow";
import { JsonLd } from "@/components/JsonLd";
import { Notice } from "@/components/Notice";
import { PhotoGrid } from "@/components/PhotoGrid";
import { RailBlock } from "@/components/RailBlock";
import { RegionCountList } from "@/components/RegionCountList";
import { SafetyAssurances } from "@/components/SafetyAssurances";
import { SectionHeading } from "@/components/SectionHeading";
import { ShareButton } from "@/components/ShareButton";
import { clubProfileCopy as copy } from "@/content/clubs";
import { getActivity } from "@/data/activities";
import { CLUBS, findClub, getClubClassification, getClubEvents, getClubRegionCounts } from "@/data/clubs";
import { toEventCardProps } from "@/data/events";
import { getRegion } from "@/data/regions";
import { DEFAULT_PARAMS, discoveryHref } from "@/lib/discovery-params";
import { formatDecimal } from "@/lib/format";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import styles from "./page.module.scss";

// Every catalogued club is prerendered; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return CLUBS.map((club) => ({ slug: club.slug }));
}

export async function generateMetadata({ params }: PageProps<"/clubs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const club = findClub(slug);
  if (!club) return {};

  const description = club.about ?? club.description;
  const cover = club.profileCover ?? club.cover;
  return {
    title: club.name,
    description: description.length > 155 ? `${description.slice(0, 152).trimEnd()}…` : description,
    alternates: { canonical: `/clubs/${club.slug}` },
    openGraph: {
      type: "profile",
      siteName: SITE_NAME,
      locale: "hy_AM",
      url: `/clubs/${club.slug}`,
      title: club.name,
      description,
      images: [{ url: cover }],
    },
  };
}

export default async function ClubPage({ params }: PageProps<"/clubs/[slug]">) {
  const { slug } = await params;
  const club = findClub(slug);
  if (!club) notFound();

  const events = getClubEvents(club.slug);
  // "All of this club's events", across every date — not just this weekend.
  const allEventsHref = discoveryHref({ ...DEFAULT_PARAMS, when: "all" }, { club: [club.slug] });
  const classification = `${getClubClassification(club)} · ${club.foundedYear} ԹՎԱԿԱՆԻՑ`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Ակումբներ", href: "/clubs" },
            { name: club.name, href: `/clubs/${club.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: club.name,
            url: absoluteUrl(`/clubs/${club.slug}`),
            logo: absoluteUrl(club.logo),
            foundingDate: String(club.foundedYear),
            description: club.about ?? club.description,
          },
        ]}
      />

      <ClubProfileHeader
        name={club.name}
        cover={club.profileCover ?? club.cover}
        logo={club.logo}
        classification={classification}
        verifiedLabel={copy.verifiedLabel}
      >
        <ShareButton label={copy.share} title={club.name} />
        <FollowButton
          label={copy.follow.label}
          followingLabel={copy.follow.following}
          className={styles.follow}
        />
      </ClubProfileHeader>

      <div className={styles.stats}>
        <ClubStats
          stats={[
            { icon: "calendar", value: String(events.length), label: copy.stats.events },
            { icon: "users", value: String(club.guides.length), label: copy.stats.guides },
            { icon: "mountain", value: String(club.completedTrips), label: copy.stats.trips },
            { icon: "star-filled", value: formatDecimal(club.rating.value), label: copy.stats.rating(club.rating.count), accent: true },
            { icon: "shield-check", value: String(club.foundedYear), label: copy.stats.verified },
          ]}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.main}>
          {club.about ? (
            <DetailBlock title={copy.about} className={styles.about}>
              <p className={styles.aboutText}>{club.about}</p>
            </DetailBlock>
          ) : null}

          {events.length > 0 ? (
            <section aria-labelledby="club-events" className={styles.section}>
              <SectionHeading
                id="club-events"
                eyebrow={copy.events.eyebrow}
                title={copy.events.title(events.length)}
                link={{ label: copy.events.link, href: allEventsHref }}
              />
              <CardGrid columns={3}>
                {events.slice(0, 3).map((event) => (
                  <li key={event.slug}>
                    <EventCard {...toEventCardProps(event)} sizes="(min-width: 1200px) 316px, (min-width: 768px) 50vw, 100vw" />
                  </li>
                ))}
              </CardGrid>
            </section>
          ) : null}

          <section aria-labelledby="club-guides" className={styles.section}>
            <SectionHeading id="club-guides" title={copy.guides.title} description={copy.guides.description} />
            <ul role="list" className={styles.guides}>
              {club.guides.map((guide, index) => (
                <li key={`${guide.role}-${index}`}>
                  <GuideRow
                    name={guide.name}
                    roleLabel={guide.roleLabel}
                    experience={guide.experience}
                    photo={guide.photo}
                  />
                </li>
              ))}
            </ul>
          </section>

          {club.photos ? (
            <section aria-labelledby="club-gallery" className={styles.section}>
              <SectionHeading
                id="club-gallery"
                eyebrow={copy.gallery.eyebrow}
                title={copy.gallery.title}
                link={{ label: copy.gallery.link, href: `/clubs/${club.slug}/photos` }}
              />
              <PhotoGrid photos={club.photos.map((src) => ({ src }))} />
            </section>
          ) : null}
        </div>

        <aside className={styles.rail}>
          <SafetyAssurances
            title={copy.rail.checked}
            items={[
              { icon: "check-circle", title: copy.rail.legal, description: club.legalNote },
              {
                icon: "check-circle",
                title: copy.rail.guideCerts,
                description: copy.rail.guidesValid(club.guides.length, club.guides.length),
              },
              {
                icon: "check-circle",
                title: copy.rail.insurance,
                description: copy.rail.insuranceUntil(club.insuranceUntil),
              },
            ]}
          />

          <RailBlock title={copy.rail.activities}>
            <ul role="list" className={styles.tags}>
              {club.activities.map((slug) => {
                const activity = getActivity(slug);
                return activity ? (
                  <li key={slug}>
                    <ActivityTag label={activity.title} icon={activity.icon} />
                  </li>
                ) : null;
              })}
            </ul>
          </RailBlock>

          {events.length > 0 ? (
            <RailBlock title={copy.rail.regions}>
              <RegionCountList
                regions={getClubRegionCounts(club.slug).map((region) => ({
                  ...region,
                  href: discoveryHref(
                    { ...DEFAULT_PARAMS, when: "all" },
                    { club: [club.slug], region: getRegion(region.slug) ? [region.slug] : [] },
                  ),
                }))}
              />
            </RailBlock>
          ) : null}

          <Notice>{copy.rail.reviewsNote}</Notice>
        </aside>
      </div>
    </>
  );
}
