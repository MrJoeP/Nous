import type { NousState } from "./state";
import { GOAL_LABELS, PALETTE, WEEK_SUBJECTS } from "./palette";
import { sendResendEmail } from "./resend.functions";

function buildHTML(s: NousState) {
  const currentWeek = Math.min(4, Math.ceil(s.currentDay / 7));
  const journalCount = Object.values(s.journalEntries).filter((v) => v && v.trim()).length;
  const squares = PALETTE.map((c, i) => {
    const day = i + 1;
    const fill = day <= s.currentDay ? c : "#CCCCCC";
    return `<span style="display:inline-block;width:14px;height:14px;background:${fill};margin:2px;border-radius:2px;"></span>`;
  }).join("");

  const goals = s.goals.map((g) => GOAL_LABELS[g] || g).join(" · ");
  const safeMessage = (s.lastCheckInMessage || "Day noted.").replace(/</g, "&lt;");
  const safeIntention = (s.intention || "").replace(/</g, "&lt;");

  return `<!doctype html><html><body style="margin:0;padding:0;background:#EAE0D0;font-family:'DM Sans',Arial,sans-serif;color:#000;">
<div style="max-width:560px;margin:0 auto;background:#EAE0D0;">
  <div style="background:#000;padding:24px;text-align:center;">
    <div style="color:#EAE0D0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-weight:700;font-size:22px;letter-spacing:2px;">NOUS</div>
  </div>
  <div style="padding:40px;">
    <h1 style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:28px;margin:0 0 32px;">Week ${currentWeek} Report</h1>

    <h3 style="font-size:13px;letter-spacing:2px;margin:0 0 12px;color:#555;">YOUR STATS</h3>
    <p style="margin:4px 0;">Days completed: <strong>${s.currentDay}/30</strong></p>
    <p style="margin:4px 0;">Current streak: <strong>${s.streak} days</strong></p>
    <p style="margin:4px 0;">Journal entries: <strong>${journalCount}</strong></p>
    <p style="margin:4px 0;">Check-ins completed: <strong>${s.checkInsCompleted}</strong></p>
    <p style="margin:4px 0;">Times you waited: <strong>${s.blocksWaited}</strong></p>

    <h3 style="font-size:13px;letter-spacing:2px;margin:32px 0 12px;color:#555;">YOUR JOURNEY</h3>
    <div style="line-height:0;">${squares}</div>

    <h3 style="font-size:13px;letter-spacing:2px;margin:32px 0 12px;color:#555;">FROM THOMAS</h3>
    <p style="font-size:18px;line-height:28px;margin:0;">${safeMessage}</p>

    <hr style="border:none;border-top:1px solid #000;margin:40px 0;" />
    <p style="font-size:14px;color:#555;margin:4px 0;">You started this to reclaim: "${safeIntention}"</p>
    <p style="font-size:14px;color:#555;margin:4px 0;">Goals: ${goals}</p>
  </div>
  <div style="padding:24px 40px;text-align:center;color:#777;font-size:12px;">
    Nous · join-nous.com<br/>To stop receiving these: reply with "unsubscribe"
  </div>
</div>
</body></html>`;
}

export async function sendProgressReport(state: NousState) {
  if (!state.email) return { ok: false as const, error: "no_email" };
  const currentWeek = Math.min(4, Math.ceil(state.currentDay / 7));
  const subject = WEEK_SUBJECTS[currentWeek] || "Nous — Progress report";
  const html = buildHTML(state);
  return sendResendEmail({ data: { to: state.email, subject, html } });
}
