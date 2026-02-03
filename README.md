# Slot Machine Example

A React demo app for **@casino-ui/slot-machine**. It shows how to use the component with config controls and a live reel so you can see how props affect behavior.

---

## Quick start

**1. Build the package** (from repo root):

```bash
cd ..
npm run build
cd example
```

**2. Install and run:**

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## How the SlotMachine component works

### One reel = one component

Each **SlotMachine** is a single reel (vertical or horizontal). For a multi-reel slot, render one component per reel and control them via refs.

### Triggering a spin

Spins are **imperative**: call `spin()` on the component ref. The component does not expose a “spin” button; you add your own and wire it to the ref.

```tsx
import { useRef } from "react";
import { SlotMachine, type SlotMachineHandle } from "@casino-ui/slot-machine";

const reelRef = useRef<SlotMachineHandle>(null);

<SlotMachine ref={reelRef} items={items} />
<button onClick={() => reelRef.current?.spin()}>Spin</button>
```

### Items (the reel content)

Pass an array of **items**. Each item must have at least:

- `id` (string)
- `image` (string, URL or data URI)
- `name` (optional, for display/alt text)

The reel fills itself from this pool and picks a result when the spin ends. You can optionally fix the outcome with `forcedResult` (e.g. from a server).

```tsx
const items = [
  { id: "1", image: "/cherry.png", name: "Cherry" },
  { id: "2", image: "/lemon.png", name: "Lemon" },
  // ...
];

<SlotMachine ref={reelRef} items={items} />
```

### Knowing when a spin finishes

Use **onSpinStart** and **onSpinEnd** to react to spin life cycle (e.g. disable the button, show “Spinning…”, then show the result).

```tsx
<SlotMachine
  ref={reelRef}
  items={items}
  onSpinStart={() => setSpinning(true)}
  onSpinEnd={(result) => {
    setLastResult(result);  // result is the item that landed
    setSpinning(false);
  }}
/>
```

### Main props you’ll use

| Prop | Purpose |
|------|--------|
| `items` | Pool of items for the reel (required). |
| `orientation` | `"vertical"` (default) or `"horizontal"`. |
| `duration` | Spin duration in ms (default `2500`). |
| `twistDuration` | Snap-to-center duration in ms (default `400`). |
| `itemGap` | Gap between items in px (default `20`). |
| `itemSize` | Fixed item size in px; omit for responsive sizing. |
| `overlayGradient` | `"top-bottom"` \| `"left-right"` \| `"none"` for fade edges. |
| `forcedResult` | If set, the reel stops on this item (e.g. server result). |
| `onSpinStart` | Called when spin starts. |
| `onSpinEnd` | Called with the landed item when spin ends. |

The example app’s **config panel** changes these props live so you can see how they affect the reel.

### Sizing the reel

Give the component a sized container (e.g. fixed height/width or flex). It uses `width: 100%` and `height: 100%` and will adapt. Example:

```tsx
<div style={{ width: 120, height: 320 }}>
  <SlotMachine ref={reelRef} items={items} className="w-full h-full" />
</div>
```

---

## What this example includes

- **Config panel (left)**: Buttons to change orientation, spin duration, twist duration, item gap, and overlay gradient. Changes apply immediately to the reel.
- **Demo reel (center)**: One vertical slot with sample items (inline SVG symbols). No external images.
- **Spin button**: Calls `reelRef.current?.spin()`.
- **Last result**: Shows the name of the item that landed after each spin (from `onSpinEnd`).

For multiple reels, render several `<SlotMachine>` components (e.g. in a flex row), store refs in an array, and call `spin()` on each ref when the user spins (see the main package README for a multi-reel example).
