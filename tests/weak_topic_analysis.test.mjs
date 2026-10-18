import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { analyzeWeakTopics } from "../src/app/utils/weakTopicAnalysis.js";

describe("Personalized Weak-Topic Analysis & Recommendations", () => {
  const mockProblems = [
    { id: 1, title: "Two Sum", topic: "Arrays", difficulty: "Easy" },
    { id: 2, title: "3Sum", topic: "Arrays", difficulty: "Medium" },
    { id: 3, title: "Valid Palindrome", topic: "Two Pointers", difficulty: "Easy" },
    { id: 4, title: "Container With Most Water", topic: "Two Pointers", difficulty: "Medium" },
    { id: 5, title: "Trapping Rain Water", topic: "Two Pointers", difficulty: "Hard" },
    { id: 6, title: "Climbing Stairs", topic: "Dynamic Programming", difficulty: "Easy" },
    { id: 7, title: "Coin Change", topic: "Dynamic Programming", difficulty: "Medium" },
  ];

  it("should flag a topic as 'Needs Focus' when the user has multiple wrong answers", () => {
    // User repeatedly fails on Two Pointers (Problem #3)
    const mockSubmissions = [
      { problemId: 3, verdict: "WRONG_ANSWER" },
      { problemId: 3, verdict: "TIME_LIMIT_EXCEEDED" },
      { problemId: 1, verdict: "ACCEPTED" },
    ];
    const solvedProblems = [1];

    const result = analyzeWeakTopics(mockSubmissions, mockProblems, solvedProblems);

    assert.equal(result.hasWeakTopics, true);
    assert.equal(result.totalFailures, 2);

    const twoPointersStat = result.topicStats.find((t) => t.topic === "Two Pointers");
    assert.ok(twoPointersStat);
    assert.equal(twoPointersStat.wrongAttempts, 2);
    assert.equal(twoPointersStat.errorRate, 100);
    assert.equal(twoPointersStat.status, "Needs Focus");

    // Two Pointers should be the top weak topic
    assert.equal(result.weakTopics[0].topic, "Two Pointers");
  });

  it("should recommend Easy foundational challenge if user struggled with that topic and hasn't solved Easy", () => {
    const mockSubmissions = [
      { problemId: 3, verdict: "WRONG_ANSWER" },
      { problemId: 3, verdict: "WRONG_ANSWER" },
    ];
    const solvedProblems = [];

    const result = analyzeWeakTopics(mockSubmissions, mockProblems, solvedProblems);

    // Recommended problem should be Easy Valid Palindrome
    const firstRec = result.recommendedProblems[0];
    assert.ok(firstRec);
    assert.equal(firstRec.id, 3);
    assert.equal(firstRec.difficulty, "Easy");
    assert.equal(firstRec.topic, "Two Pointers");
    assert.equal(firstRec.badge, "Reinforce Foundation");
    assert.ok(firstRec.rationale.includes("fundamentals with this Easy challenge"));
  });

  it("should recommend Medium challenge if user already solved Easy problems in the weak topic", () => {
    // User already solved Easy Problem #3, but failed on Problem #4 (Medium)
    const mockSubmissions = [
      { problemId: 4, verdict: "WRONG_ANSWER" },
      { problemId: 4, verdict: "TIME_LIMIT_EXCEEDED" },
      { problemId: 3, verdict: "ACCEPTED" },
    ];
    const solvedProblems = [3];

    const result = analyzeWeakTopics(mockSubmissions, mockProblems, solvedProblems);

    const firstRec = result.recommendedProblems[0];
    assert.ok(firstRec);
    assert.equal(firstRec.topic, "Two Pointers");
    assert.equal(firstRec.difficulty, "Medium");
    assert.equal(firstRec.badge, "Overcome Setback");
    assert.ok(firstRec.rationale.includes("Medium challenge"));
  });

  it("should recommend breadth expansion and progression when user has no failures", () => {
    const mockSubmissions = [
      { problemId: 1, verdict: "ACCEPTED" },
    ];
    const solvedProblems = [1];

    const result = analyzeWeakTopics(mockSubmissions, mockProblems, solvedProblems);

    assert.equal(result.hasWeakTopics, false);
    assert.ok(result.recommendedProblems.length > 0);
    // Should recommend next in path or breadth expansion
    const firstRec = result.recommendedProblems[0];
    assert.ok(firstRec.badge.includes("In Path") || firstRec.badge.includes("Breadth"));
  });
});
