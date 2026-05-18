# Nous – *Reclaim your mind.*

> Freemium Dopamin-Reset Coach App for ambitious 18–35 year-olds.

**Stack:** React PWA · Claude API · Netlify · Stripe  
**Domain:** [join-nous.com](https://join-nous.com)  
**Social:** @join.nous  
**Email:** hello@join-nous.com  

---

## Pricing
| Tier | Price |
|------|-------|
| Free | Tracker only |
| Coach | €6.99/month or €49.99/year |
| Early Access | €29 one-time |

---

## Repository Structure

```
Nous/
├── Agents/               ← System prompts for all 8 OpenClaw agents
├── Assets/
│   ├── Logo/             ← Official logos (SVG + PNG)
│   ├── Character/        ← Character reference images (pencil sketch style)
│   └── References/       ← Style reference images
├── Scripts/
│   ├── agents/           ← Full OpenClaw workspaces per agent (8 agents)
│   │   ├── 00_orchestrator/
│   │   ├── 01_strategy/
│   │   ├── 02_copywriter/
│   │   ├── 03_visual/
│   │   ├── 04_video/
│   │   ├── 05_qa/
│   │   ├── 06_scheduler/
│   │   └── 07_analytics/
│   ├── publishers/       ← Platform publisher scripts
│   │   ├── instagram_post.sh
│   │   ├── tiktok_post.sh
│   │   ├── tts_generate.sh
│   │   └── merge_video.sh
│   └── queue.json        ← Content queue
├── Videos/               ← Reference videos (not tracked in git – too large)
├── Logs/                 ← Gateway + agent logs (not tracked in git)
├── Published/            ← Published posts (JSON)
└── Previous/             ← Archive / old files
```

---

## Agents (OpenClaw)

| # | Agent | Cron | Description |
|---|-------|------|-------------|
| 00 | Orchestrator | manual | Coordinates all agents |
| 01 | Strategy | Sun 09:00 | Weekly content strategy |
| 02 | Copywriter | daily 20:00 | Generates daily content |
| 03 | Visual | manual / after QA | Generates images via Gemini |
| 04 | Video | manual / Phase 2 | Video script + production |
| 05 | QA | daily 21:30 | Quality check before publishing |
| 06 | Scheduler | daily 22:00 | Schedules + triggers publishing |
| 07 | Analytics | Mon 08:00 | Weekly performance analysis |

---

## Publisher Scripts

All scripts live in `Scripts/publishers/`. They read API keys from `~/Nous/.env`.

```bash
# Instagram post
./Scripts/publishers/instagram_post.sh "IMAGE_URL" "Caption text"

# TikTok video upload
./Scripts/publishers/tiktok_post.sh "video.mp4" "Caption text"

# Generate TTS audio (ElevenLabs)
./Scripts/publishers/tts_generate.sh "Your script text" "output.mp3"

# Merge video + audio
./Scripts/publishers/merge_video.sh visual.mp4 audio.mp3 final.mp4
```

---

## Brand Identity

**Colors:**
- Black `#000000` — primary
- Cream `#EAE0D0` — secondary

**Logo:** Stylized iris, 16 lines, inward taper, rounded ends

**Character (LOCKED – Pencil Sketch Style):**
- Style: Pencil sketch, crosshatch shading, rough paper
- Proportions: Chibi — large head, compact body
- Eyes: Oversized, dark/empty, faint blue display glow
- Outfit: Black t-shirt, jeans, white Converse
- Light source: Smartphone only
- Background: Urban night street, skyscrapers
- Variants: `CROWD` · `SOLO` · `DARK`

**30-Day Color Progression:** Starts at `#000000` (day 1) → ends at `#EAE0D0` (day 30)

---

## Setup

1. Clone repo: `git clone https://github.com/MrJoeP/Nous.git`
2. Copy `.env.example` to `.env` and fill in your API keys
3. Make scripts executable: `chmod +x Scripts/publishers/*.sh`
4. Set up OpenClaw crons (see Playbook in Notion)

### Required API Keys
| Key | Where to get |
|-----|-------------|
| `X_API_KEY` / `X_API_SECRET` / `X_ACCESS_TOKEN` / `X_ACCESS_TOKEN_SECRET` | [developer.twitter.com](https://developer.twitter.com) |
| `GEMINI_API_KEY` | [console.cloud.google.com](https://console.cloud.google.com) |
| `META_ACCESS_TOKEN` / `META_IG_USER_ID` | [developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer) |
| `TIKTOK_CLIENT_KEY` / `TIKTOK_CLIENT_SECRET` / `TIKTOK_ACCESS_TOKEN` | [developers.tiktok.com](https://developers.tiktok.com) *(1–2 weeks approval)* |
| `ELEVENLABS_API_KEY` / `ELEVENLABS_VOICE_ID` | [elevenlabs.io](https://elevenlabs.io) |

---

## Monthly Costs (estimate)

| Service | Min | Max |
|---------|-----|-----|
| Claude API (Sonnet) | €20 | €40 |
| Gemini / Image Gen | €10 | €20 |
| ElevenLabs TTS | €0 | €22 |
| Hosting / Power | €5 | €12 |
| Domain + Mail | €2 | €2 |
| **Total** | **~€37** | **~€96** |

Social APIs (Meta, TikTok, X) are free.

---

*Nous – Reclaim your mind. · [join-nous.com](https://join-nous.com) · @join.nous*
