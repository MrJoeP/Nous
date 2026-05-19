import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useNous } from "@/lib/nous/state";
import { GOALS, SEVERITIES } from "@/lib/nous/palette";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

const BG = "#000000";
const TEXT = "#FFFFFF";
const SECONDARY = "#AAAAAA";
const BORDER = "#444444";

function OnboardingPage() {
  const { set } = useNous();
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState<string[]>([]);
  const [severity, setSeverity] = useState("");
  const [intention, setIntention] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const toggleGoal = (v: string) => {
    setGoals((g) => {
      if (g.includes(v)) return g.filter((x) => x !== v);
      if (g.length >= 3) return g;
      return [...g, v];
    });
  };

  const submit = () => {
    if (!intention.trim() || !email.trim()) {
      setErr("Name what you're chasing.");
      return;
    }
    set({
      goals,
      severity,
      intention: intention.trim(),
      email: email.trim(),
      startedAt: new Date().toISOString(),
      demoDayOverride: null,
      hasOnboarded: true,
    });
    nav({ to: "/" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        color: TEXT,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <div
        style={{ maxWidth: 480, margin: "0 auto", padding: "60px 28px 48px", minHeight: "100vh" }}
      >
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 24,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          NOUS
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 24,
            marginBottom: 48,
          }}
        >
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: n === step ? TEXT : "transparent",
                border: `1px solid ${TEXT}`,
              }}
            />
          ))}
        </div>

        {step > 1 && (
          <button onClick={() => setStep((s) => Math.max(1, s - 1))} style={backBtn}>
            ← Back
          </button>
        )}

        {step === 1 && (
          <>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                margin: "0 0 12px",
              }}
            >
              What do you want to reclaim?
            </h1>
            <p style={{ color: SECONDARY, fontSize: 16, margin: "0 0 32px" }}>
              Choose what matters most.
            </p>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}
            >
              {GOALS.map((g) => {
                const sel = goals.includes(g.value);
                return (
                  <button
                    key={g.value}
                    onClick={() => toggleGoal(g.value)}
                    style={{
                      background: "transparent",
                      color: sel ? TEXT : SECONDARY,
                      border: `1px solid ${sel ? TEXT : BORDER}`,
                      borderRadius: 8,
                      padding: 16,
                      fontFamily: "inherit",
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                      minHeight: 70,
                    }}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={goals.length === 0}
              style={cta(goals.length === 0)}
            >
              Next →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                margin: "0 0 12px",
              }}
            >
              How bad is it?
            </h1>
            <p style={{ color: SECONDARY, fontSize: 16, margin: "0 0 32px" }}>
              Be honest. This is just for you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {SEVERITIES.map((s) => {
                const sel = severity === s.value;
                return (
                  <button
                    key={s.value}
                    onClick={() => setSeverity(s.value)}
                    style={{
                      background: "transparent",
                      color: sel ? TEXT : SECONDARY,
                      border: `1px solid ${sel ? TEXT : BORDER}`,
                      borderRadius: 4,
                      padding: "16px 20px",
                      textAlign: "left",
                      fontFamily: "inherit",
                      fontSize: 15,
                      cursor: "pointer",
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
            <button onClick={() => setStep(3)} disabled={!severity} style={cta(!severity)}>
              Next →
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                margin: "0 0 12px",
              }}
            >
              Name it.
            </h1>
            <p style={{ fontSize: 20, margin: "0 0 32px" }}>What are you trying to reclaim?</p>
            <input
              value={intention}
              onChange={(e) => {
                setIntention(e.target.value);
                setErr("");
              }}
              placeholder="e.g. reading without my phone"
              style={input()}
            />
            <label
              style={{
                display: "block",
                color: SECONDARY,
                fontSize: 13,
                marginTop: 32,
                marginBottom: 8,
              }}
            >
              Where should we send your weekly report?
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr("");
              }}
              placeholder="your@email.com"
              style={input()}
            />
            {err && <div style={{ color: SECONDARY, marginTop: 12, fontSize: 14 }}>{err}</div>}
            <div style={{ marginTop: 40 }}>
              <button
                onClick={submit}
                disabled={!intention.trim() || !email.trim()}
                style={cta(!intention.trim() || !email.trim())}
              >
                Begin my 30 days
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const cta = (disabled: boolean): React.CSSProperties => ({
  width: "100%",
  height: 52,
  background: "transparent",
  color: TEXT,
  border: `1px solid ${TEXT}`,
  borderRadius: 4,
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontWeight: 600,
  fontSize: 15,
  letterSpacing: 0.5,
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.35 : 1,
});

const backBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: SECONDARY,
  cursor: "pointer",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 24,
  padding: 0,
};

const input = (): React.CSSProperties => ({
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: `1px solid ${BORDER}`,
  color: TEXT,
  fontSize: 18,
  padding: "12px 0",
  outline: "none",
  fontFamily: "inherit",
});
