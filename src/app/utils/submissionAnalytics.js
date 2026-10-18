/**
 * Submission Analytics & Attempt Comparison Utilities
 * Evaluates submission sequences, runtime progressions, verdict trends,
 * and pairwise attempt comparisons.
 */

/**
 * Calculates analytics for a list of submissions for a specific problem
 * or across multiple problems.
 *
 * @param {Array} submissions - List of submission objects
 * @returns {Object} Comprehensive analytics data
 */
export function calculateSubmissionAnalytics(submissions = []) {
  if (!Array.isArray(submissions) || submissions.length === 0) {
    return {
      totalAttempts: 0,
      attempts: [],
      verdictCounts: {},
      verdictTrend: [],
      acceptedCount: 0,
      acceptanceRate: 0,
      firstAcceptedAttempt: null,
      bestRuntimeMs: null,
      latestRuntimeMs: null,
      runtimeChangeOverall: null,
      runtimeSpeedupPercent: null,
    };
  }

  // Sort chronologically ascending (oldest first: Attempt 1, Attempt 2, ...)
  const sorted = [...submissions].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  let prevRuntime = null;
  const verdictCounts = {};
  let acceptedCount = 0;
  let firstAcceptedAttempt = null;
  let bestRuntimeMs = null;

  const attempts = sorted.map((sub, index) => {
    const attemptNumber = index + 1;
    const verdict = sub.verdict || "UNKNOWN";
    const runtime = typeof sub.runtimeMs === "number" ? sub.runtimeMs : null;

    // Track verdict frequencies
    verdictCounts[verdict] = (verdictCounts[verdict] || 0) + 1;

    if (verdict === "ACCEPTED") {
      acceptedCount += 1;
      if (firstAcceptedAttempt === null) {
        firstAcceptedAttempt = attemptNumber;
      }
      if (runtime !== null && (bestRuntimeMs === null || runtime < bestRuntimeMs)) {
        bestRuntimeMs = runtime;
      }
    }

    // Calculate runtime delta from immediately preceding attempt with runtime
    let runtimeDelta = null;
    let runtimeDeltaPercent = null;
    let isFaster = null;

    if (runtime !== null && prevRuntime !== null) {
      runtimeDelta = runtime - prevRuntime;
      if (prevRuntime > 0) {
        runtimeDeltaPercent = Math.round(((runtime - prevRuntime) / prevRuntime) * 100);
      }
      isFaster = runtime < prevRuntime;
    }

    if (runtime !== null) {
      prevRuntime = runtime;
    }

    return {
      _id: sub._id || `attempt-${attemptNumber}`,
      attemptNumber,
      problemId: sub.problemId,
      language: sub.language || "cpp",
      verdict,
      passed: sub.passed || 0,
      total: sub.total || 0,
      runtimeMs: runtime,
      runtimeDelta,
      runtimeDeltaPercent,
      isFaster,
      code: sub.code || "",
      createdAt: sub.createdAt || new Date().toISOString(),
    };
  });

  // Calculate overall runtime change from first valid runtime to latest valid runtime
  const runtimes = attempts
    .map((a) => a.runtimeMs)
    .filter((r) => typeof r === "number" && r > 0);

  let runtimeChangeOverall = null;
  let runtimeSpeedupPercent = null;

  if (runtimes.length >= 2) {
    const initial = runtimes[0];
    const latest = runtimes[runtimes.length - 1];
    runtimeChangeOverall = latest - initial;
    if (initial > 0) {
      runtimeSpeedupPercent = Math.round(((initial - latest) / initial) * 100);
    }
  }

  const latestAttempt = attempts[attempts.length - 1];

  return {
    totalAttempts: attempts.length,
    attempts, // Chronological
    attemptsReversed: [...attempts].reverse(), // Newest first
    verdictCounts,
    verdictTrend: attempts.map((a) => ({
      attemptNumber: a.attemptNumber,
      verdict: a.verdict,
      runtimeMs: a.runtimeMs,
    })),
    acceptedCount,
    acceptanceRate: Math.round((acceptedCount / attempts.length) * 100),
    firstAcceptedAttempt,
    bestRuntimeMs: bestRuntimeMs || (runtimes.length > 0 ? Math.min(...runtimes) : null),
    latestRuntimeMs: latestAttempt?.runtimeMs ?? null,
    runtimeChangeOverall,
    runtimeSpeedupPercent,
  };
}

/**
 * Compares two specific attempts side-by-side.
 *
 * @param {Object} attemptA - First attempt (typically earlier)
 * @param {Object} attemptB - Second attempt (typically later)
 * @returns {Object} Pairwise comparison details
 */
export function compareAttempts(attemptA, attemptB) {
  if (!attemptA || !attemptB) return null;

  const passedDelta = (attemptB.passed || 0) - (attemptA.passed || 0);

  let runtimeDelta = null;
  let runtimePercent = null;
  let isFaster = null;

  if (
    typeof attemptA.runtimeMs === "number" &&
    typeof attemptB.runtimeMs === "number" &&
    attemptA.runtimeMs > 0 &&
    attemptB.runtimeMs > 0
  ) {
    runtimeDelta = attemptB.runtimeMs - attemptA.runtimeMs;
    runtimePercent = Math.round(
      ((attemptA.runtimeMs - attemptB.runtimeMs) / attemptA.runtimeMs) * 100
    );
    isFaster = attemptB.runtimeMs < attemptA.runtimeMs;
  }

  const codeALines = (attemptA.code || "").split("\n").length;
  const codeBLines = (attemptB.code || "").split("\n").length;
  const linesDelta = codeBLines - codeALines;

  const verdictImproved =
    attemptA.verdict !== "ACCEPTED" && attemptB.verdict === "ACCEPTED";
  const verdictRegressed =
    attemptA.verdict === "ACCEPTED" && attemptB.verdict !== "ACCEPTED";

  return {
    attemptA,
    attemptB,
    passedDelta,
    runtimeDelta,
    runtimePercent,
    isFaster,
    linesDelta,
    verdictImproved,
    verdictRegressed,
    languageChanged: attemptA.language !== attemptB.language,
  };
}

/**
 * Groups a flat list of user submissions by problemId.
 *
 * @param {Array} submissions - Full list of submissions
 * @returns {Object} Map of problemId -> array of submissions
 */
export function groupSubmissionsByProblem(submissions = []) {
  const groups = {};
  if (!Array.isArray(submissions)) return groups;

  for (const sub of submissions) {
    const pId = sub.problemId;
    if (!pId) continue;
    if (!groups[pId]) {
      groups[pId] = [];
    }
    groups[pId].push(sub);
  }

  return groups;
}
