import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ResetSentScreen } from "./ResetSentScreen";

// Domain-mapping ("open mail" link) and countdown behavior are the shared
// `MailCheckScreen`'s — see its own stories for that coverage. This just
// confirms the reset-sent-specific copy and that it has no continue link
// (unlike verify-email, there's nothing to continue to without the reset).
const meta = {
  title: "Sections/Auth/ResetSentScreen",
  component: ResetSentScreen,
  tags: ["ai-generated"],
  args: { email: "anush@example.am" },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof ResetSentScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Ստուգեք ձեր փոստը")).toBeInTheDocument();
    await expect(canvas.getByText(/anush@example\.am/)).toBeInTheDocument();
    await expect(canvas.queryByText(/Շարունակել/)).not.toBeInTheDocument();
  },
};
