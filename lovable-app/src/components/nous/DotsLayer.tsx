import { useEffect, useRef, useState } from "react";
import { useNous } from "@/lib/nous/state";

const PULSE_KEYFRAMES = `
@keyframes dotPulse {
  0%   { transform: translate(-50%,-50%) scale(0.2); opacity: 0; }
  60%  { transform: translate(-50%,-50%) scale(1.15); opacity: 1; }
  100% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
}
`;

export function DotsLayer() {
  const { state } = useNous();
  const todayDots = state.dotTaps.filter((d) => d.day === state.currentDay);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const prevCountRef = useRef(todayDots.length);

  // detect newly arrived dots and mark them for animation
  useEffect(() => {
    if (todayDots.length > prevCountRef.current) {
      const latest = todayDots[todayDots.length - 1];
      setNewIds((s) => new Set([...s, latest.id]));
      const t = setTimeout(() => {
        setNewIds((s) => {
          const next = new Set(s);
          next.delete(latest.id);
          return next;
        });
      }, 1400);
      prevCountRef.current = todayDots.length;
      return () => clearTimeout(t);
    }
    prevCountRef.current = todayDots.length;
  }, [todayDots.length]);

  if (todayDots.length === 0) return null;

  return (
    <>
      <style>{PULSE_KEYFRAMES}</style>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {todayDots.map((dot) => {
          const isNew = newIds.has(dot.id);
          return (
            <div
              key={dot.id}
              style={{
                position: "absolute",
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: dot.size,
                height: dot.size,
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(234,224,208,0.55) 0%, rgba(234,224,208,0.18) 45%, transparent 72%)`,
                transform: "translate(-50%, -50%)",
                animation: isNew ? "dotPulse 1.2s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
                filter: "blur(0.5px)",
              }}
            />
          );
        })}
      </div>
    </>
  );
}
