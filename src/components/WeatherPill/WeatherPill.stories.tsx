import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { WeatherPill } from "./WeatherPill";

const meta = {
  component: WeatherPill,
  tags: ["ai-generated"],
  args: { condition: "clear", temperature: 6, conditionLabel: "Պարզ", date: "2026-09-12T06:00:00+04:00" },
  parameters: { layout: "centered" },
  // The pill is designed to sit over a photograph.
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: "linear-gradient(135deg, #3f4b49, #172224)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WeatherPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clear: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("6° · Պարզ")).toBeVisible();
    // The forecast is for a DATE — weather without one is a guess.
    await expect(canvas.getByText("12.09")).toBeVisible();
  },
};
export const Cloud: Story = { args: { condition: "cloud", temperature: 2, conditionLabel: "Ամպամած" } };
export const Rain: Story = { args: { condition: "rain", temperature: 11, conditionLabel: "Անձրև" } };
export const Snow: Story = { args: { condition: "snow", temperature: -3, conditionLabel: "Ձյուն" } };
export const Wind: Story = { args: { condition: "wind", temperature: 8, conditionLabel: "Քամոտ" } };
