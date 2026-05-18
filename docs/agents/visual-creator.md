# Visual Creator Agent

**Status:** Pending Setup
**Priority:** Medium
**Tool:** nano-banana-pro (Gemini) + Runway/Kling for video
**Effort:** ~1 hour setup

---

## Output Formats

| Format | Resolution | Platform |
|--------|-----------|----------|
| Feed Post | 1080x1350 px | Instagram |
| Story / TikTok | 1080x1920 px | IG Story, TikTok |
| Thumbnail | 1280x720 px | YouTube, TikTok Cover |
| Clip | 1080x1920 px, 3-6 sec | Reels, TikTok |

---

## Setup

Get Gemini API Key at console.cloud.google.com, then:
openclaw config set gemini.apiKey "YOUR_KEY"

## Master Image Prompt (LOCKED)

Pencil sketch illustration, crosshatch shading, rough paper texture.
Chibi proportions. Character: black hair, empty eyes with blue glow,
black t-shirt, jeans, Converse. Smartphone as ONLY light source.
Variants: CROWD / SOLO / DARK. Color: [DAY HEX]. Format: [FORMAT]

## Video Templates (Runway Gen-3)

Template A – Scroll Stopper (3 sec): Phone flickers off, character looks up.
Template B – Transformation (6 sec): Character straightens, background brightens.
Template C – Loop (4 sec): Seamless walk cycle, city lights flickering.

## .env Variables

GEMINI_API_KEY=your_gemini_key
RUNWAY_API_KEY=your_runway_key
ASSET_OUTPUT_DIR=~/Nous/Assets/
