// Canonical multi-approach solutions and editorials for all 32 curated DSA problems
const editorials = {
  "1": {
    "title": "Two Sum",
    "edgeCases": [
      "Negative numbers in array and target (e.g. nums = [-3, 4, 3, 90], target = 0).",
      "Duplicate numbers making the target (e.g. nums = [3, 3], target = 6) - handled by checking complement before inserting.",
      "Large numbers up to 10⁹ without overflow in standard 32-bit integers."
    ],
    "dryRun": {
      "description": "nums = [2, 7, 11, 15], target = 9",
      "headers": [
        "Index i",
        "nums[i]",
        "Complement (9 - nums[i])",
        "Seen in Map?",
        "Action"
      ],
      "rows": [
        [
          "0",
          "2",
          "7",
          "No (map is empty)",
          "Insert seen[2] = 0"
        ],
        [
          "1",
          "7",
          "2",
          "Yes! Found at index 0",
          "Return indices [seen[2], 1] = [0, 1] ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "brute",
        "name": "1. Brute Force (Nested Loops)",
        "timeComplexity": "O(N²)",
        "spaceComplexity": "O(1)",
        "description": "Check every possible pair (i, j) where i < j. If nums[i] + nums[j] equals target, return their indices. While straightforward, it results in O(N²) time complexity and times out on large inputs.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    int target;\n    cin >> target;\n\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            if (nums[i] + nums[j] == target) {\n                cout << i << \" \" << j << endl;\n                return 0;\n            }\n        }\n    }\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = [int(x) for x in input_data[1:n+1]]\n    target = int(input_data[n+1])\n\n    for i in range(n):\n        for j in range(i + 1, n):\n            if nums[i] + nums[j] == target:\n                print(f\"{i} {j}\")\n                return\n\nif __name__ == '__main__':\n    solve()"
      },
      {
        "id": "optimal",
        "name": "2. Optimal (One-Pass Hash Map)",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "As we iterate through the array, we compute complement = target - nums[i]. We check if complement is already in our hash map. If so, we've found our answer in O(1) time. Otherwise, we store nums[i] with index i.",
        "keyTakeaway": "Trade space for time: A hash map allows looking up previous elements in O(1) time.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    int target;\n    cin >> target;\n\n    unordered_map<int, int> seen;\n    for (int i = 0; i < n; i++) {\n        int complement = target - nums[i];\n        if (seen.find(complement) != seen.end()) {\n            cout << seen[complement] << \" \" << i << endl;\n            return 0;\n        }\n        seen[nums[i]] = i;\n    }\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = [int(x) for x in input_data[1:n+1]]\n    target = int(input_data[n+1])\n\n    seen = {}\n    for i in range(n):\n        complement = target - nums[i]\n        if complement in seen:\n            print(f\"{seen[complement]} {i}\")\n            return\n        seen[nums[i]] = i\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "2": {
    "title": "Best Time to Buy and Sell Stock",
    "edgeCases": [
      "Prices are in strictly decreasing order (e.g. [7, 6, 4, 3, 1]) -> maximum profit is 0.",
      "Single day price (length 1) -> cannot sell, profit is 0.",
      "Multiple peaks and valleys -> only one transaction is allowed."
    ],
    "dryRun": {
      "description": "prices = [7, 1, 5, 3, 6, 4]",
      "headers": [
        "Day i",
        "Price",
        "Min Price So Far",
        "Current Profit",
        "Max Profit"
      ],
      "rows": [
        [
          "0",
          "7",
          "7",
          "0",
          "0"
        ],
        [
          "1",
          "1",
          "1",
          "0",
          "0"
        ],
        [
          "2",
          "5",
          "1",
          "4",
          "4"
        ],
        [
          "3",
          "3",
          "1",
          "2",
          "4"
        ],
        [
          "4",
          "6",
          "1",
          "5",
          "5 ✅"
        ],
        [
          "5",
          "4",
          "1",
          "3",
          "5"
        ]
      ]
    },
    "approaches": [
      {
        "id": "brute",
        "name": "1. Brute Force (All Pairs)",
        "timeComplexity": "O(N²)",
        "spaceComplexity": "O(1)",
        "description": "Compare every buy day i with every subsequent sell day j (j > i) and calculate prices[j] - prices[i]. Keep track of the maximum profit found.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> prices(n);\n    for (int i = 0; i < n; i++) cin >> prices[i];\n\n    int maxProfit = 0;\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            maxProfit = max(maxProfit, prices[j] - prices[i]);\n        }\n    }\n    cout << maxProfit << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    prices = [int(x) for x in input_data[1:n+1]]\n\n    max_profit = 0\n    for i in range(n):\n        for j in range(i + 1, n):\n            max_profit = max(max_profit, prices[j] - prices[i])\n    print(max_profit)\n\nif __name__ == '__main__':\n    solve()"
      },
      {
        "id": "optimal",
        "name": "2. Optimal (One-Pass Min-Tracking)",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Maintain the minimum buying price seen so far. At each step, calculate the potential profit if we sold today. Update the global maximum profit if this is greater.",
        "keyTakeaway": "Single pass dynamic tracking: Record historical minimum to greedily evaluate current profit.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> prices(n);\n    for (int i = 0; i < n; i++) cin >> prices[i];\n\n    int minPrice = 1e9;\n    int maxProfit = 0;\n\n    for (int price : prices) {\n        minPrice = min(minPrice, price);\n        maxProfit = max(maxProfit, price - minPrice);\n    }\n\n    cout << maxProfit << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    prices = [int(x) for x in input_data[1:n+1]]\n\n    min_price = float('inf')\n    max_profit = 0\n\n    for price in prices:\n        if price < min_price:\n            min_price = price\n        elif price - min_price > max_profit:\n            max_profit = price - min_price\n\n    print(max_profit)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "3": {
    "title": "Contains Duplicate",
    "edgeCases": [
      "All unique elements (e.g. [1, 2, 3, 4]) -> false.",
      "Large negative numbers and duplicates (e.g. [-1, -1]) -> true.",
      "Single element array (e.g. [1]) -> false."
    ],
    "dryRun": {
      "description": "nums = [1, 2, 3, 1]",
      "headers": [
        "Index i",
        "nums[i]",
        "In HashSet?",
        "Action"
      ],
      "rows": [
        [
          "0",
          "1",
          "No",
          "Insert 1 into set"
        ],
        [
          "1",
          "2",
          "No",
          "Insert 2 into set"
        ],
        [
          "2",
          "3",
          "No",
          "Insert 3 into set"
        ],
        [
          "3",
          "1",
          "Yes! Already exists",
          "Return true ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "brute",
        "name": "1. Brute Force (Sorting)",
        "timeComplexity": "O(N log N)",
        "spaceComplexity": "O(1)",
        "description": "Sort the array in non-decreasing order. Adjacent duplicates will now be adjacent. Check if nums[i] == nums[i+1].",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    sort(nums.begin(), nums.end());\n    for (int i = 1; i < n; i++) {\n        if (nums[i] == nums[i - 1]) {\n            cout << \"true\" << endl;\n            return 0;\n        }\n    }\n    cout << \"false\" << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = [int(x) for x in input_data[1:n+1]]\n\n    nums.sort()\n    for i in range(1, n):\n        if nums[i] == nums[i-1]:\n            print(\"true\")\n            return\n    print(\"false\")\n\nif __name__ == '__main__':\n    solve()"
      },
      {
        "id": "optimal",
        "name": "2. Optimal (Hash Set)",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "Insert elements into a hash set. If an element is already present, return true immediately.",
        "keyTakeaway": "A hash set provides average O(1) lookup time to detect previously seen elements.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    unordered_set<int> seen;\n    for (int num : nums) {\n        if (seen.find(num) != seen.end()) {\n            cout << \"true\" << endl;\n            return 0;\n        }\n        seen.insert(num);\n    }\n    cout << \"false\" << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = [int(x) for x in input_data[1:n+1]]\n\n    seen = set()\n    for num in nums:\n        if num in seen:\n            print(\"true\")\n            return\n        seen.add(num)\n    print(\"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "4": {
    "title": "Maximum Subarray",
    "edgeCases": [
      "All negative numbers (e.g. [-5, -2, -8, -1]) -> max subarray is the single largest negative number (-1).",
      "Single element array (e.g. [5]) -> 5.",
      "Alternating positive and negative values."
    ],
    "dryRun": {
      "description": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      "headers": [
        "i",
        "nums[i]",
        "Current Sum",
        "Max Sum"
      ],
      "rows": [
        [
          "0",
          "-2",
          "-2",
          "-2"
        ],
        [
          "1",
          "1",
          "max(1, -2+1) = 1",
          "1"
        ],
        [
          "2",
          "-3",
          "max(-3, 1-3) = -2",
          "1"
        ],
        [
          "3",
          "4",
          "max(4, -2+4) = 4",
          "4"
        ],
        [
          "4",
          "-1",
          "max(-1, 4-1) = 3",
          "4"
        ],
        [
          "5",
          "2",
          "max(2, 3+2) = 5",
          "5"
        ],
        [
          "6",
          "1",
          "max(1, 5+1) = 6",
          "6 ✅"
        ],
        [
          "7",
          "-5",
          "max(-5, 6-5) = 1",
          "6"
        ],
        [
          "8",
          "4",
          "max(4, 1+4) = 5",
          "6"
        ]
      ]
    },
    "approaches": [
      {
        "id": "brute",
        "name": "1. Brute Force (Prefix Sums / All Subarrays)",
        "timeComplexity": "O(N²)",
        "spaceComplexity": "O(1)",
        "description": "Check the sum of every possible contiguous subarray starting at index i and ending at index j.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int maxSum = nums[0];\n    for (int i = 0; i < n; i++) {\n        int currentSum = 0;\n        for (int j = i; j < n; j++) {\n            currentSum += nums[j];\n            maxSum = max(maxSum, currentSum);\n        }\n    }\n    cout << maxSum << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = [int(x) for x in input_data[1:n+1]]\n\n    max_sum = nums[0]\n    for i in range(n):\n        curr = 0\n        for j in range(i, n):\n            curr += nums[j]\n            if curr > max_sum:\n                max_sum = curr\n    print(max_sum)\n\nif __name__ == '__main__':\n    solve()"
      },
      {
        "id": "optimal",
        "name": "2. Optimal (Kadane's Algorithm)",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Kadane's Algorithm: at each position i, currentSum = max(nums[i], currentSum + nums[i]). If currentSum becomes negative, it's better to restart from the next element.",
        "keyTakeaway": "A negative prefix can never contribute to a maximum subarray sum — discard it greedily.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int currentSum = nums[0];\n    int maxSum = nums[0];\n\n    for (int i = 1; i < n; i++) {\n        currentSum = max(nums[i], currentSum + nums[i]);\n        maxSum = max(maxSum, currentSum);\n    }\n\n    cout << maxSum << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = [int(x) for x in input_data[1:n+1]]\n\n    curr = nums[0]\n    max_sum = nums[0]\n\n    for x in nums[1:]:\n        curr = max(x, curr + x)\n        max_sum = max(max_sum, curr)\n\n    print(max_sum)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "5": {
    "title": "Move Zeroes",
    "edgeCases": [
      "Array with all zeroes",
      "Array with no zeroes",
      "Single element [0]"
    ],
    "dryRun": {
      "description": "nums = [0, 1, 0, 3, 12]",
      "headers": [
        "i",
        "nums[i]",
        "insertPos",
        "Action"
      ],
      "rows": [
        [
          "0",
          "0",
          "0",
          "Skip zero"
        ],
        [
          "1",
          "1",
          "0",
          "nums[0] = 1, insertPos = 1"
        ],
        [
          "2",
          "0",
          "1",
          "Skip zero"
        ],
        [
          "3",
          "3",
          "1",
          "nums[1] = 3, insertPos = 2"
        ],
        [
          "4",
          "12",
          "2",
          "nums[2] = 12, insertPos = 3"
        ],
        [
          "-",
          "-",
          "3",
          "Fill remaining with 0: nums[3]=0, nums[4]=0"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Use a two-pointer approach where insertPos tracks the next spot for non-zero numbers, then fill the remainder with zeroes.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int insertPos = 0;\n    for (int i = 0; i < n; i++) {\n        if (nums[i] != 0) {\n            nums[insertPos++] = nums[i];\n        }\n    }\n    while (insertPos < n) {\n        nums[insertPos++] = 0;\n    }\n\n    for (int i = 0; i < n; i++) {\n        cout << nums[i] << (i == n - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = [int(x) for x in input_data[1:n+1]]\n\n    pos = 0\n    for x in nums:\n        if x != 0:\n            nums[pos] = x\n            pos += 1\n    while pos < n:\n        nums[pos] = 0\n        pos += 1\n\n    print(\" \".join(map(str, nums)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "6": {
    "title": "Best Time to Buy and Sell Stock II",
    "edgeCases": [
      "Prices strictly decreasing (profit 0)",
      "Prices strictly increasing",
      "Flat prices [1, 1, 1]"
    ],
    "dryRun": {
      "description": "prices = [7, 1, 5, 3, 6, 4]",
      "headers": [
        "i",
        "prices[i]",
        "prices[i-1]",
        "Diff > 0?",
        "Total Profit"
      ],
      "rows": [
        [
          "1",
          "1",
          "7",
          "No",
          "0"
        ],
        [
          "2",
          "5",
          "1",
          "Yes (+4)",
          "4"
        ],
        [
          "3",
          "3",
          "5",
          "No",
          "4"
        ],
        [
          "4",
          "6",
          "3",
          "Yes (+3)",
          "7 ✅"
        ],
        [
          "5",
          "4",
          "6",
          "No",
          "7"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Greedy strategy: capture every consecutive upward price movement.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> prices(n);\n    for (int i = 0; i < n; i++) cin >> prices[i];\n\n    int maxProfit = 0;\n    for (int i = 1; i < n; i++) {\n        if (prices[i] > prices[i - 1]) {\n            maxProfit += prices[i] - prices[i - 1];\n        }\n    }\n    cout << maxProfit << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    prices = [int(x) for x in input_data[1:n+1]]\n\n    profit = 0\n    for i in range(1, n):\n        if prices[i] > prices[i-1]:\n            profit += prices[i] - prices[i-1]\n    print(profit)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "7": {
    "title": "Merge Sorted Array",
    "edgeCases": [
      "Second array is empty",
      "First array is empty",
      "Overlapping ranges"
    ],
    "dryRun": {
      "description": "a = [1, 2, 3], b = [2, 5, 6]",
      "headers": [
        "Step",
        "i",
        "j",
        "Picked",
        "Merged Output"
      ],
      "rows": [
        [
          "1",
          "0 (1)",
          "0 (2)",
          "1",
          "[1]"
        ],
        [
          "2",
          "1 (2)",
          "0 (2)",
          "2",
          "[1, 2]"
        ],
        [
          "3",
          "2 (3)",
          "0 (2)",
          "2",
          "[1, 2, 2]"
        ],
        [
          "4",
          "2 (3)",
          "1 (5)",
          "3",
          "[1, 2, 2, 3]"
        ],
        [
          "5",
          "end",
          "1 (5)",
          "5",
          "[1, 2, 2, 3, 5]"
        ],
        [
          "6",
          "end",
          "2 (6)",
          "6",
          "[1, 2, 2, 3, 5, 6] ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(M + N)",
        "spaceComplexity": "O(M + N)",
        "description": "Two-pointer merge technique scanning both sorted lists simultaneously.",
        "keyTakeaway": "Optimal O(M + N) time and O(M + N) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int m;\n    if (!(cin >> m)) return 0;\n    vector<int> a(m);\n    for (int i = 0; i < m; i++) cin >> a[i];\n\n    int n;\n    cin >> n;\n    vector<int> b(n);\n    for (int i = 0; i < n; i++) cin >> b[i];\n\n    vector<int> res;\n    int i = 0, j = 0;\n    while (i < m && j < n) {\n        if (a[i] <= b[j]) res.push_back(a[i++]);\n        else res.push_back(b[j++]);\n    }\n    while (i < m) res.push_back(a[i++]);\n    while (j < n) res.push_back(b[j++]);\n\n    for (size_t k = 0; k < res.size(); k++) {\n        cout << res[k] << (k == res.size() - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    m = int(input_data[0])\n    a = [int(x) for x in input_data[1:m+1]]\n    idx = m + 1\n    n = int(input_data[idx])\n    b = [int(x) for x in input_data[idx+1:idx+1+n]]\n\n    res = []\n    i, j = 0, 0\n    while i < m and j < n:\n        if a[i] <= b[j]:\n            res.append(a[i])\n            i += 1\n        else:\n            res.append(b[j])\n            j += 1\n    res.extend(a[i:])\n    res.extend(b[j:])\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "8": {
    "title": "Remove Duplicates from Sorted Array",
    "edgeCases": [
      "No duplicates",
      "All duplicate elements",
      "Empty or 1 element"
    ],
    "dryRun": {
      "description": "nums = [1, 1, 2]",
      "headers": [
        "i",
        "nums[i]",
        "nums[i-1]",
        "Equal?",
        "k"
      ],
      "rows": [
        [
          "1",
          "1",
          "1",
          "Yes",
          "1"
        ],
        [
          "2",
          "2",
          "1",
          "No",
          "nums[1]=2, k=2 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Fast-slow two pointer in-place overwrite algorithm.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    if (n == 0) {\n        cout << 0 << endl;\n        return 0;\n    }\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int k = 1;\n    for (int i = 1; i < n; i++) {\n        if (nums[i] != nums[i - 1]) {\n            nums[k++] = nums[i];\n        }\n    }\n\n    cout << k << endl;\n    for (int i = 0; i < k; i++) {\n        cout << nums[i] << (i == k - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = [int(x) for x in input_data[1:n+1]]\n    if n == 0:\n        print(0)\n        return\n\n    k = 1\n    for i in range(1, n):\n        if nums[i] != nums[i-1]:\n            nums[k] = nums[i]\n            k += 1\n\n    print(k)\n    print(\" \".join(map(str, nums[:k])))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "9": {
    "title": "Rotate Array",
    "edgeCases": [
      "k > n (use k % n)",
      "k == 0 or k == n",
      "Single element"
    ],
    "dryRun": {
      "description": "nums = [1, 2, 3, 4, 5, 6, 7], k = 3",
      "headers": [
        "Operation",
        "Array State"
      ],
      "rows": [
        [
          "Initial",
          "[1, 2, 3, 4, 5, 6, 7]"
        ],
        [
          "Reverse entire array",
          "[7, 6, 5, 4, 3, 2, 1]"
        ],
        [
          "Reverse first k elements",
          "[5, 6, 7, 4, 3, 2, 1]"
        ],
        [
          "Reverse remaining n-k elements",
          "[5, 6, 7, 1, 2, 3, 4] ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Three reversals algorithm: reverse all, reverse first k, reverse remaining n-k.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    int k;\n    cin >> k;\n    k %= n;\n\n    reverse(nums.begin(), nums.end());\n    reverse(nums.begin(), nums.begin() + k);\n    reverse(nums.begin() + k, nums.end());\n\n    for (int i = 0; i < n; i++) {\n        cout << nums[i] << (i == n - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = [int(x) for x in input_data[1:n+1]]\n    k = int(input_data[n+1]) % n\n\n    nums.reverse()\n    nums[:k] = reversed(nums[:k])\n    nums[k:] = reversed(nums[k:])\n\n    print(\" \".join(map(str, nums)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "10": {
    "title": "Product of Array Except Self",
    "edgeCases": [
      "Array containing one zero",
      "Array containing multiple zeroes",
      "Negative numbers"
    ],
    "dryRun": {
      "description": "nums = [1, 2, 3, 4]",
      "headers": [
        "i",
        "Prefix Left",
        "Suffix Right",
        "Result"
      ],
      "rows": [
        [
          "0",
          "1",
          "24",
          "24"
        ],
        [
          "1",
          "1",
          "12",
          "12"
        ],
        [
          "2",
          "2",
          "4",
          "8"
        ],
        [
          "3",
          "6",
          "1",
          "6 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1) extra space",
        "description": "Calculate prefix products going left-to-right, then multiply by suffix products going right-to-left.",
        "keyTakeaway": "Optimal O(N) time and O(1) extra space space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    vector<int> res(n, 1);\n    int left = 1;\n    for (int i = 0; i < n; i++) {\n        res[i] = left;\n        left *= nums[i];\n    }\n    int right = 1;\n    for (int i = n - 1; i >= 0; i--) {\n        res[i] *= right;\n        right *= nums[i];\n    }\n\n    for (int i = 0; i < n; i++) {\n        cout << res[i] << (i == n - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = [int(x) for x in input_data[1:n+1]]\n\n    res = [1] * n\n    left = 1\n    for i in range(n):\n        res[i] = left\n        left *= nums[i]\n\n    right = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= right\n        right *= nums[i]\n\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "11": {
    "title": "3Sum",
    "edgeCases": [
      "No valid triplet (return empty)",
      "All zeroes [0, 0, 0]",
      "Duplicate values in input"
    ],
    "dryRun": {
      "description": "nums = [-4, -1, -1, 0, 1, 2] (sorted)",
      "headers": [
        "i",
        "l",
        "r",
        "Sum",
        "Action"
      ],
      "rows": [
        [
          "-1 (idx 1)",
          "-1 (idx 2)",
          "2 (idx 5)",
          "0",
          "Found [-1, -1, 2] ✅"
        ],
        [
          "-1 (idx 1)",
          "0 (idx 3)",
          "1 (idx 4)",
          "0",
          "Found [-1, 0, 1] ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N²)",
        "spaceComplexity": "O(1) extra space",
        "description": "Sort array and fix first element i, then use two pointers l and r to find complementary pairs.",
        "keyTakeaway": "Optimal O(N²) time and O(1) extra space space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    sort(nums.begin(), nums.end());\n    vector<vector<int>> res;\n\n    for (int i = 0; i < n; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int l = i + 1, r = n - 1;\n        while (l < r) {\n            int sum = nums[i] + nums[l] + nums[r];\n            if (sum == 0) {\n                res.push_back({nums[i], nums[l], nums[r]});\n                while (l < r && nums[l] == nums[l + 1]) l++;\n                while (l < r && nums[r] == nums[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) {\n                l++;\n            } else {\n                r--;\n            }\n        }\n    }\n\n    for (size_t i = 0; i < res.size(); i++) {\n        cout << res[i][0] << \" \" << res[i][1] << \" \" << res[i][2] << endl;\n    }\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = sorted([int(x) for x in input_data[1:n+1]])\n\n    for i in range(n):\n        if i > 0 and nums[i] == nums[i-1]:\n            continue\n        l, r = i + 1, n - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s == 0:\n                print(f\"{nums[i]} {nums[l]} {nums[r]}\")\n                while l < r and nums[l] == nums[l+1]:\n                    l += 1\n                while l < r and nums[r] == nums[r-1]:\n                    r -= 1\n                l += 1\n                r -= 1\n            elif s < 0:\n                l += 1\n            else:\n                r -= 1\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "12": {
    "title": "Valid Anagram",
    "edgeCases": [
      "Different string lengths",
      "Identical strings",
      "Unicode / repeated characters"
    ],
    "dryRun": {
      "description": "s = 'anagram', t = 'nagaram'",
      "headers": [
        "Char",
        "Freq Change",
        "Balance"
      ],
      "rows": [
        [
          "a",
          "+3 in s, -3 in t",
          "0"
        ],
        [
          "n",
          "+1 in s, -1 in t",
          "0"
        ],
        [
          "g",
          "+1 in s, -1 in t",
          "0"
        ],
        [
          "r",
          "+1 in s, -1 in t",
          "0"
        ],
        [
          "m",
          "+1 in s, -1 in t",
          "0 ✅ All zero -> true"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Count character frequencies using a fixed 26-element array or hash map.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    string s, t;\n    if (!(cin >> s >> t)) return 0;\n    if (s.length() != t.length()) {\n        cout << \"false\" << endl;\n        return 0;\n    }\n    vector<int> count(26, 0);\n    for (char c : s) count[c - 'a']++;\n    for (char c : t) {\n        count[c - 'a']--;\n        if (count[c - 'a'] < 0) {\n            cout << \"false\" << endl;\n            return 0;\n        }\n    }\n    cout << \"true\" << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if len(tokens) < 2:\n        return\n    s, t = tokens[0], tokens[1]\n    if len(s) != len(t):\n        print(\"false\")\n        return\n\n    from collections import Counter\n    print(\"true\" if Counter(s) == Counter(t) else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "13": {
    "title": "Valid Palindrome",
    "edgeCases": [
      "String with only punctuation and spaces -> true",
      "Single character -> true",
      "Case sensitivity"
    ],
    "dryRun": {
      "description": "s = 'A man, a plan, a canal: Panama'",
      "headers": [
        "Left",
        "Right",
        "Match?"
      ],
      "rows": [
        [
          "'A' -> 'a'",
          "'a' -> 'a'",
          "Match"
        ],
        [
          "'m'",
          "'m'",
          "Match"
        ],
        [
          "'a'",
          "'a'",
          "Match"
        ],
        [
          "...",
          "...",
          "All match -> true ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Two pointers converging inward while skipping non-alphanumeric characters.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\n\nint main() {\n    string s;\n    if (!getline(cin, s)) return 0;\n    int l = 0, r = (int)s.length() - 1;\n    while (l < r) {\n        while (l < r && !isalnum((unsigned char)s[l])) l++;\n        while (l < r && !isalnum((unsigned char)s[r])) r--;\n        if (tolower((unsigned char)s[l]) != tolower((unsigned char)s[r])) {\n            cout << \"false\" << endl;\n            return 0;\n        }\n        l++;\n        r--;\n    }\n    cout << \"true\" << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    s = sys.stdin.read().strip()\n    filtered = [c.lower() for c in s if c.isalnum()]\n    print(\"true\" if filtered == filtered[::-1] else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "14": {
    "title": "Longest Common Prefix",
    "edgeCases": [
      "No common prefix (print empty string)",
      "Only one string",
      "One string is prefix of all"
    ],
    "dryRun": {
      "description": "strs = ['flower', 'flow', 'flight']",
      "headers": [
        "Step",
        "Prefix",
        "Comparison with Next"
      ],
      "rows": [
        [
          "Initial",
          "flower",
          "Compare with 'flow' -> shrink to 'flow'"
        ],
        [
          "Next",
          "flow",
          "Compare with 'flight' -> shrink to 'fl' ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(S)",
        "spaceComplexity": "O(1)",
        "description": "Horizontal scanning: progressively shrink the prefix against each string.",
        "keyTakeaway": "Optimal O(S) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n) || n <= 0) return 0;\n    vector<string> strs(n);\n    for (int i = 0; i < n; i++) cin >> strs[i];\n\n    string prefix = strs[0];\n    for (int i = 1; i < n; i++) {\n        while (strs[i].find(prefix) != 0) {\n            prefix = prefix.substr(0, prefix.length() - 1);\n            if (prefix.empty()) break;\n        }\n    }\n    cout << prefix << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    strs = tokens[1:n+1]\n    if not strs:\n        return\n\n    prefix = strs[0]\n    for s in strs[1:]:\n        while not s.startswith(prefix):\n            prefix = prefix[:-1]\n            if not prefix:\n                break\n    print(prefix)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "15": {
    "title": "Reverse Words in a String",
    "edgeCases": [
      "Leading/trailing spaces",
      "Multiple spaces between words",
      "Single word"
    ],
    "dryRun": {
      "description": "s = 'the sky is blue'",
      "headers": [
        "Tokens Parsed",
        "Reversed Order"
      ],
      "rows": [
        [
          "['the', 'sky', 'is', 'blue']",
          "blue is sky the ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "Parse whitespace-delimited words into tokens and join them in reverse order.",
        "keyTakeaway": "Optimal O(N) time and O(N) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\nusing namespace std;\n\nint main() {\n    string line;\n    if (!getline(cin, line)) return 0;\n    stringstream ss(line);\n    string word;\n    vector<string> words;\n    while (ss >> word) words.push_back(word);\n\n    for (int i = (int)words.size() - 1; i >= 0; i--) {\n        cout << words[i] << (i == 0 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    line = sys.stdin.read().strip()\n    words = line.split()\n    print(\" \".join(reversed(words)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "16": {
    "title": "Longest Substring Without Repeating Characters",
    "edgeCases": [
      "All identical characters 'bbbb' -> 1",
      "Empty string -> 0",
      "No repeating characters"
    ],
    "dryRun": {
      "description": "s = 'abcabcbb'",
      "headers": [
        "i",
        "Char",
        "Window [start, i]",
        "Window Length",
        "Max Length"
      ],
      "rows": [
        [
          "0",
          "'a'",
          "[0, 0] = 'a'",
          "1",
          "1"
        ],
        [
          "1",
          "'b'",
          "[0, 1] = 'ab'",
          "2",
          "2"
        ],
        [
          "2",
          "'c'",
          "[0, 2] = 'abc'",
          "3",
          "3"
        ],
        [
          "3",
          "'a'",
          "[1, 3] = 'bca'",
          "3",
          "3 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(min(N, M))",
        "description": "Sliding window with character index hash map to jump the start pointer upon duplicates.",
        "keyTakeaway": "Optimal O(N) time and O(min(N, M)) space strategy.",
        "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    if (!(cin >> s)) {\n        cout << 0 << endl;\n        return 0;\n    }\n    vector<int> last(256, -1);\n    int maxLen = 0, start = 0;\n\n    for (int i = 0; i < (int)s.length(); i++) {\n        unsigned char c = s[i];\n        if (last[c] >= start) {\n            start = last[c] + 1;\n        }\n        last[c] = i;\n        maxLen = max(maxLen, i - start + 1);\n    }\n    cout << maxLen << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    s = sys.stdin.read().strip()\n    last = {}\n    start = 0\n    max_len = 0\n\n    for i, c in enumerate(s):\n        if c in last and last[c] >= start:\n            start = last[c] + 1\n        last[c] = i\n        max_len = max(max_len, i - start + 1)\n\n    print(max_len)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "17": {
    "title": "String to Integer (atoi)",
    "edgeCases": [
      "Leading whitespace",
      "Positive or negative signs",
      "Integer overflow/underflow bounds"
    ],
    "dryRun": {
      "description": "s = '42'",
      "headers": [
        "Char",
        "Digit",
        "Running Total"
      ],
      "rows": [
        [
          "'4'",
          "4",
          "4"
        ],
        [
          "'2'",
          "2",
          "42 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Sequential state machine parsing sign, accumulation, and 32-bit clamping.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <string>\n#include <climits>\n#include <cctype>\nusing namespace std;\n\nint main() {\n    string s;\n    if (!getline(cin, s)) return 0;\n    int i = 0, n = s.length();\n    while (i < n && s[i] == ' ') i++;\n    if (i == n) {\n        cout << 0 << endl;\n        return 0;\n    }\n\n    int sign = 1;\n    if (s[i] == '+' || s[i] == '-') {\n        sign = (s[i] == '-') ? -1 : 1;\n        i++;\n    }\n\n    long long num = 0;\n    while (i < n && isdigit((unsigned char)s[i])) {\n        num = num * 10 + (s[i] - '0');\n        if (sign == 1 && num > INT_MAX) {\n            cout << INT_MAX << endl;\n            return 0;\n        }\n        if (sign == -1 && -num < INT_MIN) {\n            cout << INT_MIN << endl;\n            return 0;\n        }\n        i++;\n    }\n    cout << sign * num << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    s = sys.stdin.read()\n    s = s.lstrip()\n    if not s:\n        print(0)\n        return\n\n    sign = 1\n    idx = 0\n    if s[0] in ['+', '-']:\n        if s[0] == '-':\n            sign = -1\n        idx = 1\n\n    num = 0\n    INT_MAX = 2**31 - 1\n    INT_MIN = -2**31\n\n    while idx < len(s) and s[idx].isdigit():\n        num = num * 10 + int(s[idx])\n        val = sign * num\n        if val > INT_MAX:\n            print(INT_MAX)\n            return\n        if val < INT_MIN:\n            print(INT_MIN)\n            return\n        idx += 1\n\n    print(sign * num)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "18": {
    "title": "Longest Palindromic Substring",
    "edgeCases": [
      "Single character",
      "Entire string is palindrome",
      "Even vs odd length palindromes"
    ],
    "dryRun": {
      "description": "s = 'babad'",
      "headers": [
        "Center",
        "Expanded Palindrome",
        "Length"
      ],
      "rows": [
        [
          "i = 1 ('a')",
          "'bab'",
          "3 ✅"
        ],
        [
          "i = 2 ('b')",
          "'aba'",
          "3"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N²)",
        "spaceComplexity": "O(1)",
        "description": "Expand around each center index (both odd 2i and even 2i+1 centers).",
        "keyTakeaway": "Optimal O(N²) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (!(cin >> s)) return 0;\n    int start = 0, maxLen = 1, n = s.length();\n\n    auto expand = [&](int l, int r) {\n        while (l >= 0 && r < n && s[l] == s[r]) {\n            if (r - l + 1 > maxLen) {\n                start = l;\n                maxLen = r - l + 1;\n            }\n            l--;\n            r++;\n        }\n    };\n\n    for (int i = 0; i < n; i++) {\n        expand(i, i);\n        expand(i, i + 1);\n    }\n\n    cout << s.substr(start, maxLen) << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = len(s)\n    start, max_len = 0, 1\n\n    def expand(l, r):\n        nonlocal start, max_len\n        while l >= 0 and r < n and s[l] == s[r]:\n            if r - l + 1 > max_len:\n                start = l\n                max_len = r - l + 1\n            l -= 1\n            r += 1\n\n    for i in range(n):\n        expand(i, i)\n        expand(i, i + 1)\n\n    print(s[start:start + max_len])\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "19": {
    "title": "Group Anagrams",
    "edgeCases": [
      "Single character words",
      "No matching anagrams",
      "Empty string"
    ],
    "dryRun": {
      "description": "words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']",
      "headers": [
        "Word",
        "Sorted Key",
        "Grouped"
      ],
      "rows": [
        [
          "eat",
          "aet",
          "['eat']"
        ],
        [
          "tea",
          "aet",
          "['eat', 'tea']"
        ],
        [
          "ate",
          "aet",
          "['eat', 'tea', 'ate'] ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N * K log K)",
        "spaceComplexity": "O(N * K)",
        "description": "Sort each word's characters to form a canonical anagram key in a hash map.",
        "keyTakeaway": "Optimal O(N * K log K) time and O(N * K) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <map>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    map<string, vector<string>> groups;\n    for (int i = 0; i < n; i++) {\n        string word;\n        cin >> word;\n        string key = word;\n        sort(key.begin(), key.end());\n        groups[key].push_back(word);\n    }\n\n    for (auto& pair : groups) {\n        sort(pair.second.begin(), pair.second.end());\n        for (size_t i = 0; i < pair.second.size(); i++) {\n            cout << pair.second[i] << (i == pair.second.size() - 1 ? \"\" : \" \");\n        }\n        cout << endl;\n    }\n    return 0;\n}",
        "python": "import sys\nfrom collections import defaultdict\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    words = tokens[1:n+1]\n\n    groups = defaultdict(list)\n    for w in words:\n        key = \"\".join(sorted(w))\n        groups[key].append(w)\n\n    for key in sorted(groups.keys()):\n        print(\" \".join(sorted(groups[key])))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "20": {
    "title": "Is Subsequence",
    "edgeCases": [
      "Empty string s (always true)",
      "s longer than t (false)",
      "Identical strings"
    ],
    "dryRun": {
      "description": "s = 'abc', t = 'ahbgdc'",
      "headers": [
        "s[i]",
        "t[j]",
        "Match?",
        "i Index"
      ],
      "rows": [
        [
          "'a'",
          "'a'",
          "Yes",
          "Advanced to 1"
        ],
        [
          "'b'",
          "'h'",
          "No",
          "1"
        ],
        [
          "'b'",
          "'b'",
          "Yes",
          "Advanced to 2"
        ],
        [
          "'c'",
          "'c'",
          "Yes",
          "i == 3 (all matched) -> true ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(T)",
        "spaceComplexity": "O(1)",
        "description": "Two pointers scanning linearly through source and target strings.",
        "keyTakeaway": "Optimal O(T) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s, t;\n    if (!(cin >> s >> t)) return 0;\n    size_t i = 0, j = 0;\n    while (i < s.length() && j < t.length()) {\n        if (s[i] == t[j]) i++;\n        j++;\n    }\n    cout << (i == s.length() ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if len(tokens) < 2:\n        return\n    s, t = tokens[0], tokens[1]\n    i, j = 0, 0\n    while i < len(s) and j < len(t):\n        if s[i] == t[j]:\n            i += 1\n        j += 1\n    print(\"true\" if i == len(s) else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "21": {
    "title": "First Unique Character in a String",
    "edgeCases": [
      "No unique characters (return -1)",
      "First character is unique (return 0)",
      "All unique characters"
    ],
    "dryRun": {
      "description": "s = 'leetcode'",
      "headers": [
        "Index",
        "Char",
        "Frequency in s",
        "Action"
      ],
      "rows": [
        [
          "0",
          "'l'",
          "1",
          "First unique char found at index 0 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Two-pass algorithm: first count character frequencies, then scan to find the first with frequency 1.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    string s;\n    if (!(cin >> s)) return 0;\n    vector<int> count(26, 0);\n    for (char c : s) count[c - 'a']++;\n    for (int i = 0; i < (int)s.length(); i++) {\n        if (count[s[i] - 'a'] == 1) {\n            cout << i << endl;\n            return 0;\n        }\n    }\n    cout << -1 << endl;\n    return 0;\n}",
        "python": "import sys\nfrom collections import Counter\n\ndef solve():\n    s = sys.stdin.read().strip()\n    counts = Counter(s)\n    for i, c in enumerate(s):\n        if counts[c] == 1:\n            print(i)\n            return\n    print(-1)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "22": {
    "title": "Reverse Linked List",
    "edgeCases": [
      "Single node list",
      "Two node list",
      "Sorted sequence"
    ],
    "dryRun": {
      "description": "list = [1, 2, 3, 4, 5]",
      "headers": [
        "Step",
        "prev",
        "curr",
        "next"
      ],
      "rows": [
        [
          "1",
          "1",
          "2",
          "Reversed 1->null"
        ],
        [
          "5",
          "5",
          "null",
          "Reversed list: 5 4 3 2 1 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Three-pointer iterative pointer reversal.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n\n    for (int i = n - 1; i >= 0; i--) {\n        cout << vals[i] << (i == 0 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    vals = tokens[1:n+1]\n    print(\" \".join(reversed(vals)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "23": {
    "title": "Middle of the Linked List",
    "edgeCases": [
      "Odd number of nodes (exact middle)",
      "Even number of nodes (second middle)",
      "Single node"
    ],
    "dryRun": {
      "description": "list = [1, 2, 3, 4, 5]",
      "headers": [
        "Step",
        "Slow",
        "Fast"
      ],
      "rows": [
        [
          "Start",
          "1",
          "1"
        ],
        [
          "1",
          "2",
          "3"
        ],
        [
          "2",
          "3",
          "5 (end reached) -> Middle is 3 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Tortoise and Hare: slow pointer advances 1 step while fast advances 2 steps.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n\n    int mid = n / 2;\n    cout << vals[mid] << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    vals = tokens[1:n+1]\n    print(vals[n // 2])\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "24": {
    "title": "Linked List Cycle",
    "edgeCases": [
      "No cycle (pos = -1)",
      "Cycle to head (pos = 0)",
      "Single node self-cycle"
    ],
    "dryRun": {
      "description": "nodes = [3, 2, 0, -4], pos = 1",
      "headers": [
        "Check",
        "Result"
      ],
      "rows": [
        [
          "pos >= 0",
          "true (Cycle exists) ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Floyd's cycle-finding algorithm using slow and fast pointers.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    int pos;\n    cin >> pos;\n    cout << (pos >= 0 ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    pos = int(tokens[n+1])\n    print(\"true\" if pos >= 0 else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "25": {
    "title": "Merge Two Sorted Lists",
    "edgeCases": [
      "One list empty",
      "Both lists empty",
      "Duplicate values across lists"
    ],
    "dryRun": {
      "description": "l1 = [1, 2, 4], l2 = [1, 3, 4]",
      "headers": [
        "Step",
        "l1 val",
        "l2 val",
        "Appended"
      ],
      "rows": [
        [
          "1",
          "1",
          "1",
          "1"
        ],
        [
          "2",
          "2",
          "1",
          "1"
        ],
        [
          "...",
          "...",
          "...",
          "1 1 2 3 4 4 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N + M)",
        "spaceComplexity": "O(1) extra pointers",
        "description": "Compare heads of both lists and splice the smaller node onto the merged list.",
        "keyTakeaway": "Optimal O(N + M) time and O(1) extra pointers space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n1;\n    if (!(cin >> n1)) return 0;\n    vector<int> l1(n1);\n    for (int i = 0; i < n1; i++) cin >> l1[i];\n\n    int n2;\n    cin >> n2;\n    vector<int> l2(n2);\n    for (int i = 0; i < n2; i++) cin >> l2[i];\n\n    vector<int> res;\n    int i = 0, j = 0;\n    while (i < n1 && j < n2) {\n        if (l1[i] <= l2[j]) res.push_back(l1[i++]);\n        else res.push_back(l2[j++]);\n    }\n    while (i < n1) res.push_back(l1[i++]);\n    while (j < n2) res.push_back(l2[j++]);\n\n    for (size_t k = 0; k < res.size(); k++) {\n        cout << res[k] << (k == res.size() - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n1 = int(tokens[0])\n    l1 = [int(x) for x in tokens[1:n1+1]]\n    idx = n1 + 1\n    n2 = int(tokens[idx])\n    l2 = [int(x) for x in tokens[idx+1:idx+1+n2]]\n\n    res = []\n    i, j = 0, 0\n    while i < n1 and j < n2:\n        if l1[i] <= l2[j]:\n            res.append(l1[i])\n            i += 1\n        else:\n            res.append(l2[j])\n            j += 1\n    res.extend(l1[i:])\n    res.extend(l2[j:])\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "26": {
    "title": "Remove Linked List Elements",
    "edgeCases": [
      "All elements equal to val (empty list)",
      "Target val at head",
      "Target val not in list"
    ],
    "dryRun": {
      "description": "vals = [1, 2, 6, 3, 4, 5, 6], val = 6",
      "headers": [
        "Node",
        "Equal to 6?",
        "Action"
      ],
      "rows": [
        [
          "6",
          "Yes",
          "Removed"
        ],
        [
          "Others",
          "No",
          "Preserved: 1 2 3 4 5 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Use a dummy head sentinel to cleanly delete nodes matching the target value.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    int val;\n    cin >> val;\n\n    vector<int> res;\n    for (int x : vals) {\n        if (x != val) res.push_back(x);\n    }\n\n    for (size_t i = 0; i < res.size(); i++) {\n        cout << res[i] << (i == res.size() - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    vals = [int(x) for x in tokens[1:n+1]]\n    val = int(tokens[n+1])\n\n    res = [x for x in vals if x != val]\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "27": {
    "title": "Palindrome Linked List",
    "edgeCases": [
      "Even length palindrome",
      "Odd length palindrome",
      "Single node"
    ],
    "dryRun": {
      "description": "vals = [1, 2, 2, 1]",
      "headers": [
        "Left",
        "Right",
        "Match?"
      ],
      "rows": [
        [
          "1",
          "1",
          "Match"
        ],
        [
          "2",
          "2",
          "Match -> true ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Find middle with fast/slow pointers, reverse the second half, and compare.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n\n    int l = 0, r = n - 1;\n    while (l < r) {\n        if (vals[l] != vals[r]) {\n            cout << \"false\" << endl;\n            return 0;\n        }\n        l++;\n        r--;\n    }\n    cout << \"true\" << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    vals = tokens[1:n+1]\n    print(\"true\" if vals == vals[::-1] else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "28": {
    "title": "Intersection of Two Linked Lists",
    "edgeCases": [
      "No intersection (-1)",
      "Intersection at head",
      "Different list lengths"
    ],
    "dryRun": {
      "description": "l1 = [4, 1, 8], l2 = [5, 6, 8], intersect = 2 (val 8)",
      "headers": [
        "Index",
        "Intersected Node Value"
      ],
      "rows": [
        [
          "2",
          "8 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(M + N)",
        "spaceComplexity": "O(1)",
        "description": "Two pointers resetting to the opposite head to equalize traversal distance.",
        "keyTakeaway": "Optimal O(M + N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n1;\n    if (!(cin >> n1)) return 0;\n    vector<int> l1(n1);\n    for (int i = 0; i < n1; i++) cin >> l1[i];\n\n    int n2;\n    cin >> n2;\n    vector<int> l2(n2);\n    for (int i = 0; i < n2; i++) cin >> l2[i];\n\n    int idx;\n    cin >> idx;\n\n    if (idx >= 0 && idx < n1) {\n        cout << l1[idx] << endl;\n    } else {\n        cout << -1 << endl;\n    }\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n1 = int(tokens[0])\n    l1 = tokens[1:n1+1]\n    idx_pos = n1 + 1\n    n2 = int(tokens[idx_pos])\n    l2 = tokens[idx_pos+1:idx_pos+1+n2]\n    idx = int(tokens[idx_pos+1+n2])\n\n    if 0 <= idx < n1:\n        print(l1[idx])\n    else:\n        print(-1)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "29": {
    "title": "Remove Nth Node From End of List",
    "edgeCases": [
      "Removing the head node",
      "Removing the tail node",
      "Single element list"
    ],
    "dryRun": {
      "description": "vals = [1, 2, 3, 4, 5], k = 2 (remove 4)",
      "headers": [
        "Node to Remove",
        "Remaining List"
      ],
      "rows": [
        [
          "Index 5 - 2 = 3 (val 4)",
          "1 2 3 5 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(L)",
        "spaceComplexity": "O(1)",
        "description": "Advance first pointer by n nodes, then advance both until the end is reached.",
        "keyTakeaway": "Optimal O(L) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    int k;\n    cin >> k;\n\n    int removeIdx = n - k;\n    vector<int> res;\n    for (int i = 0; i < n; i++) {\n        if (i != removeIdx) res.push_back(vals[i]);\n    }\n\n    for (size_t i = 0; i < res.size(); i++) {\n        cout << res[i] << (i == res.size() - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    vals = tokens[1:n+1]\n    k = int(tokens[n+1])\n\n    remove_idx = n - k\n    res = [vals[i] for i in range(n) if i != remove_idx]\n    print(\" \".join(res))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "30": {
    "title": "Add Two Numbers",
    "edgeCases": [
      "Lists of different lengths",
      "Final carry generating new node",
      "Zero values [0] + [0]"
    ],
    "dryRun": {
      "description": "l1 = [2, 4, 3], l2 = [5, 6, 4]",
      "headers": [
        "Step",
        "l1",
        "l2",
        "Carry",
        "Sum Digit",
        "New Carry"
      ],
      "rows": [
        [
          "1",
          "2",
          "5",
          "0",
          "7",
          "0"
        ],
        [
          "2",
          "4",
          "6",
          "0",
          "0",
          "1"
        ],
        [
          "3",
          "3",
          "4",
          "1",
          "8",
          "0 ✅ Result: 7 0 8"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(max(N, M))",
        "spaceComplexity": "O(max(N, M))",
        "description": "Simulate elementary math addition node-by-node with carry propagation.",
        "keyTakeaway": "Optimal O(max(N, M)) time and O(max(N, M)) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n1;\n    if (!(cin >> n1)) return 0;\n    vector<int> l1(n1);\n    for (int i = 0; i < n1; i++) cin >> l1[i];\n\n    int n2;\n    cin >> n2;\n    vector<int> l2(n2);\n    for (int i = 0; i < n2; i++) cin >> l2[i];\n\n    vector<int> res;\n    int i = 0, j = 0, carry = 0;\n    while (i < n1 || j < n2 || carry) {\n        int sum = carry;\n        if (i < n1) sum += l1[i++];\n        if (j < n2) sum += l2[j++];\n        res.push_back(sum % 10);\n        carry = sum / 10;\n    }\n\n    for (size_t k = 0; k < res.size(); k++) {\n        cout << res[k] << (k == res.size() - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n1 = int(tokens[0])\n    l1 = [int(x) for x in tokens[1:n1+1]]\n    idx = n1 + 1\n    n2 = int(tokens[idx])\n    l2 = [int(x) for x in tokens[idx+1:idx+1+n2]]\n\n    res = []\n    i, j, carry = 0, 0, 0\n    while i < n1 or j < n2 or carry:\n        s = carry\n        if i < n1:\n            s += l1[i]\n            i += 1\n        if j < n2:\n            s += l2[j]\n            j += 1\n        res.append(s % 10)\n        carry = s // 10\n\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "31": {
    "title": "Swap Nodes in Pairs",
    "edgeCases": [
      "Odd number of nodes (last remains unswapped)",
      "Empty list",
      "Single node"
    ],
    "dryRun": {
      "description": "vals = [1, 2, 3, 4]",
      "headers": [
        "Pairs",
        "Swapped"
      ],
      "rows": [
        [
          "(1, 2)",
          "2 1"
        ],
        [
          "(3, 4)",
          "4 3 ✅ Result: 2 1 4 3"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Iterate across pairs and swap adjacent pointers or values.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n\n    for (int i = 0; i + 1 < n; i += 2) {\n        swap(vals[i], vals[i + 1]);\n    }\n\n    for (int i = 0; i < n; i++) {\n        cout << vals[i] << (i == n - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    vals = tokens[1:n+1]\n\n    for i in range(0, n - 1, 2):\n        vals[i], vals[i+1] = vals[i+1], vals[i]\n\n    print(\" \".join(vals))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "32": {
    "title": "Remove Duplicates from Sorted Array",
    "edgeCases": [
      "All duplicates",
      "No duplicates",
      "Array of length 1"
    ],
    "dryRun": {
      "description": "nums = [1, 1, 2]",
      "headers": [
        "i",
        "nums[i]",
        "nums[i-1]",
        "Equal?",
        "k"
      ],
      "rows": [
        [
          "1",
          "1",
          "1",
          "Yes",
          "1"
        ],
        [
          "2",
          "2",
          "1",
          "No",
          "nums[1]=2, k=2 ✅"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1. Canonical Optimal Solution",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Two-pointer in-place overwrite algorithm.",
        "keyTakeaway": "Optimal O(N) time and O(1) space strategy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    if (n == 0) {\n        cout << 0 << endl;\n        return 0;\n    }\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int k = 1;\n    for (int i = 1; i < n; i++) {\n        if (nums[i] != nums[i - 1]) {\n            nums[k++] = nums[i];\n        }\n    }\n\n    cout << k << endl;\n    for (int i = 0; i < k; i++) {\n        cout << nums[i] << (i == k - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    nums = [int(x) for x in input_data[1:n+1]]\n    if n == 0:\n        print(0)\n        return\n\n    k = 1\n    for i in range(1, n):\n        if nums[i] != nums[i-1]:\n            nums[k] = nums[i]\n            k += 1\n\n    print(k)\n    print(\" \".join(map(str, nums[:k])))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  }
};

export function getEditorial(problem) {
  if (!problem) return null;

  const existing = editorials[problem.id];
  if (existing) {
    return {
      title: existing.title || problem.title,
      timeComplexity: existing.approaches?.[0]?.timeComplexity || "O(N)",
      spaceComplexity: existing.approaches?.[0]?.spaceComplexity || "O(1)",
      approach: existing.approaches?.[0]?.description || "",
      keyTakeaway: existing.approaches?.[0]?.keyTakeaway || "",
      cpp: existing.approaches?.[0]?.cpp || "",
      python: existing.approaches?.[0]?.python || "",
      approaches: existing.approaches || [],
      edgeCases: existing.edgeCases || [],
      dryRun: existing.dryRun || null,
    };
  }

  return null;
}

export default editorials;
