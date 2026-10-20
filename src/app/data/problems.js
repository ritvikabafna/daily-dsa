// Complete curated DSA curriculum of 100 high-quality problems from Striver SDE & Love Babbar 450 sheets
const problems = [
  {
    "id": 1,
    "title": "Two Sum",
    "topic": "Arrays",
    "difficulty": "Easy",
    "acceptance": 49.2,
    "status": "unsolved",
    "description": "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.",
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]"
      },
      {
        "input": "nums = [3,2,4], target = 6",
        "output": "[1,2]"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Each input has exactly one solution."
    ],
    "tags": [
      "Array",
      "Hash Table"
    ],
    "testCases": [
      {
        "input": "4\n2 7 11 15\n9",
        "expectedOutput": "0 1"
      },
      {
        "input": "3\n3 2 4\n6",
        "expectedOutput": "1 2"
      },
      {
        "input": "2\n3 3\n6",
        "expectedOutput": "0 1"
      }
    ]
  },
  {
    "id": 2,
    "title": "Best Time to Buy and Sell Stock",
    "topic": "Arrays",
    "difficulty": "Easy",
    "acceptance": 55.1,
    "status": "unsolved",
    "description": "Given an array prices where prices[i] is the price of a given stock on the ith day, return the maximum profit you can achieve by choosing a single day to buy one stock and a different day to sell that stock.",
    "examples": [
      {
        "input": "prices = [7,1,5,3,6,4]",
        "output": "5"
      },
      {
        "input": "prices = [7,6,4,3,1]",
        "output": "0"
      }
    ],
    "constraints": [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "6\n7 1 5 3 6 4",
        "expectedOutput": "5"
      },
      {
        "input": "5\n7 6 4 3 1",
        "expectedOutput": "0"
      },
      {
        "input": "5\n2 4 1 7 5",
        "expectedOutput": "6"
      }
    ]
  },
  {
    "id": 3,
    "title": "Contains Duplicate",
    "topic": "Arrays",
    "difficulty": "Easy",
    "acceptance": 61.4,
    "status": "unsolved",
    "description": "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "true"
      },
      {
        "input": "nums = [1,2,3,4]",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "tags": [
      "Array",
      "Hash Table",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "4\n1 2 3 1",
        "expectedOutput": "true"
      },
      {
        "input": "4\n1 2 3 4",
        "expectedOutput": "false"
      },
      {
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": 4,
    "title": "Maximum Subarray",
    "topic": "Arrays",
    "difficulty": "Medium",
    "acceptance": 50.5,
    "status": "unsolved",
    "description": "Given an integer array nums, find the subarray with the largest sum and return its sum.",
    "examples": [
      {
        "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "output": "6"
      },
      {
        "input": "nums = [1]",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "9\n-2 1 -3 4 -1 2 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "input": "1\n1",
        "expectedOutput": "1"
      },
      {
        "input": "5\n5 4 -1 7 8",
        "expectedOutput": "23"
      }
    ]
  },
  {
    "id": 5,
    "title": "Move Zeroes",
    "topic": "Arrays",
    "difficulty": "Easy",
    "acceptance": 62.8,
    "status": "unsolved",
    "description": "Given an integer array nums, move all zeroes to the end of it while maintaining the relative order of the non-zero elements.",
    "examples": [
      {
        "input": "nums = [0,1,0,3,12]",
        "output": "[1,3,12,0,0]"
      },
      {
        "input": "nums = [0]",
        "output": "[0]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    "tags": [
      "Array",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "5\n0 1 0 3 12",
        "expectedOutput": "1 3 12 0 0"
      },
      {
        "input": "1\n0",
        "expectedOutput": "0"
      },
      {
        "input": "5\n1 0 2 0 3",
        "expectedOutput": "1 2 3 0 0"
      }
    ]
  },
  {
    "id": 6,
    "title": "Best Time to Buy and Sell Stock II",
    "topic": "Arrays",
    "difficulty": "Medium",
    "acceptance": 58.3,
    "status": "unsolved",
    "description": "You are given an array prices where prices[i] is the price of a stock on the ith day. You may buy and sell the stock multiple times. Return the maximum profit you can achieve.",
    "examples": [
      {
        "input": "prices = [7,1,5,3,6,4]",
        "output": "7"
      },
      {
        "input": "prices = [1,2,3,4,5]",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= prices.length <= 3 * 10^4",
      "0 <= prices[i] <= 10^4"
    ],
    "tags": [
      "Array",
      "Greedy",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "6\n7 1 5 3 6 4",
        "expectedOutput": "7"
      },
      {
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "4"
      },
      {
        "input": "5\n7 6 4 3 1",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": 7,
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "topic": "Arrays",
    "acceptance": 58.4,
    "description": "You are given two sorted integer arrays nums1 and nums2. Merge nums2 into nums1 so that nums1 becomes one sorted array.",
    "examples": [
      {
        "input": "3 1 2 3 3 2 5 6",
        "output": "1 2 2 3 5 6"
      },
      {
        "input": "1 1 0",
        "output": "1"
      }
    ],
    "constraints": [
      "nums1 is sorted in non-decreasing order.",
      "nums2 is sorted in non-decreasing order.",
      "The final array must be sorted in non-decreasing order."
    ],
    "tags": [
      "Arrays",
      "Two Pointers",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "3\n1 2 3\n3\n2 5 6",
        "expectedOutput": "1 2 2 3 5 6"
      },
      {
        "input": "1\n1\n0\n",
        "expectedOutput": "1"
      },
      {
        "input": "4\n1 3 5 7\n3\n2 4 6",
        "expectedOutput": "1 2 3 4 5 6 7"
      }
    ]
  },
  {
    "id": 8,
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "topic": "Arrays",
    "acceptance": 56.2,
    "description": "Given a sorted array, remove the duplicates in-place so that each unique element appears only once. Return the number of unique elements.",
    "examples": [
      {
        "input": "3\n1 1 2",
        "output": "2\n1 2"
      },
      {
        "input": "5\n0 0 1 1 2",
        "output": "3\n0 1 2"
      }
    ],
    "constraints": [
      "The array is sorted in non-decreasing order.",
      "Modify the array in-place.",
      "Return the number of unique elements."
    ],
    "tags": [
      "Arrays",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "3\n1 1 2",
        "expectedOutput": "2\n1 2"
      },
      {
        "input": "5\n0 0 1 1 2",
        "expectedOutput": "3\n0 1 2"
      },
      {
        "input": "6\n1 1 1 2 2 3",
        "expectedOutput": "3\n1 2 3"
      }
    ]
  },
  {
    "id": 9,
    "title": "Rotate Array",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 48.7,
    "description": "Given an integer array, rotate the array to the right by k steps.",
    "examples": [
      {
        "input": "7\n1 2 3 4 5 6 7\n3",
        "output": "5 6 7 1 2 3 4"
      },
      {
        "input": "4\n-1 -100 3 99\n2",
        "output": "3 99 -1 -100"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100000",
      "0 <= k <= 100000",
      "Rotate the array to the right by k positions."
    ],
    "tags": [
      "Arrays",
      "Math",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "7\n1 2 3 4 5 6 7\n3",
        "expectedOutput": "5 6 7 1 2 3 4"
      },
      {
        "input": "4\n-1 -100 3 99\n2",
        "expectedOutput": "3 99 -1 -100"
      },
      {
        "input": "5\n1 2 3 4 5\n1",
        "expectedOutput": "5 1 2 3 4"
      }
    ]
  },
  {
    "id": 10,
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 66.1,
    "description": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i].",
    "examples": [
      {
        "input": "4\n1 2 3 4",
        "output": "24 12 8 6"
      },
      {
        "input": "4\n-1 1 0 -3",
        "output": "0 0 3 0"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 100000",
      "The product of any prefix or suffix fits within a 32-bit integer.",
      "Do not use division."
    ],
    "tags": [
      "Arrays",
      "Prefix Sum"
    ],
    "testCases": [
      {
        "input": "4\n1 2 3 4",
        "expectedOutput": "24 12 8 6"
      },
      {
        "input": "4\n-1 1 0 -3",
        "expectedOutput": "0 0 3 0"
      },
      {
        "input": "3\n2 3 4",
        "expectedOutput": "12 8 6"
      }
    ]
  },
  {
    "id": 11,
    "title": "3Sum",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 36.8,
    "description": "Given an integer array nums, find all unique triplets [nums[i], nums[j], nums[k]] such that the three numbers add up to zero.",
    "examples": [
      {
        "input": "6\n-1 0 1 2 -1 -4",
        "output": "[-1 -1 2] [-1 0 1]"
      },
      {
        "input": "3\n0 0 0",
        "output": "[0 0 0]"
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000",
      "Each triplet must contain three different indices.",
      "The solution must not contain duplicate triplets."
    ],
    "tags": [
      "Arrays",
      "Two Pointers",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "6\n-1 0 1 2 -1 -4",
        "expectedOutput": "-1 -1 2\n-1 0 1"
      },
      {
        "input": "3\n0 0 0",
        "expectedOutput": "0 0 0"
      },
      {
        "input": "4\n0 1 1 2",
        "expectedOutput": ""
      }
    ]
  },
  {
    "id": 12,
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "topic": "Strings",
    "acceptance": 65.4,
    "description": "Given two strings s and t, determine if t is an anagram of s.",
    "examples": [
      {
        "input": "anagram\nnagaram",
        "output": "true"
      },
      {
        "input": "rat\ncar",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= s.length, t.length <= 50000",
      "s and t consist of lowercase English letters."
    ],
    "tags": [
      "Strings",
      "Hash Table",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "anagram\nnagaram",
        "expectedOutput": "true"
      },
      {
        "input": "rat\ncar",
        "expectedOutput": "false"
      },
      {
        "input": "listen\nsilent",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": 13,
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "topic": "Strings",
    "acceptance": 52.8,
    "description": "Given a string, determine whether it is a palindrome after converting uppercase letters to lowercase and removing non-alphanumeric characters.",
    "examples": [
      {
        "input": "A man, a plan, a canal: Panama",
        "output": "true"
      },
      {
        "input": "race a car",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= s.length <= 200000",
      "The string may contain letters, digits, spaces and punctuation."
    ],
    "tags": [
      "Strings",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "A man, a plan, a canal: Panama",
        "expectedOutput": "true"
      },
      {
        "input": "race a car",
        "expectedOutput": "false"
      },
      {
        "input": "Was it a car or a cat I saw?",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": 14,
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "topic": "Strings",
    "acceptance": 44.9,
    "description": "Write a function to find the longest common prefix string amongst an array of strings.",
    "examples": [
      {
        "input": "3\nflower flow flight",
        "output": "fl"
      },
      {
        "input": "3\ndog racecar car",
        "output": ""
      }
    ],
    "constraints": [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "All strings contain lowercase English letters."
    ],
    "tags": [
      "Strings"
    ],
    "testCases": [
      {
        "input": "3\nflower flow flight",
        "expectedOutput": "fl"
      },
      {
        "input": "3\ndog racecar car",
        "expectedOutput": ""
      },
      {
        "input": "3\ninterview internet internal",
        "expectedOutput": "inter"
      }
    ]
  },
  {
    "id": 15,
    "title": "Reverse Words in a String",
    "difficulty": "Medium",
    "topic": "Strings",
    "acceptance": 51.7,
    "description": "Given a string containing words separated by spaces, return the words in reverse order. Remove extra spaces between words.",
    "examples": [
      {
        "input": "the sky is blue",
        "output": "blue is sky the"
      },
      {
        "input": "  hello world  ",
        "output": "world hello"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10000",
      "The string may contain leading or trailing spaces."
    ],
    "tags": [
      "Strings",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "the sky is blue",
        "expectedOutput": "blue is sky the"
      },
      {
        "input": "  hello world  ",
        "expectedOutput": "world hello"
      },
      {
        "input": "a good   example",
        "expectedOutput": "example good a"
      }
    ]
  },
  {
    "id": 16,
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "topic": "Strings",
    "acceptance": 36.5,
    "description": "Given a string, find the length of the longest substring without repeating characters.",
    "examples": [
      {
        "input": "abcabcbb",
        "output": "3"
      },
      {
        "input": "bbbbb",
        "output": "1"
      }
    ],
    "constraints": [
      "0 <= s.length <= 50000",
      "The string may contain letters, digits, symbols and spaces."
    ],
    "tags": [
      "Strings",
      "Hash Table",
      "Sliding Window"
    ],
    "testCases": [
      {
        "input": "abcabcbb",
        "expectedOutput": "3"
      },
      {
        "input": "bbbbb",
        "expectedOutput": "1"
      },
      {
        "input": "pwwkew",
        "expectedOutput": "3"
      }
    ]
  },
  {
    "id": 17,
    "title": "String to Integer (atoi)",
    "difficulty": "Medium",
    "topic": "Strings",
    "acceptance": 18.2,
    "description": "Convert a string into a 32-bit signed integer while handling leading spaces, optional signs, digits and overflow.",
    "examples": [
      {
        "input": "42",
        "output": "42"
      },
      {
        "input": "   -42",
        "output": "-42"
      }
    ],
    "constraints": [
      "0 <= s.length <= 200",
      "The string may contain spaces, signs and digits."
    ],
    "tags": [
      "Strings",
      "Math"
    ],
    "testCases": [
      {
        "input": "42",
        "expectedOutput": "42"
      },
      {
        "input": "   -42",
        "expectedOutput": "-42"
      },
      {
        "input": "4193 with words",
        "expectedOutput": "4193"
      }
    ]
  },
  {
    "id": 18,
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "topic": "Strings",
    "acceptance": 36.1,
    "description": "Given a string s, return the longest palindromic substring in s.",
    "examples": [
      {
        "input": "babad",
        "output": "bab"
      },
      {
        "input": "cbbd",
        "output": "bb"
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "The string consists of lowercase English letters."
    ],
    "tags": [
      "Strings",
      "Dynamic Programming"
    ],
    "testCases": [
      {
        "input": "babad",
        "expectedOutput": "bab"
      },
      {
        "input": "cbbd",
        "expectedOutput": "bb"
      },
      {
        "input": "racecar",
        "expectedOutput": "racecar"
      }
    ]
  },
  {
    "id": 19,
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "topic": "Strings",
    "acceptance": 69.3,
    "description": "Given an array of strings, group the anagrams together.",
    "examples": [
      {
        "input": "6\neat tea tan ate nat bat",
        "output": "ate eat tea\nbat\ntan nat"
      }
    ],
    "constraints": [
      "1 <= strs.length <= 10000",
      "0 <= strs[i].length <= 100",
      "Strings consist of lowercase English letters."
    ],
    "tags": [
      "Strings",
      "Hash Table",
      "Sorting"
    ],
    "testCases": [
      {
        "input": "6\neat tea tan ate nat bat",
        "expectedOutput": "ate eat tea\nbat\ntan nat"
      },
      {
        "input": "3\nabc bca cab",
        "expectedOutput": "abc bca cab"
      },
      {
        "input": "3\nhello world test",
        "expectedOutput": "hello\nworld\ntest"
      }
    ]
  },
  {
    "id": 20,
    "title": "Is Subsequence",
    "difficulty": "Easy",
    "topic": "Strings",
    "acceptance": 49.6,
    "description": "Given two strings s and t, determine whether s is a subsequence of t.",
    "examples": [
      {
        "input": "abc\nahbgdc",
        "output": "true"
      },
      {
        "input": "axc\nahbgdc",
        "output": "false"
      }
    ],
    "constraints": [
      "0 <= s.length <= 100",
      "0 <= t.length <= 10000",
      "Both strings contain lowercase English letters."
    ],
    "tags": [
      "Strings",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "abc\nahbgdc",
        "expectedOutput": "true"
      },
      {
        "input": "axc\nahbgdc",
        "expectedOutput": "false"
      },
      {
        "input": "ace\nabcde",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": 21,
    "title": "First Unique Character in a String",
    "difficulty": "Easy",
    "topic": "Strings",
    "acceptance": 62.4,
    "description": "Given a string, find the first non-repeating character and return its index. Return -1 if it does not exist.",
    "examples": [
      {
        "input": "leetcode",
        "output": "0"
      },
      {
        "input": "loveleetcode",
        "output": "2"
      }
    ],
    "constraints": [
      "1 <= s.length <= 100000",
      "The string consists of lowercase English letters."
    ],
    "tags": [
      "Strings",
      "Hash Table"
    ],
    "testCases": [
      {
        "input": "leetcode",
        "expectedOutput": "0"
      },
      {
        "input": "loveleetcode",
        "expectedOutput": "2"
      },
      {
        "input": "aabb",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": 22,
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "acceptance": 78.5,
    "description": "Given the head of a singly linked list, reverse the list and return the new head.",
    "examples": [
      {
        "input": "5\n1 2 3 4 5",
        "output": "5 4 3 2 1"
      },
      {
        "input": "2\n1 2",
        "output": "2 1"
      }
    ],
    "constraints": [
      "0 <= number of nodes <= 5000",
      "-5000 <= Node.val <= 5000"
    ],
    "tags": [
      "Linked List",
      "Recursion"
    ],
    "testCases": [
      {
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "5 4 3 2 1"
      },
      {
        "input": "2\n1 2",
        "expectedOutput": "2 1"
      },
      {
        "input": "1\n10",
        "expectedOutput": "10"
      }
    ]
  },
  {
    "id": 23,
    "title": "Middle of the Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "acceptance": 80.2,
    "description": "Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.",
    "examples": [
      {
        "input": "5\n1 2 3 4 5",
        "output": "3 4 5"
      },
      {
        "input": "6\n1 2 3 4 5 6",
        "output": "4 5 6"
      }
    ],
    "constraints": [
      "1 <= number of nodes <= 100",
      "1 <= Node.val <= 100"
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "3"
      },
      {
        "input": "6\n1 2 3 4 5 6",
        "expectedOutput": "4"
      },
      {
        "input": "1\n10",
        "expectedOutput": "10"
      }
    ]
  },
  {
    "id": 24,
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "topic": "Linked List",
    "acceptance": 52.1,
    "description": "Given the head of a linked list, determine if the linked list contains a cycle.",
    "examples": [
      {
        "input": "4\n3 2 0 -4\n1",
        "output": "true"
      },
      {
        "input": "2\n1 2\n-1",
        "output": "false"
      }
    ],
    "constraints": [
      "The number of nodes is in the range [0, 10000].",
      "Node values are integers.",
      "pos represents the index where the tail connects."
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "4\n3 2 0 -4\n1",
        "expectedOutput": "true"
      },
      {
        "input": "2\n1 2\n-1",
        "expectedOutput": "false"
      },
      {
        "input": "1\n1\n0",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": 25,
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "topic": "Linked List",
    "acceptance": 64.8,
    "description": "Merge two sorted linked lists and return the head of the merged sorted list.",
    "examples": [
      {
        "input": "3\n1 2 4\n3\n1 3 4",
        "output": "1 1 2 3 4 4"
      },
      {
        "input": "0\n\n3\n0 1 2",
        "output": "0 1 2"
      }
    ],
    "constraints": [
      "The number of nodes in both lists is between 0 and 50.",
      "Both linked lists are sorted in non-decreasing order."
    ],
    "tags": [
      "Linked List",
      "Recursion"
    ],
    "testCases": [
      {
        "input": "3\n1 2 4\n3\n1 3 4",
        "expectedOutput": "1 1 2 3 4 4"
      },
      {
        "input": "3\n1 2 3\n3\n4 5 6",
        "expectedOutput": "1 2 3 4 5 6"
      },
      {
        "input": "2\n1 2\n0\n",
        "expectedOutput": "1 2"
      }
    ]
  },
  {
    "id": 26,
    "title": "Remove Linked List Elements",
    "difficulty": "Easy",
    "topic": "Linked List",
    "acceptance": 45.7,
    "description": "Given the head of a linked list and an integer val, remove all nodes whose value equals val.",
    "examples": [
      {
        "input": "6\n1 2 6 3 4 5 6",
        "output": "1 2 3 4 5"
      },
      {
        "input": "1\n7\n7",
        "output": ""
      }
    ],
    "constraints": [
      "The number of nodes is between 0 and 10000.",
      "1 <= Node.val <= 50.",
      "0 <= val <= 50."
    ],
    "tags": [
      "Linked List"
    ],
    "testCases": [
      {
        "input": "7\n1 2 6 3 4 5 6\n6",
        "expectedOutput": "1 2 3 4 5"
      },
      {
        "input": "3\n7 7 7\n7",
        "expectedOutput": ""
      },
      {
        "input": "5\n1 2 3 4 5\n3",
        "expectedOutput": "1 2 4 5"
      }
    ]
  },
  {
    "id": 27,
    "title": "Palindrome Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "acceptance": 54.6,
    "description": "Given the head of a singly linked list, determine whether it is a palindrome.",
    "examples": [
      {
        "input": "4\n1 2 2 1",
        "output": "true"
      },
      {
        "input": "2\n1 2",
        "output": "false"
      }
    ],
    "constraints": [
      "The number of nodes is between 1 and 100000.",
      "Node values are integers."
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "4\n1 2 2 1",
        "expectedOutput": "true"
      },
      {
        "input": "2\n1 2",
        "expectedOutput": "false"
      },
      {
        "input": "5\n1 2 3 2 1",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": 28,
    "title": "Intersection of Two Linked Lists",
    "difficulty": "Easy",
    "topic": "Linked List",
    "acceptance": 58.3,
    "description": "Given the heads of two singly linked lists, return the node at which the two lists intersect. If they do not intersect, return -1.",
    "examples": [
      {
        "input": "5\n4 1 8 4 5\n6\n5 6 1 8 4 5\n2",
        "output": "8"
      },
      {
        "input": "3\n1 9 1\n2\n3 2\n-1",
        "output": "-1"
      }
    ],
    "constraints": [
      "The number of nodes in each list is between 1 and 30000.",
      "The lists may or may not intersect."
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "3\n4 1 8\n3\n5 6 8\n2",
        "expectedOutput": "8"
      },
      {
        "input": "3\n1 2 3\n2\n4 5\n-1",
        "expectedOutput": "-1"
      },
      {
        "input": "2\n1 2\n3\n3 4 2\n1",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": 29,
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "topic": "Linked List",
    "acceptance": 48.9,
    "description": "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    "examples": [
      {
        "input": "5\n1 2 3 4 5\n2",
        "output": "1 2 3 5"
      },
      {
        "input": "1\n1\n1",
        "output": ""
      }
    ],
    "constraints": [
      "1 <= number of nodes <= 100000",
      "1 <= n <= number of nodes"
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "5\n1 2 3 4 5\n2",
        "expectedOutput": "1 2 3 5"
      },
      {
        "input": "1\n1\n1",
        "expectedOutput": ""
      },
      {
        "input": "5\n1 2 3 4 5\n5",
        "expectedOutput": "2 3 4 5"
      }
    ]
  },
  {
    "id": 30,
    "title": "Add Two Numbers",
    "difficulty": "Medium",
    "topic": "Linked List",
    "acceptance": 46.3,
    "description": "You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.",
    "examples": [
      {
        "input": "3\n2 4 3\n3\n5 6 4",
        "output": "7 0 8"
      },
      {
        "input": "1\n0\n1\n0",
        "output": "0"
      }
    ],
    "constraints": [
      "Each linked list contains at least one node.",
      "The numbers do not contain leading zeros unless the number is zero.",
      "Each node contains a digit from 0 to 9."
    ],
    "tags": [
      "Linked List",
      "Math"
    ],
    "testCases": [
      {
        "input": "3\n2 4 3\n3\n5 6 4",
        "expectedOutput": "7 0 8"
      },
      {
        "input": "1\n0\n1\n0",
        "expectedOutput": "0"
      },
      {
        "input": "4\n9 9 9 9\n2\n9 9",
        "expectedOutput": "8 9 0 0 1"
      }
    ]
  },
  {
    "id": 31,
    "title": "Swap Nodes in Pairs",
    "difficulty": "Medium",
    "topic": "Linked List",
    "acceptance": 72.4,
    "description": "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem by modifying the nodes rather than their values.",
    "examples": [
      {
        "input": "4\n1 2 3 4",
        "output": "2 1 4 3"
      },
      {
        "input": "3\n1 2 3",
        "output": "2 1 3"
      }
    ],
    "constraints": [
      "The number of nodes is between 0 and 100.",
      "0 <= Node.val <= 100."
    ],
    "tags": [
      "Linked List",
      "Recursion"
    ],
    "testCases": [
      {
        "input": "4\n1 2 3 4",
        "expectedOutput": "2 1 4 3"
      },
      {
        "input": "3\n1 2 3",
        "expectedOutput": "2 1 3"
      },
      {
        "input": "2\n5 10",
        "expectedOutput": "10 5"
      }
    ]
  },
  {
    "id": 32,
    "title": "Remove Duplicates from Sorted Array",
    "topic": "Arrays",
    "difficulty": "Easy",
    "acceptance": 54.8,
    "status": "unsolved",
    "description": "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Output the count of unique elements on the first line, followed by the unique elements separated by space on the second line.",
    "examples": [
      {
        "input": "3\n1 1 2",
        "output": "2\n1 2"
      },
      {
        "input": "10\n0 0 1 1 1 2 2 3 3 4",
        "output": "5\n0 1 2 3 4"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "-100 <= nums[i] <= 100",
      "nums is sorted in non-decreasing order."
    ],
    "tags": [
      "Array",
      "Two Pointers"
    ],
    "testCases": [
      {
        "input": "3\n1 1 2",
        "expectedOutput": "2\n1 2"
      },
      {
        "input": "10\n0 0 1 1 1 2 2 3 3 4",
        "expectedOutput": "5\n0 1 2 3 4"
      },
      {
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "5\n1 2 3 4 5"
      }
    ]
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
  },
  {
    "id": 51,
    "title": "Set Matrix Zeroes",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 54.3,
    "description": "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's in place. Input format: First line has m and n. The next m lines each contain n integers.",
    "examples": [
      {
        "input": "3 3\n1 1 1\n1 0 1\n1 1 1",
        "output": "1 0 1\n0 0 0\n1 0 1"
      }
    ],
    "constraints": [
      "m == matrix.length",
      "n == matrix[0].length",
      "1 <= m, n <= 200",
      "-2^31 <= matrix[i][j] <= 2^31 - 1"
    ],
    "tags": [
      "Array",
      "Matrix"
    ],
    "hints": [
      "Can you use the first row and first column of the matrix itself as flags instead of allocating extra space?",
      "Keep a separate boolean variable for row 0 and/or col 0 to know if they originally contained any zeroes."
    ],
    "testCases": [
      {
        "input": "3 3\n1 1 1\n1 0 1\n1 1 1",
        "expectedOutput": "1 0 1\n0 0 0\n1 0 1"
      },
      {
        "input": "3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5",
        "expectedOutput": "0 0 0 0\n0 4 5 0\n0 3 1 0"
      },
      {
        "input": "1 2\n1 0",
        "expectedOutput": "0 0"
      }
    ]
  },
  {
    "id": 52,
    "title": "Pascal's Triangle",
    "difficulty": "Easy",
    "topic": "Arrays",
    "acceptance": 71.4,
    "description": "Given an integer numRows, return the first numRows of Pascal's triangle. Input format: A single integer numRows. Output each row separated by spaces, one row per line.",
    "examples": [
      {
        "input": "5",
        "output": "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1"
      }
    ],
    "constraints": [
      "1 <= numRows <= 30"
    ],
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [
      "Each element at position j in row i is the sum of elements at j-1 and j from row i-1.",
      "The first and last element of each row is always 1."
    ],
    "testCases": [
      {
        "input": "5",
        "expectedOutput": "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1"
      },
      {
        "input": "1",
        "expectedOutput": "1"
      },
      {
        "input": "2",
        "expectedOutput": "1\n1 1"
      }
    ]
  },
  {
    "id": 53,
    "title": "Next Permutation",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 39.8,
    "description": "Given an array of integers nums, find the next lexicographically greater permutation of its numbers. If no greater permutation exists, rearrange it as the lowest possible order (sorted in ascending order). Input format: Size n on first line, followed by n space-separated integers on the next line. Output: the resulting array space-separated.",
    "examples": [
      {
        "input": "3\n1 2 3",
        "output": "1 3 2"
      },
      {
        "input": "3\n3 2 1",
        "output": "1 2 3"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 100"
    ],
    "tags": [
      "Array",
      "Two Pointers"
    ],
    "hints": [
      "Find the first index i from right to left where nums[i] < nums[i+1].",
      "Then find the smallest element from the right that is greater than nums[i], swap them, and reverse the suffix after index i."
    ],
    "testCases": [
      {
        "input": "3\n1 2 3",
        "expectedOutput": "1 3 2"
      },
      {
        "input": "3\n3 2 1",
        "expectedOutput": "1 2 3"
      },
      {
        "input": "3\n1 1 5",
        "expectedOutput": "1 5 1"
      },
      {
        "input": "1\n1",
        "expectedOutput": "1"
      }
    ]
  },
  {
    "id": 54,
    "title": "Sort Colors",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 62.5,
    "description": "Given an array nums with n objects colored red, white, or blue (represented by integers 0, 1, and 2), sort them in-place so that objects of the same color are adjacent, in order 0, 1, 2 (Dutch National Flag problem). Input format: n on first line, then n space-separated integers on second line.",
    "examples": [
      {
        "input": "6\n2 0 2 1 1 0",
        "output": "0 0 1 1 2 2"
      }
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 300",
      "nums[i] is either 0, 1, or 2."
    ],
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "hints": [
      "Use three pointers: low, mid, and high.",
      "If nums[mid] == 0, swap with nums[low] and advance both. If 1, advance mid. If 2, swap with nums[high] and decrement high."
    ],
    "testCases": [
      {
        "input": "6\n2 0 2 1 1 0",
        "expectedOutput": "0 0 1 1 2 2"
      },
      {
        "input": "3\n2 0 1",
        "expectedOutput": "0 1 2"
      },
      {
        "input": "1\n0",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": 55,
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 47.9,
    "description": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals. Input format: Number of intervals n on first line, followed by n lines each containing start and end integers. Output: Merged intervals each on a new line.",
    "examples": [
      {
        "input": "4\n1 3\n2 6\n8 10\n15 18",
        "output": "1 6\n8 10\n15 18"
      }
    ],
    "constraints": [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    "tags": [
      "Array",
      "Sorting"
    ],
    "hints": [
      "Sort intervals by their start time first.",
      "Iterate through sorted intervals. If the current interval starts before or at the end of the previous one, merge them by extending the end."
    ],
    "testCases": [
      {
        "input": "4\n1 3\n2 6\n8 10\n15 18",
        "expectedOutput": "1 6\n8 10\n15 18"
      },
      {
        "input": "2\n1 4\n4 5",
        "expectedOutput": "1 5"
      },
      {
        "input": "1\n1 4",
        "expectedOutput": "1 4"
      }
    ]
  },
  {
    "id": 56,
    "title": "Find the Duplicate Number",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 60.1,
    "description": "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive, there is only one repeated number. Return this repeated number without modifying the array and using O(1) extra space. Input format: Size k on first line, followed by k integers.",
    "examples": [
      {
        "input": "5\n1 3 4 2 2",
        "output": "2"
      },
      {
        "input": "5\n3 1 3 4 2",
        "output": "3"
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "nums.length == n + 1",
      "1 <= nums[i] <= n"
    ],
    "tags": [
      "Array",
      "Two Pointers",
      "Binary Search"
    ],
    "hints": [
      "Can you view this array as a linked list where nums[i] is the pointer to the next index?",
      "Use Floyd's Cycle Detection (Tortoise and Hare) algorithm to find the entry of the cycle."
    ],
    "testCases": [
      {
        "input": "5\n1 3 4 2 2",
        "expectedOutput": "2"
      },
      {
        "input": "5\n3 1 3 4 2",
        "expectedOutput": "3"
      },
      {
        "input": "4\n3 3 3 3",
        "expectedOutput": "3"
      }
    ]
  },
  {
    "id": 57,
    "title": "Rotate Image",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 73.2,
    "description": "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place. Input format: First line has n. Next n lines each contain n integers. Output: The rotated matrix.",
    "examples": [
      {
        "input": "3\n1 2 3\n4 5 6\n7 8 9",
        "output": "7 4 1\n8 5 2\n9 6 3"
      }
    ],
    "constraints": [
      "n == matrix.length == matrix[i].length",
      "1 <= n <= 20",
      "-1000 <= matrix[i][j] <= 1000"
    ],
    "tags": [
      "Array",
      "Math",
      "Matrix"
    ],
    "hints": [
      "Rotating 90 degrees clockwise is equivalent to transposing the matrix, followed by reversing each row.",
      "Transpose matrix[i][j] with matrix[j][i], then reverse row by row."
    ],
    "testCases": [
      {
        "input": "3\n1 2 3\n4 5 6\n7 8 9",
        "expectedOutput": "7 4 1\n8 5 2\n9 6 3"
      },
      {
        "input": "1\n5",
        "expectedOutput": "5"
      },
      {
        "input": "2\n1 2\n3 4",
        "expectedOutput": "3 1\n4 2"
      }
    ]
  },
  {
    "id": 58,
    "title": "Spiral Matrix",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 49.3,
    "description": "Given an m x n matrix, return all elements of the matrix in spiral order. Input format: m and n on the first line, then m lines each with n integers. Output: All elements in spiral order space-separated on a single line.",
    "examples": [
      {
        "input": "3 3\n1 2 3\n4 5 6\n7 8 9",
        "output": "1 2 3 6 9 8 7 4 5"
      }
    ],
    "constraints": [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 10",
      "-100 <= matrix[i][j] <= 100"
    ],
    "tags": [
      "Array",
      "Matrix",
      "Simulation"
    ],
    "hints": [
      "Maintain four boundaries: top, bottom, left, right.",
      "Traverse right along top, down along right, left along bottom, up along left, shrinking boundaries after each step."
    ],
    "testCases": [
      {
        "input": "3 3\n1 2 3\n4 5 6\n7 8 9",
        "expectedOutput": "1 2 3 6 9 8 7 4 5"
      },
      {
        "input": "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12",
        "expectedOutput": "1 2 3 4 8 12 11 10 9 5 6 7"
      },
      {
        "input": "1 1\n1",
        "expectedOutput": "1"
      }
    ]
  },
  {
    "id": 59,
    "title": "Majority Element",
    "difficulty": "Easy",
    "topic": "Arrays",
    "acceptance": 64.8,
    "description": "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array. Input format: n on first line, followed by n integers.",
    "examples": [
      {
        "input": "3\n3 2 3",
        "output": "3"
      },
      {
        "input": "7\n2 2 1 1 1 2 2",
        "output": "2"
      }
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 5 * 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "tags": [
      "Array",
      "Hash Table",
      "Divide and Conquer",
      "Counting"
    ],
    "hints": [
      "Can you solve it in O(N) time and O(1) space?",
      "Use Boyer-Moore Voting Algorithm: maintain a candidate and a count counter."
    ],
    "testCases": [
      {
        "input": "3\n3 2 3",
        "expectedOutput": "3"
      },
      {
        "input": "7\n2 2 1 1 1 2 2",
        "expectedOutput": "2"
      },
      {
        "input": "1\n10",
        "expectedOutput": "10"
      }
    ]
  },
  {
    "id": 60,
    "title": "Majority Element II",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 47.6,
    "description": "Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times. Input format: n on first line, followed by n integers. Output: space-separated elements sorted in ascending order.",
    "examples": [
      {
        "input": "3\n3 2 3",
        "output": "3"
      },
      {
        "input": "2\n1 2",
        "output": "1 2"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5 * 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "tags": [
      "Array",
      "Hash Table",
      "Counting"
    ],
    "hints": [
      "There can be at most 2 elements that appear more than n/3 times.",
      "Extend Boyer-Moore voting with two candidates and two counters."
    ],
    "testCases": [
      {
        "input": "3\n3 2 3",
        "expectedOutput": "3"
      },
      {
        "input": "1\n1",
        "expectedOutput": "1"
      },
      {
        "input": "2\n1 2",
        "expectedOutput": "1 2"
      }
    ]
  },
  {
    "id": 61,
    "title": "Pow(x, n)",
    "difficulty": "Medium",
    "topic": "Math",
    "acceptance": 34.7,
    "description": "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n). Input format: x (float) and n (integer) on a single line. Output the result rounded to 5 decimal places.",
    "examples": [
      {
        "input": "2.00000 10",
        "output": "1024.00000"
      },
      {
        "input": "2.10000 3",
        "output": "9.26100"
      }
    ],
    "constraints": [
      "-100.0 < x < 100.0",
      "-2^31 <= n <= 2^31-1",
      "n is an integer"
    ],
    "tags": [
      "Math",
      "Recursion"
    ],
    "hints": [
      "Binary exponentiation computes x^n in O(log n) multiplications.",
      "If n is even, x^n = (x * x)^(n / 2). If odd, x * x^(n - 1). Handle negative n by taking reciprocal."
    ],
    "testCases": [
      {
        "input": "2.00000 10",
        "expectedOutput": "1024.00000"
      },
      {
        "input": "2.10000 3",
        "expectedOutput": "9.26100"
      },
      {
        "input": "2.00000 -2",
        "expectedOutput": "0.25000"
      }
    ]
  },
  {
    "id": 62,
    "title": "Search a 2D Matrix",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "acceptance": 50.2,
    "description": "You are given an m x n integer matrix with the properties that integers in each row are sorted from left to right, and the first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix or false otherwise. Input format: m, n, target on first line. Next m lines contain n integers each.",
    "examples": [
      {
        "input": "3 4 3\n1 3 5 7\n10 11 16 20\n23 30 34 60",
        "output": "true"
      }
    ],
    "constraints": [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 100",
      "-10^4 <= matrix[i][j], target <= 10^4"
    ],
    "tags": [
      "Array",
      "Binary Search",
      "Matrix"
    ],
    "hints": [
      "Notice that the matrix is virtually a single 1D sorted array of length m * n.",
      "Any index idx in [0, m*n - 1] maps to row = idx / n and col = idx % n."
    ],
    "testCases": [
      {
        "input": "3 4 3\n1 3 5 7\n10 11 16 20\n23 30 34 60",
        "expectedOutput": "true"
      },
      {
        "input": "3 4 13\n1 3 5 7\n10 11 16 20\n23 30 34 60",
        "expectedOutput": "false"
      },
      {
        "input": "1 1 0\n0",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": 63,
    "title": "Unique Paths",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "acceptance": 64.1,
    "description": "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]) and wants to move to the bottom-right corner (grid[m - 1][n - 1]). The robot can only move either down or right at any point in time. Return the number of possible unique paths. Input format: m and n on a single line.",
    "examples": [
      {
        "input": "3 7",
        "output": "28"
      },
      {
        "input": "3 2",
        "output": "3"
      }
    ],
    "constraints": [
      "1 <= m, n <= 100"
    ],
    "tags": [
      "Math",
      "Dynamic Programming",
      "Combinatorics"
    ],
    "hints": [
      "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
      "Alternatively, this is a combinatorics problem: C(m + n - 2, m - 1)."
    ],
    "testCases": [
      {
        "input": "3 7",
        "expectedOutput": "28"
      },
      {
        "input": "3 2",
        "expectedOutput": "3"
      },
      {
        "input": "1 1",
        "expectedOutput": "1"
      }
    ]
  },
  {
    "id": 64,
    "title": "Inversion Count in Array",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 41.5,
    "description": "Given an array of integers arr[], find the inversion count in the array. Two array elements arr[i] and arr[j] form an inversion if arr[i] > arr[j] and i < j. Input format: n on first line, followed by n space-separated integers on the next line.",
    "examples": [
      {
        "input": "5\n2 4 1 3 5",
        "output": "3"
      },
      {
        "input": "3\n10 10 10",
        "output": "0"
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "1 <= arr[i] <= 10^9"
    ],
    "tags": [
      "Array",
      "Sorting",
      "Divide and Conquer"
    ],
    "hints": [
      "A brute force approach checks all pairs in O(N^2).",
      "During the merge step of Merge Sort, when arr[i] > arr[j] (i from left, j from right), all remaining elements in the left half are also greater than arr[j]."
    ],
    "testCases": [
      {
        "input": "5\n2 4 1 3 5",
        "expectedOutput": "3"
      },
      {
        "input": "3\n10 10 10",
        "expectedOutput": "0"
      },
      {
        "input": "4\n4 3 2 1",
        "expectedOutput": "6"
      }
    ]
  },
  {
    "id": 65,
    "title": "4Sum",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 36.2,
    "description": "Given an array nums of n integers, return the count of unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that a, b, c, and d are distinct and nums[a] + nums[b] + nums[c] + nums[d] == target. Input format: n and target on first line, followed by n space-separated integers on second line.",
    "examples": [
      {
        "input": "6 0\n1 0 -1 0 -2 2",
        "output": "3"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 200",
      "-10^9 <= nums[i], target <= 10^9"
    ],
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "hints": [
      "Sort the array first to handle duplicate elements seamlessly.",
      "Fix two pointers i and j with two nested loops, and use two pointers left and right for the remaining two elements."
    ],
    "testCases": [
      {
        "input": "6 0\n1 0 -1 0 -2 2",
        "expectedOutput": "3"
      },
      {
        "input": "5 8\n2 2 2 2 2",
        "expectedOutput": "1"
      },
      {
        "input": "4 0\n0 0 0 0",
        "expectedOutput": "1"
      }
    ]
  },
  {
    "id": 66,
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 47.5,
    "description": "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. Must run in O(n) time. Input format: n on first line, followed by n space-separated integers.",
    "examples": [
      {
        "input": "6\n100 4 200 1 3 2",
        "output": "4"
      }
    ],
    "constraints": [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "tags": [
      "Array",
      "Hash Table",
      "Union Find"
    ],
    "hints": [
      "Insert all numbers into an unordered set for O(1) lookups.",
      "Only start counting a sequence if num - 1 is NOT in the set (i.e. num is the start of a streak)."
    ],
    "testCases": [
      {
        "input": "6\n100 4 200 1 3 2",
        "expectedOutput": "4"
      },
      {
        "input": "10\n0 3 7 2 5 8 4 6 0 1",
        "expectedOutput": "9"
      },
      {
        "input": "0",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": 67,
    "title": "Largest Subarray with 0 Sum",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 45.1,
    "description": "Given an array having both positive and negative integers, compute the length of the largest subarray with sum 0. Input format: n on first line, followed by n integers.",
    "examples": [
      {
        "input": "8\n15 -2 2 -8 1 7 10 23",
        "output": "5"
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "-1000 <= arr[i] <= 1000"
    ],
    "tags": [
      "Array",
      "Hash Table",
      "Prefix Sum"
    ],
    "hints": [
      "Use prefix sums. If the prefix sum has been seen before at index j, then the subarray between j + 1 and current index has sum 0.",
      "Store the earliest index of each prefix sum in a hash map."
    ],
    "testCases": [
      {
        "input": "8\n15 -2 2 -8 1 7 10 23",
        "expectedOutput": "5"
      },
      {
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "0"
      },
      {
        "input": "3\n1 -1 0",
        "expectedOutput": "3"
      }
    ]
  },
  {
    "id": 68,
    "title": "Subarray Sum Equals K",
    "difficulty": "Medium",
    "topic": "Arrays",
    "acceptance": 44.2,
    "description": "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k. Input format: n and k on first line, followed by n space-separated integers on second line.",
    "examples": [
      {
        "input": "3 2\n1 1 1",
        "output": "2"
      },
      {
        "input": "3 3\n1 2 3",
        "output": "2"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^4",
      "-1000 <= nums[i] <= 1000",
      "-10^7 <= k <= 10^7"
    ],
    "tags": [
      "Array",
      "Hash Table",
      "Prefix Sum"
    ],
    "hints": [
      "Track running prefix sums. We need prefixSum - k to have occurred previously.",
      "Count frequencies of prefix sums in a hash map with initial {0: 1}."
    ],
    "testCases": [
      {
        "input": "3 2\n1 1 1",
        "expectedOutput": "2"
      },
      {
        "input": "3 3\n1 2 3",
        "expectedOutput": "2"
      },
      {
        "input": "1 0\n0",
        "expectedOutput": "1"
      }
    ]
  },
  {
    "id": 69,
    "title": "Find Peak Element",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "acceptance": 46.1,
    "description": "A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks. You must write an algorithm that runs in O(log n) time. Input format: n on first line, followed by n integers on second line.",
    "examples": [
      {
        "input": "4\n1 2 3 1",
        "output": "2"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 1000",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "nums[i] != nums[i + 1] for all valid i"
    ],
    "tags": [
      "Array",
      "Binary Search"
    ],
    "hints": [
      "Compare nums[mid] with nums[mid + 1].",
      "If nums[mid] < nums[mid + 1], there is guaranteed to be at least one peak in the right half."
    ],
    "testCases": [
      {
        "input": "4\n1 2 3 1",
        "expectedOutput": "2"
      },
      {
        "input": "1\n5",
        "expectedOutput": "0"
      },
      {
        "input": "2\n1 2",
        "expectedOutput": "1"
      }
    ]
  },
  {
    "id": 70,
    "title": "Single Element in a Sorted Array",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "acceptance": 59.3,
    "description": "You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Return the single element that appears only once in O(log n) time and O(1) space. Input format: n on first line, followed by n integers.",
    "examples": [
      {
        "input": "9\n1 1 2 3 3 4 4 8 8",
        "output": "2"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "0 <= nums[i] <= 10^5"
    ],
    "tags": [
      "Array",
      "Binary Search"
    ],
    "hints": [
      "Before the single element, pairs start at even indices (even, odd). After the single element, pairs start at odd indices (odd, even).",
      "Check if mid matches its partner based on whether mid is even or odd."
    ],
    "testCases": [
      {
        "input": "9\n1 1 2 3 3 4 4 8 8",
        "expectedOutput": "2"
      },
      {
        "input": "7\n3 3 7 7 10 11 11",
        "expectedOutput": "10"
      },
      {
        "input": "1\n1",
        "expectedOutput": "1"
      }
    ]
  },
  {
    "id": 71,
    "title": "Search in Rotated Sorted Array II",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "acceptance": 37.4,
    "description": "There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values). Given the array nums after rotation and an integer target, return true if target is in nums, or false if it is not. Input format: n and target on first line, followed by n space-separated integers.",
    "examples": [
      {
        "input": "7 0\n2 5 6 0 0 1 2",
        "output": "true"
      },
      {
        "input": "7 3\n2 5 6 0 0 1 2",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i], target <= 10^4"
    ],
    "tags": [
      "Array",
      "Binary Search"
    ],
    "hints": [
      "When nums[low] == nums[mid] == nums[high], we cannot determine which half is sorted.",
      "In this edge case, simply increment low and decrement high."
    ],
    "testCases": [
      {
        "input": "7 0\n2 5 6 0 0 1 2",
        "expectedOutput": "true"
      },
      {
        "input": "7 3\n2 5 6 0 0 1 2",
        "expectedOutput": "false"
      },
      {
        "input": "1 1\n1",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": 72,
    "title": "Koko Eating Bananas",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "acceptance": 49.8,
    "description": "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards will come back in h hours. Return the minimum integer speed k such that she can eat all bananas within h hours. Input format: n and h on first line, followed by n integers on second line.",
    "examples": [
      {
        "input": "4 8\n3 6 7 11",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= piles.length <= 10^4",
      "piles.length <= h <= 10^9",
      "1 <= piles[i] <= 10^9"
    ],
    "tags": [
      "Array",
      "Binary Search"
    ],
    "hints": [
      "The eating speed k lies in the range [1, max(piles)].",
      "For a given speed k, total hours needed is sum(ceil(pile / k)). Binary search for the smallest valid k."
    ],
    "testCases": [
      {
        "input": "4 8\n3 6 7 11",
        "expectedOutput": "4"
      },
      {
        "input": "5 5\n30 11 23 4 20",
        "expectedOutput": "30"
      },
      {
        "input": "5 6\n30 11 23 4 20",
        "expectedOutput": "23"
      }
    ]
  },
  {
    "id": 73,
    "title": "Aggressive Cows",
    "difficulty": "Hard",
    "topic": "Binary Search",
    "acceptance": 58.7,
    "description": "You are given an array of positions of stalls and an integer k denoting the number of aggressive cows. Assign cows to stalls such that the minimum distance between any two of them is as large as possible. Return the largest minimum distance. Input format: n (stalls) and k (cows) on first line, followed by n stall positions.",
    "examples": [
      {
        "input": "5 3\n1 2 8 4 9",
        "output": "3"
      }
    ],
    "constraints": [
      "2 <= n <= 10^5",
      "2 <= k <= n",
      "0 <= stalls[i] <= 10^9"
    ],
    "tags": [
      "Array",
      "Binary Search"
    ],
    "hints": [
      "Sort stall positions first.",
      "Binary search on the answer: can we place k cows such that all adjacent pairs are at least dist apart?"
    ],
    "testCases": [
      {
        "input": "5 3\n1 2 8 4 9",
        "expectedOutput": "3"
      },
      {
        "input": "4 2\n1 2 4 8",
        "expectedOutput": "7"
      },
      {
        "input": "3 2\n1 5 10",
        "expectedOutput": "9"
      }
    ]
  },
  {
    "id": 74,
    "title": "Book Allocation Problem",
    "difficulty": "Hard",
    "topic": "Binary Search",
    "acceptance": 43.6,
    "description": "Given an array of books where each book has pages arr[i], and m students. Allocate books such that the maximum number of pages allocated to any student is minimized. Each student gets a contiguous segment of books. If allocation is impossible (m > n), return -1. Input format: n and m on first line, followed by n integers on second line.",
    "examples": [
      {
        "input": "4 2\n12 34 67 90",
        "output": "113"
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "1 <= m <= 10^5",
      "1 <= arr[i] <= 10^9"
    ],
    "tags": [
      "Array",
      "Binary Search"
    ],
    "hints": [
      "The minimum possible max pages is max(arr), and maximum is sum(arr).",
      "Binary search for the optimal barrier and verify if books can be distributed to <= m students."
    ],
    "testCases": [
      {
        "input": "4 2\n12 34 67 90",
        "expectedOutput": "113"
      },
      {
        "input": "4 4\n5 17 100 11",
        "expectedOutput": "100"
      },
      {
        "input": "2 3\n10 20",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": 75,
    "title": "Roman to Integer",
    "difficulty": "Easy",
    "topic": "Strings",
    "acceptance": 61.2,
    "description": "Given a roman numeral s, convert it to an integer. Input format: A single string on one line. Output: The integer value.",
    "examples": [
      {
        "input": "III",
        "output": "3"
      },
      {
        "input": "LVIII",
        "output": "58"
      },
      {
        "input": "MCMXCIV",
        "output": "1994"
      }
    ],
    "constraints": [
      "1 <= s.length <= 15",
      "s contains only characters ('I', 'V', 'X', 'L', 'C', 'D', 'M')"
    ],
    "tags": [
      "Hash Table",
      "Math",
      "String"
    ],
    "hints": [
      "Map each Roman character to its decimal value.",
      "If the current symbol value is less than the next symbol value, subtract it; otherwise add it."
    ],
    "testCases": [
      {
        "input": "III",
        "expectedOutput": "3"
      },
      {
        "input": "LVIII",
        "expectedOutput": "58"
      },
      {
        "input": "MCMXCIV",
        "expectedOutput": "1994"
      }
    ]
  },
  {
    "id": 76,
    "title": "Integer to Roman",
    "difficulty": "Medium",
    "topic": "Strings",
    "acceptance": 63.8,
    "description": "Given an integer num, convert it to a Roman numeral. Input format: Single integer num on one line.",
    "examples": [
      {
        "input": "3",
        "output": "III"
      },
      {
        "input": "58",
        "output": "LVIII"
      },
      {
        "input": "1994",
        "output": "MCMXCIV"
      }
    ],
    "constraints": [
      "1 <= num <= 3999"
    ],
    "tags": [
      "Hash Table",
      "Math",
      "String"
    ],
    "hints": [
      "List out the 13 base Roman numerals including subtractive pairs: 1000: M, 900: CM, 500: D, 400: CD, 100: C, 90: XC, 50: L, 40: XL, 10: X, 9: IX, 5: V, 4: IV, 1: I.",
      "Greedily subtract the largest possible values."
    ],
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "III"
      },
      {
        "input": "58",
        "expectedOutput": "LVIII"
      },
      {
        "input": "1994",
        "expectedOutput": "MCMXCIV"
      }
    ]
  },
  {
    "id": 77,
    "title": "Count and Say",
    "difficulty": "Medium",
    "topic": "Strings",
    "acceptance": 54.7,
    "description": "The count-and-say sequence is a sequence of digit strings defined by the recursive formula: countAndSay(1) = '1', and countAndSay(n) is the run-length encoding of countAndSay(n - 1). Given positive integer n, return the nth term. Input format: Single integer n on one line.",
    "examples": [
      {
        "input": "1",
        "output": "1"
      },
      {
        "input": "4",
        "output": "1211"
      }
    ],
    "constraints": [
      "1 <= n <= 30"
    ],
    "tags": [
      "String",
      "Recursion"
    ],
    "hints": [
      "Generate sequentially from 1 to n.",
      "To encode, scan contiguous identical digits, append their count and digit."
    ],
    "testCases": [
      {
        "input": "1",
        "expectedOutput": "1"
      },
      {
        "input": "4",
        "expectedOutput": "1211"
      },
      {
        "input": "5",
        "expectedOutput": "111221"
      }
    ]
  },
  {
    "id": 78,
    "title": "Ransom Note",
    "difficulty": "Easy",
    "topic": "Strings",
    "acceptance": 60.5,
    "description": "Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise. Each letter in magazine can only be used once in ransomNote. Input format: ransomNote on first line, magazine on second line.",
    "examples": [
      {
        "input": "a\nb",
        "output": "false"
      },
      {
        "input": "aa\naab",
        "output": "true"
      }
    ],
    "constraints": [
      "1 <= ransomNote.length, magazine.length <= 10^5",
      "ransomNote and magazine consist of lowercase English letters."
    ],
    "tags": [
      "Hash Table",
      "String",
      "Counting"
    ],
    "hints": [
      "Count character frequencies in magazine using an array of size 26.",
      "Decrement frequencies for each character in ransomNote. If any count drops below zero, return false."
    ],
    "testCases": [
      {
        "input": "a\nb",
        "expectedOutput": "false"
      },
      {
        "input": "aa\naab",
        "expectedOutput": "true"
      },
      {
        "input": "aa\nab",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": 79,
    "title": "Reverse Linked List II",
    "difficulty": "Medium",
    "topic": "Linked List",
    "acceptance": 47.8,
    "description": "Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right (1-indexed). Input format: Size n, left, right on first line, followed by n space-separated node values on second line. Output: The modified list values space-separated.",
    "examples": [
      {
        "input": "5 2 4\n1 2 3 4 5",
        "output": "1 4 3 2 5"
      }
    ],
    "constraints": [
      "1 <= n <= 500",
      "1 <= left <= right <= n"
    ],
    "tags": [
      "Linked List"
    ],
    "hints": [
      "Use a dummy node before head to easily handle left = 1.",
      "Reach the node right before position left, then iteratively move next nodes to the front of the reversed segment."
    ],
    "testCases": [
      {
        "input": "5 2 4\n1 2 3 4 5",
        "expectedOutput": "1 4 3 2 5"
      },
      {
        "input": "1 1 1\n5",
        "expectedOutput": "5"
      },
      {
        "input": "2 1 2\n3 5",
        "expectedOutput": "5 3"
      }
    ]
  },
  {
    "id": 80,
    "title": "Rotate List",
    "difficulty": "Medium",
    "topic": "Linked List",
    "acceptance": 37.9,
    "description": "Given the head of a linked list, rotate the list to the right by k places. Input format: Size n and k on first line, followed by n space-separated integers on second line. Output: Space-separated values of the rotated list.",
    "examples": [
      {
        "input": "5 2\n1 2 3 4 5",
        "output": "4 5 1 2 3"
      }
    ],
    "constraints": [
      "0 <= n <= 500",
      "0 <= k <= 2 * 10^9"
    ],
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "hints": [
      "Connect the tail to head to form a circular list.",
      "The new tail is at index (n - (k % n) - 1). Break the circle after it."
    ],
    "testCases": [
      {
        "input": "5 2\n1 2 3 4 5",
        "expectedOutput": "4 5 1 2 3"
      },
      {
        "input": "3 4\n0 1 2",
        "expectedOutput": "2 0 1"
      },
      {
        "input": "1 99\n1",
        "expectedOutput": "1"
      }
    ]
  },
  {
    "id": 81,
    "title": "Next Greater Element I",
    "difficulty": "Easy",
    "topic": "Stack",
    "acceptance": 71.9,
    "description": "The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. Given two arrays nums1 and nums2 where nums1 is a subset of nums2, find the next greater element for each value in nums1. Return -1 if no greater element exists. Input format: n1 and n2 on first line. Line 2 has nums1, line 3 has nums2. Output: space-separated answers.",
    "examples": [
      {
        "input": "3 4\n4 1 2\n1 3 4 2",
        "output": "-1 3 -1"
      }
    ],
    "constraints": [
      "1 <= nums1.length <= nums2.length <= 1000",
      "0 <= nums1[i], nums2[i] <= 10^4"
    ],
    "tags": [
      "Array",
      "Hash Table",
      "Stack",
      "Monotonic Stack"
    ],
    "hints": [
      "Use a monotonic decreasing stack to find the next greater element for every item in nums2.",
      "Pop smaller elements from stack, mapping popped element -> current element in a hash map."
    ],
    "testCases": [
      {
        "input": "3 4\n4 1 2\n1 3 4 2",
        "expectedOutput": "-1 3 -1"
      },
      {
        "input": "2 4\n2 4\n1 2 3 4",
        "expectedOutput": "3 -1"
      },
      {
        "input": "1 1\n5\n5",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": 82,
    "title": "Next Greater Element II",
    "difficulty": "Medium",
    "topic": "Stack",
    "acceptance": 63.4,
    "description": "Given a circular integer array nums, return the next greater number for every element. Search circularly through the array. If no greater element exists, output -1 for that number. Input format: n on first line, followed by n space-separated integers on second line.",
    "examples": [
      {
        "input": "3\n1 2 1",
        "output": "2 -1 2"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "tags": [
      "Array",
      "Stack",
      "Monotonic Stack"
    ],
    "hints": [
      "Simulate the circular array by looping up to 2 * n - 1.",
      "Use index modulo n (i % n) with a monotonic decreasing stack."
    ],
    "testCases": [
      {
        "input": "3\n1 2 1",
        "expectedOutput": "2 -1 2"
      },
      {
        "input": "5\n1 2 3 4 3",
        "expectedOutput": "2 3 4 -1 4"
      },
      {
        "input": "1\n5",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": 83,
    "title": "Largest Rectangle in Histogram",
    "difficulty": "Hard",
    "topic": "Stack",
    "acceptance": 43.8,
    "description": "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram. Input format: n on first line, followed by n integers on second line.",
    "examples": [
      {
        "input": "6\n2 1 5 6 2 3",
        "output": "10"
      }
    ],
    "constraints": [
      "1 <= heights.length <= 10^5",
      "0 <= heights[i] <= 10^4"
    ],
    "tags": [
      "Array",
      "Stack",
      "Monotonic Stack"
    ],
    "hints": [
      "For each bar, find the previous smaller bar and the next smaller bar.",
      "Use a monotonic increasing stack storing indices to find both boundaries in a single pass."
    ],
    "testCases": [
      {
        "input": "6\n2 1 5 6 2 3",
        "expectedOutput": "10"
      },
      {
        "input": "2\n2 4",
        "expectedOutput": "4"
      },
      {
        "input": "1\n5",
        "expectedOutput": "5"
      }
    ]
  },
  {
    "id": 84,
    "title": "Sliding Window Maximum",
    "difficulty": "Hard",
    "topic": "Stack",
    "acceptance": 46.5,
    "description": "You are given an array of integers nums, there is a sliding window of size k moving from left to right. Return the max sliding window. Input format: n and k on first line, followed by n integers on second line. Output: space-separated maximums.",
    "examples": [
      {
        "input": "8 3\n1 3 -1 -3 5 3 6 7",
        "output": "3 3 5 5 6 7"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length"
    ],
    "tags": [
      "Array",
      "Queue",
      "Sliding Window",
      "Monotonic Queue"
    ],
    "hints": [
      "Use a double-ended queue (deque) to store indices of useful elements.",
      "Maintain the deque in monotonically decreasing order of values. Pop front when out of window bounds."
    ],
    "testCases": [
      {
        "input": "8 3\n1 3 -1 -3 5 3 6 7",
        "expectedOutput": "3 3 5 5 6 7"
      },
      {
        "input": "1 1\n1",
        "expectedOutput": "1"
      },
      {
        "input": "4 2\n9 11 8 5",
        "expectedOutput": "11 11 8"
      }
    ]
  },
  {
    "id": 85,
    "title": "Implement Queue using Stacks",
    "difficulty": "Easy",
    "topic": "Stack",
    "acceptance": 64.9,
    "description": "Simulate a FIFO queue using only two LIFO stacks. Support push, pop, and peek operations. Input format: Number of operations q, followed by q operations (1 x for push x, 2 for pop, 3 for peek). Output each popped or peeked value on a new line.",
    "examples": [
      {
        "input": "5\n1 1\n1 2\n3\n2\n3",
        "output": "1\n1\n2"
      }
    ],
    "constraints": [
      "1 <= q <= 100",
      "All operations are valid"
    ],
    "tags": [
      "Stack",
      "Design",
      "Queue"
    ],
    "hints": [
      "Use two stacks: inStack and outStack.",
      "Push to inStack. To pop/peek, if outStack is empty, transfer all elements from inStack to outStack to reverse the order."
    ],
    "testCases": [
      {
        "input": "5\n1 1\n1 2\n3\n2\n3",
        "expectedOutput": "1\n1\n2"
      },
      {
        "input": "3\n1 42\n3\n2",
        "expectedOutput": "42\n42"
      }
    ]
  },
  {
    "id": 86,
    "title": "Subsets",
    "difficulty": "Medium",
    "topic": "Recursion",
    "acceptance": 76.5,
    "description": "Given an integer array nums of unique elements, return the count of all possible subsets (the power set). Input format: n on first line, followed by n space-separated integers on second line.",
    "examples": [
      {
        "input": "3\n1 2 3",
        "output": "8"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10",
      "All numbers are unique."
    ],
    "tags": [
      "Array",
      "Backtracking",
      "Bit Manipulation"
    ],
    "hints": [
      "For every element, there are two choices: include it or exclude it.",
      "The total number of subsets for a set of size n is 2^n."
    ],
    "testCases": [
      {
        "input": "3\n1 2 3",
        "expectedOutput": "8"
      },
      {
        "input": "1\n0",
        "expectedOutput": "2"
      },
      {
        "input": "4\n1 2 3 4",
        "expectedOutput": "16"
      }
    ]
  },
  {
    "id": 87,
    "title": "Subsets II",
    "difficulty": "Medium",
    "topic": "Recursion",
    "acceptance": 56.8,
    "description": "Given an integer array nums that may contain duplicates, return the count of unique subsets. Input format: n on first line, followed by n integers on second line.",
    "examples": [
      {
        "input": "3\n1 2 2",
        "output": "6"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10"
    ],
    "tags": [
      "Array",
      "Backtracking",
      "Bit Manipulation"
    ],
    "hints": [
      "Sort the array first so identical elements are consecutive.",
      "When recursing, skip identical elements at the same recursion depth: if (i > start && nums[i] == nums[i-1]) continue."
    ],
    "testCases": [
      {
        "input": "3\n1 2 2",
        "expectedOutput": "6"
      },
      {
        "input": "1\n0",
        "expectedOutput": "2"
      },
      {
        "input": "3\n4 4 4",
        "expectedOutput": "4"
      }
    ]
  },
  {
    "id": 88,
    "title": "Combination Sum",
    "difficulty": "Medium",
    "topic": "Recursion",
    "acceptance": 70.3,
    "description": "Given an array of distinct integers candidates and a target integer target, return the number of unique combinations where the chosen numbers sum to target. The same number may be chosen unlimited times. Input format: n and target on first line, followed by n integers on second line.",
    "examples": [
      {
        "input": "4 7\n2 3 6 7",
        "output": "2"
      }
    ],
    "constraints": [
      "1 <= candidates.length <= 30",
      "2 <= candidates[i] <= 40",
      "1 <= target <= 500"
    ],
    "tags": [
      "Array",
      "Backtracking"
    ],
    "hints": [
      "Sort candidates first.",
      "At each step, either pick candidates[idx] and stay at idx (reusable), or skip to idx + 1."
    ],
    "testCases": [
      {
        "input": "4 7\n2 3 6 7",
        "expectedOutput": "2"
      },
      {
        "input": "3 8\n2 3 5",
        "expectedOutput": "3"
      },
      {
        "input": "1 2\n2",
        "expectedOutput": "1"
      }
    ]
  },
  {
    "id": 89,
    "title": "Permutations",
    "difficulty": "Medium",
    "topic": "Recursion",
    "acceptance": 77.2,
    "description": "Given an array nums of distinct integers, return the count of all possible permutations. Input format: n on first line, followed by n integers.",
    "examples": [
      {
        "input": "3\n1 2 3",
        "output": "6"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 6",
      "-10 <= nums[i] <= 10"
    ],
    "tags": [
      "Array",
      "Backtracking"
    ],
    "hints": [
      "There are n! permutations for an array of length n distinct elements.",
      "Use recursive swapping: swap(nums[start], nums[i]), recurse on start + 1, then backtrack."
    ],
    "testCases": [
      {
        "input": "3\n1 2 3",
        "expectedOutput": "6"
      },
      {
        "input": "1\n1",
        "expectedOutput": "1"
      },
      {
        "input": "2\n0 1",
        "expectedOutput": "2"
      }
    ]
  },
  {
    "id": 90,
    "title": "N-Queens",
    "difficulty": "Hard",
    "topic": "Recursion",
    "acceptance": 66.8,
    "description": "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return the number of distinct solutions. Input format: Single integer n on one line.",
    "examples": [
      {
        "input": "4",
        "output": "2"
      },
      {
        "input": "1",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= n <= 9"
    ],
    "tags": [
      "Backtracking"
    ],
    "hints": [
      "Track column, normal diagonal (row + col), and anti-diagonal (row - col + n - 1) attacks using boolean arrays.",
      "Place queens row by row. If valid, recurse to row + 1."
    ],
    "testCases": [
      {
        "input": "4",
        "expectedOutput": "2"
      },
      {
        "input": "1",
        "expectedOutput": "1"
      },
      {
        "input": "5",
        "expectedOutput": "10"
      }
    ]
  },
  {
    "id": 91,
    "title": "Word Search",
    "difficulty": "Medium",
    "topic": "Recursion",
    "acceptance": 41.2,
    "description": "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically). Input format: m, n, word on first line. Next m lines each contain n characters separated by space.",
    "examples": [
      {
        "input": "3 4 ABCCED\nA B C E\nS F C S\nA D E E",
        "output": "true"
      }
    ],
    "constraints": [
      "m == board.length",
      "n == board[i].length",
      "1 <= m, n <= 6",
      "1 <= word.length <= 15"
    ],
    "tags": [
      "Array",
      "String",
      "Backtracking",
      "Matrix"
    ],
    "hints": [
      "Start a DFS from every cell matching word[0].",
      "Mark visited cells temporarily with '#' and restore upon backtracking."
    ],
    "testCases": [
      {
        "input": "3 4 ABCCED\nA B C E\nS F C S\nA D E E",
        "expectedOutput": "true"
      },
      {
        "input": "3 4 SEE\nA B C E\nS F C S\nA D E E",
        "expectedOutput": "true"
      },
      {
        "input": "3 4 ABCD\nA B C E\nS F C S\nA D E E",
        "expectedOutput": "false"
      }
    ]
  },
  {
    "id": 92,
    "title": "Diameter of Binary Tree",
    "difficulty": "Easy",
    "topic": "Binary Trees",
    "acceptance": 59.8,
    "description": "Given a binary tree represented as an array in level-order (-1 for null), return the length of the diameter (the number of edges on the longest path between any two nodes). Input format: n on first line, followed by n integers in level-order.",
    "examples": [
      {
        "input": "5\n1 2 3 4 5",
        "output": "3"
      }
    ],
    "constraints": [
      "1 <= nodes <= 10^4",
      "-100 <= Node.val <= 100"
    ],
    "tags": [
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [
      "The longest path passing through a node is left_height + right_height.",
      "Compute node height recursively and update the maximum diameter found so far."
    ],
    "testCases": [
      {
        "input": "5\n1 2 3 4 5",
        "expectedOutput": "3"
      },
      {
        "input": "2\n1 2",
        "expectedOutput": "1"
      },
      {
        "input": "1\n1",
        "expectedOutput": "0"
      }
    ]
  },
  {
    "id": 93,
    "title": "Balanced Binary Tree",
    "difficulty": "Easy",
    "topic": "Binary Trees",
    "acceptance": 51.2,
    "description": "Given a binary tree represented in level order (-1 for null), determine if it is height-balanced (the depth of the two subtrees of every node never differs by more than one). Output 'true' or 'false'. Input format: n on first line, followed by n integers in level-order.",
    "examples": [
      {
        "input": "5\n3 9 20 -1 -1 15 7",
        "output": "true"
      }
    ],
    "constraints": [
      "0 <= nodes <= 5000"
    ],
    "tags": [
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [
      "Return -1 immediately from the recursive height function if any subtree is unbalanced.",
      "Check abs(leftHeight - rightHeight) <= 1 at each node."
    ],
    "testCases": [
      {
        "input": "7\n3 9 20 -1 -1 15 7",
        "expectedOutput": "true"
      },
      {
        "input": "7\n1 2 2 3 3 -1 -1",
        "expectedOutput": "true"
      },
      {
        "input": "1\n1",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": 94,
    "title": "Lowest Common Ancestor of a Binary Tree",
    "difficulty": "Medium",
    "topic": "Binary Trees",
    "acceptance": 61.4,
    "description": "Given a binary tree in level-order (-1 for null) and two node values p and q, find the value of their lowest common ancestor (LCA). Input format: n, p, q on first line, followed by n integers in level order.",
    "examples": [
      {
        "input": "7 5 1\n3 5 1 6 2 0 8",
        "output": "3"
      }
    ],
    "constraints": [
      "2 <= nodes <= 10^4",
      "All Node.val are unique."
    ],
    "tags": [
      "Tree",
      "Depth-First Search",
      "Binary Tree"
    ],
    "hints": [
      "If the current node matches p or q, return current node.",
      "If both left and right recursive calls return non-null, the current node is the LCA."
    ],
    "testCases": [
      {
        "input": "7 5 1\n3 5 1 6 2 0 8",
        "expectedOutput": "3"
      },
      {
        "input": "7 5 4\n3 5 1 6 2 0 8",
        "expectedOutput": "5"
      }
    ]
  },
  {
    "id": 95,
    "title": "Binary Tree Zigzag Level Order Traversal",
    "difficulty": "Medium",
    "topic": "Binary Trees",
    "acceptance": 58.2,
    "description": "Given the root of a binary tree in level order (-1 for null), return the zigzag level order traversal (i.e., from left to right, then right to left for the next level and alternate between). Output each level space-separated on a new line.",
    "examples": [
      {
        "input": "5\n3 9 20 15 7",
        "output": "3\n20 9\n15 7"
      }
    ],
    "constraints": [
      "0 <= nodes <= 2000"
    ],
    "tags": [
      "Tree",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "hints": [
      "Standard BFS with a queue. Keep a boolean flag leftToRight.",
      "Reverse the current level array whenever leftToRight is false."
    ],
    "testCases": [
      {
        "input": "5\n3 9 20 15 7",
        "expectedOutput": "3\n20 9\n15 7"
      },
      {
        "input": "1\n1",
        "expectedOutput": "1"
      }
    ]
  },
  {
    "id": 96,
    "title": "Course Schedule",
    "difficulty": "Medium",
    "topic": "Graphs",
    "acceptance": 46.9,
    "description": "There are a total of numCourses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates you must take bi before ai. Return true if you can finish all courses, or false otherwise (cycle detection in directed graph). Input format: numCourses and m on first line, followed by m lines of ai bi.",
    "examples": [
      {
        "input": "2 1\n1 0",
        "output": "true"
      },
      {
        "input": "2 2\n1 0\n0 1",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000"
    ],
    "tags": [
      "Depth-First Search",
      "Breadth-First Search",
      "Graph",
      "Topological Sort"
    ],
    "hints": [
      "A course schedule is possible if and only if the dependency graph is a Directed Acyclic Graph (DAG).",
      "Use Kahn's Algorithm (BFS with in-degrees) or DFS with 3 states (unvisited, visiting, visited)."
    ],
    "testCases": [
      {
        "input": "2 1\n1 0",
        "expectedOutput": "true"
      },
      {
        "input": "2 2\n1 0\n0 1",
        "expectedOutput": "false"
      },
      {
        "input": "1 0",
        "expectedOutput": "true"
      }
    ]
  },
  {
    "id": 97,
    "title": "Course Schedule II",
    "difficulty": "Medium",
    "topic": "Graphs",
    "acceptance": 49.5,
    "description": "Given numCourses and prerequisites, return the ordering of courses you should take to finish all courses. If impossible, output -1. Input format: numCourses and m on first line, then m lines of prerequisites ai bi. Output: Space-separated topological course order.",
    "examples": [
      {
        "input": "4 4\n1 0\n2 0\n3 1\n3 2",
        "output": "0 1 2 3"
      }
    ],
    "constraints": [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= numCourses * (numCourses - 1)"
    ],
    "tags": [
      "Depth-First Search",
      "Breadth-First Search",
      "Graph",
      "Topological Sort"
    ],
    "hints": [
      "Use Kahn's Algorithm with a queue of nodes having in-degree 0.",
      "If the topological sort contains fewer than numCourses elements, a cycle exists."
    ],
    "testCases": [
      {
        "input": "4 4\n1 0\n2 0\n3 1\n3 2",
        "expectedOutput": "0 1 2 3"
      },
      {
        "input": "2 1\n1 0",
        "expectedOutput": "0 1"
      },
      {
        "input": "2 2\n1 0\n0 1",
        "expectedOutput": "-1"
      }
    ]
  },
  {
    "id": 98,
    "title": "Flood Fill",
    "difficulty": "Easy",
    "topic": "Graphs",
    "acceptance": 63.2,
    "description": "An image is represented by an m x n integer grid image. Perform a flood fill starting from pixel (sr, sc) replacing connected pixels of the same original color with color. Input format: m, n, sr, sc, color on first line, followed by m lines each with n integers. Output: Updated matrix.",
    "examples": [
      {
        "input": "3 3 1 1 2\n1 1 1\n1 1 0\n1 0 1",
        "output": "2 2 2\n2 2 0\n2 0 1"
      }
    ],
    "constraints": [
      "m == image.length",
      "n == image[i].length",
      "1 <= m, n <= 50",
      "0 <= image[i][j], color < 65536"
    ],
    "tags": [
      "Array",
      "Depth-First Search",
      "Breadth-First Search",
      "Matrix"
    ],
    "hints": [
      "If image[sr][sc] is already equal to color, return immediately to avoid infinite recursion.",
      "Explore the 4 adjacent neighbors using standard DFS or BFS."
    ],
    "testCases": [
      {
        "input": "3 3 1 1 2\n1 1 1\n1 1 0\n1 0 1",
        "expectedOutput": "2 2 2\n2 2 0\n2 0 1"
      },
      {
        "input": "2 2 0 0 0\n0 0\n0 0",
        "expectedOutput": "0 0\n0 0"
      }
    ]
  },
  {
    "id": 99,
    "title": "0/1 Knapsack Problem",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "acceptance": 52.4,
    "description": "Given n items with weights wt[] and values val[], and a knapsack of maximum capacity W. Determine the maximum value that can be accommodated in the knapsack. Each item can either be picked or not picked (0/1). Input format: n and W on first line. Next line has n weights, next line has n values.",
    "examples": [
      {
        "input": "3 4\n1 2 3\n10 15 40",
        "output": "55"
      }
    ],
    "constraints": [
      "1 <= n <= 100",
      "1 <= W <= 1000",
      "1 <= wt[i] <= 1000",
      "1 <= val[i] <= 1000"
    ],
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "hints": [
      "Define dp[w] as max value with weight limit w.",
      "Iterate through items and update dp[w] backwards from W down to wt[i] to ensure each item is picked at most once."
    ],
    "testCases": [
      {
        "input": "3 4\n1 2 3\n10 15 40",
        "expectedOutput": "55"
      },
      {
        "input": "3 3\n4 5 1\n1 2 3",
        "expectedOutput": "3"
      },
      {
        "input": "1 10\n5\n10",
        "expectedOutput": "10"
      }
    ]
  },
  {
    "id": 100,
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "acceptance": 58.1,
    "description": "Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order. Input format: text1 on first line, text2 on second line.",
    "examples": [
      {
        "input": "abcde\nace",
        "output": "3"
      },
      {
        "input": "abc\nabc",
        "output": "3"
      },
      {
        "input": "abc\ndef",
        "output": "0"
      }
    ],
    "constraints": [
      "1 <= text1.length, text2.length <= 1000",
      "text1 and text2 consist of lowercase English characters only."
    ],
    "tags": [
      "String",
      "Dynamic Programming"
    ],
    "hints": [
      "If text1[i-1] == text2[j-1], dp[i][j] = 1 + dp[i-1][j-1].",
      "Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Space can be optimized to 1D array."
    ],
    "testCases": [
      {
        "input": "abcde\nace",
        "expectedOutput": "3"
      },
      {
        "input": "abc\nabc",
        "expectedOutput": "3"
      },
      {
        "input": "abc\ndef",
        "expectedOutput": "0"
      }
    ]
  }
];

export default problems;
