import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, userEvent, waitFor } from "storybook/test";
import { BookingAccountForm } from "./BookingAccountForm";

const meta = {
  title: "Sections/Auth/BookingAccountForm",
  component: BookingAccountForm,
  tags: ["ai-generated"],
  args: { nextHref: "/booking-account/agreement", loginHref: "/login" },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof BookingAccountForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Validates on BLUR, never per keystroke (Armenian input methods produce intermediate states).
export const ValidatesOnBlur: Story = {
  play: async ({ canvas }) => {
    const email = canvas.getByRole("textbox", { name: /Էլ. փոստ/ });
    await userEvent.type(email, "bad");
    await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();
    await userEvent.tab();
    await expect(await canvas.findByRole("alert")).toHaveTextContent("name@mail.com");
  },
};

export const EmptySubmitShowsEveryError: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Շարունակել" }));
    await waitFor(() => expect(canvas.getAllByRole("alert")).toHaveLength(3));
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};

export const ValidSubmitContinues: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByRole("textbox", { name: /Էլ. փոստ/ }), "anush@mail.com");
    await userEvent.type(canvas.getByLabelText(/^Գաղտնաբառ/), "Odex2026x");
    await userEvent.type(canvas.getByLabelText(/Կրկնեք/), "Odex2026x");
    await userEvent.click(canvas.getByRole("button", { name: "Շարունակել" }));
    await waitFor(() => expect(getRouter().push).toHaveBeenCalledWith("/booking-account/agreement"));
  },
};

export const PasswordMismatch: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByLabelText(/^Գաղտնաբառ/), "Odex2026x");
    await userEvent.type(canvas.getByLabelText(/Կրկնեք/), "Odex2026y");
    await userEvent.tab();
    await expect(await canvas.findByRole("alert")).toHaveTextContent("չեն համընկնում");
  },
};
