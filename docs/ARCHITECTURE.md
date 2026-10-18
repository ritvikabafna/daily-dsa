# Daily DSA — Architecture & System Design

This document provides a comprehensive overview of the software architecture, data flow, component boundaries, and subsystem designs for the **Daily DSA** platform.

---

## 1. High-Level System Architecture

Daily DSA is built on a 3-tier architecture using the Next.js App Router (React 19, Turbopack):

```
+-----------------------------------------------------------------------------------------+
|                                  Client Tier (Browser)                                  |
|   - Next.js React 19 Client Components & Server Components                              |
|   - Monaco Code Editor (@monaco-editor/react) with C++ & Python 3 syntax highlighting    |
|   - Socratic AI Coach Slide-Over Panel (Gemini AI integration)                          |
|   - Submission Analytics & Attempt Comparison View                                      |
|   - Spaced Repetition (SM-2) Revision Queue Dashboard                                   |
|   - Dual Storage: Browser LocalStorage (offline cache) & Live MongoDB Cloud Sync        |
|   - Zero-Flicker Dark / Light Theme Controller                                         |
+--------------------------------------------+--------------------------------------------+
                                             | HTTPS / JSON / HTTP-only JWT Cookies
                                             v
+-----------------------------------------------------------------------------------------+
|                                Server Tier (Next.js App)                                |
|   - Route Handlers:                                                                     |
|     * /api/auth/signup, /api/auth/login, /api/auth/logout, /api/auth/me                 |
|     * /api/submissions (CRUD, user isolation, problem attempt history)                  |
|     * /api/execute (sandboxed code compilation & test evaluation)                       |
|     * /api/ai/coach (Gemini 2.5/2.0 Flash integration & model fallback cascade)         |
|   - Database Layer: Mongoose ODM & MongoDB Connection Pool                              |
|   - Security: Rate limiting, bcrypt password hashing, process isolation                 |
+--------------------------------------------+--------------------------------------------+
                      |                                            |
                      v                                            v
+--------------------------------------------+   +----------------------------------------+
|          Sandbox Tier (Local / Docker)     |   |         AI Cloud Tier (Google AI)      |
|   - Isolated runner (gcc / g++ / python3)  |   |   - Google GenAI SDK (@google/genai)   |
|   - Memory limit: 256MB, CPU: 1 core       |   |   - gemini-2.5-flash / gemini-2.0-flash|
|   - Strict 5000ms timeout per testcase     |   |   - Socratic Prompt Architecture       |
|   - Output buffer cap: 1MB                 |   |   - Complexity & Invariant Analysis    |
+--------------------------------------------+   +----------------------------------------+
```

---

## 2. Directory Structure & Modular Layout

```
daily_dsa/
├── docs/
│   ├── ARCHITECTURE.md          # System architecture, schemas, and subsystem designs
│   ├── DECISIONS.md             # Architectural decision records (ADRs)
│   └── IMPLEMENTATION_PLAN.md   # Feature roadmap and implementation checklist
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai/coach/        # Socratic AI Coach route (Gemini API)
│   │   │   ├── auth/            # Signup, login, logout, session verification
│   │   │   ├── execute/         # Sandboxed code execution & test evaluation
│   │   │   └── submissions/     # User submission history & cloud sync
│   │   ├── components/
│   │   │   ├── AICoachPanel.js              # Gemini Socratic slide-over drawer
│   │   │   ├── CodeEditor.js                # Monaco editor wrapper
│   │   │   ├── Navbar.js                    # Global navigation & auth status
│   │   │   ├── SmartRevisionSection.js      # Spaced repetition dashboard widget
│   │   │   ├── SubmissionAnalyticsSection.js # Attempt comparison & runtime graphs
│   │   │   └── ThemeToggle.js               # Synchronized light/dark mode switch
│   │   ├── data/
│   │   │   ├── editorials.js    # Canonical solutions for all 32 DSA problems (C++ & Python)
│   │   │   └── problems.js      # Problem statements, examples, constraints & test cases
│   │   ├── utils/
│   │   │   ├── revisionSystem.js       # SuperMemo-2 spaced repetition calculation
│   │   │   ├── submissionAnalytics.js  # Runtime deltas, attempt diffs & stats
│   │   │   └── weakTopicAnalysis.js    # Personalized recommendation engine
│   │   ├── dashboard/           # Analytics, streak, revision queue, weak topics
│   │   ├── problems/            # Problem catalog and filterable table
│   │   │   └── [id]/solve/      # Split-screen problem solve workspace
│   │   └── globals.css          # Full CSS design system for Light & Dark modes
│   ├── execution/
│   │   ├── runner.js            # Host / Docker execution orchestrator
│   │   └── testRunner.js        # Test case loop, whitespace normalization, verdicts
│   ├── lib/
│   │   ├── mongodb.js           # Cached Mongoose connection pool
│   │   └── rateLimit.js         # In-memory sliding window rate limiter
│   └── models/
│       ├── Submission.js        # Mongoose schema for code submissions
│       └── User.js              # Mongoose schema for user accounts & solved list
└── tests/                       # Automated Node.js integration test suites (34 tests)
```

---

## 3. Core Subsystems

### A. Gemini AI Socratic DSA Coach
- **Purpose**: Acts as an empathetic, high-standard technical interviewer that guides the user Socratically rather than outputting spoiler solutions.
- **Modes**:
  1. `explain_mistake`: Analyzes failing test case (Input, Expected, Actual, Error) and points out broken invariants.
  2. `socratic_nudge`: Provides guided algorithmic hints when stuck.
  3. `code_review`: Analyzes Time $O(...)$ and Space $O(...)$ complexity and suggests idiomatic optimizations upon Accepted.
  4. `custom_question`: Answers arbitrary questions about the problem or implementation.
- **Model Cascade**: Automatically tries `gemini-2.5-flash` with fallbacks to `gemini-2.0-flash` and `gemini-1.5-flash` for high availability and low latency.
- **Graceful Key Resolution**: Reads `GEMINI_API_KEY` from environment or client session input with zero leaks to the browser client.

### B. Smart Spaced-Repetition Revision System (SM-2)
- **Purpose**: Prevent algorithmic memory decay by scheduling revision solves at scientifically optimal intervals.
- **Interval Formula**:
  - `Hard / Struggled`: Interval = 2 days (for problems requiring multiple attempts or repeated errors).
  - `Medium / Good`: Interval = 5 days.
  - `Easy / Fluent`: Interval = 14 days (compounds on consecutive successful recalls: $I_n = I_{n-1} \times 2.5$).
- **Queueing Engine**: Aggregates overdue problems into a dedicated "Due for Revision" queue on the dashboard with urgency indicators (🔴 Overdue, 🟡 Due Soon).

### C. Submission Analytics & Attempt Comparison
- **Purpose**: Give users deep visibility into algorithmic optimization and performance progression.
- **Metrics Tracked**:
  - Sequential Attempt numbering (`#1, #2, #3...`).
  - Best runtime vs. Initial runtime.
  - Runtime Delta: Exact millisecond differences between successive attempts (`↓ 4ms faster`, `⚡ 50% speedup`).
  - Side-by-Side Comparison: Simultaneous diff of two attempts with code, runtime, and verdict comparison.
  - 1-Click Code Reopen: Instantly reload any historical attempt back into the Monaco editor.

### D. Canonical Solutions & Editorials (100% Coverage)
- **Problem Bank**: All 32 curated DSA problems have verified canonical solutions.
- **Dual Language**: Handcrafted C++ (GCC) and Python 3 reference solutions.
- **Multi-Approach Hierarchy**: Brute force baseline vs. Optimal two-pointers / hash table / divide-and-conquer strategies.
- **Interview Edge Cases**: Documented edge cases (empty inputs, integer overflow, duplicates, single elements).

### E. Sandboxed Multi-Language Execution Engine
- **Languages**: Native C++ (GCC with `-O2`) and Python 3.
- **Process Protection**:
  - Unique temporary workspace per execution (`dsa-[uuid]`).
  - Hard timeouts (`TIME_LIMIT_EXCEEDED` after 5,000ms).
  - Output capping (`OUTPUT_LIMIT_EXCEEDED` at 1MB).
  - Whitespace-insensitive output assertion matching.
  - Custom `stdin` mode for interactive debugging.

### F. Dark & Light Theme Architecture
- **CSS Variable Design System**: Tailored HSL and hex color palettes with zero jarring pure colors.
- **Zero-Flicker Pre-hydration Script**: Evaluates system preference and `localStorage` before paint via Next.js `beforeInteractive` script.
- **Synchronized State**: Broadcasts `themechange` custom events across Monaco editor and DOM components simultaneously.

---

## 4. Security & Data Integrity

- **Password Security**: Salted and hashed using `bcryptjs` (10 rounds).
- **Session Tokens**: JWT signed with secret key, stored in `HttpOnly`, `SameSite=Lax` cookies to prevent XSS exfiltration.
- **Cross-User Data Isolation**: Submissions queries are scoped strictly by authenticated `userId`.
- **Environment Isolation**: `.env.local` is strictly Git-ignored to ensure API keys and database credentials are never committed.

---

## 5. Verification & Testing

The platform includes 34 automated integration tests running via Node.js native test runner:
- `tests/ai_coach.test.mjs`: API key detection, fallback handling, input validation.
- `tests/auth.test.mjs`: Registration, password hashing, JWT expiration, forgery prevention.
- `tests/execution.test.mjs`: C++ and Python compilation errors, TLE, memory & output limits.
- `tests/persistence.test.mjs`: MongoDB persistence on Accepted submissions.
- `tests/revision_system.test.mjs`: SM-2 interval calculations and due-for-revision filtering.
- `tests/submission_analytics.test.mjs`: Chronology, runtime deltas, pairwise comparison, code reopening.
- `tests/user_isolation.test.mjs`: Cross-user data boundary verification.
- `tests/weak_topic_analysis.test.mjs`: Recommendation algorithms and topic diagnostics.
