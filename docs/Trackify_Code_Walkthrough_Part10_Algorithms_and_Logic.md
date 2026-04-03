---
title: "TRACKIFY — Code Walkthrough Part 10"
document: "Algorithms and Logic"
version: "1.0"
date: "2026-04-02"
---

## 10. Algorithms and Internal Logic (What the code actually computes)

This section documents the key “logic blocks”:

- streak computation
- study log merge behavior
- analytics “last 7 days” extraction
- AI coach insights generation
- progress and totals calculations

### 10.1 Task completion metrics

Where:

- `Dashboard.tsx`
- `TaskManager.tsx`
- `Analytics.tsx`

Definitions:

- `completedTasks = tasks where completed=true`
- `pendingTasks = tasks where completed=false`
- completion rate:
  - `completionRate = completedCount / totalCount`

UI computation examples:

- Dashboard stat card:
  - value = completedTasks
  - trend = pending count
- TaskManager progress bar width:
  - `width% = (completed / total) * 100`

### 10.2 Study log merge and totals

Where:

- `App.tsx` `handleAddStudyLog(date, hours, dsaQuestions)`

Merge rule:

- If there is already a log with `l.date === date`:
  - update it:
    - `l.hours = l.hours + hours`
    - `l.dsaQuestions = l.dsaQuestions + dsaQuestions`
- Else:
  - append a new record `{date, hours, dsaQuestions}`

Totals displayed:

- Total hours:
  - sum of all `studyLogs.hours`
- Total DSA:
  - sum of all `studyLogs.dsaQuestions`
- Average hours/day:
  - `totalHours / number_of_sessions`
- The UI also uses a performance label:
  - `Excellent` if hours >= 4
  - `Good` if hours >= 2
  - `Low` otherwise

### 10.3 Streak algorithm (discipline engine)

Where:

- `App.tsx` inside `handleAddStudyLog`

Variables:

- `today` = new Date().toISOString().split('T')[0]
- `yesterday` = new Date(Date.now() - 86400000).toISOString().split('T')[0]
- `lastStudyDate` stored in localStorage
- `streak` stored in localStorage

Rule:

- Only if user logs for `date === today`:
  - If `lastStudyDate === today`: streak unchanged (prevents double counting)
  - Else if `lastStudyDate === yesterday`:
    - streak increments by 1
    - set `lastStudyDate = today`
  - Else:
    - streak resets to 1
    - set `lastStudyDate = today`

Interpretation:

- The streak reflects consecutive days with at least one log.

### 10.4 Analytics extraction: last 7 days

Where:

- `Analytics.tsx`

Extraction:

- For i = 6 down to 0:
  - build date key `YYYY-MM-DD` for (today - i days)
  - search `studyLogs.find(l => l.date === key)`
  - if missing, use 0 defaults for hours and dsa

Output:

- bar chart uses:
  - labels = weekday short names
  - data = hours values array length 7
- line chart uses:
  - data = DSA values array length 7

Theme-aware options:

- chart tick label colors and grid colors depend on the current `data-theme` attribute.

### 10.5 Doughnut distributions

Task priority doughnut:

- counts:
  - low: tasks where priority==='low'
  - medium: tasks where priority==='medium'
  - high: tasks where priority==='high'

Placement status doughnut:

- counts:
  - applied / interview / selected / rejected from placements by status

### 10.6 AI coach insights: deterministic rules engine

Where:

- `src/utils/aiInsights.ts` `generateInsights(tasks, studyLogs, streak)`

Key property:

- It returns a list of strings (insights).
- It does not call any external services.

#### 10.6.1 Task insight rules

- If no tasks:
  - “No tasks added yet…” (push to add at least 3 tasks)
- Else if high-priority pending > 2:
  - warn that too many high-priority tasks remain
- Else if pending tasks > 6:
  - warns user is over-scheduling
- Else if completion rate < 0.4 and tasks.length > 3:
  - emphasizes follow-through gap
- Else if completion rate >= 0.85:
  - encourages tackling challenging tasks, not only easy wins
- Else:
  - encourages consistency and sets a daily non-negotiable

#### 10.6.2 Study insight rules

- If studyLogs empty or avgHours == 0:
  - “Zero study hours logged…”
- Else if activeDays <= 2:
  - warns study frequency is too low
- Else if avgHours < 1.5:
  - warns hours/day dangerously low
- Else if totalDSA < 5 and studyLogs length > 0:
  - warns DSA is gatekeeper and not solved enough
- Else:
  - acknowledges solid numbers and suggests improving quality

#### 10.6.3 Streak insight rules

- streak === 0:
  - “Start again today…”
- streak < 5:
  - warns early streak is most dangerous phase
- streak < 21:
  - says habits solidify at 21 days
- streak < 60:
  - “elite territory” and prompts intentional practice
- else:
  - “exceptional” and encourages auditing

### 10.7 Reasoning behind “no backend AI”

Although the UI labels the output as “AI coach”, the implementation is deterministic.

Benefits:

- No network calls
- Consistent outputs for identical input state
- Privacy-preserving (local computation only)

Trade-off:

- Not personalized beyond the rule thresholds and computed metrics.

