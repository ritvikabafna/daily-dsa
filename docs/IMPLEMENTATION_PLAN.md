# Daily DSA — Implementation Plan & Roadmap

This document outlines the phased roadmap for completing the Daily DSA platform systematically while maintaining project conventions (JavaScript, plain CSS, Next.js).

---

## Phase 1: Stabilization & Quality Baseline (Completed)

- [x] Audit entire codebase, dependencies, and execution paths.
- [x] Fix critical runtime bug on the homepage (`ReferenceError: setUser is not defined`).
- [x] Fix unguarded `problem.id` access in `src/app/problems/[id]/solve/page.js`.
- [x] Migrate all raw `<a>` navigation links to Next.js `<Link>` components.
- [x] Fix unescaped HTML characters and React 19 effect cascading-render warnings.
- [x] Achieve clean `npm run lint` and `npm run build` verification.
- [x] Establish foundational architecture, implementation, and ADR documentation.

---

## Phase 2: Navigation & Route Completeness (Completed)

- [x] **Roadmap / Topics Page (`/topics`):**
  - Created `src/app/topics/page.js` displaying 31 DSA problems across categorized cards with topic-level progress bars and direct solver links.
- [x] **Dedicated User Dashboard (`/dashboard`):**
  - Created `src/app/dashboard/page.js` to provide in-depth analytics: total solved, easy vs. medium breakdown, topic breakdown, cloud-sync status, and recent submission history.

---

## Phase 3: Cloud Persistence & Database Integration (Completed)

- [x] **User Submissions Schema (`Submission.js`):**
  - Stored submission records in MongoDB: `userId`, `problemId`, `code`, `language`, `verdict`, `passed`, `total`, `createdAt`.
- [x] **Sync Progress with User Account:**
  - Updated `POST /api/execute` to persist solved problems directly to user's MongoDB record on `ACCEPTED` submissions.
  - Implemented `/api/submissions` endpoint for past submission lookup.
  - Added "Test Result" vs. "Submissions" tab to `SolvePage`.

---

## Phase 4: Execution Sandbox Enhancements (Completed)

- [x] **Execution Error Handling Graceful Fallback:**
  - Added Docker daemon connectivity detection. If Docker Desktop is stopped, returns user-friendly `SANDBOX_ERROR` actionable message instead of raw socket failures.
- [x] **Multi-Language Support (Python 3):**
  - Extended `runner.js` with `runPython(code, input)` executed in isolated container.
  - Added Python 3 option to Monaco editor and language selector in `SolvePage`.
  - Added language-specific code memory in `localStorage` so switching between C++ and Python preserves written code.

---

## Phase 5: Problem Discovery & Learning Experience (Completed)

- [x] **Problem Status Filtering:**
  - Added "All Status", "Solved", and "Unsolved" dropdown filter on `/problems`.
- [x] **Pick Random Problem (Shuffle):**
  - Added `🎲 Pick Random` button on `/problems` to immediately jump into solving a random challenge from the current filter list.
- [x] **Problem Meta Indicator:**
  - Added dynamic counter display (`Showing X of 31 problems` and total solved tally).
- [x] **Collapsible Hints & Algorithmic Strategy:**
  - Added topic/tag pill indicators on the problem pane.
  - Added `💡 Hints & Algorithmic Strategy` collapsible drawer with data structure choice hints and time/space complexity targets.

---

## Phase 6: Custom Testcases & Productivity Suite (Completed)

- [x] **Custom Input Execution Mode:**
  - Added "Custom Input" tab and toggle in `SolvePage`.
  - Added multi-line stdin textarea with "Load Sample Testcase" button.
  - Updated `POST /api/execute` to run code with custom stdin inputs without evaluating against default assertions.
  - Implemented custom output view displaying exact program stdout, input echo, and runtime stderr.
- [x] **Code Editor Productivity Suite:**
  - Added dynamic Monaco Theme Switcher (Dark vs. Light).
  - Added 1-click clipboard copy (`📋 Copy`) with visual feedback.
  - Added guarded starter code reset (`↺ Reset`) to safely restore template code without losing settings.
- [x] **Expanded Problem Catalog:**
  - Integrated "Remove Duplicates from Sorted Array" as Problem #32 with full testcase coverage in C++ and Python.

---

## Phase 7: Performance Profiling, Canonical Solutions & Daily Streak (Completed)

- [x] **Real-Time Execution Runtime Profiling (`⚡ ms`):**
  - Integrated micro-benchmarking in `runner.js` for container execution duration.
  - Displayed execution runtime chips per individual testcase and aggregated `⚡ X ms` speed badges next to verdicts.
  - Added `runtimeMs` field to `Submission.js` schema and displayed speed benchmarks in the submission history.
- [x] **Canonical Editorial & Reference Solution Suite:**
  - Created `src/app/data/editorials.js` providing optimal algorithmic walkthroughs, time complexity bounds ($O(N)$), space complexity bounds ($O(1)$), and canonical implementations.
  - Integrated collapsible `📘 Canonical Solution & Editorial` drawer into the problem details pane.
  - Added interactive language switcher (`C++` vs `Python 3`), `📋 Copy`, and `⚡ Insert into Editor` actions.
- [x] **Daily Streak & Activity Calendar Heatmap:**
  - Added consecutive coding day tracker (`🔥 X Day Streak`) on `/dashboard`.
  - Built interactive 28-day contribution heatmap grid with 4 intensity levels and day tooltips.
  - Added speed benchmarks to the Recent Submissions table.

