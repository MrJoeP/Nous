import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useNousStore } from '../src/store/useNousStore'

export default function WelcomeScreen() {
  const router = useRouter()
  const setWelcomeReceived = useNousStore((s) => s.setWelcomeReceived)

  useEffect(() => {
    // Mark welcome received immediately on mount — before timer fires
    setWelcomeReceived()
    const t = setTimeout(() => {
      router.replace('/')
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.message} maxFontSizeMultiplier={1.3}>
        Day 1. You named what you want back. Let's begin.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  message: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 40,
  },
})
