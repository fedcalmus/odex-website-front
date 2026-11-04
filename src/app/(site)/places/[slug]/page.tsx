import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CardGrid } from "@/components/CardGrid";
import { DetailBlock } from "@/components/DetailBlock";
import { EventCard } from "@/components/EventCard";
import { JsonLd } from "@/components/JsonLd";
import { PhotoGrid } from "@/components/PhotoGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { clubProfileCopy } from "@/content/clubs";
import { placeDetailCopy as copy } from "@/content/place-detail";
import { placesCopy } from "@/content/places";
import { getClubClassification, getClubEvents } from "@/data/clubs";
import { toEventCardProps } from "@/data/events";
import { PLACES, buildPlaceHeroFacts, getPlaceBySlug, getPlaceClubs, getPlaceEvents } from "@/data/places";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
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

export async function generateMetadata({ params }: PageProps<"/places/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) return {};

  const description =
    place.description.length > 155 ? `${place.description.slice(0, 152).trimEnd()}…` : place.description;
  return {
    title: place.name,
    description,
    alternates: { canonical: `/places/${place.slug}` },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "hy_AM",
      url: `/places/${place.slug}`,
      title: place.name,
      description,
      images: [{ url: place.image }],
    },
  };
}

export default async function PlacePage({ params }: PageProps<"/places/[slug]">) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) notFound();

  const events = getPlaceEvents(place);
  const clubs = getPlaceClubs(place);

  const breadcrumb = [
    { label: "Գլխավոր", href: "/" },
    { label: copy.breadcrumbRoot, href: "/places" },
    { label: place.name, href: `/places/${place.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(breadcrumb.map((item) => ({ name: item.label, href: item.href }))),
          {
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: place.name,
            description: place.description,
            url: absoluteUrl(`/places/${place.slug}`),
            image: absoluteUrl(place.image),
          },
        ]}
      />

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
        active="overview"
        counts={{ events: events.length, photos: place.photoCount, clubs: clubs.length }}
        copy={copy.tabs}
      />

      <div className={styles.body}>
        <div className={styles.main}>
          <section className={styles.section}>
            <DetailBlock title={copy.about}>
              <p className={styles.description}>{place.description}</p>
            </DetailBlock>
          </section>

          <section aria-labelledby="place-events-heading" className={styles.section}>
            <SectionHeading
              id="place-events-heading"
              title={copy.events.title}
              link={events.length > 0 ? { label: copy.events.link, href: `/places/${place.slug}/events` } : undefined}
            />
            {events.length > 0 ? (
              <CardGrid columns={3}>
                {events.slice(0, 3).map((event) => (
                  <li key={event.slug}>
                    <EventCard
                      {...toEventCardProps(event)}
                      sizes="(min-width: 1200px) 316px, (min-width: 768px) 50vw, 100vw"
                    />
                  </li>
                ))}
              </CardGrid>
            ) : (
              <p className={styles.empty}>{copy.events.empty}</p>
            )}
          </section>

          <section aria-labelledby="place-photos-heading" className={styles.section}>
            <SectionHeading
              id="place-photos-heading"
              title={copy.photos.title}
              link={{ label: copy.photos.link, href: `/places/${place.slug}/photos` }}
            />
            <PhotoGrid photos={place.gallery.map((src) => ({ src }))} />
            <p className={styles.note}>{copy.photos.note}</p>
          </section>

          <section aria-labelledby="place-clubs-heading" className={styles.section}>
            <SectionHeading
              id="place-clubs-heading"
              title={copy.clubs.title}
              link={clubs.length > 0 ? { label: copy.clubs.link, href: `/places/${place.slug}/clubs` } : undefined}
            />
            {clubs.length > 0 ? (
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
            ) : (
              <p className={styles.empty}>{copy.clubs.empty}</p>
            )}
          </section>
        </div>

        <PlaceSidebar place={place} copy={copy.sidebar} />
      </div>
    </>
  );
}
