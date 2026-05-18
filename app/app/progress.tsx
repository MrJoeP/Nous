import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useNousStore } from '../src/store/useNousStore'
import { useNousTheme } from '../src/context/NousThemeContext'
import { DAY_COLORS } from '../src/theme/dayTheme'

export default function ProgressScreen() {
  const router = useRouter()
  const { currentDay, streak, journalEntries } = useNousStore()
  const { text, textSecondary, bgAnimated } = useNousTheme()

  const bgStyle = useAnimatedStyle(() => ({ backgroundColor: bgAnimated.value }))
  const daysRemaining = 30 - currentDay

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={[styles.back, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
          PROGRESS
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: text }]} maxFontSizeMultiplier={1.3}>
              {currentDay}
            </Text>
            <Text style={[styles.statLabel, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
              day
            </Text>
          </View>
          <View style={styles.stat}>
            {streak === 0 ? (
              <Text style={[styles.zeroState, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
                Start your streak today.
              </Text>
            ) : (
              <>
                <Text style={[styles.statNumber, { color: text }]} maxFontSizeMultiplier={1.3}>
                  {streak}
                </Text>
                <Text style={[styles.statLabel, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
                  streak
                </Text>
              </>
            )}
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: text }]} maxFontSizeMultiplier={1.3}>
              {currentDay === 30 ? '✓' : daysRemaining}
            </Text>
            <Text style={[styles.statLabel, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
              {currentDay === 30 ? 'Completed.' : 'remaining'}
            </Text>
          </View>
        </View>

        {/* 30-dot timeline */}
        {currentDay > 1 && (
          <View style={styles.dots}>
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1
              const done = day < currentDay
              const isToday = day === currentDay
              const hasEntry = !!journalEntries[day]
              return (
                <View
                  key={day}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: done || isToday ? DAY_COLORS[day] : 'transparent',
                      borderColor: text,
                      opacity: done ? 1 : isToday ? 1 : 0.3,
                    },
                  ]}
                />
              )
            })}
          </View>
        )}
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  back: {
    fontFamily: 'DMSans-Regular',
    fontSize: 24,
  },
  title: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 14,
    letterSpacing: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  stat: {
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 40,
  },
  statLabel: {
    fontFamily: 'DMSans-Regular',
    fontSize: 13,
    letterSpacing: 1,
  },
  zeroState: {
    fontFamily: 'DMSans-Regular',
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 80,
  },
  dots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
})
