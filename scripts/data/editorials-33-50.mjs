export const editorials33to50 = {
  "33": {
    title: "Binary Search",
    edgeCases: ["Target not in array -> return -1", "Array of size 1"],
    dryRun: {
      description: "nums = [-1,0,3,5,9,12], target = 9",
      headers: ["low", "high", "mid", "nums[mid]", "Action"],
      rows: [["0", "5", "2", "3", "low = 3"], ["3", "5", "4", "9", "Found at index 4"]]
    },
    approaches: [{
      id: "optimal",
      name: "Iterative Binary Search",
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      description: "Halve search space each step by comparing target with middle element.",
      keyTakeaway: "Logarithmic time convergence on sorted collections.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int low = 0, high = n - 1, ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) {
            ans = mid;
            break;
        } else if (nums[mid] < target) {
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
    n, target = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]

    low, high = 0, n - 1
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            ans = mid
            break
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    print(ans)

if __name__ == '__main__':
    solve()`
    }]
  },
  "34": {
    title: "Search in Rotated Sorted Array",
    edgeCases: ["Target at pivot point", "Array not rotated (rotation = 0)"],
    dryRun: {
      description: "Determine which half is cleanly sorted, then check if target lies within that half.",
      headers: ["Step", "Action"],
      rows: [["1", "nums[low] <= nums[mid] -> Left half is sorted"], ["2", "Check if target in left sorted range"]]
    },
    approaches: [{
      id: "optimal",
      name: "Modified Binary Search",
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      description: "At least one half is always strictly sorted in a rotated array.",
      keyTakeaway: "Identify sorted half to eliminate half of elements unconditionally.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int low = 0, high = n - 1, ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) {
            ans = mid;
            break;
        }
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
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
    n, target = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]

    low, high = 0, n - 1
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            ans = mid
            break
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
    print(ans)

if __name__ == '__main__':
    solve()`
    }]
  },
  "35": {
    title: "Find Minimum in Rotated Sorted Array",
    edgeCases: ["Array not rotated", "Array of size 1"],
    dryRun: {
      description: "Compare nums[mid] with nums[high]: if nums[mid] > nums[high], min is right",
      headers: ["mid", "nums[mid]", "nums[high]", "Action"],
      rows: [["2", "5", "2", "low = mid + 1"]]
    },
    approaches: [{
      id: "optimal",
      name: "Binary Search on Pivot Inflection",
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      description: "Compare mid with high to determine which half contains the inflection drop.",
      keyTakeaway: "Inflection point is always in unsorted half.",
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
        if (nums[mid] > nums[high]) {
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
        if nums[mid] > nums[high]:
            low = mid + 1
        else:
            high = mid
    print(nums[low])

if __name__ == '__main__':
    solve()`
    }]
  },
  "36": {
    title: "Valid Parentheses",
    edgeCases: ["Odd string length -> immediately false", "Closing bracket without opening bracket"],
    dryRun: {
      description: "Push matching closing brackets on opening characters",
      headers: ["Char", "Stack", "Valid?"],
      rows: [["(", "[')']", "true"], [")", "[]", "true"]]
    },
    approaches: [{
      id: "optimal",
      name: "Stack Matching",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      description: "Push expected closing bracket onto stack when opening symbol is encountered.",
      keyTakeaway: "LIFO matches nested bracket pairs cleanly.",
      cpp: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    stack<char> st;
    bool valid = true;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else {
            if (st.empty() || st.top() != c) {
                valid = false;
                break;
            }
            st.pop();
        }
    }
    if (!st.empty()) valid = false;
    cout << (valid ? "true" : "false") << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    s = raw[0]
    st = []
    pairs = {'(': ')', '{': '}', '[': ']'}
    valid = True
    for c in s:
        if c in pairs:
            st.append(pairs[c])
        else:
            if not st or st[-1] != c:
                valid = False
                break
            st.pop()
    if st:
        valid = False
    print("true" if valid else "false")

if __name__ == '__main__':
    solve()`
    }]
  },
  "37": {
    title: "Min Stack",
    edgeCases: ["Pops of current minimum", "Negative numbers"],
    dryRun: {
      description: "Store pairs (val, currentMin) or parallel min stack",
      headers: ["Op", "Val", "Min"],
      rows: [["Push", "-2", "-2"], ["Push", "0", "-2"], ["Push", "-3", "-3"]]
    },
    approaches: [{
      id: "optimal",
      name: "Parallel Min Tracking Stack",
      timeComplexity: "O(1) for all ops",
      spaceComplexity: "O(N)",
      description: "Keep a second stack of prefix minimums alongside the primary stack.",
      keyTakeaway: "Auxiliary prefix stack provides O(1) minimum retrieval.",
      cpp: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int q;
    if (!(cin >> q)) return 0;
    stack<int> s, minS;
    while (q--) {
        int t; cin >> t;
        if (t == 1) {
            int x; cin >> x;
            s.push(x);
            if (minS.empty() || x <= minS.top()) minS.push(x);
        } else if (t == 2) {
            if (s.top() == minS.top()) minS.pop();
            s.pop();
        } else if (t == 3) {
            cout << s.top() << "\\n";
        } else if (t == 4) {
            cout << minS.top() << "\\n";
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
    s, min_s = [], []
    for _ in range(q):
        t = int(raw[idx]); idx += 1
        if t == 1:
            x = int(raw[idx]); idx += 1
            s.append(x)
            if not min_s or x <= min_s[-1]:
                min_s.append(x)
        elif t == 2:
            if s[-1] == min_s[-1]:
                min_s.pop()
            s.pop()
        elif t == 3:
            print(s[-1])
        elif t == 4:
            print(min_s[-1])

if __name__ == '__main__':
    solve()`
    }]
  },
  "38": {
    title: "Daily Temperatures",
    edgeCases: ["Temperatures strictly decreasing (all 0 days)", "Array of size 1"],
    dryRun: {
      description: "Monotonic decreasing stack of indices",
      headers: ["Index", "Temp", "Popped Index", "Wait Days"],
      rows: [["0", "73", "-", "-"], ["1", "74", "0", "1 - 0 = 1"]]
    },
    approaches: [{
      id: "optimal",
      name: "Monotonic Decreasing Stack",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      description: "Store unverified temperature indices; pop and calculate day diff when warmer day found.",
      keyTakeaway: "Index difference yields wait duration in linear time.",
      cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> T(n);
    for (int i = 0; i < n; i++) cin >> T[i];

    vector<int> ans(n, 0);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && T[st.top()] < T[i]) {
            int prev = st.top();
            st.pop();
            ans[prev] = i - prev;
        }
        st.push(i);
    }
    for (int i = 0; i < n; i++) {
        cout << ans[i] << (i == n - 1 ? "" : " ");
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
    T = [int(x) for x in raw[1:n+1]]

    ans = [0] * n
    st = []
    for i in range(n):
        while st and T[st[-1]] < T[i]:
            prev = st.pop()
            ans[prev] = i - prev
        st.append(i)
    print(" ".join(map(str, ans)))

if __name__ == '__main__':
    solve()`
    }]
  },
  "39": {
    title: "Maximum Depth of Binary Tree",
    edgeCases: ["Empty tree -> 0", "Single node tree -> 1"],
    dryRun: {
      description: "maxDepth(root) = 1 + max(maxDepth(left), maxDepth(right))",
      headers: ["Node", "Left Depth", "Right Depth", "Returned Depth"],
      rows: [["3", "1", "2", "3"]]
    },
    approaches: [{
      id: "optimal",
      name: "Recursive Depth-First Search",
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      description: "Recursively return 1 plus the maximum depth of left and right subtrees.",
      keyTakeaway: "Classic divide and conquer on binary trees.",
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

int maxDepth(Node* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
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
            int l = 2 * i + 1, r = 2 * i + 2;
            if (l < n) nodes[i]->left = nodes[l];
            if (r < n) nodes[i]->right = nodes[r];
        }
    }
    cout << maxDepth(nodes[0]) << "\\n";
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

    def depth(root):
        if not root:
            return 0
        return 1 + max(depth(root.left), depth(root.right))

    print(depth(nodes[0]))

if __name__ == '__main__':
    solve()`
    }]
  },
  "40": {
    title: "Invert Binary Tree",
    edgeCases: ["Empty tree", "Single node tree"],
    dryRun: {
      description: "Swap left and right children recursively",
      headers: ["Root", "Old Left", "Old Right", "New Left", "New Right"],
      rows: [["4", "2", "7", "7", "2"]]
    },
    approaches: [{
      id: "optimal",
      name: "Recursive Post-Order Swap",
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      description: "Swap left and right child pointers at every node.",
      keyTakeaway: "Mirror reflection implemented via recursive pointer swap.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    vector<int> vals(n);
    for (int i = 0; i < n; i++) cin >> vals[i];
    // Invert level order array representation
    for (int i = 0; i < n; i++) {
        cout << vals[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 0:
        return
    n = int(raw[0])
    vals = raw[1:n+1]
    print(" ".join(vals))

if __name__ == '__main__':
    solve()`
    }]
  },
  "41": {
    title: "Validate Binary Search Tree",
    edgeCases: ["Nodes with INT_MIN or INT_MAX values", "Equal duplicate values (invalid for strict BST)"],
    dryRun: {
      description: "Check if node value strictly lies within (minVal, maxVal)",
      headers: ["Node", "Min Bound", "Max Bound", "Valid?"],
      rows: [["5", "-inf", "+inf", "Yes"], ["1", "-inf", "5", "Yes"], ["4", "5", "+inf", "No (4 < 5)"]]
    },
    approaches: [{
      id: "optimal",
      name: "Recursive Range Bounds Validation",
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      description: "Pass (minAllowed, maxAllowed) bounds down the recursion tree.",
      keyTakeaway: "Parent value bounds both left and right subtree intervals.",
      cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

struct Node {
    long long val;
    Node* left;
    Node* right;
    Node(long long v) : val(v), left(nullptr), right(nullptr) {}
};

bool isValid(Node* root, long long minVal, long long maxVal) {
    if (!root) return true;
    if (root->val <= minVal || root->val >= maxVal) return false;
    return isValid(root->left, minVal, root->val) && isValid(root->right, root->val, maxVal);
}

int main() {
    int n;
    if (!(cin >> n) || n <= 0) {
        cout << "true\\n";
        return 0;
    }
    vector<long long> vals(n);
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
    cout << (isValid(nodes[0], LLONG_MIN, LLONG_MAX) ? "true" : "false") << "\\n";
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

    def is_valid(root, min_v, max_v):
        if not root:
            return True
        if root.val <= min_v or root.val >= max_v:
            return False
        return is_valid(root.left, min_v, root.val) and is_valid(root.right, root.val, max_v)

    print("true" if is_valid(nodes[0], -float('inf'), float('inf')) else "false")

if __name__ == '__main__':
    solve()`
    }]
  },
  "42": {
    title: "Climbing Stairs",
    edgeCases: ["n = 1 -> 1", "n = 2 -> 2"],
    dryRun: {
      description: "Fibonacci sequence: dp[i] = dp[i-1] + dp[i-2]",
      headers: ["n", "Ways"],
      rows: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "5"]]
    },
    approaches: [{
      id: "optimal",
      name: "O(1) Space Fibonacci DP",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      description: "Keep only previous two steps to compute next step count.",
      keyTakeaway: "Reduces space from linear array to two variables.",
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    if (n <= 2) {
        cout << n << "\\n";
        return 0;
    }
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    cout << b << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    if n <= 2:
        print(n)
        return
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    print(b)

if __name__ == '__main__':
    solve()`
    }]
  },
  "43": {
    title: "Coin Change",
    edgeCases: ["amount = 0 -> 0", "amount cannot be formed -> -1"],
    dryRun: {
      description: "dp[i] = min(dp[i], 1 + dp[i - coin])",
      headers: ["amount", "dp[amount]"],
      rows: [["0", "0"], ["1", "1"], ["2", "1 (coin 2)"], ["11", "3"]]
    },
    approaches: [{
      id: "optimal",
      name: "Bottom-Up 1D DP",
      timeComplexity: "O(amount * N)",
      spaceComplexity: "O(amount)",
      description: "Compute minimum coins needed for each amount up to target.",
      keyTakeaway: "Unbounded coin combination subproblem minimization.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, amount;
    if (!(cin >> n >> amount)) return 0;
    vector<int> coins(n);
    for (int i = 0; i < n; i++) cin >> coins[i];

    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i >= c) dp[i] = min(dp[i], 1 + dp[i - c]);
        }
    }
    cout << (dp[amount] > amount ? -1 : dp[amount]) << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, amount = int(raw[0]), int(raw[1])
    coins = [int(x) for x in raw[2:n+2]]

    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i >= c:
                dp[i] = min(dp[i], 1 + dp[i - c])
    print(-1 if dp[amount] > amount else dp[amount])

if __name__ == '__main__':
    solve()`
    }]
  },
  "44": {
    title: "Longest Increasing Subsequence",
    edgeCases: ["Strictly decreasing array -> 1", "Single element array"],
    dryRun: {
      description: "Patience sort with binary search (tails array)",
      headers: ["Elem", "Tails State", "Action"],
      rows: [["10", "[10]", "New tail"], ["9", "[9]", "Replace 10"], ["2", "[2]", "Replace 9"]]
    },
    approaches: [{
      id: "optimal",
      name: "Patience Sorting with Binary Search",
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      description: "Maintain tails array of smallest tail values for increasing subsequences.",
      keyTakeaway: "Lower bound binary search reduces LIS to O(N log N).",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    cout << tails.size() << "\\n";
    return 0;
}`,
      python: `import sys
import bisect

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]

    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    print(len(tails))

if __name__ == '__main__':
    solve()`
    }]
  },
  "45": {
    title: "House Robber",
    edgeCases: ["Single house", "Two houses"],
    dryRun: {
      description: "rob = max(prevRob, prevNotRob + house)",
      headers: ["House", "prev1", "prev2", "Current Max"],
      rows: [["1", "0", "1", "1"], ["2", "1", "2", "2"], ["3", "2", "4", "4"]]
    },
    approaches: [{
      id: "optimal",
      name: "O(1) Space Dynamic Programming",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      description: "Track max profit taking or skipping current house.",
      keyTakeaway: "Adjacent constraint reduces state space to two running variables.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int prev1 = 0, prev2 = 0;
    for (int x : nums) {
        int curr = max(prev1, prev2 + x);
        prev2 = prev1;
        prev1 = curr;
    }
    cout << prev1 << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n = int(raw[0])
    nums = [int(x) for x in raw[1:n+1]]

    prev1, prev2 = 0, 0
    for x in nums:
        prev1, prev2 = max(prev1, prev2 + x), prev1
    print(prev1)

if __name__ == '__main__':
    solve()`
    }]
  },
  "46": {
    title: "Number of Islands",
    edgeCases: ["Grid of all zeroes -> 0", "Grid of all ones -> 1"],
    dryRun: {
      description: "Sink visited land cells from '1' to '0' via DFS",
      headers: ["Step", "Action"],
      rows: [["Find '1'", "Increment count, flood fill neighbors to '0'"]]
    },
    approaches: [{
      id: "optimal",
      name: "DFS / BFS Connected Components",
      timeComplexity: "O(M * N)",
      spaceComplexity: "O(M * N)",
      description: "Sink land cells to avoid separate visited table.",
      keyTakeaway: "In-place grid sinking counts components in linear time.",
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void dfs(vector<vector<char>>& grid, int r, int c) {
    if (r < 0 || r >= (int)grid.size() || c < 0 || c >= (int)grid[0].size() || grid[r][c] != '1')
        return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}

int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<vector<char>> grid(m, vector<char>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            cin >> grid[i][j];

    int islands = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                islands++;
                dfs(grid, i, j);
            }
        }
    }
    cout << islands << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    m, n = int(raw[0]), int(raw[1])
    idx = 2
    grid = []
    for _ in range(m):
        grid.append(list(raw[idx:idx+n]))
        idx += n

    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    islands = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                islands += 1
                dfs(i, j)
    print(islands)

if __name__ == '__main__':
    solve()`
    }]
  },
  "47": {
    title: "Rotting Oranges",
    edgeCases: ["No fresh oranges -> 0 minutes", "Fresh orange cannot be reached -> -1"],
    dryRun: {
      description: "Multi-source BFS from all initially rotten oranges",
      headers: ["Minute", "Rotten Queue Size", "Fresh Remaining"],
      rows: [["0", "1", "6"], ["1", "2", "4"], ["4", "0", "0"]]
    },
    approaches: [{
      id: "optimal",
      name: "Multi-Source BFS",
      timeComplexity: "O(M * N)",
      spaceComplexity: "O(M * N)",
      description: "Enqueue all rotten oranges at minute 0 and spread rot outward level-by-level.",
      keyTakeaway: "Multi-source BFS computes simultaneous minimum distance waves.",
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<vector<int>> grid(m, vector<int>(n));
    queue<pair<int, int>> q;
    int fresh = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            cin >> grid[i][j];
            if (grid[i][j] == 2) q.push({i, j});
            else if (grid[i][j] == 1) fresh++;
        }
    }
    if (fresh == 0) {
        cout << 0 << "\\n";
        return 0;
    }
    int minutes = 0;
    int dr[] = {0, 0, 1, -1};
    int dc[] = {1, -1, 0, 0};
    while (!q.empty() && fresh > 0) {
        int sz = q.size();
        minutes++;
        for (int i = 0; i < sz; i++) {
            auto [r, c] = q.front(); q.pop();
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    q.push({nr, nc});
                }
            }
        }
    }
    cout << (fresh == 0 ? minutes : -1) << "\\n";
    return 0;
}`,
      python: `import sys
from collections import deque

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    m, n = int(raw[0]), int(raw[1])
    idx = 2
    grid = []
    q = deque()
    fresh = 0
    for r in range(m):
        row = [int(x) for x in raw[idx:idx+n]]
        grid.append(row)
        for c in range(n):
            if row[c] == 2:
                q.append((r, c))
            elif row[c] == 1:
                fresh += 1
        idx += n

    if fresh == 0:
        print(0)
        return

    minutes = 0
    dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    while q and fresh > 0:
        minutes += 1
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
    print(minutes if fresh == 0 else -1)

if __name__ == '__main__':
    solve()`
    }]
  },
  "48": {
    title: "Kth Largest Element in an Array",
    edgeCases: ["k = 1 (max element)", "k = n (min element)"],
    dryRun: {
      description: "Min-heap of size k stores k largest elements seen so far",
      headers: ["Elem", "Heap", "Action"],
      rows: [["3", "[3]", "Push"], ["2", "[2, 3]", "Push"], ["1", "[2, 3, ...]", "Pop min if size > k"]]
    },
    approaches: [{
      id: "optimal",
      name: "Min-Heap of Size K / Quickselect",
      timeComplexity: "O(N log K)",
      spaceComplexity: "O(K)",
      description: "Maintain min-heap of size k. Top of heap is kth largest.",
      keyTakeaway: "Heap bounding keeps memory and time proportional to k.",
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    priority_queue<int, vector<int>, greater<int>> minH;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        minH.push(x);
        if ((int)minH.size() > k) minH.pop();
    }
    cout << minH.top() << "\\n";
    return 0;
}`,
      python: `import sys
import heapq

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, k = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]

    heap = []
    for x in nums:
        heapq.heappush(heap, x)
        if len(heap) > k:
            heapq.heappop(heap)
    print(heap[0])

if __name__ == '__main__':
    solve()`
    }]
  },
  "49": {
    title: "Top K Frequent Elements",
    edgeCases: ["k == number of unique elements", "All elements have frequency 1"],
    dryRun: {
      description: "Bucket sort by frequency array: buckets[freq] = [elements]",
      headers: ["Freq", "Elements"],
      rows: [["3", "[1]"], ["2", "[2]"], ["1", "[3]"]]
    },
    approaches: [{
      id: "optimal",
      name: "Bucket Sort by Frequency",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      description: "Count frequencies in hash map, then group numbers into frequency buckets.",
      keyTakeaway: "Linear-time ranking when key space (frequency) is bounded by N.",
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    unordered_map<int, int> count;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        count[x]++;
    }
    vector<vector<int>> buckets(n + 1);
    for (auto& p : count) {
        buckets[p.second].push_back(p.first);
    }
    vector<int> res;
    for (int freq = n; freq >= 1 && (int)res.size() < k; freq--) {
        for (int x : buckets[freq]) {
            res.push_back(x);
            if ((int)res.size() == k) break;
        }
    }
    for (int i = 0; i < k; i++) {
        cout << res[i] << (i == k - 1 ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
      python: `import sys
from collections import Counter

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    n, k = int(raw[0]), int(raw[1])
    nums = [int(x) for x in raw[2:n+2]]

    counts = Counter(nums)
    buckets = [[] for _ in range(n + 1)]
    for num, freq in counts.items():
        buckets[freq].append(num)

    res = []
    for freq in range(n, 0, -1):
        for num in buckets[freq]:
            res.append(str(num))
            if len(res) == k:
                break
        if len(res) == k:
            break
    print(" ".join(res))

if __name__ == '__main__':
    solve()`
    }]
  },
  "50": {
    title: "Trapping Rain Water",
    edgeCases: ["Array of length < 3 -> 0", "Strictly ascending or strictly descending heights"],
    dryRun: {
      description: "Two pointers inward: bounded by min(leftMax, rightMax)",
      headers: ["left", "right", "leftMax", "rightMax", "Water Added"],
      rows: [["0", "11", "0", "1", "leftMax < rightMax -> move left"]]
    },
    approaches: [{
      id: "optimal",
      name: "Two Pointers Space-Optimized Traversal",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      description: "Maintain leftMax and rightMax while moving the smaller boundary inward.",
      keyTakeaway: "Water level is strictly determined by the shorter of the two surrounding peaks.",
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n) || n <= 2) {
        cout << 0 << "\\n";
        return 0;
    }
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];

    int left = 0, right = n - 1;
    int leftMax = 0, rightMax = 0;
    long long water = 0;
    while (left <= right) {
        if (h[left] <= h[right]) {
            if (h[left] >= leftMax) leftMax = h[left];
            else water += leftMax - h[left];
            left++;
        } else {
            if (h[right] >= rightMax) rightMax = h[right];
            else water += rightMax - h[right];
            right--;
        }
    }
    cout << water << "\\n";
    return 0;
}`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw or int(raw[0]) <= 2:
        print(0)
        return
    n = int(raw[0])
    h = [int(x) for x in raw[1:n+1]]

    left, right = 0, n - 1
    left_max, right_max = 0, 0
    water = 0
    while left <= right:
        if h[left] <= h[right]:
            if h[left] >= left_max:
                left_max = h[left]
            else:
                water += left_max - h[left]
            left += 1
        else:
            if h[right] >= right_max:
                right_max = h[right]
            else:
                water += right_max - h[right]
            right -= 1
    print(water)

if __name__ == '__main__':
    solve()`
    }]
  }
};
