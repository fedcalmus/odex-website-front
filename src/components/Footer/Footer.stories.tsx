import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { footer } from "@/content/site";
import { Footer } from "./Footer";

const meta = {
  component: Footer,
  tags: ["ai-generated"],
  args: footer,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Each column is its own navigation landmark, named by its head.
export const Full: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("navigation", { name: "ՀԱՐԹԱԿ" })).toBeVisible();
    await expect(canvas.getByRole("navigation", { name: "ԻՐԱՎԱԿԱՆ" })).toBeVisible();
    await expect(canvas.getAllByRole("link", { name: "Գրանցել ակումբը" })[0]).toBeVisible();
  },
};

export const Mobile: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };

// Compact (checkout, ticket, account): same columns, but no lime club-CTA bar — a supply-side pitch would interrupt the task.
export const Compact: Story = {
  args: { variant: "compact" },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText(/Ակումբ ունե/)).not.toBeInTheDocument();
    await expect(canvas.getByRole("navigation", { name: "ՀԱՐԹԱԿ" })).toBeVisible();
  },
};
