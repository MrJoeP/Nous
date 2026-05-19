import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  currentDay: z.number().int().min(1).max(30),
  streak: z.number().int().min(0),
  intention: z.string().max(500),
  goals: z.array(z.string()).max(10),
  severity: z.string().max(50),
});

export const askThomas = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => InputSchema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) return { ok: false as const, error: "missing_key" };

    const dayNote =
      data.currentDay === 1
        ? "\nThis is Day 1: acknowledge the start. Do not reference entries."
        : data.currentDay === 30
          ? "\nThis is Day 30: write a closing message (5 sentences max) referencing their original intention."
          : "";

    const system = `You are Thomas, the Nous coach — a 30-day dopamine reset guide.
The user is on day ${data.currentDay} of their reset. Streak: ${data.streak} days.
Their intention: "${data.intention}"
Their goals: ${data.goals.join(", ")}
Why they're here: "${data.severity}"

${dayNote}

Rules:
- First person, past tense for your actions
- No emoji. No toxic positivity. No filler phrases.
- Short sentences. Universal emotional truth.
- Max 3 sentences (5 on Day 30 only).
- Example: "Day 8. Opened the app. That's the whole job today."`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: data.currentDay === 30 ? 300 : 150,
          system,
          messages: [{ role: "user", content: "Check in with me." }],
        }),
      });
      if (res.status === 429) return { ok: false as const, error: "rate_limited" };
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Claude API error", res.status, text);
        return { ok: false as const, error: "api_error" };
      }
      const json: any = await res.json();
      const message = json?.content?.[0]?.text?.trim() || "Day noted. Nothing more to say.";
      return { ok: true as const, message };
    } catch (e) {
      console.error("Claude fetch failed", e);
      return { ok: false as const, error: "network" };
    }
  });
