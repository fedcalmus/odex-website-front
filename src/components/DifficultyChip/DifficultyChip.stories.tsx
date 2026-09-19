import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { DifficultyChip } from "./DifficultyChip";

const meta = {
  component: DifficultyChip,
  tags: ["ai-generated"],
  argTypes: {
    level: { control: "select", options: ["easy", "moderate", "hard", "extreme"] },
  },
  args: { level: "easy" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof DifficultyChip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Passing only the level gives the label, colours and glyph automatically.
export const Easy: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Հեշտ")).toBeVisible();
  },
};

export const Moderate: Story = {
  args: { level: "moderate" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Միջին")).toBeVisible();
  },
};

export const Hard: Story = {
  args: { level: "hard" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Դժվար")).toBeVisible();
  },
};

export const Extreme: Story = {
  args: { level: "extreme" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Ծայրահեղ")).toBeVisible();
  },
};

export const AllLevels: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <DifficultyChip level="easy" />
      <DifficultyChip level="moderate" />
      <DifficultyChip level="hard" />
      <DifficultyChip level="extreme" />
    </div>
  ),
};

// Safety-critical: the glyph must always sit beside the label (never colour
// alone), and it maps 1:1 to the level — N of 4 bars filled.
export const GlyphAlwaysPresent: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <DifficultyChip level="easy" />
      <DifficultyChip level="moderate" />
      <DifficultyChip level="hard" />
      <DifficultyChip level="extreme" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const expected = {
      easy: "difficulty-bars-1",
      moderate: "difficulty-bars-2",
      hard: "difficulty-bars-3",
      extreme: "difficulty-bars-4",
    };
    for (const [level, icon] of Object.entries(expected)) {
      const chip = canvasElement.querySelector(`[data-level="${level}"]`);
      await expect(chip?.querySelector("use")?.getAttribute("href")).toBe(
        `/icons/sprite.svg#icon-${icon}`,
      );
      // The glyph is decorative — the visible label carries the meaning for AT.
      await expect(chip?.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
    }
  },
};

// Label can be swapped (e.g. another locale) without losing the glyph or colours.
export const CustomLabel: Story = {
  args: { level: "hard", label: "Hard" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Hard")).toBeVisible();
  },
};
