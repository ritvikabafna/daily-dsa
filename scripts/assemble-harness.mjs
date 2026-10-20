import fs from 'fs';
import path from 'path';
import { group1 } from './templates/group1.mjs';
import { group2 } from './templates/group2.mjs';
import { group3 } from './templates/group3.mjs';
import { group4 } from './templates/group4.mjs';

const allTemplates = {
  ...group1,
  ...group2,
  ...group3,
  ...group4
};

console.log('Total templates loaded:', Object.keys(allTemplates).length);

// 1. Generate src/app/data/starterTemplates.js
const starterTemplatesMap = {};
const driversMap = {};

for (const [id, data] of Object.entries(allTemplates)) {
  starterTemplatesMap[id] = {
    cpp: data.cppSig,
    python: data.pySig
  };
  driversMap[id] = {
    cpp: data.cppDriver,
    python: data.pyDriver
  };
}

const starterTemplatesCode = `// LeetCode-style starter code templates for all 100 DSA problems
export const PROBLEM_TEMPLATES = ${JSON.stringify(starterTemplatesMap, null, 2)};

export const DEFAULT_STARTER_TEMPLATES = {
  cpp: \`class Solution {
public:
    // Write your solution here
};
\`,
  python: \`class Solution:
    # Write your solution here
    pass
\`
};

export function getStarterTemplate(problemId, language = "cpp") {
  const normalizedLang = language === "python" ? "python" : "cpp";
  const problemMeta = PROBLEM_TEMPLATES[problemId];
  if (problemMeta && problemMeta[normalizedLang]) {
    return problemMeta[normalizedLang];
  }
  return DEFAULT_STARTER_TEMPLATES[normalizedLang] || "";
}

export default PROBLEM_TEMPLATES;
`;

fs.writeFileSync('src/app/data/starterTemplates.js', starterTemplatesCode, 'utf8');
console.log('src/app/data/starterTemplates.js written successfully.');

// 2. Generate src/execution/solutionHarness.js
const commonCppPreamble = `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <map>
#include <set>
#include <unordered_set>
#include <queue>
#include <stack>
#include <deque>
#include <cmath>
#include <climits>
#include <iomanip>
#include <numeric>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};
`;

const commonPyPreamble = `
import sys
import math
import bisect
import heapq
from collections import defaultdict, Counter, deque
from typing import List, Optional, Tuple, Dict, Set, Any

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
`;

const harnessCode = `// Harness to wrap LeetCode-style Solution class code with driver main()
export const PROBLEM_DRIVERS = ${JSON.stringify(driversMap, null, 2)};

const COMMON_CPP_PREAMBLE = ${JSON.stringify(commonCppPreamble)};
const COMMON_PY_PREAMBLE = ${JSON.stringify(commonPyPreamble)};

export function wrapSolutionWithDriver(code, problemId, language = "cpp") {
  if (!code || typeof code !== "string") return code;

  const isCpp = language === "cpp";
  const isPython = language === "python";

  // If user provided a complete program with their own main entrypoint, execute directly
  if (isCpp && (code.includes("int main(") || code.includes("void main("))) {
    return code;
  }
  if (isPython && (code.includes("if __name__ == '__main__':") || code.includes('if __name__ == "__main__":'))) {
    return code;
  }

  // Check if user submitted LeetCode class Solution or class MyQueue / MinStack
  const hasLeetcodeClass = code.includes("class Solution") ||
                           code.includes("class MyQueue") ||
                           code.includes("class MinStack");

  const driverInfo = PROBLEM_DRIVERS[problemId];

  if (!driverInfo) {
    return code;
  }

  if (isCpp) {
    // Append standard preamble, user code, and problem driver
    const driver = driverInfo.cpp || "";
    return \`\${COMMON_CPP_PREAMBLE}\\n\${code}\\n\${driver}\`;
  }

  if (isPython) {
    // Append python typing, user code, and problem driver
    const driver = driverInfo.python || "";
    return \`\${COMMON_PY_PREAMBLE}\\n\${code}\\n\${driver}\`;
  }

  return code;
}
`;

fs.writeFileSync('src/execution/solutionHarness.js', harnessCode, 'utf8');
console.log('src/execution/solutionHarness.js written successfully.');
