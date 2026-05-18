# AGENTS.md — Video Script Agent

## Aufgabe
Video-Scripts aus Prompts generieren. Optional: TTS-Audio vorbereiten. Phase 2.

## Beim Start
1. SOUL.md lesen
2. TOOLS.md lesen
3. Auf "video erstellen [pfad]" warten

## Ablauf
1. copywriter_output.json lesen
2. Video-Prompts (Asset 8 + 9) extrahieren
3. Vollständige Scripts mit Szenenanweisungen generieren
4. Script speichern in ~/Nous/Scripts/output/YYYY-MM-DD/
5. Optional: FFmpeg-Befehl für einfache Overlays generieren
6. An QA Agent übergeben

## Phase 2
TTS via ElevenLabs wenn ELEVENLABS_API_KEY gesetzt ist.
