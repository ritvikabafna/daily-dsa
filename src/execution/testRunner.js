export function normalizeOutput(output) {
  return String(output || "")
    .trim()
    .replace(/\s+/g, " ");
}

export function compareOutput(actual, expected) {
  return (
    normalizeOutput(actual) ===
    normalizeOutput(expected)
  );
}

export async function evaluateTestCases(
  testCases,
  runTest
) {
  const results = [];
  let totalRuntimeMs = 0;

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];

    const result = await runTest(testCase);
    const runtimeMs = result.executionTimeMs || 0;
    totalRuntimeMs += runtimeMs;

    // Execution failed
    if (!result.success) {
      results.push({
        testCase: i + 1,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: result.output || "",
        passed: false,
        verdict: result.verdict,
        error: result.error || null,
        runtimeMs,
      });

      break;
    }

    // Compare normal output
    const passed = compareOutput(
      result.output,
      testCase.expectedOutput
    );

    results.push({
      testCase: i + 1,
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: result.output,
      passed,
      verdict: passed
        ? "PASSED"
        : "WRONG_ANSWER",
      error: result.error || null,
      runtimeMs,
    });
  }

  const passedCount = results.filter(
    (result) => result.passed
  ).length;

  const failedResult = results.find(
    (result) => !result.passed
  );

  let verdict = "ACCEPTED";

  if (failedResult) {
    verdict =
      failedResult.verdict ||
      "WRONG_ANSWER";
  }

  return {
    passed: passedCount,
    total: testCases.length,
    results,
    verdict,
    runtimeMs: totalRuntimeMs,
  };
}