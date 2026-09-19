import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { RoutePoint } from "./RoutePoint";

const meta = {
  component: RoutePoint,
  tags: ["ai-generated"],
  args: { type: "meeting", label: "Հանդիպման վայր", place: "Կասկադ, Երևան", time: "06:00" },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof RoutePoint>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Meeting: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Կասկադ, Երևան")).toBeVisible();
    await expect(canvas.getByText("06:00")).toBeVisible();
  },
};
// Orange = the trailhead (attention).
export const Departure: Story = {
  args: { type: "departure", label: "Մեկնարկի կետ", place: "Քարի լիճ, Արագած", time: "08:30" },
};
export const Return: Story = {
  args: { type: "return", label: "Վերադարձ", place: "Կասկադ, Երևան", time: "19:30" },
};
