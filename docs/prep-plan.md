# Nous — Pre-Build Preparation Plan

> This document defines what needs to be true BEFORE writing backend or frontend code.
> Based on competitive analysis in `docs/competitive-analysis.md`.

---

## Phase 0 — Preparation (current phase)

Everything in this phase is research, decisions, and design. No code yet.

### 0.1 Core Product Decisions (resolve before writing a line of code)

| Decision | Options | Recommendation |
|---|---|---|
| **Auth method** | Email/password · Magic link · Google OAuth | Magic link + Google OAuth (reduces friction) |
| **30-day structure** | Linear (day 1→30) · Flexible (user-paced) | Linear — the progression IS the product |
| **AI memory model** | Per-session only · Full history · Summarized history | Summarized history (Claude context window efficient) |
| **Freemium gate** | Days 1–7 free · Feature-limited free · Content-limited | Days 1–7 free, then paywall for days 8–30 |
| **Onboarding depth** | Minimal (get to app fast) · Deep intake (personalize AI) | 5-question intake — needed for AI to know user |
| **Notification strategy** | Push (PWA) · Email · Both | Email first (PWA push permission = high friction) |
| **Data storage** | Supabase · Firebase · PlanetScale | Supabase (Postgres + auth + storage in one) |
| **Deployment** | Netlify · Vercel · Fly.io | Netlify (already in stack per .env) |

---

### 0.2 User Research — Define the Exact User

Before designing anything, answer these questions (can be done via 5–10 user interviews or surveys):

1. **Who is the primary user?** Age, platform, how they found out about screen addiction
2. **What has failed them before?** Which competitor did they try and why did they quit?
3. **What does "reset" mean to them?** Is it 1 hour less per day? No phone before 9am? Off social entirely?
4. **What's their biggest fear about doing this?** FOMO? Boredom? Social isolation?
5. **What would make them trust a new app?** Transparency? Science? Community? Free to start?

**Deliverable:** 1-page user persona (add to `docs/user-persona.md`)

---

### 0.3 Content Architecture — Map the 30 Days

The 30-day journey needs to be planned before the AI can coach through it. Each day needs:

- **Theme** (e.g., Day 1: "The Fog", Day 7: "The Clarity Window", Day 15: "The Halfway Test")
- **Science insight** (1 dopamine concept explained in 2 sentences)
- **Daily challenge** (1 concrete action, 5–30 min)
- **AI coach prompt** (what the coach asks the user today)
- **Color** (incremental shift from #000000 to #EAE0D0)

**Deliverable:** `docs/30-day-map.md` — 30 rows defining the arc

---

### 0.4 Technical Architecture Decisions

Resolve these before writing code — changing them mid-build is expensive.

#### Database Schema (core tables)
```
users           id, email, created_at, stripe_customer_id
sessions        id, user_id, day_number, started_at, completed_at
check_ins       id, user_id, day, mood (1-5), reflection_text, created_at
ai_messages     id, user_id, role (user/assistant), content, day, created_at
ai_summaries    id, user_id, summary_text, generated_at  ← rolling context window
progress        id, user_id, current_day, streak, last_active
subscriptions   id, user_id, stripe_subscription_id, status, plan
```

#### API Routes (minimal viable set)
```
POST /api/auth/magic-link         Send magic link email
GET  /api/auth/verify             Verify magic link token
GET  /api/user/progress           Get current day, streak, color
POST /api/checkin                 Submit daily check-in
GET  /api/day/:n                  Get content for day N
POST /api/chat                    Send message to AI coach
GET  /api/chat/history            Get today's conversation
POST /api/stripe/checkout         Create Stripe checkout session
POST /api/stripe/webhook          Handle Stripe events
```

#### Tech Stack (confirmed from .env / CLAUDE.md context)
- **Frontend:** React PWA (Vite)
- **Backend:** Node.js / Express or Next.js API routes
- **Database:** Supabase (Postgres)
- **AI:** Claude API (claude-sonnet-4-6)
- **Payments:** Stripe
- **Deployment:** Netlify
- **Email:** (decide: Resend vs Postmark vs SendGrid)

---

### 0.5 Design System — Before Touching Code

Define these before building UI components:

- [ ] Color tokens: `--color-black: #000000`, `--color-cream: #EAE0D0`, day-specific progress color
- [ ] Typography: Choose 2 fonts (heading + body). System fonts vs. custom.
- [ ] Component inventory: List every UI component needed (button, input, chat bubble, day card, progress bar, check-in form, paywall modal)
- [ ] Mobile-first breakpoints: PWA = phone first, always
- [ ] Dark/Light: Start dark (brand is black), offer light (cream) as "unlocked" state at day 30

**Deliverable:** Figma or `docs/design-system.md` with tokens and component list

---

### 0.6 Legal & Compliance Checklist

- [ ] Privacy Policy (required for Stripe, Claude API, and user data storage)
- [ ] Terms of Service
- [ ] Cookie policy (if using analytics)
- [ ] GDPR compliance for EU users (Dario is Austrian — EU applies from day 1)
- [ ] Mental health disclaimer (app is not therapy — required if any mental health language is used)
- [ ] Stripe tax configuration (VAT for EU)

---

## Phase 1 — MVP Build (after prep is complete)

### What MVP Must Include (based on competitive gaps)

| Feature | Reason |
|---|---|
| Magic link auth + onboarding intake | Low friction start, AI personalization from day 1 |
| 30-day linear content delivery | Core product — the structured arc competitors don't have |
| AI coach chat (Claude) with rolling context summary | The longitudinal memory no competitor has |
| Daily check-in (mood + reflection) | Data for AI + user self-awareness |
| Progress visualization (color + day counter + streak) | Visible transformation — our visual identity |
| Days 1–7 free, paywall at day 8 | Freemium model — enough to hook, paywall at meaningful moment |
| Stripe checkout (one-time or monthly) | Revenue from day 1 |
| Email notifications (daily reminder) | Higher deliverability than PWA push |
| PWA manifest + offline support | Cross-platform, no app store |

### What MVP Explicitly Does NOT Include

| Cut feature | Reason |
|---|---|
| Social / community features | Too complex for MVP, validate solo product first |
| App blocking / screen time controls | Out of scope for PWA (OS-level, not web-accessible) |
| Video content | Phase 2 (after agent pipeline is ready) |
| Native apps (iOS/Android) | PWA covers this — build native only if PWA feels limited |
| Leaderboards / gamification | Validate core retention first |
| Admin dashboard | Use Supabase dashboard for now |

---

## Phase 2 — Growth Layer (after first 100 paying users)

| Feature | Rationale |
|---|---|
| Daily AI-generated social media posts (agent pipeline) | Automated organic growth via Instagram/TikTok |
| Push notifications (PWA) | Re-engagement after email proves out |
| Referral system | "Share your Day 15 progress" — viral loop |
| Community / forum (Discord or in-app) | Social accountability gap no competitor fills well |
| Progress sharing cards | Visual social proof (Day 30 cream card) |
| Analytics dashboard (user-facing) | Show users their own dopamine patterns |
| Re-reset option (30 more days) | Retention beyond the initial program |

---

## Phase 3 — Scale (after product-market fit confirmed)

| Feature | Rationale |
|---|---|
| Native iOS app | If PWA retention lags, App Store discoverability matters |
| Corporate wellness offering | B2B sales, higher ACV, bulk licensing |
| Coach certification / human escalation | Premium tier above AI coaching |
| API for therapists/practitioners | White-label potential |
| Multi-language (German first, given Austrian founder) | EU expansion |

---

## Preparation Checklist — What Must Be Done Before First Commit

- [ ] **0.1** Resolve 8 core product decisions (table in section 0.1)
- [ ] **0.2** Complete 5–10 user research conversations → `docs/user-persona.md`
- [ ] **0.3** Map all 30 days (theme, science, challenge, AI prompt, color) → `docs/30-day-map.md`
- [ ] **0.4** Finalize DB schema and API route list (review table above)
- [ ] **0.5** Create design system token list and component inventory → `docs/design-system.md`
- [ ] **0.6** Draft Privacy Policy, Terms of Service, mental health disclaimer
- [ ] **Setup** Supabase project + schema created
- [ ] **Setup** Stripe account + products configured (freemium → paid upgrade)
- [ ] **Setup** Claude API key with usage limits set
- [ ] **Setup** Email provider selected and domain verified (join-nous.com)
- [ ] **Setup** Netlify project linked to GitHub repo

---

## Next Immediate Actions (this week)

1. **Make the 8 product decisions** in section 0.1 — 30-minute decision session
2. **Start the 30-day content map** — this is the highest-leverage prep work
3. **Set up Supabase project** — free tier, create the schema tables
4. **Set up Stripe** — create products for freemium upgrade
5. **Write Privacy Policy** — can use a generator, but must be customized for EU/GDPR

Once all 5 are done: first backend commit.
