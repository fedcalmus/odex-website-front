import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { FollowButton } from "@/components/FollowButton";
import { ClubSummary } from "./ClubSummary";

const meta = {
  component: ClubSummary,
  tags: ["ai-generated"],
  args: {
    name: "Հայաստանի արահետներ",
    href: "/clubs/armenia-trails",
    logo: "/images/clubs/club-logo-1.png",
    meta: "18 միջոցառում · 4,9",
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
} satisfies Meta<typeof ClubSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Հայաստանի արահետներ" })).toHaveAttribute("href", "/clubs/armenia-trails");
  },
};
export const WithFollow: Story = {
  render: (args) => (
    <ClubSummary {...args}>
      <FollowButton label="Հետևել" followingLabel="Հետևում եք" />
    </ClubSummary>
  ),
};
