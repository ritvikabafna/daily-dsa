import test from "node:test";
import assert from "node:assert/strict";
import { GET } from "../src/app/api/health/route.js";

test("Health Check Endpoint: Reports healthy status and system metrics", async () => {
  const response = await GET();
  assert.equal(response.status, 200);

  const data = await response.json();
  assert.equal(data.status, "healthy");
  assert.equal(typeof data.timestamp, "string");
  assert.equal(typeof data.uptimeSeconds, "number");
  assert.equal(data.database.status, "connected");
  assert.equal(typeof data.database.latencyMs, "number");
  assert.ok(data.system.memory.heapUsedMb > 0);
  assert.equal(typeof data.features.jwtConfigured, "boolean");
});
