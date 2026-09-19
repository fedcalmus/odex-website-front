import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { DestinationCard } from "./DestinationCard";

const meta = {
  component: DestinationCard,
  tags: ["ai-generated"],
  args: {
    kind: "region",
    place: "ԱՐԱԳԱԾՈՏՆ",
    typeLabel: "Մարզ",
    title: "Արագածի չորս գագաթները",
    href: "/guide/aragats-four-peaks",
    image: "/images/guide/region.png",
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 282 }}><Story /></div>],
} satisfies Meta<typeof DestinationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Three label layers, each doing a different job: place chip → entry type → editorial title.
export const Region: Story = {
  play: async ({ canvas, args }) => {
    await expect(canvas.getByText("ԱՐԱԳԱԾՈՏՆ")).toBeVisible();
    await expect(canvas.getByText("Մարզ")).toBeVisible();
    await expect(canvas.getByRole("link", { name: args.title })).toHaveAttribute("href", args.href);
  },
};
export const Tip: Story = {
  args: {
    kind: "tip",
    place: "ՀԱՅԱՍՏԱՆ",
    typeLabel: "Խորհուրդ",
    title: "Լավագույն շաբաթավերջյան արահետները",
    image: "/images/guide/tip.png",
  },
};
export const Community: Story = {
  args: {
    kind: "community",
    place: "ՏԱՎՈՒՇ",
    typeLabel: "Համայնք",
    title: "Դիլիջան և անտառային օղակները",
    image: "/images/guide/community.png",
  },
};
export const Season: Story = {
  args: {
    kind: "season",
    place: "ԿՈՏԱՅՔ",
    typeLabel: "Խորհուրդ",
    title: "Ծաղկաձոր՝ սքի թուրինգի սեզոն",
    image: "/images/guide/season.png",
  },
};
