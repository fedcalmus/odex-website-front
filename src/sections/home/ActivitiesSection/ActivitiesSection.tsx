import type { ImageProps } from "next/image";
import { ActivityTile } from "@/components/ActivityTile";
import { CardGrid } from "@/components/CardGrid";
import { Section } from "@/components/Section";
import type { SectionProps } from "@/components/Section";

export interface ActivitiesSectionProps {
  heading: SectionProps["heading"];
  activities: Array<{
    /** URL-safe id — becomes the discovery filter: /events?activity=hiking. */
    slug: string;
    title: string;
    /** Live events in the group. */
    count: number;
    image: ImageProps["src"];
  }>;
}

/**
 * "Ուղղություններ" — pick an activity: one portrait tile per activity group
 * (hiking, climbing, cycling, …), each linking to discovery pre-filtered.
 */
export function ActivitiesSection({ heading, activities }: ActivitiesSectionProps) {
  return (
    <Section heading={heading}>
      <CardGrid columns="strip">
        {/* A group with no events is dropped, not shown at "0" — an empty
            category on the homepage says the platform is empty. */}
        {activities
          .filter((activity) => activity.count > 0)
          .map((activity) => (
            <li key={activity.slug}>
              <ActivityTile
                title={activity.title}
                count={activity.count}
                href={`/events?activity=${activity.slug}`}
                image={activity.image}
              />
            </li>
          ))}
      </CardGrid>
    </Section>
  );
}
