---
title: "TRACKIFY — Student Productivity & Placement Tracker"
document: "Project Report — Part 3"
sections: ["Implementation details", "Algorithms", "Key screens", "Storage handling", "Charts"]
version: "1.0"
date: "2026-04-02"
---

## Table of Contents (Part 3)

- 8. Implementation  
  - 8.1 Technology stack and rationale  
  - 8.2 Core implementation flow  
  - 8.3 Theme handling  
  - 8.4 Persistence with `useLocalStorage`  
  - 8.5 Task module implementation  
  - 8.6 Study module implementation + streak algorithm  
  - 8.7 Placement module implementation  
  - 8.8 Analytics implementation (Chart.js)  
  - 8.9 AI Productivity Coach rules implementation  
  - 8.10 Build and deployment  

---

## 8. Implementation

### 8.1 Technology stack and rationale

- **React 18**: component-based, fast UI development and composability.
- **TypeScript**: reduces runtime bugs by ensuring strong typing for entities (Task, StudyLog, PlacementApp).
- **Vite 5**: fast dev server, modern build pipeline, small bundles for static deployment.
- **Chart.js 4 + react-chartjs-2**: mature charting with good performance for small datasets.
- **CSS variables**: consistent theme system and easy dark/light switching.
- **localStorage**: simplest offline persistence with zero backend.

### 8.2 Core implementation flow (App controller)

Trackify uses `App.tsx` as the controller:

- Maintains application state:
  - theme (`trackify-dark`)
  - current page (`page`)
  - datasets: tasks, study logs, placements
  - streak values
  - toasts
- Passes state and handlers into pages
- Renders layout shell: Sidebar + Header + Current Page + Toast container

This ensures a single source of truth for persisted state.

### 8.3 Theme handling (dark/light)

Theme is controlled by a boolean `isDark` persisted in localStorage:

1. Read `trackify-dark` on load
2. Set `data-theme` attribute on `<html>`
3. Toggle via header button

**Implementation behavior**

- `data-theme="dark"` triggers a CSS variable override block.
- Both themes share identical layout rules; only colors change.

### 8.4 Persistence with `useLocalStorage`

The custom hook provides typed storage:

- Initializes value from `window.localStorage.getItem(key)`
- Parses JSON; on error returns `initialValue`
- When setting:
  - updates React state
  - serializes JSON into localStorage

**Why this is effective**

- Eliminates repetitive boilerplate in pages
- Ensures persistence is automatic and consistent
- Allows functional set patterns (`setValue(prev => next)`)

### 8.5 Task module implementation

#### 8.5.1 Add task algorithm

Input:

- title (string)
- priority (`low | medium | high`)

Process:

1. Validate non-empty title
2. Create `Task` object:
   - `id` generated using random base36 slice
   - `createdAt` set to current ISO timestamp
   - `completed = false`
3. Append to tasks array (persisted)
4. Trigger toast: `Task added`

Output:

- Updated `tasks` in localStorage + UI refreshed

#### 8.5.2 Toggle complete algorithm

1. Find task by id
2. Flip `completed` boolean
3. Persist and re-render

#### 8.5.3 Filter logic

UI filters tasks into:

- all
- pending (`completed === false`)
- completed (`completed === true`)

Counts are computed dynamically for display and progress computation.

#### 8.5.4 Progress bar computation

\[
progress(\%) = \frac{completedCount}{totalCount} \times 100
\]

The progress bar only appears when there is at least one task.

### 8.6 Study module implementation + streak algorithm

#### 8.6.1 Add study log algorithm

Inputs:

- `date` (YYYY-MM-DD)
- `hours` (number > 0)
- `dsaQuestions` (integer, optional)

Process:

1. Validate:
   - `hours` numeric and > 0
2. Check if a log already exists for the selected date:
   - If yes, update that record by adding hours and DSA counts
   - If no, append a new record
3. Show toast feedback:
   - “Session updated” or “Study session logged”
4. Apply streak update rules (if date is today)

#### 8.6.2 Streak computation (implemented rule)

Definitions:

- `today = current system date (YYYY-MM-DD)`
- `yesterday = today - 1 day`
- `lastStudyDate = persisted value`
- `streak = persisted value`

Rule:

- Only update streak when logging for `today`
- If `lastStudyDate === today`: do nothing
- Else if `lastStudyDate === yesterday`: `streak = streak + 1`, set `lastStudyDate = today`
- Else: `streak = 1`, set `lastStudyDate = today`

This prevents multiple increments in a single day and resets streak after gaps.

#### 8.6.3 Study summaries

Computed values displayed on Study Tracker:

- Total hours: sum of `hours`
- Total DSA: sum of `dsaQuestions`
- Avg hours/day: totalHours / totalDaysLogged (rounded to 1 decimal)
- Active days: number of logs

#### 8.6.4 Performance label (table)

Based on `log.hours`:

- >= 4: Excellent
- >= 2: Good
- < 2: Low

### 8.7 Placement module implementation

#### 8.7.1 Add application algorithm

Inputs:

- company, role (required)
- status (default “applied”)
- notes (optional)

Process:

1. Validate company and role non-empty
2. Create `PlacementApp`:
   - `id`
   - `appliedDate` ISO timestamp
3. Append to placements array (persisted)
4. Toast: “Application added”

#### 8.7.2 Update status algorithm

1. Locate application by `id`
2. Update status field
3. Persist to localStorage
4. Toast feedback (special congratulation on “selected”)

#### 8.7.3 Filter-by-status

User can filter by:

- all
- applied
- interview
- selected
- rejected

Counts are computed for display in summary cards.

### 8.8 Analytics implementation (Chart.js)

Charts rendered:

- Weekly study hours (bar)
- DSA last 7 days (line, filled)
- Task priorities (doughnut)
- Placement statuses (doughnut)

#### 8.8.1 Last 7 days extraction

The analytics page constructs an array for the past 7 days:

1. For each day \(i = 6 \rightarrow 0\):
   - compute date key \(today - i\)
   - find matching StudyLog (if any)
   - push `{ label, hours, dsa }` with 0 default

This ensures charts always show a full 7-day window even when logs are missing.

#### 8.8.2 Theme-aware chart options

The chart grid and label colors adjust based on:

- `document.documentElement.getAttribute('data-theme')`

This keeps chart readability consistent in dark and light themes.

### 8.9 AI Productivity Coach (rule engine)

The AI coach is implemented as deterministic rules producing a list of insights.

#### 8.9.1 Inputs

- tasks array
- studyLogs array
- streak value

#### 8.9.2 Features computed

- completed, pending, completion rate
- high-priority pending count
- last 7 days avg study hours
- active days (in last 7 entries)
- DSA count in recent window
- streak tiers

#### 8.9.3 Output design

- Short, strict statements
- Always returns a list of strings
- No network calls, no APIs, consistent behavior offline

### 8.10 Build and deployment

#### 8.10.1 Development

- Install dependencies: `npm install`
- Run dev server: `npm run dev`

#### 8.10.2 Production build

- Build: `npm run build`
- Preview: `npm run preview`

The output is static, suitable for hosting on any static platform (e.g., Vercel/Netlify/Wasmer).

