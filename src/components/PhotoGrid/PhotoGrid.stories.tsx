import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { PhotoGrid } from "./PhotoGrid";

const meta = {
  component: PhotoGrid,
  tags: ["ai-generated"],
  args: { photos: [1, 2, 3, 4, 5].map((n) => ({ src: `/images/club-photos/photo-${n}.png` })) },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 988 }}><Story /></div>],
} satisfies Meta<typeof PhotoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Five: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(5);
  },
};
// Five 150px tiles don't fit a phone: a swipeable strip.
export const Mobile: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
