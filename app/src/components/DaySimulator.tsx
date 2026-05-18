import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider'
import { useState } from 'react'
import { useNousStore } from '../store/useNousStore'

interface Props {
  onClose: () => void
}

export default function DaySimulator({ onClose }: Props) {
  const { currentDay, setDay } = useNousStore()
  const [value, setValue] = useState(currentDay)

  function handleApply() {
    setDay(value)
    onClose()
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.panel}>
        <Text style={styles.label}>DAY SIMULATOR</Text>
        <Text style={styles.dayValue}>DAY {value}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={30}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#666666"
          thumbTintColor="#FFFFFF"
        />
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btn} onPress={handleApply} activeOpacity={0.7}>
            <Text style={styles.btnText}>Set Day {value}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#111111',
    padding: 32,
    paddingBottom: 48,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  label: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 11,
    color: '#666666',
    letterSpacing: 2,
    marginBottom: 16,
  },
  dayValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 40,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 24,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    height: 52,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  cancelBtn: {
    height: 52,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: '#666666',
  },
})
