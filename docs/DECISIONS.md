# Daily DSA — Architecture Decision Records (ADRs)

This document records the architectural and technology choices made for the Daily DSA project.

---

## ADR-001: Plain CSS & JavaScript over Tailwind CSS & TypeScript

### Status: Accepted
### Context
The project was initiated with vanilla JavaScript and custom global CSS rules (`src/app/globals.css`). The user requested to preserve existing conventions and not migrate to TypeScript or Tailwind CSS.

### Decision
- Keep all components in JavaScript (`.js`).
- Keep styling in plain CSS using established classes and design variables in `src/app/globals.css`.

### Consequences
- Eliminates Tailwind build complexity and TypeScript compilation overhead during rapid prototyping.
- Requires careful adherence to naming conventions and component boundaries in CSS.

---

## ADR-002: Ephemeral Docker Container per Execution Run

### Status: Accepted
### Context
Executing user-submitted arbitrary code presents major security and resource risks (fork bombs, infinite loops, memory leaks, unauthorized network access).

### Decision
- Spawn isolated, short-lived Docker containers on-demand per compilation and execution run using `gcc:latest`.
- Enforce strict boundaries:
  - `--network none`: Prevents network access.
  - `--memory 256m` and `--memory-swap 256m`: Caps physical and swap memory.
  - `--cpus 1` and `--pids-limit 64`: Thwarts fork bombs and CPU starvation.
  - 5-second execution timeout killed via process timer.

### Consequences
- Requires Docker Desktop to be running on the host system.
- Provides robust process isolation and safety against untrusted code.

---

## ADR-003: Hybrid Progress Storage (LocalStorage to Cloud Database)

### Status: Accepted
### Context
Users should be able to solve problems immediately without mandatory registration, but registered users need progress synchronized across devices.

### Decision
- Use client-side `localStorage` for instant guest progress tracking and editor draft autosaving.
- In Phase 3, hydrate and sync solved problems with the MongoDB user account when an active session exists.

### Consequences
- Guest users enjoy zero-barrier access.
- Authenticated users gain permanent cloud synchronization.

---

## ADR-004: Standard GLIBC C++ & Python Dual Runtime via GCC Base Image

### Status: Accepted
### Context
Running Python in lightweight Alpine images (`python:alpine`) on Windows Docker Desktop WSL2 setups frequently encounters `musl libc` dynamic linking failures and `input/output error` when executing `/usr/local/bin/python`.

### Decision
- Standardize on `gcc:latest` which contains both `g++` and a Debian/GLIBC `/usr/bin/python3`.
- Execute both C++ and Python 3 inside the same thoroughly tested, robust container environment.

### Consequences
- Eliminates multi-image pull delays on user machines.
- Ensures 100% reliable execution across Windows, Linux, and macOS Docker hosts.

---

## ADR-005: High-Precision Wall-Clock Execution Benchmarking

### Status: Accepted
### Context
DSA learners need immediate feedback on whether their solutions meet time complexity bounds without waiting for asynchronous cloud evaluations.

### Decision
- Benchmark exact container runtime duration in milliseconds (`executionTimeMs`) inside `runner.js`.
- Surface per-testcase and aggregate runtime chips directly in the results UI and persist benchmarks to the `Submission` database schema.

### Consequences
- Provides transparent performance signals for comparing algorithmic solutions against optimal bounds.

