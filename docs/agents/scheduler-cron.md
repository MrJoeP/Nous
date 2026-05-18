# ⏰ Scheduler & Cron Agent

**Status:** ⏳ Pending Setup  
**Priority:** High – fastest win  
**Effort:** ~10 minutes  
**Tool:** OpenClaw Cron  

---

## What This Agent Does

Triggers the `tagesreport` command automatically every day at 20:00.  
Without this agent you need to manually message WhatsApp every day.  
With this agent, content generation runs on its own.

---

## Setup (3 Steps)

### Step 1: OpenClaw Gateway must be running

```bash
openclaw gateway
```

The gateway must be active for the cron job to work.  
Best run as a background process or auto-start on Mac boot.

### Step 2: Set up cron job

```bash
openclaw cron
```

In the interface:
- Time: `20:00` daily
- Command: `tagesreport`
- Channel: WhatsApp

### Step 3: Auto-start on Mac reboot (optional but recommended)

```bash
mkdir -p ~/Library/LaunchAgents

cat > ~/Library/LaunchAgents/com.openclaw.gateway.plist << 'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.openclaw.gateway</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/openclaw</string>
    <string>gateway</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
</dict>
</plist>
PLIST

launchctl load ~/Library/LaunchAgents/com.openclaw.gateway.plist
```

---

## Result After Setup

- 20:00 → Agent automatically messages WhatsApp
- You receive all 15 assets
- Approve with `approve [number]` or `approve all`
- No manual trigger needed

---

## Estimated Effort

- **10 minutes** for basic setup
- **+20 minutes** if you configure auto-start
