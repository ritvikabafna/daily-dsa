import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "../src/app/api/ai/coach/route.js";

test("AI Coach Route: Missing API key handling", async () => {
  // Save original env
  const origKey = process.env.GEMINI_API_KEY;
  const origGoogleKey = process.env.GOOGLE_API_KEY;
  delete process.env.GEMINI_API_KEY;
  delete process.env.GOOGLE_API_KEY;

  try {
    const mockReq = {
      json: async () => ({
        problemId: 1,
        problemTitle: "Two Sum",
        code: "int main() {}",
        language: "cpp",
        mode: "explain_mistake",
      }),
    };

    const response = await POST(mockReq);
    assert.equal(response.status, 400);

    const body = await response.json();
    assert.equal(body.success, false);
    assert.equal(body.needsApiKey, true);
    assert.match(body.message, /GEMINI_API_KEY/i);
  } finally {
    // Restore
    if (origKey) process.env.GEMINI_API_KEY = origKey;
    if (origGoogleKey) process.env.GOOGLE_API_KEY = origGoogleKey;
  }
});

test("AI Coach Route: Session API Key parameter validation", async () => {
  // Test invalid key rejection without crashing
  const mockReq = {
    json: async () => ({
      problemId: 1,
      problemTitle: "Two Sum",
      code: "int main() {}",
      language: "cpp",
      mode: "explain_mistake",
      sessionApiKey: "invalid_test_key_xyz",
    }),
  };

  const response = await POST(mockReq);
  const body = await response.json();

  assert.equal(response.status, 500);
  assert.equal(body.success, false);
  assert.ok(body.needsApiKey !== undefined);
});
