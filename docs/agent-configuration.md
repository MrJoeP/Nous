# 🤖 Agent Configuration

**7 specialized agents + 1 orchestrator = 8 total**

---

## Status Overview

| # | Agent | Status | Priority |
|---|-------|--------|----------|
| 0 | Orchestrator | ⏳ Pending | High |
| 1 | Strategy Agent | ⏳ Pending | Medium |
| 2 | Copywriter Agent | ✅ Active | — |
| 3 | Visual Creator Agent | ⏳ Pending | Medium |
| 4 | Video Script Agent | ⏳ Pending | Phase 2 |
| 5 | QA / Review Gate | ⏳ Pending | High |
| 6 | Scheduler & Publisher Agent | ⏳ Pending | High |
| 7 | Analytics Agent | ⏳ Pending | Low |

---

## Agent 0: Orchestrator (TODO – Core)

**Task:** Controls all other agents. Triggers the pipeline, passes outputs forward.  
**Tool:** n8n (Self-Hosted) or OpenClaw Workflows  
**Trigger:** Daily 20:00 cron job  

**Flow:**
```
Cron 20:00 → Strategy Agent → Copywriter Agent → Visual Agent
           → Video Agent → QA Gate → Scheduler → Publisher
```

**Status:** Not yet built. Needs n8n setup or OpenClaw Cron.

---

## Agent 1: Strategy Agent (TODO)

**Task:** Create weekly plan, identify trends, assign content types  
**Input:** Previous posts, analytics data, current trends  
**Output:** Weekly plan with topics, platform assignment, content type  
**Tool:** Claude API (Sonnet) + web scraping for trends  

---

## Agent 2: Copywriter Agent ✅ ACTIVE

**Tool:** OpenClaw on MacBook  
**Channel:** WhatsApp  
**System Prompt:** `~/.openclaw/workspace/SOUL.md`  
**Trigger:** `tagesreport` → 15 assets  
**Approval:** `approve [number]` or `approve all`  

---

## Agent 3: Visual Creator Agent (TODO)

**Task:** Generate images, carousel slides, thumbnails from templates  
**Input:** Image prompts from Copywriter (Asset 10 + 11)  
**Output:** Finished images in 1080×1350 (IG) and 1080×1920 (Stories)  
**Tool:** nano-banana-pro (Gemini) — already installed. Needs Gemini API Key.  

**Setup:**
1. Get Gemini API Key: console.cloud.google.com
2. `openclaw config set gemini.apiKey "KEY"`
3. After `approve 10` → auto-generate image

---

## Agent 4: Video Script Agent (Phase 2)

**Task:** TikTok/Reels scripts with scene instructions, TTS generation  
**Input:** Video prompts from Copywriter (Asset 8 + 9)  
**Output:** Finished video script + optional TTS audio (.mp3)  
**Tool:** Claude API + ElevenLabs TTS API + FFmpeg  
**Cost:** ElevenLabs ~€5–22/month  

---

## Agent 5: QA / Review Gate (TODO – next priority)

**Task:** Check content before it goes live. Daily checkpoint.  

| Option | Method | Status |
|--------|--------|--------|
| **(A) Manual** | Preview on WhatsApp, `approve` | ✅ Already works |
| **(B) Semi-Auto** | Auto-approve text posts, manual for videos | ⏳ |
| **(C) Full-Auto** | Everything goes out directly | ❌ Not recommended |

---

## Agent 6: Scheduler & Publisher Agent (TODO – high priority)

**Task:** Optimal posting times, manage queue, post to multiple platforms  

| Platform | Tool | Status |
|----------|------|--------|
| X/Twitter | xurl skill | Needs API key |
| Instagram | Meta Graph API | Needs Meta Business Account + Token |
| TikTok | TikTok Content API | Most complex, comes last |

**Setup order:** X → Instagram → TikTok

---

## Agent 7: Analytics Agent (TODO – later)

**Task:** Track performance, generate reports, feedback to Strategy Agent  
**Metrics:** Reach, engagement rate, follower growth, CTR, saves, shares  
**Output:** Weekly performance report, top/flop analysis  
**When:** Only useful once posts are running. Min. 2 weeks of content needed.

---

## Realistic Build Order

| Step | Agent | What's Missing |
|------|-------|----------------|
| ✅ Done | Copywriter | Running on WhatsApp |
| 1. Next | QA Gate | Already runs manually – Optional: Auto-Approve |
| 2. | Scheduler (Cron) | Set up `openclaw cron` |
| 3. | Publisher X | X API Key + xurl |
| 4. | Visual Creator | Gemini API Key |
| 5. | Publisher Instagram | Meta Business API |
| 6. | Orchestrator | n8n Setup |
| 7. | Strategy Agent | After first month |
| 8. | Video Agent | Phase 2, ElevenLabs |
| 9. | Analytics | After 2+ weeks of content |
| 10. | Publisher TikTok | Last step |

---

## What Cowork CANNOT do (always manual)

- Get API keys: developer.twitter.com, console.cloud.google.com, elevenlabs.io
- OAuth / Login flows: xurl auth, Meta Business Login
- Enter passwords
