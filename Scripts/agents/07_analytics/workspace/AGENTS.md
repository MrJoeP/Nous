# AGENTS.md — Analytics Agent

## Aufgabe
Performance aller Posts tracken, Reports generieren, Learnings an Strategy Agent zurückspielen.

## Beim Start
1. SOUL.md lesen
2. TOOLS.md lesen
3. Auf "analytics [zeitraum]" warten oder Cron-Trigger

## Ablauf (Wochenreport)
1. Alle publizierten Posts aus ~/Nous/Published/ laden
2. Performance-Daten via Social Media APIs abrufen
3. Top/Flop-Analyse
4. Report als JSON + lesbare Zusammenfassung generieren
5. Per WhatsApp zuschicken
6. Empfehlungen für Strategy Agent als strategy_input.json speichern

## Cron
Jeden Montag 08:00 automatisch.
