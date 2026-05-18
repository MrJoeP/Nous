# 🐦 X/Twitter Publisher Agent

**Status:** ⏳ Pending Setup  
**Priority:** High – fastest publishing win  
**Tool:** xurl (already installed) + X API v2  
**Effort:** ~30 minutes  

---

## What This Agent Does

After approval, automatically posts to X/Twitter:
- Text posts (statement + CTA)
- Threads (multi-part posts)
- With or without image

---

## Step 1: X Developer Account

1. Go to: developer.twitter.com
2. Log in with @join.nous account
3. "Sign up for Free Account" → Use Case: "Building tools for personal use"
4. Create app → Name: "Nous Publisher"

---

## Step 2: Generate API Keys

In the Developer Portal under your app:
- **API Key** (Consumer Key)
- **API Secret** (Consumer Secret)
- **Access Token** (for your account)
- **Access Token Secret**

> ⚠️ Important: Set permissions to **Read and Write** (not just Read)

---

## Step 3: Configure xurl

```bash
# xurl is already installed
xurl auth
# Enter your keys when prompted

# Test:
xurl tweet "Test from Nous Publisher. Reclaim your mind."
```

---

## Step 4: OpenClaw Integration

After `approve 7` on WhatsApp, X is posted automatically.  
Add to SOUL.md:

```
After approval of the X/Twitter post (Asset 7):
Post automatically via xurl with the exact text from Asset 7.
Command: xurl tweet "[TEXT]"
```

---

## Post Formats

```bash
# Simple tweet
xurl tweet "Day 9. Four things. Training. Uni. Work. Nous.\n\nEverything else is noise.\n\n— reclaim your mind."

# With image
xurl tweet "CAPTION" --media image.jpg

# Thread
xurl tweet "FIRST TWEET" --reply-to "TWEET_ID"
```

---

## .env Variables

```
X_API_KEY=your_api_key
X_API_SECRET=your_api_secret
X_ACCESS_TOKEN=your_access_token
X_ACCESS_TOKEN_SECRET=your_access_token_secret
```

---

## Setup Checklist

1. ⏳ developer.twitter.com → create app
2. ⏳ Generate API Keys + Tokens
3. ⏳ Set permissions to Read+Write
4. ⏳ `xurl auth` → enter keys
5. ⏳ Send test tweet
6. ⏳ Extend SOUL.md
7. ⏳ Test after approval

**Estimated effort:** ~30 minutes. Simplest publisher of all three platforms. **No token expiry** on Basic Plan.
