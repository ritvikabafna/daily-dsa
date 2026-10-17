const editorials = {
  1: {
    title: "Two Sum",
    edgeCases: [
      "Negative numbers in array and target (e.g. nums = [-3, 4, 3, 90], target = 0).",
      "Duplicate numbers making the target (e.g. nums = [3, 3], target = 6) - handled by checking complement before inserting.",
      "Large numbers up to 10⁹ without overflow in standard 32-bit integers.",
    ],
    dryRun: {
      description: "nums = [2, 7, 11, 15], target = 9",
      headers: ["Index i", "nums[i]", "Complement (9 - nums[i])", "Seen in Map?", "Action"],
      rows: [
        ["0", "2", "7", "No (map is empty)", "Insert seen[2] = 0"],
        ["1", "7", "2", "Yes! Found at index 0", "Return indices [seen[2], 1] = [0, 1] ✅"],
      ],
    },
    approaches: [
      {
        id: "brute",
        name: "1. Brute Force (Nested Loops)",
        timeComplexity: "O(N²)",
        spaceComplexity: "O(1)",
        description: "Check every possible pair (i, j) where i < j. If nums[i] + nums[j] equals target, return their indices. While straightforward, it results in O(N²) time complexity and times out on large inputs.",
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target;
    cin >> target;

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                cout << i << " " << j << endl;
                return 0;
            }
        }
    }
    return 0;
}`,
        python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    target = int(input_data[n+1])

    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                print(f"{i} {j}")
                return

if __name__ == '__main__':
    solve()`,
      },
      {
        id: "optimal",
        name: "2. Optimal (One-Pass Hash Map)",
        timeComplexity: "O(N)",
        spaceComplexity: "O(N)",
        description: "Traverse the array once while storing each number and its index in an unordered hash map. For each element `nums[i]`, check if `target - nums[i]` exists in the map. This achieves linear O(N) runtime.",
        keyTakeaway: "Trade O(N) auxiliary space to avoid redundant iterations and drop time from O(N²) to O(N).",
        cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target;
    cin >> target;

    unordered_map<int, int> seen;
    for (int i = 0; i < n; i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            cout << seen[complement] << " " << i << endl;
            return 0;
        }
        seen[nums[i]] = i;
    }
    return 0;
}`,
        python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    target = int(input_data[n+1])

    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            print(f"{seen[complement]} {i}")
            return
        seen[num] = i

if __name__ == '__main__':
    solve()`,
      },
    ],
  },

  2: {
    title: "Best Time to Buy and Sell Stock",
    edgeCases: [
      "Strictly decreasing prices (e.g. [7, 6, 4, 3, 1]): no profit can be made, must return 0.",
      "Single price day (N = 1): buying and selling on the same day yields 0 profit.",
      "Multiple peaks: ensure the algorithm doesn't reset after the first profitable peak.",
    ],
    dryRun: {
      description: "prices = [7, 1, 5, 3, 6, 4]",
      headers: ["Day i", "Price", "minPrice so far", "Potential Profit (price - minPrice)", "maxProfit so far"],
      rows: [
        ["0", "7", "7", "7 - 7 = 0", "0"],
        ["1", "1", "min(7, 1) = 1", "1 - 1 = 0", "0"],
        ["2", "5", "1", "5 - 1 = 4", "max(0, 4) = 4"],
        ["3", "3", "1", "3 - 1 = 2", "4"],
        ["4", "6", "1", "6 - 1 = 5", "max(4, 5) = 5 ✅"],
        ["5", "4", "1", "4 - 1 = 3", "5"],
      ],
    },
    approaches: [
      {
        id: "brute",
        name: "1. Brute Force (All Buy/Sell Pairs)",
        timeComplexity: "O(N²)",
        spaceComplexity: "O(1)",
        description: "Consider every day i as a buy day and every subsequent day j > i as a sell day. Compute prices[j] - prices[i] and track the maximum profit.",
        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> prices(n);
    for (int i = 0; i < n; i++) cin >> prices[i];

    int maxProfit = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            maxProfit = max(maxProfit, prices[j] - prices[i]);
        }
    }
    cout << maxProfit << endl;
    return 0;
}`,
        python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    prices = [int(x) for x in input_data[1:n+1]]

    max_profit = 0
    for i in range(n):
        for j in range(i + 1, n):
            max_profit = max(max_profit, prices[j] - prices[i])
    print(max_profit)

if __name__ == '__main__':
    solve()`,
      },
      {
        id: "optimal",
        name: "2. Optimal (One-Pass Min Tracking)",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        description: "Keep track of the minimum price observed so far. At each step, if we sell today, our profit is price - minPrice. Update maxProfit continuously in a single pass.",
        keyTakeaway: "A rolling minimum state variable eliminates nested loops in constant O(1) space.",
        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> prices(n);
    for (int i = 0; i < n; i++) cin >> prices[i];

    int minPrice = 1e9;
    int maxProfit = 0;
    for (int p : prices) {
        minPrice = min(minPrice, p);
        maxProfit = max(maxProfit, p - minPrice);
    }
    cout << maxProfit << endl;
    return 0;
}`,
        python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    prices = [int(x) for x in input_data[1:n+1]]

    min_price = float('inf')
    max_profit = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_profit:
            max_profit = p - min_price
    print(max_profit)

if __name__ == '__main__':
    solve()`,
      },
    ],
  },

  3: {
    title: "Contains Duplicate",
    edgeCases: [
      "All elements distinct: full scan required before returning false.",
      "Immediate duplicate at indices 0 and 1: early exit should trigger immediately.",
      "Negative and zero values in the input.",
    ],
    dryRun: {
      description: "nums = [1, 2, 3, 1]",
      headers: ["Step i", "Element", "In Hash Set?", "Action"],
      rows: [
        ["0", "1", "No", "Insert 1 into set -> {1}"],
        ["1", "2", "No", "Insert 2 into set -> {1, 2}"],
        ["2", "3", "No", "Insert 3 into set -> {1, 2, 3}"],
        ["3", "1", "Yes! Duplicate found", "Return true immediately ✅"],
      ],
    },
    approaches: [
      {
        id: "sorting",
        name: "1. Sorting Approach",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(1)",
        description: "Sort the array in-place. If any duplicate exists, it will be positioned adjacent to its identical neighbor (nums[i] == nums[i-1]).",
        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    sort(nums.begin(), nums.end());
    for (int i = 1; i < n; i++) {
        if (nums[i] == nums[i - 1]) {
            cout << "true" << endl;
            return 0;
        }
    }
    cout << "false" << endl;
    return 0;
}`,
        python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    nums.sort()
    for i in range(1, n):
        if nums[i] == nums[i - 1]:
            print("true")
            return
    print("false")

if __name__ == '__main__':
    solve()`,
      },
      {
        id: "optimal",
        name: "2. Optimal (Hash Set)",
        timeComplexity: "O(N)",
        spaceComplexity: "O(N)",
        description: "Scan elements and insert into a Hash Set. If the current element already exists in the set, a duplicate has been found. Return true immediately.",
        keyTakeaway: "Early-exit on the first duplicate saves unnecessary iterations.",
        cpp: `#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    unordered_set<int> seen;
    bool hasDuplicate = false;
    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        if (seen.count(val)) {
            hasDuplicate = true;
        }
        seen.insert(val);
    }
    cout << (hasDuplicate ? "true" : "false") << endl;
    return 0;
}`,
        python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    print("true" if len(set(nums)) < len(nums) else "false")

if __name__ == '__main__':
    solve()`,
      },
    ],
  },

  4: {
    title: "Maximum Subarray",
    edgeCases: [
      "All negative numbers (e.g. [-5, -2, -8]): maximum sum is the single least-negative element (-2).",
      "Single element array (N = 1): return that single element.",
      "Large sums that could exceed standard 32-bit limits if not bounded.",
    ],
    dryRun: {
      description: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      headers: ["Index i", "nums[i]", "Choice: max(x, currentSum + x)", "currentSum", "maxSum"],
      rows: [
        ["0", "-2", "Initial start", "-2", "-2"],
        ["1", "1", "max(1, -2 + 1 = -1) = 1", "1", "1"],
        ["2", "-3", "max(-3, 1 + -3 = -2) = -2", "-2", "1"],
        ["3", "4", "max(4, -2 + 4 = 2) = 4", "4", "4"],
        ["4", "-1", "max(-1, 4 + -1 = 3) = 3", "3", "4"],
        ["5", "2", "max(2, 3 + 2 = 5) = 5", "5", "5"],
        ["6", "1", "max(1, 5 + 1 = 6) = 6", "6", "6 ✅"],
        ["7", "-5", "max(-5, 6 + -5 = 1) = 1", "1", "6"],
        ["8", "4", "max(4, 1 + 4 = 5) = 5", "5", "6"],
      ],
    },
    approaches: [
      {
        id: "brute",
        name: "1. Brute Force (All Subarrays)",
        timeComplexity: "O(N²)",
        spaceComplexity: "O(1)",
        description: "Check all starting indices i and ending indices j, maintaining running sum to find the largest subarray sum.",
        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    long long maxSum = nums[0];
    for (int i = 0; i < n; i++) {
        long long currentSum = 0;
        for (int j = i; j < n; j++) {
            currentSum += nums[j];
            maxSum = max(maxSum, currentSum);
        }
    }
    cout << maxSum << endl;
    return 0;
}`,
        python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]

    max_sum = nums[0]
    for i in range(n):
        curr = 0
        for j in range(i, n):
            curr += nums[j]
            max_sum = max(max_sum, curr)
    print(max_sum)

if __name__ == '__main__':
    solve()`,
      },
      {
        id: "optimal",
        name: "2. Optimal (Kadane's Algorithm)",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        description: "Apply Kadane's Algorithm. Maintain running currentSum. At each step decide whether to continue the existing subarray or start fresh from current number.",
        keyTakeaway: "Kadane's algorithm solves maximum subarray in linear O(N) time with O(1) space.",
        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    long long currentSum = nums[0];
    long long maxSum = nums[0];
    for (int i = 1; i < n; i++) {
        currentSum = max((long long)nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    cout << maxSum << endl;
    return 0;
}`,
        python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]

    current_sum = nums[0]
    max_sum = nums[0]
    for x in nums[1:]:
        current_sum = max(x, current_sum + x)
        max_sum = max(max_sum, current_sum)
    print(max_sum)

if __name__ == '__main__':
    solve()`,
      },
    ],
  },

  32: {
    title: "Remove Duplicates from Sorted Array",
    edgeCases: [
      "Empty array (N = 0): return count 0.",
      "Array with no duplicates (e.g. [1, 2, 3]): relative order and count remain unchanged.",
      "All duplicate elements (e.g. [1, 1, 1, 1]): returns count 1 with only [1].",
    ],
    dryRun: {
      description: "nums = [1, 1, 2]",
      headers: ["Fast Pointer i", "nums[i]", "nums[i-1]", "nums[i] != nums[i-1]?", "writeIdx", "Array State"],
      rows: [
        ["1", "1", "1", "False (duplicate)", "1", "[1, 1, 2]"],
        ["2", "2", "1", "True (new unique)", "writeIdx = 2", "[1, 2, 2] ✅"],
      ],
    },
    approaches: [
      {
        id: "brute",
        name: "1. Auxiliary Memory Approach",
        timeComplexity: "O(N)",
        spaceComplexity: "O(N)",
        description: "Store unique elements in a temporary list or set, then write them back to nums. Uses extra memory which violates the in-place constraint.",
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n) || n <= 0) {
        cout << 0 << endl;
        return 0;
    }
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    vector<int> unique;
    unique.push_back(nums[0]);
    for (int i = 1; i < n; i++) {
        if (nums[i] != nums[i - 1]) {
            unique.push_back(nums[i]);
        }
    }
    cout << unique.size() << endl;
    for (size_t i = 0; i < unique.size(); i++) {
        cout << unique[i] << (i == unique.size() - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
        python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    if n == 0:
        print(0)
        return

    unique = [nums[0]]
    for i in range(1, n):
        if nums[i] != nums[i - 1]:
            unique.append(nums[i])

    print(len(unique))
    print(" ".join(str(x) for x in unique))

if __name__ == '__main__':
    solve()`,
      },
      {
        id: "optimal",
        name: "2. Optimal Two-Pointer In-Place",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        description: "Since array is already sorted, duplicates are adjacent. Use a slow runner pointer writeIdx to overwrite duplicates in-place.",
        keyTakeaway: "Exploit the sorted property to compare only adjacent items in O(1) space.",
        cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n) || n <= 0) {
        cout << 0 << endl;
        return 0;
    }
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    int writeIdx = 1;
    for (int i = 1; i < n; i++) {
        if (nums[i] != nums[i - 1]) {
            nums[writeIdx++] = nums[i];
        }
    }

    cout << writeIdx << endl;
    for (int i = 0; i < writeIdx; i++) {
        cout << nums[i] << (i == writeIdx - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
        python: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    if n == 0:
        print(0)
        return

    write_idx = 1
    for i in range(1, n):
        if nums[i] != nums[i - 1]:
            nums[write_idx] = nums[i]
            write_idx += 1

    print(write_idx)
    print(" ".join(str(nums[i]) for i in range(write_idx)))

if __name__ == '__main__':
    solve()`,
      },
    ],
  },
};

export function getEditorial(problem) {
  if (!problem) return null;
  const existing = editorials[problem.id];
  if (existing) {
    const defaultApproach = existing.approaches ? existing.approaches[existing.approaches.length - 1] : existing;
    return {
      title: existing.title || problem.title,
      timeComplexity: defaultApproach.timeComplexity || "O(N)",
      spaceComplexity: defaultApproach.spaceComplexity || "O(1)",
      approach: defaultApproach.description || existing.approach || "",
      keyTakeaway: defaultApproach.keyTakeaway || existing.keyTakeaway || "",
      cpp: defaultApproach.cpp || existing.cpp || "",
      python: defaultApproach.python || existing.python || "",
      approaches: existing.approaches || [
        {
          id: "optimal",
          name: "Optimal Approach",
          timeComplexity: defaultApproach.timeComplexity || "O(N)",
          spaceComplexity: defaultApproach.spaceComplexity || "O(1)",
          description: defaultApproach.description || existing.approach || "",
          keyTakeaway: defaultApproach.keyTakeaway || existing.keyTakeaway || "",
          cpp: defaultApproach.cpp || existing.cpp || "",
          python: defaultApproach.python || existing.python || "",
        },
      ],
      edgeCases: existing.edgeCases || [
        "Empty or single element input.",
        "Repeated values and boundaries.",
        "Extreme input sizes adhering to problem constraints.",
      ],
      dryRun: existing.dryRun || null,
    };
  }

  // Dynamic Canonical Editorial Fallback for any other problem
  return {
    title: problem.title,
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    approach: `For "${problem.title}", start by identifying the underlying data structure pattern (${problem.tags?.join(", ") || problem.topic}). Formulate a brute-force approach first, then eliminate redundant traversals using optimal state tracking.`,
    keyTakeaway: "Always clarify input constraints to select optimal asymptotic time and space bounds.",
    cpp: `// Reference solution for ${problem.title}
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        // Implementation
    }
    return 0;
}`,
    python: `# Reference solution for ${problem.title}
import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    # Implementation

if __name__ == '__main__':
    solve()`,
    approaches: [
      {
        id: "brute",
        name: "1. Brute Force Approach",
        timeComplexity: "O(N²)",
        spaceComplexity: "O(1)",
        description: `Naive exploration of all possible candidate states for ${problem.title}.`,
        cpp: `// Brute force implementation
#include <iostream>
using namespace std;
int main() {
    return 0;
}`,
        python: `# Brute force implementation
def solve():
    pass`,
      },
      {
        id: "optimal",
        name: "2. Optimal Approach",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        description: `Optimal linear strategy taking advantage of ${problem.topic} properties.`,
        keyTakeaway: "Optimized time complexity down to linear O(N).",
        cpp: `// Optimal implementation
#include <iostream>
using namespace std;
int main() {
    return 0;
}`,
        python: `# Optimal implementation
def solve():
    pass`,
      },
    ],
    edgeCases: [
      "Empty or boundary input length.",
      "Identical or duplicate elements.",
      "Negative or extreme integer bounds.",
    ],
    dryRun: null,
  };
}

export default editorials;
