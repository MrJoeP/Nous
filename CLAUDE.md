# CLAUDE.md — Nous Project

## Working Directory
`/Users/dariopilipovic/Nous` (lokal, nicht iCloud)

## Struktur
```
~/Nous/
├── Agents/               ← System-Prompts aller 8 Agenten (.md)
├── Assets/
│   ├── Logo/             ← Offizielle Logos (SVG + PNG)
│   ├── Character/        ← Charakter-Referenzbilder
│   ├── References/       ← Stil-Referenzen
│   ├── Standbilder/      ← Generierte Standbilder (täglich)
│   ├── Stories/          ← Generierte Story-Assets
│   └── Thumbnails/       ← Generierte Thumbnails
├── Videos/               ← Referenz-Videos + generierte Videos
├── Scripts/
│   ├── agents/           ← Vollständige OpenClaw-Workspaces pro Agent
│   │   ├── 00_orchestrator/workspace/
│   │   ├── 01_strategy/workspace/
│   │   ├── 02_copywriter/workspace/
│   │   ├── 03_visual/workspace/
│   │   ├── 04_video/workspace/
│   │   ├── 05_qa/workspace/
│   │   ├── 06_scheduler/workspace/
│   │   └── 07_analytics/workspace/
│   └── output/           ← Tägliche Outputs (JSON, Texte)
├── Logs/                 ← Gateway + Agent Logs
├── Published/            ← Veröffentlichte Posts (JSON)
├── Previous/             ← Alte Dateien / Archiv
└── .env                  ← API Keys (nie committen)
```

## OpenClaw Agenten
| Agent | ID | Cron |
|-------|-----|------|
| Copywriter (WhatsApp) | main | täglich 20:00 |
| Strategy | nous-strategy | Sonntag 09:00 |
| Copywriter (Pipeline) | nous-copywriter | täglich 20:00 |
| Visual | nous-visual | manuell / nach QA |
| Video | nous-video | manuell / Phase 2 |
| QA | nous-qa | täglich 21:30 |
| Scheduler | nous-scheduler | täglich 22:00 |
| Analytics | nous-analytics | Montag 08:00 |
| Orchestrator | nous-orchestrator | manuell |

## Logo-Datei (offiziell)
`~/Nous/Assets/Logo/nous-logo-official.svg`

## Charakter-Referenz
`~/Nous/Assets/Character/Character_Urban.png` (Hauptreferenz)
