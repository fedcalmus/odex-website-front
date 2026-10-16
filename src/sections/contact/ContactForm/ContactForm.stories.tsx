import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor } from "storybook/test";
import { ContactForm } from "./ContactForm";

const meta = {
  title: "Sections/Contact/ContactForm",
  component: ContactForm,
  tags: ["ai-generated"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Validates on BLUR, never per keystroke (Armenian input methods produce intermediate states).
export const ValidatesOnBlur: Story = {
  play: async ({ canvas }) => {
    const email = canvas.getByRole("textbox", { name: /Էլ. փոստ/ });
    await userEvent.type(email, "bad");
    await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();
    await userEvent.tab();
    await expect(await canvas.findByRole("alert")).toBeInTheDocument();
  },
};

export const EmptySubmitShowsRequiredErrors: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Ուղարկել" }));
    await waitFor(() => expect(canvas.getAllByRole("alert")).toHaveLength(3));
  },
};

export const ValidSubmitShowsConfirmation: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByRole("textbox", { name: /Անուն/ }), "Անուշ Օրինակյան");
    await userEvent.type(canvas.getByRole("textbox", { name: /Էլ. փոստ/ }), "anush@example.am");
    await userEvent.type(canvas.getByLabelText(/Հաղորդագրություն/), "Բարև, ունեմ հարց ամրագրման մասին։");
    await userEvent.click(canvas.getByRole("button", { name: "Ուղարկել" }));
    await expect(await canvas.findByText("Հաղորդագրությունը ուղարկված է")).toBeInTheDocument();
  },
};
