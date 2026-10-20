import fs from 'fs';
import path from 'path';
import { chunk1Problems, chunk1Editorials } from './data/chunk1.mjs';
import { chunk2Problems, chunk2Editorials } from './data/chunk2.mjs';
import { chunk3Problems, chunk3Editorials } from './data/chunk3.mjs';
import { editorials33to50 } from './data/editorials-33-50.mjs';
import { metadata51to100 } from './data/metadata-51-100.mjs';

async function run() {
  console.log('Merging problem data...');

  // 1. Problems
  const existingProblemsModule = await import('../src/app/data/problems.js');
  const existingProblems = existingProblemsModule.default;
  console.log('Existing problems count:', existingProblems.length);

  // Take only 1..50 from existing in case script is rerun
  const base50 = existingProblems.filter(p => p.id <= 50);
  const allProblems = [
    ...base50,
    ...chunk1Problems,
    ...chunk2Problems,
    ...chunk3Problems
  ];

  console.log('Total merged problems:', allProblems.length);

  const problemsCode = `// Complete curated DSA curriculum of 100 high-quality problems from Striver SDE & Love Babbar 450 sheets
const problems = ${JSON.stringify(allProblems, null, 2)};

export default problems;
`;
  fs.writeFileSync('src/app/data/problems.js', problemsCode, 'utf8');
  console.log('src/app/data/problems.js updated successfully.');

  // 2. Editorials
  const existingEditorialsModule = await import('../src/app/data/editorials.js');
  const existingEditorials = existingEditorialsModule.default;

  const mergedEditorials = {
    ...existingEditorials,
    ...editorials33to50,
    ...chunk1Editorials,
    ...chunk2Editorials,
    ...chunk3Editorials
  };

  console.log('Total merged editorials count:', Object.keys(mergedEditorials).length);

  const editorialsCode = `// Canonical multi-approach solutions and editorials for all 100 curated DSA problems
const editorials = ${JSON.stringify(mergedEditorials, null, 2)};

export function getEditorial(problem) {
  if (!problem) return null;

  const existing = editorials[problem.id];
  if (existing) {
    return {
      title: existing.title || problem.title,
      timeComplexity: existing.approaches?.[0]?.timeComplexity || "O(N)",
      spaceComplexity: existing.approaches?.[0]?.spaceComplexity || "O(1)",
      approach: existing.approaches?.[0]?.description || "",
      keyTakeaway: existing.approaches?.[0]?.keyTakeaway || "",
      cpp: existing.approaches?.[0]?.cpp || "",
      python: existing.approaches?.[0]?.python || "",
      approaches: existing.approaches || [],
      edgeCases: existing.edgeCases || [],
      dryRun: existing.dryRun || null,
    };
  }

  return null;
}

export default editorials;
`;
  fs.writeFileSync('src/app/data/editorials.js', editorialsCode, 'utf8');
  console.log('src/app/data/editorials.js updated successfully.');

  // 3. Problem Metadata
  const metadataFile = fs.readFileSync('src/app/data/problemMetadata.js', 'utf8');
  // Load current PROBLEM_METADATA
  const metadataModule = await import('../src/app/data/problemMetadata.js');
  const currentMeta = metadataModule.PROBLEM_METADATA;

  const mergedMeta = {
    ...currentMeta,
    ...metadata51to100
  };

  console.log('Total merged metadata keys:', Object.keys(mergedMeta).length);

  const metadataCode = `export const ALL_COMPANIES = [
  "All Companies",
  "Google",
  "Amazon",
  "Meta",
  "Microsoft",
  "Apple",
  "Netflix",
  "Bloomberg",
  "Uber",
];

export const ALL_TAGS = [
  "All Patterns",
  "Array",
  "String",
  "Linked List",
  "Hash Table",
  "Two Pointers",
  "Sliding Window",
  "Dynamic Programming",
  "Stack",
  "Sorting",
  "Greedy",
  "Recursion",
  "Prefix Sum",
  "Math",
  "Design",
  "Monotonic Stack",
  "Priority Queue",
  "Heap",
  "Graphs",
  "Binary Search Tree",
  "Tree",
  "Binary Search",
  "Matrix",
  "Backtracking",
  "Graph",
  "Topological Sort",
  "Divide and Conquer"
];

export const PROBLEM_METADATA = ${JSON.stringify(mergedMeta, null, 2)};

export function enrichProblem(problem) {
  if (!problem) return problem;
  const meta = PROBLEM_METADATA[problem.id];
  return {
    ...problem,
    companies: meta?.companies || ["Google", "Amazon"],
    tags: Array.from(new Set([...(problem.tags || []), ...(meta?.tags || [problem.topic])])),
  };
}
`;
  fs.writeFileSync('src/app/data/problemMetadata.js', metadataCode, 'utf8');
  console.log('src/app/data/problemMetadata.js updated successfully.');

  console.log('All 100 problems, editorials, and metadata successfully merged!');
}

run().catch(err => {
  console.error('Error during merge:', err);
  process.exit(1);
});
