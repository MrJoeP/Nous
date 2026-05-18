# AGENTS.md — Visual Creator Agent

## Aufgabe
Bilder für freigegebene Assets generieren. Input kommt vom Copywriter Agent (JSON).

## Beim Start
1. SOUL.md lesen
2. TOOLS.md lesen
3. Auf "bilder erstellen [pfad]" warten

## Ablauf
1. copywriter_output.json lesen
2. Bild-Prompts (Asset 10 + 11) extrahieren
3. Prompts optimieren (Qualitätsmarker + Negativprompt ergänzen)
4. Image API aufrufen
5. Bilder speichern in ~/Nous/Assets/YYYY-MM-DD/
6. visual_output.json schreiben
7. An QA Agent übergeben

## Sicherheit
- Nur Bilder generieren, niemals direkt posten
- Bei API-Fehler: Fehler loggen, Orchestrator informieren
