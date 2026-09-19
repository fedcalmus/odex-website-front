import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useFormik } from "formik";
import { expect, fn, userEvent, waitFor } from "storybook/test";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { contactEmailSchema } from "@/validations/contact.validation";
import { participantInitialValues, participantSchema } from "@/validations/participant.validation";
import type { ParticipantValues } from "@/validations/participant.validation";
import { Input } from "./Input";

const meta = {
  component: Input,
  tags: ["ai-generated"],
  argTypes: {
    size: { control: "inline-radio", options: ["default", "compact"] },
    validated: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "text" },
  },
  args: {
    label: "Էլ. փոստ",
    placeholder: "name@example.com",
    type: "email",
    autoComplete: "email",
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      // 358 = the Figma "Mobile field" width at a 390 viewport (16px gutters).
      <div style={{ width: 358 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// The label sits ABOVE the box and is programmatically tied to the input.
export const Empty: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Էլ. փոստ");
    await expect(input).toHaveValue("");
    await userEvent.type(input, "aram@odex.am");
    await expect(input).toHaveValue("aram@odex.am");
  },
};

// The check is for VALIDATED fields only — not every field that has text.
export const Filled: Story = {
  args: { defaultValue: "aram@odex.am", validated: true },
};

export const Focus: Story = {
  args: { defaultValue: "aram@odex.am" },
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByLabelText("Էլ. փոստ")).toHaveFocus();
  },
};

// Red border + icon + text (never colour alone). The message is announced and
// tied to the input through aria-describedby.
export const WithError: Story = {
  args: {
    defaultValue: "aram@odex",
    error: "Հասցեն թերի է — ավելացրու տիրույթը",
  },
  play: async ({ canvas, args }) => {
    const input = canvas.getByLabelText("Էլ. փոստ");
    await expect(input).toBeInvalid();
    await expect(input).toHaveAccessibleDescription(args.error as string);
    await expect(canvas.getByRole("alert")).toHaveTextContent(args.error as string);
  },
};

// Disabled reaches the DOM as a real disabled control and cannot be typed into.
export const Disabled: Story = {
  args: { defaultValue: "aram@odex.am", disabled: true },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Էլ. փոստ");
    await expect(input).toBeDisabled();
    await userEvent.type(input, "x");
    await expect(input).toHaveValue("aram@odex.am");
  },
};

// Compact = the 42px field from the Participant form (micro-caps label, surface-0).
export const Compact: Story = {
  args: { size: "compact", label: "Անուն Ազգանուն", defaultValue: "Անուշ Օրինակյան", type: "text" },
};

export const CompactError: Story = {
  args: {
    size: "compact",
    label: "Հեռախոս",
    type: "tel",
    defaultValue: "(017) 23",
    error: "Մուտքագրիր հեռախոսահամարը, օրինակ՝ (093) 442-118",
  },
};

// No visible label: the field must still have an accessible name.
export const WithoutVisibleLabel: Story = {
  args: { label: undefined, "aria-label": "Որոնել" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Որոնել" })).toBeVisible();
  },
};

export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Input label="Էլ. փոստ" placeholder="name@example.com" />
      <Input label="Էլ. փոստ" defaultValue="aram@odex.am" validated />
      <Input label="Էլ. փոստ" defaultValue="aram@odex" error="Հասցեն թերի է — ավելացրու տիրույթը" />
      <Input label="Էլ. փոստ" defaultValue="aram@odex.am" disabled />
    </div>
  ),
};

// --- Formik + Yup: the schema lives in src/validations, not in the component ---

function EmailFieldDemo() {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: contactEmailSchema,
    onSubmit: () => {},
  });
  const error = formik.touched.email ? formik.errors.email : undefined;

  return (
    <Input
      label="Էլ. փոստ"
      type="email"
      autoComplete="email"
      placeholder="name@example.com"
      {...formik.getFieldProps("email")}
      error={error}
      validated={Boolean(formik.touched.email && !formik.errors.email && formik.values.email)}
    />
  );
}

// An incomplete address is rejected on blur with the Figma error copy; finishing
// it clears the error and shows the validated check.
export const EmailValidation: Story = {
  render: () => <EmailFieldDemo />,
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Էլ. փոստ");
    await userEvent.type(input, "aram@odex");
    await userEvent.tab();
    await expect(await canvas.findByRole("alert")).toHaveTextContent(
      "Հասցեն թերի է — ավելացրու տիրույթը",
    );
    await userEvent.type(input, ".am");
    await waitFor(() => expect(canvas.queryByRole("alert")).not.toBeInTheDocument());
    await expect(input).toBeValid();
  },
};

const onParticipantSubmit = fn();

function ParticipantFormDemo() {
  const formik = useFormik<ParticipantValues>({
    initialValues: participantInitialValues,
    validationSchema: participantSchema,
    onSubmit: (values) => onParticipantSubmit(values),
  });
  const errorFor = (name: "fullName" | "phone" | "emergencyContact") =>
    formik.touched[name] ? formik.errors[name] : undefined;

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        width: 600,
        padding: "16px 18px 18px",
        border: "1px solid rgb(255 255 255 / 7%)",
        borderRadius: 12,
        background: "var(--color-surface-1)",
      }}
    >
      <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>
        Մասնակից 1 · դուք
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Input
            size="compact"
            label="Անուն Ազգանուն"
            autoComplete="name"
            {...formik.getFieldProps("fullName")}
            error={errorFor("fullName")}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Input
            size="compact"
            label="Հեռախոս"
            type="tel"
            autoComplete="tel"
            {...formik.getFieldProps("phone")}
            error={errorFor("phone")}
          />
        </div>
      </div>
      <Input
        size="compact"
        label="Շտապ կոնտակտ"
        {...formik.getFieldProps("emergencyContact")}
        error={errorFor("emergencyContact")}
      />
      <Checkbox
        label="Ունեմ առողջական վիճակ, որի մասին ուղեկցորդը պետք է իմանա"
        {...formik.getFieldProps({ name: "hasHealthCondition", type: "checkbox" })}
      />
      <Button type="submit" size="small">
        Շարունակել
      </Button>
    </form>
  );
}

// The Figma "Participant form": compact labelled inputs + the health opt-in
// checkbox, all validated by the shared Yup schema.
export const ParticipantForm: Story = {
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
  render: () => <ParticipantFormDemo />,
  play: async ({ canvas }) => {
    const submit = canvas.getByRole("button", { name: "Շարունակել" });

    // Submitting the empty form flags every required field.
    await userEvent.click(submit);
    await expect(await canvas.findAllByRole("alert")).toHaveLength(3);
    await expect(onParticipantSubmit).not.toHaveBeenCalled();

    await userEvent.type(canvas.getByLabelText("Անուն Ազգանուն"), "Անուշ Օրինակյան");
    await userEvent.type(canvas.getByLabelText("Հեռախոս"), "(017) 236-0000");
    await userEvent.type(canvas.getByLabelText("Շտապ կոնտակտ"), "Արամ Օրինակյան · (091) 55-0022");
    await userEvent.click(canvas.getByRole("checkbox"));
    await waitFor(() => expect(canvas.queryByRole("alert")).not.toBeInTheDocument());

    await userEvent.click(submit);
    await waitFor(() =>
      expect(onParticipantSubmit).toHaveBeenCalledWith({
        fullName: "Անուշ Օրինակյան",
        phone: "(017) 236-0000",
        emergencyContact: "Արամ Օրինակյան · (091) 55-0022",
        hasHealthCondition: true,
      }),
    );
  },
};
