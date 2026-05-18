#!/bin/bash
# Nous Instagram Publisher
# Usage: ./instagram_post.sh "IMAGE_URL" "CAPTION"
# Voraussetzung: META_ACCESS_TOKEN und META_IG_USER_ID in ~/Nous/.env gesetzt

source ~/Nous/.env

IMAGE_URL=$1
CAPTION=$2

if [ -z "$IMAGE_URL" ] || [ -z "$CAPTION" ]; then
  echo "❌ Usage: ./instagram_post.sh \"IMAGE_URL\" \"CAPTION\""
  exit 1
fi

if [ "$META_ACCESS_TOKEN" = "HIER_EINTRAGEN" ]; then
  echo "❌ Bitte META_ACCESS_TOKEN in ~/Nous/.env eintragen"
  exit 1
fi

echo "📸 Erstelle Instagram Container..."

CONTAINER=$(curl -s -X POST \
  "https://graph.facebook.com/v18.0/${META_IG_USER_ID}/media" \
  -d "image_url=${IMAGE_URL}" \
  -d "caption=${CAPTION}" \
  -d "access_token=${META_ACCESS_TOKEN}")

CONTAINER_ID=$(echo $CONTAINER | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])" 2>/dev/null)

if [ -z "$CONTAINER_ID" ]; then
  echo "❌ Container-Erstellung fehlgeschlagen:"
  echo $CONTAINER
  exit 1
fi

echo "✅ Container erstellt: $CONTAINER_ID"

echo "🚀 Publiziere Post..."
RESULT=$(curl -s -X POST \
  "https://graph.facebook.com/v18.0/${META_IG_USER_ID}/media_publish" \
  -d "creation_id=${CONTAINER_ID}" \
  -d "access_token=${META_ACCESS_TOKEN}")

POST_ID=$(echo $RESULT | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])" 2>/dev/null)

if [ -z "$POST_ID" ]; then
  echo "❌ Posting fehlgeschlagen:"
  echo $RESULT
  exit 1
fi

echo "✅ Instagram Post live! ID: $POST_ID"
echo "$(date): Instagram Post $POST_ID – $CAPTION" >> ~/Nous/Logs/published.log
