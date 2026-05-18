# 📸 Instagram Publisher Agent

**Status:** ⏳ Pending Setup  
**Priority:** Medium – after X/Twitter  
**Tool:** Meta Graph API + n8n or OpenClaw  
**Effort:** 2–3 hours  

---

## What This Agent Does

After approval (`approve [number]`), automatically posts to Instagram:
- Feed posts (image + caption + hashtags)
- Reels (video + caption)
- Stories

---

## Prerequisites

### 1. Meta Business Account
- Go to: business.facebook.com
- Create a Business Account (free)
- Link your Instagram account (@join.nous)

### 2. Instagram must be a Professional Account
- Instagram App → Settings → Account → Switch to Professional Account
- Type: Creator or Business

### 3. Create Meta Developer App
- Go to: developers.facebook.com
- "Create App" → Business → Create app
- Add product: "Instagram Graph API"

### 4. Generate Access Token
- Graph API Explorer: developers.facebook.com/tools/explorer
- Required permissions:
  - `instagram_basic`
  - `instagram_content_publish`
  - `pages_read_engagement`
- Generate long-lived token (expires after 60 days — must be renewed)

---

## API Calls

### Post an image

```bash
# Step 1: Create container
curl -X POST \
  "https://graph.facebook.com/v18.0/{instagram-user-id}/media" \
  -d "image_url=https://YOUR-IMAGE-URL" \
  -d "caption=YOUR CAPTION #Nous #Day8" \
  -d "access_token=YOUR_TOKEN"

# Step 2: Publish container
curl -X POST \
  "https://graph.facebook.com/v18.0/{instagram-user-id}/media_publish" \
  -d "creation_id=CONTAINER_ID_FROM_STEP_1" \
  -d "access_token=YOUR_TOKEN"
```

### Post a Reel

```bash
curl -X POST \
  "https://graph.facebook.com/v18.0/{instagram-user-id}/media" \
  -d "media_type=REELS" \
  -d "video_url=https://YOUR-VIDEO-URL" \
  -d "caption=YOUR CAPTION" \
  -d "access_token=YOUR_TOKEN"
```

---

## .env Variables

```
META_ACCESS_TOKEN=your_long_lived_token
META_IG_USER_ID=your_instagram_user_id
```

```bash
# Find your Instagram User ID:
curl "https://graph.facebook.com/v18.0/me/accounts?access_token=TOKEN"
```

---

## Setup Checklist

1. ✅ Professional Instagram Account (@join.nous)
2. ⏳ Create Meta Business Account
3. ⏳ Set up Developer App + Graph API
4. ⏳ Generate long-lived Access Token
5. ⏳ Find Instagram User ID
6. ⏳ Fill in .env
7. ⏳ Send test post via API
8. ⏳ Connect trigger after approval

> ⚠️ Main challenge: Token expires after 60 days — refresh must be automated.
