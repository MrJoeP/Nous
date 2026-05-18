#!/bin/bash
# Nous Video Merger (FFmpeg)
# Usage: ./merge_video.sh visual.mp4 audio.mp3 output.mp4
# Kombiniert Bild/Video + TTS Audio zu finalem Reel

VISUAL=$1
AUDIO=$2
OUTPUT=${3:-"final_$(date +%Y%m%d_%H%M%S).mp4"}

if [ -z "$VISUAL" ] || [ -z "$AUDIO" ]; then
  echo "❌ Usage: ./merge_video.sh visual.mp4 audio.mp3 output.mp4"
  exit 1
fi

if ! command -v ffmpeg &> /dev/null; then
  echo "❌ FFmpeg nicht gefunden. Installiere: brew install ffmpeg"
  exit 1
fi

echo "🎬 Merge Video + Audio..."
echo "   Visual: $VISUAL"
echo "   Audio:  $AUDIO"
echo "   Output: ~/Nous/Videos/$OUTPUT"

ffmpeg -i "$VISUAL" -i "$AUDIO" \
  -c:v copy \
  -c:a aac \
  -shortest \
  -movflags +faststart \
  ~/Nous/Videos/$OUTPUT \
  -y 2>&1 | tail -5

if [ $? -eq 0 ]; then
  echo "✅ Video erstellt: ~/Nous/Videos/$OUTPUT"
  echo "$(date): Video merged – $OUTPUT" >> ~/Nous/Logs/video.log
else
  echo "❌ Merge fehlgeschlagen"
  exit 1
fi
