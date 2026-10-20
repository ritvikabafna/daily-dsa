export const chunk1Problems = [
  {
    id: 51,
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 54.3,
    description: "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's in place. Input format: First line has m and n. The next m lines each contain n integers.",
    examples: [
      { input: "3 3\n1 1 1\n1 0 1\n1 1 1", output: "1 0 1\n0 0 0\n1 0 1" }
    ],
    constraints: ["m == matrix.length", "n == matrix[0].length", "1 <= m, n <= 200", "-2^31 <= matrix[i][j] <= 2^31 - 1"],
    tags: ["Array", "Matrix"],
    hints: [
      "Can you use the first row and first column of the matrix itself as flags instead of allocating extra space?",
      "Keep a separate boolean variable for row 0 and/or col 0 to know if they originally contained any zeroes."
    ],
    testCases: [
      { input: "3 3\n1 1 1\n1 0 1\n1 1 1", expectedOutput: "1 0 1\n0 0 0\n1 0 1" },
      { input: "3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5", expectedOutput: "0 0 0 0\n0 4 5 0\n0 3 1 0" },
      { input: "1 2\n1 0", expectedOutput: "0 0" }
    ]
  },
  {
    id: 52,
    title: "Pascal's Triangle",
    difficulty: "Easy",
    topic: "Arrays",
    acceptance: 71.4,
    description: "Given an integer numRows, return the first numRows of Pascal's triangle. Input format: A single integer numRows. Output each row separated by spaces, one row per line.",
    examples: [
      { input: "5", output: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1" }
    ],
    constraints: ["1 <= numRows <= 30"],
    tags: ["Array", "Dynamic Programming"],
    hints: [
      "Each element at position j in row i is the sum of elements at j-1 and j from row i-1.",
      "The first and last element of each row is always 1."
    ],
    testCases: [
      { input: "5", expectedOutput: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1" },
      { input: "1", expectedOutput: "1" },
      { input: "2", expectedOutput: "1\n1 1" }
    ]
  },
  {
    id: 53,
    title: "Next Permutation",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 39.8,
    description: "Given an array of integers nums, find the next lexicographically greater permutation of its numbers. If no greater permutation exists, rearrange it as the lowest possible order (sorted in ascending order). Input format: Size n on first line, followed by n space-separated integers on the next line. Output: the resulting array space-separated.",
    examples: [
      { input: "3\n1 2 3", output: "1 3 2" },
      { input: "3\n3 2 1", output: "1 2 3" }
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 100"],
    tags: ["Array", "Two Pointers"],
    hints: [
      "Find the first index i from right to left where nums[i] < nums[i+1].",
      "Then find the smallest element from the right that is greater than nums[i], swap them, and reverse the suffix after index i."
    ],
    testCases: [
      { input: "3\n1 2 3", expectedOutput: "1 3 2" },
      { input: "3\n3 2 1", expectedOutput: "1 2 3" },
      { input: "3\n1 1 5", expectedOutput: "1 5 1" },
      { input: "1\n1", expectedOutput: "1" }
    ]
  },
  {
    id: 54,
    title: "Sort Colors",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 62.5,
    description: "Given an array nums with n objects colored red, white, or blue (represented by integers 0, 1, and 2), sort them in-place so that objects of the same color are adjacent, in order 0, 1, 2 (Dutch National Flag problem). Input format: n on first line, then n space-separated integers on second line.",
    examples: [
      { input: "6\n2 0 2 1 1 0", output: "0 0 1 1 2 2" }
    ],
    constraints: ["n == nums.length", "1 <= n <= 300", "nums[i] is either 0, 1, or 2."],
    tags: ["Array", "Two Pointers", "Sorting"],
    hints: [
      "Use three pointers: low, mid, and high.",
      "If nums[mid] == 0, swap with nums[low] and advance both. If 1, advance mid. If 2, swap with nums[high] and decrement high."
    ],
    testCases: [
      { input: "6\n2 0 2 1 1 0", expectedOutput: "0 0 1 1 2 2" },
      { input: "3\n2 0 1", expectedOutput: "0 1 2" },
      { input: "1\n0", expectedOutput: "0" }
    ]
  },
  {
    id: 55,
    title: "Merge Intervals",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 47.9,
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals. Input format: Number of intervals n on first line, followed by n lines each containing start and end integers. Output: Merged intervals each on a new line.",
    examples: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", output: "1 6\n8 10\n15 18" }
    ],
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti <= endi <= 10^4"],
    tags: ["Array", "Sorting"],
    hints: [
      "Sort intervals by their start time first.",
      "Iterate through sorted intervals. If the current interval starts before or at the end of the previous one, merge them by extending the end."
    ],
    testCases: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", expectedOutput: "1 6\n8 10\n15 18" },
      { input: "2\n1 4\n4 5", expectedOutput: "1 5" },
      { input: "1\n1 4", expectedOutput: "1 4" }
    ]
  },
  {
    id: 56,
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 60.1,
    description: "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive, there is only one repeated number. Return this repeated number without modifying the array and using O(1) extra space. Input format: Size k on first line, followed by k integers.",
    examples: [
      { input: "5\n1 3 4 2 2", output: "2" },
      { input: "5\n3 1 3 4 2", output: "3" }
    ],
    constraints: ["1 <= n <= 10^5", "nums.length == n + 1", "1 <= nums[i] <= n"],
    tags: ["Array", "Two Pointers", "Binary Search"],
    hints: [
      "Can you view this array as a linked list where nums[i] is the pointer to the next index?",
      "Use Floyd's Cycle Detection (Tortoise and Hare) algorithm to find the entry of the cycle."
    ],
    testCases: [
      { input: "5\n1 3 4 2 2", expectedOutput: "2" },
      { input: "5\n3 1 3 4 2", expectedOutput: "3" },
      { input: "4\n3 3 3 3", expectedOutput: "3" }
    ]
  },
  {
    id: 57,
    title: "Rotate Image",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 73.2,
    description: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place. Input format: First line has n. Next n lines each contain n integers. Output: The rotated matrix.",
    examples: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", output: "7 4 1\n8 5 2\n9 6 3" }
    ],
    constraints: ["n == matrix.length == matrix[i].length", "1 <= n <= 20", "-1000 <= matrix[i][j] <= 1000"],
    tags: ["Array", "Math", "Matrix"],
    hints: [
      "Rotating 90 degrees clockwise is equivalent to transposing the matrix, followed by reversing each row.",
      "Transpose matrix[i][j] with matrix[j][i], then reverse row by row."
    ],
    testCases: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "7 4 1\n8 5 2\n9 6 3" },
      { input: "1\n5", expectedOutput: "5" },
      { input: "2\n1 2\n3 4", expectedOutput: "3 1\n4 2" }
    ]
  },
  {
    id: 58,
    title: "Spiral Matrix",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 49.3,
    description: "Given an m x n matrix, return all elements of the matrix in spiral order. Input format: m and n on the first line, then m lines each with n integers. Output: All elements in spiral order space-separated on a single line.",
    examples: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", output: "1 2 3 6 9 8 7 4 5" }
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 10", "-100 <= matrix[i][j] <= 100"],
    tags: ["Array", "Matrix", "Simulation"],
    hints: [
      "Maintain four boundaries: top, bottom, left, right.",
      "Traverse right along top, down along right, left along bottom, up along left, shrinking boundaries after each step."
    ],
    testCases: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "1 2 3 6 9 8 7 4 5" },
      { input: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12", expectedOutput: "1 2 3 4 8 12 11 10 9 5 6 7" },
      { input: "1 1\n1", expectedOutput: "1" }
    ]
  },
  {
    id: 59,
    title: "Majority Element",
    difficulty: "Easy",
    topic: "Arrays",
    acceptance: 64.8,
    description: "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array. Input format: n on first line, followed by n integers.",
    examples: [
      { input: "3\n3 2 3", output: "3" },
      { input: "7\n2 2 1 1 1 2 2", output: "2" }
    ],
    constraints: ["n == nums.length", "1 <= n <= 5 * 10^4", "-10^9 <= nums[i] <= 10^9"],
    tags: ["Array", "Hash Table", "Divide and Conquer", "Counting"],
    hints: [
      "Can you solve it in O(N) time and O(1) space?",
      "Use Boyer-Moore Voting Algorithm: maintain a candidate and a count counter."
    ],
    testCases: [
      { input: "3\n3 2 3", expectedOutput: "3" },
      { input: "7\n2 2 1 1 1 2 2", expectedOutput: "2" },
      { input: "1\n10", expectedOutput: "10" }
    ]
  },
  {
    id: 60,
    title: "Majority Element II",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 47.6,
    description: "Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times. Input format: n on first line, followed by n integers. Output: space-separated elements sorted in ascending order.",
    examples: [
      { input: "3\n3 2 3", output: "3" },
      { input: "2\n1 2", output: "1 2" }
    ],
    constraints: ["1 <= nums.length <= 5 * 10^4", "-10^9 <= nums[i] <= 10^9"],
    tags: ["Array", "Hash Table", "Counting"],
    hints: [
      "There can be at most 2 elements that appear more than n/3 times.",
      "Extend Boyer-Moore voting with two candidates and two counters."
    ],
    testCases: [
      { input: "3\n3 2 3", expectedOutput: "3" },
      { input: "1\n1", expectedOutput: "1" },
      { input: "2\n1 2", expectedOutput: "1 2" }
    ]
  },
  {
    id: 61,
    title: "Pow(x, n)",
    difficulty: "Medium",
    topic: "Math",
    acceptance: 34.7,
    description: "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n). Input format: x (float) and n (integer) on a single line. Output the result rounded to 5 decimal places.",
    examples: [
      { input: "2.00000 10", output: "1024.00000" },
      { input: "2.10000 3", output: "9.26100" }
    ],
    constraints: ["-100.0 < x < 100.0", "-2^31 <= n <= 2^31-1", "n is an integer"],
    tags: ["Math", "Recursion"],
    hints: [
      "Binary exponentiation computes x^n in O(log n) multiplications.",
      "If n is even, x^n = (x * x)^(n / 2). If odd, x * x^(n - 1). Handle negative n by taking reciprocal."
    ],
    testCases: [
      { input: "2.00000 10", expectedOutput: "1024.00000" },
      { input: "2.10000 3", expectedOutput: "9.26100" },
      { input: "2.00000 -2", expectedOutput: "0.25000" }
    ]
  },
  {
    id: 62,
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    topic: "Binary Search",
    acceptance: 50.2,
    description: "You are given an m x n integer matrix with the properties that integers in each row are sorted from left to right, and the first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix or false otherwise. Input format: m, n, target on first line. Next m lines contain n integers each.",
    examples: [
      { input: "3 4 3\n1 3 5 7\n10 11 16 20\n23 30 34 60", output: "true" }
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 100", "-10^4 <= matrix[i][j], target <= 10^4"],
    tags: ["Array", "Binary Search", "Matrix"],
    hints: [
      "Notice that the matrix is virtually a single 1D sorted array of length m * n.",
      "Any index idx in [0, m*n - 1] maps to row = idx / n and col = idx % n."
    ],
    testCases: [
      { input: "3 4 3\n1 3 5 7\n10 11 16 20\n23 30 34 60", expectedOutput: "true" },
      { input: "3 4 13\n1 3 5 7\n10 11 16 20\n23 30 34 60", expectedOutput: "false" },
      { input: "1 1 0\n0", expectedOutput: "true" }
    ]
  },
  {
    id: 63,
    title: "Unique Paths",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    acceptance: 64.1,
    description: "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]) and wants to move to the bottom-right corner (grid[m - 1][n - 1]). The robot can only move either down or right at any point in time. Return the number of possible unique paths. Input format: m and n on a single line.",
    examples: [
      { input: "3 7", output: "28" },
      { input: "3 2", output: "3" }
    ],
    constraints: ["1 <= m, n <= 100"],
    tags: ["Math", "Dynamic Programming", "Combinatorics"],
    hints: [
      "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
      "Alternatively, this is a combinatorics problem: C(m + n - 2, m - 1)."
    ],
    testCases: [
      { input: "3 7", expectedOutput: "28" },
      { input: "3 2", expectedOutput: "3" },
      { input: "1 1", expectedOutput: "1" }
    ]
  },
  {
    id: 64,
    title: "Inversion Count in Array",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 41.5,
    description: "Given an array of integers arr[], find the inversion count in the array. Two array elements arr[i] and arr[j] form an inversion if arr[i] > arr[j] and i < j. Input format: n on first line, followed by n space-separated integers on the next line.",
    examples: [
      { input: "5\n2 4 1 3 5", output: "3" },
      { input: "3\n10 10 10", output: "0" }
    ],
    constraints: ["1 <= n <= 10^5", "1 <= arr[i] <= 10^9"],
    tags: ["Array", "Sorting", "Divide and Conquer"],
    hints: [
      "A brute force approach checks all pairs in O(N^2).",
      "During the merge step of Merge Sort, when arr[i] > arr[j] (i from left, j from right), all remaining elements in the left half are also greater than arr[j]."
    ],
    testCases: [
      { input: "5\n2 4 1 3 5", expectedOutput: "3" },
      { input: "3\n10 10 10", expectedOutput: "0" },
      { input: "4\n4 3 2 1", expectedOutput: "6" }
    ]
  },
  {
    id: 65,
    title: "4Sum",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 36.2,
    description: "Given an array nums of n integers, return the count of unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that a, b, c, and d are distinct and nums[a] + nums[b] + nums[c] + nums[d] == target. Input format: n and target on first line, followed by n space-separated integers on second line.",
    examples: [
      { input: "6 0\n1 0 -1 0 -2 2", output: "3" }
    ],
    constraints: ["1 <= nums.length <= 200", "-10^9 <= nums[i], target <= 10^9"],
    tags: ["Array", "Two Pointers", "Sorting"],
    hints: [
      "Sort the array first to handle duplicate elements seamlessly.",
      "Fix two pointers i and j with two nested loops, and use two pointers left and right for the remaining two elements."
    ],
    testCases: [
      { input: "6 0\n1 0 -1 0 -2 2", expectedOutput: "3" },
      { input: "5 8\n2 2 2 2 2", expectedOutput: "1" },
      { input: "4 0\n0 0 0 0", expectedOutput: "1" }
    ]
  }
];

export const chunk1Editorials = {
  "51": {
    title: "Set Matrix Zeroes",
    edgeCases: ["First row or first column contains zero originally", "1x1 or 1x2 matrix", "No zeroes in matrix"],
    dryRun: {
      description: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
      headers: ["Step", "Action", "State"],
      rows: [
        ["1", "Check col0 flag", "matrix[1][1] is 0 -> mark matrix[1][0]=0, matrix[0][1]=0"],
        ["2", "Iterate inner cells", "Row 1 and col 1 become 0"],
        ["3", "Update row0/col0", "Row 0 stays 1 0 1, col 0 stays 1 0 1"]
      ]
    },
    approaches: [{
      id: "optimal",
      name: "In-Place O(1) Space with First Row/Col Marker",
      timeComplexity: "O(M * N)",
      spaceComplexity: "O(1)",
      description: "Use matrix[0][..] and matrix[..][0] to track which rows and cols need zeroing. Keep a variable col0 for column 0.",
      keyTakeaway: "Reuse existing memory as marker arrays instead of creating extra memory.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<vector<int>> matrix(m, vector<int>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            cin >> matrix[i][j];

    int col0 = 1;
    for (int i = 0; i < m; i++) {
        if (matrix[i][0] == 0) col0 = 0;
        for (int j = 1; j < n; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    for (int i = m - 1; i >= 0; i--) {
        for (int j = n - 1; j >= 1; j--) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0)
                matrix[i][j] = 0;
        }
        if (col0 == 0) matrix[i][0] = 0;
    }

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            cout << matrix[i][j] << (j == n - 1 ? "" : " ");
        }
        cout << "\\n";
    }
    return 0;
}`,
      python: `import sys

def solve():
    lines = sys.stdin.read().split()
    if not lines:
        return
    m, n = int(lines[0]), int(lines[1])
    idx = 2
    matrix = []
    for _ in range(m):
        matrix.append([int(x) for x in lines[idx:idx+n]])
        idx += n

    col0 = 1
    for i in range(m):
        if matrix[i][0] == 0:
            col0 = 0
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    for i in range(m - 1, -1, -1):
        for j in range(n - 1, 0, -1):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
        if col0 == 0:
            matrix[i][0] = 0

    for row in matrix:
        print(" ".join(map(str, row)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "52": {
    title: "Pascal's Triangle",
    edgeCases: ["numRows = 1", "numRows = 2"],
    dryRun: {
      description: "Generate rows iteratively using row[j] = prev[j-1] + prev[j]",
      headers: ["Row", "Elements"],
      rows: [["1", "[1]"], ["2", "[1, 1]"], ["3", "[1, 2, 1]"]]
    },
    approaches: [{
      id: "optimal",
      name: "Iterative Construction",
      timeComplexity: "O(numRows²)",
      spaceComplexity: "O(numRows²)",
      description: "Initialize each row with 1s and fill inner elements using the sum of the two elements right above.",
      keyTakeaway: "Pascal identity C(n, k) = C(n-1, k-1) + C(n-1, k).",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int numRows;
    if (!(cin >> numRows)) return 0;
    vector<vector<int>> res;
    for (int i = 0; i < numRows; i++) {
        vector<int> row(i + 1, 1);
        for (int j = 1; j < i; j++) {
            row[j] = res[i - 1][j - 1] + res[i - 1][j];
        }
        res.push_back(row);
    }
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j <= i; j++) {
            cout << res[i][j] << (j == i ? "" : " ");
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
    numRows = int(raw[0])
    res = []
    for i in range(numRows):
        row = [1] * (i + 1)
        for j in range(1, i):
            row[j] = res[i - 1][j - 1] + res[i - 1][j]
        res.append(row)
        print(" ".join(map(str, row)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "53": {
    title: "Next Permutation",
    edgeCases: ["Already sorted descending -> wrap to ascending", "All identical numbers", "Length 1"],
    dryRun: {
      description: "nums = [1, 2, 3]",
      headers: ["Step", "Action"],
      rows: [["1", "Break point i = 1 (nums[1]=2 < nums[2]=3)"], ["2", "Swap 2 and 3"], ["3", "Reverse suffix -> [1, 3, 2]"]]
    },
    approaches: [{
      id: "optimal",
      name: "Single-Pass Pivot & Swap",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      description: "Find break point from right, find successor, swap, then reverse the rest.",
      keyTakeaway: "Generates lexicographically next permutation in linear time.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        int j = n - 1;
        while (nums[j] <= nums[i]) j--;
        swap(nums[i], nums[j]);
    }
    reverse(nums.begin() + i + 1, nums.end());

    for (int k = 0; k < n; k++) {
        cout << nums[k] << (k == n - 1 ? "" : " ");
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

    i = n - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    if i >= 0:
        j = n - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i + 1:] = reversed(nums[i + 1:])
    print(" ".join(map(str, nums)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "54": {
    title: "Sort Colors",
    edgeCases: ["Array with only 0s, 1s, or 2s", "Single element array"],
    dryRun: {
      description: "nums = [2, 0, 2, 1, 1, 0]",
      headers: ["Pointers", "Action"],
      rows: [["low=0, mid=0, high=5", "nums[mid]=2 -> swap(mid, high), high--"]]
    },
    approaches: [{
      id: "optimal",
      name: "Dutch National Flag Algorithm (3-way Partition)",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      description: "Maintain low, mid, and high pointers. Elements before low are 0, after high are 2, between low and mid-1 are 1.",
      keyTakeaway: "One-pass in-place sorting for three discrete keys.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low++], nums[mid++]);
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums[mid], nums[high--]);
        }
    }
    for (int i = 0; i < n; i++) cout << nums[i] << (i == n - 1 ? "" : " ");
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

    low, mid, high = 0, 0, n - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    print(" ".join(map(str, nums)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "55": {
    title: "Merge Intervals",
    edgeCases: ["Single interval", "Already non-overlapping intervals", "All intervals nested"],
    dryRun: {
      description: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
      headers: ["Interval", "Merged List"],
      rows: [["[1,3]", "[[1,3]]"], ["[2,6]", "Overlap -> [[1,6]]"], ["[8,10]", "No overlap -> [[1,6],[8,10]]"]]
    },
    approaches: [{
      id: "optimal",
      name: "Sort and Merge",
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      description: "Sort intervals by start time, then merge each interval into the last merged interval if overlapping.",
      keyTakeaway: "Sorting transforms a quadratic comparison problem into a linear merge scan.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> intervals(n);
    for (int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;

    sort(intervals.begin(), intervals.end());
    vector<pair<int, int>> merged;
    for (auto& iv : intervals) {
        if (merged.empty() || merged.back().second < iv.first) {
            merged.push_back(iv);
        } else {
            merged.back().second = max(merged.back().second, iv.second);
        }
    }
    for (auto& iv : merged) {
        cout << iv.first << " " << iv.second << "\\n";
    }
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    intervals = []
    idx = 1
    for _ in range(n):
        intervals.append([int(raw[idx]), int(raw[idx+1])])
        idx += 2

    intervals.sort(key=lambda x: x[0])
    merged = []
    for iv in intervals:
        if not merged or merged[-1][1] < iv[0]:
            merged.append(iv)
        else:
            merged[-1][1] = max(merged[-1][1], iv[1])
    for iv in merged:
        print(f"{iv[0]} {iv[1]}")

if __name__ == '__main__':
    solve()`
    }]
  },
  "56": {
    title: "Find the Duplicate Number",
    edgeCases: ["Duplicate repeated more than twice", "Smallest array of length 2"],
    dryRun: {
      description: "Floyd cycle detection treating array index as pointer",
      headers: ["Slow", "Fast", "Meeting Point"],
      rows: [["slow = nums[slow]", "fast = nums[nums[fast]]", "Find loop, reset slow to start"]]
    },
    approaches: [{
      id: "optimal",
      name: "Floyd's Tortoise and Hare (Cycle Detection)",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      description: "Treat array values as next pointers. Cycle entry point is the duplicate.",
      keyTakeaway: "Cycle detection applies to functional graphs with limited ranges.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);

    fast = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    cout << slow << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]

    slow = nums[0]
    fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break

    fast = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    print(slow)

if __name__ == '__main__':
    solve()`
    }]
  },
  "57": {
    title: "Rotate Image",
    edgeCases: ["1x1 matrix", "Even dimension matrix (2x2)"],
    dryRun: {
      description: "Transpose then reverse each row",
      headers: ["Step", "Matrix State"],
      rows: [["Transpose", "Rows become columns"], ["Reverse Rows", "Clockwise rotation achieved"]]
    },
    approaches: [{
      id: "optimal",
      name: "Transpose and Reverse",
      timeComplexity: "O(N²)",
      spaceComplexity: "O(1)",
      description: "In-place transpose across main diagonal, then reverse each row horizontally.",
      keyTakeaway: "Geometric decomposition of 90 deg clockwise rotation into reflection and inversion.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<vector<int>> matrix(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> matrix[i][j];

    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            swap(matrix[i][j], matrix[j][i]);

    for (int i = 0; i < n; i++)
        reverse(matrix[i].begin(), matrix[i].end());

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << matrix[i][j] << (j == n - 1 ? "" : " ");
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
    n = int(raw[0])
    idx = 1
    matrix = []
    for _ in range(n):
        matrix.append([int(x) for x in raw[idx:idx+n]])
        idx += n

    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    for i in range(n):
        matrix[i].reverse()
        print(" ".join(map(str, matrix[i])))

if __name__ == '__main__':
    solve()`
    }]
  },
  "58": {
    title: "Spiral Matrix",
    edgeCases: ["Single row", "Single column", "1x1 matrix"],
    dryRun: {
      description: "Boundary management top, bottom, left, right",
      headers: ["Boundary", "Action"],
      rows: [["Top to Right", "top++"], ["Right to Bottom", "right--"], ["Bottom to Left", "bottom--"]]
    },
    approaches: [{
      id: "optimal",
      name: "Boundary Traversal Simulation",
      timeComplexity: "O(M * N)",
      spaceComplexity: "O(1) auxiliary",
      description: "Traverse 4 directions updating bounds until all elements are visited.",
      keyTakeaway: "Keep strict boundary conditions to avoid double-processing row/col.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<vector<int>> matrix(m, vector<int>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            cin >> matrix[i][j];

    vector<int> res;
    int top = 0, bottom = m - 1, left = 0, right = n - 1;
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) res.push_back(matrix[top][j]);
        top++;
        for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (int j = right; j >= left; j--) res.push_back(matrix[bottom][j]);
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
            left++;
        }
    }
    for (size_t i = 0; i < res.size(); i++) {
        cout << res[i] << (i + 1 == res.size() ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    m, n = int(raw[0]), int(raw[1])
    idx = 2
    matrix = []
    for _ in range(m):
        matrix.append([int(x) for x in raw[idx:idx+n]])
        idx += n

    res = []
    top, bottom, left, right = 0, m - 1, 0, n - 1
    while top <= bottom and left <= right:
        for j in range(left, right + 1):
            res.append(matrix[top][j])
        top += 1
        for i in range(top, bottom + 1):
            res.append(matrix[i][right])
        right -= 1
        if top <= bottom:
            for j in range(right, left - 1, -1):
                res.append(matrix[bottom][j])
            bottom -= 1
        if left <= right:
            for i in range(bottom, top - 1, -1):
                res.append(matrix[i][left])
            left += 1
    print(" ".join(map(str, res)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "59": {
    title: "Majority Element",
    edgeCases: ["Array of length 1", "All elements identical"],
    dryRun: {
      description: "Boyer-Moore voting algorithm on [2, 2, 1, 1, 1, 2, 2]",
      headers: ["Elem", "Candidate", "Count"],
      rows: [["2", "2", "1"], ["2", "2", "2"], ["1", "2", "1"], ["2", "2", "2"]]
    },
    approaches: [{
      id: "optimal",
      name: "Boyer-Moore Voting Algorithm",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      description: "Cancel out dissimilar pairs. The element with frequency > n/2 always survives.",
      keyTakeaway: "Pairwise cancellation finds majority candidate in linear time with zero extra space.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int candidate = 0, count = 0;
    for (int num : nums) {
        if (count == 0) candidate = num;
        count += (num == candidate) ? 1 : -1;
    }
    cout << candidate << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]

    cand, count = 0, 0
    for num in nums:
        if count == 0:
            cand = num
        count += 1 if num == cand else -1
    print(cand)

if __name__ == '__main__':
    solve()`
    }]
  },
  "60": {
    title: "Majority Element II",
    edgeCases: ["No element > n/3", "Exactly 2 elements > n/3"],
    dryRun: {
      description: "Extend voting to two candidates and verify in second pass",
      headers: ["Step", "Action"],
      rows: [["Pass 1", "Track 2 candidates"], ["Pass 2", "Count frequencies to confirm > n/3"]]
    },
    approaches: [{
      id: "optimal",
      name: "Extended Boyer-Moore (2 Candidates)",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      description: "At most two elements can exceed n/3. Track 2 candidates and verify counts in second pass.",
      keyTakeaway: "Generalizes to k-1 candidates for > n/k majority elements.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int c1 = 0, c2 = 0, cnt1 = 0, cnt2 = 0;
    for (int num : nums) {
        if (num == c1) cnt1++;
        else if (num == c2) cnt2++;
        else if (cnt1 == 0) { c1 = num; cnt1 = 1; }
        else if (cnt2 == 0) { c2 = num; cnt2 = 1; }
        else { cnt1--; cnt2--; }
    }

    cnt1 = 0; cnt2 = 0;
    for (int num : nums) {
        if (num == c1) cnt1++;
        else if (num == c2) cnt2++;
    }

    vector<int> res;
    if (cnt1 > n / 3) res.push_back(c1);
    if (cnt2 > n / 3) res.push_back(c2);
    sort(res.begin(), res.end());

    for (size_t i = 0; i < res.size(); i++) {
        cout << res[i] << (i + 1 == res.size() ? "" : " ");
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

    c1, c2, cnt1, cnt2 = 0, 1, 0, 0
    for num in nums:
        if num == c1:
            cnt1 += 1
        elif num == c2:
            cnt2 += 1
        elif cnt1 == 0:
            c1, cnt1 = num, 1
        elif cnt2 == 0:
            c2, cnt2 = num, 1
        else:
            cnt1 -= 1
            cnt2 -= 1

    cnt1 = sum(1 for x in nums if x == c1)
    cnt2 = sum(1 for x in nums if x == c2)

    res = []
    if cnt1 > n // 3:
        res.append(c1)
    if cnt2 > n // 3 and c2 != c1:
        res.append(c2)
    res.sort()
    print(" ".join(map(str, res)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "61": {
    title: "Pow(x, n)",
    edgeCases: ["n is negative", "n = 0 -> 1.0", "x = 1.0 or -1.0"],
    dryRun: {
      description: "2^10 = (2*2)^5 = 4 * 4^4 = ...",
      headers: ["n", "x", "ans"],
      rows: [["10", "2", "1"], ["5", "4", "1"], ["4", "4", "4"], ["2", "16", "4"], ["0", "256", "1024"]]
    },
    approaches: [{
      id: "optimal",
      name: "Binary Exponentiation",
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      description: "Halve power each step and square base. Handle negative powers using reciprocal.",
      keyTakeaway: "Reduces exponentiation from linear iterations to logarithmic steps.",
      cpp: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double x;
    long long n;
    if (!(cin >> x >> n)) return 0;

    double ans = 1.0;
    long long exp = n;
    if (exp < 0) {
        x = 1.0 / x;
        exp = -exp;
    }
    while (exp > 0) {
        if (exp % 2 == 1) ans *= x;
        x *= x;
        exp /= 2;
    }
    cout << fixed << setprecision(5) << ans << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    x, n = float(raw[0]), int(raw[1])
    ans = 1.0
    exp = n
    if exp < 0:
        x = 1.0 / x
        exp = -exp
    while exp > 0:
        if exp % 2 == 1:
            ans *= x
        x *= x
        exp //= 2
    print(f"{ans:.5f}")

if __name__ == '__main__':
    solve()`
    }]
  },
  "62": {
    title: "Search a 2D Matrix",
    edgeCases: ["1x1 matrix", "Target less than smallest or greater than largest"],
    dryRun: {
      description: "Treat m x n as 1D array of length m*n",
      headers: ["mid", "row", "col", "val"],
      rows: [["5", "1", "1", "matrix[1][1]"]]
    },
    approaches: [{
      id: "optimal",
      name: "Standard Binary Search on Virtual 1D Array",
      timeComplexity: "O(log(M * N))",
      spaceComplexity: "O(1)",
      description: "Direct coordinate mapping row = mid / n, col = mid % n enables single binary search.",
      keyTakeaway: "Index arithmetic maps 2D grids seamlessly to 1D address space.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int m, n, target;
    if (!(cin >> m >> n >> target)) return 0;
    vector<vector<int>> matrix(m, vector<int>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            cin >> matrix[i][j];

    int low = 0, high = m * n - 1;
    bool found = false;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        int val = matrix[mid / n][mid % n];
        if (val == target) {
            found = true;
            break;
        } else if (val < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
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
    m, n, target = int(raw[0]), int(raw[1]), int(raw[2])
    idx = 3
    matrix = []
    for _ in range(m):
        matrix.append([int(x) for x in raw[idx:idx+n]])
        idx += n

    low, high = 0, m * n - 1
    found = False
    while low <= high:
        mid = (low + high) // 2
        val = matrix[mid // n][mid % n]
        if val == target:
            found = True
            break
        elif val < target:
            low = mid + 1
        else:
            high = mid - 1
    print("true" if found else "false")

if __name__ == '__main__':
    solve()`
    }]
  },
  "63": {
    title: "Unique Paths",
    edgeCases: ["m = 1 or n = 1 -> only 1 path"],
    dryRun: {
      description: "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
      headers: ["Grid", "dp row"],
      rows: [["Row 0", "1 1 1 1..."], ["Row 1", "1 2 3 4..."]]
    },
    approaches: [{
      id: "optimal",
      name: "Combinatorics / 1D DP",
      timeComplexity: "O(min(M, N))",
      spaceComplexity: "O(1)",
      description: "Total moves = (m - 1) down + (n - 1) right. Answer is C(m + n - 2, m - 1).",
      keyTakeaway: "Combinatorics calculates grid paths in linear time and constant space.",
      cpp: `#include <iostream>
using namespace std;

int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    int N = m + n - 2;
    int r = min(m - 1, n - 1);
    long long res = 1;
    for (int i = 1; i <= r; i++) {
        res = res * (N - r + i) / i;
    }
    cout << res << "\\n";
    return 0;
}`,
      python: `import sys
import math

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    m, n = int(raw[0]), int(raw[1])
    print(math.comb(m + n - 2, m - 1))

if __name__ == '__main__':
    solve()`
    }]
  },
  "64": {
    title: "Inversion Count in Array",
    edgeCases: ["Already sorted ascending -> 0 inversions", "Sorted descending -> n*(n-1)/2 inversions"],
    dryRun: {
      description: "During merge step, when right < left, count += (mid - i + 1)",
      headers: ["Subarray", "Inversions Added"],
      rows: [["Merge [2,4] and [1,3,5]", "1 < 2 -> adds 2 inversions"]]
    },
    approaches: [{
      id: "optimal",
      name: "Modified Merge Sort",
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      description: "Count cross inversions while merging two sorted halves in O(N log N).",
      keyTakeaway: "Merge sort divides and counts relative inversions efficiently.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

long long merge(vector<int>& arr, vector<int>& temp, int left, int mid, int right) {
    int i = left, j = mid + 1, k = left;
    long long invCount = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
            invCount += (mid - i + 1);
        }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (i = left; i <= right; i++) arr[i] = temp[i];
    return invCount;
}

long long mergeSort(vector<int>& arr, vector<int>& temp, int left, int right) {
    long long invCount = 0;
    if (left < right) {
        int mid = left + (right - left) / 2;
        invCount += mergeSort(arr, temp, left, mid);
        invCount += mergeSort(arr, temp, mid + 1, right);
        invCount += merge(arr, temp, left, mid, right);
    }
    return invCount;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n), temp(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << mergeSort(arr, temp, 0, n - 1) << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    arr = [int(x) for x in raw[1:n+1]]

    temp = [0] * n
    def merge(left, mid, right):
        i, j, k = left, mid + 1, left
        inv = 0
        while i <= mid and j <= right:
            if arr[i] <= arr[j]:
                temp[k] = arr[i]
                i += 1
            else:
                temp[k] = arr[j]
                j += 1
                inv += (mid - i + 1)
            k += 1
        while i <= mid:
            temp[k] = arr[i]
            i += 1
            k += 1
        while j <= right:
            temp[k] = arr[j]
            j += 1
            k += 1
        for idx in range(left, right + 1):
            arr[idx] = temp[idx]
        return inv

    def merge_sort(left, right):
        if left >= right:
            return 0
        mid = (left + right) // 2
        inv = merge_sort(left, mid) + merge_sort(mid + 1, right)
        inv += merge(left, mid, right)
        return inv

    print(merge_sort(0, n - 1))

if __name__ == '__main__':
    solve()`
    }]
  },
  "65": {
    title: "4Sum",
    edgeCases: ["Duplicates in input", "target requiring 64-bit integer sum"],
    dryRun: {
      description: "Sort array, fix two outer pointers, scan with two inner pointers",
      headers: ["Pointers", "Action"],
      rows: [["i=0, j=1", "left=2, right=n-1 -> check sum == target"]]
    },
    approaches: [{
      id: "optimal",
      name: "Sorted Two-Pointer with Duplicate Pruning",
      timeComplexity: "O(N³)",
      spaceComplexity: "O(1) auxiliary",
      description: "Sort array, fix first two pointers skipping identical values, then two-pointer search.",
      keyTakeaway: "Generalizes 2Sum / 3Sum to k-Sum with nested two-pointer passes.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    sort(nums.begin(), nums.end());
    int count = 0;
    for (int i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        for (int j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue;
            int left = j + 1, right = n - 1;
            while (left < right) {
                long long sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum == target) {
                    count++;
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    cout << count << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, target = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]
    nums.sort()

    count = 0
    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        for j in range(i + 1, n - 2):
            if j > i + 1 and nums[j] == nums[j - 1]:
                continue
            left, right = j + 1, n - 1
            while left < right:
                s = nums[i] + nums[j] + nums[left] + nums[right]
                if s == target:
                    count += 1
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif s < target:
                    left += 1
                else:
                    right -= 1
    print(count)

if __name__ == '__main__':
    solve()`
    }]
  }
};
