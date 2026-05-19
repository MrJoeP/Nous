import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" fill="#000000"/>
  <g fill="#EAE0D0" stroke="#EAE0D0" stroke-width="1">
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(0 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(22.5 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(45 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(67.5 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(90 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(112.5 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(135 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(157.5 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(180 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(202.5 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(225 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(247.5 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(270 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(292.5 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(315 250 250)"/>
    <polygon points="248.5,160 251.5,160 255,30 245,30" transform="rotate(337.5 250 250)"/>
  </g>
  <g fill="#EAE0D0">
    <circle cx="250" cy="30" r="5" transform="rotate(0 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(22.5 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(45 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(67.5 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(90 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(112.5 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(135 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(157.5 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(180 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(202.5 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(225 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(247.5 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(270 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(292.5 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(315 250 250)"/>
    <circle cx="250" cy="30" r="5" transform="rotate(337.5 250 250)"/>
  </g>
  <g fill="#EAE0D0">
    <circle cx="250" cy="160" r="1.5" transform="rotate(0 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(22.5 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(45 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(67.5 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(90 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(112.5 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(135 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(157.5 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(180 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(202.5 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(225 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(247.5 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(270 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(292.5 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(315 250 250)"/>
    <circle cx="250" cy="160" r="1.5" transform="rotate(337.5 250 250)"/>
  </g>
  <circle cx="250" cy="250" r="90" fill="#000000"/>
</svg>`;

for (const size of [192, 512]) {
  const resvg = new Resvg(SVG, { fitTo: { mode: "width", value: size } });
  const png = resvg.render().asPng();
  const out = join(__dir, `../public/icon-${size}.png`);
  writeFileSync(out, png);
  console.log(`✓ icon-${size}.png (${png.byteLength} bytes)`);
}
