#!/bin/bash
# Nous TTS Generator (ElevenLabs)
# Usage: ./tts_generate.sh "TEXT" "output_filename"
# Voraussetzung: ELEVENLABS_API_KEY und ELEVENLABS_VOICE_ID in ~/Nous/.env gesetzt

source ~/Nous/.env

TEXT=$1
OUTPUT=${2:-"audio_$(date +%Y%m%d_%H%M%S).mp3"}

if [ -z "$TEXT" ]; then
  echo "❌ Usage: ./tts_generate.sh \"DEIN TEXT\" \"output.mp3\""
  exit 1
fi

if [ "$ELEVENLABS_API_KEY" = "HIER_EINTRAGEN" ]; then
  echo "❌ Bitte ELEVENLABS_API_KEY in ~/Nous/.env eintragen"
  echo "   → elevenlabs.io"
  exit 1
fi

echo "🎙️ Generiere TTS Audio..."

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}" \
  -H "xi-api-key: ${ELEVENLABS_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"text\": \"${TEXT}\",
    \"model_id\": \"eleven_multilingual_v2\",
    \"voice_settings\": {
      \"stability\": 0.75,
      \"similarity_boost\": 0.80,
      \"style\": 0.15,
      \"use_speaker_boost\": true
    }
  }" \
  --output ~/Nous/Videos/${OUTPUT}

if [ $? -eq 0 ]; then
  echo "✅ Audio gespeichert: ~/Nous/Videos/${OUTPUT}"
  echo "$(date): TTS generiert – ${OUTPUT}" >> ~/Nous/Logs/tts.log
else
  echo "❌ TTS Generierung fehlgeschlagen"
  exit 1
fi
