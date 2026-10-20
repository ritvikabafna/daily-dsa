export const chunk2Problems = [
  {
    id: 66,
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 47.5,
    description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. Must run in O(n) time. Input format: n on first line, followed by n space-separated integers.",
    examples: [
      { input: "6\n100 4 200 1 3 2", output: "4" }
    ],
    constraints: ["0 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    tags: ["Array", "Hash Table", "Union Find"],
    hints: [
      "Insert all numbers into an unordered set for O(1) lookups.",
      "Only start counting a sequence if num - 1 is NOT in the set (i.e. num is the start of a streak)."
    ],
    testCases: [
      { input: "6\n100 4 200 1 3 2", expectedOutput: "4" },
      { input: "10\n0 3 7 2 5 8 4 6 0 1", expectedOutput: "9" },
      { input: "0", expectedOutput: "0" }
    ]
  },
  {
    id: 67,
    title: "Largest Subarray with 0 Sum",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 45.1,
    description: "Given an array having both positive and negative integers, compute the length of the largest subarray with sum 0. Input format: n on first line, followed by n integers.",
    examples: [
      { input: "8\n15 -2 2 -8 1 7 10 23", output: "5" }
    ],
    constraints: ["1 <= n <= 10^5", "-1000 <= arr[i] <= 1000"],
    tags: ["Array", "Hash Table", "Prefix Sum"],
    hints: [
      "Use prefix sums. If the prefix sum has been seen before at index j, then the subarray between j + 1 and current index has sum 0.",
      "Store the earliest index of each prefix sum in a hash map."
    ],
    testCases: [
      { input: "8\n15 -2 2 -8 1 7 10 23", expectedOutput: "5" },
      { input: "5\n1 2 3 4 5", expectedOutput: "0" },
      { input: "3\n1 -1 0", expectedOutput: "3" }
    ]
  },
  {
    id: 68,
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 44.2,
    description: "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k. Input format: n and k on first line, followed by n space-separated integers on second line.",
    examples: [
      { input: "3 2\n1 1 1", output: "2" },
      { input: "3 3\n1 2 3", output: "2" }
    ],
    constraints: ["1 <= nums.length <= 2 * 10^4", "-1000 <= nums[i] <= 1000", "-10^7 <= k <= 10^7"],
    tags: ["Array", "Hash Table", "Prefix Sum"],
    hints: [
      "Track running prefix sums. We need prefixSum - k to have occurred previously.",
      "Count frequencies of prefix sums in a hash map with initial {0: 1}."
    ],
    testCases: [
      { input: "3 2\n1 1 1", expectedOutput: "2" },
      { input: "3 3\n1 2 3", expectedOutput: "2" },
      { input: "1 0\n0", expectedOutput: "1" }
    ]
  },
  {
    id: 69,
    title: "Find Peak Element",
    difficulty: "Medium",
    topic: "Binary Search",
    acceptance: 46.1,
    description: "A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks. You must write an algorithm that runs in O(log n) time. Input format: n on first line, followed by n integers on second line.",
    examples: [
      { input: "4\n1 2 3 1", output: "2" }
    ],
    constraints: ["1 <= nums.length <= 1000", "-2^31 <= nums[i] <= 2^31 - 1", "nums[i] != nums[i + 1] for all valid i"],
    tags: ["Array", "Binary Search"],
    hints: [
      "Compare nums[mid] with nums[mid + 1].",
      "If nums[mid] < nums[mid + 1], there is guaranteed to be at least one peak in the right half."
    ],
    testCases: [
      { input: "4\n1 2 3 1", expectedOutput: "2" },
      { input: "1\n5", expectedOutput: "0" },
      { input: "2\n1 2", expectedOutput: "1" }
    ]
  },
  {
    id: 70,
    title: "Single Element in a Sorted Array",
    difficulty: "Medium",
    topic: "Binary Search",
    acceptance: 59.3,
    description: "You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Return the single element that appears only once in O(log n) time and O(1) space. Input format: n on first line, followed by n integers.",
    examples: [
      { input: "9\n1 1 2 3 3 4 4 8 8", output: "2" }
    ],
    constraints: ["1 <= nums.length <= 10^5", "0 <= nums[i] <= 10^5"],
    tags: ["Array", "Binary Search"],
    hints: [
      "Before the single element, pairs start at even indices (even, odd). After the single element, pairs start at odd indices (odd, even).",
      "Check if mid matches its partner based on whether mid is even or odd."
    ],
    testCases: [
      { input: "9\n1 1 2 3 3 4 4 8 8", expectedOutput: "2" },
      { input: "7\n3 3 7 7 10 11 11", expectedOutput: "10" },
      { input: "1\n1", expectedOutput: "1" }
    ]
  },
  {
    id: 71,
    title: "Search in Rotated Sorted Array II",
    difficulty: "Medium",
    topic: "Binary Search",
    acceptance: 37.4,
    description: "There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values). Given the array nums after rotation and an integer target, return true if target is in nums, or false if it is not. Input format: n and target on first line, followed by n space-separated integers.",
    examples: [
      { input: "7 0\n2 5 6 0 0 1 2", output: "true" },
      { input: "7 3\n2 5 6 0 0 1 2", output: "false" }
    ],
    constraints: ["1 <= nums.length <= 5000", "-10^4 <= nums[i], target <= 10^4"],
    tags: ["Array", "Binary Search"],
    hints: [
      "When nums[low] == nums[mid] == nums[high], we cannot determine which half is sorted.",
      "In this edge case, simply increment low and decrement high."
    ],
    testCases: [
      { input: "7 0\n2 5 6 0 0 1 2", expectedOutput: "true" },
      { input: "7 3\n2 5 6 0 0 1 2", expectedOutput: "false" },
      { input: "1 1\n1", expectedOutput: "true" }
    ]
  },
  {
    id: 72,
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    topic: "Binary Search",
    acceptance: 49.8,
    description: "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards will come back in h hours. Return the minimum integer speed k such that she can eat all bananas within h hours. Input format: n and h on first line, followed by n integers on second line.",
    examples: [
      { input: "4 8\n3 6 7 11", output: "4" }
    ],
    constraints: ["1 <= piles.length <= 10^4", "piles.length <= h <= 10^9", "1 <= piles[i] <= 10^9"],
    tags: ["Array", "Binary Search"],
    hints: [
      "The eating speed k lies in the range [1, max(piles)].",
      "For a given speed k, total hours needed is sum(ceil(pile / k)). Binary search for the smallest valid k."
    ],
    testCases: [
      { input: "4 8\n3 6 7 11", expectedOutput: "4" },
      { input: "5 5\n30 11 23 4 20", expectedOutput: "30" },
      { input: "5 6\n30 11 23 4 20", expectedOutput: "23" }
    ]
  },
  {
    id: 73,
    title: "Aggressive Cows",
    difficulty: "Hard",
    topic: "Binary Search",
    acceptance: 58.7,
    description: "You are given an array of positions of stalls and an integer k denoting the number of aggressive cows. Assign cows to stalls such that the minimum distance between any two of them is as large as possible. Return the largest minimum distance. Input format: n (stalls) and k (cows) on first line, followed by n stall positions.",
    examples: [
      { input: "5 3\n1 2 8 4 9", output: "3" }
    ],
    constraints: ["2 <= n <= 10^5", "2 <= k <= n", "0 <= stalls[i] <= 10^9"],
    tags: ["Array", "Binary Search"],
    hints: [
      "Sort stall positions first.",
      "Binary search on the answer: can we place k cows such that all adjacent pairs are at least dist apart?"
    ],
    testCases: [
      { input: "5 3\n1 2 8 4 9", expectedOutput: "3" },
      { input: "4 2\n1 2 4 8", expectedOutput: "7" },
      { input: "3 2\n1 5 10", expectedOutput: "9" }
    ]
  },
  {
    id: 74,
    title: "Book Allocation Problem",
    difficulty: "Hard",
    topic: "Binary Search",
    acceptance: 43.6,
    description: "Given an array of books where each book has pages arr[i], and m students. Allocate books such that the maximum number of pages allocated to any student is minimized. Each student gets a contiguous segment of books. If allocation is impossible (m > n), return -1. Input format: n and m on first line, followed by n integers on second line.",
    examples: [
      { input: "4 2\n12 34 67 90", output: "113" }
    ],
    constraints: ["1 <= n <= 10^5", "1 <= m <= 10^5", "1 <= arr[i] <= 10^9"],
    tags: ["Array", "Binary Search"],
    hints: [
      "The minimum possible max pages is max(arr), and maximum is sum(arr).",
      "Binary search for the optimal barrier and verify if books can be distributed to <= m students."
    ],
    testCases: [
      { input: "4 2\n12 34 67 90", expectedOutput: "113" },
      { input: "4 4\n5 17 100 11", expectedOutput: "100" },
      { input: "2 3\n10 20", expectedOutput: "-1" }
    ]
  },
  {
    id: 75,
    title: "Roman to Integer",
    difficulty: "Easy",
    topic: "Strings",
    acceptance: 61.2,
    description: "Given a roman numeral s, convert it to an integer. Input format: A single string on one line. Output: The integer value.",
    examples: [
      { input: "III", output: "3" },
      { input: "LVIII", output: "58" },
      { input: "MCMXCIV", output: "1994" }
    ],
    constraints: ["1 <= s.length <= 15", "s contains only characters ('I', 'V', 'X', 'L', 'C', 'D', 'M')"],
    tags: ["Hash Table", "Math", "String"],
    hints: [
      "Map each Roman character to its decimal value.",
      "If the current symbol value is less than the next symbol value, subtract it; otherwise add it."
    ],
    testCases: [
      { input: "III", expectedOutput: "3" },
      { input: "LVIII", expectedOutput: "58" },
      { input: "MCMXCIV", expectedOutput: "1994" }
    ]
  },
  {
    id: 76,
    title: "Integer to Roman",
    difficulty: "Medium",
    topic: "Strings",
    acceptance: 63.8,
    description: "Given an integer num, convert it to a Roman numeral. Input format: Single integer num on one line.",
    examples: [
      { input: "3", output: "III" },
      { input: "58", output: "LVIII" },
      { input: "1994", output: "MCMXCIV" }
    ],
    constraints: ["1 <= num <= 3999"],
    tags: ["Hash Table", "Math", "String"],
    hints: [
      "List out the 13 base Roman numerals including subtractive pairs: 1000: M, 900: CM, 500: D, 400: CD, 100: C, 90: XC, 50: L, 40: XL, 10: X, 9: IX, 5: V, 4: IV, 1: I.",
      "Greedily subtract the largest possible values."
    ],
    testCases: [
      { input: "3", expectedOutput: "III" },
      { input: "58", expectedOutput: "LVIII" },
      { input: "1994", expectedOutput: "MCMXCIV" }
    ]
  },
  {
    id: 77,
    title: "Count and Say",
    difficulty: "Medium",
    topic: "Strings",
    acceptance: 54.7,
    description: "The count-and-say sequence is a sequence of digit strings defined by the recursive formula: countAndSay(1) = '1', and countAndSay(n) is the run-length encoding of countAndSay(n - 1). Given positive integer n, return the nth term. Input format: Single integer n on one line.",
    examples: [
      { input: "1", output: "1" },
      { input: "4", output: "1211" }
    ],
    constraints: ["1 <= n <= 30"],
    tags: ["String", "Recursion"],
    hints: [
      "Generate sequentially from 1 to n.",
      "To encode, scan contiguous identical digits, append their count and digit."
    ],
    testCases: [
      { input: "1", expectedOutput: "1" },
      { input: "4", expectedOutput: "1211" },
      { input: "5", expectedOutput: "111221" }
    ]
  },
  {
    id: 78,
    title: "Ransom Note",
    difficulty: "Easy",
    topic: "Strings",
    acceptance: 60.5,
    description: "Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise. Each letter in magazine can only be used once in ransomNote. Input format: ransomNote on first line, magazine on second line.",
    examples: [
      { input: "a\nb", output: "false" },
      { input: "aa\naab", output: "true" }
    ],
    constraints: ["1 <= ransomNote.length, magazine.length <= 10^5", "ransomNote and magazine consist of lowercase English letters."],
    tags: ["Hash Table", "String", "Counting"],
    hints: [
      "Count character frequencies in magazine using an array of size 26.",
      "Decrement frequencies for each character in ransomNote. If any count drops below zero, return false."
    ],
    testCases: [
      { input: "a\nb", expectedOutput: "false" },
      { input: "aa\naab", expectedOutput: "true" },
      { input: "aa\nab", expectedOutput: "false" }
    ]
  },
  {
    id: 79,
    title: "Reverse Linked List II",
    difficulty: "Medium",
    topic: "Linked List",
    acceptance: 47.8,
    description: "Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right (1-indexed). Input format: Size n, left, right on first line, followed by n space-separated node values on second line. Output: The modified list values space-separated.",
    examples: [
      { input: "5 2 4\n1 2 3 4 5", output: "1 4 3 2 5" }
    ],
    constraints: ["1 <= n <= 500", "1 <= left <= right <= n"],
    tags: ["Linked List"],
    hints: [
      "Use a dummy node before head to easily handle left = 1.",
      "Reach the node right before position left, then iteratively move next nodes to the front of the reversed segment."
    ],
    testCases: [
      { input: "5 2 4\n1 2 3 4 5", expectedOutput: "1 4 3 2 5" },
      { input: "1 1 1\n5", expectedOutput: "5" },
      { input: "2 1 2\n3 5", expectedOutput: "5 3" }
    ]
  },
  {
    id: 80,
    title: "Rotate List",
    difficulty: "Medium",
    topic: "Linked List",
    acceptance: 37.9,
    description: "Given the head of a linked list, rotate the list to the right by k places. Input format: Size n and k on first line, followed by n space-separated integers on second line. Output: Space-separated values of the rotated list.",
    examples: [
      { input: "5 2\n1 2 3 4 5", output: "4 5 1 2 3" }
    ],
    constraints: ["0 <= n <= 500", "0 <= k <= 2 * 10^9"],
    tags: ["Linked List", "Two Pointers"],
    hints: [
      "Connect the tail to head to form a circular list.",
      "The new tail is at index (n - (k % n) - 1). Break the circle after it."
    ],
    testCases: [
      { input: "5 2\n1 2 3 4 5", expectedOutput: "4 5 1 2 3" },
      { input: "3 4\n0 1 2", expectedOutput: "2 0 1" },
      { input: "1 99\n1", expectedOutput: "1" }
    ]
  }
];

export const chunk2Editorials = {
  "66": {
    title: "Longest Consecutive Sequence",
    edgeCases: ["Empty array -> 0", "Array with all duplicate values", "Single element array"],
    dryRun: {
      description: "Hash set lookup only for numbers starting a streak",
      headers: ["Num", "Is Streak Start (num-1 not in set)?", "Length"],
      rows: [["1", "Yes (0 not in set)", "1->2->3->4 = 4"], ["100", "Yes (99 not in set)", "100 = 1"]]
    },
    approaches: [{
      id: "optimal",
      name: "Hash Set Streak Counting",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      description: "Insert all elements into set. Only expand when num-1 does not exist, guaranteeing each element visited at most twice.",
      keyTakeaway: "Filtering for streak starting points ensures O(N) linear time overall.",
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

int main() {
    int n;
    if (!(cin >> n) || n == 0) {
        cout << 0 << "\\n";
        return 0;
    }
    unordered_set<int> s;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        s.insert(x);
    }
    int longest = 0;
    for (int num : s) {
        if (!s.count(num - 1)) {
            int current = num;
            int streak = 1;
            while (s.count(current + 1)) {
                current++;
                streak++;
            }
            longest = max(longest, streak);
        }
    }
    cout << longest << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) == 0:
        print(0)
        return
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    num_set = set(nums)
    longest = 0
    for num in num_set:
        if num - 1 not in num_set:
            current = num
            streak = 1
            while current + 1 in num_set:
                current += 1
                streak += 1
            longest = max(longest, streak)
    print(longest)

if __name__ == '__main__':
    solve()`
    }]
  },
  "67": {
    title: "Largest Subarray with 0 Sum",
    edgeCases: ["No subarray sums to 0 -> 0", "Entire array sums to 0"],
    dryRun: {
      description: "Prefix sum map tracking earliest occurrence index",
      headers: ["Index", "Element", "PrefixSum", "Action"],
      rows: [["0", "15", "15", "seen[15]=0"], ["1", "-2", "13", "seen[13]=1"]]
    },
    approaches: [{
      id: "optimal",
      name: "Prefix Sum with Earliest Hash Map",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      description: "Equal prefix sums at index i and j imply sum of elements between them is 0.",
      keyTakeaway: "Storing only earliest occurrences maximizes subarray length.",
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    unordered_map<long long, int> seen;
    long long sum = 0;
    int maxLen = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
        if (sum == 0) maxLen = i + 1;
        if (seen.find(sum) != seen.end()) {
            maxLen = max(maxLen, i - seen[sum]);
        } else {
            seen[sum] = i;
        }
    }
    cout << maxLen << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    arr = [int(x) for x in raw[1:n+1]]

    seen = {}
    s = 0
    max_len = 0
    for i in range(n):
        s += arr[i]
        if s == 0:
            max_len = i + 1
        if s in seen:
            max_len = max(max_len, i - seen[s])
        else:
            seen[s] = i
    print(max_len)

if __name__ == '__main__':
    solve()`
    }]
  },
  "68": {
    title: "Subarray Sum Equals K",
    edgeCases: ["k = 0 with zeroes in array", "Negative numbers in array"],
    dryRun: {
      description: "Track frequency of prefix sums: add freq[sum - k] to total",
      headers: ["Step", "PrefixSum", "Complement (sum - k)", "Count"],
      rows: [["1", "1", "-1", "0"], ["2", "2", "0", "1"]]
    },
    approaches: [{
      id: "optimal",
      name: "Prefix Sum Frequency Hash Map",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      description: "Any time prefixSum - k exists in history, a valid subarray ending at current index exists.",
      keyTakeaway: "Hash map prefix counts solve subarray sum problems in linear time.",
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    unordered_map<int, int> countMap;
    countMap[0] = 1;
    int sum = 0, total = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        sum += x;
        if (countMap.find(sum - k) != countMap.end()) {
            total += countMap[sum - k];
        }
        countMap[sum]++;
    }
    cout << total << "\\n";
    return 0;
}`,
      python: `import sys
from collections import defaultdict

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, k = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]

    counts = defaultdict(int)
    counts[0] = 1
    s, total = 0, 0
    for x in nums:
        s += x
        total += counts[s - k]
        counts[s] += 1
    print(total)

if __name__ == '__main__':
    solve()`
    }]
  },
  "69": {
    title: "Find Peak Element",
    edgeCases: ["Array of length 1 -> index 0", "Strictly increasing or decreasing array"],
    dryRun: {
      description: "Binary search on slope: if nums[mid] < nums[mid+1], go right",
      headers: ["mid", "nums[mid]", "nums[mid+1]", "Direction"],
      rows: [["1", "2", "3", "Go right (low = mid + 1)"]]
    },
    approaches: [{
      id: "optimal",
      name: "Binary Search on Slope",
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      description: "Ascending slope guarantees a peak exists towards the higher side.",
      keyTakeaway: "Binary search works on unsorted arrays if invariant slopes direct search.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int low = 0, high = n - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] < nums[mid + 1]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    cout << low << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]

    low, high = 0, n - 1
    while low < high:
        mid = (low + high) // 2
        if nums[mid] < nums[mid + 1]:
            low = mid + 1
        else:
            high = mid
    print(low)

if __name__ == '__main__':
    solve()`
    }]
  },
  "70": {
    title: "Single Element in a Sorted Array",
    edgeCases: ["Single element array", "Unique element at start or end"],
    dryRun: {
      description: "XOR index parity trick: partner index is mid ^ 1",
      headers: ["mid", "mid ^ 1", "nums[mid] == nums[mid ^ 1]?", "Action"],
      rows: [["4", "5", "Yes", "Unique is in right half"]]
    },
    approaches: [{
      id: "optimal",
      name: "Binary Search via Index Parity",
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      description: "Before unique element, pairs are (even, odd). Use mid ^ 1 to check partner.",
      keyTakeaway: "XOR index trick (mid ^ 1) cleanly pairs 0-1, 2-3, 4-5.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int low = 0, high = n - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == nums[mid ^ 1]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    cout << nums[low] << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]

    low, high = 0, n - 1
    while low < high:
        mid = (low + high) // 2
        if nums[mid] == nums[mid ^ 1]:
            low = mid + 1
        else:
            high = mid
    print(nums[low])

if __name__ == '__main__':
    solve()`
    }]
  },
  "71": {
    title: "Search in Rotated Sorted Array II",
    edgeCases: ["All elements duplicates except target", "Array of size 1"],
    dryRun: {
      description: "When nums[low] == nums[mid] == nums[high], shrink bounds",
      headers: ["Step", "Action"],
      rows: [["nums[low]==nums[mid]==nums[high]", "low++, high--"]]
    },
    approaches: [{
      id: "optimal",
      name: "Binary Search with Duplicate Shrink",
      timeComplexity: "O(log N) average, O(N) worst case",
      spaceComplexity: "O(1)",
      description: "Shrink search window by trimming duplicate boundary values.",
      keyTakeaway: "Duplicates degrade worst-case binary search to linear time.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int low = 0, high = n - 1;
    bool found = false;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) {
            found = true;
            break;
        }
        if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
            low++; high--;
            continue;
        }
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    cout << (found ? "true" : "false") << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, target = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]

    low, high = 0, n - 1
    found = False
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            found = True
            break
        if nums[low] == nums[mid] == nums[high]:
            low += 1
            high -= 1
            continue
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    print("true" if found else "false")

if __name__ == '__main__':
    solve()`
    }]
  },
  "72": {
    title: "Koko Eating Bananas",
    edgeCases: ["h == piles.length (must eat max pile per hour)", "Large pile values up to 10^9"],
    dryRun: {
      description: "Binary search speed k in [1, max(piles)]",
      headers: ["k", "Total Hours Needed", "Within h?"],
      rows: [["4", "1 + 2 + 2 + 3 = 8", "Yes -> try lower k"]]
    },
    approaches: [{
      id: "optimal",
      name: "Binary Search on Answer Space",
      timeComplexity: "O(N log(max(P)))",
      spaceComplexity: "O(1)",
      description: "Monotonic function: higher speed strictly decreases hours needed. Binary search speed.",
      keyTakeaway: "Binary search applies directly to monotonic decision functions.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool canEat(const vector<int>& piles, int h, int k) {
    long long hours = 0;
    for (int p : piles) {
        hours += (p + k - 1) / k;
    }
    return hours <= h;
}

int main() {
    int n, h;
    if (!(cin >> n >> h)) return 0;
    vector<int> piles(n);
    int maxPile = 0;
    for (int i = 0; i < n; i++) {
        cin >> piles[i];
        maxPile = max(maxPile, piles[i]);
    }

    int low = 1, high = maxPile, ans = maxPile;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canEat(piles, h, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
      python: `import sys
import math

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, h = int(raw[0]), int(raw[1])
    piles = [int(x) for x in raw[2:n+2]]

    def can_eat(k):
        return sum(math.ceil(p / k) for p in piles) <= h

    low, high = 1, max(piles)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        if can_eat(mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    print(ans)

if __name__ == '__main__':
    solve()`
    }]
  },
  "73": {
    title: "Aggressive Cows",
    edgeCases: ["k = 2 (place at first and last stall)", "All stalls close together"],
    dryRun: {
      description: "Binary search distance between stalls on sorted positions",
      headers: ["dist", "Cows Placed", "Valid?"],
      rows: [["3", "3 cows at [1, 4, 8]", "Yes -> try larger dist"]]
    },
    approaches: [{
      id: "optimal",
      name: "Binary Search on Minimum Distance",
      timeComplexity: "O(N log(max_pos))",
      spaceComplexity: "O(1)",
      description: "Sort stalls and binary search minimum gap dist, greedily placing cows.",
      keyTakeaway: "Maximizing the minimum is a classic binary search on answer pattern.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool canPlace(const vector<int>& stalls, int k, int dist) {
    int count = 1, last = stalls[0];
    for (size_t i = 1; i < stalls.size(); i++) {
        if (stalls[i] - last >= dist) {
            count++;
            last = stalls[i];
            if (count >= k) return true;
        }
    }
    return false;
}

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> stalls(n);
    for (int i = 0; i < n; i++) cin >> stalls[i];
    sort(stalls.begin(), stalls.end());

    int low = 1, high = stalls.back() - stalls.front(), ans = 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canPlace(stalls, k, mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, k = int(raw[0]), int(raw[1])
    stalls = [int(x) for x in raw[2:n+2]]
    stalls.sort()

    def can_place(dist):
        count, last = 1, stalls[0]
        for x in stalls[1:]:
            if x - last >= dist:
                count += 1
                last = x
                if count >= k:
                    return True
        return False

    low, high = 1, stalls[-1] - stalls[0]
    ans = 1
    while low <= high:
        mid = (low + high) // 2
        if can_place(mid):
            ans = mid
            low = mid + 1
        else:
            high = mid - 1
    print(ans)

if __name__ == '__main__':
    solve()`
    }]
  },
  "74": {
    title: "Book Allocation Problem",
    edgeCases: ["m > n (impossible -> -1)", "m = 1 (single student gets all pages)"],
    dryRun: {
      description: "Binary search max pages limit in [max(arr), sum(arr)]",
      headers: ["Limit", "Students Required", "Valid?"],
      rows: [["113", "2 students", "Yes"]]
    },
    approaches: [{
      id: "optimal",
      name: "Binary Search on Max Pages Allocation",
      timeComplexity: "O(N log(sum - max))",
      spaceComplexity: "O(1)",
      description: "Check if pages can be greedily partitioned into <= m segments without exceeding capacity.",
      keyTakeaway: "Minimizing maximum workload via monotonic capacity verification.",
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

bool isPossible(const vector<int>& arr, int n, int m, long long maxPages) {
    int students = 1;
    long long currPages = 0;
    for (int p : arr) {
        if (p > maxPages) return false;
        if (currPages + p > maxPages) {
            students++;
            currPages = p;
            if (students > m) return false;
        } else {
            currPages += p;
        }
    }
    return true;
}

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<int> arr(n);
    long long sum = 0;
    int maxVal = 0;
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
        sum += arr[i];
        maxVal = max(maxVal, arr[i]);
    }
    if (m > n) {
        cout << -1 << "\\n";
        return 0;
    }

    long long low = maxVal, high = sum, ans = sum;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (isPossible(arr, n, m, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, m = int(raw[0]), int(raw[1])
    arr = [int(x) for x in raw[2:n+2]]
    if m > n:
        print(-1)
        return

    def is_possible(limit):
        students = 1
        curr = 0
        for p in arr:
            if p > limit:
                return False
            if curr + p > limit:
                students += 1
                curr = p
                if students > m:
                    return False
            else:
                curr += p
        return True

    low, high = max(arr), sum(arr)
    ans = high
    while low <= high:
        mid = (low + high) // 2
        if is_possible(mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    print(ans)

if __name__ == '__main__':
    solve()`
    }]
  },
  "75": {
    title: "Roman to Integer",
    edgeCases: ["Subtractive combinations (IV, IX, XL, XC, CD, CM)", "Single character Roman"],
    dryRun: {
      description: "If curr < next, subtract curr; else add curr",
      headers: ["Char", "Val", "Next Val", "Action"],
      rows: [["I", "1", "V(5)", "Subtract 1"], ["V", "5", "None", "Add 5 -> Total 4"]]
    },
    approaches: [{
      id: "optimal",
      name: "Subtractive Lookahead Evaluation",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      description: "Compare adjacent numeral values to handle subtractive pairs seamlessly.",
      keyTakeaway: "Lookahead of one symbol resolves prefix subtractions in Roman numerals.",
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    unordered_map<char, int> val = {
        {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
        {'C', 100}, {'D', 500}, {'M', 1000}
    };
    int total = 0, n = s.length();
    for (int i = 0; i < n; i++) {
        if (i + 1 < n && val[s[i]] < val[s[i + 1]]) {
            total -= val[s[i]];
        } else {
            total += val[s[i]];
        }
    }
    cout << total << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    s = raw[0]
    val = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    total = 0
    for i in range(len(s)):
        if i + 1 < len(s) and val[s[i]] < val[s[i + 1]]:
            total -= val[s[i]]
        else:
            total += val[s[i]]
    print(total)

if __name__ == '__main__':
    solve()`
    }]
  },
  "76": {
    title: "Integer to Roman",
    edgeCases: ["Numbers near power of 10 boundaries (900, 40, 9)", "Max value 3999"],
    dryRun: {
      description: "Greedy value subtraction from precomputed value-symbol table",
      headers: ["Remaining", "Symbol", "Count"],
      rows: [["1994", "M (1000)", "1"], ["994", "CM (900)", "1"], ["94", "XC (90)", "1"], ["4", "IV (4)", "1"]]
    },
    approaches: [{
      id: "optimal",
      name: "Greedy Symbol Table Mapping",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      description: "Greedily subtract largest base values matching Roman numerals.",
      keyTakeaway: "Pre-defining subtractive pairs makes Roman conversion a clean greedy process.",
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int num;
    if (!(cin >> num)) return 0;
    vector<pair<int, string>> table = {
        {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
        {100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
        {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}
    };
    string res = "";
    for (auto& p : table) {
        while (num >= p.first) {
            res += p.second;
            num -= p.first;
        }
    }
    cout << res << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    num = int(raw[0])
    table = [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")
    ]
    res = []
    for val, sym in table:
        while num >= val:
            res.append(sym)
            num -= val
    print("".join(res))

if __name__ == '__main__':
    solve()`
    }]
  },
  "77": {
    title: "Count and Say",
    edgeCases: ["n = 1 -> '1'", "Repeated identical run lengths (e.g. '111221')"],
    dryRun: {
      description: "Run-length encoding of current string to produce next",
      headers: ["n", "String"],
      rows: [["1", "1"], ["2", "11"], ["3", "21"], ["4", "1211"]]
    },
    approaches: [{
      id: "optimal",
      name: "Iterative Run-Length Encoding",
      timeComplexity: "O(N * L)",
      spaceComplexity: "O(L)",
      description: "Iteratively encode identical adjacent character runs.",
      keyTakeaway: "Two pointers scan adjacent identical runs in linear time.",
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    string s = "1";
    for (int step = 2; step <= n; step++) {
        string nextStr = "";
        int len = s.length();
        for (int i = 0; i < len; ) {
            int j = i;
            while (j < len && s[j] == s[i]) j++;
            nextStr += to_string(j - i) + s[i];
            i = j;
        }
        s = nextStr;
    }
    cout << s << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    s = "1"
    for _ in range(2, n + 1):
        next_s = []
        i = 0
        while i < len(s):
            j = i
            while j < len(s) and s[j] == s[i]:
                j += 1
            next_s.append(f"{j - i}{s[i]}")
            i = j
        s = "".join(next_s)
    print(s)

if __name__ == '__main__':
    solve()`
    }]
  },
  "78": {
    title: "Ransom Note",
    edgeCases: ["magazine shorter than ransomNote", "Character missing completely"],
    dryRun: {
      description: "Frequency count array of size 26",
      headers: ["Step", "Action"],
      rows: [["Count magazine", "Increment letters"], ["Read ransomNote", "Decrement letters, check >= 0"]]
    },
    approaches: [{
      id: "optimal",
      name: "Frequency Array Counting",
      timeComplexity: "O(N + M)",
      spaceComplexity: "O(1) (26 letters)",
      description: "Count available letters in magazine and decrement for ransomNote.",
      keyTakeaway: "Fixed alphabet of 26 letters allows constant space frequency matching.",
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string ransom, magazine;
    if (!(cin >> ransom >> magazine)) return 0;
    vector<int> count(26, 0);
    for (char c : magazine) count[c - 'a']++;
    bool possible = true;
    for (char c : ransom) {
        if (--count[c - 'a'] < 0) {
            possible = false;
            break;
        }
    }
    cout << (possible ? "true" : "false") << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    ransom, magazine = raw[0], raw[1]
    cnt = [0] * 26
    for c in magazine:
        cnt[ord(c) - ord('a')] += 1
    possible = True
    for c in ransom:
        idx = ord(c) - ord('a')
        cnt[idx] -= 1
        if cnt[idx] < 0:
            possible = False
            break
    print("true" if possible else "false")

if __name__ == '__main__':
    solve()`
    }]
  },
  "79": {
    title: "Reverse Linked List II",
    edgeCases: ["left = 1 (reversing from head)", "left = right (no change)"],
    dryRun: {
      description: "Dummy node points to head; advance to left - 1, reverse segment",
      headers: ["Step", "Action"],
      rows: [["1", "Reach left - 1"], ["2", "Repeatedly insert next node to segment start"]]
    },
    approaches: [{
      id: "optimal",
      name: "One-Pass In-Place Sublist Reversal",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      description: "Iteratively reverse subsegment using 3 pointers without rebuilding nodes.",
      keyTakeaway: "Dummy node eliminates edge conditions when modifying the list head.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, left, right;
    if (!(cin >> n >> left >> right)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    reverse(nums.begin() + left - 1, nums.begin() + right);
    for (int i = 0; i < n; i++) {
        cout << nums[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, left, right = int(raw[0]), int(raw[1]), int(raw[2])
    nums = [int(x) for x in raw[3:n+3]]
    nums[left-1:right] = reversed(nums[left-1:right])
    print(" ".join(map(str, nums)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "80": {
    title: "Rotate List",
    edgeCases: ["k = 0 or k % n == 0", "k greater than list length n", "n = 1"],
    dryRun: {
      description: "Connect tail to head, find cut point at n - (k % n) - 1",
      headers: ["Step", "Action"],
      rows: [["1", "Compute length n"], ["2", "Cut at new tail"]]
    },
    approaches: [{
      id: "optimal",
      name: "Ring Cut Circular Traversal",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      description: "Form a circular ring, advance n - (k % n) steps to locate new head, and detach ring.",
      keyTakeaway: "Modulo reduction k % n prevents unnecessary cycles.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    long long k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    if (n == 0) return 0;

    k %= n;
    vector<int> res(n);
    for (int i = 0; i < n; i++) {
        res[(i + k) % n] = nums[i];
    }
    for (int i = 0; i < n; i++) {
        cout << res[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, k = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]
    if n == 0:
        return
    k %= n
    rotated = nums[-k:] + nums[:-k] if k > 0 else nums
    print(" ".join(map(str, rotated)))

if __name__ == '__main__':
    solve()`
    }]
  }
};
