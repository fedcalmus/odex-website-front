import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { DifficultyExplainerCard } from "./DifficultyExplainerCard";

const meta = {
  component: DifficultyExplainerCard,
  tags: ["ai-generated"],
  args: {
    level: "easy",
    description: "Զբոսանք։ Սովորական սպորտային կոշիկը բավական է, և ողջ ընտանիքով կարելի է գնալ։",
    anchor: "մինչև 10 կմ · մինչև 400 մ վերելք",
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 325 }}><Story /></div>],
} satisfies Meta<typeof DifficultyExplainerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// The chip's glyph AND word are both present — colour is never the only channel.
export const Easy: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Հեշտ")).toBeVisible();
  },
};
export const Moderate: Story = {
  args: {
    level: "moderate",
    description: "Երկար օր ոտքի վրա։ Պետք է արդեն սիրես երկար քայլելը և ունենաս արահետային կոշիկ։",
    anchor: "10–16 կմ · 400–1 000 մ վերելք",
  },
};
export const Hard: Story = {
  args: {
    level: "hard",
    description: "Վաղ մեկնարկ, կտրուկ վերելք։ Կանոնավոր ֆիզիկական ակտիվություն է պահանջվում։",
    anchor: "16–24 կմ · 1 000–1 600 մ վերելք",
  },
};
export const Extreme: Story = {
  args: {
    level: "extreme",
    description: "Տեխնիկական հատվածներ և երկար օր։ Նախորդ լեռնային փորձը պարտադիր է։",
    anchor: "24+ կմ · 1 600+ մ վերելք",
  },
};
