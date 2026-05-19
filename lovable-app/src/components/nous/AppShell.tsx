import { type ReactNode } from "react";
import { useNous } from "@/lib/nous/state";
import { colorsForDay, getOutsideInBackground } from "@/lib/nous/palette";
import { DemoTool } from "./DemoTool";

interface Props {
  children: ReactNode;
  forceBlack?: boolean;
  showDemo?: boolean;
}

export function AppShell({ children, forceBlack = false, showDemo = true }: Props) {
  const { state } = useNous();
  const c = colorsForDay(state.currentDay);
  const background = forceBlack ? "#000000" : getOutsideInBackground(state.currentDay);
  const text = forceBlack ? "#FFFFFF" : c.text;

  return (
    <div
      style={{
        minHeight: "100vh",
        background,
        color: text,
        transition: "background 500ms ease, color 500ms ease",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "60px 28px 48px",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {children}
      </div>
      {showDemo && <DemoTool />}
    </div>
  );
}
