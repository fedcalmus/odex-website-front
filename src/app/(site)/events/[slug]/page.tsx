import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingWidget } from "@/components/BookingWidget";
import { CancellationPolicy } from "@/components/CancellationPolicy";
import { ClubSummary } from "@/components/ClubSummary";
import { DetailBlock } from "@/components/DetailBlock";
import { EventHero } from "@/components/EventHero";
import { FollowButton } from "@/components/FollowButton";
import { GearList } from "@/components/GearList";
import { IncludedExcludedList } from "@/components/IncludedExcludedList";
import { JsonLd } from "@/components/JsonLd";
import { KeyFactsStrip } from "@/components/KeyFactsStrip";
import { RequirementsStrip } from "@/components/RequirementsStrip";
import { RouteBlock } from "@/components/RouteBlock";
import { SafetyAssurances } from "@/components/SafetyAssurances";
import { TeamBlock } from "@/components/TeamBlock";
import { guide } from "@/content/home";
import { eventDetailCopy as copy } from "@/content/event-detail";
import { getClub, getClubEvents } from "@/data/clubs";
import { getAllEvents, getEventBySlug } from "@/data/events";
import { getRegion } from "@/data/regions";
import { getAvailability } from "@/lib/capacity";
import { DEFAULT_PARAMS, discoveryHref } from "@/lib/discovery-params";
import { formatDecimal, formatEventDate, formatEventTime, formatInteger, formatPrice } from "@/lib/format";
import { SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, eventJsonLd } from "@/lib/structured-data";
import { GuideSection } from "@/sections/home/GuideSection";
import styles from "./page.module.scss";

// Every catalogued event is prerendered; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllEvents().map((event) => ({ slug: event.slug }));
}

/** First sentence(s) of the description, else a factual line — a usable meta description either way. */
function describe(event: NonNullable<ReturnType<typeof getEventBySlug>>): string {
  const club = getClub(event.club);
  const summary = event.detail?.description;
  if (summary) return summary.length > 155 ? `${summary.slice(0, 152).trimEnd()}…` : summary;
  return `${club.name} · ${formatEventDate(event.startsAt)} · ${formatEventTime(event.startsAt)} · ${formatPrice(event.price.amount, event.price.currency)}`;
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  const description = describe(event);
  const image = event.heroImage ?? event.image;
  return {
    title: event.title,
    description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "hy_AM",
      url: `/events/${event.slug}`,
      title: event.title,
      description,
      images: [{ url: image, width: 1000, height: 667 }],
    },
  };
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const club = getClub(event.club);
  const region = getRegion(event.region);
  const detail = event.detail;
  const availability = getAvailability(event.capacity.taken, event.capacity.total);
  const price = formatPrice(event.price.amount, event.price.currency);

  const breadcrumb = [
    { label: copy.breadcrumbRoot, href: "/events" },
    ...(region
      ? [{ label: region.name, href: discoveryHref({ ...DEFAULT_PARAMS }, { region: [region.slug] }) }]
      : []),
  ];

  const images = [event.heroImage ?? event.image, ...(detail?.gallery ?? [])];
  const place = detail?.departure?.place ?? detail?.meeting?.place ?? region?.name ?? "";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(breadcrumb.map((item) => ({ name: item.label, href: item.href }))),
          eventJsonLd({
            name: event.title,
            startsAt: event.startsAt,
            description: detail?.description,
            images,
            placeName: place,
            region: region?.name ?? "",
            organizer: { name: club.name, href: `/clubs/${club.slug}` },
            url: `/events/${event.slug}`,
            price: event.price.amount,
            currency: event.price.currency ?? "AMD",
            availability: availability.soldOut ? "SoldOut" : availability.scarce ? "LimitedAvailability" : "InStock",
          }),
        ]}
      />

      <EventHero
        title={event.title}
        breadcrumb={breadcrumb}
        images={images}
        moreCount={detail?.galleryMore}
        weather={region?.forecast}
        startsAt={event.startsAt}
        difficulty={event.difficulty}
        club={{ name: club.name, href: `/clubs/${club.slug}`, logo: club.logo }}
        rating={detail?.rating}
        labels={copy.heroLabels}
      />

      <div className={styles.body}>
        <div className={styles.main}>
          <KeyFactsStrip
            facts={[
              {
                icon: "navigation",
                label: copy.keyFacts.route,
                value: `${formatDecimal(Math.round(event.route.distanceKm))} ${copy.keyFacts.distanceUnit}`,
              },
              {
                icon: "mountain",
                label: copy.keyFacts.ascent,
                value: `${formatInteger(event.route.ascentM)} ${copy.keyFacts.ascentUnit}`,
              },
              {
                icon: "clock",
                label: copy.keyFacts.duration,
                value: `${formatDecimal(event.route.durationHours)} ${copy.keyFacts.durationUnit}`,
              },
              { icon: "users", label: copy.keyFacts.group, value: String(event.capacity.total) },
            ]}
          />

          {detail?.requirements ? (
            <RequirementsStrip
              requirements={[
                { icon: "user", label: copy.requirements.age, value: detail.requirements.age },
                { icon: "mountain", label: copy.requirements.experience, value: detail.requirements.experience },
                { icon: "zap", label: copy.requirements.fitness, value: detail.requirements.fitness },
              ]}
            />
          ) : null}

          {detail?.description ? (
            <DetailBlock title={copy.blocks.description}>
              <p className={styles.description}>{detail.description}</p>
            </DetailBlock>
          ) : null}

          {detail?.meeting && detail.departure && detail.return ? (
            <RouteBlock
              title={copy.blocks.route}
              points={[
                { type: "meeting", label: copy.routePoints.meeting, ...detail.meeting },
                { type: "departure", label: copy.routePoints.departure, ...detail.departure },
                { type: "return", label: copy.routePoints.return, ...detail.return },
              ]}
            />
          ) : null}

          {detail?.gear ? (
            <GearList title={copy.blocks.gear} items={detail.gear} note={copy.blocks.gearNote} />
          ) : null}

          {detail?.included && detail.excluded ? (
            <IncludedExcludedList
              includedTitle={copy.blocks.included}
              included={detail.included}
              excludedTitle={copy.blocks.excluded}
              excluded={detail.excluded}
            />
          ) : null}

          {detail?.guides ? (
            <TeamBlock
              title={copy.blocks.team}
              guides={detail.guides.map((guideEntry) => ({
                id: guideEntry.role,
                name: guideEntry.name,
                roleLabel: guideEntry.roleLabel,
                experience: guideEntry.experience,
                photo: guideEntry.photo,
              }))}
            />
          ) : null}

          <CancellationPolicy title={copy.blocks.cancellation} terms={[...copy.cancellationTerms]} />
        </div>

        <aside className={styles.rail}>
          <BookingWidget
            price={price}
            capacity={event.capacity}
            bookHref={`/events/${event.slug}/book`}
            waitlistHref={`/events/${event.slug}/waitlist`}
            labels={copy.booking}
          />
          <SafetyAssurances title={copy.safety.title} items={[...copy.safety.items]} />
          <ClubSummary
            name={club.name}
            href={`/clubs/${club.slug}`}
            logo={club.logo}
            meta={`${getClubEvents(club.slug).length} ${copy.eventsLabel} · ${formatDecimal(club.rating.value)}`}
          >
            <FollowButton label={copy.follow.label} followingLabel={copy.follow.following} />
          </ClubSummary>
        </aside>
      </div>

      <GuideSection
        heading={guide.heading}
        rowLabels={guide.rowLabels}
        rows={[guide.rows[0], guide.rows[1]]}
        paddingTop="small"
      />
    </>
  );
}
