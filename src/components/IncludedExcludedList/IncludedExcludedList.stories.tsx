import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { IncludedExcludedList } from "./IncludedExcludedList";

const meta = {
  component: IncludedExcludedList,
  tags: ["ai-generated"],
  args: {
    includedTitle: "Ներառված է",
    included: ["Ուղեկցորդ և հետնապահ", "Տրանսպորտ Երևանից", "Ապահովագրություն", "Թեյ գագաթին"],
    excludedTitle: "Ներառված չէ",
    excluded: ["Սնունդ", "Անձնական սարքավորում", "Ազգային պարկի մուտքավճար"],
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 880 }}><Story /></div>],
} satisfies Meta<typeof IncludedExcludedList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Colour is never the only channel: ✓ / ✗ glyphs sit beside the words and the column titles.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { name: "Ներառված է" })).toBeVisible();
    await expect(canvas.getByRole("heading", { name: "Ներառված չէ" })).toBeVisible();
    await expect(canvas.getAllByRole("listitem")).toHaveLength(7);
  },
};
