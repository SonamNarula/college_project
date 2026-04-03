---
title: "TRACKIFY — Code Walkthrough Part 9"
document: "Use Cases By Page"
version: "1.0"
date: "2026-04-02"
---

## 9. All Use Cases (Page-by-page deep walkthrough)

This section lists every major user use case implemented in the app, and explains the internal flow for each: which page handles the UI, which callback in `App.tsx` persists the change, and what the resulting UI updates.

### 9.1 Dashboard (`Dashboard.tsx`)

#### Use case D-1: View productivity summary

What the user sees:

- Greeting based on current hour.
- Stats grid:
  - tasks completed
  - total study hours
  - day streak
  - applications sent and selected count

Internal flow:

- `Dashboard` receives:
  - `tasks`, `studyLogs`, `placements`, `streak`
- It computes:
  - `completedTasks = tasks.filter(t => t.completed).length`
  - `totalStudyHours = sum(studyLogs.hours)`
  - `last7StudyHours` via slicing last 7 records
  - `selectedPlacements = placements.filter(p => p.status === 'selected').length`

#### Use case D-2: Read AI Productivity Coach insights

What the user sees:

- Card titled “AI Productivity Coach”
- If there is no data:
  - empty state: “No data yet”
- Otherwise:
  - list of strict insights

Internal flow:

- `Dashboard` calls:
  - `generateInsights(tasks, studyLogs, streak)` inside `useMemo`
- It renders each returned string as a numbered list.

#### Use case D-3: Review recent tasks

What the user sees:

- Recent tasks list: last 5 tasks in reverse order (newest first).

Internal flow:

- `Dashboard` takes:
  - `recentTasks = tasks.slice(-5).reverse()`
- For each task:
  - shows a checkbox indicator if completed
  - shows priority badge and title

### 9.2 Task Manager (`TaskManager.tsx`)

TaskManager is centered around CRUD operations for tasks and a filtering UI.

#### Use case T-1: Add a new task

User steps:

1. Enter title
2. Select priority (low/medium/high)
3. Click “Add Task”

Internal flow:

- Local UI state in `TaskManager`:
  - `title`, `priority`
- On click:
  - validates: `if (!title.trim()) return`
  - calls `onAdd(title.trim(), priority)`
- `App.tsx` `handleAddTask()`:
  - constructs a `Task` object:
    - `id`
    - `completed=false`
    - `createdAt = new Date().toISOString()`
  - appends to `trackify-tasks`
  - shows toast message

Result:

- Task appears in list.
- Dashboard stats update immediately due to shared state.

#### Use case T-2: Toggle task completion

User steps:

- Click the circular checkbox button.

Internal flow:

- `TaskManager` calls `onToggle(task.id)`
- `App` updates tasks:
  - `completed: !t.completed`
- toast is not shown here (only list updates).

Result:

- Completed tasks reduce appear as completed:
  - list styling dims
  - title has line-through
- Progress bar updates:
  - progress is computed from completion ratio.

#### Use case T-3: Filter tasks

User steps:

- Click a filter tab:
  - all
  - pending
  - completed

Internal flow:

- Local state `filter` in `TaskManager`
- It computes filtered tasks:
  - pending: `!t.completed`
  - completed: `t.completed`
  - all: no additional condition
- `counts` are computed for showing:
  - `completed` count and total

Result:

- The list and empty state messaging adjust to match the filter.

#### Use case T-4: Delete task

User steps:

- Click the trash icon.

Internal flow:

- `TaskManager` calls `onDelete(task.id)`
- `App`:
  - finds the task by id (for message)
  - filters it out from tasks array
  - shows toast

Result:

- Task removed from list and reflected on dashboard.

### 9.3 Study Tracker (`StudyTracker.tsx`)

StudyTracker handles habit-like tracking with a streak mechanism.

#### Use case S-1: Log a study session (add or merge)

User steps:

1. Pick a date (max is today)
2. Enter hours (>0)
3. Enter DSA questions (optional)
4. Click “Log Session”

Internal flow:

- Local state in `StudyTracker`:
  - `date`, `hours`, `dsa` are strings until parsed
- Validation:
  - `if (!date || isNaN(h) || h <= 0) return`
  - `dsa` parsed into integer; if NaN => 0
- Calls `onAddLog(date, h, d)`

`App.tsx` `handleAddStudyLog()`:

- Checks if a log already exists for the date.
- If it exists:
  - merges by adding hours + DSA to that record.
- If it doesn’t:
  - appends new `StudyLog`.

Toast feedback:

- “Session updated for <date>” or “Study session logged: <hours>h”.

#### Use case S-2: Streak updates (daily discipline)

When (implemented):

- Only streak changes when the logged `date` equals *today*.

Internal flow:

- In App handler:
  - compute `today` and `yesterday` keys
  - if `date===today`:
    - if lastStudyDate===yesterday:
      - `streak = streak + 1`
      - `lastStudyDate = today`
    - if lastStudyDate!==today and !==yesterday:
      - `streak = 1`
      - `lastStudyDate=today`
    - if lastStudyDate===today:
      - streak unchanged

Result:

- A “Day Streak 🔥” banner on StudyTracker and Dashboard.

#### Use case S-3: Delete a study log

User steps:

- Click trash icon in the study log table.

Internal flow:

- Calls `onDeleteLog(date)`
- `App.tsx` filters `studyLogs` to remove log for date.
- toast shows “Study log removed”.

Important note (limitations):

- The current implementation deletes the record but does not recompute streak/lastStudyDate.
- This can create an “inconsistent streak” edge case (addressed later in the quality review).

### 9.4 Placement Tracker (`PlacementTracker.tsx`)

PlacementTracker is a pipeline manager with statuses and optional notes.

#### Use case P-1: Add an application

User steps:

1. Enter `company` and `role`
2. Choose status (default “applied”)
3. Optionally enter `notes`
4. Click “Add Application”

Internal flow:

- Local state: company/role/status/notes.
- Validation:
  - ignore add if company or role is empty after trimming.
- Calls `onAdd(company.trim(), role.trim(), status, notes.trim())`
- `App` handler:
  - constructs `PlacementApp` with:
    - `appliedDate = new Date().toISOString()`
  - appends to `placements`
  - toast “Application added: <company>”

#### Use case P-2: Update status of an application

User steps:

- Use the dropdown on each placement item to change:
  - applied -> interview -> selected/rejected, etc.

Internal flow:

- `PlacementTracker` calls `onUpdateStatus(app.id, newStatus)`
- `App` maps placements:
  - updates status for matching id
- Special toast:
  - if status is 'selected': congratulatory toast

#### Use case P-3: Filter by placement status

User steps:

- Click on the top summary cards:
  - applied/interview/selected/rejected
- Clicking a selected card toggles filter back to all.

Internal flow:

- local state `filterStatus` is either:
  - `'all'` or a specific `PlacementStatus`
- list is rendered from:
  - all placements or filtered subset

#### Use case P-4: Delete an application

User steps:

- Click trash icon on each placement card.

Internal flow:

- `PlacementTracker` calls `onDelete(app.id)`
- `App` filters out placement by id and toasts.

### 9.5 Analytics (`Analytics.tsx`)

Analytics gives charts and summary metrics for stored tasks/study/placements.

#### Use case A-1: View weekly study hours

- Shows bar chart for last 7 day hours.
- If there are no study logs:
  - shows empty state card.

#### Use case A-2: View last 7 days DSA trend

- Shows line chart with fill.
- Uses 0 defaults for missing days.

#### Use case A-3: View task priority distribution

- Doughnut chart:
  - low / medium / high task counts.
- Empty state if tasks length is 0.

#### Use case A-4: View placement status distribution

- Doughnut chart:
  - applied/interview/selected/rejected counts.
- Empty state if placements length is 0.

Theme handling:

- Analytics reads `data-theme` to set grid and label colors and ensure contrast.

---

## 9.6 “Cross-page” use cases (shared outcomes)

Some actions impact multiple pages:

- Adding a task updates:
  - Dashboard stats
  - Task list and progress
  - Analytics doughnut (task priority)
- Logging study updates:
  - Dashboard study hours + AI insights
  - StudyTracker totals + streak banner
  - Analytics study/DSA charts
- Adding/updating placements updates:
  - Dashboard applications count and selected count
  - PlacementTracker list and status summaries
  - Analytics placement doughnut

