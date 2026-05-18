import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useNous } from "@/lib/nous/state";
import { BLOCK_QUOTES, PALETTE, colorsForDay } from "@/lib/nous/palette";
import { AppShell } from "@/components/nous/AppShell";
import { NousButton } from "@/components/nous/NousButton";
import { sendProgressReport } from "@/lib/nous/email";

export const Route = createFileRoute("/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const { state } = useNous();
  const nav = useNavigate();
  const c = colorsForDay(state.currentDay);
  const [tip, setTip] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const currentWeek = Math.min(4, Math.ceil(state.currentDay / 7));
  const remaining = 30 - state.currentDay;

  const send = async () => {
    setSending(true);
    setStatus("");
    const res = await sendProgressReport(state).catch(() => ({ ok: false, error: "err" } as const));
    setSending(false);
    if (res.ok) {
      setStatus("Report sent ✓");
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("Couldn't send. Try again.");
    }
  };

  const milestones = [
    { week: 1, label: "Foundation", done: Math.min(Math.max(state.currentDay, 0), 7), total: 7 },
    { week: 2, label: "Pattern", done: Math.min(Math.max(state.currentDay - 7, 0), 7), total: 7 },
    { week: 3, label: "Friction", done: Math.min(Math.max(state.currentDay - 14, 0), 7), total: 7 },
    { week: 4, label: "Identity", done: Math.min(Math.max(state.currentDay - 21, 0), 9), total: 9 },
  ];

  return (
    <AppShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginBottom: 40 }}>
        <button
          onClick={() => nav({ to: "/" })}
          style={{ background: "none", border: "none", color: c.secondary, fontSize: 24, cursor: "pointer", padding: 0, justifySelf: "start" }}
        >
          ←
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 2 }}>PROGRESS</span>
        <span />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 48 }}>
        <Stat
          big={state.currentDay === 30 ? "✓" : String(state.currentDay)}
          label="day"
          c={c}
        />
        <Stat
          big={state.streak === 0 ? "" : String(state.streak)}
          fallback={state.streak === 0 ? "Start your streak today." : undefined}
          label="streak"
          c={c}
        />
        <Stat
          big={state.currentDay === 30 ? "" : String(remaining)}
          fallback={state.currentDay === 30 ? "Completed." : undefined}
          label="remaining"
          c={c}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 48, justifyContent: "center" }}>
        {PALETTE.map((color, i) => {
          const day = i + 1;
          const isPast = day < state.currentDay;
          const isCurrent = day === state.currentDay;
          let style: React.CSSProperties = {
            width: 20,
            height: 20,
            borderRadius: 10,
            cursor: "pointer",
            position: "relative",
          };
          if (isPast) style.background = color;
          else if (isCurrent) {
            style.background = color;
            style.boxShadow = `0 0 0 2px ${c.text}`;
          } else {
            style.background = "transparent";
            style.border = `1px solid ${c.text}`;
            style.opacity = 0.3;
          }
          return (
            <div key={day} style={{ position: "relative" }}>
              <div
                style={style}
                onClick={() => setTip((t) => (t === day ? null : day))}
              />
              {tip === day && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: c.text,
                    color: c.bg,
                    padding: "8px 12px",
                    borderRadius: 4,
                    fontSize: 12,
                    width: 220,
                    zIndex: 10,
                    textAlign: "center",
                  }}
                >
                  <strong>Day {day}</strong>
                  <div style={{ marginTop: 4, fontWeight: 400 }}>{BLOCK_QUOTES[(day - 1) % 30]}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginBottom: 48 }}>
        {milestones.map((m) => {
          const reached = state.currentDay >= (m.week - 1) * 7 + 1;
          if (!reached) return null;
          return (
            <div
              key={m.week}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: `1px solid ${c.softBorder}`,
                fontSize: 14,
              }}
            >
              <span>Week {m.week} — {m.label}</span>
              <span style={{ color: c.secondary }}>{m.done}/{m.total} days</span>
            </div>
          );
        })}
      </div>

      <NousButton onClick={send} disabled={sending}>
        {sending ? "Sending..." : `Email my Week ${currentWeek} report`}
      </NousButton>
      {status && <div style={{ textAlign: "center", marginTop: 16, fontSize: 14, color: c.secondary }}>{status}</div>}
    </AppShell>
  );
}

function Stat({ big, fallback, label, c }: { big: string; fallback?: string; label: string; c: ReturnType<typeof colorsForDay> }) {
  return (
    <div style={{ textAlign: "center" }}>
      {fallback ? (
        <div style={{ fontSize: 14, color: c.secondary, minHeight: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {fallback}
        </div>
      ) : (
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 40,
            lineHeight: 1,
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {big}
        </div>
      )}
      <div style={{ fontSize: 13, color: c.secondary, letterSpacing: 1, marginTop: 8 }}>{label}</div>
    </div>
  );
}
