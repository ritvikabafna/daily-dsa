export const group1 = {
  1: {
    title: "Two Sum",
    cppSig: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass`,
    cppDriver: `int main() {
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
    pyDriver: `if __name__ == '__main__':
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
    title: "Best Time to Buy and Sell Stock",
    cppSig: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> prices(n);
    for (int i = 0; i < n; i++) cin >> prices[i];
    Solution sol;
    cout << sol.maxProfit(prices) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    prices = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.maxProfit(prices))`
  },
  3: {
    title: "Contains Duplicate",
    cppSig: `class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << (sol.containsDuplicate(nums) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print("true" if sol.containsDuplicate(nums) else "false")`
  },
  4: {
    title: "Maximum Subarray",
    cppSig: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.maxSubArray(nums) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.maxSubArray(nums))`
  },
  5: {
    title: "Move Zeroes",
    cppSig: `class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def moveZeroes(self, nums: List[int]) -> None:\n        """Do not return anything, modify nums in-place instead."""\n        pass`,
    cppDriver: `int main() {
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
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    sol.moveZeroes(nums)
    print(" ".join(map(str, nums)))`
  },
  6: {
    title: "Best Time to Buy and Sell Stock II",
    cppSig: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> prices(n);
    for (int i = 0; i < n; i++) cin >> prices[i];
    Solution sol;
    cout << sol.maxProfit(prices) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    prices = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.maxProfit(prices))`
  },
  7: {
    title: "Merge Sorted Array",
    cppSig: `class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:\n        """Do not return anything, modify nums1 in-place instead."""\n        pass`,
    cppDriver: `int main() {
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
    pyDriver: `if __name__ == '__main__':
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
    title: "Remove Duplicates from Sorted Array",
    cppSig: `class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def removeDuplicates(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
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
    pyDriver: `if __name__ == '__main__':
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
    title: "Rotate Array",
    cppSig: `class Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def rotate(self, nums: List[int], k: int) -> None:\n        """Do not return anything, modify nums in-place instead."""\n        pass`,
    cppDriver: `int main() {
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
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, k = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    sol.rotate(nums, k)
    print(" ".join(map(str, nums)))`
  },
  10: {
    title: "Product of Array Except Self",
    cppSig: `class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        pass`,
    cppDriver: `int main() {
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
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    res = sol.productExceptSelf(nums)
    print(" ".join(map(str, res)))`
  },
  11: {
    title: "3Sum",
    cppSig: `class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        pass`,
    cppDriver: `int main() {
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
    pyDriver: `if __name__ == '__main__':
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
    title: "Valid Anagram",
    cppSig: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        pass`,
    cppDriver: `int main() {
    string s, t;
    if (!(cin >> s >> t)) return 0;
    Solution sol;
    cout << (sol.isAnagram(s, t) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    s, t = raw[0], raw[1]
    sol = Solution()
    print("true" if sol.isAnagram(s, t) else "false")`
  },
  13: {
    title: "Valid Palindrome",
    cppSig: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        pass`,
    cppDriver: `int main() {
    string s;
    if (!getline(cin, s)) return 0;
    Solution sol;
    cout << (sol.isPalindrome(s) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    lines = sys.stdin.read().splitlines()
    s = lines[0] if lines else ""
    sol = Solution()
    print("true" if sol.isPalindrome(s) else "false")`
  },
  14: {
    title: "Longest Common Prefix",
    cppSig: `class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def longestCommonPrefix(self, strs: List[str]) -> str:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<string> strs(n);
    for (int i = 0; i < n; i++) cin >> strs[i];
    Solution sol;
    cout << sol.longestCommonPrefix(strs) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    strs = raw[1:n+1]
    sol = Solution()
    print(sol.longestCommonPrefix(strs))`
  },
  15: {
    title: "Reverse Words in a String",
    cppSig: `class Solution {\npublic:\n    string reverseWords(string s) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def reverseWords(self, s: str) -> str:\n        pass`,
    cppDriver: `int main() {
    string s;
    if (!getline(cin, s)) return 0;
    Solution sol;
    cout << sol.reverseWords(s) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    s = sys.stdin.read().strip()
    sol = Solution()
    print(sol.reverseWords(s))`
  },
  16: {
    title: "Longest Substring Without Repeating Characters",
    cppSig: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass`,
    cppDriver: `int main() {
    string s;
    if (!getline(cin, s)) return 0;
    Solution sol;
    cout << sol.lengthOfLongestSubstring(s) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    lines = sys.stdin.read().splitlines()
    s = lines[0] if lines else ""
    sol = Solution()
    print(sol.lengthOfLongestSubstring(s))`
  },
  17: {
    title: "String to Integer (atoi)",
    cppSig: `class Solution {\npublic:\n    int myAtoi(string s) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def myAtoi(self, s: str) -> int:\n        pass`,
    cppDriver: `int main() {
    string s;
    if (!getline(cin, s)) return 0;
    Solution sol;
    cout << sol.myAtoi(s) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    lines = sys.stdin.read().splitlines()
    s = lines[0] if lines else ""
    sol = Solution()
    print(sol.myAtoi(s))`
  },
  18: {
    title: "Longest Palindromic Substring",
    cppSig: `class Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        pass`,
    cppDriver: `int main() {
    string s;
    if (!(cin >> s)) return 0;
    Solution sol;
    cout << sol.longestPalindrome(s) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print(sol.longestPalindrome(raw[0]))`
  },
  19: {
    title: "Group Anagrams",
    cppSig: `class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        pass`,
    cppDriver: `int main() {
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
    pyDriver: `if __name__ == '__main__':
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
    title: "Is Subsequence",
    cppSig: `class Solution {\npublic:\n    bool isSubsequence(string s, string t) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def isSubsequence(self, s: str, t: str) -> bool:\n        pass`,
    cppDriver: `int main() {
    string s, t;
    if (!(cin >> s >> t)) return 0;
    Solution sol;
    cout << (sol.isSubsequence(s, t) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    s, t = raw[0], raw[1]
    sol = Solution()
    print("true" if sol.isSubsequence(s, t) else "false")`
  },
  21: {
    title: "First Unique Character in a String",
    cppSig: `class Solution {\npublic:\n    int firstUniqChar(string s) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def firstUniqChar(self, s: str) -> int:\n        pass`,
    cppDriver: `int main() {
    string s;
    if (!(cin >> s)) return 0;
    Solution sol;
    cout << sol.firstUniqChar(s) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print(sol.firstUniqChar(raw[0]))`
  },
  22: {
    title: "Reverse Linked List",
    cppSig: `/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};`,
    pySig: `# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    ListNode dummy(0);
    ListNode* curr = &dummy;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        curr->next = new ListNode(x);
        curr = curr->next;
    }
    Solution sol;
    ListNode* head = sol.reverseList(dummy.next);
    while (head) {
        cout << head->val << (head->next ? " " : "");
        head = head->next;
    }
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 0: sys.exit(0)
    n = int(raw[0])
    vals = [int(x) for x in raw[1:n+1]]
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    sol = Solution()
    head = sol.reverseList(dummy.next)
    res = []
    while head:
        res.append(str(head.val))
        head = head.next
    print(" ".join(res))`
  },
  23: {
    title: "Middle of the Linked List",
    cppSig: `class Solution {\npublic:\n    ListNode* middleNode(ListNode* head) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    ListNode dummy(0);
    ListNode* curr = &dummy;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        curr->next = new ListNode(x);
        curr = curr->next;
    }
    Solution sol;
    ListNode* mid = sol.middleNode(dummy.next);
    while (mid) {
        cout << mid->val << (mid->next ? " " : "");
        mid = mid->next;
    }
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 0: sys.exit(0)
    n = int(raw[0])
    vals = [int(x) for x in raw[1:n+1]]
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    sol = Solution()
    mid = sol.middleNode(dummy.next)
    res = []
    while mid:
        res.append(str(mid.val))
        mid = mid.next
    print(" ".join(res))`
  },
  24: {
    title: "Linked List Cycle",
    cppSig: `class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        pass`,
    cppDriver: `int main() {
    int n, pos;
    if (!(cin >> n >> pos)) return 0;
    vector<ListNode*> nodes(n);
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        nodes[i] = new ListNode(x);
        if (i > 0) nodes[i - 1]->next = nodes[i];
    }
    if (pos >= 0 && pos < n) nodes[n - 1]->next = nodes[pos];
    Solution sol;
    cout << (sol.hasCycle(n > 0 ? nodes[0] : nullptr) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, pos = int(raw[0]), int(raw[1])
    vals = [int(x) for x in raw[2:2+n]]
    nodes = [ListNode(v) for v in vals]
    for i in range(n - 1):
        nodes[i].next = nodes[i + 1]
    if 0 <= pos < n:
        nodes[-1].next = nodes[pos]
    sol = Solution()
    print("true" if sol.hasCycle(nodes[0] if n > 0 else None) else "false")`
  },
  25: {
    title: "Merge Two Sorted Lists",
    cppSig: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        pass`,
    cppDriver: `int main() {
    int n1, n2;
    if (!(cin >> n1 >> n2)) return 0;
    ListNode d1(0), d2(0);
    ListNode* c1 = &d1;
    for (int i = 0; i < n1; i++) { int x; cin >> x; c1->next = new ListNode(x); c1 = c1->next; }
    ListNode* c2 = &d2;
    for (int i = 0; i < n2; i++) { int x; cin >> x; c2->next = new ListNode(x); c2 = c2->next; }
    Solution sol;
    ListNode* merged = sol.mergeTwoLists(d1.next, d2.next);
    while (merged) {
        cout << merged->val << (merged->next ? " " : "");
        merged = merged->next;
    }
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n1, n2 = int(raw[0]), int(raw[1])
    vals1 = [int(x) for x in raw[2:2+n1]]
    vals2 = [int(x) for x in raw[2+n1:2+n1+n2]]
    d1, d2 = ListNode(0), ListNode(0)
    c1, c2 = d1, d2
    for v in vals1: c1.next = ListNode(v); c1 = c1.next
    for v in vals2: c2.next = ListNode(v); c2 = c2.next
    sol = Solution()
    merged = sol.mergeTwoLists(d1.next, d2.next)
    res = []
    while merged:
        res.append(str(merged.val))
        merged = merged.next
    print(" ".join(res))`
  }
};
