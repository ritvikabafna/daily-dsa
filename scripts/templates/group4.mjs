export const group4 = {
  76: {
    title: "Integer to Roman",
    cppSig: `class Solution {\npublic:\n    string intToRoman(int num) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def intToRoman(self, num: int) -> str:\n        pass`,
    cppDriver: `int main() {
    int num;
    if (!(cin >> num)) return 0;
    Solution sol;
    cout << sol.intToRoman(num) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print(sol.intToRoman(int(raw[0])))`
  },
  77: {
    title: "Count and Say",
    cppSig: `class Solution {\npublic:\n    string countAndSay(int n) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def countAndSay(self, n: int) -> str:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    Solution sol;
    cout << sol.countAndSay(n) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print(sol.countAndSay(int(raw[0])))`
  },
  78: {
    title: "Ransom Note",
    cppSig: `class Solution {\npublic:\n    bool canConstruct(string ransomNote, string magazine) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def canConstruct(self, ransomNote: str, magazine: str) -> bool:\n        pass`,
    cppDriver: `int main() {
    string r, m;
    if (!(cin >> r >> m)) return 0;
    Solution sol;
    cout << (sol.canConstruct(r, m) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print("true" if sol.canConstruct(raw[0], raw[1]) else "false")`
  },
  79: {
    title: "Reverse Linked List II",
    cppSig: `class Solution {\npublic:\n    ListNode* reverseBetween(ListNode* head, int left, int right) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:\n        pass`,
    cppDriver: `int main() {
    int n, l, r;
    if (!(cin >> n >> l >> r)) return 0;
    ListNode dummy(0);
    ListNode* curr = &dummy;
    for (int i = 0; i < n; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }
    Solution sol;
    ListNode* res = sol.reverseBetween(dummy.next, l, r);
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
    n, l, r = int(raw[0]), int(raw[1]), int(raw[2])
    vals = [int(x) for x in raw[3:3+n]]
    dummy = ListNode(0)
    curr = dummy
    for v in vals: curr.next = ListNode(v); curr = curr.next
    sol = Solution()
    head = sol.reverseBetween(dummy.next, l, r)
    res = []
    while head: res.append(str(head.val)); head = head.next
    print(" ".join(res))`
  },
  80: {
    title: "Rotate List",
    cppSig: `class Solution {\npublic:\n    ListNode* rotateRight(ListNode* head, int k) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        pass`,
    cppDriver: `int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    if (n == 0) return 0;
    ListNode dummy(0);
    ListNode* curr = &dummy;
    for (int i = 0; i < n; i++) { int x; cin >> x; curr->next = new ListNode(x); curr = curr->next; }
    Solution sol;
    ListNode* res = sol.rotateRight(dummy.next, k);
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
    n, k = int(raw[0]), int(raw[1])
    if n == 0: sys.exit(0)
    vals = [int(x) for x in raw[2:2+n]]
    dummy = ListNode(0)
    curr = dummy
    for v in vals: curr.next = ListNode(v); curr = curr.next
    sol = Solution()
    head = sol.rotateRight(dummy.next, k)
    res = []
    while head: res.append(str(head.val)); head = head.next
    print(" ".join(res))`
  },
  81: {
    title: "Next Greater Element I",
    cppSig: `class Solution {\npublic:\n    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:\n        pass`,
    cppDriver: `int main() {
    int n1, n2;
    if (!(cin >> n1 >> n2)) return 0;
    vector<int> nums1(n1), nums2(n2);
    for (int i = 0; i < n1; i++) cin >> nums1[i];
    for (int i = 0; i < n2; i++) cin >> nums2[i];
    Solution sol;
    vector<int> res = sol.nextGreaterElement(nums1, nums2);
    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " ");
    cout << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n1, n2 = int(raw[0]), int(raw[1])
    nums1 = [int(x) for x in raw[2:2+n1]]
    nums2 = [int(x) for x in raw[2+n1:2+n1+n2]]
    sol = Solution()
    res = sol.nextGreaterElement(nums1, nums2)
    print(" ".join(map(str, res)))`
  },
  82: {
    title: "Next Greater Element II",
    cppSig: `class Solution {\npublic:\n    vector<int> nextGreaterElements(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def nextGreaterElements(self, nums: List[int]) -> List[int]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    vector<int> res = sol.nextGreaterElements(nums);
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
    res = sol.nextGreaterElements(nums)
    print(" ".join(map(str, res)))`
  },
  83: {
    title: "Largest Rectangle in Histogram",
    cppSig: `class Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def largestRectangleArea(self, heights: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    Solution sol;
    cout << sol.largestRectangleArea(h) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    h = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    print(sol.largestRectangleArea(h))`
  },
  84: {
    title: "Sliding Window Maximum",
    cppSig: `class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:\n        pass`,
    cppDriver: `int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    vector<int> res = sol.maxSlidingWindow(nums, k);
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
    res = sol.maxSlidingWindow(nums, k)
    print(" ".join(map(str, res)))`
  },
  85: {
    title: "Implement Queue using Stacks",
    cppSig: `class MyQueue {\npublic:\n    MyQueue() {\n        \n    }\n    \n    void push(int x) {\n        \n    }\n    \n    int pop() {\n        \n    }\n    \n    int peek() {\n        \n    }\n    \n    bool empty() {\n        \n    }\n};`,
    pySig: `class MyQueue:\n    def __init__(self):\n        pass\n        \n    def push(self, x: int) -> None:\n        pass\n        \n    def pop(self) -> int:\n        pass\n        \n    def peek(self) -> int:\n        pass\n        \n    def empty(self) -> bool:\n        pass`,
    cppDriver: `int main() {
    int q;
    if (!(cin >> q)) return 0;
    MyQueue myQueue;
    while (q--) {
        int t; cin >> t;
        if (t == 1) { int x; cin >> x; myQueue.push(x); }
        else if (t == 2) cout << myQueue.pop() << "\\n";
        else if (t == 3) cout << myQueue.peek() << "\\n";
    }
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    q = int(raw[0])
    idx = 1
    my_queue = MyQueue()
    for _ in range(q):
        t = int(raw[idx]); idx += 1
        if t == 1:
            x = int(raw[idx]); idx += 1
            my_queue.push(x)
        elif t == 2: print(my_queue.pop())
        elif t == 3: print(my_queue.peek())`
  },
  86: {
    title: "Subsets",
    cppSig: `class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def subsets(self, nums: List[int]) -> List[List[int]]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    vector<vector<int>> res = sol.subsets(nums);
    cout << res.size() << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    res = sol.subsets(nums)
    print(len(res))`
  },
  87: {
    title: "Subsets II",
    cppSig: `class Solution {\npublic:\n    vector<vector<int>> subsetsWithDup(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    vector<vector<int>> res = sol.subsetsWithDup(nums);
    cout << res.size() << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    res = sol.subsetsWithDup(nums)
    print(len(res))`
  },
  88: {
    title: "Combination Sum",
    cppSig: `class Solution {\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\n        pass`,
    cppDriver: `int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> cand(n);
    for (int i = 0; i < n; i++) cin >> cand[i];
    Solution sol;
    vector<vector<int>> res = sol.combinationSum(cand, target);
    cout << res.size() << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, target = int(raw[0]), int(raw[1])
    cand = [int(x) for x in raw[2:n+2]]
    sol = Solution()
    res = sol.combinationSum(cand, target)
    print(len(res))`
  },
  89: {
    title: "Permutations",
    cppSig: `class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    Solution sol;
    vector<vector<int>> res = sol.permute(nums);
    cout << res.size() << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]
    sol = Solution()
    res = sol.permute(nums)
    print(len(res))`
  },
  90: {
    title: "N-Queens",
    cppSig: `class Solution {\npublic:\n    int totalNQueens(int n) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def totalNQueens(self, n: int) -> int:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n)) return 0;
    Solution sol;
    cout << sol.totalNQueens(n) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print(sol.totalNQueens(int(raw[0])))`
  },
  91: {
    title: "Word Search",
    cppSig: `class Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        pass`,
    cppDriver: `int main() {
    int m, n; string word;
    if (!(cin >> m >> n >> word)) return 0;
    vector<vector<char>> board(m, vector<char>(n));
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) cin >> board[i][j];
    Solution sol;
    cout << (sol.exist(board, word) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    m, n, word = int(raw[0]), int(raw[1]), raw[2]
    idx = 3
    board = []
    for _ in range(m):
        board.append(raw[idx:idx+n])
        idx += n
    sol = Solution()
    print("true" if sol.exist(board, word) else "false")`
  },
  92: {
    title: "Diameter of Binary Tree",
    cppSig: `class Solution {\npublic:\n    int diameterOfBinaryTree(TreeNode* root) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:\n        pass`,
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
    cout << sol.diameterOfBinaryTree(nodes[0]) << "\\n";
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
    print(sol.diameterOfBinaryTree(nodes[0]))`
  },
  93: {
    title: "Balanced Binary Tree",
    cppSig: `class Solution {\npublic:\n    bool isBalanced(TreeNode* root) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def isBalanced(self, root: Optional[TreeNode]) -> bool:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n) || n <= 0) { cout << "true\\n"; return 0; }
    vector<int> vals(n);
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
    cout << (sol.isBalanced(nodes[0]) ? "true" : "false") << "\\n";
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
    print("true" if sol.isBalanced(nodes[0]) else "false")`
  },
  94: {
    title: "Lowest Common Ancestor of a Binary Tree",
    cppSig: `class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:\n        pass`,
    cppDriver: `int main() {
    int n, pVal, qVal;
    if (!(cin >> n >> pVal >> qVal)) return 0;
    vector<int> vals(n);
    for (int i = 0; i < n; i++) cin >> vals[i];
    vector<TreeNode*> nodes(n, nullptr);
    TreeNode *pNode = nullptr, *qNode = nullptr;
    for (int i = 0; i < n; i++) {
        if (vals[i] != -1) {
            nodes[i] = new TreeNode(vals[i]);
            if (vals[i] == pVal) pNode = nodes[i];
            if (vals[i] == qVal) qNode = nodes[i];
        }
    }
    for (int i = 0; i < n; i++) {
        if (nodes[i]) {
            if (2 * i + 1 < n) nodes[i]->left = nodes[2 * i + 1];
            if (2 * i + 2 < n) nodes[i]->right = nodes[2 * i + 2];
        }
    }
    Solution sol;
    TreeNode* lca = sol.lowestCommonAncestor(nodes[0], pNode, qNode);
    cout << (lca ? lca->val : -1) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, p_val, q_val = int(raw[0]), int(raw[1]), int(raw[2])
    vals = [int(x) for x in raw[3:3+n]]
    nodes = [TreeNode(v) if v != -1 else None for v in vals]
    p_node, q_node = None, None
    for node in nodes:
        if node and node.val == p_val: p_node = node
        if node and node.val == q_val: q_node = node
    for i in range(n):
        if nodes[i]:
            if 2 * i + 1 < n: nodes[i].left = nodes[2 * i + 1]
            if 2 * i + 2 < n: nodes[i].right = nodes[2 * i + 2]
    sol = Solution()
    res = sol.lowestCommonAncestor(nodes[0], p_node, q_node)
    print(res.val if res else -1)`
  },
  95: {
    title: "Binary Tree Zigzag Level Order Traversal",
    cppSig: `class Solution {\npublic:\n    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        pass`,
    cppDriver: `int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    vector<int> vals(n);
    for (int i = 0; i < n; i++) cin >> vals[i];
    if (vals[0] == -1) return 0;
    vector<TreeNode*> nodes(n, nullptr);
    for (int i = 0; i < n; i++) if (vals[i] != -1) nodes[i] = new TreeNode(vals[i]);
    for (int i = 0; i < n; i++) {
        if (nodes[i]) {
            if (2 * i + 1 < n) nodes[i]->left = nodes[2 * i + 1];
            if (2 * i + 2 < n) nodes[i]->right = nodes[2 * i + 2];
        }
    }
    Solution sol;
    vector<vector<int>> res = sol.zigzagLevelOrder(nodes[0]);
    for (auto& row : res) {
        for (size_t j = 0; j < row.size(); j++) cout << row[j] << (j + 1 == row.size() ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 0: sys.exit(0)
    n = int(raw[0])
    vals = [int(x) for x in raw[1:n+1]]
    if vals[0] == -1: sys.exit(0)
    nodes = [TreeNode(v) if v != -1 else None for v in vals]
    for i in range(n):
        if nodes[i]:
            if 2 * i + 1 < n: nodes[i].left = nodes[2 * i + 1]
            if 2 * i + 2 < n: nodes[i].right = nodes[2 * i + 2]
    sol = Solution()
    res = sol.zigzagLevelOrder(nodes[0])
    for row in res: print(" ".join(map(str, row)))`
  },
  96: {
    title: "Course Schedule",
    cppSig: `class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        pass`,
    cppDriver: `int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int>> prereqs(m, vector<int>(2));
    for (int i = 0; i < m; i++) cin >> prereqs[i][0] >> prereqs[i][1];
    Solution sol;
    cout << (sol.canFinish(n, prereqs) ? "true" : "false") << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, m = int(raw[0]), int(raw[1])
    prereqs = []
    idx = 2
    for _ in range(m):
        prereqs.append([int(raw[idx]), int(raw[idx+1])])
        idx += 2
    sol = Solution()
    print("true" if sol.canFinish(n, prereqs) else "false")`
  },
  97: {
    title: "Course Schedule II",
    cppSig: `class Solution {\npublic:\n    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:\n        pass`,
    cppDriver: `int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int>> prereqs(m, vector<int>(2));
    for (int i = 0; i < m; i++) cin >> prereqs[i][0] >> prereqs[i][1];
    Solution sol;
    vector<int> order = sol.findOrder(n, prereqs);
    if ((int)order.size() != n) cout << -1 << "\\n";
    else {
        for (int i = 0; i < n; i++) cout << order[i] << (i + 1 == n ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, m = int(raw[0]), int(raw[1])
    prereqs = []
    idx = 2
    for _ in range(m):
        prereqs.append([int(raw[idx]), int(raw[idx+1])])
        idx += 2
    sol = Solution()
    order = sol.findOrder(n, prereqs)
    if len(order) != n: print(-1)
    else: print(" ".join(map(str, order)))`
  },
  98: {
    title: "Flood Fill",
    cppSig: `class Solution {\npublic:\n    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:\n        pass`,
    cppDriver: `int main() {
    int m, n, sr, sc, color;
    if (!(cin >> m >> n >> sr >> sc >> color)) return 0;
    vector<vector<int>> img(m, vector<int>(n));
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) cin >> img[i][j];
    Solution sol;
    vector<vector<int>> res = sol.floodFill(img, sr, sc, color);
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) cout << res[i][j] << (j + 1 == n ? "" : " ");
        cout << "\\n";
    }
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    m, n, sr, sc, color = int(raw[0]), int(raw[1]), int(raw[2]), int(raw[3]), int(raw[4])
    idx = 5
    img = []
    for _ in range(m):
        img.append([int(x) for x in raw[idx:idx+n]])
        idx += n
    sol = Solution()
    res = sol.floodFill(img, sr, sc, color)
    for row in res: print(" ".join(map(str, row)))`
  },
  99: {
    title: "0/1 Knapsack Problem",
    cppSig: `class Solution {\npublic:\n    int knapSack(int W, vector<int>& wt, vector<int>& val) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def knapSack(self, W: int, wt: List[int], val: List[int]) -> int:\n        pass`,
    cppDriver: `int main() {
    int n, W;
    if (!(cin >> n >> W)) return 0;
    vector<int> wt(n), val(n);
    for (int i = 0; i < n; i++) cin >> wt[i];
    for (int i = 0; i < n; i++) cin >> val[i];
    Solution sol;
    cout << sol.knapSack(W, wt, val) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    n, W = int(raw[0]), int(raw[1])
    wt = [int(x) for x in raw[2:n+2]]
    val = [int(x) for x in raw[n+2:2*n+2]]
    sol = Solution()
    print(sol.knapSack(W, wt, val))`
  },
  100: {
    title: "Longest Common Subsequence",
    cppSig: `class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        \n    }\n};`,
    pySig: `class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        pass`,
    cppDriver: `int main() {
    string s1, s2;
    if (!(cin >> s1 >> s2)) return 0;
    Solution sol;
    cout << sol.longestCommonSubsequence(s1, s2) << "\\n";
    return 0;
}`,
    pyDriver: `if __name__ == '__main__':
    raw = sys.stdin.read().split()
    if not raw: sys.exit(0)
    sol = Solution()
    print(sol.longestCommonSubsequence(raw[0], raw[1]))`
  }
};
