# Lovable Prompt — Nous Demo Prototype

> Copy everything below this line and paste it as your first message in Lovable.

---

Build a React web app called **Nous** — a 30-day dopamine reset coach. This is a functioning demo prototype for a pitch. Build all screens, all features, and wire everything together with localStorage state. No backend needed except the Claude API for the coach messages and Resend for the analytics email.

---

## DESIGN SYSTEM

**Fonts (Google Fonts):**
- Plus Jakarta Sans Bold — wordmark "NOUS" and large stat numbers
- DM Sans SemiBold — buttons, labels, day counter
- DM Sans Regular — body text, journal input, coach messages

**Colors:**
- No cards. No drop shadows. No decorative borders.
- All backgrounds are the current day's color from the palette below.
- Buttons: 1px outlined border only, no fill, no background color, 4px border-radius, 52px height, full width.
- Interactive elements: opacity 0.7 on hover/press.

**Spacing:**
- Page padding: 28px horizontal, 60px top, 48px bottom.
- Button letter-spacing: 0.5px. Label letter-spacing: 2px (uppercase labels only).

**30-day background color palette:**
```
Day 1:  #000000    Day 11: #3C3C3C    Day 21: #C4C4C4
Day 2:  #020202    Day 12: #474747    Day 22: #CBBFA8
Day 3:  #050505    Day 13: #535353    Day 23: #CEBCA2
Day 4:  #090909    Day 14: #606060    Day 24: #D1BA9E
Day 5:  #0E0E0E    Day 15: #6E6E6E    Day 25: #D4B99A
Day 6:  #141414    Day 16: #7D7D7D    Day 26: #D8B997
Day 7:  #1A1A1A    Day 17: #8D8D8D    Day 27: #DCBA94
Day 8:  #212121    Day 18: #9E9E9E    Day 28: #DFBD92
Day 9:  #292929    Day 19: #B0B0B0    Day 29: #E2C09A
Day 10: #323232    Day 20: #BBBBBB    Day 30: #EAE0D0
```

**Text color rule:**
- Days 1–13: text `#FFFFFF`, secondary text `#AAAAAA`
- Days 14–30: text `#000000`, secondary text `#555555`

**Character image rule (use colored placeholder rectangles):**
- Days 1–10: dark gray rectangle (represents a hunched figure in phone glow)
- Days 11–20: medium gray rectangle
- Days 21–30: light warm rectangle
- Size: 240×320px, centered on screen

---

## STATE (localStorage key: `nous_state_v1`)

```typescript
{
  currentDay: number,           // 1–30, default 1
  streak: number,               // default 0
  lastCheckIn: string | null,   // ISO timestamp
  hasCheckedInToday: boolean,   // resets each new day
  lastCheckInMessage: string,   // Thomas's last message
  intention: string,            // free text from onboarding step 3
  goals: string[],              // selections from onboarding step 1
  severity: string,             // selection from onboarding step 2
  email: string,                // user's email from onboarding
  journalEntries: { [day: number]: string },
  hasOnboarded: boolean,
  blocksWaited: number,         // "I'll wait" count on block screen
  checkInsCompleted: number,
}
```

---

## SCREENS

### 1. ONBOARDING (3 steps, shown only if hasOnboarded === false)

**Background:** `#000000` throughout all 3 steps.
**Top:** Wordmark "NOUS" centered, Plus Jakarta Sans Bold 24px, white, top 15% of screen.
**Progress indicator:** 3 small dots at top, current step filled white, others outlined.

**Step 1 — What do you want to reclaim?**
Subtitle: "Choose what matters most." (DM Sans Regular, 16px, `#AAAAAA`)
2-column grid of 7 tappable goal cards. Each card: outlined border 1px `#444444`, padding 16px, 8px border-radius. Label centered, DM Sans SemiBold 14px. Multi-select (1–3 choices). Selected state: white border + white text.

Goals:
- Focus & deep work
- Sleep quality
- Real relationships
- Reading & learning
- Physical health
- Creativity
- Present with family

CTA: "Next →" — disabled until at least 1 selected.

**Step 2 — How bad is it?**
Subtitle: "Be honest. This is just for you." (`#AAAAAA`)
5 single-select options as full-width outlined buttons stacked vertically, 12px gap. DM Sans Regular 15px. Selected state: white border + white text.

Options (exact text):
- "I check my phone before I'm out of bed"
- "I lose 2–3 hours a day without meaning to"
- "It's affecting real relationships"
- "I've tried to stop before and failed"
- "I just feel numb and want that to stop"

CTA: "Next →" — disabled until one selected.

**Step 3 — Name it.**
Question: "What are you trying to reclaim?" (DM Sans Regular, 20px, white)
Single-line text input — bottom border only (no box), `#444444` border, white text, placeholder: "e.g. reading without my phone" in `#666666`.

Below input: email field — same style, placeholder: "your@email.com", label above: "Where should we send your weekly report?" (`#AAAAAA`, 13px)

CTA: "Begin my 30 days" — disabled until both fields filled. On submit: save all state, set hasOnboarded = true, navigate to Home.

---

### 2. HOME (main daily screen, route: `/`)

**Layout top → bottom:**

1. **Top row:** `DAY {n}` left (DM Sans SemiBold 14px, 2px letter-spacing) + `{n}-day streak` right (DM Sans Regular 14px) — streak hidden if 0.

2. **Character image:** centered placeholder rectangle, variant by day range (see rules above), fills the middle vertical space.

3. **Intention line:** "Reclaiming: {intention}" — DM Sans Regular 14px, centered, `#AAAAAA` / `#555555`, 2 lines max. Hidden if intention is empty.

4. **Primary CTA button:**
   - Not checked in today: "Check in with Thomas" → navigates to `/checkin`
   - Already checked in: "Revisit today" (50% opacity, still tappable) → navigates to `/checkin`

5. **Last Thomas message:** shown below CTA if hasCheckedInToday is true. Tappable, 2 lines, ellipsis. DM Sans Regular 14px.

6. **Secondary row** (3 text links, centered, 32px gap): `Journal` · `Progress` · `End Day`
   - Journal → `/journal`
   - Progress → `/progress`
   - End Day → calls incrementDay() (increments currentDay by 1, resets hasCheckedInToday, clamps at 30)

7. **Block screen trigger:** below secondary row, small text link: "See your block screen →" (`#AAAAAA`, 13px) → opens block screen modal.

8. **Day Simulator (demo tool):** small floating widget bottom-right corner, always visible. Shows "DAY {n}" and +/- buttons to jump to any day 1–30. Alternatively a small slider. This is critical for the demo — lets presenter scrub through the full color+character transformation live.

---

### 3. CHECK-IN (route: `/checkin`)

Back arrow `←` top-left (DM Sans Regular 24px, secondary color).

Centered content (vertically in remaining space):

**Loading state:**
- Pulsing dot (8px circle, current text color, opacity pulses 1→0.2→1, 1s each)
- "Thomas is thinking..." (DM Sans Regular 16px, secondary color) — 12px gap from dot

**Message state:**
- Thomas's message text: Plus Jakarta Sans Regular 24px, current text color, line-height 36px
- If Day 30 and intention set: italic completion line below — "You said: "{intention}". Thirty days later, here you are." (DM Sans Regular 16px, secondary color, margin-top 32px)

**Error states:**
- Rate limited: "Thomas is unavailable right now. Try again later."
- API missing: "API key not configured."
- Other: "Check-in unavailable. Try again." + outlined "Try again" button

**Claude API call:**
```
POST https://api.anthropic.com/v1/messages
Headers: x-api-key, anthropic-version: 2023-06-01
Body:
{
  model: "claude-sonnet-4-6",
  max_tokens: 150 (300 on day 30),
  system: [system prompt below],
  messages: [{ role: "user", content: "Check in with me." }]
}
```

**Thomas system prompt (inject live values):**
```
You are Thomas, the Nous coach — a 30-day dopamine reset guide.

The user is on day {currentDay} of their reset. Streak: {streak} days.
Their intention: "{intention}"
Their goals: {goals joined by ", "}
Why they're here: "{severity}"

Recent journal entries (most recent first):
{last 3 days of journalEntries, format: "- Day N: "entry text""}

If all entries are empty: focus on today without referencing entries.
If Day 1: acknowledge the start. Do not reference entries.
If Day 30: write a closing message (5 sentences max) referencing their original intention.

Rules:
- First person, past tense for your actions
- No emoji. No toxic positivity. No filler phrases.
- Short sentences. Universal emotional truth.
- Max 3 sentences (5 sentences on Day 30 only).
- Example: "Day 8. Opened the app. That's the whole job today."
```

---

### 4. BLOCK SCREEN (full-screen modal, triggered from Home)

Full-screen overlay on top of current page. Background = current day's color.

**Layout (centered):**

1. Blurred/greyscale app icon placeholder (64×64px, 16px border-radius) — represents Instagram or TikTok. Label below it in `#666666`: "Instagram" (or rotate between a few app names).

2. Wordmark "NOUS" (Plus Jakarta Sans Bold, 18px, current text color)

3. Quote — DM Sans Regular 22px, line-height 32px, text-align center, max-width 280px. Select quote based on currentDay (one per day, see list below).

4. `Day {n}` — DM Sans Regular 13px, secondary color, 32px above buttons.

5. Two buttons side by side:
   - "I'll wait" (primary outlined button, 48% width) → closes modal, increments blocksWaited by 1
   - "Open anyway" (ghost — no border, just text, 48% width, secondary color) → closes modal

**30 quotes (one per day, assign sequentially):**
```
Day 1:  "You're here. That already took something."
Day 2:  "The phone is still there. So are you."
Day 3:  "The urge passes in 90 seconds. You know this."
Day 4:  "You opened this without thinking. Now you're thinking."
Day 5:  "This is day five. The reflex is older than you know."
Day 6:  "You're not bored. You're avoiding something."
Day 7:  "Notice what you were feeling before you reached for it."
Day 8:  "The app didn't call you. You called it."
Day 9:  "What would you do with this minute instead?"
Day 10: "Ten days ago you said you wanted something different."
Day 11: "You've made it past the first week. The pull is still real."
Day 12: "This is the part where most people give up. You're still here."
Day 13: "The gap between urge and action is growing. That's the work."
Day 14: "You don't need to be perfect. You need to be present."
Day 15: "Halfway. The person on Day 1 didn't think you'd make it."
Day 16: "Something's different now. You can feel it."
Day 17: "You waited yesterday. You can wait today."
Day 18: "The notification isn't urgent. It never was."
Day 19: "You're building something that didn't exist 19 days ago."
Day 20: "Three weeks in. The reflex has lost some of its grip."
Day 21: "You're not someone who mindlessly scrolls. Not anymore."
Day 22: "This is who you are now: someone who pauses."
Day 23: "The phone is a tool. You're the one holding it."
Day 24: "Your attention is the most valuable thing you own."
Day 25: "25 days. You've earned the right to trust yourself."
Day 26: "Almost there. Don't stop being honest with yourself."
Day 27: "You wanted to reclaim something. Look at what you've built."
Day 28: "The urge is still here. So is your choice."
Day 29: "Day 29. Tomorrow you finish what you started."
Day 30: "You came here to reclaim something. You did."
```

---

### 5. JOURNAL (route: `/journal`)

Header row: `←` back · `DAY {n}` centered (DM Sans SemiBold 14px, 2px letter-spacing, secondary color) · `Save` right (DM Sans SemiBold 16px, primary text color).

Full-screen text input below header. DM Sans Regular 18px, line-height 28px. Placeholder: "What happened today?" Auto-focus on open. Pre-fills with existing entry for currentDay if one exists.

Save → persists journalEntries[currentDay] → navigates back.

---

### 6. PROGRESS (route: `/progress`)

Header: `←` back · `PROGRESS` centered (DM Sans SemiBold 14px, 2px letter-spacing) · empty spacer right.

**Stats row** (3 columns, equal width, centered):
- `{currentDay}` / "day" — shows ✓ on Day 30
- `{streak}` / "streak" — shows "Start your streak today." if 0
- `{30 - currentDay}` / "remaining" — shows "Completed." on Day 30
Numbers: Plus Jakarta Sans Bold 40px. Labels: DM Sans Regular 13px, 1px letter-spacing.

**30-dot content map** (shown always):
- 30 circles, 20×20px, 10px border-radius, 10px gap, flex-wrap
- Past days (day < currentDay): filled with that day's color from palette, full opacity
- Current day: filled with today's color, 2px ring/outline in primary text color
- Future days: transparent fill, 1px border in primary text color, 30% opacity
- Tapping a day dot shows a small tooltip: "Day {n}" + the quote for that day

**Weekly milestones** (4 rows below the dots):
Show completion status for each week:
- Week 1 (Days 1–7): "Foundation" · {n}/7 days
- Week 2 (Days 8–14): "Pattern" · {n}/7 days  
- Week 3 (Days 15–21): "Friction" · {n}/7 days
- Week 4 (Days 22–30): "Identity" · {n}/9 days

**"Send progress report" button** (outlined, full width, 52px, bottom of screen):
- Label: "Email my Week {currentWeek} report"
- Triggers analytics email via Resend (see below)
- After send: button changes to "Report sent ✓" for 3 seconds

---

### 7. ANALYTICS EMAIL

**Trigger:** "Send progress report" button on Progress screen (also auto-triggers at end of Days 7, 14, 21, 30).

**Resend API call:**
```
POST https://api.resend.com/emails
Authorization: Bearer {RESEND_API_KEY}
Body:
{
  from: "Thomas from Nous <thomas@join-nous.com>",
  to: [user.email],
  subject: "{subject line}",
  html: "{email HTML}"
}
```

**Subject lines:**
- After Day 7: "Nous — Your first 7 days."
- After Day 14: "Nous — You're halfway."
- After Day 21: "Nous — Final stretch."
- After Day 30: "Nous — You made it."

**Email HTML layout** (inline styles, clean, brand colors):

Background: `#EAE0D0` (cream). Max-width 560px, centered.

```
[Header: black bar, "NOUS" in cream, Plus Jakarta Sans Bold]

[Body: cream background, 40px padding]

Week {n} Report
{subject line without "Nous —"}

---

YOUR STATS
Days completed: {currentDay}/30
Current streak: {streak} days
Journal entries: {count of journalEntries with content}
Check-ins completed: {checkInsCompleted}
Times you waited: {blocksWaited}

---

YOUR JOURNEY
[30 small colored squares in a row, 14×14px each, matching the day palette.
 Filled = completed, gray = not yet.]

---

FROM THOMAS
{1–3 sentence note generated by Claude, referencing:
 - their goals, severity, intention
 - their actual stats (streak, journal count, blocks waited)
 - honest, short, no filler}

---

You started this to reclaim: "{intention}"
Goals: {goals joined by " · "}

[Footer: "Nous · join-nous.com" in small gray text]
[Unsubscribe link]
```

**Thomas's email note — Claude API call at send time:**
```
System: You are Thomas from Nous. Write a 2-3 sentence personal note 
for the user's week {n} progress email. 
Day: {currentDay}/30. Streak: {streak}. Journal entries: {count}. 
Times they waited on the block screen: {blocksWaited}.
Intention: "{intention}". Goals: {goals}. 
Why they're here: "{severity}".
Be honest, short, no filler, no emoji. Reference one specific stat.
```

---

## ENV VARIABLES NEEDED

```
VITE_CLAUDE_API_KEY=sk-ant-...
VITE_RESEND_API_KEY=re_...
```

---

## DEMO TOOL (CRITICAL)

Add a persistent floating button bottom-right: "⚙ Demo" that opens a small panel:
- Day slider: 1–30 (instantly updates currentDay and all UI)
- "Reset to Day 1" button
- "Jump to Day 15" button  
- "Jump to Day 30" button
- "Trigger Week 1 Email" button

This lets the presenter control the demo live without touching the actual app flow.

---

## ROUTING

```
/            → Home (redirect to /onboarding if !hasOnboarded)
/onboarding  → 3-step onboarding
/checkin     → Thomas check-in
/journal     → Daily journal
/progress    → Progress + content map
```

Use React Router. Wrap the whole app in a state provider that reads/writes localStorage on every state change.
