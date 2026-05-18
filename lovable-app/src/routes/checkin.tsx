import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useNous } from "@/lib/nous/state";
import { colorsForDay } from "@/lib/nous/palette";
import { AppShell } from "@/components/nous/AppShell";
import { askThomas } from "@/lib/nous/claude.functions";
import { NousButton } from "@/components/nous/NousButton";

export const Route = createFileRoute("/checkin")({
  component: CheckinPage,
});

function CheckinPage() {
  const { state, recordCheckIn } = useNous();
  const nav = useNavigate();
  const c = colorsForDay(state.currentDay);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  const run = async () => {
    setLoading(true);
    setErr("");
    setMessage("");
    const start = Date.now();
    try {
      // collect last 3 journal entries (excluding today)
      const recent: { day: number; entry: string }[] = [];
      for (let d = state.currentDay - 1; d >= Math.max(1, state.currentDay - 3); d--) {
        recent.push({ day: d, entry: state.journalEntries[d] || "" });
      }
      const res = await askThomas({
        data: {
          currentDay: state.currentDay,
          streak: state.streak,
          intention: state.intention,
          goals: state.goals,
          severity: state.severity,
          recentJournals: recent,
        },
      });

      const elapsed = Date.now() - start;
      if (elapsed < 800) await new Promise((r) => setTimeout(r, 800 - elapsed));

      if (res.ok) {
        setMessage(res.message);
        recordCheckIn(res.message);
      } else {
        if (res.error === "rate_limited") setErr("Thomas is unavailable right now. Try again later.");
        else if (res.error === "missing_key") setErr("API key not configured.");
        else setErr("Check-in unavailable. Try again.");
      }
    } catch {
      setErr("Check-in unavailable. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell>
      <button
        onClick={() => nav({ to: "/" })}
        style={{ background: "none", border: "none", color: c.secondary, fontSize: 24, cursor: "pointer", padding: 0 }}
      >
        ←
      </button>

      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 40 }}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: c.text,
                margin: "0 auto 12px",
                animation: "nousPulse 2s ease-in-out infinite",
              }}
            />
            <div style={{ color: c.secondary, fontSize: 16 }}>Thomas is thinking...</div>
            <style>{`@keyframes nousPulse { 0%,100% { opacity: 1 } 50% { opacity: 0.2 } }`}</style>
          </div>
        )}

        {!loading && message && (
          <div>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 24,
                lineHeight: "36px",
                color: c.text,
                margin: 0,
              }}
            >
              {message}
            </p>
            {state.currentDay === 30 && state.intention && (
              <p
                style={{
                  fontStyle: "italic",
                  color: c.secondary,
                  fontSize: 16,
                  marginTop: 32,
                }}
              >
                You said: "{state.intention}". Thirty days later, here you are.
              </p>
            )}
          </div>
        )}

        {!loading && err && (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 18, color: c.text, marginBottom: 24 }}>{err}</p>
            {err.startsWith("Check-in") && (
              <NousButton full={false} onClick={run} style={{ padding: "0 32px" }}>Try again</NousButton>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
