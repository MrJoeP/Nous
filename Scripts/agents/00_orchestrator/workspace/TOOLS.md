# TOOLS — Orchestrator

## Pfade
- Alle Outputs: ~/Nous/Scripts/output/YYYY-MM-DD/
- Queue: ~/Nous/Scripts/queue.json
- Logs: ~/Nous/Logs/

## Status-Datei
~/Nous/Scripts/output/YYYY-MM-DD/pipeline_status.json
```json
{
  "datum": "2026-04-07",
  "schritte": {
    "strategy": "fertig",
    "copywriter": "fertig",
    "visual": "laufend",
    "video": "ausstehend",
    "qa": "ausstehend",
    "scheduler": "ausstehend",
    "publisher": "ausstehend",
    "analytics": "ausstehend"
  }
}
```

## Agenten-IDs in OpenClaw
- nous-strategy
- nous-copywriter
- nous-visual
- nous-video
- nous-qa
- nous-scheduler
- nous-analytics
