import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { EmptyState } from "./EmptyState";

const meta = {
  component: EmptyState,
  tags: ["ai-generated"],
  args: { title: "Ոչինչ չի գտնվել", action: { label: "Մաքրել բոլորը", href: "/events" } },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

// Never a blank page: says so plainly and offers the one useful next step.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Մաքրել բոլորը" })).toHaveAttribute("href", "/events");
  },
};
export const WithDescription: Story = { args: { description: "Փորձեք հեռացնել որևէ զտիչ։" } };
