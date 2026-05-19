import { useState } from "react";
import { useNous } from "@/lib/nous/state";
import { colorsForDay } from "@/lib/nous/palette";
import { BlockScreenModal } from "./BlockScreenModal";

export function DemoTool() {
  const { state, set, reset } = useNous();
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const c = colorsForDay(state.currentDay);

  const btn = (label: string, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      style={{
        background: "transparent",
        color: c.text,
        border: `1px solid ${c.softBorder}`,
        borderRadius: 4,
        padding: "10px 12px",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {label}
    </button>
  );

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          height: 36,
          padding: "0 12px",
          background: c.bg,
          color: c.text,
          border: `1px solid ${c.softBorder}`,
          borderRadius: 8,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
          zIndex: 900,
        }}
      >
        ⚙ Demo
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: c.bg,
            color: c.text,
            borderTop: `1px solid ${c.softBorder}`,
            padding: 20,
            zIndex: 901,
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <strong style={{ fontSize: 13, letterSpacing: 2 }}>DAY {state.currentDay}</strong>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: c.secondary,
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              ✕
            </button>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            value={state.currentDay}
            onChange={(e) => set({ currentDay: Number(e.target.value) })}
            style={{ width: "100%", marginBottom: 16, accentColor: c.text }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {btn("Reset to Day 1", () => reset())}
            {btn("Jump to Day 15", () => set({ currentDay: 15 }))}
            {btn("Jump to Day 28", () => set({ currentDay: 28 }))}
            {btn("Jump to Day 30", () => set({ currentDay: 30 }))}
            {btn("Trigger Block Screen", () => setBlock(true))}
          </div>
        </div>
      )}

      <BlockScreenModal open={block} app="Instagram" onClose={() => setBlock(false)} />
    </>
  );
}
