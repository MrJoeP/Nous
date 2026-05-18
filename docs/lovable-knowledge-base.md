# Nous — Lovable Knowledge Base

> Use this document as the single source of truth when building the Nous frontend mockup in Lovable. It covers product vision, brand, all screens, data model, AI behavior, and competitive context.

---

## 1. Product Overview

**Name:** Nous  
**Tagline:** *Reclaim your mind.*  
**Type:** 30-day dopamine reset coach — freemium PWA (Progressive Web App)  
**Target user:** Ambitious 18–35 year-olds who feel addicted to their phones and want to change  
**Domain:** join-nous.com  
**Stack (production):** React PWA · Claude API · Netlify · Stripe

### Core Concept
Nous is a **structured 30-day program** — not an open-ended subscription. Users enter with one intention ("what are you trying to reclaim?") and complete a 30-day arc. The background color of every screen shifts imperceptibly from pure black (Day 1) to warm cream (Day 30), making the transformation visible every single day.

The AI coach is named **Thomas**. He speaks in short, honest sentences. No emoji. No toxic positivity.

---

## 2. Pricing

| Tier | Price | What you get |
|------|-------|-------------|
| Free | €0 | Usage tracker only |
| Coach | €6.99/month or €49.99/year | Full AI coach + journal |
| Early Access | €29 one-time | Everything, forever |

---

## 3. Brand Identity

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Black | `#000000` | Primary — Day 1 background, dark UI |
| Cream | `#EAE0D0` | Secondary — Day 30 background, light UI |
| White | `#FFFFFF` | Text on dark backgrounds (Days 1–13) |
| Secondary text (dark) | `#AAAAAA` | Muted text on dark (Days 1–13) |
| Secondary text (light) | `#555555` | Muted text on light (Days 14+) |

### Typography
| Font | Weight | Usage |
|------|--------|-------|
| Plus Jakarta Sans Bold | 700 | Wordmark "NOUS", large numbers |
| DM Sans SemiBold | 600 | Labels, CTA buttons, day counter |
| DM Sans Regular | 400 | Body text, journal input, coach message |
| Plus Jakarta Sans Regular | 400 | Coach message (check-in screen) |

### Logo
Stylized iris — 16 lines, inward taper, rounded ends. Files: `Assets/Logo/nous-logo-official.svg` / `.png`

### Character (pencil sketch, LOCKED style)
- Style: Pencil sketch, crosshatch shading, rough paper texture
- Proportions: Chibi — large head, compact body
- Eyes: Oversized, dark/empty, faint blue display glow
- Outfit: Black t-shirt, jeans, white Converse
- Light source: Smartphone screen only (no other light)
- Background: Urban night street, skyscrapers

**Three variants by day range:**
| Days | Variant | File | Feel |
|------|---------|------|------|
| 1–10 | `dark` | `character_dark.png` | Consumed, hunched |
| 11–20 | `urban` | `character_urban.png` | Aware, upright |
| 21–30 | `urban2` | `character_urban2.png` | Present, calm |

---

## 4. The 30-Day Color Progression

Every screen background interpolates through this palette. The color is the progress bar.

```
Day 1:  #000000   Day 11: #3C3C3C   Day 21: #C4C4C4
Day 2:  #020202   Day 12: #474747   Day 22: #CBBFA8
Day 3:  #050505   Day 13: #535353   Day 23: #CEBCA2
Day 4:  #090909   Day 14: #606060   Day 24: #D1BA9E
Day 5:  #0E0E0E   Day 15: #6E6E6E   Day 25: #D4B99A
Day 6:  #141414   Day 16: #7D7D7D   Day 26: #D8B997
Day 7:  #1A1A1A   Day 17: #8D8D8D   Day 27: #DCBA94
Day 8:  #212121   Day 18: #9E9E9E   Day 28: #DFBD92
Day 9:  #292929   Day 19: #B0B0B0   Day 29: #E2C09A
Day 10: #323232   Day 20: #BBBBBB   Day 30: #EAE0D0
```

**Text color rule:**
- Days 1–13: text = `#FFFFFF`, secondary = `#AAAAAA`
- Days 14–30: text = `#000000`, secondary = `#555555`

(WCAG AA verified — text flips at Day 14 to maintain contrast.)

---

## 5. App State / Data Model

```typescript
interface NousState {
  currentDay: number          // 1–30
  streak: number              // consecutive daily check-ins
  lastCheckIn: string | null  // ISO timestamp
  hasCheckedInToday: boolean
  lastCheckInMessage: string  // last Thomas message (shown on home)
  intention: string           // user's Day 1 intention e.g. "reading without my phone"
  journalEntries: Record<number, string>  // day → journal text
  hasOnboarded: boolean
  hasReceivedWelcome: boolean
  notificationTime: string    // default "20:00"
}
```

All state persists to `AsyncStorage` (key: `nous_state_v1`).

---

## 6. Screens — Complete Map

### Screen 1: Onboarding (`/onboarding`)
**When shown:** First launch only (`hasOnboarded === false`)

**Layout:**
- Full-screen black `#000000`
- Centered wordmark "NOUS" (Plus Jakarta Sans Bold, 24px, white)
- Question: *"What are you trying to reclaim?"* (DM Sans Regular, 20px)
- Single-line text input (bottom border only, no box)
- Placeholder: `"e.g. reading without my phone"`
- CTA button: "Begin" (outlined, white border, full width, 52px height, 4px border-radius)
  - Disabled at 30% opacity until user types something
  - On submit → saves intention → navigates to `/welcome`
- Error state: "Name what you're chasing." (small, `#AAAAAA`)

---

### Screen 2: Welcome (`/welcome`)
**When shown:** After onboarding completes (`hasOnboarded && !hasReceivedWelcome`)

**Purpose:** Thomas introduces himself, sets expectations for Day 1.

---

### Screen 3: Home (`/` — index)
**The main daily screen. This is where users spend 90% of their time.**

**Layout (top → bottom):**
1. **Top row** — `DAY {n}` (left, DM Sans SemiBold, 14px, 2px letter-spacing) + `{n}-day streak` (right, shown only if streak > 0)
2. **Character** — centered, fills the middle space. Variant switches by day range.
3. **Intention** — *"Reclaiming: {intention}"* (DM Sans Regular, 14px, centered, 2 lines max). Hidden if no intention set.
4. **Primary CTA** — outlined button (52px, 4px radius, full width):
   - Before check-in: **"Check in with Thomas"**
   - After check-in: **"Revisit today"** (50% opacity, still tappable)
5. **Last message** — Thomas's message from today's check-in, shown below CTA as tappable text (2 lines, ellipsis)
6. **Secondary row** — three text links centered: `Journal` · `Progress` · `End Day`

**Background:** animated, interpolates to current day's color.

---

### Screen 4: Check-In (`/checkin`)
**The AI coach interaction. Core value prop.**

**Layout:**
- Back arrow `←` top-left
- Centered content (vertically)
- **Loading state:** pulsing dot + *"Thomas is thinking..."*
- **Message state:** Thomas's message (Plus Jakarta Sans Regular, 24px, line-height 36px)
  - On Day 30 only: adds italic completion note referencing original intention
- **Error states:**
  - Rate limited: *"Thomas is unavailable right now. Try again later."*
  - API key missing: *"API key not configured."*
  - Other: *"Check-in unavailable. Try again."* + "Try again" button

**Thomas's behavior (AI system prompt):**
- Speaks in first person, past tense
- No emoji, no toxic positivity, no filler phrases
- Short sentences. Universal emotional truth.
- Max 3 sentences (5 on Day 30 only)
- References journal entries from previous 2–3 days if available
- Day 30 final message references the user's original intention
- Example output: *"Day 8. Opened the app. That's the whole job today."*

**API call:** `POST https://api.anthropic.com/v1/messages`
- Model: `claude-sonnet-4-20250514`
- Max tokens: 150 (300 on Day 30)
- Timeout: 8 seconds

---

### Screen 5: Journal (`/journal`)
**Daily freeform text entry.**

**Layout:**
- Header row: `←` back · `DAY {n}` (centered) · `Save` (right)
- Full-screen text input below (DM Sans Regular, 18px, line-height 28px)
- Placeholder: *"What happened today?"*
- Auto-focus on open
- Save → persists entry to store → navigates back

---

### Screen 6: Progress (`/progress`)

**Layout:**
- Header: `←` back · `PROGRESS` (centered) · empty right spacer
- **Stats row** (3 columns, centered):
  - `{currentDay}` / "day"
  - `{streak}` / "streak" (or "Start your streak today." if 0)
  - `{30 - currentDay}` / "remaining" (shows `✓` / "Completed." on Day 30)
- **30-dot timeline** (shown only if currentDay > 1):
  - 30 circles in a wrapping grid, 20×20px each, 4px border-radius, 10px gap
  - Filled = past days (uses that day's color from palette)
  - Today = filled with today's color
  - Future = transparent with border, 30% opacity

---

## 7. Navigation / Router Structure

```
/                → Home (requires onboarded)
/onboarding      → Onboarding (first launch)
/welcome         → Welcome (post-onboarding, once)
/checkin         → Check-in with Thomas
/journal         → Daily journal entry
/progress        → 30-day progress view
```

Router: Expo Router (file-based). In Lovable, implement as React Router or Next.js App Router.

---

## 8. UI Design Rules

1. **No decorative borders, cards, or drop shadows** — everything lives directly on the gradient background
2. **Buttons are outlined only** — `borderWidth: 1`, no fill, no background
3. **All interactive text uses `activeOpacity: 0.7`** — subtle press feedback
4. **Letter spacing on labels** — 1–2px on uppercase labels ("DAY 8", "PROGRESS", "NOUS")
5. **No icons except the back arrow `←`** — pure typographic UI
6. **Padding:** 28px horizontal, 60px top, 48px bottom
7. **Border radius:** 4px on buttons — just barely rounded, not pill-shaped
8. **Line heights:** body 28px, coach message 36px, labels tight
9. **All text caps for section labels** — never sentence case for nav/labels

---

## 9. Key UX Flows

### First-Time User
```
App open → /onboarding (black screen, "What are you trying to reclaim?")
  → type intention → "Begin"
  → /welcome (Thomas intro)
  → / (Home, Day 1, dark character)
```

### Daily Flow (returning user)
```
App open → / (Home, current day)
  → "Check in with Thomas" → /checkin → Thomas speaks → back
  → optional: Journal → /journal → write → Save → back
  → optional: Progress → /progress → see dots
  → "End Day" → increments day counter, resets hasCheckedInToday
```

### Day Progression
- `End Day` button on Home calls `incrementDay()`
- Clamps at Day 30 (no Day 31)
- Each new day: background color shifts, character may switch variant
- Text color flips at Day 14

---

## 10. Features to Build in Lovable (Priority Order)

### Phase 1 — Core MVP (mockup)
- [ ] Onboarding screen (intention input)
- [ ] Home screen with day counter, character image, CTA button, secondary nav
- [ ] Check-in screen (loading → message → back)
- [ ] Journal screen (text input + save)
- [ ] Progress screen (stats + 30-dot timeline)
- [ ] 30-day color system (animated background)
- [ ] Text/color flip at Day 14

### Phase 2 — Backend / Real features
- [ ] Claude API integration (Thomas check-in)
- [ ] Persistent state (localStorage or Supabase)
- [ ] User auth (Supabase)
- [ ] Stripe payment (Coach tier €6.99/mo, Early Access €29 one-time)
- [ ] Push notifications / email reminders
- [ ] "End Day" logic with streak tracking

### Phase 3 — Growth
- [ ] Social sharing card (Day X complete)
- [ ] Referral / waitlist
- [ ] Analytics dashboard (admin)

---

## 11. Competitive Positioning (Why Nous Wins)

| Gap in market | Nous answer |
|---|---|
| AI that forgets you by Day 5 | Thomas remembers your journal entries and intention across all 30 days |
| Science is just marketing copy | Dopamine science is embedded in the daily UX, not just the App Store description |
| Open-ended subscriptions with no finish line | A defined 30-day arc — the color progression makes the end visible every day |
| $100/yr "predatory" pricing (Opal) | €29 one-time Early Access, €6.99/mo Coach |
| Dark patterns (countdown timers, fake anchors) | Zero dark patterns — transparent pricing, cancel any time |
| Native app only (no web) | PWA — works on every device, no App Store, no 30% tax |
| Coach OR blocker, never both | (Phase 2) Nous will integrate both |

---

## 12. Thomas — Voice & Tone Reference

Thomas is the AI coach. Examples of his voice:

> *"Day 8. Opened the app. That's the whole job today."*

> *"Three days without journaling. Still here. That counts."*

> *"You said you wanted to reclaim reading. On day 22, you journaled for the first time in a week. Something shifted."*

> *(Day 30)* *"Thirty days ago you said you wanted to reclaim reading without your phone. You're still here. That sentence is different now."*

**Rules:**
- First person, past tense for actions
- No emoji
- No toxic positivity ("You're doing amazing!" — never)
- No filler ("As you continue on your journey…" — never)
- Short sentences. One idea per sentence.
- Max 3 sentences (5 on Day 30)
- Universal emotional truth > cheerleading

---

## 13. Folder Reference (local repo)

```
~/Nous/
├── app/                    ← Expo React Native app (full source)
│   ├── app/                ← Screens (Expo Router)
│   │   ├── index.tsx       ← Home
│   │   ├── checkin.tsx     ← Thomas check-in
│   │   ├── journal.tsx     ← Daily journal
│   │   ├── progress.tsx    ← 30-day progress
│   │   ├── onboarding.tsx  ← First launch
│   │   └── welcome.tsx     ← Post-onboarding welcome
│   ├── src/
│   │   ├── store/useNousStore.ts       ← Full Zustand state
│   │   ├── services/claudeService.ts  ← Claude API call + Thomas prompt
│   │   ├── theme/dayTheme.ts          ← 30-day color palette
│   │   └── context/NousThemeContext.tsx
│   └── assets/
│       ├── character_dark.png
│       ├── character_urban.png
│       └── character_urban2.png
├── Assets/Logo/nous-logo-official.svg
├── docs/
│   ├── competitive-analysis.md
│   └── competitor-breakdown.md
└── README.md
```

---

## 14. What to Give Lovable

When starting a new Lovable project, paste this entire document as the knowledge base prompt. Then give Lovable these instructions:

> Build a React web app (Lovable) that is a pixel-faithful web version of the Nous mobile app. Use the 30-day color system exactly as specified. Use DM Sans and Plus Jakarta Sans from Google Fonts. The character images should be placeholders (gray rectangles) since the actual assets are proprietary PNG files. Build all 6 screens as routes. Use React Router. State lives in localStorage. Start with Day 1, black background, white text. The "End Day" button increments the day and updates the background.
