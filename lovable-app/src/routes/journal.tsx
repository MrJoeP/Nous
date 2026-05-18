import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useNous } from "@/lib/nous/state";
import { colorsForDay } from "@/lib/nous/palette";
import { AppShell } from "@/components/nous/AppShell";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
});

function JournalPage() {
  const { state, set } = useNous();
  const nav = useNavigate();
  const c = colorsForDay(state.currentDay);
  const [text, setText] = useState(state.journalEntries[state.currentDay] || "");

  const save = () => {
    set((s) => ({ journalEntries: { ...s.journalEntries, [s.currentDay]: text } }));
    nav({ to: "/" });
  };

  return (
    <AppShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginBottom: 32 }}>
        <button
          onClick={() => nav({ to: "/" })}
          style={{ background: "none", border: "none", color: c.secondary, fontSize: 24, cursor: "pointer", padding: 0, justifySelf: "start" }}
        >
          ←
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 2, color: c.secondary }}>
          DAY {state.currentDay}
        </span>
        <button
          onClick={save}
          style={{ background: "none", border: "none", color: c.text, fontSize: 16, fontWeight: 600, cursor: "pointer", padding: 0, justifySelf: "end" }}
        >
          Save
        </button>
      </div>

      <textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What happened today?"
        style={{
          width: "100%",
          minHeight: "60vh",
          background: "transparent",
          border: "none",
          outline: "none",
          color: c.text,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 18,
          lineHeight: "28px",
          resize: "none",
        }}
      />
    </AppShell>
  );
}
