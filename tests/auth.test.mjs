import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../src/models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "iLoveMummy";
const MONGODB_URI = process.env.MONGODB_URI;

describe("Phase 9: Authentication & Session Tests", () => {
  const testEmail = `authtest_${Date.now()}@testdsa.com`;
  const testPassword = "securePassword123";
  let createdUserId = null;

  before(async () => {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }
  });

  after(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId);
    }
    await mongoose.disconnect();
  });

  it("should successfully hash password and sign up a new user", async () => {
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    const user = await User.create({
      name: "DSA Tester",
      email: testEmail,
      password: hashedPassword,
    });

    createdUserId = user._id.toString();
    assert.ok(createdUserId, "User ID should be generated");
    assert.equal(user.email, testEmail);
    assert.notEqual(user.password, testPassword, "Stored password must be hashed");

    const isMatch = await bcrypt.compare(testPassword, user.password);
    assert.equal(isMatch, true, "Hashed password must verify correctly with bcrypt");
  });

  it("should prevent duplicate accounts with the same email", async () => {
    const existing = await User.findOne({ email: testEmail });
    assert.ok(existing, "Existing user should be detected in database");

    let duplicateCreated = false;
    try {
      await User.create({
        name: "Duplicate User",
        email: testEmail,
        password: "anotherPassword",
      });
      duplicateCreated = true;
    } catch {
      // Expected duplicate key error (or caught by logic)
    }

    assert.equal(duplicateCreated, false, "Duplicate email registration must fail");
  });

  it("should authenticate with correct credentials and issue valid JWT", async () => {
    const user = await User.findOne({ email: testEmail });
    assert.ok(user, "User should be found");

    const validPassword = await bcrypt.compare(testPassword, user.password);
    assert.equal(validPassword, true, "Password check should succeed");

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    assert.ok(token, "JWT token should be generated");
    const decoded = jwt.verify(token, JWT_SECRET);
    assert.equal(decoded.userId, user._id.toString());
    assert.equal(decoded.email, testEmail);
  });

  it("should reject authentication with wrong password", async () => {
    const user = await User.findOne({ email: testEmail });
    assert.ok(user, "User should be found");

    const invalidPassword = await bcrypt.compare("wrongSecretPassword", user.password);
    assert.equal(invalidPassword, false, "Invalid password must be rejected");
  });

  it("should reject expired JWTs", () => {
    const expiredToken = jwt.sign(
      { userId: createdUserId, email: testEmail },
      JWT_SECRET,
      { expiresIn: "-1s" }
    );

    assert.throws(
      () => {
        jwt.verify(expiredToken, JWT_SECRET);
      },
      (err) => {
        return err.name === "TokenExpiredError";
      },
      "Expired token must throw TokenExpiredError"
    );
  });

  it("should reject forged JWTs with incorrect signature", () => {
    const validToken = jwt.sign(
      { userId: createdUserId, email: testEmail },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    assert.throws(
      () => {
        jwt.verify(validToken, "completely_wrong_secret_key");
      },
      (err) => {
        return err.name === "JsonWebTokenError";
      },
      "Forged token must throw JsonWebTokenError"
    );
  });
});
