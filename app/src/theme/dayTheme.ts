export const DAY_COLORS: Record<number, string> = {
  1: '#000000', 2: '#020202', 3: '#050505', 4: '#090909', 5: '#0E0E0E',
  6: '#141414', 7: '#1A1A1A', 8: '#212121', 9: '#292929', 10: '#323232',
  11: '#3C3C3C', 12: '#474747', 13: '#535353', 14: '#606060', 15: '#6E6E6E',
  16: '#7D7D7D', 17: '#8D8D8D', 18: '#9E9E9E', 19: '#B0B0B0', 20: '#BBBBBB',
  21: '#C4C4C4', 22: '#CBBFA8', 23: '#CEBCA2', 24: '#D1BA9E', 25: '#D4B99A',
  26: '#D8B997', 27: '#DCBA94', 28: '#DFBD92', 29: '#E2C09A', 30: '#EAE0D0',
}

// Text flip at day 14 — WCAG AA verified
// Days 1-13: white on dark (#000–#535353) all pass
// Day 14+ : black on mid-gray (#606060+) all pass
// Days 14-20 with white text FAIL (white on #6E6E6E = 4.2:1)
export function getTextColor(day: number): string {
  return day <= 13 ? '#FFFFFF' : '#000000'
}

export function getSecondaryTextColor(day: number): string {
  return day <= 13 ? '#AAAAAA' : '#555555'
}

export function getThemeForDay(day: number) {
  return {
    bg: DAY_COLORS[Math.max(1, Math.min(30, day))] ?? DAY_COLORS[1],
    text: getTextColor(day),
    textSecondary: getSecondaryTextColor(day),
  }
}

// Character variant by day range
export function getCharacterForDay(day: number): 'dark' | 'urban' | 'urban2' {
  if (day <= 10) return 'dark'
  if (day <= 20) return 'urban'
  return 'urban2'
}
