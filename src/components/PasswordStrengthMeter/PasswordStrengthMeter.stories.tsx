import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const meta = {
  title: "Components/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  tags: ["ai-generated"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof PasswordStrengthMeter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { value: "" },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
  },
};

export const Weak: Story = {
  args: { value: "abc" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Թույլ գաղտնաբառ")).toBeInTheDocument();
  },
};

export const Medium: Story = {
  args: { value: "odex2026" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Միջին գաղտնաբառ")).toBeInTheDocument();
  },
};

export const Strong: Story = {
  args: { value: "Odex2026x" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Ուժեղ գաղտնաբառ")).toBeInTheDocument();
  },
};

export const VeryStrong: Story = {
  args: { value: "Odex2026x!Trail" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Շատ ուժեղ գաղտնաբառ")).toBeInTheDocument();
  },
};
