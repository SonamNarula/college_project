---
title: "TRACKIFY — Student Productivity & Placement Tracker"
document: "Project Report — Part 6 (Appendices)"
sections: ["User manual", "Installation", "Sample data", "Test case sheets", "localStorage schema", "Glossary"]
version: "1.0"
date: "2026-04-02"
---

## Table of Contents (Part 6)

- Appendix A: Installation and Quickstart  
- Appendix B: User Manual (Screen-wise)  
- Appendix C: Sample localStorage Data (JSON)  
- Appendix D: Extended Test Case Sheet (Printable)  
- Appendix E: Glossary  

---

## Appendix A: Installation and Quickstart

### A.1 Prerequisites

- Node.js 18+ recommended
- npm

### A.2 Steps to run locally

1. Open terminal in the project folder
2. Install dependencies
3. Start dev server

Commands:

```bash
npm install
npm run dev
```

### A.3 Production build

```bash
npm run build
npm run preview
```

---

## Appendix B: User Manual (Screen-wise)

### B.1 Dashboard

**Purpose:** Provides a quick overview of productivity and placement progress.

**What you can do:**

- View:
  - tasks completed and pending
  - total study hours and weekly hours
  - current streak
  - applications sent and selected count
- Read AI coach insights
- View recent tasks list

### B.2 Task Manager

**Purpose:** Track daily tasks with priorities.

**Steps:**

- Add a task:
  - type a title
  - choose priority (low/medium/high)
  - click “Add Task”
- Mark complete:
  - click the checkbox icon
- Filter:
  - choose All / Pending / Completed
- Delete:
  - click trash icon

### B.3 Study Tracker

**Purpose:** Log study discipline and DSA effort.

**Steps:**

- Log session:
  - select date (cannot be future)
  - enter hours (must be > 0)
  - enter DSA solved (optional)
  - click “Log Session”
- Streak updates when logging for today.
- Delete log:
  - click trash icon beside a date row

### B.4 Placement Tracker

**Purpose:** Track placement applications and pipeline status.

**Steps:**

- Add application:
  - enter company and role
  - select status
  - add notes (optional)
  - click “Add Application”
- Update status:
  - change dropdown on an application card
- Filter:
  - click a summary card (Applied/Interview/Selected/Rejected)
- Delete:
  - click trash icon

### B.5 Analytics

**Purpose:** Visualize progress and distributions.

**Charts:**

- Weekly Study Hours (bar)
- DSA Questions Last 7 Days (line)
- Task Priority Breakdown (doughnut)
- Placement Status Overview (doughnut)

---

## Appendix C: Sample localStorage Data (JSON)

> These examples show the shape of persisted data. Values will vary by user.

### C.1 Tasks (`trackify-tasks`)

```json
[
  {
    "id": "k2f9ab1c",
    "title": "Revise OS scheduling",
    "priority": "high",
    "completed": false,
    "createdAt": "2026-04-02T12:10:00.000Z"
  },
  {
    "id": "p0q8lm3z",
    "title": "Solve 5 arrays problems",
    "priority": "medium",
    "completed": true,
    "createdAt": "2026-04-01T09:00:00.000Z"
  }
]
```

### C.2 Study logs (`trackify-study`)

```json
[
  { "date": "2026-04-01", "hours": 3.5, "dsaQuestions": 6 },
  { "date": "2026-04-02", "hours": 2.0, "dsaQuestions": 3 }
]
```

### C.3 Placements (`trackify-placements`)

```json
[
  {
    "id": "a9c1d2e3",
    "company": "ExampleCorp",
    "role": "SDE Intern",
    "status": "interview",
    "appliedDate": "2026-04-01T10:30:00.000Z",
    "notes": "OA done, waiting for interview slot"
  }
]
```

### C.4 Streak keys

```json
{
  "trackify-streak": 2,
  "trackify-last-study": "2026-04-02"
}
```

---

## Appendix D: Extended Test Case Sheet (Printable)

### D.1 Task module — extended cases

| ID | Scenario | Input | Expected |
|----|----------|-------|----------|
| D-TS-01 | Add task with spaces | `"   Learn DBMS   "` | Trimmed title saved |
| D-TS-02 | Delete non-existing task | stale id | No crash; list unchanged |
| D-TS-03 | 0 tasks | none | Empty state appears |

### D.2 Study module — extended cases

| ID | Scenario | Input | Expected |
|----|----------|-------|----------|
| D-ST-01 | DSA empty | hours=2.5, dsa="" | DSA treated as 0 |
| D-ST-02 | Merge twice | add same date 3x | values accumulate |
| D-ST-03 | Delete log updates totals | delete newest log | totals recompute correctly |

### D.3 Placement module — extended cases

| ID | Scenario | Input | Expected |
|----|----------|-------|----------|
| D-PL-01 | Notes blank | notes="" | no notes section shown |
| D-PL-02 | Filter toggle behavior | click same status twice | returns to all |

### D.4 Analytics module — extended cases

| ID | Scenario | Input | Expected |
|----|----------|-------|----------|
| D-AN-01 | Missing days | logs only on 2 days | charts show 7 labels with zeros |
| D-AN-02 | Dark theme | theme toggled | chart labels remain readable |

---

## Appendix E: Glossary

- **SPA**: Single Page Application.
- **CRUD**: Create, Read, Update, Delete operations.
- **DSA**: Data Structures and Algorithms.
- **localStorage**: Browser key-value store for persistent data.
- **Streak**: Count of consecutive days with activity.
- **Pipeline**: Stage-based flow (e.g., applied → interview → selected).
- **Deterministic rules**: Fixed logic producing predictable outputs.

