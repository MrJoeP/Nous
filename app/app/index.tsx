import { useRef } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useRouter } from 'expo-router'
import { useNousStore } from '../src/store/useNousStore'
import { useNousTheme } from '../src/context/NousThemeContext'
import { getCharacterForDay } from '../src/theme/dayTheme'
import DaySimulator from '../src/components/DaySimulator'
import { useState } from 'react'

const CHARACTER_IMAGES = {
  dark: require('../assets/character_dark.png'),
  urban: require('../assets/character_urban.png'),
  urban2: require('../assets/character_urban2.png'),
}

export default function HomeScreen() {
  const router = useRouter()
  const currentDay = useNousStore((s) => s.currentDay)
  const streak = useNousStore((s) => s.streak)
  const intention = useNousStore((s) => s.intention)
  const hasCheckedInToday = useNousStore((s) => s.hasCheckedInToday)
  const lastCheckInMessage = useNousStore((s) => s.lastCheckInMessage)
  const incrementDay = useNousStore((s) => s.incrementDay)
  const { text, textSecondary, bgAnimated } = useNousTheme()
  const [simVisible, setSimVisible] = useState(false)

  const characterVariant = getCharacterForDay(currentDay)
  const isDark = currentDay <= 13

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: bgAnimated.value,
  }))

  function handleEndDay() {
    incrementDay()
  }

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      {/* Top row */}
      <View style={styles.topRow}>
        <TouchableOpacity onLongPress={() => __DEV__ && setSimVisible(true)} delayLongPress={800}>
          <Text style={[styles.dayLabel, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
            DAY {currentDay}
          </Text>
        </TouchableOpacity>
        {streak > 0 && (
          <Text style={[styles.streakLabel, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
            {streak}-day streak
          </Text>
        )}
      </View>

      {/* Character */}
      <View style={styles.characterContainer}>
        <Image
          source={CHARACTER_IMAGES[characterVariant]}
          style={styles.character}
          resizeMode="contain"
        />
      </View>

      {/* Intention */}
      {intention ? (
        <Text
          style={[styles.intention, { color: textSecondary }]}
          numberOfLines={2}
          ellipsizeMode="tail"
          maxFontSizeMultiplier={1.3}
        >
          Reclaiming: {intention}
        </Text>
      ) : null}

      {/* CTA */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={[
            styles.ctaBtn,
            { borderColor: text },
            hasCheckedInToday && styles.ctaBtnDisabled,
          ]}
          onPress={() => router.push('/checkin')}
          disabled={hasCheckedInToday}
          activeOpacity={0.7}
        >
          <Text style={[styles.ctaText, { color: text }]} maxFontSizeMultiplier={1.3}>
            {hasCheckedInToday ? 'Revisit today' : 'Check in with Thomas'}
          </Text>
        </TouchableOpacity>

        {hasCheckedInToday && lastCheckInMessage ? (
          <TouchableOpacity onPress={() => router.push('/checkin')} activeOpacity={0.7}>
            <Text
              style={[styles.lastMessage, { color: textSecondary }]}
              numberOfLines={2}
              ellipsizeMode="tail"
              maxFontSizeMultiplier={1.3}
            >
              {lastCheckInMessage}
            </Text>
          </TouchableOpacity>
        ) : null}

        {/* Secondary actions */}
        <View style={styles.secondaryRow}>
          <TouchableOpacity onPress={() => router.push('/journal')} activeOpacity={0.7}>
            <Text style={[styles.secondaryBtn, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
              Journal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/progress')} activeOpacity={0.7}>
            <Text style={[styles.secondaryBtn, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
              Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEndDay} activeOpacity={0.7}>
            <Text style={[styles.secondaryBtn, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
              End Day
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {__DEV__ && simVisible && (
        <DaySimulator onClose={() => setSimVisible(false)} />
      )}
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayLabel: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 14,
    letterSpacing: 2,
  },
  streakLabel: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
  },
  characterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  character: {
    width: 240,
    height: 320,
  },
  intention: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  ctaContainer: {
    gap: 16,
  },
  ctaBtn: {
    borderWidth: 1,
    height: 52,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaBtnDisabled: {
    opacity: 0.5,
  },
  ctaText: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  lastMessage: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  secondaryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginTop: 8,
  },
  secondaryBtn: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
  },
})
