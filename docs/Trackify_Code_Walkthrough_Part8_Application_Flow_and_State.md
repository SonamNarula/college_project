---
title: "TRACKIFY — Code Walkthrough Part 8"
document: "Application Flow and State"
version: "1.0"
date: "2026-04-02"
---

## 8. Application Flow and State (How code executes end-to-end)

This section explains the runtime flow from the first browser load to each user interaction, highlighting how state is centralized and persisted.

### 8.1 Bootstrapping: `main.tsx` -> React mount

`src/main.tsx` creates the React root:

- Imports `App` from `./App.tsx`
- Calls `ReactDOM.createRoot(document.getElementById('root')!).render(<App />)`
- Uses `React.StrictMode` which helps surface potential issues by rendering components twice in development.

Why this file exists:

- It is the conventional entry point for Vite + React projects.
- It keeps `App.tsx` focused on app logic rather than mounting.

### 8.2 App Controller: `App.tsx` is the single source of truth

`src/App.tsx` coordinates:

- Navigation (current page)
- Theme state (dark/light)
- Persisted datasets:
  - tasks
  - studyLogs
  - placements
  - streak
  - lastStudyDate
- Toast stack (feedback messages)
- Handler functions that mutate state (add/toggle/delete/update)

#### 8.2.1 Theme flow

- `App` reads persisted theme using `useLocalStorage<boolean>('trackify-dark', false)`.
- An effect runs whenever `isDark` changes:
  - sets `document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')`
- The header calls `toggleTheme()` which flips `isDark`.

Why this matters:

- `global.css` uses `[data-theme="dark"]` to override CSS variables.
- All pages and charts become theme-aware by reading these variables or checking `data-theme`.

#### 8.2.2 Navigation flow

- `const [page, setPage] = useState<Page>('dashboard');`
- The `Sidebar` calls `onNavigate(page)` which updates the `page` state.
- `App.renderPage()` switches on `page` and returns the matching page component:
  - `dashboard` -> `Dashboard`
  - `tasks` -> `TaskManager`
  - `study` -> `StudyTracker`
  - `placement` -> `PlacementTracker`
  - `analytics` -> `Analytics`

The navigation is “controller-driven”:

- Only `App` decides which page is displayed.
- Pages stay simpler and focused on UI + local form inputs.

### 8.3 Persistence: `useLocalStorage` hook

`src/hooks/useLocalStorage.ts` provides a typed hook:

- It initializes state from `window.localStorage.getItem(key)` and `JSON.parse`.
- It catches parsing errors and falls back to the provided `initialValue`.
- Its setter:
  - supports functional updates (`setValue(prev => next)`)
  - writes back into localStorage (`JSON.stringify`)

Why this helps the app:

- Task/study/placement state survives browser refresh.
- All features can be implemented as simple CRUD flows without needing a backend.

### 8.4 Data mutation flow (example pattern)

Most handlers follow this pattern:

1. Receive input from a page (e.g., title/priority/status).
2. Update persisted state:
   - use `setTasks`, `setStudyLogs`, `setPlacements`
3. Show toast:
   - `addToast(message, type)`
4. UI re-renders automatically using updated props/state.

The most important aspect:

- Mutations happen only in `App.tsx`.
- Pages call callbacks, not direct storage writes.

### 8.5 Toast feedback layer (`Toast.tsx`)

`App` maintains:

- `toasts: Toast[]` in component state
- `addToast(message, type)` that pushes into array
- `removeToast(id)` that filters toast out

The `ToastContainer`:

- Positions toasts fixed at bottom-right.
- Each toast auto-exits after ~3 seconds (animation) and then calls `onRemove(toast.id)`.

Why this exists:

- Toasts provide immediate user feedback without blocking navigation.
- It makes the UX feel “alive” even though data is only local.

### 8.6 Data derivation flow (read vs write)

Trackify separates:

- “Write operations”: adding/modifying/deleting stored entities.
- “Read operations”: computing derived metrics and chart datasets.

For example:

- Dashboard derives completed tasks count and total study hours from arrays.
- Analytics derives chart points from last 7 days by scanning `studyLogs`.
- AI coach derives insights via a pure rule engine from tasks/studyLogs/streak.

This separation reduces the risk of inconsistency:

- Storage contains canonical data.
- Derived UI values are computed each render.

### 8.7 Summary: end-to-end execution timeline

1. Browser loads `index.html`, mounts `App`.
2. `App` initializes state from `localStorage` via `useLocalStorage`.
3. User navigates via `Sidebar` -> `page` state changes -> `renderPage()` shows correct page.
4. User performs actions:
   - page collects inputs in local state (forms/filters)
   - page calls callbacks from `App`
   - `App` updates persisted arrays and streak
   - `Toast` shows feedback
5. UI refreshes using updated props/state and re-computes derived metrics.

