import { useEffect, useState } from "react";
import { NousIris } from "./NousIris";
import { useNous } from "@/lib/nous/state";

const KEYFRAMES = `
@keyframes irisGrow {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 1; }
  70%  { transform: translate(-50%, -50%) scale(8);   opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(22);  opacity: 0; }
}
@keyframes quoteFade {
  0%   { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes wordmarkFade {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}
`;

type Phase = "growing" | "empty" | "quote";

interface Props {
  onDone: () => void;
}

export function Day30Ceremony({ onDone }: Props) {
  const { state } = useNous();
  const [phase, setPhase] = useState<Phase>("growing");

  const intention = state.intention;
  const quote = intention
    ? `You said you wanted to reclaim ${intention}. Thirty days later, here you are.`
    : "Thirty days. You came here to change something. You did.";

  useEffect(() => {
    // iris grows for 2.8s, then screen goes empty
    const t1 = setTimeout(() => setPhase("empty"), 2800);
    // quote fades in 400ms after empty
    const t2 = setTimeout(() => setPhase("quote"), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#EAE0D0",
          zIndex: 2000,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={phase === "quote" ? onDone : undefined}
      >
        {/* Growing iris */}
        {phase === "growing" && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              animation: "irisGrow 2.8s cubic-bezier(0.4, 0, 0.6, 1) forwards",
              transformOrigin: "center",
            }}
          >
            <NousIris size={160} color="#000000" />
          </div>
        )}

        {/* Empty screen — brief breath before quote */}
        {phase === "empty" && null}

        {/* Quote */}
        {phase === "quote" && (
          <div
            style={{
              maxWidth: 320,
              padding: "0 40px",
              textAlign: "center",
              animation: "quoteFade 1.2s ease forwards",
            }}
          >
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 22,
                lineHeight: "34px",
                color: "#000000",
                margin: "0 0 48px",
                fontWeight: 400,
              }}
            >
              {quote}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13,
                color: "#555555",
                letterSpacing: 1,
                margin: 0,
              }}
            >
              tap to continue
            </p>
          </div>
        )}
      </div>
    </>
  );
}
