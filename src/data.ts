import type { SlotItem } from "@casino-ui/slot-machine";

// Simple SVG data URLs as symbols so the example works without external assets
const svg = (fill: string, text: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="${fill}" stroke="#fff" stroke-width="2"/><text x="40" y="50" text-anchor="middle" fill="#fff" font-size="24" font-family="sans-serif">${text}</text></svg>`
  )}`;

export const SAMPLE_ITEMS: SlotItem[] = [
  { id: "1", image: svg("#e11d48", "A"), name: "Cherry" },
  { id: "2", image: svg("#f59e0b", "B"), name: "Lemon" },
  { id: "3", image: svg("#10b981", "C"), name: "Seven" },
  { id: "4", image: svg("#6366f1", "D"), name: "Star" },
  { id: "5", image: svg("#ec4899", "E"), name: "Bell" },
];
