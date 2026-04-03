---
title: "TRACKIFY — Code Walkthrough Part 7"
document: "Directory Overview"
version: "1.0"
date: "2026-04-02"
---

## 7. Directory Overview (Why each directory exists)

This section explains the folder structure inside `trackify/`, what each directory is responsible for, and why separating it improves maintainability.

### 7.1 Project root (`trackify/`)

The root of the project contains:

- `index.html`
  - Defines the HTML entry point and the `#root` element where React mounts.
  - Contains the page title and font links for `Ayuthaya` and `Inter`.
- `package.json`, `package-lock.json`
  - Declares dependencies (React, Chart.js, lucide-react) and scripts (`vite`, `tsc`, `build`, `preview`).
- `tsconfig.json`, `tsconfig.node.json`
  - Configures TypeScript compilation rules for the app and Vite tooling.
- `vite.config.ts`
  - Configures Vite and enables the React plugin.
- `public/`
  - Static assets that should be copied as-is into the build output.

These root files exist to support the build system and runtime startup. The actual application logic lives under `src/`.

### 7.2 `public/` directory

`public/` contains assets referenced by the HTML and UI:

- `favicon.svg`
  - Browser tab icon.
- `screenshots/` (JPEG images)
  - Used for documentation/README visuals and for the project “visual tour” feature.

Why this directory exists:

- Vite serves and copies static assets from `public/` without bundling them into JavaScript.
- It prevents import boilerplate for static images and allows easy linking.

### 7.3 `src/` directory

`src/` is the heart of the app. Vite treats `src/` as the source of all compiled code.

`src/` contains:

- `main.tsx`
- `App.tsx`
- `pages/`
- `components/`
- `hooks/`
- `types/`
- `styles/`
- `utils/`

Separating by responsibility reduces coupling:

- `pages/` focus on feature-level UI and data composition.
- `components/` are reusable UI building blocks.
- `hooks/` are reusable logic for state and side effects.
- `utils/` stores pure functions (business rules/insights).
- `types/` defines shared domain models and prop types.
- `styles/` holds global styling.

### 7.4 `src/pages/` directory

Files:

- `Dashboard.tsx`
- `TaskManager.tsx`
- `StudyTracker.tsx`
- `PlacementTracker.tsx`
- `Analytics.tsx`

Why this directory exists:

- Pages represent “screens” in the app’s navigation model.
- Each page has its own local form state and UI structure.
- Pages receive data and callbacks from `App.tsx`, keeping the app’s state centralized.

Example mapping:

- Dashboard uses derived metrics and shows AI insights and recent tasks.
- TaskManager handles task creation, filtering, progress, and deletion.
- StudyTracker handles logging hours/DSA, shows streak, and includes a table.
- PlacementTracker handles application management and status pipeline.
- Analytics renders charts using Chart.js based on stored logs.

### 7.5 `src/components/` directory

Files:

- `Sidebar.tsx`
- `Header.tsx`
- `StatCard.tsx`
- `Toast.tsx`
- `EmptyState.tsx`

Why this directory exists:

- Components are reusable and UI-focused.
- They reduce duplication across pages.
- They keep styling and presentation concerns separate from business logic.

How they fit:

- `Sidebar` and `Header` form the app shell.
- `StatCard` standardizes metric presentation on the dashboard and analytics.
- `Toast` provides action feedback across the app.
- `EmptyState` provides consistent UI when there is no data.

### 7.6 `src/hooks/` directory

Files:

- `useLocalStorage.ts`

Why this directory exists:

- Persisting state is a cross-cutting concern.
- A custom hook avoids repeating JSON parse/stringify logic in every feature.
- It provides a typed, uniform API: `[value, setValue]`.

### 7.7 `src/utils/` directory

Files:

- `aiInsights.ts`

Why this directory exists:

- The AI coach is rule-based business logic.
- It’s best implemented as a pure function to simplify reasoning and testing.
- `generateInsights()` takes domain data and returns strings; it does not depend on UI.

### 7.8 `src/types/` directory

Files:

- `index.ts`

Why this directory exists:

- Domain models are shared across pages and the app controller.
- TypeScript types improve:
  - prop validation,
  - safer state updates,
  - clearer documentation of entities.

Included types:

- `Task`, `StudyLog`, `PlacementApp`
- `Priority`, `PlacementStatus`, `Page`
- `Toast` type

### 7.9 `src/styles/` directory

Files:

- `global.css`

Why this directory exists:

- Styling is centralized and applied via CSS variables.
- The theme system is implemented by switching `data-theme` on `<html>`.

This separation keeps components largely “structure + className” driven, rather than embedding large style blocks.

### 7.10 `trackify/docs/` directory (generated documentation)

This directory exists purely for your submission documentation:

- Synopsis + report parts
- Code walkthrough parts

It does not affect runtime; it is included for academic writing structure.

---

## Summary (What directory does what)

| Directory | Responsibility |
|-----------|----------------|
| `public/` | Static assets (favicon, screenshots) |
| `src/pages/` | Feature screens and their UI/forms |
| `src/components/` | Reusable UI widgets for layout/feedback |
| `src/hooks/` | Reusable state logic (localStorage persistence) |
| `src/utils/` | Business logic (AI coach rule engine) |
| `src/types/` | Domain models and shared enums |
| `src/styles/` | Global styling + theming + animations |

