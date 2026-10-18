# Daily DSA

Daily DSA is a full-stack algorithmic problem-solving platform and interview preparation system built with **Next.js (App Router)** and **React 19**. It empowers developers to practice data structures and algorithms with real-time compilation, Socratic AI coaching, spaced-repetition revision, and granular submission analytics.

---

## 🌟 Key Features

### 🤖 1. Gemini AI Socratic DSA Coach
- **Instant Mistake Explainer**: When an attempt fails with `WRONG_ANSWER` or `TIME_LIMIT_EXCEEDED`, clicking **`🤖 Explain Mistake with AI`** analyzes your code against the failing testcase and explains *why* the logic broke without spoiling the solution.
- **Socratic Nudges**: Gentle hints on algorithms, invariant checks, and edge cases.
- **Code Review & Complexity Audit**: Upon achieving `ACCEPTED`, audits exact Time $O(...)$ and Space $O(...)$ complexity and provides clean-code tips.
- **Interactive Slide-Over Drawer**: Integrated with quick prompt chips, custom question bar, and copy assistance.

### 📘 2. Canonical Solutions & Editorials (All 32 Problems)
- **100% Problem Coverage**: Curated reference solutions across Arrays, Strings, Two Pointers, Sliding Window, Binary Search, Linked Lists, Trees, and Dynamic Programming.
- **Multi-Approach Hierarchy**: Compares Brute Force vs. Optimal patterns with Time & Space complexity proofs.
- **Dual-Language Implementations**: Full C++ (GCC) and Python 3 source code.
- **1-Click Insert & Copy**: Instantly insert reference solutions directly into the editor.

### 🔄 3. Smart Spaced-Repetition Revision System (SM-2)
- **SuperMemo-2 Spaced Learning**: Automatically schedules solved problems for revision before memory decay occurs.
- **Dynamic Intervals**:
  - **Hard / Struggled (+2 days)**: Automatically assigned when multiple attempts or repeated errors occur.
  - **Medium (+5 days)**: For single-mistake solves.
  - **Easy (+14 days)**: For first-try accepted solves.
- **Due-for-Revision Queue**: Visual dashboard surfacing overdue and upcoming problems with urgency tags.
- **Post-Solve Rating**: Log recall feedback (Hard, Good, Easy) directly upon solving.

### 📊 4. Advanced Submission Analytics & Attempt Comparison
- **Attempt History & Chronology**: Tracks sequential attempts (`#1, #2, #3...`) across C++ and Python.
- **Runtime Deltas & Speedup**: Computes exact millisecond runtime changes between attempts (e.g., `↓ 4ms faster`, `⚡ 50% speedup`).
- **Side-by-Side Attempt Comparison**: Compare any two attempts simultaneously to see code changes, runtime differences, and verdicts.
- **1-Click Code Reopening**: Load any previous attempt's code back into the Monaco editor.

### 🎯 5. Personalized Weak-Topic Recommendations
- Automatically identifies topic categories with elevated failure rates.
- Dynamically recommends foundational Easy problems if struggling, or next-level challenges if mastered.

### 🌓 6. Unified Theme System (Dark & Light Mode)
- Zero-flicker pre-hydration theme initialization via Next.js `beforeInteractive` script.
- Complete visual parity across Monaco editor, diff views, and AI drawers in both Dark (`#0b0f19`) and Light themes.

### ⚙️ 7. Sandboxed Multi-Language Execution Engine
- Native C++ (GCC with `-O2`) and Python 3 execution.
- Strict process sandboxing, 5-second execution timeout, and 1MB output buffer cap.
- Custom `stdin` mode for interactive debugging.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack) & React 19
- **AI SDK**: `@google/genai` (Google Gemini 2.5/2.0 Flash)
- **Code Editor**: Monaco Editor (`@monaco-editor/react`)
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with HTTP-only cookies & `bcryptjs`
- **Testing**: Node.js Native Test Runner (34 integration tests)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create or verify `.env.local` in the project root:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key_here
```
> *Tip: You can get a free Gemini API key in 10 seconds from [Google AI Studio](https://aistudio.google.com).*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

Run the complete automated test suite (34 integration tests):
```bash
npm test
```

Run code quality and linting:
```bash
npm run lint
```

Build for production:
```bash
npm run build
```

---

## 📖 Architecture & Design Documentation

For in-depth documentation on system design, database schemas, execution pipelines, and decision records, see the [`docs/`](./docs) folder:
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md): Comprehensive system architecture & subsystem designs.
- [`docs/DECISIONS.md`](./docs/DECISIONS.md): Architectural Decision Records (ADRs).
