# Video Script Agent

**Status:** Phase 2  
**Priority:** High once first posts are running  
**Tool:** Claude API (Sonnet) + ElevenLabs TTS + FFmpeg  
**Effort:** ~2 hours setup  

---

## Core Principles — Nous Video Style

This is NOT motivational content.

| Forbidden | Allowed |
|-----------|---------|
| "You can do it!" | "I messed up. Then kept going." |
| Background music with energy | Silence. Or a single tone. |
| Cuts on the beat | Cuts against expectation rhythm |
| Perfect talking head | Raw, real look or character animation |
| Hashtag explosion | 1-3 relevant tags, no spam |
| "Follow for more" | No CTA unless needed |

### Three Impact Levels
1. **Scroll-Stopper (0-1 sec):** Hook must land before the first cut
2. **Tension Build (1-8 sec):** Build tension without resolving it
3. **Resolution or Cliffhanger (8-15 sec):** Honest resolution OR deliberately open-ended

---

## Script Format (exact)

```
[HOOK – 1 sentence, max 7 words, under 1 second]
[PAUSE – 0.5-1 sec silence or freeze frame]
[BODY – 2-3 short sentences, max 8 words each]
[PAUSE – optional, 0.5 sec]
[OUTRO – 1 sentence or none]

TONE: [Neutral / Quiet / Raw / Direct]
PACE: [Slow / Medium / Fast]
CUT POINTS: [After sentence 1 / After pause / etc.]
VISUAL: [Character variant: CROWD / SOLO / DARK]
DAY COLOR: [Hex from 30-day progression]
```

---

## Hook Library (Nous Style)

**Type 1: Contrast Statement**
- Day 8. Messed everything up. Here anyway.
- Week 1: invincible. Week 2: can't sit down.
- Day 8. Headache. Still here.

**Type 2: Direct Question (never rhetorical)**
- When do you stop numbing yourself?
- What do you do when motivation is gone?
- You know the feeling when nothing works?

**Type 3: Unfinished Sentence**
- The moment you realize...
- I stopped counting because...
- Day 9 and I...

**Type 4: Number Hook**
- 9 days. One insight.
- 4 things. Everything else is noise.
- 72 out of 100 HP. Enough.

---

## Full Script Examples

**Script A – Day 9 (Relapse Day)**
```
[HOOK] Day 8. I lay there all day.
[PAUSE] 0.8 sec freeze. Character SOLO, looking down.
[BODY] Headache. No training. Just iPad.
       Then Monday.
       Got up.
[PAUSE] 0.5 sec.
[OUTRO] No restart. Just forward.

TONE: Neutral, calm | PACE: Slow
VISUAL: SOLO → cut to DARK after pause | COLOR: #272727
```

**Script B – High Day**
```
[HOOK] Today I can think clearly.
[PAUSE] 0.5 sec. Slow camera movement.
[BODY] Not because of willpower.
       Because of 6 days of silence.
       That's all.
[OUTRO] Nous. Reclaim your mind.

TONE: Direct, calm, quiet energy | PACE: Medium
VISUAL: CROWD → character looks away from phone | COLOR: #191919
```

**Script C – Cliffhanger (no outro)**
```
[HOOK] I put my phone down.
[PAUSE] 1 sec. Freeze. Black background.
[BODY] And then something happened.
       I still don't know how to describe it.
[NO OUTRO]

TONE: Mysterious, raw | PACE: Very slow
VISUAL: DARK | COLOR: #0A0A0A
```

---

## ElevenLabs TTS Config

```
Voice: Custom clone or existing voice
Style: Calm, male, mid-age, slightly rough
Pace: 0.85x (slower than default)
Stability: 0.75
Similarity Boost: 0.80
Style Exaggeration: 0.15 (minimal)
```

Pause markers: `[pause]` = 0.5 sec, `[long_pause]` = 1 sec

---

## FFmpeg – Merge Audio + Visual

```bash
# Layer audio onto video
ffmpeg -i visual.mp4 -i audio.mp3 \
  -c:v copy -c:a aac -shortest \
  output.mp4

# Scale for TikTok/Reels
ffmpeg -i output.mp4 -vf \
  "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:-1:-1:color=black" \
  output_final.mp4
```

---

## Subtitle Style

- Font: Helvetica Neue or Inter
- Color: #EAE0D0 (cream on dark)
- Size: 28-32px
- Position: Lower third
- Animation: Word-by-word highlight
- Background: No box — text with subtle shadow only

---

## .env Variables

```
ELEVENLABS_API_KEY=your_key
ELEVENLABS_VOICE_ID=your_voice_id
VIDEO_OUTPUT_DIR=~/Nous/Videos/
```

**Estimated effort:** ~2 hours setup | **Cost:** ~€5-22/month ElevenLabs
