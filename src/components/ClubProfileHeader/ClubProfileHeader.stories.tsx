import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { FollowButton } from "@/components/FollowButton";
import { ShareButton } from "@/components/ShareButton";
import { ClubProfileHeader } from "./ClubProfileHeader";

const meta = {
  component: ClubProfileHeader,
  tags: ["ai-generated"],
  args: {
    name: "Հայաստանի արահետներ",
    cover: "/images/clubs/profile-cover.png",
    logo: "/images/clubs/logo-1.png",
    classification: "ԱՐՇԱՎ · ԵՐԵՎԱՆ · 2019 ԹՎԱԿԱՆԻՑ",
    verifiedLabel: "Ստուգված ակումբ",
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ClubProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// The page's one <h1>; the shield carries an accessible name.
export const Default: Story = {
  render: (args) => (
    <ClubProfileHeader {...args}>
      <ShareButton label="Կիսվել" title={args.name} />
      <FollowButton label="Հետևել" followingLabel="Հետևում եք" />
    </ClubProfileHeader>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 1, name: /Հայաստանի արահետներ/ })).toBeVisible();
    await expect(canvas.getByRole("img", { name: "Ստուգված ակումբ" })).toBeInTheDocument();
  },
};
export const NoActions: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
