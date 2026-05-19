import { useNous } from "@/lib/nous/state";
import { BLOCK_QUOTES, colorsForDay, getOutsideInBackground } from "@/lib/nous/palette";

export function BlockScreenModal({
  open,
  app,
  onClose,
}: {
  open: boolean;
  app: string;
  onClose: () => void;
}) {
  const { state, set, recordDotTap } = useNous();
  if (!open) return null;
  const c = colorsForDay(state.currentDay);
  const quote = BLOCK_QUOTES[(state.currentDay - 1) % 30];

  const wait = () => {
    set((s) => ({ blocksWaited: s.blocksWaited + 1 }));
    onClose();
  };

  const openAnyway = () => {
    recordDotTap(app);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: getOutsideInBackground(state.currentDay),
        color: c.text,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 28,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        transition: "background 500ms ease",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 320 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg,#888,#444)",
            filter: "blur(2px) grayscale(1)",
            margin: "0 auto 8px",
          }}
        />
        <div style={{ color: "#666", fontSize: 13, marginBottom: 32 }}>{app}</div>
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 2,
            marginBottom: 32,
          }}
        >
          NOUS
        </div>
        <p style={{ fontSize: 22, lineHeight: "32px", margin: "0 auto 32px", maxWidth: 280 }}>
          {quote}
        </p>
        <div style={{ fontSize: 13, color: c.secondary, marginBottom: 32 }}>
          Day {state.currentDay}
        </div>
        <div style={{ display: "flex", gap: "4%", width: "100%" }}>
          <button
            onClick={wait}
            style={{
              width: "48%",
              height: 52,
              background: "transparent",
              color: c.text,
              border: `1px solid ${c.text}`,
              borderRadius: 4,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 0.5,
              cursor: "pointer",
            }}
          >
            I'll wait
          </button>
          <button
            onClick={openAnyway}
            style={{
              width: "48%",
              height: 52,
              background: "transparent",
              color: c.secondary,
              border: "none",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 0.5,
              cursor: "pointer",
            }}
          >
            Open anyway
          </button>
        </div>
      </div>
    </div>
  );
}
