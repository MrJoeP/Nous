import { type ReactNode } from "react";
import { useNous } from "@/lib/nous/state";
import { colorsForDay } from "@/lib/nous/palette";
import { DemoTool } from "./DemoTool";

interface Props {
  children: ReactNode;
  forceBlack?: boolean;
  showDemo?: boolean;
}

export function AppShell({ children, forceBlack = false, showDemo = true }: Props) {
  const { state } = useNous();
  const c = colorsForDay(state.currentDay);
  const bg = forceBlack ? "#000000" : c.bg;
  const text = forceBlack ? "#FFFFFF" : c.text;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: bg,
        color: text,
        transition: "background-color 500ms ease, color 500ms ease",
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
