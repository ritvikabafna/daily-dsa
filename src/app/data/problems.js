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
    {
    id: 7,
    title: "Merge Sorted Array",
    difficulty: "Easy",
    topic: "Arrays",
    acceptance: 58.4,

    description:
      "You are given two sorted integer arrays nums1 and nums2. Merge nums2 into nums1 so that nums1 becomes one sorted array.",

    examples: [
      {
        input: "3 1 2 3 3 2 5 6",
        output: "1 2 2 3 5 6",
      },
      {
        input: "1 1 0",
        output: "1",
      },
    ],

    constraints: [
      "nums1 is sorted in non-decreasing order.",
      "nums2 is sorted in non-decreasing order.",
      "The final array must be sorted in non-decreasing order.",
    ],

    tags: ["Arrays", "Two Pointers", "Sorting"],

    testCases: [
      {
        input: "3\n1 2 3\n3\n2 5 6",
        expectedOutput: "1 2 2 3 5 6",
      },
      {
        input: "1\n1\n0\n",
        expectedOutput: "1",
      },
      {
        input: "4\n1 3 5 7\n3\n2 4 6",
        expectedOutput: "1 2 3 4 5 6 7",
      },
    ],
  },

  {
    id: 8,
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    topic: "Arrays",
    acceptance: 56.2,

    description:
      "Given a sorted array, remove the duplicates in-place so that each unique element appears only once. Return the number of unique elements.",

    examples: [
      {
        input: "3\n1 1 2",
        output: "2\n1 2",
      },
      {
        input: "5\n0 0 1 1 2",
        output: "3\n0 1 2",
      },
    ],

    constraints: [
      "The array is sorted in non-decreasing order.",
      "Modify the array in-place.",
      "Return the number of unique elements.",
    ],

    tags: ["Arrays", "Two Pointers"],

    testCases: [
      {
        input: "3\n1 1 2",
        expectedOutput: "2\n1 2",
      },
      {
        input: "5\n0 0 1 1 2",
        expectedOutput: "3\n0 1 2",
      },
      {
        input: "6\n1 1 1 2 2 3",
        expectedOutput: "3\n1 2 3",
      },
    ],
  },

  {
    id: 9,
    title: "Rotate Array",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 48.7,

    description:
      "Given an integer array, rotate the array to the right by k steps.",

    examples: [
      {
        input: "7\n1 2 3 4 5 6 7\n3",
        output: "5 6 7 1 2 3 4",
      },
      {
        input: "4\n-1 -100 3 99\n2",
        output: "3 99 -1 -100",
      },
    ],

    constraints: [
      "1 <= nums.length <= 100000",
      "0 <= k <= 100000",
      "Rotate the array to the right by k positions.",
    ],

    tags: ["Arrays", "Math", "Two Pointers"],

    testCases: [
      {
        input: "7\n1 2 3 4 5 6 7\n3",
        expectedOutput: "5 6 7 1 2 3 4",
      },
      {
        input: "4\n-1 -100 3 99\n2",
        expectedOutput: "3 99 -1 -100",
      },
      {
        input: "5\n1 2 3 4 5\n1",
        expectedOutput: "5 1 2 3 4",
      },
    ],
  },

  {
    id: 10,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 66.1,

    description:
      "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i].",

    examples: [
      {
        input: "4\n1 2 3 4",
        output: "24 12 8 6",
      },
      {
        input: "4\n-1 1 0 -3",
        output: "0 0 3 0",
      },
    ],

    constraints: [
      "2 <= nums.length <= 100000",
      "The product of any prefix or suffix fits within a 32-bit integer.",
      "Do not use division.",
    ],

    tags: ["Arrays", "Prefix Sum"],

    testCases: [
      {
        input: "4\n1 2 3 4",
        expectedOutput: "24 12 8 6",
      },
      {
        input: "4\n-1 1 0 -3",
        expectedOutput: "0 0 3 0",
      },
      {
        input: "3\n2 3 4",
        expectedOutput: "12 8 6",
      },
    ],
  },

  {
    id: 11,
    title: "3Sum",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 36.8,

    description:
      "Given an integer array nums, find all unique triplets [nums[i], nums[j], nums[k]] such that the three numbers add up to zero.",

    examples: [
      {
        input: "6\n-1 0 1 2 -1 -4",
        output: "[-1 -1 2] [-1 0 1]",
      },
      {
        input: "3\n0 0 0",
        output: "[0 0 0]",
      },
    ],

    constraints: [
      "3 <= nums.length <= 3000",
      "Each triplet must contain three different indices.",
      "The solution must not contain duplicate triplets.",
    ],

    tags: ["Arrays", "Two Pointers", "Sorting"],

    testCases: [
      {
        input: "6\n-1 0 1 2 -1 -4",
        expectedOutput: "-1 -1 2\n-1 0 1",
      },
      {
        input: "3\n0 0 0",
        expectedOutput: "0 0 0",
      },
      {
        input: "4\n0 1 1 2",
        expectedOutput: "",
      },
    ],
  },
    {
    id: 12,
    title: "Valid Anagram",
    difficulty: "Easy",
    topic: "Strings",
    acceptance: 65.4,

    description:
      "Given two strings s and t, determine if t is an anagram of s.",

    examples: [
      {
        input: "anagram\nnagaram",
        output: "true",
      },
      {
        input: "rat\ncar",
        output: "false",
      },
    ],

    constraints: [
      "1 <= s.length, t.length <= 50000",
      "s and t consist of lowercase English letters.",
    ],

    tags: ["Strings", "Hash Table", "Sorting"],

    testCases: [
      {
        input: "anagram\nnagaram",
        expectedOutput: "true",
      },
      {
        input: "rat\ncar",
        expectedOutput: "false",
      },
      {
        input: "listen\nsilent",
        expectedOutput: "true",
      },
    ],
  },

  {
    id: 13,
    title: "Valid Palindrome",
    difficulty: "Easy",
    topic: "Strings",
    acceptance: 52.8,

    description:
      "Given a string, determine whether it is a palindrome after converting uppercase letters to lowercase and removing non-alphanumeric characters.",

    examples: [
      {
        input: "A man, a plan, a canal: Panama",
        output: "true",
      },
      {
        input: "race a car",
        output: "false",
      },
    ],

    constraints: [
      "1 <= s.length <= 200000",
      "The string may contain letters, digits, spaces and punctuation.",
    ],

    tags: ["Strings", "Two Pointers"],

    testCases: [
      {
        input: "A man, a plan, a canal: Panama",
        expectedOutput: "true",
      },
      {
        input: "race a car",
        expectedOutput: "false",
      },
      {
        input: "Was it a car or a cat I saw?",
        expectedOutput: "true",
      },
    ],
  },

  {
    id: 14,
    title: "Longest Common Prefix",
    difficulty: "Easy",
    topic: "Strings",
    acceptance: 44.9,

    description:
      "Write a function to find the longest common prefix string amongst an array of strings.",

    examples: [
      {
        input: "3\nflower flow flight",
        output: "fl",
      },
      {
        input: "3\ndog racecar car",
        output: "",
      },
    ],

    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "All strings contain lowercase English letters.",
    ],

    tags: ["Strings"],

    testCases: [
      {
        input: "3\nflower flow flight",
        expectedOutput: "fl",
      },
      {
        input: "3\ndog racecar car",
        expectedOutput: "",
      },
      {
        input: "3\ninterview internet internal",
        expectedOutput: "inter",
      },
    ],
  },

  {
    id: 15,
    title: "Reverse Words in a String",
    difficulty: "Medium",
    topic: "Strings",
    acceptance: 51.7,

    description:
      "Given a string containing words separated by spaces, return the words in reverse order. Remove extra spaces between words.",

    examples: [
      {
        input: "the sky is blue",
        output: "blue is sky the",
      },
      {
        input: "  hello world  ",
        output: "world hello",
      },
    ],

    constraints: [
      "1 <= s.length <= 10000",
      "The string may contain leading or trailing spaces.",
    ],

    tags: ["Strings", "Two Pointers"],

    testCases: [
      {
        input: "the sky is blue",
        expectedOutput: "blue is sky the",
      },
      {
        input: "  hello world  ",
        expectedOutput: "world hello",
      },
      {
        input: "a good   example",
        expectedOutput: "example good a",
      },
    ],
  },

  {
    id: 16,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Strings",
    acceptance: 36.5,

    description:
      "Given a string, find the length of the longest substring without repeating characters.",

    examples: [
      {
        input: "abcabcbb",
        output: "3",
      },
      {
        input: "bbbbb",
        output: "1",
      },
    ],

    constraints: [
      "0 <= s.length <= 50000",
      "The string may contain letters, digits, symbols and spaces.",
    ],

    tags: ["Strings", "Hash Table", "Sliding Window"],

    testCases: [
      {
        input: "abcabcbb",
        expectedOutput: "3",
      },
      {
        input: "bbbbb",
        expectedOutput: "1",
      },
      {
        input: "pwwkew",
        expectedOutput: "3",
      },
    ],
  },

  {
    id: 17,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    topic: "Strings",
    acceptance: 18.2,

    description:
      "Convert a string into a 32-bit signed integer while handling leading spaces, optional signs, digits and overflow.",

    examples: [
      {
        input: "42",
        output: "42",
      },
      {
        input: "   -42",
        output: "-42",
      },
    ],

    constraints: [
      "0 <= s.length <= 200",
      "The string may contain spaces, signs and digits.",
    ],

    tags: ["Strings", "Math"],

    testCases: [
      {
        input: "42",
        expectedOutput: "42",
      },
      {
        input: "   -42",
        expectedOutput: "-42",
      },
      {
        input: "4193 with words",
        expectedOutput: "4193",
      },
    ],
  },

  {
    id: 18,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topic: "Strings",
    acceptance: 36.1,

    description:
      "Given a string s, return the longest palindromic substring in s.",

    examples: [
      {
        input: "babad",
        output: "bab",
      },
      {
        input: "cbbd",
        output: "bb",
      },
    ],

    constraints: [
      "1 <= s.length <= 1000",
      "The string consists of lowercase English letters.",
    ],

    tags: ["Strings", "Dynamic Programming"],

    testCases: [
      {
        input: "babad",
        expectedOutput: "bab",
      },
      {
        input: "cbbd",
        expectedOutput: "bb",
      },
      {
        input: "racecar",
        expectedOutput: "racecar",
      },
    ],
  },

  {
    id: 19,
    title: "Group Anagrams",
    difficulty: "Medium",
    topic: "Strings",
    acceptance: 69.3,

    description:
      "Given an array of strings, group the anagrams together.",

    examples: [
      {
        input: "6\neat tea tan ate nat bat",
        output: "ate eat tea\nbat\ntan nat",
      },
    ],

    constraints: [
      "1 <= strs.length <= 10000",
      "0 <= strs[i].length <= 100",
      "Strings consist of lowercase English letters.",
    ],

    tags: ["Strings", "Hash Table", "Sorting"],

    testCases: [
      {
        input: "6\neat tea tan ate nat bat",
        expectedOutput: "ate eat tea\nbat\ntan nat",
      },
      {
        input: "3\nabc bca cab",
        expectedOutput: "abc bca cab",
      },
      {
        input: "3\nhello world test",
        expectedOutput: "hello\nworld\ntest",
      },
    ],
  },

  {
    id: 20,
    title: "Is Subsequence",
    difficulty: "Easy",
    topic: "Strings",
    acceptance: 49.6,

    description:
      "Given two strings s and t, determine whether s is a subsequence of t.",

    examples: [
      {
        input: "abc\nahbgdc",
        output: "true",
      },
      {
        input: "axc\nahbgdc",
        output: "false",
      },
    ],

    constraints: [
      "0 <= s.length <= 100",
      "0 <= t.length <= 10000",
      "Both strings contain lowercase English letters.",
    ],

    tags: ["Strings", "Two Pointers"],

    testCases: [
      {
        input: "abc\nahbgdc",
        expectedOutput: "true",
      },
      {
        input: "axc\nahbgdc",
        expectedOutput: "false",
      },
      {
        input: "ace\nabcde",
        expectedOutput: "true",
      },
    ],
  },

  {
    id: 21,
    title: "First Unique Character in a String",
    difficulty: "Easy",
    topic: "Strings",
    acceptance: 62.4,

    description:
      "Given a string, find the first non-repeating character and return its index. Return -1 if it does not exist.",

    examples: [
      {
        input: "leetcode",
        output: "0",
      },
      {
        input: "loveleetcode",
        output: "2",
      },
    ],

    constraints: [
      "1 <= s.length <= 100000",
      "The string consists of lowercase English letters.",
    ],

    tags: ["Strings", "Hash Table"],

    testCases: [
      {
        input: "leetcode",
        expectedOutput: "0",
      },
      {
        input: "loveleetcode",
        expectedOutput: "2",
      },
      {
        input: "aabb",
        expectedOutput: "-1",
      },
    ],
  },
    {
    id: 22,
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    acceptance: 78.5,

    description:
      "Given the head of a singly linked list, reverse the list and return the new head.",

    examples: [
      {
        input: "5\n1 2 3 4 5",
        output: "5 4 3 2 1",
      },
      {
        input: "2\n1 2",
        output: "2 1",
      },
    ],

    constraints: [
      "0 <= number of nodes <= 5000",
      "-5000 <= Node.val <= 5000",
    ],

    tags: ["Linked List", "Recursion"],

    testCases: [
      {
        input: "5\n1 2 3 4 5",
        expectedOutput: "5 4 3 2 1",
      },
      {
        input: "2\n1 2",
        expectedOutput: "2 1",
      },
      {
        input: "1\n10",
        expectedOutput: "10",
      },
    ],
  },

  {
    id: 23,
    title: "Middle of the Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    acceptance: 80.2,

    description:
      "Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.",

    examples: [
      {
        input: "5\n1 2 3 4 5",
        output: "3 4 5",
      },
      {
        input: "6\n1 2 3 4 5 6",
        output: "4 5 6",
      },
    ],

    constraints: [
      "1 <= number of nodes <= 100",
      "1 <= Node.val <= 100",
    ],

    tags: ["Linked List", "Two Pointers"],

    testCases: [
      {
        input: "5\n1 2 3 4 5",
        expectedOutput: "3",
      },
      {
        input: "6\n1 2 3 4 5 6",
        expectedOutput: "4",
      },
      {
        input: "1\n10",
        expectedOutput: "10",
      },
    ],
  },

  {
    id: 24,
    title: "Linked List Cycle",
    difficulty: "Easy",
    topic: "Linked List",
    acceptance: 52.1,

    description:
      "Given the head of a linked list, determine if the linked list contains a cycle.",

    examples: [
      {
        input: "4\n3 2 0 -4\n1",
        output: "true",
      },
      {
        input: "2\n1 2\n-1",
        output: "false",
      },
    ],

    constraints: [
      "The number of nodes is in the range [0, 10000].",
      "Node values are integers.",
      "pos represents the index where the tail connects.",
    ],

    tags: ["Linked List", "Two Pointers"],

    testCases: [
      {
        input: "4\n3 2 0 -4\n1",
        expectedOutput: "true",
      },
      {
        input: "2\n1 2\n-1",
        expectedOutput: "false",
      },
      {
        input: "1\n1\n0",
        expectedOutput: "true",
      },
    ],
  },

  {
    id: 25,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    topic: "Linked List",
    acceptance: 64.8,

    description:
      "Merge two sorted linked lists and return the head of the merged sorted list.",

    examples: [
      {
        input: "3\n1 2 4\n3\n1 3 4",
        output: "1 1 2 3 4 4",
      },
      {
        input: "0\n\n3\n0 1 2",
        output: "0 1 2",
      },
    ],

    constraints: [
      "The number of nodes in both lists is between 0 and 50.",
      "Both linked lists are sorted in non-decreasing order.",
    ],

    tags: ["Linked List", "Recursion"],

    testCases: [
      {
        input: "3\n1 2 4\n3\n1 3 4",
        expectedOutput: "1 1 2 3 4 4",
      },
      {
        input: "3\n1 2 3\n3\n4 5 6",
        expectedOutput: "1 2 3 4 5 6",
      },
      {
        input: "2\n1 2\n0\n",
        expectedOutput: "1 2",
      },
    ],
  },

  {
    id: 26,
    title: "Remove Linked List Elements",
    difficulty: "Easy",
    topic: "Linked List",
    acceptance: 45.7,

    description:
      "Given the head of a linked list and an integer val, remove all nodes whose value equals val.",

    examples: [
      {
        input: "6\n1 2 6 3 4 5 6",
        output: "1 2 3 4 5",
      },
      {
        input: "1\n7\n7",
        output: "",
      },
    ],

    constraints: [
      "The number of nodes is between 0 and 10000.",
      "1 <= Node.val <= 50.",
      "0 <= val <= 50.",
    ],

    tags: ["Linked List"],

    testCases: [
      {
        input: "7\n1 2 6 3 4 5 6\n6",
        expectedOutput: "1 2 3 4 5",
      },
      {
        input: "3\n7 7 7\n7",
        expectedOutput: "",
      },
      {
        input: "5\n1 2 3 4 5\n3",
        expectedOutput: "1 2 4 5",
      },
    ],
  },

  {
    id: 27,
    title: "Palindrome Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    acceptance: 54.6,

    description:
      "Given the head of a singly linked list, determine whether it is a palindrome.",

    examples: [
      {
        input: "4\n1 2 2 1",
        output: "true",
      },
      {
        input: "2\n1 2",
        output: "false",
      },
    ],

    constraints: [
      "The number of nodes is between 1 and 100000.",
      "Node values are integers.",
    ],

    tags: ["Linked List", "Two Pointers"],

    testCases: [
      {
        input: "4\n1 2 2 1",
        expectedOutput: "true",
      },
      {
        input: "2\n1 2",
        expectedOutput: "false",
      },
      {
        input: "5\n1 2 3 2 1",
        expectedOutput: "true",
      },
    ],
  },

  {
    id: 28,
    title: "Intersection of Two Linked Lists",
    difficulty: "Easy",
    topic: "Linked List",
    acceptance: 58.3,

    description:
      "Given the heads of two singly linked lists, return the node at which the two lists intersect. If they do not intersect, return -1.",

    examples: [
      {
        input: "5\n4 1 8 4 5\n6\n5 6 1 8 4 5\n2",
        output: "8",
      },
      {
        input: "3\n1 9 1\n2\n3 2\n-1",
        output: "-1",
      },
    ],

    constraints: [
      "The number of nodes in each list is between 1 and 30000.",
      "The lists may or may not intersect.",
    ],

    tags: ["Linked List", "Two Pointers"],

    testCases: [
      {
        input: "3\n4 1 8\n3\n5 6 8\n2",
        expectedOutput: "8",
      },
      {
        input: "3\n1 2 3\n2\n4 5\n-1",
        expectedOutput: "-1",
      },
      {
        input: "2\n1 2\n3\n3 4 2\n1",
        expectedOutput: "2",
      },
    ],
  },

  {
    id: 29,
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    topic: "Linked List",
    acceptance: 48.9,

    description:
      "Given the head of a linked list, remove the nth node from the end of the list and return its head.",

    examples: [
      {
        input: "5\n1 2 3 4 5\n2",
        output: "1 2 3 5",
      },
      {
        input: "1\n1\n1",
        output: "",
      },
    ],

    constraints: [
      "1 <= number of nodes <= 100000",
      "1 <= n <= number of nodes",
    ],

    tags: ["Linked List", "Two Pointers"],

    testCases: [
      {
        input: "5\n1 2 3 4 5\n2",
        expectedOutput: "1 2 3 5",
      },
      {
        input: "1\n1\n1",
        expectedOutput: "",
      },
      {
        input: "5\n1 2 3 4 5\n5",
        expectedOutput: "2 3 4 5",
      },
    ],
  },

  {
    id: 30,
    title: "Add Two Numbers",
    difficulty: "Medium",
    topic: "Linked List",
    acceptance: 46.3,

    description:
      "You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.",

    examples: [
      {
        input: "3\n2 4 3\n3\n5 6 4",
        output: "7 0 8",
      },
      {
        input: "1\n0\n1\n0",
        output: "0",
      },
    ],

    constraints: [
      "Each linked list contains at least one node.",
      "The numbers do not contain leading zeros unless the number is zero.",
      "Each node contains a digit from 0 to 9.",
    ],

    tags: ["Linked List", "Math"],

    testCases: [
      {
        input: "3\n2 4 3\n3\n5 6 4",
        expectedOutput: "7 0 8",
      },
      {
        input: "1\n0\n1\n0",
        expectedOutput: "0",
      },
      {
        input: "4\n9 9 9 9\n2\n9 9",
        expectedOutput: "8 9 0 0 1",
      },
    ],
  },

  {
    id: 31,
    title: "Swap Nodes in Pairs",
    difficulty: "Medium",
    topic: "Linked List",
    acceptance: 72.4,

    description:
      "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem by modifying the nodes rather than their values.",

    examples: [
      {
        input: "4\n1 2 3 4",
        output: "2 1 4 3",
      },
      {
        input: "3\n1 2 3",
        output: "2 1 3",
      },
    ],

    constraints: [
      "The number of nodes is between 0 and 100.",
      "0 <= Node.val <= 100.",
    ],

    tags: ["Linked List", "Recursion"],

    testCases: [
      {
        input: "4\n1 2 3 4",
        expectedOutput: "2 1 4 3",
      },
      {
        input: "3\n1 2 3",
        expectedOutput: "2 1 3",
      },
      {
        input: "2\n5 10",
        expectedOutput: "10 5",
      },
    ],
  },

  {
    id: 32,
    title: "Remove Duplicates from Sorted Array",
    topic: "Arrays",
    difficulty: "Easy",
    acceptance: 54.8,
    status: "unsolved",

    description:
      "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Output the count of unique elements on the first line, followed by the unique elements separated by space on the second line.",

    examples: [
      {
        input: "3\n1 1 2",
        output: "2\n1 2",
      },
      {
        input: "10\n0 0 1 1 1 2 2 3 3 4",
        output: "5\n0 1 2 3 4",
      },
    ],

    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-100 <= nums[i] <= 100",
      "nums is sorted in non-decreasing order.",
    ],

    tags: ["Array", "Two Pointers"],

    testCases: [
      {
        input: "3\n1 1 2",
        expectedOutput: "2\n1 2",
      },
      {
        input: "10\n0 0 1 1 1 2 2 3 3 4",
        expectedOutput: "5\n0 1 2 3 4",
      },
      {
        input: "5\n1 2 3 4 5",
        expectedOutput: "5\n1 2 3 4 5",
      },
    ],
  },

  {
    "id": 33,
    "title": "Binary Search",
    "topic": "Binary Search",
    "difficulty": "Easy",
    "acceptance": 58.2,
    "status": "unsolved",
    "description": "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then output its index. Otherwise, output -1. You must write an algorithm with O(log n) runtime complexity.",
    "examples": [
      {
        "input": "6\n-1 0 3 5 9 12\n9",
        "output": "4"
      },
      {
        "input": "6\n-1 0 3 5 9 12\n2",
        "output": "-1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    "tags": [
      "Binary Search",
      "Array"
    ],
    "testCases": [
      {
        "input": "6\n-1 0 3 5 9 12\n9",
        "expectedOutput": "4"
      },
      {
        "input": "6\n-1 0 3 5 9 12\n2",
        "expectedOutput": "-1"
      },
      {
        "input": "1\n5\n5",
        "expectedOutput": "0"
      },
      {
        "input": "2\n2 5\n0",
        "expectedOutput": "-1"
      }
    ]
  },

  {
    "id": 34,
    "title": "Search in Rotated Sorted Array",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "acceptance": 40.5,
    "status": "unsolved",
    "description": "There is an integer array nums sorted in ascending order (with distinct values). Given the array nums after possible unknown rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.",
    "examples": [
      {
        "input": "7\n4 5 6 7 0 1 2\n0",
        "output": "4"
      },
      {
        "input": "7\n4 5 6 7 0 1 2\n3",
        "output": "-1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique.",
      "nums is an ascending array that is possibly rotated."
    ],
    "tags": [
      "Binary Search",
      "Array"
    ],
    "testCases": [
      {
        "input": "7\n4 5 6 7 0 1 2\n0",
        "expectedOutput": "4"
      },
      {
        "input": "7\n4 5 6 7 0 1 2\n3",
        "expectedOutput": "-1"
      },
      {
        "input": "1\n1\n0",
        "expectedOutput": "-1"
      },
      {
        "input": "3\n5 1 3\n5",
        "expectedOutput": "0"
      }
    ]
  },

  {
    "id": 35,
    "title": "Find Minimum in Rotated Sorted Array",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "acceptance": 50.1,
    "status": "unsolved",
    "description": "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.",
    "examples": [
      {
        "input": "5\n3 4 5 1 2",
        "output": "1"
      },
      {
        "input": "7\n4 5 6 7 0 1 2",
        "output": "0"
      }
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000",
      "All the integers of nums are unique."
    ],
    "tags": [
      "Binary Search",
      "Array"
    ],
    "testCases": [
      {
        "input": "5\n3 4 5 1 2",
        "expectedOutput": "1"
      },
      {
        "input": "7\n4 5 6 7 0 1 2",
        "expectedOutput": "0"
      },
      {
        "input": "4\n11 13 15 17",
        "expectedOutput": "11"
      },
      {
        "input": "1\n2",
        "expectedOutput": "2"
      }
    ]
  },

  {
    "id": 36,
    "title": "Valid Parentheses",
    "topic": "Stack",
    "difficulty": "Easy",
    "acceptance": 41.2,
    "status": "unsolved",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order. Output 'true' if valid, otherwise 'false'.",
    "examples": [
      {
        "input": "()",
        "output": "true"
      },
      {
        "input": "()[]{}",
        "output": "true"
      },
      {
        "input": "(]",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    "tags": [
      "Stack",
      "String"
    ],
    "testCases": [
      {
        "input": "()",
        "expectedOutput": "true"
      },
      {
        "input": "()[]{}",
        "expectedOutput": "true"
      },
      {
        "input": "(]",
        "expectedOutput": "false"
      },
      {
        "input": "([)]",
        "expectedOutput": "false"
      },
      {
        "input": "{[]}",
        "expectedOutput": "true"
      }
    ]
  },

  {
    "id": 37,
    "title": "Min Stack",
    "topic": "Stack",
    "difficulty": "Medium",
    "acceptance": 53.6,
    "status": "unsolved",
    "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1). Input consists of number of operations Q, followed by Q queries: 'push x', 'pop', 'top', or 'getMin'. Output the return values of top and getMin queries on separate lines.",
    "examples": [
      {
        "input": "6\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin",
        "output": "-3\n0\n-2"
      }
    ],
    "constraints": [
      "-2^31 <= val <= 2^31 - 1",
      "Methods pop, top and getMin operations will always be called on non-empty stacks.",
      "At most 3 * 10^4 calls will be made to push, pop, top, and getMin."
    ],
    "tags": [
      "Stack",
      "Design"
    ],
    "testCases": [
      {
        "input": "7\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin",
        "expectedOutput": "-3\n0\n-2"
      },
      {
        "input": "4\npush 1\npush 2\ntop\ngetMin",
        "expectedOutput": "2\n1"
      }
    ]
  },

  {
    "id": 38,
    "title": "Daily Temperatures",
    "topic": "Stack",
    "difficulty": "Medium",
    "acceptance": 66.8,
    "status": "unsolved",
    "description": "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead. Output the answer array space-separated.",
    "examples": [
      {
        "input": "8\n73 74 75 71 69 72 76 73",
        "output": "1 1 4 2 1 1 0 0"
      },
      {
        "input": "4\n30 40 50 60",
        "output": "1 1 1 0"
      }
    ],
    "constraints": [
      "1 <= temperatures.length <= 10^5",
      "30 <= temperatures[i] <= 100"
    ],
    "tags": [
      "Stack",
      "Monotonic Stack",
      "Array"
    ],
    "testCases": [
      {
        "input": "8\n73 74 75 71 69 72 76 73",
        "expectedOutput": "1 1 4 2 1 1 0 0"
      },
      {
        "input": "4\n30 40 50 60",
        "expectedOutput": "1 1 1 0"
      },
      {
        "input": "3\n30 60 90",
        "expectedOutput": "1 1 0"
      }
    ]
  },

  {
    "id": 39,
    "title": "Maximum Depth of Binary Tree",
    "topic": "Binary Trees",
    "difficulty": "Easy",
    "acceptance": 75.1,
    "status": "unsolved",
    "description": "Given the root of a binary tree represented as level-order traversal where 'null' indicates an absent node, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    "examples": [
      {
        "input": "7\n3 9 20 null null 15 7",
        "output": "3"
      },
      {
        "input": "2\n1 null 2",
        "output": "2"
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    "tags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search"
    ],
    "testCases": [
      {
        "input": "7\n3 9 20 null null 15 7",
        "expectedOutput": "3"
      },
      {
        "input": "2\n1 null 2",
        "expectedOutput": "2"
      },
      {
        "input": "0\n",
        "expectedOutput": "0"
      }
    ]
  },

  {
    "id": 40,
    "title": "Invert Binary Tree",
    "topic": "Binary Trees",
    "difficulty": "Easy",
    "acceptance": 77.2,
    "status": "unsolved",
    "description": "Given the root of a binary tree, invert the tree, and return its root represented as level-order traversal. Every left child and right child are swapped at every level.",
    "examples": [
      {
        "input": "7\n4 2 7 1 3 6 9",
        "output": "4 7 2 9 6 3 1"
      },
      {
        "input": "3\n2 1 3",
        "output": "2 3 1"
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    "tags": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search"
    ],
    "testCases": [
      {
        "input": "7\n4 2 7 1 3 6 9",
        "expectedOutput": "4 7 2 9 6 3 1"
      },
      {
        "input": "3\n2 1 3",
        "expectedOutput": "2 3 1"
      },
      {
        "input": "0\n",
        "expectedOutput": ""
      }
    ]
  },

  {
    "id": 41,
    "title": "Validate Binary Search Tree",
    "topic": "Binary Trees",
    "difficulty": "Medium",
    "acceptance": 32.8,
    "status": "unsolved",
    "description": "Given the root of a binary tree in level-order traversal, determine if it is a valid binary search tree (BST). A valid BST is defined as: The left subtree contains only nodes with keys less than the node's key. The right subtree contains only nodes with keys greater than the node's key. Both left and right subtrees must also be binary search trees. Output 'true' or 'false'.",
    "examples": [
      {
        "input": "3\n2 1 3",
        "output": "true"
      },
      {
        "input": "5\n5 1 4 null null 3 6",
        "output": "false"
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "-2^31 <= Node.val <= 2^31 - 1"
    ],
    "tags": [
      "Tree",
      "Depth-First Search",
      "Binary Search Tree"
    ],
    "testCases": [
      {
        "input": "3\n2 1 3",
        "expectedOutput": "true"
      },
      {
        "input": "5\n5 1 4 null null 3 6",
        "expectedOutput": "false"
      },
      {
        "input": "3\n5 4 6 null null 3 7",
        "expectedOutput": "false"
      }
    ]
  },

  {
    "id": 42,
    "title": "Climbing Stairs",
    "topic": "Dynamic Programming",
    "difficulty": "Easy",
    "acceptance": 52.9,
    "status": "unsolved",
    "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? Output the integer count of ways.",
    "examples": [
      {
        "input": "2",
        "output": "2"
      },
      {
        "input": "3",
        "output": "3"
      }
    ],
    "constraints": [
      "1 <= n <= 45"
    ],
    "tags": [
      "Dynamic Programming",
      "Math",
      "Memoization"
    ],
    "testCases": [
      {
        "input": "2",
        "expectedOutput": "2"
      },
      {
        "input": "3",
        "expectedOutput": "3"
      },
      {
        "input": "5",
        "expectedOutput": "8"
      },
      {
        "input": "10",
        "expectedOutput": "89"
      }
    ]
  },

  {
    "id": 43,
    "title": "Coin Change",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "acceptance": 43.1,
    "status": "unsolved",
    "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.",
    "examples": [
      {
        "input": "3\n1 2 5\n11",
        "output": "3"
      },
      {
        "input": "1\n2\n3",
        "output": "-1"
      },
      {
        "input": "1\n1\n0",
        "output": "0"
      }
    ],
    "constraints": [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    "tags": [
      "Dynamic Programming",
      "Breadth-First Search"
    ],
    "testCases": [
      {
        "input": "3\n1 2 5\n11",
        "expectedOutput": "3"
      },
      {
        "input": "1\n2\n3",
        "expectedOutput": "-1"
      },
      {
        "input": "1\n1\n0",
        "expectedOutput": "0"
      },
      {
        "input": "4\n2 5 10 1\n27",
        "expectedOutput": "4"
      }
    ]
  },

  {
    "id": 44,
    "title": "Longest Increasing Subsequence",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "acceptance": 54.3,
    "status": "unsolved",
    "description": "Given an integer array nums, return the length of the longest strictly increasing subsequence. A subsequence is an array that can be derived by deleting some or no elements without changing the order of the remaining elements.",
    "examples": [
      {
        "input": "8\n10 9 2 5 3 7 101 18",
        "output": "4"
      },
      {
        "input": "6\n0 1 0 3 2 3",
        "output": "4"
      },
      {
        "input": "7\n7 7 7 7 7 7 7",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "tags": [
      "Dynamic Programming",
      "Binary Search",
      "Array"
    ],
    "testCases": [
      {
        "input": "8\n10 9 2 5 3 7 101 18",
        "expectedOutput": "4"
      },
      {
        "input": "6\n0 1 0 3 2 3",
        "expectedOutput": "4"
      },
      {
        "input": "7\n7 7 7 7 7 7 7",
        "expectedOutput": "1"
      },
      {
        "input": "1\n42",
        "expectedOutput": "1"
      }
    ]
  },

  {
    "id": 45,
    "title": "House Robber",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "acceptance": 50.8,
    "status": "unsolved",
    "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Return the maximum amount of money you can rob tonight without alerting the police.",
    "examples": [
      {
        "input": "4\n1 2 3 1",
        "output": "4"
      },
      {
        "input": "5\n2 7 9 3 1",
        "output": "12"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 400"
    ],
    "tags": [
      "Dynamic Programming",
      "Array"
    ],
    "testCases": [
      {
        "input": "4\n1 2 3 1",
        "expectedOutput": "4"
      },
      {
        "input": "5\n2 7 9 3 1",
        "expectedOutput": "12"
      },
      {
        "input": "1\n5",
        "expectedOutput": "5"
      },
      {
        "input": "2\n2 1",
        "expectedOutput": "2"
      }
    ]
  },

  {
    "id": 46,
    "title": "Number of Islands",
    "topic": "Graphs",
    "difficulty": "Medium",
    "acceptance": 58.4,
    "status": "unsolved",
    "description": "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water. Input format: First line has m and n. Following m lines have n characters ('0' or '1') separated by spaces.",
    "examples": [
      {
        "input": "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0",
        "output": "1"
      },
      {
        "input": "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1",
        "output": "3"
      }
    ],
    "constraints": [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    "tags": [
      "Graphs",
      "Depth-First Search",
      "Breadth-First Search",
      "Union Find"
    ],
    "testCases": [
      {
        "input": "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0",
        "expectedOutput": "1"
      },
      {
        "input": "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1",
        "expectedOutput": "3"
      },
      {
        "input": "1 1\n1",
        "expectedOutput": "1"
      },
      {
        "input": "1 1\n0",
        "expectedOutput": "0"
      }
    ]
  },

  {
    "id": 47,
    "title": "Rotting Oranges",
    "topic": "Graphs",
    "difficulty": "Medium",
    "acceptance": 54.1,
    "status": "unsolved",
    "description": "You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1. Input format: m and n on the first line, followed by m lines each with n integers.",
    "examples": [
      {
        "input": "3 3\n2 1 1\n1 1 0\n0 1 1",
        "output": "4"
      },
      {
        "input": "3 3\n2 1 1\n0 1 1\n1 0 1",
        "output": "-1"
      },
      {
        "input": "1 2\n0 2",
        "output": "0"
      }
    ],
    "constraints": [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 10",
      "grid[i][j] is 0, 1, or 2."
    ],
    "tags": [
      "Graphs",
      "Breadth-First Search",
      "Matrix"
    ],
    "testCases": [
      {
        "input": "3 3\n2 1 1\n1 1 0\n0 1 1",
        "expectedOutput": "4"
      },
      {
        "input": "3 3\n2 1 1\n0 1 1\n1 0 1",
        "expectedOutput": "-1"
      },
      {
        "input": "1 2\n0 2",
        "expectedOutput": "0"
      },
      {
        "input": "1 1\n1",
        "expectedOutput": "-1"
      }
    ]
  },

  {
    "id": 48,
    "title": "Kth Largest Element in an Array",
    "topic": "Heap",
    "difficulty": "Medium",
    "acceptance": 67.2,
    "status": "unsolved",
    "description": "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. Can you solve it without sorting the entire array in O(n log k) time?",
    "examples": [
      {
        "input": "6\n3 2 1 5 6 4\n2",
        "output": "5"
      },
      {
        "input": "9\n3 2 3 1 2 4 5 5 6\n4",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= k <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "tags": [
      "Heap",
      "Priority Queue",
      "Quickselect",
      "Array"
    ],
    "testCases": [
      {
        "input": "6\n3 2 1 5 6 4\n2",
        "expectedOutput": "5"
      },
      {
        "input": "9\n3 2 3 1 2 4 5 5 6\n4",
        "expectedOutput": "4"
      },
      {
        "input": "1\n10\n1",
        "expectedOutput": "10"
      }
    ]
  },

  {
    "id": 49,
    "title": "Top K Frequent Elements",
    "topic": "Heap",
    "difficulty": "Medium",
    "acceptance": 63.8,
    "status": "unsolved",
    "description": "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. For deterministic output, output the k elements sorted in ascending order separated by space.",
    "examples": [
      {
        "input": "6\n1 1 1 2 2 3\n2",
        "output": "1 2"
      },
      {
        "input": "1\n1\n1",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, the number of unique elements in the array].",
      "It is guaranteed that the answer is unique."
    ],
    "tags": [
      "Heap",
      "Hash Table",
      "Bucket Sort",
      "Array"
    ],
    "testCases": [
      {
        "input": "6\n1 1 1 2 2 3\n2",
        "expectedOutput": "1 2"
      },
      {
        "input": "1\n1\n1",
        "expectedOutput": "1"
      },
      {
        "input": "7\n4 1 -1 2 -1 2 3\n2",
        "expectedOutput": "-1 2"
      }
    ]
  },

  {
    "id": 50,
    "title": "Trapping Rain Water",
    "topic": "Two Pointers",
    "difficulty": "Hard",
    "acceptance": 61.3,
    "status": "unsolved",
    "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining. Output the total trapped units of water as a single integer.",
    "examples": [
      {
        "input": "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        "output": "6"
      },
      {
        "input": "6\n4 2 0 3 2 5",
        "output": "9"
      }
    ],
    "constraints": [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    "tags": [
      "Two Pointers",
      "Dynamic Programming",
      "Stack",
      "Monotonic Stack"
    ],
    "testCases": [
      {
        "input": "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        "expectedOutput": "6"
      },
      {
        "input": "6\n4 2 0 3 2 5",
        "expectedOutput": "9"
      },
      {
        "input": "3\n2 0 2",
        "expectedOutput": "2"
      },
      {
        "input": "2\n1 2",
        "expectedOutput": "0"
      }
    ]
  }
];

export default problems;
