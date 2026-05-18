#!/bin/bash
# Nous TikTok Publisher
# Usage: ./tiktok_post.sh "VIDEO_PATH" "CAPTION"
# Voraussetzung: TIKTOK_ACCESS_TOKEN in ~/Nous/.env gesetzt

source ~/Nous/.env

VIDEO_PATH=$1
CAPTION=$2

if [ -z "$VIDEO_PATH" ] || [ -z "$CAPTION" ]; then
  echo "❌ Usage: ./tiktok_post.sh \"VIDEO_PATH\" \"CAPTION\""
  exit 1
fi

if [ "$TIKTOK_ACCESS_TOKEN" = "HIER_EINTRAGEN" ]; then
  echo "❌ Bitte TIKTOK_ACCESS_TOKEN in ~/Nous/.env eintragen"
  echo "   ⚠️  TikTok App Approval dauert 1–2 Wochen: developers.tiktok.com"
  exit 1
fi

echo "🎵 Initialisiere TikTok Upload..."

VIDEO_SIZE=$(stat -f%z "$VIDEO_PATH" 2>/dev/null || stat -c%s "$VIDEO_PATH")

RESPONSE=$(curl -s -X POST "https://open.tiktokapis.com/v2/post/publish/video/init/" \
  -H "Authorization: Bearer ${TIKTOK_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"post_info\": {
      \"title\": \"${CAPTION}\",
      \"privacy_level\": \"PUBLIC_TO_EVERYONE\",
      \"disable_duet\": false,
      \"disable_comment\": false,
      \"disable_stitch\": false
    },
    \"source_info\": {
      \"source\": \"FILE_UPLOAD\",
      \"video_size\": ${VIDEO_SIZE},
      \"chunk_size\": 10000000,
      \"total_chunk_count\": 1
    }
  }")

PUBLISH_ID=$(echo $RESPONSE | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',{}).get('publish_id',''))" 2>/dev/null)
UPLOAD_URL=$(echo $RESPONSE | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',{}).get('upload_url',''))" 2>/dev/null)

if [ -z "$PUBLISH_ID" ]; then
  echo "❌ TikTok Upload Init fehlgeschlagen:"
  echo $RESPONSE
  exit 1
fi

echo "✅ Upload initialisiert: $PUBLISH_ID"
echo "📤 Lade Video hoch..."

LAST_BYTE=$(( VIDEO_SIZE - 1 ))
curl -s -X PUT "$UPLOAD_URL" \
  -H "Content-Type: video/mp4" \
  -H "Content-Range: bytes 0-${LAST_BYTE}/${VIDEO_SIZE}" \
  --data-binary "@${VIDEO_PATH}"

echo "✅ TikTok Video hochgeladen! Publish ID: $PUBLISH_ID"
echo "$(date): TikTok Upload $PUBLISH_ID – $CAPTION" >> ~/Nous/Logs/published.log
