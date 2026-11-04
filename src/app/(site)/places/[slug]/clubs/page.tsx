import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EmptyState } from "@/components/EmptyState";
import { JsonLd } from "@/components/JsonLd";
import { clubProfileCopy } from "@/content/clubs";
import { placeDetailCopy as copy } from "@/content/place-detail";
import { placesCopy } from "@/content/places";
import { getClubClassification, getClubEvents } from "@/data/clubs";
import { PLACES, buildPlaceHeroFacts, getPlaceBySlug, getPlaceClubs, getPlaceEvents } from "@/data/places";
import { SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { PlaceClubRow } from "@/sections/places/PlaceClubRow";
import { PlaceHero } from "@/sections/places/PlaceHero";
import { PlaceSidebar } from "@/sections/places/PlaceSidebar";
import { PlaceTabs } from "@/sections/places/PlaceTabs";
import styles from "./page.module.scss";

// Every catalogued place is prerendered; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PLACES.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }: PageProps<"/places/[slug]/clubs">): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) return {};

  const title = `${copy.tabs.clubs} · ${place.name}`;
  return {
    title,
    alternates: { canonical: `/places/${place.slug}/clubs` },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "hy_AM",
      url: `/places/${place.slug}/clubs`,
      title,
    },
  };
}

export default async function PlaceClubsPage({ params }: PageProps<"/places/[slug]/clubs">) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) notFound();

  const events = getPlaceEvents(place);
  const clubs = getPlaceClubs(place);

  const breadcrumb = [
    { label: copy.breadcrumbRoot, href: "/places" },
    { label: place.name, href: `/places/${place.slug}` },
    { label: copy.tabs.clubs, href: `/places/${place.slug}/clubs` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb.map((item) => ({ name: item.label, href: item.href })))} />

      <div className={styles.breadcrumbRow}>
        <Breadcrumb items={breadcrumb} label={copy.breadcrumbLabel} />
      </div>

      <PlaceHero
        title={place.name}
        image={place.image}
        facts={buildPlaceHeroFacts(place, placesCopy.toolbar.photosLabel)}
        labels={copy.hero}
      />

      <PlaceTabs
        slug={place.slug}
        active="clubs"
        counts={{ events: events.length, photos: place.photoCount, clubs: clubs.length }}
        copy={copy.tabs}
      />

      <div className={styles.body}>
        <div className={styles.main}>
          <p className={styles.count}>{clubs.length}</p>

          {clubs.length > 0 ? (
            <>
              <p className={styles.lead}>{copy.clubsPage.lead}</p>
              <ul role="list" className={styles.clubs}>
                {clubs.map((club) => (
                  <li key={club.slug}>
                    <PlaceClubRow
                      name={club.name}
                      href={`/clubs/${club.slug}`}
                      logo={club.logo}
                      classification={getClubClassification(club)}
                      description={club.description}
                      eventsCount={getClubEvents(club.slug).length}
                      guidesCount={club.guides.length}
                      eventsLabel={copy.clubs.eventsLabel}
                      guidesLabel={copy.clubs.guidesLabel}
                      verifiedLabel={copy.clubs.verifiedLabel}
                      followLabel={clubProfileCopy.follow.label}
                      followingLabel={clubProfileCopy.follow.following}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <EmptyState title={copy.clubs.empty} />
          )}
        </div>

        <PlaceSidebar place={place} copy={copy.sidebar} />
      </div>
    </>
  );
}
