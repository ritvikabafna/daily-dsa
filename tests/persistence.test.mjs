import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import User from "../src/models/User.js";
import Submission from "../src/models/Submission.js";
import { runCpp } from "../src/execution/runner.js";
import { evaluateTestCases } from "../src/execution/testRunner.js";
import problems from "../src/app/data/problems.js";

const MONGODB_URI = process.env.MONGODB_URI;

describe("Phase 9: Accepted Submissions & MongoDB Persistence Tests", () => {
  const testEmail = `persist_user_${Date.now()}@testdsa.com`;
  let testUserId = null;
  const createdSubmissionIds = [];

  before(async () => {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }
    const user = await User.create({
      name: "Persistence Tester",
      email: testEmail,
      password: "hashedDummyPassword123",
      solvedProblems: [],
    });
    testUserId = user._id.toString();
  });

  after(async () => {
    if (createdSubmissionIds.length > 0) {
      await Submission.deleteMany({ _id: { $in: createdSubmissionIds } });
    }
    if (testUserId) {
      await User.findByIdAndDelete(testUserId);
    }
    await mongoose.disconnect();
  });

  it("should evaluate an accepted C++ solution and persist submission to MongoDB", async () => {
    const twoSumProblem = problems.find((p) => p.id === 1);
    assert.ok(twoSumProblem, "Problem #1 (Two Sum) should exist");

    // Canonical C++ solution for Two Sum
    const cppTwoSum = `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n, target;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> target;

    unordered_map<int, int> mp;
    for (int i = 0; i < n; i++) {
        int complement = target - nums[i];
        if (mp.count(complement)) {
            cout << mp[complement] << " " << i << endl;
            return 0;
        }
        mp[nums[i]] = i;
    }
    return 0;
}`;

    const evaluation = await evaluateTestCases(twoSumProblem.testCases, async (tc) => {
      return await runCpp(cppTwoSum, tc.input);
    });

    assert.equal(evaluation.verdict, "ACCEPTED");
    assert.equal(evaluation.passed, evaluation.total);

    // Persist submission to database
    const submission = await Submission.create({
      userId: testUserId,
      problemId: 1,
      language: "cpp",
      code: cppTwoSum,
      verdict: evaluation.verdict,
      passed: evaluation.passed,
      total: evaluation.total,
      runtimeMs: evaluation.runtimeMs || 10,
    });

    createdSubmissionIds.push(submission._id);
    assert.ok(submission._id, "Submission must have MongoDB _id");
    assert.equal(submission.verdict, "ACCEPTED");
    assert.equal(submission.problemId, 1);

    // Update user's solvedProblems set
    await User.findByIdAndUpdate(testUserId, {
      $addToSet: { solvedProblems: 1 },
    });

    // Verify user record reflects the solved problem
    const updatedUser = await User.findById(testUserId);
    assert.ok(updatedUser.solvedProblems.includes(1), "User's solvedProblems must contain Problem #1");

    // Verify fetching submission from DB
    const fetchedSubmission = await Submission.findOne({
      userId: testUserId,
      problemId: 1,
    });
    assert.ok(fetchedSubmission, "Persisted submission should be queryable");
    assert.equal(fetchedSubmission.verdict, "ACCEPTED");
    assert.equal(fetchedSubmission.language, "cpp");
  });
});
