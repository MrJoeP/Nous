# TOOLS — Copywriter Agent

## Pfade
- Output: ~/Nous/Scripts/output/YYYY-MM-DD/copywriter_output.json
- Wochenplan (Input vom Strategy Agent): ~/Nous/Scripts/output/wochenplan_YYYY-MM-DD.json

## Output-Format (JSON)
```json
{
  "tag": 8,
  "datum": "2026-04-07",
  "tagesfarbe": "#212121",
  "assets": {
    "1_statement_kurz": "...",
    "2_statement_mittel": "...",
    "3_statement_lang": "...",
    "4_ig_caption_1": "...",
    "5_ig_caption_2": "...",
    "6_tiktok_hook": "...",
    "7_x_post": "...",
    "8_video_prompt_1": "...",
    "9_video_prompt_2": "...",
    "10_bild_prompt_1": "...",
    "11_bild_prompt_2": "...",
    "12_story_slides": "...",
    "13_tagesfarbe": "...",
    "14_charakter_status": "...",
    "15_zusammenfassung": "..."
  },
  "freigegeben": [1, 2, 4, 7]
}
```

## Whatsapp Delivery
Nach Freigabe: Output-JSON-Pfad zurückgeben für Orchestrator.
