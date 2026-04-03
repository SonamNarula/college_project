# Trackify — Student Productivity & Placement Tracker

**Built Different · No BS · Pure Grind Mode**

[![Live Demo](https://img.shields.io/badge/🔥_LIVE_NOW-trackify.wasmer.app-6aa7ab?style=for-the-badge&logo=vercel&logoColor=white)](https://trackify.wasmer.app)
[![Repo](https://img.shields.io/badge/GitHub-college__project-181717?style=for-the-badge&logo=github)](https://github.com/SonamNarula/college_project)
[![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

<p align="center">
  <img src="https://skillicons.dev/icons?i=cpp,js,ts,html,css,react,nodejs,express,mongodb,tailwind,redux,vite,git,github,postman,docker,firebase,figma,vercel,linux&perline=10" alt="Tech badge wall" />
</p>

> Premium, no-fluff dashboard that keeps students on track for placements with ruthless clarity, AI insights, and visual analytics — all offline-first.

---

## What makes it premium

- **AI coach, no APIs:** Strict, rule-based insights that call out weak spots from tasks, study logs, and streaks — runs 100% in-browser.
- **Placement radar:** Color-coded status board to scan applications in seconds.
- **Study + DSA discipline:** Streak-aware logging with toast feedback and persistence.
- **Truthful analytics:** Chart.js dashboards for hours, DSA solved, tasks, and placements.
- **Instant UX:** Vite hot reloads, dark/light themes, fully responsive layouts.
- **Zero backend:** Everything in `localStorage`; deploy anywhere static (Wasmer/Vercel/Netlify).

---

## Visual tour (every screen, with headings)

![Dashboard Dark](public/screenshots/ss1.jpeg)

![Dashboard Light](public/screenshots/ss4.jpeg)

![Task Manager All](public/screenshots/ss3.jpeg)

![Task Manager Progress](public/screenshots/ss5.jpeg)

![Task Manager Views](public/screenshots/ss2.jpeg)

![Analytics Light](public/screenshots/ss6.jpeg)

![Study Tracker Light](public/screenshots/ss8.jpeg)

![Study Tracker Dark](public/screenshots/ss9.jpeg)

![Coach + Charts](public/screenshots/ss7.jpeg)

---

## Feature set

- **Dashboard:** Time-based greeting, stats, AI coach notes.
- **Task Manager:** Priorities, filters, completion tracking, toast alerts.
- **Study Tracker:** Hours + DSA questions with streak logic and reset rules.
- **Placement Tracker:** Quick status updates, color-coded cards.
- **Analytics:** Bar/Line/Doughnut charts via Chart.js (react-chartjs-2).
- **Theming:** Dark/Light with CSS custom properties and localStorage persistence.

---

## How the AI coach thinks

- Location: `src/utils/aiInsights.ts`
- Rules check: pending load, completion %, study intensity, active days, streak length.
- Output: short, pointed, slightly strict; zero external requests.

---

## Quickstart

```bash
git clone https://github.com/SonamNarula/college_project.git
cd college_project
npm install
npm run dev    # http://localhost:5173
```

### Production

```bash
npm run build
npm run preview
```

Node 18+ recommended.

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

## Deployment

- Static build; host on Wasmer (live demo), Vercel, Netlify, or any static server.
- Assets in `public/`; no server env vars needed.

---

## Docs (report + synopsis)

- `docs/Trackify_Report.md` is the index for the full academic report (dated 2026-04-02) and points to Parts 1–6 for printing/merging.
- Individual parts (`docs/Trackify_Report_Part1_...md` → `Part6`) are split for easier editing and PDF export; total length targets 50–70 pages with 12pt/1.5 spacing.
- `docs/Trackify_Synopsis.md` contains the abstract, objectives, scope, and system overview for quick submissions.
- Open any Markdown file in your editor/viewer and export to PDF when needed; no external assets or build steps are required.

---

## Connect

- [![Live Demo](https://img.shields.io/badge/Live_Demo-trackify.wasmer.app-2563EB?style=for-the-badge&logo=vercel&logoColor=white&labelColor=1F2937)](https://trackify.wasmer.app)
- [![Email](https://img.shields.io/badge/Email-sonamnarula2108%40gmail.com-E4572E?style=for-the-badge&logo=minutemailer&logoColor=white&labelColor=4B5563)](mailto:sonamnarula2108@gmail.com)
- [![LinkedIn](https://img.shields.io/badge/LinkedIn-Sonam_Narula-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=4B5563)](https://www.linkedin.com/in/sonam-narula-402a60285/)
- [![Instagram](https://img.shields.io/badge/Instagram-@sonamnarula-E4405F?style=for-the-badge&logo=instagram&logoColor=white&labelColor=4B5563)](https://www.instagram.com/sonamnarula/)
- [![Codolio](https://img.shields.io/badge/Codolio-Portfolio-5FB3B5?style=for-the-badge&logo=readthedocs&logoColor=white&labelColor=4B5563)](https://codolio.com/profile/0PG2lf5S)
- [![GitHub](https://img.shields.io/badge/GitHub-@SonamNarula-111827?style=for-the-badge&logo=github&logoColor=white&labelColor=4B5563)](https://github.com/SonamNarula)

If this helps your grind, drop a ⭐ on the repo.
