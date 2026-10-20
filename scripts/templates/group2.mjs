export const group2 = {
  26: {
    title: "Remove Linked List Elements",
    cppSig: `class Solution {\npublic:\n    ListNode* removeElements(ListNode* head, int val) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:\n        pass`,
    cppDriver: `int main() {
    int n, val;
    if (!(cin >> n >> val)) return 0;
    ListNode dummy(0);
    ListNode* curr = &dummy;
    for (int i = 0; i < n; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }
    Solution sol;
    ListNode* res = sol.removeElements(dummy.next, val);
    while (res) {
        cout << res->val << (res->next ? " " : "");
        res = res->next;
    }
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, val = int(raw[0]), int(raw[1])
    vals = [int(x) for x in raw[2:2+n]]
    dummy = ListNode(0)
    curr = dummy
    for v in vals: curr.next = ListNode(v); curr = curr.next
    sol = Solution()
    head = sol.removeElements(dummy.next, val)
    res = []
    while head: res.append(str(head.val)); head = head.next
    print(" ".join(res))`
  },
  27: {
    title: "Palindrome Linked List",
    cppSig: `class Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def isPalindrome(self, head: Optional[ListNode]) -> bool:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    ListNode dummy(0);
    ListNode* curr = &dummy;
    for (int i = 0; i < n; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }
    Solution sol;
    cout << (sol.isPalindrome(dummy.next) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 0: sys.exit(0)
    n = int(raw[0])
    vals = [int(x) for x in raw[1:n+1]]
    dummy = ListNode(0)
    curr = dummy
    for v in vals: curr.next = ListNode(v); curr = curr.next
    sol = Solution()
    print("true" if sol.isPalindrome(dummy.next) else "false")`
  },
  28: {
    title: "Intersection of Two Linked Lists",
    cppSig: `class Solution {\npublic:\n    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:\n        pass`,
    cppDriver: `int main() {
    int nA, nB, intersectVal;
    if (!(cin >> nA >> nB >> intersectVal)) return 0;
    ListNode dA(0), dB(0);
    ListNode* cA = &dA;
    ListNode* target = nullptr;
    for (int i = 0; i < nA; i++) {
        int x; cin >> x;
        cA->next = new ListNode(x);
        cA = cA->next;
        if (x == intersectVal && !target) target = cA;
    }
    ListNode* cB = &dB;
    for (int i = 0; i < nB; i++) {
        int x; cin >> x;
        if (target && x == intersectVal) {
            cB->next = target;
            break;
        } else {
            cB->next = new ListNode(x);
            cB = cB->next;
        }
    }
    Solution sol;
    ListNode* res = sol.getIntersectionNode(dA.next, dB.next);
    cout << (res ? res->val : 0) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    nA, nB, inter = int(raw[0]), int(raw[1]), int(raw[2])
    valsA = [int(x) for x in raw[3:3+nA]]
    valsB = [int(x) for x in raw[3+nA:3+nA+nB]]
    dA, dB = ListNode(0), ListNode(0)
    cA = dA
    target = None
    for v in valsA:
        cA.next = ListNode(v); cA = cA.next
        if v == inter and not target: target = cA
    cB = dB
    for v in valsB:
        if target and v == inter:
            cB.next = target
            break
        cB.next = ListNode(v); cB = cB.next
    sol = Solution()
    res = sol.getIntersectionNode(dA.next, dB.next)
    print(res.val if res else 0)`
  },
  29: {
    title: "Remove Nth Node From End of List",
    cppSig: `class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        pass`,
    cppDriver: `int main() {
    int sz, n;
    if (!(cin >> sz >> n)) return 0;
    ListNode dummy(0);
    ListNode* curr = &dummy;
    for (int i = 0; i < sz; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }
    Solution sol;
    ListNode* res = sol.removeNthFromEnd(dummy.next, n);
    while (res) {
        cout << res->val << (res->next ? " " : "");
        res = res->next;
    }
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sz, n = int(raw[0]), int(raw[1])
    vals = [int(x) for x in raw[2:2+sz]]
    dummy = ListNode(0)
    curr = dummy
    for v in vals: curr.next = ListNode(v); curr = curr.next
    sol = Solution()
    head = sol.removeNthFromEnd(dummy.next, n)
    res = []
    while head: res.append(str(head.val)); head = head.next
    print(" ".join(res))`
  },
  30: {
    title: "Add Two Numbers",
    cppSig: `class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        pass`,
    cppDriver: `int main() {
    int n1, n2;
    if (!(cin >> n1 >> n2)) return 0;
    ListNode d1(0), d2(0);
    ListNode* c1 = &d1; for (int i = 0; i < n1; i++) { int x; cin >> x; c1->next = new ListNode(x); c1 = c1->next; }
    ListNode* c2 = &d2; for (int i = 0; i < n2; i++) { int x; cin >> x; c2->next = new ListNode(x); c2 = c2->next; }
    Solution sol;
    ListNode* sum = sol.addTwoNumbers(d1.next, d2.next);
    while (sum) {
        cout << sum->val << (sum->next ? " " : "");
        sum = sum->next;
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
    head = sol.addTwoNumbers(d1.next, d2.next)
    res = []
    while head: res.append(str(head.val)); head = head.next
    print(" ".join(res))`
  },
  31: {
    title: "Swap Nodes in Pairs",
    cppSig: `class Solution {\npublic:\n    ListNode* swapPairs(ListNode* head) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    ListNode dummy(0);
    ListNode* curr = &dummy;
    for (int i = 0; i < n; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }
    Solution sol;
    ListNode* res = sol.swapPairs(dummy.next);
    while (res) {
        cout << res->val << (res->next ? " " : "");
        res = res->next;
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
    for v in vals: curr.next = ListNode(v); curr = curr.next
    sol = Solution()
    head = sol.swapPairs(dummy.next)
    res = []
    while head: res.append(str(head.val)); head = head.next
    print(" ".join(res))`
  },
  32: {
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
    if n == 0: print(0); sys.exit(0)
    sol = Solution()
    k = sol.removeDuplicates(nums)
    print(k)
    print(" ".join(map(str, nums[:k])))`
  },
  33: {
    title: "Binary Search",
    cppSig: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.search(nums, target) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, target = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    print(sol.search(nums, target))`
  },
  34: {
    title: "Search in Rotated Sorted Array",
    cppSig: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.search(nums, target) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, target = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    print(sol.search(nums, target))`
  },
  35: {
    title: "Find Minimum in Rotated Sorted Array",
    cppSig: `class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def findMin(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.findMin(nums) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.findMin(nums))`
  },
  36: {
    title: "Valid Parentheses",
    cppSig: `class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def isValid(self, s: str) -> bool:\n        pass`,
    cppDriver: `int main() {
    string s;
    if (!(cin >> s)) return 0;
    Solution sol;
    cout << (sol.isValid(s) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print("true" if sol.isValid(raw[0]) else "false")`
  },
  37: {
    title: "Min Stack",
    cppSig: `class MinStack {\npublic:\n    MinStack() {\n        \n    }\n    \n    void push(int val) {\n        \n    }\n    \n    void pop() {\n        \n    }\n    \n    int top() {\n        \n    }\n    \n    int getMin() {\n        \n    }\n};`,
    pySig: `class MinStack:\n    def __init__(self):\n        pass\n        \n    def push(self, val: int) -> None:\n        pass\n        \n    def pop(self) -> None:\n        pass\n        \n    def top(self) -> int:\n        pass\n        \n    def getMin(self) -> int:\n        pass`,
    cppDriver: `int main() {
    int q;
    if (!(cin >> q)) return 0;
    MinStack minStack;
    while (q--) {
        int t; cin >> t;
        if (t == 1) { int x; cin >> x; minStack.push(x); }
        else if (t == 2) minStack.pop();
        else if (t == 3) cout << minStack.top() << "\\n";
        else if (t == 4) cout << minStack.getMin() << "\\n";
    }
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    q = int(raw[0])
    idx = 1
    min_stack = MinStack()
    for _ in range(q):
        t = int(raw[idx]); idx += 1
        if t == 1:
            x = int(raw[idx]); idx += 1
            min_stack.push(x)
        elif t == 2: min_stack.pop()
        elif t == 3: print(min_stack.top())
        elif t == 4: print(min_stack.getMin())`
  },
  38: {
    title: "Daily Temperatures",
    cppSig: `class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> temps(n);
    for (int i = 0; i < n; i++) cin >> temps[i];
    Solution sol;
    vector<int> res = sol.dailyTemperatures(temps);
    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    temps = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    res = sol.dailyTemperatures(temps)
    print(" ".join(map(str, res)))`
  },
  39: {
    title: "Maximum Depth of Binary Tree",
    cppSig: `/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        \n    }\n};`,
    pySig: `# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n) || n <= 0) { cout << 0 << "\\n"; return 0; }
    vector<int> vals(n);
    for (int i = 0; i < n; i++) cin >> vals[i];
    if (vals[0] == -1) { cout << 0 << "\\n"; return 0; }
    vector<TreeNode*> nodes(n, nullptr);
    for (int i = 0; i < n; i++) if (vals[i] != -1) nodes[i] = new TreeNode(vals[i]);
    for (int i = 0; i < n; i++) {
        if (nodes[i]) {
            if (2 * i + 1 < n) nodes[i]->left = nodes[2 * i + 1];
            if (2 * i + 2 < n) nodes[i]->right = nodes[2 * i + 2];
        }
    }
    Solution sol;
    cout << sol.maxDepth(nodes[0]) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 0: print(0); sys.exit(0)
    n = int(raw[0])
    vals = [int(x) for x in raw[1:n+1]]
    if vals[0] == -1: print(0); sys.exit(0)
    nodes = [TreeNode(v) if v != -1 else None for v in vals]
    for i in range(n):
        if nodes[i]:
            if 2 * i + 1 < n: nodes[i].left = nodes[2 * i + 1]
            if 2 * i + 2 < n: nodes[i].right = nodes[2 * i + 2]
    sol = Solution()
    print(sol.maxDepth(nodes[0]))`
  },
  40: {
    title: "Invert Binary Tree",
    cppSig: `class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    vector<int> vals(n);
    for (int i = 0; i < n; i++) cin >> vals[i];
    for (int i = 0; i < n; i++) cout << vals[i] << (i + 1 == n ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 0: sys.exit(0)
    n = int(raw[0])
    vals = raw[1:n+1]
    print(" ".join(vals))`
  },
  41: {
    title: "Validate Binary Search Tree",
    cppSig: `class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n) || n <= 0) { cout << "true\\n"; return 0; }
    vector<long long> vals(n);
    for (int i = 0; i < n; i++) cin >> vals[i];
    if (vals[0] == -1) { cout << "true\\n"; return 0; }
    vector<TreeNode*> nodes(n, nullptr);
    for (int i = 0; i < n; i++) if (vals[i] != -1) nodes[i] = new TreeNode(vals[i]);
    for (int i = 0; i < n; i++) {
        if (nodes[i]) {
            if (2 * i + 1 < n) nodes[i]->left = nodes[2 * i + 1];
            if (2 * i + 2 < n) nodes[i]->right = nodes[2 * i + 2];
        }
    }
    Solution sol;
    cout << (sol.isValidBST(nodes[0]) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 0: print("true"); sys.exit(0)
    n = int(raw[0])
    vals = [int(x) for x in raw[1:n+1]]
    if vals[0] == -1: print("true"); sys.exit(0)
    nodes = [TreeNode(v) if v != -1 else None for v in vals]
    for i in range(n):
        if nodes[i]:
            if 2 * i + 1 < n: nodes[i].left = nodes[2 * i + 1]
            if 2 * i + 2 < n: nodes[i].right = nodes[2 * i + 2]
    sol = Solution()
    print("true" if sol.isValidBST(nodes[0]) else "false")`
  },
  42: {
    title: "Climbing Stairs",
    cppSig: `class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    Solution sol;
    cout << sol.climbStairs(n) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print(sol.climbStairs(int(raw[0])))`
  },
  43: {
    title: "Coin Change",
    cppSig: `class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int n, amount;
    if (!(cin >> n >> amount)) return 0;
    vector<int> coins(n);
    for (int i = 0; i < n; i++) cin >> coins[i];
    Solution sol;
    cout << sol.coinChange(coins, amount) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, amount = int(raw[0]), int(raw[1])
    coins = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    print(sol.coinChange(coins, amount))`
  },
  44: {
    title: "Longest Increasing Subsequence",
    cppSig: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.lengthOfLIS(nums) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.lengthOfLIS(nums))`
  },
  45: {
    title: "House Robber",
    cppSig: `class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def rob(self, nums: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.rob(nums) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.rob(nums))`
  },
  46: {
    title: "Number of Islands",
    cppSig: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        pass`,
    cppDriver: `int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<vector<char>> grid(m, vector<char>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];
    Solution sol;
    cout << sol.numIslands(grid) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    m, n = int(raw[0]), int(raw[1])
    idx = 2
    grid = []
    for _ in range(m):
        grid.append(list(raw[idx:idx+n]))
        idx += n
    sol = Solution()
    print(sol.numIslands(grid))`
  },
  47: {
    title: "Rotting Oranges",
    cppSig: `class Solution {\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def orangesRotting(self, grid: List[List[int]]) -> int:\n        pass`,
    cppDriver: `int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<vector<int>> grid(m, vector<int>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];
    Solution sol;
    cout << sol.orangesRotting(grid) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    m, n = int(raw[0]), int(raw[1])
    idx = 2
    grid = []
    for _ in range(m):
        grid.append([int(x) for x in raw[idx:idx+n]])
        idx += n
    sol = Solution()
    print(sol.orangesRotting(grid))`
  },
  48: {
    title: "Kth Largest Element in an Array",
    cppSig: `class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def findKthLargest(self, nums: List[int], k: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    cout << sol.findKthLargest(nums, k) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, k = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    print(sol.findKthLargest(nums, k))`
  },
  49: {
    title: "Top K Frequent Elements",
    cppSig: `class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def topKFrequent(self, nums: List[int], k: int) -> List[int]:\n        pass`,
    cppDriver: `int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    vector<int> res = sol.topKFrequent(nums, k);
    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, k = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    res = sol.topKFrequent(nums, k)
    print(" ".join(map(str, res)))`
  },
  50: {
    title: "Trapping Rain Water",
    cppSig: `class Solution {\npublic:\n    int trap(vector<int>& height) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def trap(self, height: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    Solution sol;
    cout << sol.trap(h) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    h = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.trap(h))`
  }
};
