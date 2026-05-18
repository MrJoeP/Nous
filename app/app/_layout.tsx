import { useEffect } from 'react'
import { AppState } from 'react-native'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { NousThemeProvider } from '../src/context/NousThemeContext'
import { useNousStore } from '../src/store/useNousStore'
import { useRouter } from 'expo-router'

SplashScreen.preventAutoHideAsync()

function AppBootstrap() {
  const router = useRouter()
  const { hydrate, _hasHydrated, hasOnboarded, hasCheckedInToday, lastCheckIn, setCheckedInToday } =
    useNousStore()

  useEffect(() => {
    hydrate()
  }, [])

  // Reset hasCheckedInToday if it's a new calendar day
  useEffect(() => {
    if (!_hasHydrated) return
    const checkDayReset = () => {
      if (!lastCheckIn) return
      const lastDate = new Date(lastCheckIn).toDateString()
      const today = new Date().toDateString()
      if (lastDate !== today && hasCheckedInToday) {
        setCheckedInToday(false)
      }
    }
    checkDayReset()
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') checkDayReset()
    })
    return () => sub.remove()
  }, [_hasHydrated, lastCheckIn])

  // Navigate once hydrated
  useEffect(() => {
    if (!_hasHydrated) return
    if (!hasOnboarded) {
      router.replace('/onboarding')
    }
  }, [_hasHydrated])

  return null
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-SemiBold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
    'DMSans-SemiBold': require('../assets/fonts/DMSans-SemiBold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) return null

  return (
    <NousThemeProvider>
      <AppBootstrap />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="checkin" />
        <Stack.Screen name="journal" />
        <Stack.Screen name="progress" />
      </Stack>
    </NousThemeProvider>
  )
}
