import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useNous } from "@/lib/nous/state";
import { colorsForDay } from "@/lib/nous/palette";
import { AppShell } from "@/components/nous/AppShell";
import { CharacterPlaceholder } from "@/components/nous/CharacterPlaceholder";
import { NousButton } from "@/components/nous/NousButton";
import { BlockScreenModal } from "@/components/nous/BlockScreenModal";
import { DotsLayer } from "@/components/nous/DotsLayer";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { state, incrementDay } = useNous();
  const nav = useNavigate();
  const [activeApp, setActiveApp] = useState<string | null>(null);

  useEffect(() => {
    if (!state.hasOnboarded) nav({ to: "/onboarding" });
  }, [state.hasOnboarded, nav]);

  if (!state.hasOnboarded) return null;

  const c = colorsForDay(state.currentDay);

  return (
    <AppShell>
      {/* dots render behind everything, absolutely positioned */}
      <DotsLayer />

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40 }}>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 2 }}>DAY {state.currentDay}</span>
        {state.streak > 0 && (
          <span style={{ fontSize: 14 }}>{state.streak}-day streak</span>
        )}
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

      <div style={{ marginBottom: 16, opacity: state.hasCheckedInToday ? 0.5 : 1 }}>
        <NousButton onClick={() => nav({ to: "/checkin" })}>
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

      {/* ignored apps row — each tap opens the block screen for that app */}
      {state.ignoredApps.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          {state.ignoredApps.map((app) => (
            <button
              key={app}
              onClick={() => setActiveApp(app)}
              style={{
                background: "transparent",
                border: `1px solid ${c.secondary}`,
                color: c.secondary,
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 13,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                cursor: "pointer",
                letterSpacing: 0.3,
              }}
            >
              {app}
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 32,
          marginTop: state.ignoredApps.length > 0 ? 0 : 32,
          fontSize: 14,
        }}
      >
        <button onClick={() => nav({ to: "/journal" })} style={linkBtn(c.text)}>Journal</button>
        <button onClick={() => nav({ to: "/progress" })} style={linkBtn(c.text)}>Progress</button>
        <button onClick={incrementDay} style={linkBtn(c.text)}>End Day</button>
      </div>

      <BlockScreenModal
        open={activeApp !== null}
        app={activeApp ?? ""}
        onClose={() => setActiveApp(null)}
      />
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
