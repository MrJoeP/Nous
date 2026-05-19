import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNous } from "@/lib/nous/state";
import { colorsForDay } from "@/lib/nous/palette";
import { AppShell } from "@/components/nous/AppShell";
import { CharacterPlaceholder } from "@/components/nous/CharacterPlaceholder";
import { NousButton } from "@/components/nous/NousButton";
import { BlockScreenModal } from "@/components/nous/BlockScreenModal";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { state } = useNous();
  const nav = useNavigate();
  const [block, setBlock] = useState(false);

  useEffect(() => {
    if (!state.hasOnboarded) nav({ to: "/onboarding" });
  }, [state.hasOnboarded, nav]);

  if (!state.hasOnboarded) return null;

  const c = colorsForDay(state.currentDay);

  return (
    <AppShell>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40 }}>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 2 }}>
          DAY {state.currentDay}
        </span>
        {state.streak > 0 && <span style={{ fontSize: 14 }}>{state.streak}-day streak</span>}
      </div>

      <div style={{ marginBottom: 32 }}>
        <CharacterPlaceholder />
      </div>

      {state.intention && (
        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            color: c.secondary,
            margin: "0 0 32px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          Reclaiming: {state.intention}
        </p>
      )}

      <div style={{ marginBottom: 16 }}>
        <NousButton onClick={() => nav({ to: "/checkin" })} disabled={state.hasCheckedInToday}>
          {state.hasCheckedInToday ? "Revisit today" : "Check in with Thomas"}
        </NousButton>
      </div>

      {state.hasCheckedInToday && state.lastCheckInMessage && (
        <p
          onClick={() => nav({ to: "/checkin" })}
          style={{
            fontSize: 14,
            color: c.secondary,
            cursor: "pointer",
            margin: "0 0 32px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {state.lastCheckInMessage}
        </p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 32,
          marginTop: 32,
          fontSize: 14,
        }}
      >
        <button onClick={() => nav({ to: "/progress" })} style={linkBtn(c.text)}>
          Progress
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <button onClick={() => setBlock(true)} style={{ ...linkBtn(c.secondary), fontSize: 13 }}>
          See your block screen →
        </button>
      </div>

      <BlockScreenModal open={block} onClose={() => setBlock(false)} />
    </AppShell>
  );
}

const linkBtn = (color: string): React.CSSProperties => ({
  background: "none",
  border: "none",
  color,
  cursor: "pointer",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontWeight: 600,
  padding: 0,
});
