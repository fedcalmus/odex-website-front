import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { SectionHeading } from "./SectionHeading";

const meta = {
  component: SectionHeading,
  tags: ["ai-generated"],
  args: {
    eyebrow: "ՈՒՂԵՑՈՒՅՑ",
    title: "Բացիր Հայաստանը",
    description: "Տարածաշրջաններ, գագաթներ և երթուղիներ՝ ակումբների ընտրությամբ։",
    link: { label: "Անցնել ուղեցույցին", href: "/guide" },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

// The workhorse: eyebrow, title, paragraph, and an exit link on the right.
export const WithLink: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 2, name: "Բացիր Հայաստանը" })).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Անցնել ուղեցույցին" })).toHaveAttribute("href", "/guide");
  },
};

export const NoEyebrow: Story = { args: { eyebrow: undefined } };

export const TitleOnly: Story = {
  args: { eyebrow: undefined, description: undefined, link: undefined },
};

// The eyebrow is a label, never a sentence — Armenian caps lose legibility at length.
export const EyebrowOnlyLabel: Story = {
  args: { description: undefined, link: undefined },
};
