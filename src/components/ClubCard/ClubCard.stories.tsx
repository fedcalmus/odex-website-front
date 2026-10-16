import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ClubCard } from "./ClubCard";

const meta = {
  component: ClubCard,
  tags: ["ai-generated"],
  args: {
    name: "Հայաստանի արահետներ",
    href: "/clubs/armenia-trails",
    cover: "/images/clubs/cover-1.png",
    logo: "/images/clubs/logo-1.png",
    classification: "ԱՐՇԱՎ · ԵՐԵՎԱՆ",
    description: "Շաբաթավերջյան երթուղիներ Արագածոտնում և Վայոց ձորում։",
    eventsCount: 18,
    guidesCount: 4,
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 321 }}><Story /></div>],
} satisfies Meta<typeof ClubCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Verified: Story = {
  play: async ({ canvas, args }) => {
    await expect(canvas.getByRole("link", { name: args.name })).toHaveAttribute("href", args.href);
    // The shield is the trust mechanic and carries an accessible name.
    await expect(canvas.getByTitle("Ստուգված")).toBeInTheDocument();
  },
};

// Under three events: an invitation badge, not a warning.
export const NewClub: Story = {
  args: { cover: "/images/clubs/cover-2.png", logo: "/images/clubs/logo-2.png", newBadgeLabel: "Նոր ակումբ" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Նոր ակումբ")).toBeVisible();
  },
};

export const LongName: Story = { args: { name: "Հայաստանի արահետներ և գագաթներ ակումբ" } };

// Every field the API may omit falls back to a dash — the card never breaks.
export const MissingData: Story = {
  args: {
    name: "-",
    href: "/clubs/unknown",
    cover: undefined,
    logo: undefined,
    classification: "- · -",
    description: undefined,
    eventsCount: "-",
    guidesCount: "-",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "-" })).toBeVisible();
    await expect(canvas.getByText("- · -")).toBeVisible();
  },
};
