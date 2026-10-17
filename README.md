# Daily DSA

Daily DSA is a full-stack algorithmic problem-solving platform built with **Next.js (App Router)** and **React 19**. It allows learners to practice data structures and algorithms with daily challenges, Monaco-powered code editing, automated test case evaluations, and progress tracking.

---

## Features

- **Problem Catalog & Discovery:** Browse 32 curated algorithmic challenges with search, difficulty filtering, status filters (Solved/Unsolved), and `🎲 Pick Random` challenge selector.
- **Problem Solving Workspace:** Full-featured Monaco code editor with Dark/Light theme switching, 1-click clipboard copy, and guarded starter template reset.
- **Multi-Language Isolated Execution:** Sandboxed execution for both **C++ (GCC)** and **Python 3** powered by isolated Docker containers with strict memory, CPU, process limits, and network isolation (`--network none`).
- **Real-Time Execution Profiling:** Live execution runtime benchmarks in milliseconds (`⚡ ms`) per testcase and overall verdict.
- **Custom Input Sandbox:** Dedicated custom stdin input tab to test arbitrary test cases against standard output.
- **Canonical Editorial & Reference Solutions:** Built-in solution drawer with $O(N)$ time & space complexity analysis, pro tips, and 1-click `⚡ Insert into Editor` action.
- **User Dashboard & Streak Heatmap:** Analytics dashboard with 28-day submission activity heatmap grid, daily streak counter (`🔥 X Day Streak`), topic mastery meters, and submission speed history.
- **Authentication & Cloud Sync:** Hybrid local and cloud persistence with MongoDB Atlas and secure HTTP-only JWT cookies.

---

## Prerequisites

- **Node.js:** v18.18+ or v20+
- **Docker Desktop:** Required for running the code execution sandbox (`gcc:latest` image).
- **MongoDB Atlas:** MongoDB database connection URI for user authentication and submission sync.

---

## Getting Started

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create or verify `.env.local` in the project root:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Pull Sandbox Docker Image (Supports C++ and Python 3)
```bash
docker pull gcc:latest
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Compiles an optimized production build.
- `npm run start`: Runs the Next.js production server.
- `npm run lint`: Runs ESLint to check for code quality and syntax issues.

---

## Project Documentation

Detailed architecture specifications, engineering decisions, and roadmap plans are available in the `docs/` folder:
- [Architecture & Execution Pipeline](docs/ARCHITECTURE.md)
- [Implementation Plan & Roadmap](docs/IMPLEMENTATION_PLAN.md)
- [Architecture Decision Records (ADRs)](docs/DECISIONS.md)
