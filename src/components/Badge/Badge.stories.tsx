import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Badge } from "./Badge";

const meta = {
  component: Badge,
  tags: ["ai-generated"],
  argTypes: {
    background: { control: "color" },
    color: { control: "color" },
  },
  args: {
    children: "Badge",
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// No background/color given — falls back to the surface-2 / text-primary tokens.
export const Default: Story = {
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText(args.children as string)).toBeVisible();
  },
};

// Colors and text are passed in at the call site, not picked from a fixed
// variant enum — every story below is the same component, dynamically fed.
export const FewPlaces: Story = {
  args: { children: "Few places", background: "#FF5A00", color: "#FFFFFF" },
};

export const LastPlaces: Story = {
  args: { children: "Last places", background: "#FF5A00", color: "#FFFFFF" },
};

export const NewClub: Story = {
  args: {
    children: "New club",
    background: "var(--color-brand-primary)",
    color: "var(--color-brand-on-primary)",
  },
};

export const SoldOut: Story = {
  args: {
    children: "Sold out",
    background: "rgba(19, 28, 30, 0.82)",
    color: "#F2F5F2",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Badge background="#FF5A00" color="#FFFFFF">
        Few places
      </Badge>
      <Badge background="#FF5A00" color="#FFFFFF">
        Last places
      </Badge>
      <Badge background="var(--color-brand-primary)" color="var(--color-brand-on-primary)">
        New club
      </Badge>
      <Badge background="rgba(19, 28, 30, 0.82)" color="#F2F5F2">
        Sold out
      </Badge>
    </div>
  ),
};

// `small` (12px) is the label used for the scarcity badges over photography.
export const SmallScarcity: Story = {
  args: { size: "small", background: "var(--color-brand-accent)", color: "var(--color-brand-on-accent)", children: "1 տեղ մնացել է" },
};
