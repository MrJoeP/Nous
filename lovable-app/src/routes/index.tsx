import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useNous } from "@/lib/nous/state";
import { colorsForDay } from "@/lib/nous/palette";
import { AppShell } from "@/components/nous/AppShell";
import { CharacterPlaceholder } from "@/components/nous/CharacterPlaceholder";
import { NousButton } from "@/components/nous/NousButton";
import { BlockScreenModal } from "@/components/nous/BlockScreenModal";
import { DotsLayer } from "@/components/nous/DotsLayer";
import { Day30Ceremony } from "@/components/nous/Day30Ceremony";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { state, incrementDay, set } = useNous();
  const nav = useNavigate();
  const [activeApp, setActiveApp] = useState<string | null>(null);

  useEffect(() => {
    if (!state.hasOnboarded) nav({ to: "/onboarding" });
  }, [state.hasOnboarded, nav]);

  if (!state.hasOnboarded) return null;

  const showCeremony = state.currentDay === 30 && !state.hasCelebratedDay30;

  const c = colorsForDay(state.currentDay);
  const checkedIn = state.hasCheckedInToday && state.lastCheckInMessage;

  return (
    <AppShell>
      {showCeremony && (
        <Day30Ceremony onDone={() => set({ hasCelebratedDay30: true })} />
      )}
      <DotsLayer />

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40 }}>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 2 }}>DAY {state.currentDay}</span>
        {state.streak > 0 && (
          <span style={{ fontSize: 14, color: c.secondary }}>{state.streak}-day streak</span>
        )}
      </div>

      <div style={{ marginBottom: 32 }}>
        <CharacterPlaceholder />
      </div>

      {checkedIn ? (
        <div style={{ marginBottom: 40 }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 22,
            lineHeight: "34px",
            color: c.text,
            margin: "0 0 24px",
          }}>
            {state.lastCheckInMessage}
          </p>
          <p style={{ fontSize: 13, color: c.secondary, margin: 0, letterSpacing: 0.5 }}>— Thomas</p>
        </div>
      ) : (
        <>
          {state.intention && (
            <p style={{
              textAlign: "center",
              fontSize: 14,
              color: c.secondary,
              margin: "0 0 32px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              Reclaiming: {state.intention}
            </p>
          )}
          <div style={{ marginBottom: 16 }}>
            <NousButton onClick={() => nav({ to: "/checkin" })}>
              Check in with Thomas
            </NousButton>
          </div>
        </>
      )}

      {/* ignored apps — tapping opens the block screen, "Open anyway" leaves a dot */}
      {state.ignoredApps.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 }}>
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

      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 16, fontSize: 14 }}>
        {checkedIn && (
          <button onClick={() => nav({ to: "/checkin" })} style={linkBtn(c.secondary)}>Read again</button>
        )}
        <button onClick={() => nav({ to: "/journal" })} style={linkBtn(c.text)}>Journal</button>
        <button onClick={() => nav({ to: "/progress" })} style={linkBtn(c.text)}>Progress</button>
        <button onClick={incrementDay} style={linkBtn(c.secondary)}>End Day</button>
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
