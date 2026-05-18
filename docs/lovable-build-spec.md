# Nous — Demo Prototype Build Spec (Lovable)

> This is the actionable build spec for the Lovable demo prototype.
> Platform: React web app (PWA) built in Lovable.
> Goal: Functioning demo for a pitch — show all 4 core features end to end.

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Lovable (React + Tailwind) |
| State | localStorage (no auth needed for demo) |
| AI coach | Claude API (claude-sonnet-4-6) |
| Email analytics | Resend (free tier, 100 emails/day) |
| Fonts | Google Fonts — DM Sans + Plus Jakarta Sans |
| Deployment | Lovable built-in deploy (or Netlify) |

---

## Feature 1 — 30-Day Evolution

### What it does
The entire interface shifts from pure black (Day 1) to warm cream (Day 30) as the user progresses. The character image, text color, and interface color all update each day. A content map shows the full arc.

### Screens to build

**Content Map / Journey View**
- A scrollable 30-day timeline
- Each day shown as a circle with its corresponding color from the palette
- Completed days = filled with day color
- Current day = filled + ring/glow highlight
- Future days = hollow/faint
- Tapping a day shows what content/milestone is unlocked that day

**Day-by-day color system (exact values):**
```
Day 1:  #000000  |  Day 11: #3C3C3C  |  Day 21: #C4C4C4
Day 2:  #020202  |  Day 12: #474747  |  Day 22: #CBBFA8
Day 3:  #050505  |  Day 13: #535353  |  Day 23: #CEBCA2
Day 4:  #090909  |  Day 14: #606060  |  Day 24: #D1BA9E
Day 5:  #0E0E0E  |  Day 15: #6E6E6E  |  Day 25: #D4B99A
Day 6:  #141414  |  Day 16: #7D7D7D  |  Day 26: #D8B997
Day 7:  #1A1A1A  |  Day 17: #8D8D8D  |  Day 27: #DCBA94
Day 8:  #212121  |  Day 18: #9E9E9E  |  Day 28: #DFBD92
Day 9:  #292929  |  Day 19: #B0B0B0  |  Day 29: #E2C09A
Day 10: #323232  |  Day 20: #BBBBBB  |  Day 30: #EAE0D0
```

**Text flip rule:** Days 1–13 → white text (`#FFFFFF`). Days 14–30 → black text (`#000000`).

**Character variant rule:**
- Days 1–10: dark variant (consumed, hunched in phone glow)
- Days 11–20: urban variant (upright, aware)
- Days 21–30: urban2 variant (calm, present)

**For demo:** Include a visible **day scrubber / "Skip to Day X"** control so the presenter can jump to any day mid-demo and show the full transformation instantly.

### Content milestones per day range
| Days | Theme | Unlock |
|------|-------|--------|
| 1–3 | Awareness | Daily check-in unlocked |
| 4–7 | Pattern recognition | Journal unlocked |
| 8–14 | The friction | Block screen quote unlocked |
| 15–22 | Rebuilding | Progress map expands |
| 23–29 | Ownership | Week recap email |
| 30 | Completion | Final message from Thomas |

---

## Feature 2 — Reflecting Goals (Onboarding)

### What it does
A 3-step onboarding that captures what the user wants to reclaim. Used by Thomas throughout the 30 days. Replaces the single text input with a richer goal-capture flow.

### Flow

**Step 1 — Select your main area (multi-select, pick 1–3)**
Display as large tappable cards (icon + label), dark background:

| Option | Icon |
|--------|------|
| Focus & deep work | ○ |
| Sleep quality | ○ |
| Real relationships | ○ |
| Reading & learning | ○ |
| Physical health | ○ |
| Creativity | ○ |
| Present with family | ○ |

UI: 2-column grid of pill/card buttons. Selected = white fill, unselected = outlined. Minimum 1 selection to proceed.

**Step 2 — How bad is it? (single select)**
Five options, honest language:
- "I check my phone before I'm out of bed"
- "I lose 2–3 hours a day without meaning to"
- "It's affecting real relationships"
- "I've tried to stop before and failed"
- "I just feel numb and want that to stop"

**Step 3 — In your own words**
Single question: *"What are you trying to reclaim?"*
Free text input, placeholder: `"e.g. reading without my phone"`

Then: "Begin my 30 days" button → saves all 3 inputs → goes to Home (Day 1).

### What gets stored
```javascript
{
  goals: ['focus', 'sleep'],           // Step 1 selections
  severity: "I lose 2-3 hours...",     // Step 2 selection
  intention: "reading without my phone" // Step 3 free text
}
```

Thomas receives all three in his system prompt context.

---

## Feature 3 — Block Screen Quotes

### What it does
When a user would normally open a distracting app, Nous shows a full-screen "interception" overlay with a quote from Thomas. The tone of the quote evolves across the 30 days: early = grounding and honest, middle = acknowledging the pull, late = affirming the identity change.

### Demo implementation
Since this is a PWA (can't intercept real app opens), implement as:
- A **"Block Screen Preview"** button on the Home screen ("See your block screen")
- Tapping it opens a full-screen modal that simulates what the user would see when opening Instagram/TikTok

### Block screen design
```
[Full screen, current day's background color]

[App icon placeholder — blurred/greyed Instagram/TikTok icon]

NOUS

"{Quote from Thomas}"

[small] Day {n}

[Button] "I'll wait"        [Ghost button] "Open anyway"
```

"I'll wait" → dismisses modal, logs a successful block  
"Open anyway" → also dismisses (for demo purposes — in production this increments a "slips" counter)

### Quote set (30 quotes, one per day range)

**Days 1–5 (honest, grounding):**
- "You're here. That already took something."
- "The phone is still there. So are you."
- "The urge passes in 90 seconds. You know this."
- "You opened this without thinking. Now you're thinking."
- "This is day five. The reflex is older than you know."

**Days 6–10 (naming the pattern):**
- "You're not bored. You're avoiding something."
- "Notice what you were feeling before you reached for it."
- "The app didn't call you. You called it."
- "What would you do with this minute instead?"
- "Ten days ago you said you wanted something different."

**Days 11–15 (the friction window):**
- "You've made it past the first week. The pull is still real."
- "This is the part where most people give up. You're still here."
- "The gap between urge and action is growing. That's the work."
- "You don't need to be perfect. You need to be present."
- "Halfway. The person on Day 1 didn't think you'd make it."

**Days 16–20 (noticing change):**
- "Something's different now. You can feel it."
- "You waited yesterday. You can wait today."
- "The notification isn't urgent. It never was."
- "You're building something that didn't exist 20 days ago."
- "Three weeks in. The reflex has lost some of its grip."

**Days 21–25 (identity shift):**
- "You're not someone who mindlessly scrolls. Not anymore."
- "This is who you are now: someone who pauses."
- "The phone is a tool. You're the one holding it."
- "Your attention is the most valuable thing you own."
- "25 days. You've earned the right to trust yourself."

**Days 26–30 (affirming, earned):**
- "Almost there. Don't stop being honest with yourself."
- "You wanted to reclaim something. Look at what you've built."
- "The urge is still here. So is your choice."
- "Day 29. Tomorrow you finish what you started."
- "You came here to reclaim something. You did."

---

## Feature 4 — Analytics Email

### What it does
At the end of each week (and on Day 30), Nous sends the user an email with a visual progress report — their stats, streak, journal activity, and a personal note from Thomas based on their data.

### Trigger points
- End of Week 1 (after Day 7)
- End of Week 2 (after Day 14)
- End of Week 3 (after Day 21)
- End of Week 4 / Completion (after Day 30)

### Email content structure

**Subject lines:**
- Week 1: `Nous — Your first 7 days.`
- Week 2: `Nous — Halfway through.`
- Week 3: `Nous — You're in the final stretch.`
- Day 30: `Nous — You made it.`

**Email body layout (plain HTML, brand colors):**
```
[NOUS wordmark — black on cream background]

Week {n} Report
---

YOUR STATS
• Days completed: {n}/30
• Current streak: {n} days
• Journal entries written: {n}
• Check-ins completed: {n}
• Times you waited: {n}  ← block screen "I'll wait" count

YOUR PROGRESS
[Simple visual: 30 circles, filled = done, color matches palette]

FROM THOMAS
"{1–3 sentence personal note from Thomas, generated by Claude
  referencing their goals, severity, intention, and week's data}"

---
[Goals you set on Day 1]
{goals list}
"{intention}"

[Footer] Nous · join-nous.com · Unsubscribe
```

### Backend requirement
- User enters email on onboarding (add as Step 0 or at end of onboarding)
- Data stored in localStorage (for demo: manually trigger email via a "Send Week Report" button)
- Email sent via **Resend API** (`POST https://api.resend.com/emails`)
- Thomas's note generated by Claude API at send time

### Demo trigger
For the pitch demo, add a visible **"Send Week 1 Report"** button on the Progress screen so you can trigger the email live during the demo.

---

## Demo Script (for pitch)

**Setup before demo:** Be on Day 8, streak 5, have 3 journal entries, intention = "reading without my phone", goals = Focus + Sleep.

1. **Open the app** → Home screen, Day 8, dark interface. Explain the color progression.
2. **Show the content map** → scroll through all 30 days, scrub to Day 30 to show cream background + calm character. Scrub back to Day 8.
3. **Tap "Check in with Thomas"** → wait for real Claude API response (or use cached for demo). Read it aloud. Point out: "He knows I've been journaling, he knows my intention."
4. **Show onboarding** (via "Restart demo" button) → walk through 3-step goal selection.
5. **Tap "See your block screen"** → full-screen block overlay. Read the Day 8 quote. Tap "I'll wait". "This is what they see instead of Instagram."
6. **Go to Progress** → show dots, stats, tap "Send Week 1 Report". Check email live.
7. **Scrub to Day 30** → cream background, calm character, final message from Thomas. "This is the payoff."

---

## Lovable Starter Prompt

Paste this to start the Lovable project:

```
Build a React web app called Nous — a 30-day dopamine reset coach.

BRAND:
- Fonts: DM Sans (body) and Plus Jakarta Sans (headings/numbers) from Google Fonts
- Day 1 background: #000000, Day 30: #EAE0D0
- Full 30-day color palette and text flip rule in the attached knowledge base

SCREENS TO BUILD:
1. Onboarding — 3 steps: (a) multi-select goals grid, (b) severity single-select, (c) free text intention + email input
2. Home — day counter, character image placeholder, "Check in with Thomas" CTA, "See block screen" button, Journal / Progress / End Day links
3. Check-in — loading state with pulsing dot, then Thomas's message (fetched from Claude API)
4. Block screen — full-screen modal overlay, blurred app icon, quote for current day, "I'll wait" / "Open anyway" buttons
5. Journal — full-screen text input for today's entry
6. Progress / Content Map — stats row (day / streak / remaining) + 30-dot timeline + "Send Week Report" button
7. Day simulator — visible slider/scrubber (dev tool) to jump to any day and preview the full color+character transformation

STATE (localStorage):
currentDay (1-30), streak, intention, goals[], severity, email, journalEntries{}, hasCheckedInToday, blocksWaited, checkInsCompleted

Use the exact 30-day hex palette for background color. Text is white (#FFFFFF) on days 1-13 and black (#000000) on days 14-30. Character images are gray placeholder rectangles that swap variant at days 11 and 21.

No cards, no shadows, no decorative borders. Buttons are 1px outlined only, 4px border-radius, 52px height. Padding: 28px horizontal, 60px top.
```
