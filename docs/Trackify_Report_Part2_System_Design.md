---
title: "TRACKIFY — Student Productivity & Placement Tracker"
document: "Project Report — Part 2"
sections: ["Architecture", "Module Design", "Data Design", "UML/DFD", "UI/UX Design"]
version: "1.0"
date: "2026-04-02"
---

## Table of Contents (Part 2)

- 7. System Design  
  - 7.1 Architecture  
  - 7.2 Module decomposition  
  - 7.3 Data design and localStorage schema  
  - 7.4 UML (conceptual)  
  - 7.5 DFD (conceptual)  
  - 7.6 UI/UX design  

---

## 7. System Design

### 7.1 High-level architecture

Trackify uses a **frontend-only** architecture that runs entirely in the browser:

- **Presentation**: React components and pages
- **State + persistence**: React state stored via a `useLocalStorage` hook
- **Business logic**: deterministic AI insights rules + derived analytics computations
- **Visualization**: Chart.js charts through `react-chartjs-2`

#### Architecture diagram (conceptual)

```
 +-------------------------------+
 |            Browser            |
 |-------------------------------|
 |  React SPA (Trackify)         |
 |   - App shell (Sidebar/Header)|
 |   - Pages (Dashboard, etc.)   |
 |   - Components (Toast, cards) |
 |   - Utils (AI rules)          |
 |-------------------------------|
 |  localStorage persistence     |
 +-------------------------------+
```

### 7.2 Module decomposition

Trackify is organized into modules that map directly to the UI and business needs:

#### 7.2.1 Pages

- **Dashboard**
  - Computes summary stats (tasks completed, study hours, streak, applications)
  - Displays AI coach insights
  - Lists recent tasks
- **Task Manager**
  - Adds tasks with priority
  - Filters tasks (all/pending/completed)
  - Shows completion ratio and progress bar
- **Study Tracker**
  - Logs daily sessions (hours + DSA)
  - Maintains streak logic
  - Shows totals, averages, and a table of sessions
- **Placement Tracker**
  - Tracks applications with status pipeline and notes
  - Shows counts and allows filtering
  - Allows status updates and deletion
- **Analytics**
  - Shows charts for:
    - weekly study hours (bar)
    - DSA last 7 days (line)
    - task priority distribution (doughnut)
    - placement status distribution (doughnut)

#### 7.2.2 Reusable components

- `Sidebar`: navigation panel with icons and active highlight
- `Header`: page title + subtitle + theme toggle + mobile menu
- `StatCard`: reusable metric card on Dashboard
- `Toast`: transient feedback messages for actions
- `EmptyState`: consistent UI when no data exists

#### 7.2.3 Hooks and utilities

- `useLocalStorage`: typed persistence helper for React state
- `generateInsights`: deterministic “AI coach” rules engine

### 7.3 Data design and persistence

#### 7.3.1 Entities (data models)

**Task**

| Field | Type | Meaning |
|------|------|---------|
| id | string | unique id |
| title | string | task title |
| priority | 'low' \| 'medium' \| 'high' | priority level |
| completed | boolean | completion flag |
| createdAt | string (ISO) | creation timestamp |

**StudyLog**

| Field | Type | Meaning |
|------|------|---------|
| date | string (YYYY-MM-DD) | day |
| hours | number | hours studied |
| dsaQuestions | number | DSA questions solved |

**PlacementApp**

| Field | Type | Meaning |
|------|------|---------|
| id | string | unique id |
| company | string | company name |
| role | string | role title |
| status | 'applied' \| 'interview' \| 'selected' \| 'rejected' | pipeline stage |
| appliedDate | string (ISO) | date created |
| notes | string | optional notes |

#### 7.3.2 localStorage schema

The application stores data in these `localStorage` keys:

| Key | Type | Description |
|-----|------|-------------|
| `trackify-dark` | boolean | theme preference |
| `trackify-tasks` | Task[] | all tasks |
| `trackify-study` | StudyLog[] | study logs |
| `trackify-placements` | PlacementApp[] | placement applications |
| `trackify-streak` | number | current streak |
| `trackify-last-study` | string | last date counted for streak |

#### 7.3.3 Data flow rationale

- All write operations update React state and persist to `localStorage`.
- Derived values (counts, totals, charts) are computed from state, ensuring:
  - no duplication of derived data in storage,
  - fewer consistency bugs,
  - predictable UI behavior.

### 7.4 UML diagrams (conceptual, academic representation)

#### 7.4.1 Use case diagram (textual)

**Actor:** Student  
**Use cases:**

- View Dashboard
- Manage Tasks
  - Add task
  - Toggle completion
  - Filter tasks
  - Delete task
- Manage Study Logs
  - Add/update log
  - View summaries
  - Maintain streak
  - Delete log
- Manage Placements
  - Add application
  - Update status
  - Filter by status
  - Delete application
- View Analytics
- Switch theme (dark/light)

#### 7.4.2 Class diagram (conceptual)

```
 +------------------+       +------------------+       +-------------------+
 | Task             |       | StudyLog         |       | PlacementApp      |
 |------------------|       |------------------|       |-------------------|
 | id: string       |       | date: string     |       | id: string        |
 | title: string    |       | hours: number    |       | company: string   |
 | priority: enum   |       | dsaQuestions: n  |       | role: string      |
 | completed: bool  |       +------------------+       | status: enum      |
 | createdAt: str   |                                 | appliedDate: str  |
 +------------------+                                 | notes: string     |
                                                      +-------------------+

 App aggregates:
  - tasks: Task[]
  - studyLogs: StudyLog[]
  - placements: PlacementApp[]
  - streak: number
  - theme: boolean
```

#### 7.4.3 Sequence diagram (Study log add — conceptual)

1. Student enters date, hours, DSA and clicks “Log Session”
2. Study page calls `onAddLog(date, hours, dsa)`
3. App updates:
   - studyLogs (merge or append)
   - streak / lastStudyDate (rules)
   - toast notification
4. UI re-renders summaries, streak, and table

### 7.5 DFD (Data Flow Diagram) — conceptual

#### 7.5.1 Level 0 (Context)

```
 Student  <---->  Trackify System  <---->  localStorage
```

#### 7.5.2 Level 1 (Major processes)

- P1: Task management
- P2: Study logging + streak computation
- P3: Placement application tracking
- P4: Analytics computation and visualization
- P5: AI insights generation

#### Level 1 flow (text)

- Student inputs tasks/logs/applications → system validates → state updates → persisted in localStorage
- Dashboard/Analytics read persisted data → compute metrics → display to student

### 7.6 UI/UX design

#### 7.6.1 Layout

- Persistent **Sidebar** on desktop; slide-in on mobile.
- **Header** displays page title/subtitle + theme toggle.
- Main page content uses card-based layout for readability.

#### 7.6.2 Theme system

- Implemented using CSS custom properties (`--bg`, `--card`, `--text-primary`, etc.).
- Dark mode activated by `data-theme="dark"` on `document.documentElement`.
- Theme persisted via `trackify-dark`.

#### 7.6.3 UX patterns implemented

- Empty states for all primary pages and chart panels.
- Toast notifications for CRUD actions (success/info/error).
- Consistent card styles, spacing, and typography.
- Responsive layouts for mobile (sidebar overlay, grid collapse).

#### 7.6.4 Accessibility considerations

- Buttons have `aria-label` where appropriate (delete actions, menu toggle).
- Color coding is supported with text labels; charts include legends.

