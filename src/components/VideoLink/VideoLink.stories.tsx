import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { VideoLink } from "./VideoLink";

const meta = {
  component: VideoLink,
  tags: ["ai-generated"],
  args: { href: "/about", label: "Դիտել տեսանյութը", duration: "2 ր" },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ padding: 24, background: "#1b2523" }}><Story /></div>],
} satisfies Meta<typeof VideoLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: /Դիտել տեսանյութը/ })).toHaveAttribute("href", "/about");
  },
};
