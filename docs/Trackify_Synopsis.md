---
title: "TRACKIFY — Student Productivity & Placement Tracker"
document: "Project Synopsis"
version: "1.0"
tech_stack: "React 18, TypeScript, Vite 5, Chart.js 4, react-chartjs-2"
storage: "Browser localStorage (offline-first, no backend)"
---

## Certificate / Declaration (Synopsis)

This synopsis is prepared for the academic mini/major project **“Trackify — Student Productivity & Placement Tracker”**. The contents describe the problem statement, objectives, scope, methodology, and high-level system design corresponding to the implemented project.

---

## Abstract

Students preparing for internships and placements typically manage **tasks**, **study hours**, **DSA practice**, and **application tracking** using scattered tools (notes, spreadsheets, calendars, chat reminders). This fragmentation causes inconsistent execution, loss of progress history, and reduced visibility into whether daily actions align with placement goals.

**Trackify** is a premium, no-fluff, offline-first web application that consolidates student productivity and placement preparation into one dashboard. The system provides:

- A **Task Manager** with priority tagging, pending/completed views, progress indicators, and quick actions.
- A **Study Tracker** for logging study hours and DSA questions solved per date, with **streak tracking** to support discipline and consistency.
- A **Placement Tracker** for managing job applications with color-coded status stages (applied/interview/selected/rejected) and notes.
- An **Analytics module** using Chart.js dashboards (bar/line/doughnut) that visualizes weekly study hours, DSA progress, task priority distribution, and placement status distribution.
- A lightweight **AI Productivity Coach** that generates strict, rule-based insights from recent activity, without calling any external APIs—ensuring privacy and offline availability.

Trackify uses **React + TypeScript** and stores all data in **browser `localStorage`**, avoiding backend dependency while still offering persistence and fast interactions.

---

## Problem Statement

Placement preparation requires sustained daily execution. However, students face common issues:

- No unified view of tasks, study effort, DSA progress, and placement applications.
- Lack of measurable discipline metrics (e.g., streaks, active days).
- Difficulty identifying weak areas early (e.g., too many pending tasks, low DSA frequency).
- Tools that require internet connectivity or complex setup, discouraging consistent usage.

**Goal:** Build a simple, offline-first application that helps students plan, execute, and track placement preparation with clear metrics, visual analytics, and actionable insights.

---

## Objectives

### Primary objectives

- Provide a **single dashboard** summarizing productivity and placement preparation.
- Enable **task tracking** with priorities and completion rate visibility.
- Enable **study logging** with hours and DSA questions, including streak computation.
- Enable **placement application tracking** with status updates and quick filtering.
- Provide **visual analytics** for quick understanding of performance trends.

### Secondary objectives

- Provide **dark/light theme** with persistent preference.
- Provide **feedback UX** via toast notifications.
- Provide strict, deterministic **AI-like coaching** without external APIs to maintain privacy.
- Keep the application **fast, responsive, and deployable as a static site**.

---

## Scope of the Project

### In scope

- Frontend-only web application.
- Offline-first persistence using `localStorage`.
- Task management: create, view, filter, mark complete/incomplete, delete.
- Study logs: add/update sessions per date, compute total hours, average hours/day, active days, DSA totals, and streaks.
- Placement applications: add, update status, delete, filter by status.
- Analytics: last 7 days charts + distribution charts.
- AI coach: rule-based insights derived from tasks, study logs, and streak.

### Out of scope (future enhancements)

- Multi-device sync and authentication.
- Cloud database and shared access.
- Timers / pomodoro tracking.
- Export to PDF/CSV and calendar integrations.
- Recommendation engine using ML models and external APIs.

---

## Proposed Solution (Overview)

Trackify is designed as a modular single-page app:

- **App Shell:** Sidebar + Header + Page container + Toast layer.
- **Pages:** Dashboard, Task Manager, Study Tracker, Placement Tracker, Analytics.
- **Utilities:** local storage hook, insight generator (rules).
- **Styling:** global theme system based on CSS variables and `data-theme`.

The application prioritizes clarity and speed:

- All CRUD actions are local and immediate.
- Analytics are computed in-memory from stored records.
- UI feedback is provided via short-lived toasts.

---

## System Requirements

### Hardware requirements (minimum)

- Any laptop/desktop capable of running a modern web browser.
- 2 GB RAM (practical minimum for smooth browser usage).

### Software requirements

- **Runtime (User):** Modern browser (Chrome/Edge/Firefox/Safari).
- **Development:**
  - Node.js 18+ recommended
  - npm

---

## Methodology

Trackify follows an iterative UI-first development approach:

- **Requirement gathering:** Identify essential placement-prep workflows (tasks, study, placements).
- **UI design:** Sidebar navigation, responsive layouts, theme system.
- **Core features:** Implement CRUD flows for tasks, study logs, placements.
- **Persistence:** Add `useLocalStorage` to store state reliably.
- **Analytics:** Add Chart.js charts with theme-aware styling.
- **Insights:** Implement deterministic AI coach rules based on recent logs and completion rates.
- **Testing:** Manual testing of flows (add/update/delete/filter) and edge cases (empty state, invalid input, streak rules).

---

## High-Level Architecture

### Architectural style

- **Client-side SPA** (Single Page Application)
- **Component-based UI** (React)
- **Local persistence layer** (`localStorage`)
- **Pure functions** for derived insights and analytics

### Modules

- **UI Components:** `Sidebar`, `Header`, `StatCard`, `Toast`, `EmptyState`
- **Pages:** `Dashboard`, `TaskManager`, `StudyTracker`, `PlacementTracker`, `Analytics`
- **Hooks:** `useLocalStorage`
- **Business logic:** `generateInsights` (AI coach rules)

---

## Data Design (localStorage schema)

Trackify persists data using the following keys:

- `trackify-dark`: boolean (theme)
- `trackify-tasks`: array of `Task`
- `trackify-study`: array of `StudyLog`
- `trackify-placements`: array of `PlacementApp`
- `trackify-streak`: number
- `trackify-last-study`: string date (`YYYY-MM-DD`)

### Core entity summary

- **Task**
  - `id`, `title`, `priority`, `completed`, `createdAt`
- **StudyLog**
  - `date`, `hours`, `dsaQuestions`
- **PlacementApp**
  - `id`, `company`, `role`, `status`, `appliedDate`, `notes`

---

## Key Features (Brief)

### Dashboard

- Greeting, date, quick stats.
- AI coach insights.
- Recent tasks list.

### Task Manager

- Add tasks with priority.
- Filter: all/pending/completed.
- Progress bar and completion ratio.

### Study Tracker

- Log study sessions by date.
- Streak banner + totals and averages.
- Activity table with performance indicator.

### Placement Tracker

- Add and manage applications.
- Status updates and filter-by-status.
- Summary cards for each status.

### Analytics

- Weekly study hours bar chart.
- DSA last 7 days line chart.
- Task priority distribution doughnut chart.
- Placement status distribution doughnut chart.

---

## Expected Outcome

Trackify is expected to help students:

- Maintain daily discipline (streak-based tracking).
- Reduce procrastination by prioritizing and completing tasks.
- Track placement applications in a structured way.
- Identify performance gaps early through charts and strict insights.

---

## Conclusion

Trackify provides a practical, offline-first solution for student productivity and placement tracking. By combining planning (tasks), execution tracking (study logs + streaks), outcome tracking (placements), and analytics (charts + AI coach rules), it delivers a single system that encourages consistent progress toward placement goals.

---

## References

- React documentation (conceptual usage)
- TypeScript documentation (typing)
- Vite documentation (build tooling)
- Chart.js documentation (charts)

