export const ALL_COMPANIES = [
  "All Companies",
  "Google",
  "Amazon",
  "Meta",
  "Microsoft",
  "Apple",
  "Netflix",
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
];

export const PROBLEM_METADATA = {
  1: {
    companies: ["Google", "Amazon", "Meta", "Apple"],
    tags: ["Array", "Hash Table"],
  },
  2: {
    companies: ["Amazon", "Microsoft", "Meta", "Google"],
    tags: ["Array", "Dynamic Programming"],
  },
  3: {
    companies: ["Apple", "Amazon", "Microsoft"],
    tags: ["Array", "Hash Table", "Sorting"],
  },
  4: {
    companies: ["Amazon", "Microsoft", "Google", "Meta"],
    tags: ["Array", "Dynamic Programming"],
  },
  5: {
    companies: ["Meta", "Microsoft", "Amazon"],
    tags: ["Array", "Two Pointers"],
  },
  6: {
    companies: ["Amazon", "Google"],
    tags: ["Array", "Greedy"],
  },
  7: {
    companies: ["Amazon", "Google", "Microsoft"],
    tags: ["Array", "Hash Table", "Sorting"],
  },
  8: {
    companies: ["Meta", "Microsoft"],
    tags: ["Array", "Two Pointers", "Sorting"],
  },
  9: {
    companies: ["Amazon", "Microsoft"],
    tags: ["Array", "Two Pointers"],
  },
  10: {
    companies: ["Meta", "Microsoft"],
    tags: ["String", "Two Pointers"],
  },
  11: {
    companies: ["Google", "Amazon"],
    tags: ["String", "Hash Table", "Sorting"],
  },
  12: {
    companies: ["Amazon", "Google", "Apple"],
    tags: ["String"],
  },
  13: {
    companies: ["Amazon", "Microsoft", "Apple"],
    tags: ["String", "Two Pointers"],
  },
  14: {
    companies: ["Amazon", "Google", "Microsoft"],
    tags: ["String", "Hash Table"],
  },
  15: {
    companies: ["Meta", "Google", "Amazon", "Microsoft"],
    tags: ["String", "Stack"],
  },
  16: {
    companies: ["Amazon", "Google", "Microsoft", "Apple", "Meta"],
    tags: ["Linked List"],
  },
  17: {
    companies: ["Amazon", "Microsoft", "Google", "Meta"],
    tags: ["Linked List", "Two Pointers"],
  },
  18: {
    companies: ["Amazon", "Microsoft"],
    tags: ["Linked List", "Two Pointers", "Hash Table"],
  },
  19: {
    companies: ["Amazon", "Meta", "Google"],
    tags: ["Linked List", "Two Pointers"],
  },
  20: {
    companies: ["Amazon", "Microsoft", "Meta"],
    tags: ["Linked List", "Two Pointers"],
  },
  21: {
    companies: ["Amazon", "Google"],
    tags: ["Linked List", "Two Pointers"],
  },
  22: {
    companies: ["Apple", "Microsoft"],
    tags: ["Linked List"],
  },
  23: {
    companies: ["Amazon", "Microsoft", "Meta"],
    tags: ["Linked List", "Two Pointers"],
  },
  24: {
    companies: ["Amazon", "Google"],
    tags: ["Linked List"],
  },
  25: {
    companies: ["Amazon", "Microsoft"],
    tags: ["Linked List"],
  },
  26: {
    companies: ["Meta", "Google", "Amazon"],
    tags: ["Array", "Hash Table", "Prefix Sum"],
  },
  27: {
    companies: ["Amazon", "Microsoft", "Meta", "Google"],
    tags: ["String", "Hash Table", "Sliding Window"],
  },
  28: {
    companies: ["Amazon", "Google", "Meta"],
    tags: ["Array", "Two Pointers", "Greedy"],
  },
  29: {
    companies: ["Meta", "Amazon", "Microsoft", "Apple"],
    tags: ["Array", "Two Pointers", "Sorting"],
  },
  30: {
    companies: ["Amazon", "Meta", "Google"],
    tags: ["String", "Hash Table", "Sorting"],
  },
  31: {
    companies: ["Amazon", "Microsoft", "Google"],
    tags: ["Linked List", "Recursion"],
  },
  32: {
    companies: ["Google", "Microsoft", "Meta", "Amazon"],
    tags: ["Array", "Two Pointers"],
  },
  33: { companies: ["Google", "Amazon", "Microsoft", "Apple"], tags: ["Binary Search", "Array"] },
  34: { companies: ["Meta", "Amazon", "Microsoft", "Google"], tags: ["Binary Search", "Array"] },
  35: { companies: ["Amazon", "Microsoft", "Meta"], tags: ["Binary Search", "Array"] },
  36: { companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple"], tags: ["Stack", "String"] },
  37: { companies: ["Amazon", "Microsoft", "Bloomberg"], tags: ["Stack", "Design"] },
  38: { companies: ["Amazon", "Meta", "Google"], tags: ["Stack", "Monotonic Stack", "Array"] },
  39: { companies: ["Google", "Amazon", "Apple", "Microsoft"], tags: ["Tree", "Depth-First Search"] },
  40: { companies: ["Google", "Amazon", "Meta"], tags: ["Tree", "Depth-First Search", "Breadth-First Search"] },
  41: { companies: ["Amazon", "Meta", "Microsoft", "Bloomberg"], tags: ["Tree", "Binary Search Tree"] },
  42: { companies: ["Amazon", "Apple", "Adobe"], tags: ["Dynamic Programming", "Math"] },
  43: { companies: ["Amazon", "Google", "Meta", "Microsoft"], tags: ["Dynamic Programming", "Breadth-First Search"] },
  44: { companies: ["Google", "Amazon", "Microsoft"], tags: ["Dynamic Programming", "Binary Search"] },
  45: { companies: ["Amazon", "Google", "Apple"], tags: ["Dynamic Programming", "Array"] },
  46: { companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"], tags: ["Graphs", "Depth-First Search", "Breadth-First Search"] },
  47: { companies: ["Amazon", "Microsoft"], tags: ["Graphs", "Breadth-First Search"] },
  48: { companies: ["Meta", "Amazon", "Google"], tags: ["Heap", "Priority Queue", "Quickselect"] },
  49: { companies: ["Amazon", "Meta", "Google"], tags: ["Heap", "Hash Table"] },
  50: { companies: ["Google", "Amazon", "Meta", "Apple", "Microsoft"], tags: ["Two Pointers", "Dynamic Programming", "Stack"] },
};

export function enrichProblem(problem) {
  if (!problem) return problem;
  const meta = PROBLEM_METADATA[problem.id];
  return {
    ...problem,
    companies: meta?.companies || ["Google", "Amazon"],
    tags: Array.from(new Set([...(problem.tags || []), ...(meta?.tags || [problem.topic])])),
  };
}
