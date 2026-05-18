import { type ButtonHTMLAttributes, type CSSProperties } from "react";
import { useNous } from "@/lib/nous/state";
import { colorsForDay } from "@/lib/nous/palette";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  uppercase?: boolean;
  full?: boolean;
  selected?: boolean;
}

export function NousButton({ uppercase, full = true, selected, style, children, disabled, ...rest }: Props) {
  const { state } = useNous();
  const c = colorsForDay(state.currentDay);
  const borderColor = selected ? c.text : c.softBorder;
  const base: CSSProperties = {
    height: 52,
    width: full ? "100%" : "auto",
    background: "transparent",
    color: c.text,
    border: `1px solid ${borderColor}`,
    borderRadius: 4,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: uppercase ? 2 : 0.5,
    textTransform: uppercase ? "uppercase" : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.35 : 1,
    transition: "opacity 150ms ease, border-color 300ms ease",
    padding: "0 16px",
    ...style,
  };
  return (
    <button
      {...rest}
      disabled={disabled}
      style={base}
      onMouseDown={(e) => ((e.currentTarget.style.opacity = "0.7"))}
      onMouseUp={(e) => ((e.currentTarget.style.opacity = disabled ? "0.35" : "1"))}
      onMouseLeave={(e) => ((e.currentTarget.style.opacity = disabled ? "0.35" : "1"))}
    >
      {children}
    </button>
  );
}
