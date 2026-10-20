// Harness to wrap LeetCode-style Solution class code with driver main()
export const PROBLEM_DRIVERS = {
  "1": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    int target; cin >> target;\n    Solution sol;\n    vector<int> res = sol.twoSum(nums, target);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    target = int(raw[n+1])\n    sol = Solution()\n    res = sol.twoSum(nums, target)\n    print(\" \".join(map(str, res)))"
  },
  "2": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> prices(n);\n    for (int i = 0; i < n; i++) cin >> prices[i];\n    Solution sol;\n    cout << sol.maxProfit(prices) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    prices = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.maxProfit(prices))"
  },
  "3": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << (sol.containsDuplicate(nums) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(\"true\" if sol.containsDuplicate(nums) else \"false\")"
  },
  "4": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.maxSubArray(nums) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.maxSubArray(nums))"
  },
  "5": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    sol.moveZeroes(nums);\n    for (int i = 0; i < n; i++) cout << nums[i] << (i + 1 == n ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    sol.moveZeroes(nums)\n    print(\" \".join(map(str, nums)))"
  },
  "6": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> prices(n);\n    for (int i = 0; i < n; i++) cin >> prices[i];\n    Solution sol;\n    cout << sol.maxProfit(prices) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    prices = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.maxProfit(prices))"
  },
  "7": {
    "cpp": "int main() {\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    vector<int> nums1(m + n), nums2(n);\n    for (int i = 0; i < m + n; i++) cin >> nums1[i];\n    for (int i = 0; i < n; i++) cin >> nums2[i];\n    Solution sol;\n    sol.merge(nums1, m, nums2, n);\n    for (int i = 0; i < m + n; i++) cout << nums1[i] << (i + 1 == m + n ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    m, n = int(raw[0]), int(raw[1])\n    nums1 = [int(x) for x in raw[2:2+m+n]]\n    nums2 = [int(x) for x in raw[2+m+n:2+m+2*n]]\n    sol = Solution()\n    sol.merge(nums1, m, nums2, n)\n    print(\" \".join(map(str, nums1)))"
  },
  "8": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    if (n == 0) { cout << 0 << \"\\n\\n\"; return 0; }\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    int k = sol.removeDuplicates(nums);\n    cout << k << \"\\n\";\n    for (int i = 0; i < k; i++) cout << nums[i] << (i + 1 == k ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    if n == 0:\n        print(0)\n        sys.exit(0)\n    sol = Solution()\n    k = sol.removeDuplicates(nums)\n    print(k)\n    print(\" \".join(map(str, nums[:k])))"
  },
  "9": {
    "cpp": "int main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    sol.rotate(nums, k);\n    for (int i = 0; i < n; i++) cout << nums[i] << (i + 1 == n ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, k = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    sol.rotate(nums, k)\n    print(\" \".join(map(str, nums)))"
  },
  "10": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    vector<int> res = sol.productExceptSelf(nums);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    res = sol.productExceptSelf(nums)\n    print(\" \".join(map(str, res)))"
  },
  "11": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    vector<vector<int>> res = sol.threeSum(nums);\n    cout << res.size() << \"\\n\";\n    for (auto& row : res) {\n        for (size_t i = 0; i < row.size(); i++) cout << row[i] << (i + 1 == row.size() ? \"\" : \" \");\n        cout << \"\\n\";\n    }\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    res = sol.threeSum(nums)\n    print(len(res))\n    for row in res:\n        print(\" \".join(map(str, row)))"
  },
  "12": {
    "cpp": "int main() {\n    string s, t;\n    if (!(cin >> s >> t)) return 0;\n    Solution sol;\n    cout << (sol.isAnagram(s, t) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    s, t = raw[0], raw[1]\n    sol = Solution()\n    print(\"true\" if sol.isAnagram(s, t) else \"false\")"
  },
  "13": {
    "cpp": "int main() {\n    string s;\n    if (!getline(cin, s)) return 0;\n    Solution sol;\n    cout << (sol.isPalindrome(s) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    s = lines[0] if lines else \"\"\n    sol = Solution()\n    print(\"true\" if sol.isPalindrome(s) else \"false\")"
  },
  "14": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<string> strs(n);\n    for (int i = 0; i < n; i++) cin >> strs[i];\n    Solution sol;\n    cout << sol.longestCommonPrefix(strs) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    strs = raw[1:n+1]\n    sol = Solution()\n    print(sol.longestCommonPrefix(strs))"
  },
  "15": {
    "cpp": "int main() {\n    string s;\n    if (!getline(cin, s)) return 0;\n    Solution sol;\n    cout << sol.reverseWords(s) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    s = sys.stdin.read().strip()\n    sol = Solution()\n    print(sol.reverseWords(s))"
  },
  "16": {
    "cpp": "int main() {\n    string s;\n    if (!getline(cin, s)) return 0;\n    Solution sol;\n    cout << sol.lengthOfLongestSubstring(s) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    s = lines[0] if lines else \"\"\n    sol = Solution()\n    print(sol.lengthOfLongestSubstring(s))"
  },
  "17": {
    "cpp": "int main() {\n    string s;\n    if (!getline(cin, s)) return 0;\n    Solution sol;\n    cout << sol.myAtoi(s) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    s = lines[0] if lines else \"\"\n    sol = Solution()\n    print(sol.myAtoi(s))"
  },
  "18": {
    "cpp": "int main() {\n    string s;\n    if (!(cin >> s)) return 0;\n    Solution sol;\n    cout << sol.longestPalindrome(s) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    print(sol.longestPalindrome(raw[0]))"
  },
  "19": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<string> strs(n);\n    for (int i = 0; i < n; i++) cin >> strs[i];\n    Solution sol;\n    vector<vector<string>> res = sol.groupAnagrams(strs);\n    cout << res.size() << \"\\n\";\n    for (auto& group : res) {\n        for (size_t i = 0; i < group.size(); i++) cout << group[i] << (i + 1 == group.size() ? \"\" : \" \");\n        cout << \"\\n\";\n    }\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    strs = raw[1:n+1]\n    sol = Solution()\n    res = sol.groupAnagrams(strs)\n    print(len(res))\n    for group in res:\n        print(\" \".join(group))"
  },
  "20": {
    "cpp": "int main() {\n    string s, t;\n    if (!(cin >> s >> t)) return 0;\n    Solution sol;\n    cout << (sol.isSubsequence(s, t) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    s, t = raw[0], raw[1]\n    sol = Solution()\n    print(\"true\" if sol.isSubsequence(s, t) else \"false\")"
  },
  "21": {
    "cpp": "int main() {\n    string s;\n    if (!(cin >> s)) return 0;\n    Solution sol;\n    cout << sol.firstUniqChar(s) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    print(sol.firstUniqChar(raw[0]))"
  },
  "22": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n) || n <= 0) return 0;\n    ListNode dummy(0);\n    ListNode* curr = &dummy;\n    for (int i = 0; i < n; i++) {\n        int x; cin >> x;\n        curr->next = new ListNode(x);\n        curr = curr->next;\n    }\n    Solution sol;\n    ListNode* head = sol.reverseList(dummy.next);\n    while (head) {\n        cout << head->val << (head->next ? \" \" : \"\");\n        head = head->next;\n    }\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0: sys.exit(0)\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    dummy = ListNode(0)\n    curr = dummy\n    for v in vals:\n        curr.next = ListNode(v)\n        curr = curr.next\n    sol = Solution()\n    head = sol.reverseList(dummy.next)\n    res = []\n    while head:\n        res.append(str(head.val))\n        head = head.next\n    print(\" \".join(res))"
  },
  "23": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n) || n <= 0) return 0;\n    ListNode dummy(0);\n    ListNode* curr = &dummy;\n    for (int i = 0; i < n; i++) {\n        int x; cin >> x;\n        curr->next = new ListNode(x);\n        curr = curr->next;\n    }\n    Solution sol;\n    ListNode* mid = sol.middleNode(dummy.next);\n    while (mid) {\n        cout << mid->val << (mid->next ? \" \" : \"\");\n        mid = mid->next;\n    }\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0: sys.exit(0)\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    dummy = ListNode(0)\n    curr = dummy\n    for v in vals:\n        curr.next = ListNode(v)\n        curr = curr.next\n    sol = Solution()\n    mid = sol.middleNode(dummy.next)\n    res = []\n    while mid:\n        res.append(str(mid.val))\n        mid = mid.next\n    print(\" \".join(res))"
  },
  "24": {
    "cpp": "int main() {\n    int n, pos;\n    if (!(cin >> n >> pos)) return 0;\n    vector<ListNode*> nodes(n);\n    for (int i = 0; i < n; i++) {\n        int x; cin >> x;\n        nodes[i] = new ListNode(x);\n        if (i > 0) nodes[i - 1]->next = nodes[i];\n    }\n    if (pos >= 0 && pos < n) nodes[n - 1]->next = nodes[pos];\n    Solution sol;\n    cout << (sol.hasCycle(n > 0 ? nodes[0] : nullptr) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, pos = int(raw[0]), int(raw[1])\n    vals = [int(x) for x in raw[2:2+n]]\n    nodes = [ListNode(v) for v in vals]\n    for i in range(n - 1):\n        nodes[i].next = nodes[i + 1]\n    if 0 <= pos < n:\n        nodes[-1].next = nodes[pos]\n    sol = Solution()\n    print(\"true\" if sol.hasCycle(nodes[0] if n > 0 else None) else \"false\")"
  },
  "25": {
    "cpp": "int main() {\n    int n1, n2;\n    if (!(cin >> n1 >> n2)) return 0;\n    ListNode d1(0), d2(0);\n    ListNode* c1 = &d1;\n    for (int i = 0; i < n1; i++) { int x; cin >> x; c1->next = new ListNode(x); c1 = c1->next; }\n    ListNode* c2 = &d2;\n    for (int i = 0; i < n2; i++) { int x; cin >> x; c2->next = new ListNode(x); c2 = c2->next; }\n    Solution sol;\n    ListNode* merged = sol.mergeTwoLists(d1.next, d2.next);\n    while (merged) {\n        cout << merged->val << (merged->next ? \" \" : \"\");\n        merged = merged->next;\n    }\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n1, n2 = int(raw[0]), int(raw[1])\n    vals1 = [int(x) for x in raw[2:2+n1]]\n    vals2 = [int(x) for x in raw[2+n1:2+n1+n2]]\n    d1, d2 = ListNode(0), ListNode(0)\n    c1, c2 = d1, d2\n    for v in vals1: c1.next = ListNode(v); c1 = c1.next\n    for v in vals2: c2.next = ListNode(v); c2 = c2.next\n    sol = Solution()\n    merged = sol.mergeTwoLists(d1.next, d2.next)\n    res = []\n    while merged:\n        res.append(str(merged.val))\n        merged = merged.next\n    print(\" \".join(res))"
  },
  "26": {
    "cpp": "int main() {\n    int n, val;\n    if (!(cin >> n >> val)) return 0;\n    ListNode dummy(0);\n    ListNode* curr = &dummy;\n    for (int i = 0; i < n; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }\n    Solution sol;\n    ListNode* res = sol.removeElements(dummy.next, val);\n    while (res) {\n        cout << res->val << (res->next ? \" \" : \"\");\n        res = res->next;\n    }\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, val = int(raw[0]), int(raw[1])\n    vals = [int(x) for x in raw[2:2+n]]\n    dummy = ListNode(0)\n    curr = dummy\n    for v in vals: curr.next = ListNode(v); curr = curr.next\n    sol = Solution()\n    head = sol.removeElements(dummy.next, val)\n    res = []\n    while head: res.append(str(head.val)); head = head.next\n    print(\" \".join(res))"
  },
  "27": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n) || n <= 0) return 0;\n    ListNode dummy(0);\n    ListNode* curr = &dummy;\n    for (int i = 0; i < n; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }\n    Solution sol;\n    cout << (sol.isPalindrome(dummy.next) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0: sys.exit(0)\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    dummy = ListNode(0)\n    curr = dummy\n    for v in vals: curr.next = ListNode(v); curr = curr.next\n    sol = Solution()\n    print(\"true\" if sol.isPalindrome(dummy.next) else \"false\")"
  },
  "28": {
    "cpp": "int main() {\n    int nA, nB, intersectVal;\n    if (!(cin >> nA >> nB >> intersectVal)) return 0;\n    ListNode dA(0), dB(0);\n    ListNode* cA = &dA;\n    ListNode* target = nullptr;\n    for (int i = 0; i < nA; i++) {\n        int x; cin >> x;\n        cA->next = new ListNode(x);\n        cA = cA->next;\n        if (x == intersectVal && !target) target = cA;\n    }\n    ListNode* cB = &dB;\n    for (int i = 0; i < nB; i++) {\n        int x; cin >> x;\n        if (target && x == intersectVal) {\n            cB->next = target;\n            break;\n        } else {\n            cB->next = new ListNode(x);\n            cB = cB->next;\n        }\n    }\n    Solution sol;\n    ListNode* res = sol.getIntersectionNode(dA.next, dB.next);\n    cout << (res ? res->val : 0) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    nA, nB, inter = int(raw[0]), int(raw[1]), int(raw[2])\n    valsA = [int(x) for x in raw[3:3+nA]]\n    valsB = [int(x) for x in raw[3+nA:3+nA+nB]]\n    dA, dB = ListNode(0), ListNode(0)\n    cA = dA\n    target = None\n    for v in valsA:\n        cA.next = ListNode(v); cA = cA.next\n        if v == inter and not target: target = cA\n    cB = dB\n    for v in valsB:\n        if target and v == inter:\n            cB.next = target\n            break\n        cB.next = ListNode(v); cB = cB.next\n    sol = Solution()\n    res = sol.getIntersectionNode(dA.next, dB.next)\n    print(res.val if res else 0)"
  },
  "29": {
    "cpp": "int main() {\n    int sz, n;\n    if (!(cin >> sz >> n)) return 0;\n    ListNode dummy(0);\n    ListNode* curr = &dummy;\n    for (int i = 0; i < sz; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }\n    Solution sol;\n    ListNode* res = sol.removeNthFromEnd(dummy.next, n);\n    while (res) {\n        cout << res->val << (res->next ? \" \" : \"\");\n        res = res->next;\n    }\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sz, n = int(raw[0]), int(raw[1])\n    vals = [int(x) for x in raw[2:2+sz]]\n    dummy = ListNode(0)\n    curr = dummy\n    for v in vals: curr.next = ListNode(v); curr = curr.next\n    sol = Solution()\n    head = sol.removeNthFromEnd(dummy.next, n)\n    res = []\n    while head: res.append(str(head.val)); head = head.next\n    print(\" \".join(res))"
  },
  "30": {
    "cpp": "int main() {\n    int n1, n2;\n    if (!(cin >> n1 >> n2)) return 0;\n    ListNode d1(0), d2(0);\n    ListNode* c1 = &d1; for (int i = 0; i < n1; i++) { int x; cin >> x; c1->next = new ListNode(x); c1 = c1->next; }\n    ListNode* c2 = &d2; for (int i = 0; i < n2; i++) { int x; cin >> x; c2->next = new ListNode(x); c2 = c2->next; }\n    Solution sol;\n    ListNode* sum = sol.addTwoNumbers(d1.next, d2.next);\n    while (sum) {\n        cout << sum->val << (sum->next ? \" \" : \"\");\n        sum = sum->next;\n    }\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n1, n2 = int(raw[0]), int(raw[1])\n    vals1 = [int(x) for x in raw[2:2+n1]]\n    vals2 = [int(x) for x in raw[2+n1:2+n1+n2]]\n    d1, d2 = ListNode(0), ListNode(0)\n    c1, c2 = d1, d2\n    for v in vals1: c1.next = ListNode(v); c1 = c1.next\n    for v in vals2: c2.next = ListNode(v); c2 = c2.next\n    sol = Solution()\n    head = sol.addTwoNumbers(d1.next, d2.next)\n    res = []\n    while head: res.append(str(head.val)); head = head.next\n    print(\" \".join(res))"
  },
  "31": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n) || n <= 0) return 0;\n    ListNode dummy(0);\n    ListNode* curr = &dummy;\n    for (int i = 0; i < n; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }\n    Solution sol;\n    ListNode* res = sol.swapPairs(dummy.next);\n    while (res) {\n        cout << res->val << (res->next ? \" \" : \"\");\n        res = res->next;\n    }\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0: sys.exit(0)\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    dummy = ListNode(0)\n    curr = dummy\n    for v in vals: curr.next = ListNode(v); curr = curr.next\n    sol = Solution()\n    head = sol.swapPairs(dummy.next)\n    res = []\n    while head: res.append(str(head.val)); head = head.next\n    print(\" \".join(res))"
  },
  "32": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    if (n == 0) { cout << 0 << \"\\n\\n\"; return 0; }\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    int k = sol.removeDuplicates(nums);\n    cout << k << \"\\n\";\n    for (int i = 0; i < k; i++) cout << nums[i] << (i + 1 == k ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    if n == 0: print(0); sys.exit(0)\n    sol = Solution()\n    k = sol.removeDuplicates(nums)\n    print(k)\n    print(\" \".join(map(str, nums[:k])))"
  },
  "33": {
    "cpp": "int main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.search(nums, target) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, target = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    print(sol.search(nums, target))"
  },
  "34": {
    "cpp": "int main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.search(nums, target) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, target = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    print(sol.search(nums, target))"
  },
  "35": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.findMin(nums) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.findMin(nums))"
  },
  "36": {
    "cpp": "int main() {\n    string s;\n    if (!(cin >> s)) return 0;\n    Solution sol;\n    cout << (sol.isValid(s) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    print(\"true\" if sol.isValid(raw[0]) else \"false\")"
  },
  "37": {
    "cpp": "int main() {\n    int q;\n    if (!(cin >> q)) return 0;\n    MinStack minStack;\n    while (q--) {\n        int t; cin >> t;\n        if (t == 1) { int x; cin >> x; minStack.push(x); }\n        else if (t == 2) minStack.pop();\n        else if (t == 3) cout << minStack.top() << \"\\n\";\n        else if (t == 4) cout << minStack.getMin() << \"\\n\";\n    }\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    q = int(raw[0])\n    idx = 1\n    min_stack = MinStack()\n    for _ in range(q):\n        t = int(raw[idx]); idx += 1\n        if t == 1:\n            x = int(raw[idx]); idx += 1\n            min_stack.push(x)\n        elif t == 2: min_stack.pop()\n        elif t == 3: print(min_stack.top())\n        elif t == 4: print(min_stack.getMin())"
  },
  "38": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> temps(n);\n    for (int i = 0; i < n; i++) cin >> temps[i];\n    Solution sol;\n    vector<int> res = sol.dailyTemperatures(temps);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    temps = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    res = sol.dailyTemperatures(temps)\n    print(\" \".join(map(str, res)))"
  },
  "39": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n) || n <= 0) { cout << 0 << \"\\n\"; return 0; }\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    if (vals[0] == -1) { cout << 0 << \"\\n\"; return 0; }\n    vector<TreeNode*> nodes(n, nullptr);\n    for (int i = 0; i < n; i++) if (vals[i] != -1) nodes[i] = new TreeNode(vals[i]);\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            if (2 * i + 1 < n) nodes[i]->left = nodes[2 * i + 1];\n            if (2 * i + 2 < n) nodes[i]->right = nodes[2 * i + 2];\n        }\n    }\n    Solution sol;\n    cout << sol.maxDepth(nodes[0]) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0: print(0); sys.exit(0)\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    if vals[0] == -1: print(0); sys.exit(0)\n    nodes = [TreeNode(v) if v != -1 else None for v in vals]\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n: nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n: nodes[i].right = nodes[2 * i + 2]\n    sol = Solution()\n    print(sol.maxDepth(nodes[0]))"
  },
  "40": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n) || n <= 0) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    for (int i = 0; i < n; i++) cout << vals[i] << (i + 1 == n ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0: sys.exit(0)\n    n = int(raw[0])\n    vals = raw[1:n+1]\n    print(\" \".join(vals))"
  },
  "41": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n) || n <= 0) { cout << \"true\\n\"; return 0; }\n    vector<long long> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    if (vals[0] == -1) { cout << \"true\\n\"; return 0; }\n    vector<TreeNode*> nodes(n, nullptr);\n    for (int i = 0; i < n; i++) if (vals[i] != -1) nodes[i] = new TreeNode(vals[i]);\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            if (2 * i + 1 < n) nodes[i]->left = nodes[2 * i + 1];\n            if (2 * i + 2 < n) nodes[i]->right = nodes[2 * i + 2];\n        }\n    }\n    Solution sol;\n    cout << (sol.isValidBST(nodes[0]) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0: print(\"true\"); sys.exit(0)\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    if vals[0] == -1: print(\"true\"); sys.exit(0)\n    nodes = [TreeNode(v) if v != -1 else None for v in vals]\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n: nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n: nodes[i].right = nodes[2 * i + 2]\n    sol = Solution()\n    print(\"true\" if sol.isValidBST(nodes[0]) else \"false\")"
  },
  "42": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    Solution sol;\n    cout << sol.climbStairs(n) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    print(sol.climbStairs(int(raw[0])))"
  },
  "43": {
    "cpp": "int main() {\n    int n, amount;\n    if (!(cin >> n >> amount)) return 0;\n    vector<int> coins(n);\n    for (int i = 0; i < n; i++) cin >> coins[i];\n    Solution sol;\n    cout << sol.coinChange(coins, amount) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, amount = int(raw[0]), int(raw[1])\n    coins = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    print(sol.coinChange(coins, amount))"
  },
  "44": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.lengthOfLIS(nums) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.lengthOfLIS(nums))"
  },
  "45": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.rob(nums) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.rob(nums))"
  },
  "46": {
    "cpp": "int main() {\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    vector<vector<char>> grid(m, vector<char>(n));\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++)\n            cin >> grid[i][j];\n    Solution sol;\n    cout << sol.numIslands(grid) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    m, n = int(raw[0]), int(raw[1])\n    idx = 2\n    grid = []\n    for _ in range(m):\n        grid.append(list(raw[idx:idx+n]))\n        idx += n\n    sol = Solution()\n    print(sol.numIslands(grid))"
  },
  "47": {
    "cpp": "int main() {\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    vector<vector<int>> grid(m, vector<int>(n));\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++)\n            cin >> grid[i][j];\n    Solution sol;\n    cout << sol.orangesRotting(grid) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    m, n = int(raw[0]), int(raw[1])\n    idx = 2\n    grid = []\n    for _ in range(m):\n        grid.append([int(x) for x in raw[idx:idx+n]])\n        idx += n\n    sol = Solution()\n    print(sol.orangesRotting(grid))"
  },
  "48": {
    "cpp": "int main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.findKthLargest(nums, k) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, k = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    print(sol.findKthLargest(nums, k))"
  },
  "49": {
    "cpp": "int main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    vector<int> res = sol.topKFrequent(nums, k);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, k = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    res = sol.topKFrequent(nums, k)\n    print(\" \".join(map(str, res)))"
  },
  "50": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> h(n);\n    for (int i = 0; i < n; i++) cin >> h[i];\n    Solution sol;\n    cout << sol.trap(h) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    h = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.trap(h))"
  },
  "51": {
    "cpp": "int main() {\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    vector<vector<int>> matrix(m, vector<int>(n));\n    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) cin >> matrix[i][j];\n    Solution sol;\n    sol.setZeroes(matrix);\n    for (int i = 0; i < m; i++) {\n        for (int j = 0; j < n; j++) cout << matrix[i][j] << (j + 1 == n ? \"\" : \" \");\n        cout << \"\\n\";\n    }\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    lines = sys.stdin.read().split()\n    if not lines: sys.exit(0)\n    m, n = int(lines[0]), int(lines[1])\n    idx = 2\n    matrix = []\n    for _ in range(m):\n        matrix.append([int(x) for x in lines[idx:idx+n]])\n        idx += n\n    sol = Solution()\n    sol.setZeroes(matrix)\n    for row in matrix: print(\" \".join(map(str, row)))"
  },
  "52": {
    "cpp": "int main() {\n    int numRows;\n    if (!(cin >> numRows)) return 0;\n    Solution sol;\n    vector<vector<int>> res = sol.generate(numRows);\n    for (auto& row : res) {\n        for (size_t j = 0; j < row.size(); j++) cout << row[j] << (j + 1 == row.size() ? \"\" : \" \");\n        cout << \"\\n\";\n    }\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    res = sol.generate(int(raw[0]))\n    for row in res: print(\" \".join(map(str, row)))"
  },
  "53": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    sol.nextPermutation(nums);\n    for (int i = 0; i < n; i++) cout << nums[i] << (i + 1 == n ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    sol.nextPermutation(nums)\n    print(\" \".join(map(str, nums)))"
  },
  "54": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    sol.sortColors(nums);\n    for (int i = 0; i < n; i++) cout << nums[i] << (i + 1 == n ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    sol.sortColors(nums)\n    print(\" \".join(map(str, nums)))"
  },
  "55": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<vector<int>> intervals(n, vector<int>(2));\n    for (int i = 0; i < n; i++) cin >> intervals[i][0] >> intervals[i][1];\n    Solution sol;\n    vector<vector<int>> res = sol.merge(intervals);\n    for (auto& iv : res) cout << iv[0] << \" \" << iv[1] << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    intervals = []\n    idx = 1\n    for _ in range(n):\n        intervals.append([int(raw[idx]), int(raw[idx+1])])\n        idx += 2\n    sol = Solution()\n    res = sol.merge(intervals)\n    for iv in res: print(f\"{iv[0]} {iv[1]}\")"
  },
  "56": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.findDuplicate(nums) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.findDuplicate(nums))"
  },
  "57": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<vector<int>> matrix(n, vector<int>(n));\n    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) cin >> matrix[i][j];\n    Solution sol;\n    sol.rotate(matrix);\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) cout << matrix[i][j] << (j + 1 == n ? \"\" : \" \");\n        cout << \"\\n\";\n    }\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    idx = 1\n    matrix = []\n    for _ in range(n):\n        matrix.append([int(x) for x in raw[idx:idx+n]])\n        idx += n\n    sol = Solution()\n    sol.rotate(matrix)\n    for row in matrix: print(\" \".join(map(str, row)))"
  },
  "58": {
    "cpp": "int main() {\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    vector<vector<int>> matrix(m, vector<int>(n));\n    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) cin >> matrix[i][j];\n    Solution sol;\n    vector<int> res = sol.spiralOrder(matrix);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    m, n = int(raw[0]), int(raw[1])\n    idx = 2\n    matrix = []\n    for _ in range(m):\n        matrix.append([int(x) for x in raw[idx:idx+n]])\n        idx += n\n    sol = Solution()\n    res = sol.spiralOrder(matrix)\n    print(\" \".join(map(str, res)))"
  },
  "59": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.majorityElement(nums) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.majorityElement(nums))"
  },
  "60": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    vector<int> res = sol.majorityElement(nums);\n    sort(res.begin(), res.end());\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    res = sol.majorityElement(nums)\n    res.sort()\n    print(\" \".join(map(str, res)))"
  },
  "61": {
    "cpp": "int main() {\n    double x; long long n;\n    if (!(cin >> x >> n)) return 0;\n    Solution sol;\n    cout << fixed << setprecision(5) << sol.myPow(x, n) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    x, n = float(raw[0]), int(raw[1])\n    sol = Solution()\n    print(f\"{sol.myPow(x, n):.5f}\")"
  },
  "62": {
    "cpp": "int main() {\n    int m, n, target;\n    if (!(cin >> m >> n >> target)) return 0;\n    vector<vector<int>> matrix(m, vector<int>(n));\n    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) cin >> matrix[i][j];\n    Solution sol;\n    cout << (sol.searchMatrix(matrix, target) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    m, n, target = int(raw[0]), int(raw[1]), int(raw[2])\n    idx = 3\n    matrix = []\n    for _ in range(m):\n        matrix.append([int(x) for x in raw[idx:idx+n]])\n        idx += n\n    sol = Solution()\n    print(\"true\" if sol.searchMatrix(matrix, target) else \"false\")"
  },
  "63": {
    "cpp": "int main() {\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    Solution sol;\n    cout << sol.uniquePaths(m, n) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    print(sol.uniquePaths(int(raw[0]), int(raw[1])))"
  },
  "64": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    Solution sol;\n    cout << sol.inversionCount(arr) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    arr = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.inversionCount(arr))"
  },
  "65": {
    "cpp": "int main() {\n    int n; long long target;\n    if (!(cin >> n >> target)) return 0;\n    vector<long long> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.fourSum(nums, target) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, target = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    print(sol.fourSum(nums, target))"
  },
  "66": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n) || n == 0) { cout << 0 << \"\\n\"; return 0; }\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.longestConsecutive(nums) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) == 0: print(0); sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.longestConsecutive(nums))"
  },
  "67": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    Solution sol;\n    cout << sol.maxLen(arr) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    arr = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.maxLen(arr))"
  },
  "68": {
    "cpp": "int main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.subarraySum(nums, k) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, k = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    print(sol.subarraySum(nums, k))"
  },
  "69": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.findPeakElement(nums) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.findPeakElement(nums))"
  },
  "70": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.singleNonDuplicate(nums) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.singleNonDuplicate(nums))"
  },
  "71": {
    "cpp": "int main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << (sol.search(nums, target) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, target = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    print(\"true\" if sol.search(nums, target) else \"false\")"
  },
  "72": {
    "cpp": "int main() {\n    int n, h;\n    if (!(cin >> n >> h)) return 0;\n    vector<int> piles(n);\n    for (int i = 0; i < n; i++) cin >> piles[i];\n    Solution sol;\n    cout << sol.minEatingSpeed(piles, h) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, h = int(raw[0]), int(raw[1])\n    piles = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    print(sol.minEatingSpeed(piles, h))"
  },
  "73": {
    "cpp": "int main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    vector<int> stalls(n);\n    for (int i = 0; i < n; i++) cin >> stalls[i];\n    Solution sol;\n    cout << sol.aggressiveCows(stalls, k) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, k = int(raw[0]), int(raw[1])\n    stalls = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    print(sol.aggressiveCows(stalls, k))"
  },
  "74": {
    "cpp": "int main() {\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    Solution sol;\n    cout << sol.findPages(arr, m) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, m = int(raw[0]), int(raw[1])\n    arr = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    print(sol.findPages(arr, m))"
  },
  "75": {
    "cpp": "int main() {\n    string s;\n    if (!(cin >> s)) return 0;\n    Solution sol;\n    cout << sol.romanToInt(s) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    print(sol.romanToInt(raw[0]))"
  },
  "76": {
    "cpp": "int main() {\n    int num;\n    if (!(cin >> num)) return 0;\n    Solution sol;\n    cout << sol.intToRoman(num) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    print(sol.intToRoman(int(raw[0])))"
  },
  "77": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    Solution sol;\n    cout << sol.countAndSay(n) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    print(sol.countAndSay(int(raw[0])))"
  },
  "78": {
    "cpp": "int main() {\n    string r, m;\n    if (!(cin >> r >> m)) return 0;\n    Solution sol;\n    cout << (sol.canConstruct(r, m) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    print(\"true\" if sol.canConstruct(raw[0], raw[1]) else \"false\")"
  },
  "79": {
    "cpp": "int main() {\n    int n, l, r;\n    if (!(cin >> n >> l >> r)) return 0;\n    ListNode dummy(0);\n    ListNode* curr = &dummy;\n    for (int i = 0; i < n; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }\n    Solution sol;\n    ListNode* res = sol.reverseBetween(dummy.next, l, r);\n    while (res) {\n        cout << res->val << (res->next ? \" \" : \"\");\n        res = res->next;\n    }\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, l, r = int(raw[0]), int(raw[1]), int(raw[2])\n    vals = [int(x) for x in raw[3:3+n]]\n    dummy = ListNode(0)\n    curr = dummy\n    for v in vals: curr.next = ListNode(v); curr = curr.next\n    sol = Solution()\n    head = sol.reverseBetween(dummy.next, l, r)\n    res = []\n    while head: res.append(str(head.val)); head = head.next\n    print(\" \".join(res))"
  },
  "80": {
    "cpp": "int main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    if (n == 0) return 0;\n    ListNode dummy(0);\n    ListNode* curr = &dummy;\n    for (int i = 0; i < n; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }\n    Solution sol;\n    ListNode* res = sol.rotateRight(dummy.next, k);\n    while (res) {\n        cout << res->val << (res->next ? \" \" : \"\");\n        res = res->next;\n    }\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, k = int(raw[0]), int(raw[1])\n    if n == 0: sys.exit(0)\n    vals = [int(x) for x in raw[2:2+n]]\n    dummy = ListNode(0)\n    curr = dummy\n    for v in vals: curr.next = ListNode(v); curr = curr.next\n    sol = Solution()\n    head = sol.rotateRight(dummy.next, k)\n    res = []\n    while head: res.append(str(head.val)); head = head.next\n    print(\" \".join(res))"
  },
  "81": {
    "cpp": "int main() {\n    int n1, n2;\n    if (!(cin >> n1 >> n2)) return 0;\n    vector<int> nums1(n1), nums2(n2);\n    for (int i = 0; i < n1; i++) cin >> nums1[i];\n    for (int i = 0; i < n2; i++) cin >> nums2[i];\n    Solution sol;\n    vector<int> res = sol.nextGreaterElement(nums1, nums2);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n1, n2 = int(raw[0]), int(raw[1])\n    nums1 = [int(x) for x in raw[2:2+n1]]\n    nums2 = [int(x) for x in raw[2+n1:2+n1+n2]]\n    sol = Solution()\n    res = sol.nextGreaterElement(nums1, nums2)\n    print(\" \".join(map(str, res)))"
  },
  "82": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    vector<int> res = sol.nextGreaterElements(nums);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    res = sol.nextGreaterElements(nums)\n    print(\" \".join(map(str, res)))"
  },
  "83": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> h(n);\n    for (int i = 0; i < n; i++) cin >> h[i];\n    Solution sol;\n    cout << sol.largestRectangleArea(h) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    h = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    print(sol.largestRectangleArea(h))"
  },
  "84": {
    "cpp": "int main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    vector<int> res = sol.maxSlidingWindow(nums, k);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, k = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    res = sol.maxSlidingWindow(nums, k)\n    print(\" \".join(map(str, res)))"
  },
  "85": {
    "cpp": "int main() {\n    int q;\n    if (!(cin >> q)) return 0;\n    MyQueue myQueue;\n    while (q--) {\n        int t; cin >> t;\n        if (t == 1) { int x; cin >> x; myQueue.push(x); }\n        else if (t == 2) cout << myQueue.pop() << \"\\n\";\n        else if (t == 3) cout << myQueue.peek() << \"\\n\";\n    }\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    q = int(raw[0])\n    idx = 1\n    my_queue = MyQueue()\n    for _ in range(q):\n        t = int(raw[idx]); idx += 1\n        if t == 1:\n            x = int(raw[idx]); idx += 1\n            my_queue.push(x)\n        elif t == 2: print(my_queue.pop())\n        elif t == 3: print(my_queue.peek())"
  },
  "86": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    vector<vector<int>> res = sol.subsets(nums);\n    cout << res.size() << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    res = sol.subsets(nums)\n    print(len(res))"
  },
  "87": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    vector<vector<int>> res = sol.subsetsWithDup(nums);\n    cout << res.size() << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    res = sol.subsetsWithDup(nums)\n    print(len(res))"
  },
  "88": {
    "cpp": "int main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> cand(n);\n    for (int i = 0; i < n; i++) cin >> cand[i];\n    Solution sol;\n    vector<vector<int>> res = sol.combinationSum(cand, target);\n    cout << res.size() << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, target = int(raw[0]), int(raw[1])\n    cand = [int(x) for x in raw[2:n+2]]\n    sol = Solution()\n    res = sol.combinationSum(cand, target)\n    print(len(res))"
  },
  "89": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    vector<vector<int>> res = sol.permute(nums);\n    cout << res.size() << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    sol = Solution()\n    res = sol.permute(nums)\n    print(len(res))"
  },
  "90": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    Solution sol;\n    cout << sol.totalNQueens(n) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    print(sol.totalNQueens(int(raw[0])))"
  },
  "91": {
    "cpp": "int main() {\n    int m, n; string word;\n    if (!(cin >> m >> n >> word)) return 0;\n    vector<vector<char>> board(m, vector<char>(n));\n    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) cin >> board[i][j];\n    Solution sol;\n    cout << (sol.exist(board, word) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    m, n, word = int(raw[0]), int(raw[1]), raw[2]\n    idx = 3\n    board = []\n    for _ in range(m):\n        board.append(raw[idx:idx+n])\n        idx += n\n    sol = Solution()\n    print(\"true\" if sol.exist(board, word) else \"false\")"
  },
  "92": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n) || n <= 0) { cout << 0 << \"\\n\"; return 0; }\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    if (vals[0] == -1) { cout << 0 << \"\\n\"; return 0; }\n    vector<TreeNode*> nodes(n, nullptr);\n    for (int i = 0; i < n; i++) if (vals[i] != -1) nodes[i] = new TreeNode(vals[i]);\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            if (2 * i + 1 < n) nodes[i]->left = nodes[2 * i + 1];\n            if (2 * i + 2 < n) nodes[i]->right = nodes[2 * i + 2];\n        }\n    }\n    Solution sol;\n    cout << sol.diameterOfBinaryTree(nodes[0]) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0: print(0); sys.exit(0)\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    if vals[0] == -1: print(0); sys.exit(0)\n    nodes = [TreeNode(v) if v != -1 else None for v in vals]\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n: nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n: nodes[i].right = nodes[2 * i + 2]\n    sol = Solution()\n    print(sol.diameterOfBinaryTree(nodes[0]))"
  },
  "93": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n) || n <= 0) { cout << \"true\\n\"; return 0; }\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    if (vals[0] == -1) { cout << \"true\\n\"; return 0; }\n    vector<TreeNode*> nodes(n, nullptr);\n    for (int i = 0; i < n; i++) if (vals[i] != -1) nodes[i] = new TreeNode(vals[i]);\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            if (2 * i + 1 < n) nodes[i]->left = nodes[2 * i + 1];\n            if (2 * i + 2 < n) nodes[i]->right = nodes[2 * i + 2];\n        }\n    }\n    Solution sol;\n    cout << (sol.isBalanced(nodes[0]) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0: print(\"true\"); sys.exit(0)\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    if vals[0] == -1: print(\"true\"); sys.exit(0)\n    nodes = [TreeNode(v) if v != -1 else None for v in vals]\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n: nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n: nodes[i].right = nodes[2 * i + 2]\n    sol = Solution()\n    print(\"true\" if sol.isBalanced(nodes[0]) else \"false\")"
  },
  "94": {
    "cpp": "int main() {\n    int n, pVal, qVal;\n    if (!(cin >> n >> pVal >> qVal)) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    vector<TreeNode*> nodes(n, nullptr);\n    TreeNode *pNode = nullptr, *qNode = nullptr;\n    for (int i = 0; i < n; i++) {\n        if (vals[i] != -1) {\n            nodes[i] = new TreeNode(vals[i]);\n            if (vals[i] == pVal) pNode = nodes[i];\n            if (vals[i] == qVal) qNode = nodes[i];\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            if (2 * i + 1 < n) nodes[i]->left = nodes[2 * i + 1];\n            if (2 * i + 2 < n) nodes[i]->right = nodes[2 * i + 2];\n        }\n    }\n    Solution sol;\n    TreeNode* lca = sol.lowestCommonAncestor(nodes[0], pNode, qNode);\n    cout << (lca ? lca->val : -1) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, p_val, q_val = int(raw[0]), int(raw[1]), int(raw[2])\n    vals = [int(x) for x in raw[3:3+n]]\n    nodes = [TreeNode(v) if v != -1 else None for v in vals]\n    p_node, q_node = None, None\n    for node in nodes:\n        if node and node.val == p_val: p_node = node\n        if node and node.val == q_val: q_node = node\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n: nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n: nodes[i].right = nodes[2 * i + 2]\n    sol = Solution()\n    res = sol.lowestCommonAncestor(nodes[0], p_node, q_node)\n    print(res.val if res else -1)"
  },
  "95": {
    "cpp": "int main() {\n    int n;\n    if (!(cin >> n) || n <= 0) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    if (vals[0] == -1) return 0;\n    vector<TreeNode*> nodes(n, nullptr);\n    for (int i = 0; i < n; i++) if (vals[i] != -1) nodes[i] = new TreeNode(vals[i]);\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            if (2 * i + 1 < n) nodes[i]->left = nodes[2 * i + 1];\n            if (2 * i + 2 < n) nodes[i]->right = nodes[2 * i + 2];\n        }\n    }\n    Solution sol;\n    vector<vector<int>> res = sol.zigzagLevelOrder(nodes[0]);\n    for (auto& row : res) {\n        for (size_t j = 0; j < row.size(); j++) cout << row[j] << (j + 1 == row.size() ? \"\" : \" \");\n        cout << \"\\n\";\n    }\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0: sys.exit(0)\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    if vals[0] == -1: sys.exit(0)\n    nodes = [TreeNode(v) if v != -1 else None for v in vals]\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n: nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n: nodes[i].right = nodes[2 * i + 2]\n    sol = Solution()\n    res = sol.zigzagLevelOrder(nodes[0])\n    for row in res: print(\" \".join(map(str, row)))"
  },
  "96": {
    "cpp": "int main() {\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> prereqs(m, vector<int>(2));\n    for (int i = 0; i < m; i++) cin >> prereqs[i][0] >> prereqs[i][1];\n    Solution sol;\n    cout << (sol.canFinish(n, prereqs) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, m = int(raw[0]), int(raw[1])\n    prereqs = []\n    idx = 2\n    for _ in range(m):\n        prereqs.append([int(raw[idx]), int(raw[idx+1])])\n        idx += 2\n    sol = Solution()\n    print(\"true\" if sol.canFinish(n, prereqs) else \"false\")"
  },
  "97": {
    "cpp": "int main() {\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> prereqs(m, vector<int>(2));\n    for (int i = 0; i < m; i++) cin >> prereqs[i][0] >> prereqs[i][1];\n    Solution sol;\n    vector<int> order = sol.findOrder(n, prereqs);\n    if ((int)order.size() != n) cout << -1 << \"\\n\";\n    else {\n        for (int i = 0; i < n; i++) cout << order[i] << (i + 1 == n ? \"\" : \" \");\n        cout << \"\\n\";\n    }\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, m = int(raw[0]), int(raw[1])\n    prereqs = []\n    idx = 2\n    for _ in range(m):\n        prereqs.append([int(raw[idx]), int(raw[idx+1])])\n        idx += 2\n    sol = Solution()\n    order = sol.findOrder(n, prereqs)\n    if len(order) != n: print(-1)\n    else: print(\" \".join(map(str, order)))"
  },
  "98": {
    "cpp": "int main() {\n    int m, n, sr, sc, color;\n    if (!(cin >> m >> n >> sr >> sc >> color)) return 0;\n    vector<vector<int>> img(m, vector<int>(n));\n    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) cin >> img[i][j];\n    Solution sol;\n    vector<vector<int>> res = sol.floodFill(img, sr, sc, color);\n    for (int i = 0; i < m; i++) {\n        for (int j = 0; j < n; j++) cout << res[i][j] << (j + 1 == n ? \"\" : \" \");\n        cout << \"\\n\";\n    }\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    m, n, sr, sc, color = int(raw[0]), int(raw[1]), int(raw[2]), int(raw[3]), int(raw[4])\n    idx = 5\n    img = []\n    for _ in range(m):\n        img.append([int(x) for x in raw[idx:idx+n]])\n        idx += n\n    sol = Solution()\n    res = sol.floodFill(img, sr, sc, color)\n    for row in res: print(\" \".join(map(str, row)))"
  },
  "99": {
    "cpp": "int main() {\n    int n, W;\n    if (!(cin >> n >> W)) return 0;\n    vector<int> wt(n), val(n);\n    for (int i = 0; i < n; i++) cin >> wt[i];\n    for (int i = 0; i < n; i++) cin >> val[i];\n    Solution sol;\n    cout << sol.knapSack(W, wt, val) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    n, W = int(raw[0]), int(raw[1])\n    wt = [int(x) for x in raw[2:n+2]]\n    val = [int(x) for x in raw[n+2:2*n+2]]\n    sol = Solution()\n    print(sol.knapSack(W, wt, val))"
  },
  "100": {
    "cpp": "int main() {\n    string s1, s2;\n    if (!(cin >> s1 >> s2)) return 0;\n    Solution sol;\n    cout << sol.longestCommonSubsequence(s1, s2) << \"\\n\";\n    return 0;\n}",
    "python": "if __name__ == '__main__':\n    raw = sys.stdin.read().split()\n    if not raw: sys.exit(0)\n    sol = Solution()\n    print(sol.longestCommonSubsequence(raw[0], raw[1]))"
  }
};

const COMMON_CPP_PREAMBLE = "\n#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <unordered_map>\n#include <map>\n#include <set>\n#include <unordered_set>\n#include <queue>\n#include <stack>\n#include <deque>\n#include <cmath>\n#include <climits>\n#include <iomanip>\n#include <numeric>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n";
const COMMON_PY_PREAMBLE = "\nimport sys\nimport math\nimport bisect\nimport heapq\nfrom collections import defaultdict, Counter, deque\nfrom typing import List, Optional, Tuple, Dict, Set, Any\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n";

export function wrapSolutionWithDriver(code, problemId, language = "cpp") {
  if (!code || typeof code !== "string") return code;

  const isCpp = language === "cpp";
  const isPython = language === "python";

  // If user provided a complete program with their own main entrypoint, execute directly
  if (isCpp && (code.includes("int main(") || code.includes("void main("))) {
    return code;
  }
  if (isPython && (code.includes("if __name__ == '__main__':") || code.includes('if __name__ == "__main__":'))) {
    return code;
  }

  // Check if user submitted LeetCode class Solution or class MyQueue / MinStack
  const hasLeetcodeClass = code.includes("class Solution") ||
                           code.includes("class MyQueue") ||
                           code.includes("class MinStack");

  const driverInfo = PROBLEM_DRIVERS[problemId];

  if (!driverInfo) {
    return code;
  }

  if (isCpp) {
    // Append standard preamble, user code, and problem driver
    const driver = driverInfo.cpp || "";
    return `${COMMON_CPP_PREAMBLE}\n${code}\n${driver}`;
  }

  if (isPython) {
    // Append python typing, user code, and problem driver
    const driver = driverInfo.python || "";
    return `${COMMON_PY_PREAMBLE}\n${code}\n${driver}`;
  }

  return code;
}
