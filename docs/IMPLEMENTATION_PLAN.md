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

---

## Phase 8: Security and Reliability Hardening (Completed)

- [x] **Private API Security & Session Expiration:**
  - Enforced strict JWT authentication on `/api/auth/me` and `/api/submissions`.
  - Added graceful handling of expired (`TokenExpiredError`) and forged (`JsonWebTokenError`) JWTs with automatic cookie revocation (`cookieStore.delete("token")`) and HTTP 401 statuses.
- [x] **Strict Scoping for Submissions & Progress:**
  - Scoped user queries in `/api/submissions` strictly to the verified cryptographic `userId` extracted from server-side JWT claims.
  - Sanitized and validated all optional `problemId` query parameters to prevent injection or invalid lookups.
- [x] **Container Sandbox Hardening & Resource Protection:**
  - Dropped all Linux root capabilities (`--cap-drop=ALL`) across compilation and execution containers.
  - Set `--security-opt=no-new-privileges` to prevent privilege escalation attempts.
  - Restricted maximum PID limit to 32 (`--pids-limit 32`) to contain fork bombs (`[Errno 11] Resource temporarily unavailable`).
  - Enforced read-only workspace mounts (`-v ${tempDir}:/workspace:ro`) during binary and script execution to prevent filesystem tampering.
  - Added `-B` flag to Python execution to suppress `.pyc` disk writes.
  - Hardened memory limit to 128MB (`--memory 128m --memory-swap 128m`) and output limit to 1MB.
- [x] **Rate Limiting Engine:**
  - Created reusable memory-safe `RateLimiter` utility in `src/lib/rateLimit.js` with automated stale client eviction.
  - Protected `/api/auth/login` (5 attempts/min), `/api/auth/signup` (5 attempts/15min), and `/api/execute` (15 executions/min).
  - Emitted standard `Retry-After` HTTP headers and descriptive 429 messages.
- [x] **Server-Side Input Validation:**
  - Capped user submission code size to 64 KB and custom standard input to 32 KB.
  - Restricted execution languages strictly to `cpp` and `python`.
  - Validated problem IDs against catalog registry.
  - Enforced RFC-compliant email regex, name length bounds (2–50 chars), and password length limits (6–128 chars to prevent bcrypt CPU exhaustion).
- [x] **Graceful Fault Tolerance & Error Recovery:**
  - Handled Docker absence (`ENOENT`) and Docker Desktop daemon connection drops with user-friendly `SANDBOX_ERROR` statuses.
  - Added 5s fail-fast timeout and reconnection retry promise reset to `src/lib/mongodb.js`.
  - Converted unhandled DB connection failures in auth and submission routes to graceful HTTP 503 Service Unavailable responses without leaking stack traces.
  - Handled submission cloud sync degradation in `/api/execute` without interrupting code execution verdicts.

---

## Phase 9: Automated Testing Suite (Completed)

- [x] **Authentication & Session Lifecycle Tests (`tests/auth.test.mjs`):**
  - Tested user registration with bcrypt password hashing and validated non-plaintext storage.
  - Tested duplicate account prevention rejecting collision attempts on registered emails.
  - Tested credentials authentication yielding valid signed JWT sessions.
  - Tested incorrect password rejection.
  - Tested expired JWTs throwing `TokenExpiredError`.
  - Tested forged JWTs with altered signatures throwing `JsonWebTokenError`.
- [x] **Code Execution & Error Diagnostics Tests (`tests/execution.test.mjs`):**
  - Tested C++ compilation failure on syntax errors producing `COMPILATION_ERROR`.
  - Tested Python syntax error detection producing `COMPILATION_ERROR`.
  - Tested testcase assertion runner failing incorrect algorithms with `WRONG_ANSWER`.
  - Tested infinite loop containment cutting off execution with `TIME_LIMIT_EXCEEDED`.
  - Tested output flood protection with `OUTPUT_LIMIT_EXCEEDED`.
- [x] **Custom Stdin & Empty Input Tests (`tests/stdin.test.mjs`):**
  - Tested C++ custom stdin parsing and formatted calculation standard output.
  - Tested Python multi-line stdin streaming and reversal.
  - Tested empty input `""` handling across both C++ and Python runners without hanging.
- [x] **Accepted Submissions & MongoDB Persistence (`tests/persistence.test.mjs`):**
  - Tested full evaluation of canonical solution for Problem #1 (Two Sum) returning `ACCEPTED`.
  - Tested persistence of `Submission` document with verdict, testcase counts, runtime in ms, and code.
  - Tested updating user's `solvedProblems` array via `$addToSet`.
- [x] **Cross-User Data Isolation Tests (`tests/user_isolation.test.mjs`):**
  - Verified User A cannot query, view, or leak User B's submissions.
  - Verified User B cannot query, view, or leak User A's submissions.
  - Verified solved problems and topic progress meters remain segregated between distinct user accounts.
- [x] **Pipeline Verification (`npm test`, `npm run lint`, `npm run build`):**
  - All 23 automated tests passing with 0 failures (`npm test`).
  - ESLint verification passing with 0 errors (`npm run lint`).
  - Production build compiled successfully (`npm run build`).

---

## Phase 10: Personalized Weak-Topic Analysis & Smart Recommendations (Completed)

- [x] **Weak-Topic Analysis Engine (`src/app/utils/weakTopicAnalysis.js`):**
  - Analyzes user's submission history and verdicts (`ACCEPTED`, `WRONG_ANSWER`, `TIME_LIMIT_EXCEEDED`, etc.) aggregated by topic.
  - Computes error rate, attempt count, accuracy percentage, and topic mastery score.
  - Automatically flags topics as `Needs Focus` when user encounters 2+ failed attempts or high error rates.
  - Generates difficulty-tailored next recommendations:
    - If user struggled with a topic, recommends an **Easy** foundational problem first to solidify concepts.
    - If Easy problems in that topic are solved, recommends a **Medium** challenge to overcome setbacks and build confidence.
    - If no setbacks exist, recommends breadth expansion problems from untouched or partially solved topics.
- [x] **Interactive Dashboard Integration (`src/app/dashboard/page.js`):**
  - Added dedicated **"🎯 Personalized Weak-Topic Analysis & Smart Recommendations"** card to the user dashboard.
  - Features real-time status pill (`⚠️ Focus Areas Detected` vs `✨ High Accuracy Momentum`).
  - Topic Diagnostics column showing per-topic error rates, status pills (`Needs Focus`, `In Progress`, `Mastered`, `Not Started`), and visual progress bars.
  - Recommended Challenges column showing difficulty badges, personalized rationale explanations, and 1-click `Solve Challenge →` CTA buttons.
  - Full guest user support leveraging `daily_dsa_local_submissions` from `localStorage` as well as authenticated cloud sync via `/api/submissions?limit=50`.
- [x] **Automated Test Coverage (`tests/weak_topic_analysis.test.mjs`):**
  - Tested detection and ranking of `Needs Focus` topics on repeated wrong answers.
  - Tested Easy foundational problem recommendation when struggling with a topic.
  - Tested Medium challenge recommendation when foundational Easy problems are already completed.
  - Tested breadth expansion recommendations when no failures exist.


