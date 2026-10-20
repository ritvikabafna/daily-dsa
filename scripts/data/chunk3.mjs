export const chunk3Problems = [
  {
    id: 81,
    title: "Next Greater Element I",
    difficulty: "Easy",
    topic: "Stack",
    acceptance: 71.9,
    description: "The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. Given two arrays nums1 and nums2 where nums1 is a subset of nums2, find the next greater element for each value in nums1. Return -1 if no greater element exists. Input format: n1 and n2 on first line. Line 2 has nums1, line 3 has nums2. Output: space-separated answers.",
    examples: [
      { input: "3 4\n4 1 2\n1 3 4 2", output: "-1 3 -1" }
    ],
    constraints: ["1 <= nums1.length <= nums2.length <= 1000", "0 <= nums1[i], nums2[i] <= 10^4"],
    tags: ["Array", "Hash Table", "Stack", "Monotonic Stack"],
    hints: [
      "Use a monotonic decreasing stack to find the next greater element for every item in nums2.",
      "Pop smaller elements from stack, mapping popped element -> current element in a hash map."
    ],
    testCases: [
      { input: "3 4\n4 1 2\n1 3 4 2", expectedOutput: "-1 3 -1" },
      { input: "2 4\n2 4\n1 2 3 4", expectedOutput: "3 -1" },
      { input: "1 1\n5\n5", expectedOutput: "-1" }
    ]
  },
  {
    id: 82,
    title: "Next Greater Element II",
    difficulty: "Medium",
    topic: "Stack",
    acceptance: 63.4,
    description: "Given a circular integer array nums, return the next greater number for every element. Search circularly through the array. If no greater element exists, output -1 for that number. Input format: n on first line, followed by n space-separated integers on second line.",
    examples: [
      { input: "3\n1 2 1", output: "2 -1 2" }
    ],
    constraints: ["1 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
    tags: ["Array", "Stack", "Monotonic Stack"],
    hints: [
      "Simulate the circular array by looping up to 2 * n - 1.",
      "Use index modulo n (i % n) with a monotonic decreasing stack."
    ],
    testCases: [
      { input: "3\n1 2 1", expectedOutput: "2 -1 2" },
      { input: "5\n1 2 3 4 3", expectedOutput: "2 3 4 -1 4" },
      { input: "1\n5", expectedOutput: "-1" }
    ]
  },
  {
    id: 83,
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    topic: "Stack",
    acceptance: 43.8,
    description: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram. Input format: n on first line, followed by n integers on second line.",
    examples: [
      { input: "6\n2 1 5 6 2 3", output: "10" }
    ],
    constraints: ["1 <= heights.length <= 10^5", "0 <= heights[i] <= 10^4"],
    tags: ["Array", "Stack", "Monotonic Stack"],
    hints: [
      "For each bar, find the previous smaller bar and the next smaller bar.",
      "Use a monotonic increasing stack storing indices to find both boundaries in a single pass."
    ],
    testCases: [
      { input: "6\n2 1 5 6 2 3", expectedOutput: "10" },
      { input: "2\n2 4", expectedOutput: "4" },
      { input: "1\n5", expectedOutput: "5" }
    ]
  },
  {
    id: 84,
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    topic: "Stack",
    acceptance: 46.5,
    description: "You are given an array of integers nums, there is a sliding window of size k moving from left to right. Return the max sliding window. Input format: n and k on first line, followed by n integers on second line. Output: space-separated maximums.",
    examples: [
      { input: "8 3\n1 3 -1 -3 5 3 6 7", output: "3 3 5 5 6 7" }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "1 <= k <= nums.length"],
    tags: ["Array", "Queue", "Sliding Window", "Monotonic Queue"],
    hints: [
      "Use a double-ended queue (deque) to store indices of useful elements.",
      "Maintain the deque in monotonically decreasing order of values. Pop front when out of window bounds."
    ],
    testCases: [
      { input: "8 3\n1 3 -1 -3 5 3 6 7", expectedOutput: "3 3 5 5 6 7" },
      { input: "1 1\n1", expectedOutput: "1" },
      { input: "4 2\n9 11 8 5", expectedOutput: "11 11 8" }
    ]
  },
  {
    id: 85,
    title: "Implement Queue using Stacks",
    difficulty: "Easy",
    topic: "Stack",
    acceptance: 64.9,
    description: "Simulate a FIFO queue using only two LIFO stacks. Support push, pop, and peek operations. Input format: Number of operations q, followed by q operations (1 x for push x, 2 for pop, 3 for peek). Output each popped or peeked value on a new line.",
    examples: [
      { input: "5\n1 1\n1 2\n3\n2\n3", output: "1\n1\n2" }
    ],
    constraints: ["1 <= q <= 100", "All operations are valid"],
    tags: ["Stack", "Design", "Queue"],
    hints: [
      "Use two stacks: inStack and outStack.",
      "Push to inStack. To pop/peek, if outStack is empty, transfer all elements from inStack to outStack to reverse the order."
    ],
    testCases: [
      { input: "5\n1 1\n1 2\n3\n2\n3", expectedOutput: "1\n1\n2" },
      { input: "3\n1 42\n3\n2", expectedOutput: "42\n42" }
    ]
  },
  {
    id: 86,
    title: "Subsets",
    difficulty: "Medium",
    topic: "Recursion",
    acceptance: 76.5,
    description: "Given an integer array nums of unique elements, return the count of all possible subsets (the power set). Input format: n on first line, followed by n space-separated integers on second line.",
    examples: [
      { input: "3\n1 2 3", output: "8" }
    ],
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All numbers are unique."],
    tags: ["Array", "Backtracking", "Bit Manipulation"],
    hints: [
      "For every element, there are two choices: include it or exclude it.",
      "The total number of subsets for a set of size n is 2^n."
    ],
    testCases: [
      { input: "3\n1 2 3", expectedOutput: "8" },
      { input: "1\n0", expectedOutput: "2" },
      { input: "4\n1 2 3 4", expectedOutput: "16" }
    ]
  },
  {
    id: 87,
    title: "Subsets II",
    difficulty: "Medium",
    topic: "Recursion",
    acceptance: 56.8,
    description: "Given an integer array nums that may contain duplicates, return the count of unique subsets. Input format: n on first line, followed by n integers on second line.",
    examples: [
      { input: "3\n1 2 2", output: "6" }
    ],
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10"],
    tags: ["Array", "Backtracking", "Bit Manipulation"],
    hints: [
      "Sort the array first so identical elements are consecutive.",
      "When recursing, skip identical elements at the same recursion depth: if (i > start && nums[i] == nums[i-1]) continue."
    ],
    testCases: [
      { input: "3\n1 2 2", expectedOutput: "6" },
      { input: "1\n0", expectedOutput: "2" },
      { input: "3\n4 4 4", expectedOutput: "4" }
    ]
  },
  {
    id: 88,
    title: "Combination Sum",
    difficulty: "Medium",
    topic: "Recursion",
    acceptance: 70.3,
    description: "Given an array of distinct integers candidates and a target integer target, return the number of unique combinations where the chosen numbers sum to target. The same number may be chosen unlimited times. Input format: n and target on first line, followed by n integers on second line.",
    examples: [
      { input: "4 7\n2 3 6 7", output: "2" }
    ],
    constraints: ["1 <= candidates.length <= 30", "2 <= candidates[i] <= 40", "1 <= target <= 500"],
    tags: ["Array", "Backtracking"],
    hints: [
      "Sort candidates first.",
      "At each step, either pick candidates[idx] and stay at idx (reusable), or skip to idx + 1."
    ],
    testCases: [
      { input: "4 7\n2 3 6 7", expectedOutput: "2" },
      { input: "3 8\n2 3 5", expectedOutput: "3" },
      { input: "1 2\n2", expectedOutput: "1" }
    ]
  },
  {
    id: 89,
    title: "Permutations",
    difficulty: "Medium",
    topic: "Recursion",
    acceptance: 77.2,
    description: "Given an array nums of distinct integers, return the count of all possible permutations. Input format: n on first line, followed by n integers.",
    examples: [
      { input: "3\n1 2 3", output: "6" }
    ],
    constraints: ["1 <= nums.length <= 6", "-10 <= nums[i] <= 10"],
    tags: ["Array", "Backtracking"],
    hints: [
      "There are n! permutations for an array of length n distinct elements.",
      "Use recursive swapping: swap(nums[start], nums[i]), recurse on start + 1, then backtrack."
    ],
    testCases: [
      { input: "3\n1 2 3", expectedOutput: "6" },
      { input: "1\n1", expectedOutput: "1" },
      { input: "2\n0 1", expectedOutput: "2" }
    ]
  },
  {
    id: 90,
    title: "N-Queens",
    difficulty: "Hard",
    topic: "Recursion",
    acceptance: 66.8,
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return the number of distinct solutions. Input format: Single integer n on one line.",
    examples: [
      { input: "4", output: "2" },
      { input: "1", output: "1" }
    ],
    constraints: ["1 <= n <= 9"],
    tags: ["Backtracking"],
    hints: [
      "Track column, normal diagonal (row + col), and anti-diagonal (row - col + n - 1) attacks using boolean arrays.",
      "Place queens row by row. If valid, recurse to row + 1."
    ],
    testCases: [
      { input: "4", expectedOutput: "2" },
      { input: "1", expectedOutput: "1" },
      { input: "5", expectedOutput: "10" }
    ]
  },
  {
    id: 91,
    title: "Word Search",
    difficulty: "Medium",
    topic: "Recursion",
    acceptance: 41.2,
    description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically). Input format: m, n, word on first line. Next m lines each contain n characters separated by space.",
    examples: [
      { input: "3 4 ABCCED\nA B C E\nS F C S\nA D E E", output: "true" }
    ],
    constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 6", "1 <= word.length <= 15"],
    tags: ["Array", "String", "Backtracking", "Matrix"],
    hints: [
      "Start a DFS from every cell matching word[0].",
      "Mark visited cells temporarily with '#' and restore upon backtracking."
    ],
    testCases: [
      { input: "3 4 ABCCED\nA B C E\nS F C S\nA D E E", expectedOutput: "true" },
      { input: "3 4 SEE\nA B C E\nS F C S\nA D E E", expectedOutput: "true" },
      { input: "3 4 ABCD\nA B C E\nS F C S\nA D E E", expectedOutput: "false" }
    ]
  },
  {
    id: 92,
    title: "Diameter of Binary Tree",
    difficulty: "Easy",
    topic: "Binary Trees",
    acceptance: 59.8,
    description: "Given a binary tree represented as an array in level-order (-1 for null), return the length of the diameter (the number of edges on the longest path between any two nodes). Input format: n on first line, followed by n integers in level-order.",
    examples: [
      { input: "5\n1 2 3 4 5", output: "3" }
    ],
    constraints: ["1 <= nodes <= 10^4", "-100 <= Node.val <= 100"],
    tags: ["Tree", "Depth-First Search", "Binary Tree"],
    hints: [
      "The longest path passing through a node is left_height + right_height.",
      "Compute node height recursively and update the maximum diameter found so far."
    ],
    testCases: [
      { input: "5\n1 2 3 4 5", expectedOutput: "3" },
      { input: "2\n1 2", expectedOutput: "1" },
      { input: "1\n1", expectedOutput: "0" }
    ]
  },
  {
    id: 93,
    title: "Balanced Binary Tree",
    difficulty: "Easy",
    topic: "Binary Trees",
    acceptance: 51.2,
    description: "Given a binary tree represented in level order (-1 for null), determine if it is height-balanced (the depth of the two subtrees of every node never differs by more than one). Output 'true' or 'false'. Input format: n on first line, followed by n integers in level-order.",
    examples: [
      { input: "5\n3 9 20 -1 -1 15 7", output: "true" }
    ],
    constraints: ["0 <= nodes <= 5000"],
    tags: ["Tree", "Depth-First Search", "Binary Tree"],
    hints: [
      "Return -1 immediately from the recursive height function if any subtree is unbalanced.",
      "Check abs(leftHeight - rightHeight) <= 1 at each node."
    ],
    testCases: [
      { input: "7\n3 9 20 -1 -1 15 7", expectedOutput: "true" },
      { input: "7\n1 2 2 3 3 -1 -1", expectedOutput: "true" },
      { input: "1\n1", expectedOutput: "true" }
    ]
  },
  {
    id: 94,
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    topic: "Binary Trees",
    acceptance: 61.4,
    description: "Given a binary tree in level-order (-1 for null) and two node values p and q, find the value of their lowest common ancestor (LCA). Input format: n, p, q on first line, followed by n integers in level order.",
    examples: [
      { input: "7 5 1\n3 5 1 6 2 0 8", output: "3" }
    ],
    constraints: ["2 <= nodes <= 10^4", "All Node.val are unique."],
    tags: ["Tree", "Depth-First Search", "Binary Tree"],
    hints: [
      "If the current node matches p or q, return current node.",
      "If both left and right recursive calls return non-null, the current node is the LCA."
    ],
    testCases: [
      { input: "7 5 1\n3 5 1 6 2 0 8", expectedOutput: "3" },
      { input: "7 5 4\n3 5 1 6 2 0 8", expectedOutput: "5" }
    ]
  },
  {
    id: 95,
    title: "Binary Tree Zigzag Level Order Traversal",
    difficulty: "Medium",
    topic: "Binary Trees",
    acceptance: 58.2,
    description: "Given the root of a binary tree in level order (-1 for null), return the zigzag level order traversal (i.e., from left to right, then right to left for the next level and alternate between). Output each level space-separated on a new line.",
    examples: [
      { input: "5\n3 9 20 15 7", output: "3\n20 9\n15 7" }
    ],
    constraints: ["0 <= nodes <= 2000"],
    tags: ["Tree", "Breadth-First Search", "Binary Tree"],
    hints: [
      "Standard BFS with a queue. Keep a boolean flag leftToRight.",
      "Reverse the current level array whenever leftToRight is false."
    ],
    testCases: [
      { input: "5\n3 9 20 15 7", expectedOutput: "3\n20 9\n15 7" },
      { input: "1\n1", expectedOutput: "1" }
    ]
  },
  {
    id: 96,
    title: "Course Schedule",
    difficulty: "Medium",
    topic: "Graphs",
    acceptance: 46.9,
    description: "There are a total of numCourses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates you must take bi before ai. Return true if you can finish all courses, or false otherwise (cycle detection in directed graph). Input format: numCourses and m on first line, followed by m lines of ai bi.",
    examples: [
      { input: "2 1\n1 0", output: "true" },
      { input: "2 2\n1 0\n0 1", output: "false" }
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"],
    hints: [
      "A course schedule is possible if and only if the dependency graph is a Directed Acyclic Graph (DAG).",
      "Use Kahn's Algorithm (BFS with in-degrees) or DFS with 3 states (unvisited, visiting, visited)."
    ],
    testCases: [
      { input: "2 1\n1 0", expectedOutput: "true" },
      { input: "2 2\n1 0\n0 1", expectedOutput: "false" },
      { input: "1 0", expectedOutput: "true" }
    ]
  },
  {
    id: 97,
    title: "Course Schedule II",
    difficulty: "Medium",
    topic: "Graphs",
    acceptance: 49.5,
    description: "Given numCourses and prerequisites, return the ordering of courses you should take to finish all courses. If impossible, output -1. Input format: numCourses and m on first line, then m lines of prerequisites ai bi. Output: Space-separated topological course order.",
    examples: [
      { input: "4 4\n1 0\n2 0\n3 1\n3 2", output: "0 1 2 3" }
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= numCourses * (numCourses - 1)"],
    tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"],
    hints: [
      "Use Kahn's Algorithm with a queue of nodes having in-degree 0.",
      "If the topological sort contains fewer than numCourses elements, a cycle exists."
    ],
    testCases: [
      { input: "4 4\n1 0\n2 0\n3 1\n3 2", expectedOutput: "0 1 2 3" },
      { input: "2 1\n1 0", expectedOutput: "0 1" },
      { input: "2 2\n1 0\n0 1", expectedOutput: "-1" }
    ]
  },
  {
    id: 98,
    title: "Flood Fill",
    difficulty: "Easy",
    topic: "Graphs",
    acceptance: 63.2,
    description: "An image is represented by an m x n integer grid image. Perform a flood fill starting from pixel (sr, sc) replacing connected pixels of the same original color with color. Input format: m, n, sr, sc, color on first line, followed by m lines each with n integers. Output: Updated matrix.",
    examples: [
      { input: "3 3 1 1 2\n1 1 1\n1 1 0\n1 0 1", output: "2 2 2\n2 2 0\n2 0 1" }
    ],
    constraints: ["m == image.length", "n == image[i].length", "1 <= m, n <= 50", "0 <= image[i][j], color < 65536"],
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Matrix"],
    hints: [
      "If image[sr][sc] is already equal to color, return immediately to avoid infinite recursion.",
      "Explore the 4 adjacent neighbors using standard DFS or BFS."
    ],
    testCases: [
      { input: "3 3 1 1 2\n1 1 1\n1 1 0\n1 0 1", expectedOutput: "2 2 2\n2 2 0\n2 0 1" },
      { input: "2 2 0 0 0\n0 0\n0 0", expectedOutput: "0 0\n0 0" }
    ]
  },
  {
    id: 99,
    title: "0/1 Knapsack Problem",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    acceptance: 52.4,
    description: "Given n items with weights wt[] and values val[], and a knapsack of maximum capacity W. Determine the maximum value that can be accommodated in the knapsack. Each item can either be picked or not picked (0/1). Input format: n and W on first line. Next line has n weights, next line has n values.",
    examples: [
      { input: "3 4\n1 2 3\n10 15 40", output: "55" }
    ],
    constraints: ["1 <= n <= 100", "1 <= W <= 1000", "1 <= wt[i] <= 1000", "1 <= val[i] <= 1000"],
    tags: ["Array", "Dynamic Programming"],
    hints: [
      "Define dp[w] as max value with weight limit w.",
      "Iterate through items and update dp[w] backwards from W down to wt[i] to ensure each item is picked at most once."
    ],
    testCases: [
      { input: "3 4\n1 2 3\n10 15 40", expectedOutput: "55" },
      { input: "3 3\n4 5 1\n1 2 3", expectedOutput: "3" },
      { input: "1 10\n5\n10", expectedOutput: "10" }
    ]
  },
  {
    id: 100,
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    acceptance: 58.1,
    description: "Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order. Input format: text1 on first line, text2 on second line.",
    examples: [
      { input: "abcde\nace", output: "3" },
      { input: "abc\nabc", output: "3" },
      { input: "abc\ndef", output: "0" }
    ],
    constraints: ["1 <= text1.length, text2.length <= 1000", "text1 and text2 consist of lowercase English characters only."],
    tags: ["String", "Dynamic Programming"],
    hints: [
      "If text1[i-1] == text2[j-1], dp[i][j] = 1 + dp[i-1][j-1].",
      "Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Space can be optimized to 1D array."
    ],
    testCases: [
      { input: "abcde\nace", expectedOutput: "3" },
      { input: "abc\nabc", expectedOutput: "3" },
      { input: "abc\ndef", expectedOutput: "0" }
    ]
  }
];

export const chunk3Editorials = {
  "81": {
    title: "Next Greater Element I",
    edgeCases: ["No greater element exists for any item", "nums1 and nums2 have size 1"],
    dryRun: {
      description: "Monotonic stack over nums2 creates lookup map",
      headers: ["Element", "Stack", "Map Entry"],
      rows: [["1", "[1]", "-"], ["3", "[3]", "1 -> 3"], ["4", "[4]", "3 -> 4"]]
    },
    approaches: [{
      id: "optimal",
      name: "Monotonic Stack with Hash Map",
      timeComplexity: "O(N1 + N2)",
      spaceComplexity: "O(N2)",
      description: "Traverse nums2 with monotonic stack; map each element to its next greater neighbor.",
      keyTakeaway: "Monotonic decreasing stack finds next greater element in linear time.",
      cpp: `#include <iostream>
#include <vector>
#include <stack>
#include <unordered_map>
using namespace std;

int main() {
    int n1, n2;
    if (!(cin >> n1 >> n2)) return 0;
    vector<int> nums1(n1), nums2(n2);
    for (int i = 0; i < n1; i++) cin >> nums1[i];
    for (int i = 0; i < n2; i++) cin >> nums2[i];

    unordered_map<int, int> nextGreater;
    stack<int> st;
    for (int x : nums2) {
        while (!st.empty() && st.top() < x) {
            nextGreater[st.top()] = x;
            st.pop();
        }
        st.push(x);
    }

    for (int i = 0; i < n1; i++) {
        int ans = nextGreater.count(nums1[i]) ? nextGreater[nums1[i]] : -1;
        cout << ans << (i == n1 - 1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n1, n2 = int(raw[0]), int(raw[1])
    nums1 = [int(x) for x in raw[2:2+n1]]
    nums2 = [int(x) for x in raw[2+n1:2+n1+n2]]

    next_greater = {}
    st = []
    for x in nums2:
        while st and st[-1] < x:
            next_greater[st.pop()] = x
        st.append(x)

    res = [str(next_greater.get(x, -1)) for x in nums1]
    print(" ".join(res))

if __name__ == '__main__':
    solve()`
    }]
  },
  "82": {
    title: "Next Greater Element II",
    edgeCases: ["All elements identical -> all -1", "Descending array"],
    dryRun: {
      description: "Traverse 2*n - 1 elements with monotonic stack storing indices",
      headers: ["Index (i % n)", "Value", "Stack Action"],
      rows: [["0", "1", "Push 0"], ["1", "2", "Pop 0 -> res[0]=2"]]
    },
    approaches: [{
      id: "optimal",
      name: "Circular Monotonic Stack",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      description: "Loop through virtual array of size 2*N using i % N with monotonic stack.",
      keyTakeaway: "Doubling array length simulates circular wraparound in O(N).",
      cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    vector<int> res(n, -1);
    stack<int> st;
    for (int i = 0; i < 2 * n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i % n]) {
            res[st.top()] = nums[i % n];
            st.pop();
        }
        if (i < n) st.push(i);
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
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]

    res = [-1] * n
    st = []
    for i in range(2 * n):
        idx = i % n
        while st and nums[st[-1]] < nums[idx]:
            res[st.pop()] = nums[idx]
        if i < n:
            st.append(i)
    print(" ".join(map(str, res)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "83": {
    title: "Largest Rectangle in Histogram",
    edgeCases: ["Strictly ascending heights", "Single bar histogram"],
    dryRun: {
      description: "Monotonic increasing stack tracks left and right boundaries",
      headers: ["Popped Bar", "Left Boundary", "Right Boundary", "Area"],
      rows: [["6", "index of 5", "index of 2", "6 * 1 = 6"], ["5", "index of 1", "index of 2", "5 * 2 = 10"]]
    },
    approaches: [{
      id: "optimal",
      name: "Monotonic Increasing Stack (Single Pass)",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      description: "Each bar is popped when a smaller bar is encountered, determining right boundary.",
      keyTakeaway: "Monotonic stack efficiently computes widths between smaller boundaries.",
      cpp: `#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];

    stack<int> st;
    long long maxArea = 0;
    for (int i = 0; i <= n; i++) {
        long long curr = (i == n) ? 0 : h[i];
        while (!st.empty() && curr < h[st.top()]) {
            long long height = h[st.top()];
            st.pop();
            long long width = st.empty() ? i : (i - st.top() - 1);
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
    }
    cout << maxArea << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    h = [int(x) for x in raw[1:n+1]]

    st = []
    max_area = 0
    for i in range(n + 1):
        curr = 0 if i == n else h[i]
        while st and curr < h[st[-1]]:
            height = h[st.pop()]
            width = i if not st else (i - st[-1] - 1)
            max_area = max(max_area, height * width)
        st.append(i)
    print(max_area)

if __name__ == '__main__':
    solve()`
    }]
  },
  "84": {
    title: "Sliding Window Maximum",
    edgeCases: ["k = 1", "k == nums.length", "Strictly decreasing window"],
    dryRun: {
      description: "Monotonic deque maintains indices of candidate maxima in descending order",
      headers: ["Step", "Element", "Deque Indices", "Window Max"],
      rows: [["i=2", "-1", "[1, 2]", "3"]]
    },
    approaches: [{
      id: "optimal",
      name: "Monotonic Deque",
      timeComplexity: "O(N)",
      spaceComplexity: "O(K)",
      description: "Front of deque always holds the max element for current window.",
      keyTakeaway: "Discard elements that are both older and smaller than the current element.",
      cpp: `#include <iostream>
#include <vector>
#include <deque>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    deque<int> dq;
    vector<int> res;
    for (int i = 0; i < n; i++) {
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }
    for (size_t i = 0; i < res.size(); i++) {
        cout << res[i] << (i + 1 == res.size() ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      python: `import sys
from collections import deque

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, k = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]

    dq = deque()
    res = []
    for i in range(n):
        if dq and dq[0] <= i - k:
            dq.popleft()
        while dq and nums[dq[-1]] <= nums[i]:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            res.append(str(nums[dq[0]]))
    print(" ".join(res))

if __name__ == '__main__':
    solve()`
    }]
  },
  "85": {
    title: "Implement Queue using Stacks",
    edgeCases: ["Repeated pushes and pops", "Querying empty queue"],
    dryRun: {
      description: "Amortized O(1) transfer from inStack to outStack",
      headers: ["Op", "inStack", "outStack", "Output"],
      rows: [["Push 1", "[1]", "[]", "-"], ["Push 2", "[1, 2]", "[]", "-"], ["Pop", "[]", "[2]", "1"]]
    },
    approaches: [{
      id: "optimal",
      name: "Two Stacks with Amortized O(1) Transfer",
      timeComplexity: "O(1) amortized per operation",
      spaceComplexity: "O(N)",
      description: "Transfer from input stack to output stack only when output stack is empty.",
      keyTakeaway: "Each element is moved at most twice, yielding amortized O(1).",
      cpp: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int q;
    if (!(cin >> q)) return 0;
    stack<int> inSt, outSt;
    while (q--) {
        int type; cin >> type;
        if (type == 1) {
            int x; cin >> x;
            inSt.push(x);
        } else if (type == 2 || type == 3) {
            if (outSt.empty()) {
                while (!inSt.empty()) {
                    outSt.push(inSt.top());
                    inSt.pop();
                }
            }
            int val = outSt.top();
            if (type == 2) outSt.pop();
            cout << val << "\\n";
        }
    }
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    q = int(raw[0])
    idx = 1
    in_st, out_st = [], []
    for _ in range(q):
        t = int(raw[idx])
        idx += 1
        if t == 1:
            x = int(raw[idx])
            idx += 1
            in_st.append(x)
        else:
            if not out_st:
                while in_st:
                    out_st.append(in_st.pop())
            val = out_st[-1]
            if t == 2:
                out_st.pop()
            print(val)

if __name__ == '__main__':
    solve()`
    }]
  },
  "86": {
    title: "Subsets",
    edgeCases: ["Array of length 1", "Generating full power set"],
    dryRun: {
      description: "2^n total subsets via recursive inclusion/exclusion",
      headers: ["Level", "Subset Formed"],
      rows: [["0", "[]"], ["1", "[1]"], ["2", "[1, 2]"]]
    },
    approaches: [{
      id: "optimal",
      name: "Backtracking / Combinatorial Count",
      timeComplexity: "O(2^N)",
      spaceComplexity: "O(N)",
      description: "Recursive inclusion/exclusion generates the complete power set of size 2^N.",
      keyTakeaway: "Binary choice tree yields 2^N configurations.",
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    cout << (1 << n) << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    print(1 << n)

if __name__ == '__main__':
    solve()`
    }]
  },
  "87": {
    title: "Subsets II",
    edgeCases: ["All elements duplicates", "Array of size 1"],
    dryRun: {
      description: "Sort and skip duplicates at same tree depth",
      headers: ["Depth", "Condition", "Action"],
      rows: [["i > start", "nums[i] == nums[i-1]", "Skip duplicate"]]
    },
    approaches: [{
      id: "optimal",
      name: "Sorted Backtracking with Duplicate Pruning",
      timeComplexity: "O(2^N)",
      spaceComplexity: "O(N)",
      description: "Sort elements and skip identical siblings at the same recursion depth.",
      keyTakeaway: "Sorting before backtracking enables duplicate pruning in O(1).",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void backtrack(const vector<int>& nums, int start, int& count) {
    count++;
    for (size_t i = start; i < nums.size(); i++) {
        if (i > (size_t)start && nums[i] == nums[i - 1]) continue;
        backtrack(nums, i + 1, count);
    }
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums.begin(), nums.end());
    int count = 0;
    backtrack(nums, 0, count);
    cout << count << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    nums.sort()

    count = 0
    def backtrack(start):
        nonlocal count
        count += 1
        for i in range(start, n):
            if i > start and nums[i] == nums[i - 1]:
                continue
            backtrack(i + 1)

    backtrack(0)
    print(count)

if __name__ == '__main__':
    solve()`
    }]
  },
  "88": {
    title: "Combination Sum",
    edgeCases: ["target smaller than smallest candidate", "candidate reusable multiple times"],
    dryRun: {
      description: "Backtrack branch: pick same element or advance index",
      headers: ["Index", "Remaining Target", "Action"],
      rows: [["0", "7", "Pick 2 -> rem 5"], ["0", "5", "Pick 2 -> rem 3"], ["0", "3", "Pick 2 -> rem 1 (exceeds)"]]
    },
    approaches: [{
      id: "optimal",
      name: "Reusable Backtracking",
      timeComplexity: "O(2^T) where T = target/min_val",
      spaceComplexity: "O(target)",
      description: "Branch on candidate reuse or index advancement.",
      keyTakeaway: "Unbounded knapsack recursion pattern.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void dfs(const vector<int>& cand, int idx, int target, int& count) {
    if (target == 0) {
        count++;
        return;
    }
    for (size_t i = idx; i < cand.size(); i++) {
        if (cand[i] > target) break;
        dfs(cand, i, target - cand[i], count);
    }
}

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> cand(n);
    for (int i = 0; i < n; i++) cin >> cand[i];
    sort(cand.begin(), cand.end());
    int count = 0;
    dfs(cand, 0, target, count);
    cout << count << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, target = int(raw[0]), int(raw[1])
    cand = [int(x) for x in raw[2:n+2]]
    cand.sort()

    count = 0
    def dfs(idx, rem):
        nonlocal count
        if rem == 0:
            count += 1
            return
        for i in range(idx, n):
            if cand[i] > rem:
                break
            dfs(i, rem - cand[i])

    dfs(0, target)
    print(count)

if __name__ == '__main__':
    solve()`
    }]
  },
  "89": {
    title: "Permutations",
    edgeCases: ["Single element array -> 1", "Size n array -> n!"],
    dryRun: {
      description: "Factorial combinations of distinct elements",
      headers: ["n", "Permutations"],
      rows: [["1", "1"], ["2", "2"], ["3", "6"]]
    },
    approaches: [{
      id: "optimal",
      name: "Factorial Count / In-Place Swapping",
      timeComplexity: "O(N!)",
      spaceComplexity: "O(N)",
      description: "Recursively swap each position with remaining elements to produce all permutations.",
      keyTakeaway: "Permutation trees have branching factor n, n-1, ..., 1.",
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    int fact = 1;
    for (int i = 1; i <= n; i++) fact *= i;
    cout << fact << "\\n";
    return 0;
}`,
      python: `import sys
import math

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    print(math.factorial(n))

if __name__ == '__main__':
    solve()`
    }]
  },
  "90": {
    title: "N-Queens",
    edgeCases: ["n = 1 -> 1 solution", "n = 2, 3 -> 0 solutions", "n = 4 -> 2 solutions"],
    dryRun: {
      description: "Backtrack row by row tracking column and diagonal bitmasks",
      headers: ["Row", "Safe Column?", "Recurse"],
      rows: [["0", "Place at col 1", "Go to row 1"]]
    },
    approaches: [{
      id: "optimal",
      name: "Backtracking with Column and Diagonal Masks",
      timeComplexity: "O(N!)",
      spaceComplexity: "O(N)",
      description: "Check row, col, main diag (r+c), and anti diag (r-c+n-1) in O(1) using boolean masks.",
      keyTakeaway: "Index transforms map diagonals to 1D lookup tables.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void solveNQueens(int row, int n, vector<bool>& cols, vector<bool>& d1, vector<bool>& d2, int& count) {
    if (row == n) {
        count++;
        return;
    }
    for (int col = 0; col < n; col++) {
        if (!cols[col] && !d1[row + col] && !d2[row - col + n - 1]) {
            cols[col] = d1[row + col] = d2[row - col + n - 1] = true;
            solveNQueens(row + 1, n, cols, d1, d2, count);
            cols[col] = d1[row + col] = d2[row - col + n - 1] = false;
        }
    }
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<bool> cols(n, false), d1(2 * n, false), d2(2 * n, false);
    int count = 0;
    solveNQueens(0, n, cols, d1, d2, count);
    cout << count << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])

    cols = [False] * n
    d1 = [False] * (2 * n)
    d2 = [False] * (2 * n)
    count = 0

    def backtrack(r):
        nonlocal count
        if r == n:
            count += 1
            return
        for c in range(n):
            if not cols[c] and not d1[r + c] and not d2[r - c + n - 1]:
                cols[c] = d1[r + c] = d2[r - c + n - 1] = True
                backtrack(r + 1)
                cols[c] = d1[r + c] = d2[r - c + n - 1] = False

    backtrack(0)
    print(count)

if __name__ == '__main__':
    solve()`
    }]
  },
  "91": {
    title: "Word Search",
    edgeCases: ["Single cell board matching word", "Word longer than board area"],
    dryRun: {
      description: "DFS 4 directions with in-place character marking",
      headers: ["Cell", "Char", "Matches?", "Action"],
      rows: [["(0,0)", "'A'", "Yes", "Mark '#', visit neighbors"]]
    },
    approaches: [{
      id: "optimal",
      name: "DFS Grid Backtracking",
      timeComplexity: "O(M * N * 3^L)",
      spaceComplexity: "O(L) recursion depth",
      description: "Explore 4 directions from matching starting cells; restore board cell on backtrack.",
      keyTakeaway: "In-place grid cell modification saves hash set allocation.",
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

bool dfs(vector<vector<char>>& board, const string& word, int i, int j, size_t idx) {
    if (idx == word.length()) return true;
    if (i < 0 || i >= (int)board.size() || j < 0 || j >= (int)board[0].size() || board[i][j] != word[idx])
        return false;

    char temp = board[i][j];
    board[i][j] = '#';
    bool found = dfs(board, word, i + 1, j, idx + 1) ||
                 dfs(board, word, i - 1, j, idx + 1) ||
                 dfs(board, word, i, j + 1, idx + 1) ||
                 dfs(board, word, i, j - 1, idx + 1);
    board[i][j] = temp;
    return found;
}

int main() {
    int m, n;
    string word;
    if (!(cin >> m >> n >> word)) return 0;
    vector<vector<char>> board(m, vector<char>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            cin >> board[i][j];

    bool exists = false;
    for (int i = 0; i < m && !exists; i++) {
        for (int j = 0; j < n && !exists; j++) {
            if (board[i][j] == word[0] && dfs(board, word, i, j, 0)) {
                exists = true;
            }
        }
    }
    cout << (exists ? "true" : "false") << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    m, n, word = int(raw[0]), int(raw[1]), raw[2]
    idx = 3
    board = []
    for _ in range(m):
        board.append(raw[idx:idx+n])
        idx += n

    def dfs(r, c, k):
        if k == len(word):
            return True
        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[k]:
            return False
        orig = board[r][c]
        board[r][c] = '#'
        found = (dfs(r + 1, c, k + 1) or
                 dfs(r - 1, c, k + 1) or
                 dfs(r, c + 1, k + 1) or
                 dfs(r, c - 1, k + 1))
        board[r][c] = orig
        return found

    exists = any(dfs(i, j, 0) for i in range(m) for j in range(n) if board[i][j] == word[0])
    print("true" if exists else "false")

if __name__ == '__main__':
    solve()`
    }]
  },
  "92": {
    title: "Diameter of Binary Tree",
    edgeCases: ["Single node tree -> 0", "Long linear tree (linked list structure)"],
    dryRun: {
      description: "Post-order traversal computes max(left_h + right_h) across all nodes",
      headers: ["Node", "Left H", "Right H", "Diameter Path"],
      rows: [["Root 1", "2", "1", "3"]]
    },
    approaches: [{
      id: "optimal",
      name: "Post-Order Bottom-Up Traversal",
      timeComplexity: "O(N)",
      spaceComplexity: "O(H) recursion stack",
      description: "Compute node heights while maintaining global maximum left_h + right_h.",
      keyTakeaway: "Bottom-up tree traversal calculates subtree metrics in a single pass.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Node {
    int val;
    Node* left;
    Node* right;
    Node(int v) : val(v), left(nullptr), right(nullptr) {}
};

int maxDepth(Node* root, int& diameter) {
    if (!root) return 0;
    int lh = maxDepth(root->left, diameter);
    int rh = maxDepth(root->right, diameter);
    diameter = max(diameter, lh + rh);
    return 1 + max(lh, rh);
}

int main() {
    int n;
    if (!(cin >> n) || n <= 0) {
        cout << 0 << "\\n";
        return 0;
    }
    vector<int> vals(n);
    for (int i = 0; i < n; i++) cin >> vals[i];
    if (vals[0] == -1) {
        cout << 0 << "\\n";
        return 0;
    }

    vector<Node*> nodes(n, nullptr);
    for (int i = 0; i < n; i++) {
        if (vals[i] != -1) nodes[i] = new Node(vals[i]);
    }
    for (int i = 0; i < n; i++) {
        if (nodes[i]) {
            int leftIdx = 2 * i + 1;
            int rightIdx = 2 * i + 2;
            if (leftIdx < n) nodes[i]->left = nodes[leftIdx];
            if (rightIdx < n) nodes[i]->right = nodes[rightIdx];
        }
    }
    int diameter = 0;
    maxDepth(nodes[0], diameter);
    cout << diameter << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 0:
        print(0)
        return
    n = int(raw[0])
    vals = [int(x) for x in raw[1:n+1]]
    if vals[0] == -1:
        print(0)
        return

    class Node:
        def __init__(self, val):
            self.val = val
            self.left = None
            self.right = None

    nodes = [Node(v) if v != -1 else None for v in vals]
    for i in range(n):
        if nodes[i]:
            if 2 * i + 1 < n:
                nodes[i].left = nodes[2 * i + 1]
            if 2 * i + 2 < n:
                nodes[i].right = nodes[2 * i + 2]

    diameter = 0
    def depth(root):
        nonlocal diameter
        if not root:
            return 0
        lh = depth(root.left)
        rh = depth(root.right)
        diameter = max(diameter, lh + rh)
        return 1 + max(lh, rh)

    depth(nodes[0])
    print(diameter)

if __name__ == '__main__':
    solve()`
    }]
  },
  "93": {
    title: "Balanced Binary Tree",
    edgeCases: ["Single node tree -> true", "Degenerate skewed tree -> false"],
    dryRun: {
      description: "Height function returns -1 if any subtree is unbalanced",
      headers: ["Node", "Left H", "Right H", "Balanced?"],
      rows: [["3", "1", "2", "Yes (diff <= 1)"]]
    },
    approaches: [{
      id: "optimal",
      name: "Early-Exit Post-Order Traversal",
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      description: "Return -1 immediately upon detecting any height difference > 1.",
      keyTakeaway: "Short-circuiting invalid subtrees prevents redundant recursion.",
      cpp: `#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

struct Node {
    int val;
    Node* left;
    Node* right;
    Node(int v) : val(v), left(nullptr), right(nullptr) {}
};

int checkHeight(Node* root) {
    if (!root) return 0;
    int lh = checkHeight(root->left);
    if (lh == -1) return -1;
    int rh = checkHeight(root->right);
    if (rh == -1) return -1;
    if (abs(lh - rh) > 1) return -1;
    return 1 + max(lh, rh);
}

int main() {
    int n;
    if (!(cin >> n) || n <= 0) {
        cout << "true\\n";
        return 0;
    }
    vector<int> vals(n);
    for (int i = 0; i < n; i++) cin >> vals[i];
    if (vals[0] == -1) {
        cout << "true\\n";
        return 0;
    }

    vector<Node*> nodes(n, nullptr);
    for (int i = 0; i < n; i++) {
        if (vals[i] != -1) nodes[i] = new Node(vals[i]);
    }
    for (int i = 0; i < n; i++) {
        if (nodes[i]) {
            int l = 2 * i + 1, r = 2 * i + 2;
            if (l < n) nodes[i]->left = nodes[l];
            if (r < n) nodes[i]->right = nodes[r];
        }
    }
    cout << (checkHeight(nodes[0]) != -1 ? "true" : "false") << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 0:
        print("true")
        return
    n = int(raw[0])
    vals = [int(x) for x in raw[1:n+1]]
    if vals[0] == -1:
        print("true")
        return

    class Node:
        def __init__(self, val):
            self.val = val
            self.left = None
            self.right = None

    nodes = [Node(v) if v != -1 else None for v in vals]
    for i in range(n):
        if nodes[i]:
            if 2 * i + 1 < n:
                nodes[i].left = nodes[2 * i + 1]
            if 2 * i + 2 < n:
                nodes[i].right = nodes[2 * i + 2]

    def check(root):
        if not root:
            return 0
        lh = check(root.left)
        if lh == -1:
            return -1
        rh = check(root.right)
        if rh == -1:
            return -1
        if abs(lh - rh) > 1:
            return -1
        return 1 + max(lh, rh)

    print("true" if check(nodes[0]) != -1 else "false")

if __name__ == '__main__':
    solve()`
    }]
  },
  "94": {
    title: "Lowest Common Ancestor of a Binary Tree",
    edgeCases: ["One of p or q is the ancestor of the other", "Root is LCA"],
    dryRun: {
      description: "If left and right subtree both return non-null, root is LCA",
      headers: ["Step", "Action"],
      rows: [["Left search", "Finds 5"], ["Right search", "Finds 1"], ["Combine", "Root 3 is LCA"]]
    },
    approaches: [{
      id: "optimal",
      name: "Recursive Post-Order LCA",
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      description: "Recurse subtrees: node where both left and right return target node is the LCA.",
      keyTakeaway: "Convergence point of two targets in tree hierarchy.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

struct Node {
    int val;
    Node* left;
    Node* right;
    Node(int v) : val(v), left(nullptr), right(nullptr) {}
};

Node* findLCA(Node* root, int p, int q) {
    if (!root || root->val == p || root->val == q) return root;
    Node* left = findLCA(root->left, p, q);
    Node* right = findLCA(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}

int main() {
    int n, p, q;
    if (!(cin >> n >> p >> q)) return 0;
    vector<int> vals(n);
    for (int i = 0; i < n; i++) cin >> vals[i];

    vector<Node*> nodes(n, nullptr);
    for (int i = 0; i < n; i++) {
        if (vals[i] != -1) nodes[i] = new Node(vals[i]);
    }
    for (int i = 0; i < n; i++) {
        if (nodes[i]) {
            int l = 2 * i + 1, r = 2 * i + 2;
            if (l < n) nodes[i]->left = nodes[l];
            if (r < n) nodes[i]->right = nodes[r];
        }
    }
    Node* lca = findLCA(nodes[0], p, q);
    cout << (lca ? lca->val : -1) << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, p, q = int(raw[0]), int(raw[1]), int(raw[2])
    vals = [int(x) for x in raw[3:3+n]]

    class Node:
        def __init__(self, val):
            self.val = val
            self.left = None
            self.right = None

    nodes = [Node(v) if v != -1 else None for v in vals]
    for i in range(n):
        if nodes[i]:
            if 2 * i + 1 < n:
                nodes[i].left = nodes[2 * i + 1]
            if 2 * i + 2 < n:
                nodes[i].right = nodes[2 * i + 2]

    def lca(root, p, q):
        if not root or root.val == p or root.val == q:
            return root
        left = lca(root.left, p, q)
        right = lca(root.right, p, q)
        if left and right:
            return root
        return left if left else right

    ans = lca(nodes[0], p, q)
    print(ans.val if ans else -1)

if __name__ == '__main__':
    solve()`
    }]
  },
  "95": {
    title: "Binary Tree Zigzag Level Order Traversal",
    edgeCases: ["Single node tree", "Tree with missing children in level order"],
    dryRun: {
      description: "Level order with toggle boolean leftToRight",
      headers: ["Level", "leftToRight", "Order"],
      rows: [["0", "true", "3"], ["1", "false", "20, 9"], ["2", "true", "15, 7"]]
    },
    approaches: [{
      id: "optimal",
      name: "Queue-Based BFS with Direction Inversion",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      description: "Collect each level in BFS and reverse alternating levels.",
      keyTakeaway: "BFS guarantees clean level-by-level separation.",
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

struct Node {
    int val;
    Node* left;
    Node* right;
    Node(int v) : val(v), left(nullptr), right(nullptr) {}
};

int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    vector<int> vals(n);
    for (int i = 0; i < n; i++) cin >> vals[i];
    if (vals[0] == -1) return 0;

    vector<Node*> nodes(n, nullptr);
    for (int i = 0; i < n; i++) {
        if (vals[i] != -1) nodes[i] = new Node(vals[i]);
    }
    for (int i = 0; i < n; i++) {
        if (nodes[i]) {
            int l = 2 * i + 1, r = 2 * i + 2;
            if (l < n) nodes[i]->left = nodes[l];
            if (r < n) nodes[i]->right = nodes[r];
        }
    }

    queue<Node*> q;
    q.push(nodes[0]);
    bool leftToRight = true;
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level(sz);
        for (int i = 0; i < sz; i++) {
            Node* curr = q.front();
            q.pop();
            int idx = leftToRight ? i : (sz - 1 - i);
            level[idx] = curr->val;
            if (curr->left) q.push(curr->left);
            if (curr->right) q.push(curr->right);
        }
        leftToRight = !leftToRight;
        for (int i = 0; i < sz; i++) {
            cout << level[i] << (i == sz - 1 ? "" : " ");
        }
        cout << "\\n";
    }
    return 0;
}`,
      python: `import sys
from collections import deque

def solve():
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 0:
        return
    n = int(raw[0])
    vals = [int(x) for x in raw[1:n+1]]
    if vals[0] == -1:
        return

    class Node:
        def __init__(self, val):
            self.val = val
            self.left = None
            self.right = None

    nodes = [Node(v) if v != -1 else None for v in vals]
    for i in range(n):
        if nodes[i]:
            if 2 * i + 1 < n:
                nodes[i].left = nodes[2 * i + 1]
            if 2 * i + 2 < n:
                nodes[i].right = nodes[2 * i + 2]

    q = deque([nodes[0]])
    left_to_right = True
    while q:
        sz = len(q)
        level = [0] * sz
        for i in range(sz):
            curr = q.popleft()
            idx = i if left_to_right else (sz - 1 - i)
            level[idx] = curr.val
            if curr.left:
                q.append(curr.left)
            if curr.right:
                q.append(curr.right)
        left_to_right = not left_to_right
        print(" ".join(map(str, level)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "96": {
    title: "Course Schedule",
    edgeCases: ["No prerequisites -> true", "Mutual dependency cycle (0 <-> 1) -> false"],
    dryRun: {
      description: "Kahn's BFS algorithm on in-degrees",
      headers: ["In-degrees", "Queue of 0 in-degrees", "Completed Count"],
      rows: [["0: 0, 1: 1", "[0]", "1 -> 2 (all completed)"]]
    },
    approaches: [{
      id: "optimal",
      name: "Kahn's Algorithm (BFS Topological Sort)",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      description: "Count in-degrees; process 0 in-degree nodes. Graph is acyclic if all nodes are visited.",
      keyTakeaway: "Kahn's algorithm detects cycles in directed graphs in linear time.",
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int>> adj(n);
    vector<int> inDegree(n, 0);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[v].push_back(u);
        inDegree[u]++;
    }

    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    int visited = 0;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        visited++;
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) q.push(v);
        }
    }
    cout << (visited == n ? "true" : "false") << "\\n";
    return 0;
}`,
      python: `import sys
from collections import deque

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, m = int(raw[0]), int(raw[1])
    adj = [[] for _ in range(n)]
    in_degree = [0] * n
    idx = 2
    for _ in range(m):
        u, v = int(raw[idx]), int(raw[idx+1])
        adj[v].append(u)
        in_degree[u] += 1
        idx += 2

    q = deque([i for i in range(n) if in_degree[i] == 0])
    visited = 0
    while q:
        u = q.popleft()
        visited += 1
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)
    print("true" if visited == n else "false")

if __name__ == '__main__':
    solve()`
    }]
  },
  "97": {
    title: "Course Schedule II",
    edgeCases: ["Cycle present -> output -1", "Multiple valid topological orders"],
    dryRun: {
      description: "Collect order of vertices processed in Kahn's algorithm",
      headers: ["Step", "Queue", "Order"],
      rows: [["1", "[0]", "[0]"], ["2", "[1, 2]", "[0, 1, 2]"]]
    },
    approaches: [{
      id: "optimal",
      name: "Topological Sort (Kahn's BFS)",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      description: "Queue nodes with 0 in-degree. Record traversal order. If visited count < V, return -1.",
      keyTakeaway: "Topological ordering orders tasks according to prerequisite dependencies.",
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int>> adj(n);
    vector<int> inDegree(n, 0);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[v].push_back(u);
        inDegree[u]++;
    }

    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) q.push(v);
        }
    }
    if ((int)order.size() != n) {
        cout << -1 << "\\n";
    } else {
        for (int i = 0; i < n; i++) {
            cout << order[i] << (i == n - 1 ? "" : " ");
        }
        cout << "\\n";
    }
    return 0;
}`,
      python: `import sys
from collections import deque

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, m = int(raw[0]), int(raw[1])
    adj = [[] for _ in range(n)]
    in_degree = [0] * n
    idx = 2
    for _ in range(m):
        u, v = int(raw[idx]), int(raw[idx+1])
        adj[v].append(u)
        in_degree[u] += 1
        idx += 2

    q = deque([i for i in range(n) if in_degree[i] == 0])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)
    if len(order) != n:
        print(-1)
    else:
        print(" ".join(map(str, order)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "98": {
    title: "Flood Fill",
    edgeCases: ["Starting color already equal to new color", "1x1 image"],
    dryRun: {
      description: "DFS 4 directions updating connected component matching original color",
      headers: ["Pixel", "Original", "Updated To"],
      rows: [["(1, 1)", "1", "2"]]
    },
    approaches: [{
      id: "optimal",
      name: "Depth-First Search (Connected Component)",
      timeComplexity: "O(M * N)",
      spaceComplexity: "O(M * N)",
      description: "Recurse into adjacent pixels matching starting color and replace with new color.",
      keyTakeaway: "Check originalColor != newColor to prevent infinite recursion loop.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void dfs(vector<vector<int>>& img, int r, int c, int oldColor, int newColor) {
    if (r < 0 || r >= (int)img.size() || c < 0 || c >= (int)img[0].size() || img[r][c] != oldColor)
        return;
    img[r][c] = newColor;
    dfs(img, r + 1, c, oldColor, newColor);
    dfs(img, r - 1, c, oldColor, newColor);
    dfs(img, r, c + 1, oldColor, newColor);
    dfs(img, r, c - 1, oldColor, newColor);
}

int main() {
    int m, n, sr, sc, color;
    if (!(cin >> m >> n >> sr >> sc >> color)) return 0;
    vector<vector<int>> img(m, vector<int>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            cin >> img[i][j];

    if (img[sr][sc] != color) {
        dfs(img, sr, sc, img[sr][sc], color);
    }

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            cout << img[i][j] << (j == n - 1 ? "" : " ");
        }
        cout << "\\n";
    }
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    m, n, sr, sc, color = int(raw[0]), int(raw[1]), int(raw[2]), int(raw[3]), int(raw[4])
    idx = 5
    img = []
    for _ in range(m):
        img.append([int(x) for x in raw[idx:idx+n]])
        idx += n

    old_color = img[sr][sc]
    if old_color != color:
        def dfs(r, c):
            if r < 0 or r >= m or c < 0 or c >= n or img[r][c] != old_color:
                return
            img[r][c] = color
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
        dfs(sr, sc)

    for row in img:
        print(" ".join(map(str, row)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "99": {
    title: "0/1 Knapsack Problem",
    edgeCases: ["W = 0 -> 0", "All item weights exceed capacity W"],
    dryRun: {
      description: "dp[w] = max(dp[w], dp[w - wt] + val) backwards iteration",
      headers: ["Item (wt, val)", "w", "dp[w]"],
      rows: [["(1, 10)", "4", "10"], ["(2, 15)", "4", "25"], ["(3, 40)", "4", "55"]]
    },
    approaches: [{
      id: "optimal",
      name: "1D Space-Optimized Dynamic Programming",
      timeComplexity: "O(N * W)",
      spaceComplexity: "O(W)",
      description: "Iterate weights backwards from W down to wt[i] to ensure 0/1 item constraint.",
      keyTakeaway: "Backward loop preserves single-use invariant without a 2D table.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, W;
    if (!(cin >> n >> W)) return 0;
    vector<int> wt(n), val(n);
    for (int i = 0; i < n; i++) cin >> wt[i];
    for (int i = 0; i < n; i++) cin >> val[i];

    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    cout << dp[W] << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, W = int(raw[0]), int(raw[1])
    wt = [int(x) for x in raw[2:n+2]]
    val = [int(x) for x in raw[n+2:2*n+2]]

    dp = [0] * (W + 1)
    for i in range(n):
        for w in range(W, wt[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i])
    print(dp[W])

if __name__ == '__main__':
    solve()`
    }]
  },
  "100": {
    title: "Longest Common Subsequence",
    edgeCases: ["Strings have no common characters -> 0", "Identical strings"],
    dryRun: {
      description: "dp[i][j] = (text1[i-1] == text2[j-1]) ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])",
      headers: ["i", "j", "text1[i-1]", "text2[j-1]", "dp[j]"],
      rows: [["1", "1", "'a'", "'a'", "1"]]
    },
    approaches: [{
      id: "optimal",
      name: "2-Row Space-Optimized Dynamic Programming",
      timeComplexity: "O(M * N)",
      spaceComplexity: "O(N)",
      description: "Compute subsequence matches using previous and current row buffers.",
      keyTakeaway: "Transitions depend only on the immediate previous row.",
      cpp: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    string s1, s2;
    if (!(cin >> s1 >> s2)) return 0;
    int m = s1.length(), n = s2.length();
    vector<int> prev(n + 1, 0), curr(n + 1, 0);

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                curr[j] = 1 + prev[j - 1];
            } else {
                curr[j] = max(prev[j], curr[j - 1]);
            }
        }
        prev = curr;
    }
    cout << prev[n] << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    s1, s2 = raw[0], raw[1]
    m, n = len(s1), len(s2)
    prev = [0] * (n + 1)
    for i in range(1, m + 1):
        curr = [0] * (n + 1)
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                curr[j] = 1 + prev[j - 1]
            else:
                curr[j] = max(prev[j], curr[j - 1])
        prev = curr
    print(prev[n])

if __name__ == '__main__':
    solve()`
    }]
  }
};
