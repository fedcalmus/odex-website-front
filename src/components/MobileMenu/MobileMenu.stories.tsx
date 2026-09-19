import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Link from "next/link";
import { expect, userEvent, within } from "storybook/test";
import { MobileMenu } from "./MobileMenu";

const meta = {
  component: MobileMenu,
  tags: ["ai-generated"],
  args: {
    menuLabel: "Մենյու",
    closeLabel: "Փակել մենյուն",
    children: (
      <nav aria-label="Հիմնական մենյու">
        <Link href="/events">Միջոցառումներ</Link>
        <br />
        <Link href="/clubs">Ակումբներ</Link>
      </nav>
    ),
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Native <dialog>: modal, focus-trapped, Escape closes it.
export const OpenAndClose: Story = {
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Մենյու" }));
    const dialog = canvasElement.querySelector("dialog")!;
    await expect(dialog).toHaveAttribute("open");
    await expect(within(dialog).getByRole("link", { name: "Ակումբներ" })).toBeVisible();
    await userEvent.click(within(dialog).getByRole("button", { name: "Փակել մենյուն" }));
    await expect(dialog).not.toHaveAttribute("open");
  },
};
