import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useNousStore } from '../src/store/useNousStore'

export default function OnboardingScreen() {
  const router = useRouter()
  const { setIntention, setOnboarded } = useNousStore()
  const [intention, setIntentionText] = useState('')
  const [showEmpty, setShowEmpty] = useState(false)

  function handleBegin() {
    if (!intention.trim()) {
      setShowEmpty(true)
      return
    }
    setIntention(intention.trim())
    setOnboarded()
    router.replace('/welcome')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.wordmark} maxFontSizeMultiplier={1.3}>NOUS</Text>

      <View style={styles.center}>
        <Text style={styles.question} maxFontSizeMultiplier={1.3}>
          What are you trying to reclaim?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. reading without my phone"
          placeholderTextColor="#666666"
          value={intention}
          onChangeText={(t) => {
            setIntentionText(t)
            setShowEmpty(false)
          }}
          multiline={false}
          returnKeyType="done"
          onSubmitEditing={handleBegin}
          maxFontSizeMultiplier={1.3}
        />
        {showEmpty && (
          <Text style={styles.hint} maxFontSizeMultiplier={1.3}>
            Name what you're chasing.
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.beginBtn, !intention.trim() && styles.beginBtnDisabled]}
        onPress={handleBegin}
        disabled={!intention.trim()}
        activeOpacity={0.7}
      >
        <Text style={styles.beginText} maxFontSizeMultiplier={1.3}>Begin</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 48,
  },
  wordmark: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: '15%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -40,
  },
  question: {
    fontFamily: 'DMSans-Regular',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
    lineHeight: 28,
  },
  input: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  hint: {
    fontFamily: 'DMSans-Regular',
    fontSize: 13,
    color: '#AAAAAA',
    marginTop: 10,
  },
  beginBtn: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    height: 52,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beginBtnDisabled: {
    opacity: 0.3,
  },
  beginText: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
})
