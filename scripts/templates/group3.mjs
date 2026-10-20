export const group3 = {
  51: {
    title: "Set Matrix Zeroes",
    cppSig: `class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def setZeroes(self, matrix: List[List[int]]) -> None:\n        """Do not return anything, modify matrix in-place instead."""\n        pass`,
    cppDriver: `int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<vector<int>> matrix(m, vector<int>(n));
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) cin >> matrix[i][j];
    Solution sol;
    sol.setZeroes(matrix);
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) cout << matrix[i][j] << (j + 1 == n ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    lines = sys.stdin.read().split()
    if not lines: sys.exit(0)
    m, n = int(lines[0]), int(lines[1])
    idx = 2
    matrix = []
    for _ in range(m):
        matrix.append([int(x) for x in lines[idx:idx+n]])
        idx += n
    sol = Solution()
    sol.setZeroes(matrix)
    for row in matrix: print(" ".join(map(str, row)))`
  },
  52: {
    title: "Pascal's Triangle",
    cppSig: `class Solution {\npublic:\n    vector<vector<int>> generate(int numRows) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def generate(self, numRows: int) -> List[List[int]]:\n        pass`,
    cppDriver: `int main() {
    int numRows;
    if (!(cin >> numRows)) return 0;
    Solution sol;
    vector<vector<int>> res = sol.generate(numRows);
    for (auto& row : res) {
        for (size_t j = 0; j < row.size(); j++) cout << row[j] << (j + 1 == row.size() ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    res = sol.generate(int(raw[0]))
    for row in res: print(" ".join(map(str, row)))`
  },
  53: {
    title: "Next Permutation",
    cppSig: `class Solution {\npublic:\n    void nextPermutation(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def nextPermutation(self, nums: List[int]) -> None:\n        """Do not return anything, modify nums in-place instead."""\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    sol.nextPermutation(nums);
    for (int i = 0; i < n; i++) cout << nums[i] << (i + 1 == n ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    sol.nextPermutation(nums)
    print(" ".join(map(str, nums)))`
  },
  54: {
    title: "Sort Colors",
    cppSig: `class Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def sortColors(self, nums: List[int]) -> None:\n        """Do not return anything, modify nums in-place instead."""\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    sol.sortColors(nums);
    for (int i = 0; i < n; i++) cout << nums[i] << (i + 1 == n ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    sol.sortColors(nums)
    print(" ".join(map(str, nums)))`
  },
  55: {
    title: "Merge Intervals",
    cppSig: `class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<vector<int>> intervals(n, vector<int>(2));
    for (int i = 0; i < n; i++) cin >> intervals[i][0] >> intervals[i][1];
    Solution sol;
    vector<vector<int>> res = sol.merge(intervals);
    for (auto& iv : res) cout << iv[0] << " " << iv[1] << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    intervals = []
    idx = 1
    for _ in range(n):
        intervals.append([int(raw[idx]), int(raw[idx+1])])
        idx += 2
    sol = Solution()
    res = sol.merge(intervals)
    for iv in res: print(f"{iv[0]} {iv[1]}")`
  },
  56: {
    title: "Find the Duplicate Number",
    cppSig: `class Solution {\npublic:\n    int findDuplicate(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def findDuplicate(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.findDuplicate(nums) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.findDuplicate(nums))`
  },
  57: {
    title: "Rotate Image",
    cppSig: `class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def rotate(self, matrix: List[List[int]]) -> None:\n        """Do not return anything, modify matrix in-place instead."""\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<vector<int>> matrix(n, vector<int>(n));
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) cin >> matrix[i][j];
    Solution sol;
    sol.rotate(matrix);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) cout << matrix[i][j] << (j + 1 == n ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    idx = 1
    matrix = []
    for _ in range(n):
        matrix.append([int(x) for x in raw[idx:idx+n]])
        idx += n
    sol = Solution()
    sol.rotate(matrix)
    for row in matrix: print(" ".join(map(str, row)))`
  },
  58: {
    title: "Spiral Matrix",
    cppSig: `class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:\n        pass`,
    cppDriver: `int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<vector<int>> matrix(m, vector<int>(n));
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) cin >> matrix[i][j];
    Solution sol;
    vector<int> res = sol.spiralOrder(matrix);
    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    m, n = int(raw[0]), int(raw[1])
    idx = 2
    matrix = []
    for _ in range(m):
        matrix.append([int(x) for x in raw[idx:idx+n]])
        idx += n
    sol = Solution()
    res = sol.spiralOrder(matrix)
    print(" ".join(map(str, res)))`
  },
  59: {
    title: "Majority Element",
    cppSig: `class Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.majorityElement(nums) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.majorityElement(nums))`
  },
  60: {
    title: "Majority Element II",
    cppSig: `class Solution {\npublic:\n    vector<int> majorityElement(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def majorityElement(self, nums: List[int]) -> List[int]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    vector<int> res = sol.majorityElement(nums);
    sort(res.begin(), res.end());
    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    res = sol.majorityElement(nums)
    res.sort()
    print(" ".join(map(str, res)))`
  },
  61: {
    title: "Pow(x, n)",
    cppSig: `class Solution {\npublic:\n    double myPow(double x, int n) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def myPow(self, x: float, n: int) -> float:\n        pass`,
    cppDriver: `int main() {
    double x; long long n;
    if (!(cin >> x >> n)) return 0;
    Solution sol;
    cout << fixed << setprecision(5) << sol.myPow(x, n) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    x, n = float(raw[0]), int(raw[1])
    sol = Solution()
    print(f"{sol.myPow(x, n):.5f}")`
  },
  62: {
    title: "Search a 2D Matrix",
    cppSig: `class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        pass`,
    cppDriver: `int main() {
    int m, n, target;
    if (!(cin >> m >> n >> target)) return 0;
    vector<vector<int>> matrix(m, vector<int>(n));
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) cin >> matrix[i][j];
    Solution sol;
    cout << (sol.searchMatrix(matrix, target) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    m, n, target = int(raw[0]), int(raw[1]), int(raw[2])
    idx = 3
    matrix = []
    for _ in range(m):
        matrix.append([int(x) for x in raw[idx:idx+n]])
        idx += n
    sol = Solution()
    print("true" if sol.searchMatrix(matrix, target) else "false")`
  },
  63: {
    title: "Unique Paths",
    cppSig: `class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    Solution sol;
    cout << sol.uniquePaths(m, n) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print(sol.uniquePaths(int(raw[0]), int(raw[1])))`
  },
  64: {
    title: "Inversion Count in Array",
    cppSig: `class Solution {\npublic:\n    long long inversionCount(vector<int>& arr) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def inversionCount(self, arr: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.inversionCount(arr) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    arr = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.inversionCount(arr))`
  },
  65: {
    title: "4Sum",
    cppSig: `class Solution {\npublic:\n    int fourSum(vector<long long>& nums, long long target) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def fourSum(self, nums: List[int], target: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int n; long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.fourSum(nums, target) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, target = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    print(sol.fourSum(nums, target))`
  },
  66: {
    title: "Longest Consecutive Sequence",
    cppSig: `class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def longestConsecutive(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n) || n == 0) { cout << 0 << "\\n"; return 0; }
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.longestConsecutive(nums) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) == 0: print(0); sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.longestConsecutive(nums))`
  },
  67: {
    title: "Largest Subarray with 0 Sum",
    cppSig: `class Solution {\npublic:\n    int maxLen(vector<int>& arr) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def maxLen(self, arr: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.maxLen(arr) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    arr = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.maxLen(arr))`
  },
  68: {
    title: "Subarray Sum Equals K",
    cppSig: `class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def subarraySum(self, nums: List[int], k: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.subarraySum(nums, k) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, k = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    print(sol.subarraySum(nums, k))`
  },
  69: {
    title: "Find Peak Element",
    cppSig: `class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def findPeakElement(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.findPeakElement(nums) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.findPeakElement(nums))`
  },
  70: {
    title: "Single Element in a Sorted Array",
    cppSig: `class Solution {\npublic:\n    int singleNonDuplicate(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def singleNonDuplicate(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.singleNonDuplicate(nums) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.singleNonDuplicate(nums))`
  },
  71: {
    title: "Search in Rotated Sorted Array II",
    cppSig: `class Solution {\npublic:\n    bool search(vector<int>& nums, int target) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def search(self, nums: List[int], target: int) -> bool:\n        pass`,
    cppDriver: `int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << (sol.search(nums, target) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, target = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    print("true" if sol.search(nums, target) else "false")`
  },
  72: {
    title: "Koko Eating Bananas",
    cppSig: `class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def minEatingSpeed(self, piles: List[int], h: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int n, h;
    if (!(cin >> n >> h)) return 0;
    vector<int> piles(n);
    for (int i = 0; i < n; i++) cin >> piles[i];
    Solution sol;
    cout << sol.minEatingSpeed(piles, h) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, h = int(raw[0]), int(raw[1])
    piles = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    print(sol.minEatingSpeed(piles, h))`
  },
  73: {
    title: "Aggressive Cows",
    cppSig: `class Solution {\npublic:\n    int aggressiveCows(vector<int>& stalls, int k) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def aggressiveCows(self, stalls: List[int], k: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> stalls(n);
    for (int i = 0; i < n; i++) cin >> stalls[i];
    Solution sol;
    cout << sol.aggressiveCows(stalls, k) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, k = int(raw[0]), int(raw[1])
    stalls = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    print(sol.aggressiveCows(stalls, k))`
  },
  74: {
    title: "Book Allocation Problem",
    cppSig: `class Solution {\npublic:\n    int findPages(vector<int>& arr, int m) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def findPages(self, arr: List[int], m: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    Solution sol;
    cout << sol.findPages(arr, m) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, m = int(raw[0]), int(raw[1])
    arr = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    print(sol.findPages(arr, m))`
  },
  75: {
    title: "Roman to Integer",
    cppSig: `class Solution {\npublic:\n    int romanToInt(string s) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def romanToInt(self, s: str) -> int:\n        pass`,
    cppDriver: `int main() {
    string s;
    if (!(cin >> s)) return 0;
    Solution sol;
    cout << sol.romanToInt(s) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print(sol.romanToInt(raw[0]))`
  }
};
