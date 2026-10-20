import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getStarterTemplate } from "../src/app/data/starterTemplates.js";
import { wrapSolutionWithDriver } from "../src/execution/solutionHarness.js";
import { runCpp, runPython } from "../src/execution/runner.js";
import { evaluateTestCases } from "../src/execution/testRunner.js";
import problems from "../src/app/data/problems.js";

describe("LeetCode-Style Starter Templates & Execution Harness", () => {
  it("should provide class Solution starter templates for C++ and Python", () => {
    // Problem 1: Two Sum
    const cpp1 = getStarterTemplate(1, "cpp");
    assert.ok(cpp1.includes("class Solution"), "C++ starter template must contain class Solution");
    assert.ok(cpp1.includes("twoSum"), "C++ starter template must declare twoSum function");

    const py1 = getStarterTemplate(1, "python");
    assert.ok(py1.includes("class Solution:"), "Python starter template must contain class Solution:");
    assert.ok(py1.includes("def twoSum"), "Python starter template must declare twoSum function");

    // Problem 13: Valid Palindrome (example from user prompt)
    const cpp13 = getStarterTemplate(13, "cpp");
    assert.ok(cpp13.includes("bool isPalindrome"), "C++ starter template must declare isPalindrome");

    const py13 = getStarterTemplate(13, "python");
    assert.ok(py13.includes("def isPalindrome"), "Python starter template must declare isPalindrome");
  });

  it("should wrap C++ class Solution with driver and pass test cases for Two Sum", async () => {
    const userCode = `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < (int)nums.size(); ++i) {
            int comp = target - nums[i];
            if (seen.count(comp)) return {seen[comp], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`;

    const wrapped = wrapSolutionWithDriver(userCode, 1, "cpp");
    assert.ok(wrapped.includes("int main("), "Wrapped C++ code should include test driver main");

    const prob1 = problems.find((p) => p.id === 1);
    assert.ok(prob1 && prob1.testCases.length > 0, "Problem 1 must have test cases");

    const evaluation = await evaluateTestCases(prob1.testCases, async (tc) => {
      return await runCpp(wrapped, tc.input);
    });

    assert.equal(evaluation.verdict, "ACCEPTED");
    assert.equal(evaluation.passed, prob1.testCases.length);
  });

  it("should wrap Python class Solution with driver and pass test cases for Two Sum", async () => {
    const userCode = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            comp = target - num
            if comp in seen:
                return [seen[comp], i]
            seen[num] = i
        return []
`;

    const wrapped = wrapSolutionWithDriver(userCode, 1, "python");
    assert.ok(wrapped.includes("if __name__ == '__main__':"), "Wrapped Python code should include test driver main");

    const prob1 = problems.find((p) => p.id === 1);
    const evaluation = await evaluateTestCases(prob1.testCases, async (tc) => {
      return await runPython(wrapped, tc.input);
    });

    assert.equal(evaluation.verdict, "ACCEPTED");
    assert.equal(evaluation.passed, prob1.testCases.length);
  });

  it("should leave standard competitive programming main() solutions untouched", () => {
    const rawCpp = `#include <iostream>
int main() {
    std::cout << "0 1" << std::endl;
    return 0;
}`;
    const wrapped = wrapSolutionWithDriver(rawCpp, 1, "cpp");
    assert.equal(wrapped, rawCpp, "Solutions with existing main() must not be modified");
  });
});
