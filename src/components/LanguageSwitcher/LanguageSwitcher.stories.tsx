import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { LanguageSwitcher } from "./LanguageSwitcher";

const meta = {
  component: LanguageSwitcher,
  tags: ["ai-generated"],
  args: {
    label: "Լեզու",
    current: "hy",
    locales: [
      { code: "hy", label: "ՀԱՅ", name: "Հայերեն", href: "/" },
      { code: "en", label: "ENG", name: "English", href: "/en" },
      { code: "ru", label: "РУС", name: "Русский", href: "/ru" },
    ],
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// Footer: all three visible, the active one lime.
export const Segmented: Story = {
  args: { variant: "segmented" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Հայերեն" })).toHaveAttribute("aria-current", "true");
    await expect(canvas.getByRole("link", { name: "English" })).toHaveAttribute("hreflang", "en");
  },
};

// Header: the current language, opening a list (native <details>, no JS).
export const Menu: Story = {
  args: { variant: "menu" },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByLabelText("Լեզու"));
    await expect(canvas.getByRole("link", { name: "English" })).toBeVisible();
  },
};
