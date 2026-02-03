import { useRef, useState } from "react";
import {
  SlotMachine,
  type SlotMachineHandle,
  type SlotOrientation,
} from "@casino-ui/slot-machine";
import { SAMPLE_ITEMS } from "./data";
import "./App.css";

const ORIENTATIONS: { value: SlotOrientation; label: string }[] = [
  { value: "vertical", label: "Vertical" },
  { value: "horizontal", label: "Horizontal" },
];

const DURATIONS = [
  { value: 1500, label: "1.5s" },
  { value: 2500, label: "2.5s" },
  { value: 3500, label: "3.5s" },
];

const TWIST_DURATIONS = [
  { value: 200, label: "0.2s" },
  { value: 400, label: "0.4s" },
  { value: 600, label: "0.6s" },
];

const ITEM_GAPS = [
  { value: 8, label: "8px" },
  { value: 20, label: "20px" },
  { value: 32, label: "32px" },
];

const OVERLAYS = [
  { value: "top-bottom" as const, label: "Top/Bottom" },
  { value: "left-right" as const, label: "Left/Right" },
  { value: "none" as const, label: "None" },
];

export default function App() {
  const slotRef = useRef<SlotMachineHandle>(null);
  const [orientation, setOrientation] = useState<SlotOrientation>("vertical");
  const [duration, setDuration] = useState(2500);
  const [twistDuration, setTwistDuration] = useState(400);
  const [itemGap, setItemGap] = useState(20);
  const [overlayGradient, setOverlayGradient] = useState<
    "none" | "top-bottom" | "left-right"
  >("top-bottom");
  const [lastResult, setLastResult] = useState<string | null>(null);

  return (
    <div className="app">
      <header className="header">
        <h1>Slot Machine Example</h1>
        <p className="subtitle">
          Configurable reel with basic settings and example view
        </p>
      </header>

      <div className="layout">
        <aside className="config">
          <h2>Config</h2>

          <div className="config-group">
            <label>Orientation</label>
            <div className="button-group">
              {ORIENTATIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={orientation === value ? "active" : ""}
                  onClick={() => setOrientation(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="config-group">
            <label>Spin duration</label>
            <div className="button-group">
              {DURATIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={duration === value ? "active" : ""}
                  onClick={() => setDuration(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="config-group">
            <label>Twist duration</label>
            <div className="button-group">
              {TWIST_DURATIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={twistDuration === value ? "active" : ""}
                  onClick={() => setTwistDuration(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="config-group">
            <label>Item gap</label>
            <div className="button-group">
              {ITEM_GAPS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={itemGap === value ? "active" : ""}
                  onClick={() => setItemGap(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="config-group">
            <label>Overlay gradient</label>
            <div className="button-group">
              {OVERLAYS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={overlayGradient === value ? "active" : ""}
                  onClick={() => setOverlayGradient(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="demo">
          <div
            className="slot-wrapper"
            style={{
              height: orientation === "vertical" ? 320 : 160,
              width: orientation === "horizontal" ? "100%" : "auto",
              minWidth: orientation === "horizontal" ? 320 : 120,
            }}
          >
            <SlotMachine
              ref={slotRef}
              items={SAMPLE_ITEMS}
              orientation={orientation}
              duration={duration}
              twistDuration={twistDuration}
              itemGap={itemGap}
              overlayGradient={overlayGradient}
              onSpinStart={() => setLastResult(null)}
              onSpinEnd={(result) =>
                setLastResult(result.name ?? result.id ?? "—")
              }
              className="slot-machine"
            />
          </div>

          <div className="actions">
            <button
              type="button"
              className="spin-btn"
              onClick={() => slotRef.current?.spin()}
            >
              Spin
            </button>
          </div>

          {lastResult !== null && (
            <p className="result">
              Last result: <strong>{lastResult}</strong>
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
