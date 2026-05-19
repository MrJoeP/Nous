import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export interface DotTap {
  id: string;
  x: number;    // 0–100 percent of container
  y: number;    // 0–100 percent of container
  size: number; // px
  day: number;
  app: string;
}

export interface NousState {
  currentDay: number;
  streak: number;
  lastCheckIn: string | null;
  hasCheckedInToday: boolean;
  lastCheckInMessage: string;
  intention: string;
  goals: string[];
  severity: string;
  email: string;
  journalEntries: Record<number, string>;
  hasOnboarded: boolean;
  blocksWaited: number;
  checkInsCompleted: number;
  ignoredApps: string[];
  dotTaps: DotTap[];
  hasCelebratedDay30: boolean;
}

const STORAGE_KEY = "nous_state_v1";

const DEFAULTS: NousState = {
  currentDay: 1,
  streak: 0,
  lastCheckIn: null,
  hasCheckedInToday: false,
  lastCheckInMessage: "",
  intention: "",
  goals: [],
  severity: "",
  email: "",
  journalEntries: {},
  hasOnboarded: false,
  blocksWaited: 0,
  checkInsCompleted: 0,
  ignoredApps: [],
  dotTaps: [],
  hasCelebratedDay30: false,
};

function applyDayReset(s: NousState): NousState {
  if (!s.lastCheckIn) return s;
  const last = new Date(s.lastCheckIn).toDateString();
  const today = new Date().toDateString();
  if (last !== today && s.hasCheckedInToday) {
    return { ...s, hasCheckedInToday: false };
  }
  return s;
}

function loadState(): NousState {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = { ...DEFAULTS, ...JSON.parse(raw) } as NousState;
    return applyDayReset(parsed);
  } catch {
    return DEFAULTS;
  }
}

interface Ctx {
  state: NousState;
  set: (patch: Partial<NousState> | ((s: NousState) => Partial<NousState>)) => void;
  reset: () => void;
  incrementDay: () => void;
  recordCheckIn: (message: string) => void;
  recordDotTap: (app: string) => void;
}

const NousCtx = createContext<Ctx | null>(null);

export function NousProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NousState>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
    const onFocus = () => setState((s) => applyDayReset(s));
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const ctx = useMemo<Ctx>(() => {
    const set: Ctx["set"] = (patch) =>
      setState((s) => ({ ...s, ...(typeof patch === "function" ? patch(s) : patch) }));

    const reset = () => setState(DEFAULTS);

    const incrementDay = () => {
      setState((s) => {
        const nextDay = Math.min(30, s.currentDay + 1);
        const next: NousState = { ...s, currentDay: nextDay, hasCheckedInToday: false };
        if ([7, 14, 21, 30].includes(nextDay) && s.checkInsCompleted > 0 && s.email) {
          import("./email").then((m) => m.sendProgressReport(next)).catch(() => {});
        }
        return next;
      });
    };

    const recordCheckIn = (message: string) => {
      setState((s) => {
        const alreadyToday = s.hasCheckedInToday;
        return {
          ...s,
          lastCheckInMessage: message,
          lastCheckIn: new Date().toISOString(),
          hasCheckedInToday: true,
          streak: alreadyToday ? s.streak : s.streak + 1,
          checkInsCompleted: alreadyToday ? s.checkInsCompleted : s.checkInsCompleted + 1,
        };
      });
    };

    const recordDotTap = (app: string) => {
      setState((s) => {
        const dot: DotTap = {
          id: `${Date.now()}-${Math.random()}`,
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
          size: 54 + Math.random() * 46,
          day: s.currentDay,
          app,
        };
        return { ...s, dotTaps: [...s.dotTaps, dot] };
      });
    };

    return { state, set, reset, incrementDay, recordCheckIn, recordDotTap };
  }, [state]);

  return <NousCtx.Provider value={ctx}>{children}</NousCtx.Provider>;
}

export function useNous() {
  const c = useContext(NousCtx);
  if (!c) throw new Error("useNous must be used inside NousProvider");
  return c;
}
