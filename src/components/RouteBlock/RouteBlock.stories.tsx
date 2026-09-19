import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { RouteBlock } from "./RouteBlock";

const meta = {
  component: RouteBlock,
  tags: ["ai-generated"],
  args: {
    title: "Հանդիպում և մեկնարկ",
    points: [
      { type: "meeting", label: "Հանդիպման վայր", place: "Կասկադ, Երևան", time: "06:00" },
      { type: "departure", label: "Մեկնարկի կետ", place: "Քարի լիճ, Արագած", time: "08:30" },
      { type: "return", label: "Վերադարձ", place: "Կասկադ, Երևան", time: "19:30" },
    ],
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 880 }}><Story /></div>],
} satisfies Meta<typeof RouteBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// The map is a decorative placeholder (provider undecided); the stops in text carry the information.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
    await expect(canvas.getByText("Քարի լիճ, Արագած")).toBeVisible();
  },
};
