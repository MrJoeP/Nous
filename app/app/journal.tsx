import { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useNousStore } from '../src/store/useNousStore'
import { useNousTheme } from '../src/context/NousThemeContext'

export default function JournalScreen() {
  const router = useRouter()
  const { currentDay, journalEntries, saveJournal } = useNousStore()
  const { text, textSecondary, bgAnimated } = useNousTheme()
  const [entry, setEntry] = useState(journalEntries[currentDay] ?? '')

  const bgStyle = useAnimatedStyle(() => ({ backgroundColor: bgAnimated.value }))

  function handleSave() {
    saveJournal(currentDay, entry)
    router.back()
  }

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={[styles.back, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: textSecondary }]} maxFontSizeMultiplier={1.3}>
          DAY {currentDay}
        </Text>
        <TouchableOpacity onPress={handleSave} activeOpacity={0.7}>
          <Text style={[styles.saveBtn, { color: text }]} maxFontSizeMultiplier={1.3}>Save</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, { color: text }]}
        placeholder="What happened today?"
        placeholderTextColor={textSecondary}
        value={entry}
        onChangeText={setEntry}
        multiline
        textAlignVertical="top"
        autoFocus
        maxFontSizeMultiplier={1.3}
      />
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
    marginBottom: 24,
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
  saveBtn: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontFamily: 'DMSans-Regular',
    fontSize: 18,
    lineHeight: 28,
  },
})
