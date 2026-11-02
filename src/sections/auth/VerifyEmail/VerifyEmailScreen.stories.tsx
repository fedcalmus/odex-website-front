import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { VerifyEmailScreen } from "./VerifyEmailScreen";

// Domain-mapping ("open mail" link) and countdown behavior are the shared
// `MailCheckScreen`'s — see its own stories for that coverage. This just
// confirms the verify-email-specific copy (title, continue-without link).
const meta = {
  title: "Sections/Auth/VerifyEmailScreen",
  component: VerifyEmailScreen,
  tags: ["ai-generated"],
  args: { email: "anush@example.am" },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof VerifyEmailScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Հաստատեք էլ. փոստը")).toBeInTheDocument();
    await expect(canvas.getByText(/anush@example\.am/)).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: /Շարունակել առանց հաստատման/ })).toHaveAttribute(
      "href",
      "/complete-profile/waiver",
    );
  },
};
