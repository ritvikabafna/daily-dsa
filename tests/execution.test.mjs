import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { runCpp, runPython } from "../src/execution/runner.js";
import { evaluateTestCases } from "../src/execution/testRunner.js";

describe("Phase 9: Code Execution & Error Diagnostics Tests", () => {
  it("should detect C++ compilation error for invalid syntax", async () => {
    const invalidCpp = `#include <iostream>
int main() {
    this_is_not_valid_cpp_syntax
    return 0;
}`;
    const result = await runCpp(invalidCpp, "");
    assert.equal(result.success, false);
    assert.equal(result.verdict, "COMPILATION_ERROR");
    assert.ok(result.error, "Compilation error diagnostics must be present");
  });

  it("should detect Python compilation / syntax error", async () => {
    const invalidPy = `def broken_func(:\n    pass`;
    const result = await runPython(invalidPy, "");
    assert.equal(result.success, false);
    assert.equal(result.verdict, "COMPILATION_ERROR");
    assert.ok(result.error, "SyntaxError diagnostics must be present");
  });

  it("should catch wrong answers through test runner assertions", async () => {
    const sampleTestCases = [
      { id: 1, input: "2 3\n", output: "5\n" },
      { id: 2, input: "10 20\n", output: "30\n" },
    ];

    // Python code that gives wrong answer (returns 0 instead of sum)
    const wrongAnswerPy = `
import sys
tokens = sys.stdin.read().split()
if tokens:
    print(0)
`;

    const evaluation = await evaluateTestCases(sampleTestCases, async (tc) => {
      return await runPython(wrongAnswerPy, tc.input);
    });

    assert.equal(evaluation.verdict, "WRONG_ANSWER");
    assert.equal(evaluation.passed, 0);
    assert.equal(evaluation.total, 2);
    assert.equal(evaluation.results[0].passed, false);
  });

  it("should catch and terminate Python infinite loop with TIME_LIMIT_EXCEEDED", async () => {
    const infiniteLoopPy = `
while True:
    pass
`;
    const result = await runPython(infiniteLoopPy, "");
    assert.equal(result.success, false);
    assert.equal(result.verdict, "TIME_LIMIT_EXCEEDED");
    assert.ok(result.error.includes("time limit"), "Error should indicate time limit exceeded");
  });

  it("should terminate programs producing excessive output with OUTPUT_LIMIT_EXCEEDED", async () => {
    const hugeOutputPy = `
for _ in range(50000):
    print("OUTPUT_LIMIT_TEST_" * 50)
`;
    const result = await runPython(hugeOutputPy, "");
    assert.equal(result.success, false);
    assert.equal(result.verdict, "OUTPUT_LIMIT_EXCEEDED");
  });
});
