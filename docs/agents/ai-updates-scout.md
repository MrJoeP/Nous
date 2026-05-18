# AI Updates Scout Agent

**Status:** Pending Setup  
**Priority:** Medium – once publishing is running  
**Tool:** OpenClaw + Web Search + Claude API  
**Effort:** ~1 hour setup  

---

## What This Agent Does

Scans all relevant sources daily for AI news automatically.  
Delivers a short, curated briefing report — so you always know what's happening without searching yourself.

---

## Sources Scanned

**Social Media**
- X/Twitter: @sama, @AnthropicAI, @OpenAI, @GoogleDeepMind, @karpathy
- LinkedIn: Anthropic, OpenAI, Google DeepMind, Meta AI
- Reddit: r/MachineLearning, r/artificial, r/ChatGPT

**Press Releases & Blogs**
- anthropic.com/news
- openai.com/blog
- deepmind.google/discover/blog
- ai.meta.com/blog
- mistral.ai/news

**Newsletters & Aggregators**
- The Batch (deeplearning.ai)
- Import AI (Jack Clark)
- AI Breakfast
- Hugging Face Blog

**Research**
- arxiv.org (cs.AI, cs.LG)
- Papers With Code

---

## Output Format (daily, 08:00)

```
AI BRIEFING – [DATE]

TOP NEWS (1-3 items)
→ [Headline] | [Source] | [1 sentence summary]

MODEL UPDATES
→ New releases, benchmarks, capability leaps

TOOLS & APPS
→ New AI tools potentially relevant to Nous

RELEVANT FOR NOUS
→ What does this mean for the app strategy?

---
Sources: [Links]
```

---

## Cron Setup

```bash
openclaw cron add \
  --name "ai-briefing" \
  --cron "0 8 * * *" \
  --message "ai briefing" \
  --tz "Europe/Amsterdam"
```

**Add to SOUL.md:**
```
When you receive 'ai briefing':
- Search for the latest AI news from the last 24 hours
- Focus: new models, new features, new tools
- Filter what is relevant for a Dopamine Reset app
- Output: compact briefing, max 300 words
- No hype, only substance
- Format: TOP NEWS → MODEL UPDATES → TOOLS → RELEVANT FOR NOUS
```

---

## Filter Criteria

| Relevant | Irrelevant |
|----------|-----------|
| New model releases | Political AI debates |
| New API features (Anthropic, OpenAI) | Hype articles without substance |
| Tools that improve Nous workflow | Investment news |
| Competitors in wellness/coach space | Academic papers without impact |
| New social media AI features | Celebrity AI collaborations |

---

## Optional Extension: Generate Content Ideas from News

After the briefing:
```
Generate 2 content ideas based on today's AI news
that thematically fit Nous — without directly citing the news.
```

---

## Setup Checklist

1. ⏳ Extend SOUL.md with 'ai briefing' trigger
2. ⏳ Cron job: `openclaw cron add --name ai-briefing --cron "0 8 * * *"`
3. ⏳ First manual test: `openclaw cron run ai-briefing`
4. ⏳ Review output and adjust filter criteria

**Estimated effort:** ~30 minutes — mainly extending SOUL.md and testing.
