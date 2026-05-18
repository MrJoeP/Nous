import { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated as RNAnimated } from 'react-native'
import { useRouter } from 'expo-router'
import * as Notifications from 'expo-notifications'
import { useNousStore } from '../src/store/useNousStore'
import { useNousTheme } from '../src/context/NousThemeContext'
import { getCheckIn } from '../src/services/claudeService'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

export default function CheckInScreen() {
  const router = useRouter()
  const { currentDay, streak, intention, journalEntries, markCheckIn, hasCheckedInToday } =
    useNousStore()
  const { text, textSecondary, bgAnimated } = useNousTheme()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Pulsing dot animation
  const pulseAnim = useRef(new RNAnimated.Value(1)).current
  useEffect(() => {
    const loop = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(pulseAnim, { toValue: 0.2, duration: 1000, useNativeDriver: true }),
        RNAnimated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [])

  const bgStyle = useAnimatedStyle(() => ({ backgroundColor: bgAnimated.value }))

  async function fetchCheckIn() {
    setLoading(true)
    setError(null)
    try {
      const msg = await getCheckIn({ day: currentDay, streak, intention, entries: journalEntries })
      setMessage(msg)
      if (!hasCheckedInToday) {
        markCheckIn(msg)
        await requestNotificationPermission()
      }
    } catch (e: any) {
      const code = e?.message ?? ''
      if (code === 'RATE_LIMITED') {
        setError('Thomas is unavailable right now. Try again later.')
      } else if (code === 'CLAUDE_API_KEY_MISSING') {
        setError('API key not configured.')
      } else {
        setError('Check-in unavailable. Try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  async function requestNotificationPermission() {
    try {
      const { status } = await Notifications.getPermissionsAsync()
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync()
      }
    } catch {
      // permission failure is non-fatal
    }
  }

  useEffect(() => {
    fetchCheckIn()
  }, [])

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
        <Text style={[styles.backText, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
          ←
        </Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingRow}>
            <RNAnimated.View style={[styles.dot, { backgroundColor: text, opacity: pulseAnim }]} />
            <Text style={[styles.loadingText, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
              Thomas is thinking...
            </Text>
          </View>
        ) : error ? (
          <View>
            <Text style={[styles.errorText, { color: text }]} maxFontSizeMultiplier={1.3}>
              {error}
            </Text>
            <TouchableOpacity style={[styles.retryBtn, { borderColor: text }]} onPress={fetchCheckIn} activeOpacity={0.7}>
              <Text style={[styles.retryText, { color: text }]} maxFontSizeMultiplier={1.3}>
                Try again
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={[styles.message, { color: text }]} maxFontSizeMultiplier={1.3}>
              {message}
            </Text>

            {currentDay === 30 && intention ? (
              <Text style={[styles.completionNote, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
                You said: "{intention}". Thirty days later, here you are.
              </Text>
            ) : null}
          </View>
        )}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 28,
    paddingBottom: 48,
  },
  backBtn: {
    marginBottom: 24,
  },
  backText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  loadingText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
  },
  message: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 24,
    lineHeight: 36,
  },
  completionNote: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 32,
    fontStyle: 'italic',
  },
  errorText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  retryBtn: {
    borderWidth: 1,
    height: 52,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryText: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 16,
  },
})
