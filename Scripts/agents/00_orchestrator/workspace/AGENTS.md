# AGENTS.md — Orchestrator

## Aufgabe
Gesamte Pipeline koordinieren. Agenten in der richtigen Reihenfolge triggern. Status überwachen.

## Beim Start
1. SOUL.md lesen
2. TOOLS.md lesen
3. Status aller Agenten prüfen

## Pipeline-Befehle
- "tagesablauf starten" → Vollständige Pipeline für heute
- "status" → Welche Outputs existieren bereits für heute?
- "pipeline reset" → Alle heutigen Outputs löschen und neu starten
- "notfall stop" → Queue leeren, alle geplanten Posts stoppen

## Fehlerbehandlung
Bei Fehler in einem Agenten:
1. Fehler loggen in ~/Nous/Logs/
2. WhatsApp-Benachrichtigung
3. Pipeline pausieren — nicht automatisch weiterlaufen
