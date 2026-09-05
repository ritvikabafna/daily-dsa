const problems = [
  {
    id: 1,
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    acceptance: 49.2,
    status: "unsolved",

    description:
      "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.",

    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],

    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Each input has exactly one solution.",
    ],

    tags: ["Array", "Hash Table"],

    testCases: [
  {
    input: `4
2 7 11 15
9`,
    expectedOutput: "0 1"
  },
  {
    input: `3
3 2 4
6`,
    expectedOutput: "1 2"
  },
  {
    input: `2
3 3
6`,
    expectedOutput: "0 1"
  }
]
  },

  {
    id: 2,
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays",
    difficulty: "Easy",
    acceptance: 55.1,
    status: "unsolved",

    description:
      "Given an array prices where prices[i] is the price of a given stock on the ith day, return the maximum profit you can achieve by choosing a single day to buy one stock and a different day to sell that stock.",

    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
      },
    ],

    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4",
    ],

    tags: ["Array", "Dynamic Programming"],
        testCases: [
      {
        input: `6
7 1 5 3 6 4`,
        expectedOutput: "5",
      },
      {
        input: `5
7 6 4 3 1`,
        expectedOutput: "0",
      },
      {
        input: `5
2 4 1 7 5`,
        expectedOutput: "6",
      },
    ],
  },
  

  {
    id: 3,
    title: "Contains Duplicate",
    topic: "Arrays",
    difficulty: "Easy",
    acceptance: 61.4,
    status: "unsolved",

    description:
      "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",

    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true",
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false",
      },
    ],

    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
    ],

    tags: ["Array", "Hash Table", "Sorting"],

testCases: [
  {
    input: `4
1 2 3 1`,
    expectedOutput: "true",
  },
  {
    input: `4
1 2 3 4`,
    expectedOutput: "false",
  },
  {
    input: `5
1 2 3 4 5`,
    expectedOutput: "false",
  },
],
  },
    {
    id: 4,
    title: "Maximum Subarray",
    topic: "Arrays",
    difficulty: "Medium",
    acceptance: 50.5,
    status: "unsolved",

    description:
      "Given an integer array nums, find the subarray with the largest sum and return its sum.",

    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
      },
      {
        input: "nums = [1]",
        output: "1",
      },
    ],

    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
    ],

    tags: ["Array", "Dynamic Programming"],

    testCases: [
      {
        input: `9
-2 1 -3 4 -1 2 1 -5 4`,
        expectedOutput: "6",
      },
      {
        input: `1
1`,
        expectedOutput: "1",
      },
      {
        input: `5
5 4 -1 7 8`,
        expectedOutput: "23",
      },
    ],
  },

  {
    id: 5,
    title: "Move Zeroes",
    topic: "Arrays",
    difficulty: "Easy",
    acceptance: 62.8,
    status: "unsolved",

    description:
      "Given an integer array nums, move all zeroes to the end of it while maintaining the relative order of the non-zero elements.",

    examples: [
      {
        input: "nums = [0,1,0,3,12]",
        output: "[1,3,12,0,0]",
      },
      {
        input: "nums = [0]",
        output: "[0]",
      },
    ],

    constraints: [
      "1 <= nums.length <= 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1",
    ],

    tags: ["Array", "Two Pointers"],

    testCases: [
      {
        input: `5
0 1 0 3 12`,
        expectedOutput: "1 3 12 0 0",
      },
      {
        input: `1
0`,
        expectedOutput: "0",
      },
      {
        input: `5
1 0 2 0 3`,
        expectedOutput: "1 2 3 0 0",
      },
    ],
  },

  {
    id: 6,
    title: "Best Time to Buy and Sell Stock II",
    topic: "Arrays",
    difficulty: "Medium",
    acceptance: 58.3,
    status: "unsolved",

    description:
      "You are given an array prices where prices[i] is the price of a stock on the ith day. You may buy and sell the stock multiple times. Return the maximum profit you can achieve.",

    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "7",
      },
      {
        input: "prices = [1,2,3,4,5]",
        output: "4",
      },
    ],

    constraints: [
      "1 <= prices.length <= 3 * 10^4",
      "0 <= prices[i] <= 10^4",
    ],

    tags: ["Array", "Greedy", "Dynamic Programming"],

    testCases: [
      {
        input: `6
7 1 5 3 6 4`,
        expectedOutput: "7",
      },
      {
        input: `5
1 2 3 4 5`,
        expectedOutput: "4",
      },
      {
        input: `5
7 6 4 3 1`,
        expectedOutput: "0",
      },
    ],
  },
];

export default problems;