import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { MailCheckScreen } from "./MailCheckScreen";

const meta = {
  title: "Components/MailCheckScreen",
  component: MailCheckScreen,
  tags: ["ai-generated"],
  args: {
    email: "anush@example.am",
    title: "Հաստատեք էլ. փոստը",
    lead: "Նամակ ուղարկվեց anush@example.am հասցեին: Բացեք այն և սեղմեք հաստատման հղումը:",
    notice: "Կարող եք գնել միջոցառումները առանց հաստատման, բայց ամրագրելու համար հաստատումը պարտադիր է:",
    openMailLabel: "Բացել փոստը",
    resendLabel: "Ուղարկել կրկին",
    resendSeconds: 59,
    wrongAddress: { label: "Սխա՞լ հասցե · Փոխել", href: "/register" },
    continueLink: { label: "Շարունակել առանց հաստատման", href: "/complete-profile/waiver" },
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof MailCheckScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/anush@example\.am/)).toBeInTheDocument();
    const resend = canvas.getByRole("button", { name: /Ուղարկել կրկին/ });
    await expect(resend).toBeDisabled();
    await expect(canvas.getByRole("link", { name: /Շարունակել առանց հաստատման/ })).toBeInTheDocument();
  },
};

// Password-reset usage: no continue link, since there's nothing to continue to without the email.
export const WithoutContinueLink: Story = {
  args: { continueLink: undefined },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText(/Շարունակել/)).not.toBeInTheDocument();
  },
};

// A recognised webmail domain gets its real inbox URL instead of a `mailto:` fallback.
export const GmailAddress: Story = {
  args: { email: "anush@gmail.com" },
  play: async ({ canvas }) => {
    const openMail = canvas.getByRole("link", { name: "Բացել փոստը" });
    await expect(openMail).toHaveAttribute("href", "https://mail.google.com/mail/u/0/#inbox");
  },
};

// An unrecognised domain falls back to a plain mailto: link.
export const UnknownDomain: Story = {
  args: { email: "anush@odex.am" },
  play: async ({ canvas }) => {
    const openMail = canvas.getByRole("link", { name: "Բացել փոստը" });
    await expect(openMail).toHaveAttribute("href", "mailto:anush@odex.am");
  },
};
