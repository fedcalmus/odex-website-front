import { CardGrid } from "@/components/CardGrid";
import { EventCard } from "@/components/EventCard";
import type { EventCardProps } from "@/components/EventCard";
import { Section } from "@/components/Section";
import type { SectionProps } from "@/components/Section";

export interface ThisWeekendSectionProps {
  heading: SectionProps["heading"];
  events: Array<EventCardProps & { id: string }>;
}

/** "Այս շաբաթ-կիրակի" — this weekend's departures, soonest first, as event cards. */
export function ThisWeekendSection({ heading, events }: ThisWeekendSectionProps) {
  return (
    <Section heading={heading}>
      <CardGrid columns={3}>
        {events.map(({ id, ...event }) => (
          <li key={id}>
            <EventCard {...event} />
          </li>
        ))}
      </CardGrid>
    </Section>
  );
}
