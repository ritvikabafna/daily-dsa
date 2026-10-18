import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateSubmissionAnalytics,
  compareAttempts,
  groupSubmissionsByProblem,
} from "../src/app/utils/submissionAnalytics.js";

test("Submission Analytics: Attempt Sequence & Chronology", () => {
  const mockSubmissions = [
    {
      _id: "sub-3",
      problemId: 1,
      language: "cpp",
      verdict: "ACCEPTED",
      passed: 5,
      total: 5,
      runtimeMs: 40,
      code: "int main() { /* optimized O(N) */ return 0; }",
      createdAt: "2026-10-18T10:30:00.000Z",
    },
    {
      _id: "sub-1",
      problemId: 1,
      language: "cpp",
      verdict: "WRONG_ANSWER",
      passed: 2,
      total: 5,
      runtimeMs: 120,
      code: "int main() { /* brute force O(N^2) */ return 0; }",
      createdAt: "2026-10-18T10:00:00.000Z",
    },
    {
      _id: "sub-2",
      problemId: 1,
      language: "cpp",
      verdict: "TIME_LIMIT_EXCEEDED",
      passed: 4,
      total: 5,
      runtimeMs: 200,
      code: "int main() { /* nested loop */ return 0; }",
      createdAt: "2026-10-18T10:15:00.000Z",
    },
  ];

  const analytics = calculateSubmissionAnalytics(mockSubmissions);

  assert.equal(analytics.totalAttempts, 3);
  // Must be sorted chronologically
  assert.equal(analytics.attempts[0]._id, "sub-1");
  assert.equal(analytics.attempts[0].attemptNumber, 1);
  assert.equal(analytics.attempts[1]._id, "sub-2");
  assert.equal(analytics.attempts[1].attemptNumber, 2);
  assert.equal(analytics.attempts[2]._id, "sub-3");
  assert.equal(analytics.attempts[2].attemptNumber, 3);

  // Verdict trend sequence
  assert.deepEqual(
    analytics.verdictTrend.map((t) => t.verdict),
    ["WRONG_ANSWER", "TIME_LIMIT_EXCEEDED", "ACCEPTED"]
  );

  // First accepted attempt
  assert.equal(analytics.firstAcceptedAttempt, 3);
  assert.equal(analytics.acceptedCount, 1);
  assert.equal(analytics.acceptanceRate, 33);
});

test("Submission Analytics: Runtime Delta Tracking", () => {
  const attempts = [
    {
      _id: "sub-1",
      problemId: 2,
      verdict: "ACCEPTED",
      runtimeMs: 150,
      createdAt: "2026-10-18T12:00:00.000Z",
    },
    {
      _id: "sub-2",
      problemId: 2,
      verdict: "ACCEPTED",
      runtimeMs: 90,
      createdAt: "2026-10-18T12:10:00.000Z",
    },
    {
      _id: "sub-3",
      problemId: 2,
      verdict: "ACCEPTED",
      runtimeMs: 45,
      createdAt: "2026-10-18T12:20:00.000Z",
    },
  ];

  const analytics = calculateSubmissionAnalytics(attempts);

  // Attempt 1: no previous runtime delta
  assert.equal(analytics.attempts[0].runtimeDelta, null);

  // Attempt 2: 90 - 150 = -60 ms (faster)
  assert.equal(analytics.attempts[1].runtimeDelta, -60);
  assert.equal(analytics.attempts[1].isFaster, true);
  assert.equal(analytics.attempts[1].runtimeDeltaPercent, -40); // 40% reduction

  // Attempt 3: 45 - 90 = -45 ms (faster)
  assert.equal(analytics.attempts[2].runtimeDelta, -45);
  assert.equal(analytics.attempts[2].isFaster, true);

  // Overall speedup from first (150ms) to latest (45ms)
  assert.equal(analytics.runtimeChangeOverall, -105);
  assert.equal(analytics.runtimeSpeedupPercent, 70); // 70% total speedup
  assert.equal(analytics.bestRuntimeMs, 45);
});

test("Submission Analytics: Pairwise Attempt Comparison", () => {
  const attemptA = {
    attemptNumber: 1,
    language: "cpp",
    verdict: "WRONG_ANSWER",
    passed: 2,
    total: 5,
    runtimeMs: 120,
    code: "// Line 1\n// Line 2\n// Line 3",
  };

  const attemptB = {
    attemptNumber: 2,
    language: "cpp",
    verdict: "ACCEPTED",
    passed: 5,
    total: 5,
    runtimeMs: 50,
    code: "// Line 1\n// Line 2\n// Line 3\n// Line 4\n// Line 5",
  };

  const comparison = compareAttempts(attemptA, attemptB);

  assert.equal(comparison.passedDelta, 3); // 2 -> 5 = +3
  assert.equal(comparison.runtimeDelta, -70); // 120 -> 50 = -70ms
  assert.equal(comparison.runtimePercent, 58); // 58% faster
  assert.equal(comparison.isFaster, true);
  assert.equal(comparison.verdictImproved, true);
  assert.equal(comparison.verdictRegressed, false);
  assert.equal(comparison.linesDelta, 2);
  assert.equal(comparison.languageChanged, false);
});

test("Submission Analytics: Reopen Code Integrity", () => {
  const sampleCode = `def solve(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i
    return []`;

  const submission = {
    _id: "sub-py-1",
    problemId: 1,
    language: "python",
    verdict: "ACCEPTED",
    passed: 5,
    total: 5,
    runtimeMs: 38,
    code: sampleCode,
    createdAt: "2026-10-18T14:00:00.000Z",
  };

  const analytics = calculateSubmissionAnalytics([submission]);
  const storedAttempt = analytics.attempts[0];

  assert.equal(storedAttempt.code, sampleCode);
  assert.equal(storedAttempt.language, "python");
});

test("Submission Analytics: Grouping by Problem", () => {
  const subs = [
    { problemId: 1, verdict: "ACCEPTED" },
    { problemId: 2, verdict: "WRONG_ANSWER" },
    { problemId: 1, verdict: "WRONG_ANSWER" },
    { problemId: 3, verdict: "ACCEPTED" },
  ];

  const grouped = groupSubmissionsByProblem(subs);
  assert.equal(Object.keys(grouped).length, 3);
  assert.equal(grouped[1].length, 2);
  assert.equal(grouped[2].length, 1);
  assert.equal(grouped[3].length, 1);
});
