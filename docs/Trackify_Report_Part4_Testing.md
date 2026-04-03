---
title: "TRACKIFY — Student Productivity & Placement Tracker"
document: "Project Report — Part 4"
sections: ["Testing strategy", "Test cases", "Edge cases", "Validation", "Quality checks"]
version: "1.0"
date: "2026-04-02"
---

## Table of Contents (Part 4)

- 9. Testing  
  - 9.1 Testing approach  
  - 9.2 Test environment  
  - 9.3 Test cases (module-wise)  
  - 9.4 Edge case testing  
  - 9.5 Validation checklist  

---

## 9. Testing

### 9.1 Testing approach

Trackify is a frontend-only system. Testing focuses on:

- Functional correctness of CRUD flows
- Correct persistence behavior via localStorage
- UI state correctness (filters, counts, progress)
- Streak and merge rules correctness
- Chart rendering correctness under empty and non-empty data
- Responsiveness (desktop vs mobile)

**Testing methods used**

- Manual unit-level verification of handler behaviors
- Scenario-based manual integration testing (typical student flows)
- Edge-case validation (empty inputs, repeated dates, status updates)

### 9.2 Test environment

- Browser: Modern Chromium-based browser / Safari / Firefox
- OS: macOS / Windows (any modern OS)
- Deployment: local dev server and static build preview

### 9.3 Test cases (module-wise)

#### 9.3.1 Theme module

| Test ID | Description | Steps | Expected result |
|--------|-------------|-------|-----------------|
| T-TH-01 | Toggle theme | Click theme toggle | Theme switches instantly |
| T-TH-02 | Persist theme | Switch theme → refresh | Theme remains the same |

#### 9.3.2 Task Manager module

| Test ID | Description | Steps | Expected result |
|--------|-------------|-------|-----------------|
| T-TS-01 | Add task (valid) | Enter title → choose priority → Add | Task added, toast shown |
| T-TS-02 | Add task (empty) | Leave title empty → Add | No task created |
| T-TS-03 | Toggle completion | Click checkbox | Task completion toggles |
| T-TS-04 | Delete task | Click delete icon | Task removed, toast shown |
| T-TS-05 | Filter pending | Select pending tab | Only pending tasks appear |
| T-TS-06 | Filter completed | Select completed tab | Only completed tasks appear |
| T-TS-07 | Progress bar | Add tasks and complete some | Progress reflects completion % |
| T-TS-08 | Persist tasks | Add task → refresh | Task remains |

#### 9.3.3 Study Tracker module

| Test ID | Description | Steps | Expected result |
|--------|-------------|-------|-----------------|
| T-ST-01 | Log session valid | Select date → add hours>0 → log | Session saved, toast shown |
| T-ST-02 | Log session invalid hours | Hours = 0 / empty | No log created |
| T-ST-03 | Merge same date | Log 2 sessions same date | Hours/DSA summed for that date |
| T-ST-04 | Delete log | Delete a date row | Row removed, totals updated |
| T-ST-05 | Totals/avg update | Add multiple logs | Totals and averages correct |
| T-ST-06 | Persist study logs | Add log → refresh | Logs remain |

#### 9.3.4 Streak logic

| Test ID | Description | Steps | Expected result |
|--------|-------------|-------|-----------------|
| T-SK-01 | Streak starts | First log for today | Streak becomes 1 |
| T-SK-02 | No double increment | Log again today | Streak unchanged |
| T-SK-03 | Increment next day | Log today, then log tomorrow | Streak increments by 1 |
| T-SK-04 | Reset after gap | Log today, skip a day, log again | Streak resets to 1 |

> Note: For time-dependent tests, adjust system date or simulate by changing expected variables conceptually.

#### 9.3.5 Placement Tracker module

| Test ID | Description | Steps | Expected result |
|--------|-------------|-------|-----------------|
| T-PL-01 | Add application valid | Enter company+role → Add | App added, toast shown |
| T-PL-02 | Add application invalid | Missing company or role | App not added |
| T-PL-03 | Update status | Change status dropdown | Status updates immediately |
| T-PL-04 | Filter by status | Select Applied/Interview/etc. | Only that status displayed |
| T-PL-05 | Delete application | Click delete icon | App removed |
| T-PL-06 | Persist placements | Add app → refresh | App remains |

#### 9.3.6 Dashboard module

| Test ID | Description | Steps | Expected result |
|--------|-------------|-------|-----------------|
| T-DB-01 | Summary stats | Add tasks/logs/apps | Stats reflect correct counts |
| T-DB-02 | AI insights empty | No data added | Empty state displayed |
| T-DB-03 | AI insights non-empty | Add data | Insights list appears |
| T-DB-04 | Recent tasks | Add tasks > 5 | Shows latest 5 |

#### 9.3.7 Analytics module

| Test ID | Description | Steps | Expected result |
|--------|-------------|-------|-----------------|
| T-AN-01 | Charts empty state | No data | Empty state shown for charts |
| T-AN-02 | Study bar chart | Add study logs | Bar chart displays last 7 days |
| T-AN-03 | DSA line chart | Add DSA counts | Line chart displays trend |
| T-AN-04 | Task doughnut | Add tasks with priorities | Doughnut shows distribution |
| T-AN-05 | Placement doughnut | Add placements with statuses | Doughnut shows distribution |
| T-AN-06 | Theme readability | Switch themes | Charts remain readable |

### 9.4 Edge case testing

#### 9.4.1 localStorage corrupt data

If localStorage contains invalid JSON, the hook catches errors and returns initial defaults. Expected behavior: app remains usable with reset dataset.

#### 9.4.2 Large datasets

While localStorage has size limits, Trackify datasets are lightweight. Expected behavior: UI remains responsive for typical student usage.

#### 9.4.3 Placement notes optionality

Notes are optional; UI must not break when notes are empty.

#### 9.4.4 Study date constraints

The study date input disallows future dates using `max=today`. Expected behavior: prevents accidental future logs.

### 9.5 Validation checklist

- [ ] Tasks can be added, toggled, filtered, deleted.
- [ ] Study logs merge for same date and totals update correctly.
- [ ] Streak updates only for today, increments for consecutive days, resets on gaps.
- [ ] Placements can be added, updated, filtered, deleted.
- [ ] Dashboard stats and recent tasks reflect stored data.
- [ ] Analytics charts render and handle empty datasets.
- [ ] Theme toggling persists and affects charts readability.
- [ ] Refresh retains all persisted state.

