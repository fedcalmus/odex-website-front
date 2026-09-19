import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ButtonLink } from "./Button";

const meta = {
  title: "Components/ButtonLink",
  component: ButtonLink,
  tags: ["ai-generated"],
  args: { href: "/events", children: "Գտնել միջոցառում", icon: "arrow-right" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// A link that LOOKS like a button must still be a link (crawlable, open-in-new-tab).
export const Primary: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Գտնել միջոցառում" })).toHaveAttribute("href", "/events");
  },
};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Large: Story = { args: { size: "large" } };
export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};
