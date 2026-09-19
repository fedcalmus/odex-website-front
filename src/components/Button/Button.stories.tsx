import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Button } from "./Button";

const meta = {
  component: Button,
  tags: ["ai-generated"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "on-photo"],
    },
    size: { control: "select", options: ["small", "medium", "large"] },
    iconPosition: { control: "select", options: ["leading", "trailing"] },
    loading: { control: "boolean" },
  },
  args: {
    children: "Ամրագրել",
    variant: "primary",
    size: "medium",
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Label renders, and disabled reaches the DOM as a real disabled control.
export const Default: Story = {
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", { name: args.children as string });
    await expect(button).toBeVisible();
    await expect(button).not.toBeDisabled();
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="ghost" />
      <div style={{ background: "#101817", borderRadius: 12 }}>
        <Button {...args} variant="on-photo" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Button {...args} size="small" />
      <Button {...args} size="medium" />
      <Button {...args} size="large" />
    </div>
  ),
};

export const WithIcon: Story = {
  args: { icon: "arrow-right", iconPosition: "trailing" },
};

export const WithLeadingIcon: Story = {
  args: { icon: "arrow-left", iconPosition: "leading" },
};

// Disabled reflects natively (aria/disabled attribute), not just a visual class.
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", { name: args.children as string });
    await expect(button).toBeDisabled();
  },
};

// Loading swaps the icon for a spinner and disables interaction (aria-busy, not just visual).
export const Loading: Story = {
  args: { loading: true },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", { name: args.children as string });
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute("aria-busy", "true");
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Button {...args} />
    </div>
  ),
};
