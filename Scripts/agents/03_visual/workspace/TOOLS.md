# TOOLS — Visual Creator Agent

## Pfade
- Input: ~/Nous/Scripts/output/YYYY-MM-DD/copywriter_output.json
- Output Bilder: ~/Nous/Assets/YYYY-MM-DD/
- Output JSON: ~/Nous/Scripts/output/YYYY-MM-DD/visual_output.json

## Image API (wird ergänzt sobald Provider gewählt)
IMAGE_API_KEY aus ~/.env laden

## Namenskonvention
tag[XX]_charakter_portrait.png     → 1080x1350 (4:5 Feed)
tag[XX]_charakter_story.png        → 1080x1920 (9:16 Stories)
tag[XX]_atmosphaere_square.png     → 1080x1080 (1:1 Feed)
tag[XX]_statement_story.png        → 1080x1920 (9:16 Stories)
tag[XX]_thumbnail.png              → 1920x1080 (16:9 YouTube/TikTok Cover)

## Prompt-Ergänzungen (immer anhängen)
Positiv: "high quality, detailed, consistent style, no text, no watermark"
Negativ: "realistic photography, bright colors, text overlay, watermark, blurry"

## Referenz-Assets
- Offizielles Logo: ~/Nous/Assets/Logo/nous-logo-official.svg
- Charakter-Referenz: ~/Nous/Assets/Character/Character_Urban.png
- Charakter-Referenz 2: ~/Nous/Assets/Character/Character_Urban2.png
- Video-Referenz 1: ~/Nous/Videos/hf_20260305_203537_4b6e67cf-56ec-4d60-8185-adbabf084f40.mp4
- Video-Referenz 2: ~/Nous/Videos/hf_20260305_204159_215a7aaa-d8bc-454f-a408-707a5dfe5064.mp4
