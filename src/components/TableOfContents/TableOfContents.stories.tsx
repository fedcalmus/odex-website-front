import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { TableOfContents } from "./TableOfContents";

const items = [
  { id: "what-is-odex", label: "1. Ինչ է Odex-ը" },
  { id: "account-and-age", label: "2. Հաշիվ և տարիք" },
  { id: "booking-and-payment", label: "3. Ամրագրում և վճարում" },
];

const meta = {
  component: TableOfContents,
  tags: ["ai-generated"],
  args: { items, label: "Բաժինների ցանկ" },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 260 }}><Story /></div>],
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

// No matching headings exist in the Storybook canvas, so this renders with
// the first item active by default — the real page drives it via scroll.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1. Ինչ է Odex-ը")).toBeVisible();
    await expect(canvas.getByRole("link", { name: "1. Ինչ է Odex-ը" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  },
};

// Cookie policy prints an overline above the list (Figma "Cookie policy — MP-39").
export const WithHeading: Story = {
  args: { heading: "ԲՈՎԱՆԴԱԿՈՒԹՅՈՒՆ" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("ԲՈՎԱՆԴԱԿՈՒԹՅՈՒՆ")).toBeVisible();
  },
};
