# TOOLS — Video Script Agent

## Pfade
- Input: ~/Nous/Scripts/output/YYYY-MM-DD/copywriter_output.json
- Output Scripts: ~/Nous/Scripts/output/YYYY-MM-DD/video_script_[A/B].md
- Output Videos: ~/Nous/Videos/YYYY-MM-DD/
- Output JSON: ~/Nous/Scripts/output/YYYY-MM-DD/video_output.json

## FFmpeg (installiert unter /opt/homebrew/bin/ffmpeg)
Standard-Ausgabe:
- Format: MP4, H.264
- Portrait: 1080x1920 @ 30fps, 8000k
- Square: 1080x1080 @ 30fps, 8000k

## ElevenLabs (Phase 2)
ELEVENLABS_API_KEY aus ~/Nous/.env laden
Stimme: neutral, ruhig (wird konfiguriert)
