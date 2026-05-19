interface Props {
  size: number;
  color?: string;
}

export function NousIris({ size, color = "#EAE0D0" }: Props) {
  const cx = size / 2;
  const cy = size / 2;

  // Exact geometry from nous-logo-official.svg (viewBox 500x500, center 250,250)
  // Inner: y=160 → 90px from center, half-width 1.5px  → scaled by size/500
  // Outer: y=30  → 220px from center, half-width 5px   → scaled by size/500
  const scale = size / 500;
  const innerR  = 90  * scale;
  const outerR  = 220 * scale;
  const innerHW = 1.5 * scale;
  const outerHW = 5   * scale;

  const blades = Array.from({ length: 16 }, (_, i) => {
    const angleDeg = i * 22.5;
    const transform = `rotate(${angleDeg} ${cx} ${cy})`;
    const points = [
      `${cx - outerHW},${cy - outerR}`,
      `${cx + outerHW},${cy - outerR}`,
      `${cx + innerHW},${cy - innerR}`,
      `${cx - innerHW},${cy - innerR}`,
    ].join(" ");

    // outer rounded cap circle
    const capR = outerHW * 1.1;

    return { transform, points, capCx: cx, capCy: cy - outerR, capR };
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block" }}
    >
      <g fill={color} stroke={color} strokeWidth={0.5}>
        {blades.map((b, i) => (
          <g key={i} transform={b.transform}>
            <polygon points={b.points} />
            <circle cx={b.capCx} cy={b.capCy} r={b.capR} />
          </g>
        ))}
      </g>
    </svg>
  );
}
