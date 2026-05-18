import Constants from 'expo-constants'

interface CheckInParams {
  day: number
  streak: number
  intention: string
  entries: Record<number, string>
}

export async function getCheckIn(params: CheckInParams): Promise<string> {
  const { day, streak, intention, entries } = params

  const priorDays = [day - 1, day - 2, day - 3].filter((d) => d >= 1)
  const missingCount = priorDays.filter((d) => !entries[d]).length
  const missingEntriesNote =
    missingCount >= 2 || priorDays.length === 0
      ? 'Note: user has not journaled recently. Do not reference journal content. Focus on today.'
      : ''

  const day30Note =
    day === 30
      ? `This is day 30 — the final day. Write a brief closing message (5 sentences max) that references their original intention: "${intention}". This is the payoff moment.`
      : ''

  const entryLines = priorDays.length > 0
    ? priorDays
        .map((d) => `- Day ${d}: "${entries[d] || 'none'}"`)
        .join('\n')
    : '- No prior entries yet.'

  const systemPrompt = `You are Thomas, the Nous coach — a 30-day dopamine reset guide.
The user is on day ${day} of their reset. Streak: ${streak} days.
Their intention: "${intention}"

Recent journal entries (most recent first — do NOT include today, user hasn't journaled yet):
${entryLines}

${missingEntriesNote}

If you see a pattern across entries, name it in one sentence. If this is day 1 or all entries are 'none', acknowledge the start without referencing the entries.

${day30Note}

Speak in first person, past tense for your actions. No emoji. No toxic positivity.
No filler phrases. Short sentences. Universal emotional truth.
Max 3 sentences (5 sentences on day 30 only).
Example: "Day 8. Opened the app. That's the whole job today."`

  const apiKey = Constants.expoConfig?.extra?.claudeApiKey
  if (!apiKey) throw new Error('CLAUDE_API_KEY_MISSING')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: day === 30 ? 300 : 150,
        system: systemPrompt,
        messages: [{ role: 'user', content: 'Check in with me.' }],
      }),
    })

    if (!response.ok) {
      const status = response.status
      if (status === 429) throw new Error('RATE_LIMITED')
      throw new Error(`API_ERROR_${status}`)
    }

    const data = await response.json()
    const text = data?.content?.[0]?.text
    if (!text) throw new Error('EMPTY_RESPONSE')
    return text
  } finally {
    clearTimeout(timeout)
  }
}
