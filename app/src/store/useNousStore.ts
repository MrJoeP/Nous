import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface NousState {
  currentDay: number
  streak: number
  lastCheckIn: string | null
  hasCheckedInToday: boolean
  lastCheckInMessage: string
  intention: string
  journalEntries: Record<number, string>
  hasOnboarded: boolean
  hasReceivedWelcome: boolean
  notificationTime: string
  _hasHydrated: boolean

  // Actions
  setDay: (day: number) => void
  incrementDay: () => void
  saveJournal: (day: number, text: string) => void
  setIntention: (s: string) => void
  setCheckedInToday: (value: boolean) => void
  setWelcomeReceived: () => void
  setOnboarded: () => void
  setNotificationTime: (time: string) => void
  markCheckIn: (message?: string) => void
  hydrate: () => Promise<void>
}

const STORAGE_KEY = 'nous_state_v1'

const defaults = {
  currentDay: 1,
  streak: 0,
  lastCheckIn: null,
  hasCheckedInToday: false,
  lastCheckInMessage: '',
  intention: '',
  journalEntries: {},
  hasOnboarded: false,
  hasReceivedWelcome: false,
  notificationTime: '20:00',
}

async function persist(partial: Partial<NousState>) {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY)
    const current = existing ? JSON.parse(existing) : {}
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...partial }))
  } catch {
    // Storage write failure — state update still applied in memory
  }
}

export const useNousStore = create<NousState>((set, get) => ({
  ...defaults,
  _hasHydrated: false,

  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        set({ ...defaults, ...saved, _hasHydrated: true })
      } else {
        set({ _hasHydrated: true })
      }
    } catch {
      set({ _hasHydrated: true })
    }
  },

  setDay: (day) => {
    const clamped = Math.max(1, Math.min(30, day))
    set({ currentDay: clamped })
    persist({ currentDay: clamped })
  },

  incrementDay: () => {
    const { currentDay } = get()
    if (currentDay >= 30) return
    const next = currentDay + 1
    set({ currentDay: next, hasCheckedInToday: false })
    persist({ currentDay: next, hasCheckedInToday: false })
  },

  saveJournal: (day, text) => {
    const entries = { ...get().journalEntries, [day]: text }
    set({ journalEntries: entries })
    persist({ journalEntries: entries })
  },

  setIntention: (s) => {
    set({ intention: s })
    persist({ intention: s })
  },

  setCheckedInToday: (value) => {
    set({ hasCheckedInToday: value })
    persist({ hasCheckedInToday: value })
  },

  setWelcomeReceived: () => {
    set({ hasReceivedWelcome: true })
    persist({ hasReceivedWelcome: true })
  },

  setOnboarded: () => {
    set({ hasOnboarded: true })
    persist({ hasOnboarded: true })
  },

  setNotificationTime: (time) => {
    set({ notificationTime: time })
    persist({ notificationTime: time })
  },

  markCheckIn: (message = '') => {
    const now = new Date().toISOString()
    const { streak, lastCheckIn } = get()
    const lastDate = lastCheckIn ? new Date(lastCheckIn).toDateString() : null
    const today = new Date().toDateString()
    const newStreak = lastDate && lastDate !== today ? streak + 1 : streak === 0 ? 1 : streak
    set({ hasCheckedInToday: true, lastCheckIn: now, streak: newStreak, lastCheckInMessage: message })
    persist({ hasCheckedInToday: true, lastCheckIn: now, streak: newStreak, lastCheckInMessage: message })
  },
}))
