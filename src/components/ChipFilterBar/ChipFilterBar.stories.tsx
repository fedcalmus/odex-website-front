import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ChipFilterBar } from "./ChipFilterBar";

const items = ["Բոլորը", "Արշավ", "Ժայռամագլցում", "Հեծանիվ", "Ջրային", "Ձմեռային", "Օդային", "Քարանձավ"].map(
  (label, index) => ({ key: label, label, href: index === 0 ? "/clubs" : `/clubs?activity=${index}`, active: index === 0 }),
);

const meta = {
  component: ChipFilterBar,
  tags: ["ai-generated"],
  args: { label: "Ուղղություն", items },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChipFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single-choice quick filter. Links, not buttons — every choice is a real URL.
export const AllSelected: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Բոլորը" })).toHaveAttribute("aria-current", "true");
    await expect(canvas.getByRole("link", { name: "Արշավ" })).toHaveAttribute("href", "/clubs?activity=1");
  },
};
export const OneSelected: Story = {
  args: { items: items.map((item) => ({ ...item, active: item.label === "Ջրային" })) },
};
