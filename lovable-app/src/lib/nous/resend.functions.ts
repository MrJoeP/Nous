import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1).max(200),
  html: z.string().min(1).max(200_000),
});

export const sendResendEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => InputSchema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return { ok: false as const, error: "missing_key" };

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Thomas from Nous <thomas@join-nous.com>",
          to: [data.to],
          subject: data.subject,
          html: data.html,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Resend error", res.status, text);
        return { ok: false as const, error: `api_${res.status}` };
      }
      return { ok: true as const };
    } catch (e) {
      console.error("Resend fetch failed", e);
      return { ok: false as const, error: "network" };
    }
  });
