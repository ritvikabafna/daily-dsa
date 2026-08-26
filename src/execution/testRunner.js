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

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];

    const result = await runTest(testCase);

    const passed = compareOutput(
      result.output,
      testCase.expectedOutput
    );

    results.push({
      testCase: i + 1,
      input: testCase.input,
      expectedOutput:
        testCase.expectedOutput,
      actualOutput: result.output,
      passed,
      error: result.error || null,
    });

    if (!passed) {
      break;
    }
  }

  const passedCount = results.filter(
    (result) => result.passed
  ).length;

  return {
    passed: passedCount,
    total: testCases.length,
    results,
    verdict:
      passedCount === testCases.length
        ? "ACCEPTED"
        : "WRONG_ANSWER",
  };
}