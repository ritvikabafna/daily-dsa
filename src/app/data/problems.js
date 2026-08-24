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
  },
];

export default problems;