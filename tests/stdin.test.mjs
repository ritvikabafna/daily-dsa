import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { runCpp, runPython } from "../src/execution/runner.js";

describe("Phase 9: Custom Stdin & Empty Input Tests", () => {
  it("should process custom stdin correctly in C++", async () => {
    const cppStdinCode = `#include <iostream>
int main() {
    int a, b;
    if (std::cin >> a >> b) {
        std::cout << (a * b) << std::endl;
    }
    return 0;
}`;
    const result = await runCpp(cppStdinCode, "7 8\n");
    assert.equal(result.success, true);
    assert.equal(result.verdict, "EXECUTED");
    assert.equal(result.output.trim(), "56");
  });

  it("should process custom multi-line stdin correctly in Python", async () => {
    const pyStdinCode = `
import sys
lines = [line.strip() for line in sys.stdin.readlines() if line.strip()]
print(",".join(reversed(lines)))
`;
    const result = await runPython(pyStdinCode, "alpha\nbeta\ngamma\n");
    assert.equal(result.success, true);
    assert.equal(result.verdict, "EXECUTED");
    assert.equal(result.output.trim(), "gamma,beta,alpha");
  });

  it("should gracefully handle empty input in C++", async () => {
    const cppEmptyInputCode = `#include <iostream>
int main() {
    std::string s;
    if (!(std::cin >> s)) {
        std::cout << "NO_INPUT" << std::endl;
    }
    return 0;
}`;
    const result = await runCpp(cppEmptyInputCode, "");
    assert.equal(result.success, true);
    assert.equal(result.verdict, "EXECUTED");
    assert.equal(result.output.trim(), "NO_INPUT");
  });

  it("should gracefully handle empty input in Python", async () => {
    const pyEmptyInputCode = `
import sys
data = sys.stdin.read()
if len(data) == 0:
    print("EMPTY_STDIN_HANDLED")
`;
    const result = await runPython(pyEmptyInputCode, "");
    assert.equal(result.success, true);
    assert.equal(result.verdict, "EXECUTED");
    assert.equal(result.output.trim(), "EMPTY_STDIN_HANDLED");
  });
});
