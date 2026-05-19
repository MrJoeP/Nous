export const PALETTE: string[] = [
  "#000000","#020202","#050505","#090909","#0E0E0E","#141414","#1A1A1A","#212121","#292929","#323232",
  "#3C3C3C","#474747","#535353","#606060","#6E6E6E","#7D7D7D","#8D8D8D","#9E9E9E","#B0B0B0","#BBBBBB",
  "#C4C4C4","#CBBFA8","#CEBCA2","#D1BA9E","#D4B99A","#D8B997","#DCBA94","#DFBD92","#E2C09A","#EAE0D0",
];

export function colorsForDay(day: number) {
  const idx = Math.max(1, Math.min(30, day)) - 1;
  const bg = PALETTE[idx];
  const lightText = idx <= 12; // days 1-13
  return {
    bg,
    text: lightText ? "#FFFFFF" : "#000000",
    secondary: lightText ? "#AAAAAA" : "#555555",
    border: lightText ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
    softBorder: lightText ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)",
  };
}

export function characterBg(day: number) {
  if (day <= 10) return "rgba(255,255,255,0.10)";
  if (day <= 20) return "rgba(255,255,255,0.20)";
  return "rgba(0,0,0,0.10)";
}

export const BLOCK_QUOTES = [
  "You're here. That already took something.",
  "The phone is still there. So are you.",
  "The urge passes in 90 seconds. You know this.",
  "You opened this without thinking. Now you're thinking.",
  "This is day five. The reflex is older than you know.",
  "You're not bored. You're avoiding something.",
  "Notice what you were feeling before you reached for it.",
  "The app didn't call you. You called it.",
  "What would you do with this minute instead?",
  "Ten days ago you said you wanted something different.",
  "You've made it past the first week. The pull is still real.",
  "This is the part where most people give up. You're still here.",
  "The gap between urge and action is growing. That's the work.",
  "You don't need to be perfect. You need to be present.",
  "Halfway. The person on Day 1 didn't think you'd make it.",
  "Something's different now. You can feel it.",
  "You waited yesterday. You can wait today.",
  "The notification isn't urgent. It never was.",
  "You're building something that didn't exist 19 days ago.",
  "Three weeks in. The reflex has lost some of its grip.",
  "You're not someone who mindlessly scrolls. Not anymore.",
  "This is who you are now: someone who pauses.",
  "The phone is a tool. You're the one holding it.",
  "Your attention is the most valuable thing you own.",
  "25 days. You've earned the right to trust yourself.",
  "Almost there. Don't stop being honest with yourself.",
  "You wanted to reclaim something. Look at what you've built.",
  "The urge is still here. So is your choice.",
  "Day 29. Tomorrow you finish what you started.",
  "You came here to reclaim something. You did.",
];

export const APPS: { value: string; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "X / Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "snapchat", label: "Snapchat" },
  { value: "reddit", label: "Reddit" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "linkedin", label: "LinkedIn" },
];

export const GOAL_LABELS: Record<string, string> = {
  focus: "Focus & deep work",
  sleep: "Sleep quality",
  relationships: "Real relationships",
  reading: "Reading & learning",
  health: "Physical health",
  creativity: "Creativity",
  family: "Present with family",
};

export const GOALS: { value: string; label: string }[] = [
  { value: "focus", label: "Focus & deep work" },
  { value: "sleep", label: "Sleep quality" },
  { value: "relationships", label: "Real relationships" },
  { value: "reading", label: "Reading & learning" },
  { value: "health", label: "Physical health" },
  { value: "creativity", label: "Creativity" },
  { value: "family", label: "Present with family" },
];

export const SEVERITIES: { value: string; label: string }[] = [
  { value: "severe", label: "I check my phone before I'm out of bed" },
  { value: "heavy", label: "I lose 2–3 hours a day without meaning to" },
  { value: "affecting", label: "It's affecting real relationships" },
  { value: "relapsed", label: "I've tried to stop before and failed" },
  { value: "numb", label: "I just feel numb and want that to stop" },
];

export const WEEK_SUBJECTS: Record<number, string> = {
  1: "Nous — Your first 7 days.",
  2: "Nous — You're halfway.",
  3: "Nous — Final stretch.",
  4: "Nous — You made it.",
};
