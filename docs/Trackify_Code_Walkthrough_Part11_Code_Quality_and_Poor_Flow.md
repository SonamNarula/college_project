---
title: "TRACKIFY — Code Walkthrough Part 11"
document: "Code Quality and Poor Flow"
version: "1.0"
date: "2026-04-02"
---

## 11. Code Quality Review (including “poor flow” and improvement ideas)

This section is deliberately critical. It lists shortcomings, likely issues, and how to improve them while keeping the project’s offline-first nature.

### 11.1 State consistency issues (streak vs deletion)

Current behavior:

- Streak is updated only when `handleAddStudyLog()` is called and `date === today`.
- When a study log is deleted (`handleDeleteStudyLog`), streak is not recomputed.

Why this can be a problem:

- If a user deletes the only log for a day that contributed to their streak, the streak value may remain inflated and no longer reflect real streak continuity.

Possible improvement:

- Recompute streak and `lastStudyDate` whenever study logs change (on add AND delete), using:
  - sorted active dates
  - consecutive-day counting

### 11.2 Streak algorithm dependency on `lastStudyDate`

The algorithm:

- uses a stored `lastStudyDate` and compares it with today/yesterday

Risk:

- If `lastStudyDate` is out of sync (due to manual localStorage tampering or the deletion issue above), streak becomes incorrect.

Possible improvement:

- Remove reliance on incremental state and instead compute streak from data each time.

### 11.3 ID generation quality

`genId()` uses:

- `Math.random().toString(36).slice(2, 10)`

Risk:

- collisions are unlikely but possible.
- IDs are not cryptographically secure.

Possible improvement:

- Use `crypto.randomUUID()` (supported in modern browsers) to reduce collision risk.

### 11.4 `useLocalStorage` cross-tab synchronization

Current hook:

- updates localStorage when React state changes
- initializes state only on first render

If the user opens multiple tabs:

- switching data in one tab might not update the other tab’s UI automatically.

Possible improvement:

- add a `storage` event listener to sync across tabs.

### 11.5 Business logic inside App vs page

Strength:

- `App.tsx` centralizes mutations, which simplifies debugging.

Weakness:

- `App.tsx` becomes a large controller with many handlers (tasks, study, placements, toasts, streak).

Possible improvement:

- extract handler functions into domain modules (e.g., `taskService.ts`, `studyService.ts`, `placementService.ts`) or move to reducers.

### 11.6 UI/logic coupling and naming inconsistencies

Observations:

- Analytics uses `document.documentElement.getAttribute('data-theme')` directly.

Potential issue:

- it bypasses React state; although App rerenders on theme toggle, the coupling is indirect.

Possible improvement:

- pass `isDark` down as a prop to Analytics so charts update purely from React state.

### 11.7 Analytics “last 7 hours” vs “last 7 days slice” assumption

Dashboard uses:

- `const last7 = studyLogs.slice(-7);`

This assumes the last 7 study log entries correspond to the last 7 days, which may not be true if the user logs sporadically.

Analytics uses a more robust approach:

- it explicitly iterates over the last 7 calendar days and fills zeros where logs are missing.

Possible improvement:

- align Dashboard and Analytics so both follow calendar-day logic, not “last 7 records”.

### 11.8 Sorting and date handling risks

StudyTracker table sorts using:

- `new Date(b.date).getTime()`

`date` is stored as `YYYY-MM-DD`. Parsing might depend on timezone interpretation.

Possible improvement:

- parse as UTC or avoid JS Date parsing pitfalls by using consistent date-key logic.

### 11.9 Empty states and messaging clarity

Strength:

- There are empty states on Dashboard, TaskManager, StudyTracker, PlacementTracker, Analytics.

Possible improvement:

- Make empty states more instructive by also showing “what to add next” per module based on the user’s currently missing data (not only generic messages).

### 11.10 Testing gaps (from a code quality perspective)

The project testing strategy in the existing report is manual and scenario-based.

Why this matters:

- As the project grows, logic bugs (streak, merge behavior, streak inconsistency) can slip in.

Possible improvement:

- add unit tests for:
  - `generateInsights`
  - streak recomputation (if implemented)
  - study log merge logic
  - analytics day extraction

### 11.11 Documentation quality

Existing `README.md` is strong for high-level overview.

Possible improvement:

- add a “developer guide” section describing:
  - data keys
  - how streak is computed
  - how to run tests/build

---

## 11.12 Overall “poor flow” summary (what to fix first)

If you want the most impactful improvements:

1. Fix streak consistency after deletions by recomputing streak from stored logs.
2. Improve ID generation using `crypto.randomUUID()`.
3. Align Dashboard’s last-7 calculation with Analytics’s calendar-day approach.
4. Reduce size of `App.tsx` via reducers or domain services.
5. Add unit tests for pure logic (`generateInsights`, extraction functions, streak logic).

