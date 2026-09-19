import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Section } from "./Section";

const meta = {
  component: Section,
  tags: ["ai-generated"],
  args: {
    heading: { eyebrow: "ԸՆՏՐԻՐ ՈՒՂՂՈՒԹՅՈՒՆԸ", title: "Յոթ ուղղություն, մեկ օրացույց" },
    children: <div style={{ height: 160, borderRadius: 14, background: "var(--color-surface-2)" }} />,
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

// A landmark named by its own heading, so it shows up in a screen reader's region list.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("region", { name: "Յոթ ուղղություն, մեկ օրացույց" })).toBeVisible();
  },
};

export const WideGutter: Story = { args: { gutter: "wide" } };
export const TightTop: Story = { args: { paddingTop: "small" } };
export const RoomyBottom: Story = { args: { paddingBottom: "large" } };
export const Bleed: Story = {
  args: {
    bleed: true,
    children: <div style={{ height: 120, background: "var(--color-surface-1)" }} />,
  },
};
