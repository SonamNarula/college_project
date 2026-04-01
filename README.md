# Trackify — Khatarnaak Student Productivity & Placement Tracker

> One-page ops center for students gunning placements: strict AI coach, ruthless clarity, zero backend excuses.

**Live now:** https://trackify.wasmer.app

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite) ![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?logo=chartdotjs)

---

## Table of contents
1. [Highlights](#highlights-why-it-slaps)
2. [Screenshots](#screenshots)
3. [Stack](#stack)
4. [How the AI coach thinks](#how-the-ai-coach-thinks)
5. [Run it](#run-it)
6. [Ship it](#ship-it)
7. [Project map](#project-map)
8. [Why it is khatarnaak](#why-it-is-khatarnaak)
9. [Built by](#built-by)

---

## Highlights (why it slaps)
- AI coach calls out weak spots from tasks, study logs, and streaks—no sugar-coating.
- Task pipeline with priorities, filters, toasts, and completion tracking.
- Study + DSA tracker with streak logic and localStorage persistence.
- Placement board with color-coded statuses for quick scans.
- Analytics via Chart.js to surface hours, DSA solved, tasks, and placements.
- Dark/Light themes, responsive layout, instant Vite reloads.

---

## Screenshots
| Dashboard | Analytics |
| --- | --- |
| ![Dashboard](public/screenshots/trackify-dashboard.png) | ![Analytics](public/screenshots/trackify-analytics.png) |
| Tasks & priorities | Placement tracker |
| ![Tasks](public/screenshots/trackify-tasks.png) | ![Placements](public/screenshots/trackify-placement.png) |

---

## Stack
- React 18 + TypeScript + Vite 5
- Chart.js 4 + react-chartjs-2
- CSS Grid + Flexbox with custom properties for theming
- localStorage for persistence (no backend, no setup friction)

---

## How the AI coach thinks
- Location: `src/utils/aiInsights.ts`
- Rules check pending load, completion %, study intensity, active days, and streak length.
- Tone is strict and action-first; outputs short, pointed insights. No external API calls.

---

## Run it
```bash
npm install
npm run dev    # http://localhost:5173
```

---

## Ship it
```bash
npm run build
npm run preview
```

---

## Project map
```
src/
  App.tsx             # Root layout and state
  components/         # Sidebar, Header, StatCard, Toast, EmptyState, AI UI pieces
  pages/              # Dashboard, TaskManager, StudyTracker, PlacementTracker, Analytics
  utils/aiInsights.ts # Rule-based AI coach logic
  styles/global.css   # Themes, layout, component styling
  hooks/useLocalStorage.ts
```

---

## Why it is khatarnaak
- Zero fluff: every screen pushes you to act.
- Data stays local: safe to use in labs, cafes, or on the go.
- Deploy ready: static assets only, runs anywhere a browser does.

---

## Built by
Sonam Narula (JECRC Jaipur) - [GitHub](https://github.com/SonamNarula) | [LinkedIn](https://www.linkedin.com/in/sonam-narula-402a60285/) | [Codolio](https://codolio.com/profile/0PG2lf5S)
