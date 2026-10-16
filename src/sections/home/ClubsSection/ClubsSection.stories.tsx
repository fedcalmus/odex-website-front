import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { latestClubsQuery } from "@/api/clubs";
import type { LatestClubsResponse } from "@/api/clubs";
import { clubs } from "@/content/home";
import { ClubsSection } from "./ClubsSection";

// The section reads its data from TanStack Query — each story seeds the cache
// it wants, so nothing here touches the network.
function withClubs(response: LatestClubsResponse) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  client.setQueryData(latestClubsQuery.queryKey, response);
  return function Decorator(Story: () => React.ReactElement) {
    return (
      <QueryClientProvider client={client}>
        <Story />
      </QueryClientProvider>
    );
  };
}

const page = (results: LatestClubsResponse["results"], count = results.length): LatestClubsResponse => ({
  count,
  next: null,
  previous: null,
  results,
});

const meta = {
  title: "Sections/Home/ClubsSection",
  component: ClubsSection,
  tags: ["ai-generated"],
  args: { heading: clubs.heading, fallback: clubs.fallback },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ClubsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    withClubs(
      page(
        [
          { id: "1", name: "Հայաստանի արահետներ", logo: "/images/clubs/logo-1.png", cover_image: "/images/clubs/cover-1.png", activity_types: ["hiking", "climbing"], base_region: "yerevan", events_count: 18, guides_count: 4 },
          { id: "2", name: "Ուղղահայաց Երևան", logo: "/images/clubs/logo-2.png", cover_image: "/images/clubs/cover-2.png", activity_types: ["climbing"], base_region: "kotayk", events_count: 6, guides_count: 2 },
          { id: "3", name: "Սևան Ուոթեր", logo: "/images/clubs/logo-1.png", cover_image: "/images/clubs/cover-1.png", activity_types: ["kayaking"], base_region: "gegharkunik", events_count: 3, guides_count: 1 },
          { id: "4", name: "Տավուշ Թրեյլ", logo: "/images/clubs/logo-2.png", cover_image: "/images/clubs/cover-2.png", activity_types: ["trail_running"], base_region: "tavush", events_count: 9, guides_count: 3 },
        ],
        34,
      ),
    ),
  ],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(4);
    await expect(canvas.getByRole("heading", { name: "34 ակումբ, բոլորը ստուգված" })).toBeVisible();
  },
};

// The API sent almost nothing: every gap is a dash, the card still links somewhere.
export const MissingData: Story = {
  decorators: [withClubs(page([{ id: "abc" }, { id: "def", name: "Միայն անուն" }]))],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(2);
    await expect(canvas.getAllByText("- · -")).toHaveLength(2);
    await expect(canvas.getByRole("link", { name: "Միայն անուն" })).toHaveAttribute("href", "/clubs/def");
  },
};

// The API has no clubs yet → the previous static version is shown.
export const StaticFallback: Story = {
  decorators: [withClubs(page([]))],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(4);
    await expect(canvas.getByText("Նոր ակումբ")).toBeVisible();
  },
};

// Nothing from the API and no fallback → the section is omitted, not rendered empty.
export const Empty: Story = {
  args: { fallback: { total: undefined, clubs: [] } },
  decorators: [withClubs(page([]))],
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("section")).toBeNull();
  },
};
