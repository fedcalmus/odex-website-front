import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { StatusPage } from "./StatusPage";

const meta = {
  component: StatusPage,
  tags: ["ai-generated"],
  args: {
    code: "404",
    title: "Այս արահետը տանում է ոչ մի տեղ",
    description: "Էջը տեղափոխվել է կամ երբեք գոյություն չի ունեցել: Փորձեք որոնել կամ սկսեք գլխավոր էջից:",
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StatusPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("404")).toBeVisible();
    await expect(canvas.getByRole("heading", { name: "Այս արահետը տանում է ոչ մի տեղ" })).toBeVisible();
  },
};
