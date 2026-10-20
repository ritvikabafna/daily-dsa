import fs from 'fs';
import path from 'path';

// Definition of 100 LeetCode problem signatures and input/output handlers
// Each problem has:
// - cppSig: method declaration inside class Solution
// - pySig: method definition inside class Solution
// - cppExtra: ListNode or TreeNode definition comment if relevant
// - pyExtra: ListNode or TreeNode definition comment if relevant
// - cppCall: invocation & output code inside driver main()
// - pyCall: invocation & output code inside driver __main__

export const templatesData = {
  1: {
    name: "Two Sum",
    cppSig: `    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }`,
    pySig: `    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass`,
    cppDriver: `
int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target; cin >> target;
    Solution sol;
    vector<int> res = sol.twoSum(nums, target);
    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    target = int(raw[n+1])
    sol = Solution()
    res = sol.twoSum(nums, target)
    print(" ".join(map(str, res)))`
  },
  2: {
    name: "Best Time to Buy and Sell Stock",
    cppSig: `    int maxProfit(vector<int>& prices) {\n        \n    }`,
    pySig: `    def maxProfit(self, prices: List[int]) -> int:\n        pass`,
    cppDriver: `
int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> prices(n);
    for (int i = 0; i < n; i++) cin >> prices[i];
    Solution sol;
    cout << sol.maxProfit(prices) << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    prices = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.maxProfit(prices))`
  },
  3: {
    name: "Contains Duplicate",
    cppSig: `    bool containsDuplicate(vector<int>& nums) {\n        \n    }`,
    pySig: `    def containsDuplicate(self, nums: List[int]) -> bool:\n        pass`,
    cppDriver: `
int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << (sol.containsDuplicate(nums) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print("true" if sol.containsDuplicate(nums) else "false")`
  },
  4: {
    name: "Maximum Subarray",
    cppSig: `    int maxSubArray(vector<int>& nums) {\n        \n    }`,
    pySig: `    def maxSubArray(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `
int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.maxSubArray(nums) << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.maxSubArray(nums))`
  },
  5: {
    name: "Move Zeroes",
    cppSig: `    void moveZeroes(vector<int>& nums) {\n        \n    }`,
    pySig: `    def moveZeroes(self, nums: List[int]) -> None:\n        """Do not return anything, modify nums in-place instead."""\n        pass`,
    cppDriver: `
int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    sol.moveZeroes(nums);
    for (int i = 0; i < n; i++) cout << nums[i] << (i + 1 == n ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    sol.moveZeroes(nums)
    print(" ".join(map(str, nums)))`
  },
  6: {
    name: "Best Time to Buy and Sell Stock II",
    cppSig: `    int maxProfit(vector<int>& prices) {\n        \n    }`,
    pySig: `    def maxProfit(self, prices: List[int]) -> int:\n        pass`,
    cppDriver: `
int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> prices(n);
    for (int i = 0; i < n; i++) cin >> prices[i];
    Solution sol;
    cout << sol.maxProfit(prices) << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    prices = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.maxProfit(prices))`
  },
  7: {
    name: "Merge Sorted Array",
    cppSig: `    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        \n    }`,
    pySig: `    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:\n        """Do not return anything, modify nums1 in-place instead."""\n        pass`,
    cppDriver: `
int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<int> nums1(m + n), nums2(n);
    for (int i = 0; i < m + n; i++) cin >> nums1[i];
    for (int i = 0; i < n; i++) cin >> nums2[i];
    Solution sol;
    sol.merge(nums1, m, nums2, n);
    for (int i = 0; i < m + n; i++) cout << nums1[i] << (i + 1 == m + n ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    m, n = int(raw[0]), int(raw[1])
    nums1 = [int(x) for x in raw[2:2+m+n]]
    nums2 = [int(x) for x in raw[2+m+n:2+m+2*n]]
    sol = Solution()
    sol.merge(nums1, m, nums2, n)
    print(" ".join(map(str, nums1)))`
  },
  8: {
    name: "Remove Duplicates from Sorted Array",
    cppSig: `    int removeDuplicates(vector<int>& nums) {\n        \n    }`,
    pySig: `    def removeDuplicates(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `
int main() {
    int n;
    if (!(cin >> n)) return 0;
    if (n == 0) { cout << 0 << "\\n\\n"; return 0; }
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    int k = sol.removeDuplicates(nums);
    cout << k << "\\n";
    for (int i = 0; i < k; i++) cout << nums[i] << (i + 1 == k ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    if n == 0:
        print(0)
        sys.exit(0)
    sol = Solution()
    k = sol.removeDuplicates(nums)
    print(k)
    print(" ".join(map(str, nums[:k])))`
  },
  9: {
    name: "Rotate Array",
    cppSig: `    void rotate(vector<int>& nums, int k) {\n        \n    }`,
    pySig: `    def rotate(self, nums: List[int], k: int) -> None:\n        """Do not return anything, modify nums in-place instead."""\n        pass`,
    cppDriver: `
int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    sol.rotate(nums, k);
    for (int i = 0; i < n; i++) cout << nums[i] << (i + 1 == n ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, k = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    sol.rotate(nums, k)
    print(" ".join(map(str, nums)))`
  },
  10: {
    name: "Product of Array Except Self",
    cppSig: `    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }`,
    pySig: `    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        pass`,
    cppDriver: `
int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    vector<int> res = sol.productExceptSelf(nums);
    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    res = sol.productExceptSelf(nums)
    print(" ".join(map(str, res)))`
  },
  11: {
    name: "3Sum",
    cppSig: `    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }`,
    pySig: `    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        pass`,
    cppDriver: `
int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    vector<vector<int>> res = sol.threeSum(nums);
    cout << res.size() << "\\n";
    for (auto& row : res) {
        for (size_t i = 0; i < row.size(); i++) cout << row[i] << (i + 1 == row.size() ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    res = sol.threeSum(nums)
    print(len(res))
    for row in res:
        print(" ".join(map(str, row)))`
  },
  12: {
    name: "Valid Anagram",
    cppSig: `    bool isAnagram(string s, string t) {\n        \n    }`,
    pySig: `    def isAnagram(self, s: str, t: str) -> bool:\n        pass`,
    cppDriver: `
int main() {
    string s, t;
    if (!(cin >> s >> t)) return 0;
    Solution sol;
    cout << (sol.isAnagram(s, t) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    s, t = raw[0], raw[1]
    sol = Solution()
    print("true" if sol.isAnagram(s, t) else "false")`
  },
  13: {
    name: "Valid Palindrome",
    cppSig: `    bool isPalindrome(string s) {\n        \n    }`,
    pySig: `    def isPalindrome(self, s: str) -> bool:\n        pass`,
    cppDriver: `
int main() {
    string s;
    if (!getline(cin, s)) return 0;
    Solution sol;
    cout << (sol.isPalindrome(s) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    lines = sys.stdin.read().splitlines()
    s = lines[0] if lines else ""
    sol = Solution()
    print("true" if sol.isPalindrome(s) else "false")`
  },
  14: {
    name: "Longest Common Prefix",
    cppSig: `    string longestCommonPrefix(vector<string>& strs) {\n        \n    }`,
    pySig: `    def longestCommonPrefix(self, strs: List[str]) -> str:\n        pass`,
    cppDriver: `
int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<string> strs(n);
    for (int i = 0; i < n; i++) cin >> strs[i];
    Solution sol;
    cout << sol.longestCommonPrefix(strs) << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    strs = raw[1:n+1]
    sol = Solution()
    print(sol.longestCommonPrefix(strs))`
  },
  15: {
    name: "Reverse Words in a String",
    cppSig: `    string reverseWords(string s) {\n        \n    }`,
    pySig: `    def reverseWords(self, s: str) -> str:\n        pass`,
    cppDriver: `
int main() {
    string s;
    if (!getline(cin, s)) return 0;
    Solution sol;
    cout << sol.reverseWords(s) << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    s = sys.stdin.read().strip()
    sol = Solution()
    print(sol.reverseWords(s))`
  },
  16: {
    name: "Longest Substring Without Repeating Characters",
    cppSig: `    int lengthOfLongestSubstring(string s) {\n        \n    }`,
    pySig: `    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass`,
    cppDriver: `
int main() {
    string s;
    if (!getline(cin, s)) return 0;
    Solution sol;
    cout << sol.lengthOfLongestSubstring(s) << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    lines = sys.stdin.read().splitlines()
    s = lines[0] if lines else ""
    sol = Solution()
    print(sol.lengthOfLongestSubstring(s))`
  },
  17: {
    name: "String to Integer (atoi)",
    cppSig: `    int myAtoi(string s) {\n        \n    }`,
    pySig: `    def myAtoi(self, s: str) -> int:\n        pass`,
    cppDriver: `
int main() {
    string s;
    if (!getline(cin, s)) return 0;
    Solution sol;
    cout << sol.myAtoi(s) << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    lines = sys.stdin.read().splitlines()
    s = lines[0] if lines else ""
    sol = Solution()
    print(sol.myAtoi(s))`
  },
  18: {
    name: "Longest Palindromic Substring",
    cppSig: `    string longestPalindrome(string s) {\n        \n    }`,
    pySig: `    def longestPalindrome(self, s: str) -> str:\n        pass`,
    cppDriver: `
int main() {
    string s;
    if (!(cin >> s)) return 0;
    Solution sol;
    cout << sol.longestPalindrome(s) << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print(sol.longestPalindrome(raw[0]))`
  },
  19: {
    name: "Group Anagrams",
    cppSig: `    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        \n    }`,
    pySig: `    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        pass`,
    cppDriver: `
int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<string> strs(n);
    for (int i = 0; i < n; i++) cin >> strs[i];
    Solution sol;
    vector<vector<string>> res = sol.groupAnagrams(strs);
    cout << res.size() << "\\n";
    for (auto& group : res) {
        for (size_t i = 0; i < group.size(); i++) cout << group[i] << (i + 1 == group.size() ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    strs = raw[1:n+1]
    sol = Solution()
    res = sol.groupAnagrams(strs)
    print(len(res))
    for group in res:
        print(" ".join(group))`
  },
  20: {
    name: "Is Subsequence",
    cppSig: `    bool isSubsequence(string s, string t) {\n        \n    }`,
    pySig: `    def isSubsequence(self, s: str, t: str) -> bool:\n        pass`,
    cppDriver: `
int main() {
    string s, t;
    if (!(cin >> s >> t)) return 0;
    Solution sol;
    cout << (sol.isSubsequence(s, t) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `
if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    s, t = raw[0], raw[1]
    sol = Solution()
    print("true" if sol.isSubsequence(s, t) else "false")`
  }
};

console.log("Template data stub ready.");
