import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WeatherDot } from "./WeatherDot";

const meta = {
  component: WeatherDot,
  tags: ["ai-generated"],
  args: { condition: "clear" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof WeatherDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clear: Story = {};
export const Small: Story = { args: { size: 8 } };

// Colour is only a hint — the written condition always sits beside it.
export const AllConditions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {(["clear", "cloud", "rain", "snow", "wind"] as const).map((condition) => (
        <WeatherDot key={condition} condition={condition} size={16} />
      ))}
    </div>
  ),
};
