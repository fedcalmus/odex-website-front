import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";
import { Checkbox } from "./Checkbox";

const meta = {
  component: Checkbox,
  tags: ["ai-generated"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "text" },
  },
  args: {
    label: "Ունեմ առողջական վիճակ, որի մասին ուղեկցորդը պետք է իմանա",
    onChange: fn(),
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Uncontrolled: clicking the label (the whole row is the target) toggles the native input.
export const Unchecked: Story = {
  play: async ({ canvas, args }) => {
    const checkbox = canvas.getByRole("checkbox", { name: args.label as string });
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(canvas.getByText(args.label as string));
    await expect(checkbox).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  },
};

export const Checked: Story = {
  args: { defaultChecked: true },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByRole("checkbox", { name: args.label as string })).toBeChecked();
  },
};

// Keyboard: Tab reaches the native input, Space toggles it.
export const KeyboardToggle: Story = {
  play: async ({ canvas, args }) => {
    const checkbox = canvas.getByRole("checkbox", { name: args.label as string });
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(checkbox).toBeChecked();
    await userEvent.keyboard(" ");
    await expect(checkbox).not.toBeChecked();
  },
};

// Disabled reaches the DOM as a real disabled control and ignores clicks.
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas, args }) => {
    const checkbox = canvas.getByRole("checkbox", { name: args.label as string });
    await expect(checkbox).toBeDisabled();
    await userEvent.click(canvas.getByText(args.label as string));
    await expect(checkbox).not.toBeChecked();
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

// The error is announced (role=alert) and tied to the input via aria-describedby.
export const WithError: Story = {
  args: {
    label: "Համաձայն եմ օգտագործման պայմաններին",
    error: "Շարունակելու համար հաստատիր համաձայնությունը",
  },
  play: async ({ canvas, args }) => {
    const checkbox = canvas.getByRole("checkbox", { name: args.label as string });
    await expect(checkbox).toBeInvalid();
    await expect(checkbox).toHaveAccessibleDescription(args.error as string);
    await expect(canvas.getByRole("alert")).toHaveTextContent(args.error as string);
  },
};

// A long label wraps and the box stays aligned to the first line.
export const LongLabel: Story = {
  args: {
    label:
      "Ունեմ առողջական վիճակ, որի մասին ուղեկցորդը պետք է իմանա, և ցանկանում եմ, որ այս տեղեկությունը հասանելի լինի ակումբին ամրագրումից հետո",
  },
};

export const Controlled: Story = {
  render: function ControlledCheckbox(args) {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(event) => {
          setChecked(event.target.checked);
          args.onChange?.(event);
        }}
      />
    );
  },
  play: async ({ canvas, args }) => {
    const checkbox = canvas.getByRole("checkbox", { name: args.label as string });
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

// Compact 18px box with a trailing facet count — the discovery filter panel row.
export const FilterRow: Story = {
  args: { size: "small", label: "Արշավ", meta: 24 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: /Արշավ/ })).toBeInTheDocument();
    await expect(canvas.getByText("24")).toBeVisible();
  },
};

// A count of zero is shown as "0" — not hidden (the option is still selectable).
export const FilterRowZero: Story = { args: { size: "small", label: "Օդային", meta: 0 } };
