import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateRevisionSchedule,
  recordRevisionCompletion,
  DEFAULT_INTERVALS,
} from "../src/app/utils/revisionSystem.js";

describe("Smart Revision System: Intervals & Tracking", () => {
  const mockProblems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays" },
    { id: 2, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays" },
    { id: 3, title: "Contains Duplicate", difficulty: "Easy", topic: "Arrays" },
    { id: 4, title: "Product of Array Except Self", difficulty: "Medium", topic: "Arrays" },
  ];

  it("should assign difficult interval (2 days) to problems solved with multiple failures", () => {
    const solvedProblemIds = [1];
    const now = new Date("2026-10-18T10:00:00Z");
    const submissions = [
      { problemId: 1, verdict: "WRONG_ANSWER", createdAt: "2026-10-18T08:00:00Z" },
      { problemId: 1, verdict: "TIME_LIMIT_EXCEEDED", createdAt: "2026-10-18T08:30:00Z" },
      { problemId: 1, verdict: "ACCEPTED", createdAt: "2026-10-18T09:00:00Z" },
    ];

    const result = calculateRevisionSchedule({
      solvedProblemIds,
      submissions,
      problems: mockProblems,
      now,
    });

    const item = result.schedule[1];
    assert.ok(item, "Problem 1 should be scheduled");
    assert.equal(item.struggled, true);
    assert.equal(item.difficultyRating, "difficult");
    assert.equal(item.currentIntervalDays, DEFAULT_INTERVALS.difficult);
    assert.equal(item.failureCount, 2);

    // Next due should be 2 days from solve time
    const expectedDue = new Date(
      new Date("2026-10-18T09:00:00Z").getTime() + 2 * 24 * 60 * 60 * 1000
    ).toISOString();
    assert.equal(item.nextDueDate, expectedDue);
  });

  it("should assign medium interval (5 days) for 1 failure and easy interval (14 days) for 0 failures", () => {
    const solvedProblemIds = [2, 3];
    const now = new Date("2026-10-18T10:00:00Z");
    const submissions = [
      { problemId: 2, verdict: "WRONG_ANSWER", createdAt: "2026-10-18T08:00:00Z" },
      { problemId: 2, verdict: "ACCEPTED", createdAt: "2026-10-18T09:00:00Z" },
      { problemId: 3, verdict: "ACCEPTED", createdAt: "2026-10-18T09:00:00Z" },
    ];

    const result = calculateRevisionSchedule({
      solvedProblemIds,
      submissions,
      problems: mockProblems,
      now,
    });

    assert.equal(result.schedule[2].difficultyRating, "medium");
    assert.equal(result.schedule[2].currentIntervalDays, DEFAULT_INTERVALS.medium);
    assert.equal(result.schedule[2].struggled, false);

    assert.equal(result.schedule[3].difficultyRating, "easy");
    assert.equal(result.schedule[3].currentIntervalDays, DEFAULT_INTERVALS.easy);
    assert.equal(result.schedule[3].struggled, false);
  });

  it("should correctly populate due-for-revision list and flag overdue problems", () => {
    // Problem 1 was solved 5 days ago with difficulty (2-day interval -> 3 days overdue)
    // Problem 2 was solved 1 day ago with easy (14-day interval -> upcoming in 13 days)
    const solvedProblemIds = [1, 2];
    const now = new Date("2026-10-18T10:00:00Z");
    const submissions = [
      { problemId: 1, verdict: "WRONG_ANSWER", createdAt: "2026-10-13T10:00:00Z" },
      { problemId: 1, verdict: "WRONG_ANSWER", createdAt: "2026-10-13T10:15:00Z" },
      { problemId: 1, verdict: "ACCEPTED", createdAt: "2026-10-13T10:30:00Z" },
      { problemId: 2, verdict: "ACCEPTED", createdAt: "2026-10-17T10:00:00Z" },
    ];

    const result = calculateRevisionSchedule({
      solvedProblemIds,
      submissions,
      problems: mockProblems,
      now,
    });

    assert.equal(result.stats.dueCount, 1);
    assert.equal(result.stats.overdueCount, 1);
    assert.equal(result.dueList[0].problemId, 1);
    assert.equal(result.dueList[0].status, "overdue");
    assert.ok(result.dueList[0].daysOverdue >= 2);

    assert.equal(result.stats.upcomingCount, 1);
    assert.equal(result.upcomingList[0].problemId, 2);
    assert.equal(result.upcomingList[0].status, "upcoming");
    assert.ok(result.upcomingList[0].daysUntilDue >= 12);
  });

  it("should record revision completion and advance intervals based on user rating", () => {
    const solvedProblemIds = [1];
    const now = new Date("2026-10-18T10:00:00Z");
    const submissions = [
      { problemId: 1, verdict: "WRONG_ANSWER", createdAt: "2026-10-13T10:00:00Z" },
      { problemId: 1, verdict: "WRONG_ANSWER", createdAt: "2026-10-13T10:15:00Z" },
      { problemId: 1, verdict: "ACCEPTED", createdAt: "2026-10-13T10:30:00Z" },
    ];

    const initial = calculateRevisionSchedule({
      solvedProblemIds,
      submissions,
      problems: mockProblems,
      now,
    });

    assert.equal(initial.dueList.length, 1);
    assert.equal(initial.schedule[1].revisionCount, 0);

    // User revises problem 1 and marks it as 'medium' (good recall)
    const updatedSchedule = recordRevisionCompletion({
      existingSchedule: initial.schedule,
      problemId: 1,
      rating: "medium",
      revisionDate: now,
    });

    const revisedItem = updatedSchedule[1];
    assert.equal(revisedItem.revisionCount, 1);
    assert.equal(revisedItem.difficultyRating, "medium");
    assert.equal(revisedItem.history.length, 1);
    assert.equal(revisedItem.history[0].rating, "medium");
    assert.ok(revisedItem.currentIntervalDays >= 4, "Interval should expand on good revision");

    // Recalculate schedule with the updated state
    const postRevision = calculateRevisionSchedule({
      solvedProblemIds,
      submissions,
      problems: mockProblems,
      existingSchedule: updatedSchedule,
      now,
    });

    assert.equal(postRevision.dueList.length, 0, "Problem should no longer be due immediately");
    assert.equal(postRevision.upcomingList.length, 1, "Problem should now be scheduled in upcoming");
    assert.equal(postRevision.completedList.length, 1, "Problem should appear in completed revisions list");
    assert.equal(postRevision.stats.completedRevisionsCount, 1);
  });
});
