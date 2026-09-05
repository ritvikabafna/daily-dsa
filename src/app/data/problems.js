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
];

export default problems;