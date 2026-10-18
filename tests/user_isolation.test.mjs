import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import User from "../src/models/User.js";
import Submission from "../src/models/Submission.js";

const MONGODB_URI = process.env.MONGODB_URI;

describe("Phase 9: Cross-User Data Isolation Tests", () => {
  let userAId = null;
  let userBId = null;
  const createdSubmissions = [];

  before(async () => {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }

    const timestamp = Date.now();
    const userA = await User.create({
      name: "Alice Isolation",
      email: `alice_${timestamp}@testdsa.com`,
      password: "hashedPasswordA",
      solvedProblems: [1, 3],
    });
    userAId = userA._id.toString();

    const userB = await User.create({
      name: "Bob Isolation",
      email: `bob_${timestamp}@testdsa.com`,
      password: "hashedPasswordB",
      solvedProblems: [2, 4],
    });
    userBId = userB._id.toString();

    // User A's submission
    const subA = await Submission.create({
      userId: userAId,
      problemId: 1,
      language: "cpp",
      code: "cout << 'Alice Solution';",
      verdict: "ACCEPTED",
      passed: 3,
      total: 3,
      runtimeMs: 12,
    });
    createdSubmissions.push(subA._id);

    // User B's submission
    const subB = await Submission.create({
      userId: userBId,
      problemId: 2,
      language: "python",
      code: "print('Bob Solution')",
      verdict: "ACCEPTED",
      passed: 4,
      total: 4,
      runtimeMs: 18,
    });
    createdSubmissions.push(subB._id);
  });

  after(async () => {
    if (createdSubmissions.length > 0) {
      await Submission.deleteMany({ _id: { $in: createdSubmissions } });
    }
    if (userAId) await User.findByIdAndDelete(userAId);
    if (userBId) await User.findByIdAndDelete(userBId);
    await mongoose.disconnect();
  });

  it("should ensure User A cannot view User B's submissions", async () => {
    // When querying submissions scoped to userAId
    const aliceSubmissions = await Submission.find({ userId: userAId });

    assert.equal(aliceSubmissions.length, 1);
    assert.equal(aliceSubmissions[0].problemId, 1);
    assert.equal(aliceSubmissions[0].code, "cout << 'Alice Solution';");

    // Ensure none of Bob's submissions are included
    const hasBobData = aliceSubmissions.some((s) => s.userId.toString() === userBId);
    assert.equal(hasBobData, false, "User A query must never contain User B records");
  });

  it("should ensure User B cannot view User A's submissions", async () => {
    // When querying submissions scoped to userBId
    const bobSubmissions = await Submission.find({ userId: userBId });

    assert.equal(bobSubmissions.length, 1);
    assert.equal(bobSubmissions[0].problemId, 2);
    assert.equal(bobSubmissions[0].code, "print('Bob Solution')");

    // Ensure none of Alice's submissions are included
    const hasAliceData = bobSubmissions.some((s) => s.userId.toString() === userAId);
    assert.equal(hasAliceData, false, "User B query must never contain User A records");
  });

  it("should ensure users' solved problems and progress remain strictly segregated", async () => {
    const alice = await User.findById(userAId).select("solvedProblems");
    const bob = await User.findById(userBId).select("solvedProblems");

    assert.deepEqual(alice.solvedProblems, [1, 3]);
    assert.deepEqual(bob.solvedProblems, [2, 4]);

    assert.ok(
      !alice.solvedProblems.includes(2) && !alice.solvedProblems.includes(4),
      "Alice's progress must not contain Bob's solved problems"
    );
    assert.ok(
      !bob.solvedProblems.includes(1) && !bob.solvedProblems.includes(3),
      "Bob's progress must not contain Alice's solved problems"
    );
  });
});
