import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { ActivityTile } from "./ActivityTile";

// Sample fixture from the Figma export (400×265). Real tiles take their photo
// from the activity-group data.
const HIKING_PHOTO = "/images/activities/hiking.png";

const meta = {
  component: ActivityTile,
  tags: ["ai-generated"],
  argTypes: {
    count: { control: { type: "number", min: 0 } },
  },
  args: {
    title: "Արշավ",
    count: 48,
    href: "/events?activity=hiking",
    image: HIKING_PHOTO,
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      // The Figma tile is 177px wide.
      <div style={{ width: 177 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActivityTile>;

export default meta;
type Story = StoryObj<typeof meta>;

// The whole tile is one link, named by its title + count, and it goes to the
// pre-filtered discovery page.
export const Default: Story = {
  play: async ({ canvas, args }) => {
    const link = canvas.getByRole("link", { name: /Արշավ/ });
    await expect(link).toHaveAttribute("href", args.href);
    await expect(link).toHaveAccessibleName("Արշավ 48 միջոցառում");
  },
};

// Keyboard: the tile is reachable with Tab and shows a visible focus ring.
export const KeyboardFocus: Story = {
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("link", { name: /Արշավ/ })).toHaveFocus();
  },
};

// Long names truncate with an ellipsis instead of overflowing the tile.
export const LongTitle: Story = {
  args: { title: "Լեռնային արշավներ և բացօթյա ճամբարներ", count: 1204 },
};

// A group with zero events is HIDDEN, not shown at 0.
export const ZeroEventsHidden: Story = {
  args: { count: 0 },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("link")).not.toBeInTheDocument();
  },
};

// Custom unit (another locale) keeps the same lime count line.
export const CustomUnit: Story = {
  args: { title: "Hiking", count: 48, countUnit: "events" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("48 events")).toBeVisible();
  },
};

// The homepage row: seven tiles across at 1358px with a 20px gap resolve to
// the Figma 177×400 (the tile is sized by its container, not fixed px).
export const HomepageRow: Story = {
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ width: 1358, margin: "0 auto", padding: "24px 0" }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 20 }}>
      {[48, 31, 27, 19, 12, 9, 3].map((count, i) => (
        <ActivityTile key={i} {...args} count={count} priority={i < 7} />
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    const links = canvas.getAllByRole("link");
    await expect(links).toHaveLength(7);
    const box = links[0].getBoundingClientRect();
    await expect(Math.round(box.width)).toBe(177);
    await expect(Math.round(box.height)).toBe(400);
  },
};
