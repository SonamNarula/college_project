# Trackify - Khatarnaak Student Productivity & Placement Tracker

> One-page ops center for students gunning placements: strict AI coach, ruthless clarity, zero backend excuses.

**Live now:** https://trackify.wasmer.app

---

## Highlights (why it slaps)
- AI coach that calls out weak spots from your data (tasks, study logs, streaks).
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
| Tasks and priorities | Placement tracker |
| ![Tasks](public/screenshots/trackify-tasks.png) | ![Placements](public/screenshots/trackify-placement.png) |

---

## Stack
- React 18 + TypeScript + Vite 5
- Chart.js 4 + react-chartjs-2
- CSS Grid + Flexbox with custom properties for theming
- localStorage for persistence (no backend, no setup friction)

---

## How the AI coach thinks
- File: `src/utils/aiInsights.ts`
- Rules check pending load, completion %, study intensity, active days, and streak length.
- Tone is strict and action-first; outputs short, pointed insights. No external API calls.

---

## Run it
```bash
npm install
npm run dev    # http://localhost:5173
```

### Ship it
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
