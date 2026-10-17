# Daily DSA — Architecture & System Design

This document details the software architecture, data flow, component boundaries, and execution pipeline for the Daily DSA application.

---

## 1. High-Level Architecture

Daily DSA is built on a 3-tier architecture using the Next.js App Router:

```
+--------------------------------------------------------------------------+
|                            Client Tier (Browser)                         |
|   - Next.js React 19 Client Components                                   |
|   - Monaco Editor (@monaco-editor/react)                                 |
|   - Browser LocalStorage (code drafts & local progress cache)            |
+------------------------------------+-------------------------------------+
                                     | Fetch / JSON / HTTP-only Cookies
                                     v
+--------------------------------------------------------------------------+
|                          Server Tier (Next.js App)                       |
|   - Route Handlers (/api/auth/*, /api/execute, /api/test-db)             |
|   - Mongoose ODM & MongoDB Connection Pool                               |
|   - Process Orchestrator (src/execution/runner.js)                       |
+------------------------------------+-------------------------------------+
                                     | ChildProcess Spawn / Docker CLI
                                     v
+--------------------------------------------------------------------------+
|                         Sandbox Tier (Docker)                            |
|   - Isolated container: gcc:latest                                       |
|   - Memory limit: 256MB, CPU: 1 core, Timeout: 5000ms                    |
|   - Network: none, Output limit: 1MB                                     |
+--------------------------------------------------------------------------+
```

---

## 2. Directory Layout & Boundaries

- `src/app/`: Presentation layer and API route endpoints.
  - `page.js`: Dashboard, stats, and daily challenge.
  - `problems/`: Problem list and dynamic problem detail/solve views.
  - `login/` & `signup/`: Authentication pages.
  - `api/`: Serverless route handlers for authentication and code execution.
- `src/execution/`: Code execution sandbox and test evaluation logic.
  - `runner.js`: Manages temporary filesystem creation, docker container lifecycle, compilation, and timeout tracking.
  - `testRunner.js`: Sequentially passes inputs to `runner.js`, normalizes whitespace, and checks expected outputs.
- `src/lib/`: Shared utilities including cached MongoDB connection (`mongodb.js`).
- `src/models/`: Database schemas (Mongoose `User` model).
- `src/app/data/`: Static problem bank containing descriptions, constraints, examples, and test cases.

---

## 3. Code Execution & Result Flow

When a user runs code in the editor, the system executes through the following pipeline:

1. **User Action:** The user clicks "Run Code" or "Submit Solution" on `/problems/[id]/solve`.
2. **Payload Submission:** `SolvePage` issues `POST /api/execute` with `{ code, language, problemId, isSubmit }`.
3. **Validation & Resolution:**
   - Validates that `code`, `language`, and `problemId` are provided.
   - Ensures `language === "cpp" || language === "python"`.
   - Locates the problem and its test cases in `src/app/data/problems.js`.
4. **Test Evaluation Loop (`testRunner.js`):**
   - For each test case, invokes `runnerFn(code, testCase.input)` (`runCpp` or `runPython`).
   - Halts early if a compilation/syntax error, runtime crash, memory exceeded, or timeout occurs.
5. **Sandbox Isolation (`runner.js`):**
   - Creates a unique temporary folder (`dsa-[uuid]`) on the host.
   - For C++: Writes `main.cpp`, compiles with `gcc:latest g++`, then executes `/workspace/main`.
   - For Python: Writes `main.py`, executes directly with `gcc:latest python3 /workspace/main.py`.
   - Both run with `--network none --memory 256m --memory-swap 256m --cpus 1 --pids-limit 64`.
   - Automatically removes container and cleans up temporary directory.
6. **Verdict Determination:**
   - Trims and normalizes whitespace in both actual and expected outputs.
   - Computes overall verdict (`ACCEPTED`, `WRONG_ANSWER`, `COMPILATION_ERROR`, `TIME_LIMIT_EXCEEDED`, `MEMORY_LIMIT_EXCEEDED`, `OUTPUT_LIMIT_EXCEEDED`).
7. **Cloud Persistence & Client Rendering:**
   - If `isSubmit: true` and the user is authenticated via JWT cookie, saves a `Submission` record to MongoDB.
   - On `ACCEPTED`, automatically pushes `problemId` to the user's `solvedProblems` array in MongoDB.
   - Server returns JSON `{ success: true, result, savedToCloud }`.
   - `SolvePage` updates output state, refreshes the "Submissions" tab, and updates `localStorage`.

---

## 4. Security & Sandbox Constraints

- **Network Isolation:** Docker containers run with `--network none` to prevent malicious outbound network calls.
- **Resource Constraints:** Enforces `--memory 256m`, `--memory-swap 256m`, `--cpus 1`, and `--pids-limit 64`.
- **Execution Limits:** Strict 5-second process timeout and 1MB maximum stdout/stderr buffer.
- **Credential Storage:** User passwords hashed using bcrypt (10 rounds); session tokens stored in HTTP-only, SameSite cookies.
