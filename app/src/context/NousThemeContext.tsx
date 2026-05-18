import React, { createContext, useContext, useEffect } from 'react'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { getThemeForDay } from '../theme/dayTheme'
import { useNousStore } from '../store/useNousStore'

interface NousTheme {
  bg: string
  text: string
  textSecondary: string
  bgAnimated: ReturnType<typeof useSharedValue<string>>
}

const NousThemeContext = createContext<NousTheme | null>(null)

export function NousThemeProvider({ children }: { children: React.ReactNode }) {
  const currentDay = useNousStore((s) => s.currentDay)
  const theme = getThemeForDay(currentDay)
  const bgAnimated = useSharedValue(theme.bg)

  useEffect(() => {
    bgAnimated.value = withTiming(theme.bg, { duration: 500 })
  }, [currentDay])

  return (
    <NousThemeContext.Provider value={{ ...theme, bgAnimated }}>
      {children}
    </NousThemeContext.Provider>
  )
}

export function useNousTheme(): NousTheme {
  const ctx = useContext(NousThemeContext)
  if (!ctx) throw new Error('useNousTheme must be used inside NousThemeProvider')
  return ctx
}
