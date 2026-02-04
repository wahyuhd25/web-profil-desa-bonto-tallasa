
export const COMMODITY_OPTIONS = [
  { id: "corn",         label: "Jagung",        emoji: "🌽" },
  { id: "tomato",       label: "Tomat",         emoji: "🍅" },
  { id: "eggplant",     label: "Terong",        emoji: "🍆" },
  { id: "grape",        label: "Anggur",        emoji: "🍇" },
  { id: "chili",        label: "Cabai",         emoji: "🌶️" },
  { id: "rice",         label: "Padi",          emoji: "🌾" },
  { id: "strawberry",   label: "Stroberi",      emoji: "🍓" },
  { id: "clove",        label: "Cengkeh",       emoji: "🌸" },
  { id: "cocoa",        label: "Coklat",        emoji: "🍫" },
  { id: "candlenut",    label: "Kemiri",        emoji: "🌰" },
  { id: "village_staff", label: "Aparat Desa",  emoji: "🏛️" },
] as const;

export type CommodityId = (typeof COMMODITY_OPTIONS)[number]["id"];
