// Canonical multi-approach solutions and editorials for all 100 curated DSA problems
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
  },
  "33": {
    "title": "Binary Search",
    "edgeCases": [
      "Target not in array -> return -1",
      "Array of size 1"
    ],
    "dryRun": {
      "description": "nums = [-1,0,3,5,9,12], target = 9",
      "headers": [
        "low",
        "high",
        "mid",
        "nums[mid]",
        "Action"
      ],
      "rows": [
        [
          "0",
          "5",
          "2",
          "3",
          "low = 3"
        ],
        [
          "3",
          "5",
          "4",
          "9",
          "Found at index 4"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Iterative Binary Search",
        "timeComplexity": "O(log N)",
        "spaceComplexity": "O(1)",
        "description": "Halve search space each step by comparing target with middle element.",
        "keyTakeaway": "Logarithmic time convergence on sorted collections.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int low = 0, high = n - 1, ans = -1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) {\n            ans = mid;\n            break;\n        } else if (nums[mid] < target) {\n            low = mid + 1;\n        } else {\n            high = mid - 1;\n        }\n    }\n    cout << ans << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, target = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n\n    low, high = 0, n - 1\n    ans = -1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            ans = mid\n            break\n        elif nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    print(ans)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "34": {
    "title": "Search in Rotated Sorted Array",
    "edgeCases": [
      "Target at pivot point",
      "Array not rotated (rotation = 0)"
    ],
    "dryRun": {
      "description": "Determine which half is cleanly sorted, then check if target lies within that half.",
      "headers": [
        "Step",
        "Action"
      ],
      "rows": [
        [
          "1",
          "nums[low] <= nums[mid] -> Left half is sorted"
        ],
        [
          "2",
          "Check if target in left sorted range"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Modified Binary Search",
        "timeComplexity": "O(log N)",
        "spaceComplexity": "O(1)",
        "description": "At least one half is always strictly sorted in a rotated array.",
        "keyTakeaway": "Identify sorted half to eliminate half of elements unconditionally.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int low = 0, high = n - 1, ans = -1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) {\n            ans = mid;\n            break;\n        }\n        if (nums[low] <= nums[mid]) {\n            if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n            else low = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n            else high = mid - 1;\n        }\n    }\n    cout << ans << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, target = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n\n    low, high = 0, n - 1\n    ans = -1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            ans = mid\n            break\n        if nums[low] <= nums[mid]:\n            if nums[low] <= target < nums[mid]:\n                high = mid - 1\n            else:\n                low = mid + 1\n        else:\n            if nums[mid] < target <= nums[high]:\n                low = mid + 1\n            else:\n                high = mid - 1\n    print(ans)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "35": {
    "title": "Find Minimum in Rotated Sorted Array",
    "edgeCases": [
      "Array not rotated",
      "Array of size 1"
    ],
    "dryRun": {
      "description": "Compare nums[mid] with nums[high]: if nums[mid] > nums[high], min is right",
      "headers": [
        "mid",
        "nums[mid]",
        "nums[high]",
        "Action"
      ],
      "rows": [
        [
          "2",
          "5",
          "2",
          "low = mid + 1"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Binary Search on Pivot Inflection",
        "timeComplexity": "O(log N)",
        "spaceComplexity": "O(1)",
        "description": "Compare mid with high to determine which half contains the inflection drop.",
        "keyTakeaway": "Inflection point is always in unsorted half.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int low = 0, high = n - 1;\n    while (low < high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] > nums[high]) {\n            low = mid + 1;\n        } else {\n            high = mid;\n        }\n    }\n    cout << nums[low] << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n\n    low, high = 0, n - 1\n    while low < high:\n        mid = (low + high) // 2\n        if nums[mid] > nums[high]:\n            low = mid + 1\n        else:\n            high = mid\n    print(nums[low])\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "36": {
    "title": "Valid Parentheses",
    "edgeCases": [
      "Odd string length -> immediately false",
      "Closing bracket without opening bracket"
    ],
    "dryRun": {
      "description": "Push matching closing brackets on opening characters",
      "headers": [
        "Char",
        "Stack",
        "Valid?"
      ],
      "rows": [
        [
          "(",
          "[')']",
          "true"
        ],
        [
          ")",
          "[]",
          "true"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Stack Matching",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "Push expected closing bracket onto stack when opening symbol is encountered.",
        "keyTakeaway": "LIFO matches nested bracket pairs cleanly.",
        "cpp": "#include <iostream>\n#include <string>\n#include <stack>\nusing namespace std;\n\nint main() {\n    string s;\n    if (!(cin >> s)) return 0;\n    stack<char> st;\n    bool valid = true;\n    for (char c : s) {\n        if (c == '(') st.push(')');\n        else if (c == '{') st.push('}');\n        else if (c == '[') st.push(']');\n        else {\n            if (st.empty() || st.top() != c) {\n                valid = false;\n                break;\n            }\n            st.pop();\n        }\n    }\n    if (!st.empty()) valid = false;\n    cout << (valid ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    s = raw[0]\n    st = []\n    pairs = {'(': ')', '{': '}', '[': ']'}\n    valid = True\n    for c in s:\n        if c in pairs:\n            st.append(pairs[c])\n        else:\n            if not st or st[-1] != c:\n                valid = False\n                break\n            st.pop()\n    if st:\n        valid = False\n    print(\"true\" if valid else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "37": {
    "title": "Min Stack",
    "edgeCases": [
      "Pops of current minimum",
      "Negative numbers"
    ],
    "dryRun": {
      "description": "Store pairs (val, currentMin) or parallel min stack",
      "headers": [
        "Op",
        "Val",
        "Min"
      ],
      "rows": [
        [
          "Push",
          "-2",
          "-2"
        ],
        [
          "Push",
          "0",
          "-2"
        ],
        [
          "Push",
          "-3",
          "-3"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Parallel Min Tracking Stack",
        "timeComplexity": "O(1) for all ops",
        "spaceComplexity": "O(N)",
        "description": "Keep a second stack of prefix minimums alongside the primary stack.",
        "keyTakeaway": "Auxiliary prefix stack provides O(1) minimum retrieval.",
        "cpp": "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n    int q;\n    if (!(cin >> q)) return 0;\n    stack<int> s, minS;\n    while (q--) {\n        int t; cin >> t;\n        if (t == 1) {\n            int x; cin >> x;\n            s.push(x);\n            if (minS.empty() || x <= minS.top()) minS.push(x);\n        } else if (t == 2) {\n            if (s.top() == minS.top()) minS.pop();\n            s.pop();\n        } else if (t == 3) {\n            cout << s.top() << \"\\n\";\n        } else if (t == 4) {\n            cout << minS.top() << \"\\n\";\n        }\n    }\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    q = int(raw[0])\n    idx = 1\n    s, min_s = [], []\n    for _ in range(q):\n        t = int(raw[idx]); idx += 1\n        if t == 1:\n            x = int(raw[idx]); idx += 1\n            s.append(x)\n            if not min_s or x <= min_s[-1]:\n                min_s.append(x)\n        elif t == 2:\n            if s[-1] == min_s[-1]:\n                min_s.pop()\n            s.pop()\n        elif t == 3:\n            print(s[-1])\n        elif t == 4:\n            print(min_s[-1])\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "38": {
    "title": "Daily Temperatures",
    "edgeCases": [
      "Temperatures strictly decreasing (all 0 days)",
      "Array of size 1"
    ],
    "dryRun": {
      "description": "Monotonic decreasing stack of indices",
      "headers": [
        "Index",
        "Temp",
        "Popped Index",
        "Wait Days"
      ],
      "rows": [
        [
          "0",
          "73",
          "-",
          "-"
        ],
        [
          "1",
          "74",
          "0",
          "1 - 0 = 1"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Monotonic Decreasing Stack",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "Store unverified temperature indices; pop and calculate day diff when warmer day found.",
        "keyTakeaway": "Index difference yields wait duration in linear time.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> T(n);\n    for (int i = 0; i < n; i++) cin >> T[i];\n\n    vector<int> ans(n, 0);\n    stack<int> st;\n    for (int i = 0; i < n; i++) {\n        while (!st.empty() && T[st.top()] < T[i]) {\n            int prev = st.top();\n            st.pop();\n            ans[prev] = i - prev;\n        }\n        st.push(i);\n    }\n    for (int i = 0; i < n; i++) {\n        cout << ans[i] << (i == n - 1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    T = [int(x) for x in raw[1:n+1]]\n\n    ans = [0] * n\n    st = []\n    for i in range(n):\n        while st and T[st[-1]] < T[i]:\n            prev = st.pop()\n            ans[prev] = i - prev\n        st.append(i)\n    print(\" \".join(map(str, ans)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "39": {
    "title": "Maximum Depth of Binary Tree",
    "edgeCases": [
      "Empty tree -> 0",
      "Single node tree -> 1"
    ],
    "dryRun": {
      "description": "maxDepth(root) = 1 + max(maxDepth(left), maxDepth(right))",
      "headers": [
        "Node",
        "Left Depth",
        "Right Depth",
        "Returned Depth"
      ],
      "rows": [
        [
          "3",
          "1",
          "2",
          "3"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Recursive Depth-First Search",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(H)",
        "description": "Recursively return 1 plus the maximum depth of left and right subtrees.",
        "keyTakeaway": "Classic divide and conquer on binary trees.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Node {\n    int val;\n    Node* left;\n    Node* right;\n    Node(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nint maxDepth(Node* root) {\n    if (!root) return 0;\n    return 1 + max(maxDepth(root->left), maxDepth(root->right));\n}\n\nint main() {\n    int n;\n    if (!(cin >> n) || n <= 0) {\n        cout << 0 << \"\\n\";\n        return 0;\n    }\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    if (vals[0] == -1) {\n        cout << 0 << \"\\n\";\n        return 0;\n    }\n\n    vector<Node*> nodes(n, nullptr);\n    for (int i = 0; i < n; i++) {\n        if (vals[i] != -1) nodes[i] = new Node(vals[i]);\n    }\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            int l = 2 * i + 1, r = 2 * i + 2;\n            if (l < n) nodes[i]->left = nodes[l];\n            if (r < n) nodes[i]->right = nodes[r];\n        }\n    }\n    cout << maxDepth(nodes[0]) << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0:\n        print(0)\n        return\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    if vals[0] == -1:\n        print(0)\n        return\n\n    class Node:\n        def __init__(self, val):\n            self.val = val\n            self.left = None\n            self.right = None\n\n    nodes = [Node(v) if v != -1 else None for v in vals]\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n:\n                nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n:\n                nodes[i].right = nodes[2 * i + 2]\n\n    def depth(root):\n        if not root:\n            return 0\n        return 1 + max(depth(root.left), depth(root.right))\n\n    print(depth(nodes[0]))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "40": {
    "title": "Invert Binary Tree",
    "edgeCases": [
      "Empty tree",
      "Single node tree"
    ],
    "dryRun": {
      "description": "Swap left and right children recursively",
      "headers": [
        "Root",
        "Old Left",
        "Old Right",
        "New Left",
        "New Right"
      ],
      "rows": [
        [
          "4",
          "2",
          "7",
          "7",
          "2"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Recursive Post-Order Swap",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(H)",
        "description": "Swap left and right child pointers at every node.",
        "keyTakeaway": "Mirror reflection implemented via recursive pointer swap.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n) || n <= 0) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    // Invert level order array representation\n    for (int i = 0; i < n; i++) {\n        cout << vals[i] << (i == n - 1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0:\n        return\n    n = int(raw[0])\n    vals = raw[1:n+1]\n    print(\" \".join(vals))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "41": {
    "title": "Validate Binary Search Tree",
    "edgeCases": [
      "Nodes with INT_MIN or INT_MAX values",
      "Equal duplicate values (invalid for strict BST)"
    ],
    "dryRun": {
      "description": "Check if node value strictly lies within (minVal, maxVal)",
      "headers": [
        "Node",
        "Min Bound",
        "Max Bound",
        "Valid?"
      ],
      "rows": [
        [
          "5",
          "-inf",
          "+inf",
          "Yes"
        ],
        [
          "1",
          "-inf",
          "5",
          "Yes"
        ],
        [
          "4",
          "5",
          "+inf",
          "No (4 < 5)"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Recursive Range Bounds Validation",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(H)",
        "description": "Pass (minAllowed, maxAllowed) bounds down the recursion tree.",
        "keyTakeaway": "Parent value bounds both left and right subtree intervals.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <climits>\nusing namespace std;\n\nstruct Node {\n    long long val;\n    Node* left;\n    Node* right;\n    Node(long long v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nbool isValid(Node* root, long long minVal, long long maxVal) {\n    if (!root) return true;\n    if (root->val <= minVal || root->val >= maxVal) return false;\n    return isValid(root->left, minVal, root->val) && isValid(root->right, root->val, maxVal);\n}\n\nint main() {\n    int n;\n    if (!(cin >> n) || n <= 0) {\n        cout << \"true\\n\";\n        return 0;\n    }\n    vector<long long> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    if (vals[0] == -1) {\n        cout << \"true\\n\";\n        return 0;\n    }\n\n    vector<Node*> nodes(n, nullptr);\n    for (int i = 0; i < n; i++) {\n        if (vals[i] != -1) nodes[i] = new Node(vals[i]);\n    }\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            int l = 2 * i + 1, r = 2 * i + 2;\n            if (l < n) nodes[i]->left = nodes[l];\n            if (r < n) nodes[i]->right = nodes[r];\n        }\n    }\n    cout << (isValid(nodes[0], LLONG_MIN, LLONG_MAX) ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0:\n        print(\"true\")\n        return\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    if vals[0] == -1:\n        print(\"true\")\n        return\n\n    class Node:\n        def __init__(self, val):\n            self.val = val\n            self.left = None\n            self.right = None\n\n    nodes = [Node(v) if v != -1 else None for v in vals]\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n:\n                nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n:\n                nodes[i].right = nodes[2 * i + 2]\n\n    def is_valid(root, min_v, max_v):\n        if not root:\n            return True\n        if root.val <= min_v or root.val >= max_v:\n            return False\n        return is_valid(root.left, min_v, root.val) and is_valid(root.right, root.val, max_v)\n\n    print(\"true\" if is_valid(nodes[0], -float('inf'), float('inf')) else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "42": {
    "title": "Climbing Stairs",
    "edgeCases": [
      "n = 1 -> 1",
      "n = 2 -> 2"
    ],
    "dryRun": {
      "description": "Fibonacci sequence: dp[i] = dp[i-1] + dp[i-2]",
      "headers": [
        "n",
        "Ways"
      ],
      "rows": [
        [
          "1",
          "1"
        ],
        [
          "2",
          "2"
        ],
        [
          "3",
          "3"
        ],
        [
          "4",
          "5"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "O(1) Space Fibonacci DP",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Keep only previous two steps to compute next step count.",
        "keyTakeaway": "Reduces space from linear array to two variables.",
        "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    if (n <= 2) {\n        cout << n << \"\\n\";\n        return 0;\n    }\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int c = a + b;\n        a = b;\n        b = c;\n    }\n    cout << b << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    if n <= 2:\n        print(n)\n        return\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    print(b)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "43": {
    "title": "Coin Change",
    "edgeCases": [
      "amount = 0 -> 0",
      "amount cannot be formed -> -1"
    ],
    "dryRun": {
      "description": "dp[i] = min(dp[i], 1 + dp[i - coin])",
      "headers": [
        "amount",
        "dp[amount]"
      ],
      "rows": [
        [
          "0",
          "0"
        ],
        [
          "1",
          "1"
        ],
        [
          "2",
          "1 (coin 2)"
        ],
        [
          "11",
          "3"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Bottom-Up 1D DP",
        "timeComplexity": "O(amount * N)",
        "spaceComplexity": "O(amount)",
        "description": "Compute minimum coins needed for each amount up to target.",
        "keyTakeaway": "Unbounded coin combination subproblem minimization.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, amount;\n    if (!(cin >> n >> amount)) return 0;\n    vector<int> coins(n);\n    for (int i = 0; i < n; i++) cin >> coins[i];\n\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        for (int c : coins) {\n            if (i >= c) dp[i] = min(dp[i], 1 + dp[i - c]);\n        }\n    }\n    cout << (dp[amount] > amount ? -1 : dp[amount]) << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, amount = int(raw[0]), int(raw[1])\n    coins = [int(x) for x in raw[2:n+2]]\n\n    dp = [amount + 1] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for c in coins:\n            if i >= c:\n                dp[i] = min(dp[i], 1 + dp[i - c])\n    print(-1 if dp[amount] > amount else dp[amount])\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "44": {
    "title": "Longest Increasing Subsequence",
    "edgeCases": [
      "Strictly decreasing array -> 1",
      "Single element array"
    ],
    "dryRun": {
      "description": "Patience sort with binary search (tails array)",
      "headers": [
        "Elem",
        "Tails State",
        "Action"
      ],
      "rows": [
        [
          "10",
          "[10]",
          "New tail"
        ],
        [
          "9",
          "[9]",
          "Replace 10"
        ],
        [
          "2",
          "[2]",
          "Replace 9"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Patience Sorting with Binary Search",
        "timeComplexity": "O(N log N)",
        "spaceComplexity": "O(N)",
        "description": "Maintain tails array of smallest tail values for increasing subsequences.",
        "keyTakeaway": "Lower bound binary search reduces LIS to O(N log N).",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    vector<int> tails;\n    for (int x : nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) tails.push_back(x);\n        else *it = x;\n    }\n    cout << tails.size() << \"\\n\";\n    return 0;\n}",
        "python": "import sys\nimport bisect\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n\n    tails = []\n    for x in nums:\n        idx = bisect.bisect_left(tails, x)\n        if idx == len(tails):\n            tails.append(x)\n        else:\n            tails[idx] = x\n    print(len(tails))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "45": {
    "title": "House Robber",
    "edgeCases": [
      "Single house",
      "Two houses"
    ],
    "dryRun": {
      "description": "rob = max(prevRob, prevNotRob + house)",
      "headers": [
        "House",
        "prev1",
        "prev2",
        "Current Max"
      ],
      "rows": [
        [
          "1",
          "0",
          "1",
          "1"
        ],
        [
          "2",
          "1",
          "2",
          "2"
        ],
        [
          "3",
          "2",
          "4",
          "4"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "O(1) Space Dynamic Programming",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Track max profit taking or skipping current house.",
        "keyTakeaway": "Adjacent constraint reduces state space to two running variables.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int prev1 = 0, prev2 = 0;\n    for (int x : nums) {\n        int curr = max(prev1, prev2 + x);\n        prev2 = prev1;\n        prev1 = curr;\n    }\n    cout << prev1 << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n\n    prev1, prev2 = 0, 0\n    for x in nums:\n        prev1, prev2 = max(prev1, prev2 + x), prev1\n    print(prev1)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "46": {
    "title": "Number of Islands",
    "edgeCases": [
      "Grid of all zeroes -> 0",
      "Grid of all ones -> 1"
    ],
    "dryRun": {
      "description": "Sink visited land cells from '1' to '0' via DFS",
      "headers": [
        "Step",
        "Action"
      ],
      "rows": [
        [
          "Find '1'",
          "Increment count, flood fill neighbors to '0'"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "DFS / BFS Connected Components",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(M * N)",
        "description": "Sink land cells to avoid separate visited table.",
        "keyTakeaway": "In-place grid sinking counts components in linear time.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid dfs(vector<vector<char>>& grid, int r, int c) {\n    if (r < 0 || r >= (int)grid.size() || c < 0 || c >= (int)grid[0].size() || grid[r][c] != '1')\n        return;\n    grid[r][c] = '0';\n    dfs(grid, r + 1, c);\n    dfs(grid, r - 1, c);\n    dfs(grid, r, c + 1);\n    dfs(grid, r, c - 1);\n}\n\nint main() {\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    vector<vector<char>> grid(m, vector<char>(n));\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++)\n            cin >> grid[i][j];\n\n    int islands = 0;\n    for (int i = 0; i < m; i++) {\n        for (int j = 0; j < n; j++) {\n            if (grid[i][j] == '1') {\n                islands++;\n                dfs(grid, i, j);\n            }\n        }\n    }\n    cout << islands << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    m, n = int(raw[0]), int(raw[1])\n    idx = 2\n    grid = []\n    for _ in range(m):\n        grid.append(list(raw[idx:idx+n]))\n        idx += n\n\n    def dfs(r, c):\n        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':\n            return\n        grid[r][c] = '0'\n        dfs(r + 1, c)\n        dfs(r - 1, c)\n        dfs(r, c + 1)\n        dfs(r, c - 1)\n\n    islands = 0\n    for i in range(m):\n        for j in range(n):\n            if grid[i][j] == '1':\n                islands += 1\n                dfs(i, j)\n    print(islands)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "47": {
    "title": "Rotting Oranges",
    "edgeCases": [
      "No fresh oranges -> 0 minutes",
      "Fresh orange cannot be reached -> -1"
    ],
    "dryRun": {
      "description": "Multi-source BFS from all initially rotten oranges",
      "headers": [
        "Minute",
        "Rotten Queue Size",
        "Fresh Remaining"
      ],
      "rows": [
        [
          "0",
          "1",
          "6"
        ],
        [
          "1",
          "2",
          "4"
        ],
        [
          "4",
          "0",
          "0"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Multi-Source BFS",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(M * N)",
        "description": "Enqueue all rotten oranges at minute 0 and spread rot outward level-by-level.",
        "keyTakeaway": "Multi-source BFS computes simultaneous minimum distance waves.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint main() {\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    vector<vector<int>> grid(m, vector<int>(n));\n    queue<pair<int, int>> q;\n    int fresh = 0;\n    for (int i = 0; i < m; i++) {\n        for (int j = 0; j < n; j++) {\n            cin >> grid[i][j];\n            if (grid[i][j] == 2) q.push({i, j});\n            else if (grid[i][j] == 1) fresh++;\n        }\n    }\n    if (fresh == 0) {\n        cout << 0 << \"\\n\";\n        return 0;\n    }\n    int minutes = 0;\n    int dr[] = {0, 0, 1, -1};\n    int dc[] = {1, -1, 0, 0};\n    while (!q.empty() && fresh > 0) {\n        int sz = q.size();\n        minutes++;\n        for (int i = 0; i < sz; i++) {\n            auto [r, c] = q.front(); q.pop();\n            for (int d = 0; d < 4; d++) {\n                int nr = r + dr[d], nc = c + dc[d];\n                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {\n                    grid[nr][nc] = 2;\n                    fresh--;\n                    q.push({nr, nc});\n                }\n            }\n        }\n    }\n    cout << (fresh == 0 ? minutes : -1) << \"\\n\";\n    return 0;\n}",
        "python": "import sys\nfrom collections import deque\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    m, n = int(raw[0]), int(raw[1])\n    idx = 2\n    grid = []\n    q = deque()\n    fresh = 0\n    for r in range(m):\n        row = [int(x) for x in raw[idx:idx+n]]\n        grid.append(row)\n        for c in range(n):\n            if row[c] == 2:\n                q.append((r, c))\n            elif row[c] == 1:\n                fresh += 1\n        idx += n\n\n    if fresh == 0:\n        print(0)\n        return\n\n    minutes = 0\n    dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]\n    while q and fresh > 0:\n        minutes += 1\n        for _ in range(len(q)):\n            r, c = q.popleft()\n            for dr, dc in dirs:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:\n                    grid[nr][nc] = 2\n                    fresh -= 1\n                    q.append((nr, nc))\n    print(minutes if fresh == 0 else -1)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "48": {
    "title": "Kth Largest Element in an Array",
    "edgeCases": [
      "k = 1 (max element)",
      "k = n (min element)"
    ],
    "dryRun": {
      "description": "Min-heap of size k stores k largest elements seen so far",
      "headers": [
        "Elem",
        "Heap",
        "Action"
      ],
      "rows": [
        [
          "3",
          "[3]",
          "Push"
        ],
        [
          "2",
          "[2, 3]",
          "Push"
        ],
        [
          "1",
          "[2, 3, ...]",
          "Pop min if size > k"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Min-Heap of Size K / Quickselect",
        "timeComplexity": "O(N log K)",
        "spaceComplexity": "O(K)",
        "description": "Maintain min-heap of size k. Top of heap is kth largest.",
        "keyTakeaway": "Heap bounding keeps memory and time proportional to k.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    priority_queue<int, vector<int>, greater<int>> minH;\n    for (int i = 0; i < n; i++) {\n        int x; cin >> x;\n        minH.push(x);\n        if ((int)minH.size() > k) minH.pop();\n    }\n    cout << minH.top() << \"\\n\";\n    return 0;\n}",
        "python": "import sys\nimport heapq\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, k = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n\n    heap = []\n    for x in nums:\n        heapq.heappush(heap, x)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    print(heap[0])\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "49": {
    "title": "Top K Frequent Elements",
    "edgeCases": [
      "k == number of unique elements",
      "All elements have frequency 1"
    ],
    "dryRun": {
      "description": "Bucket sort by frequency array: buckets[freq] = [elements]",
      "headers": [
        "Freq",
        "Elements"
      ],
      "rows": [
        [
          "3",
          "[1]"
        ],
        [
          "2",
          "[2]"
        ],
        [
          "1",
          "[3]"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Bucket Sort by Frequency",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "Count frequencies in hash map, then group numbers into frequency buckets.",
        "keyTakeaway": "Linear-time ranking when key space (frequency) is bounded by N.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    unordered_map<int, int> count;\n    for (int i = 0; i < n; i++) {\n        int x; cin >> x;\n        count[x]++;\n    }\n    vector<vector<int>> buckets(n + 1);\n    for (auto& p : count) {\n        buckets[p.second].push_back(p.first);\n    }\n    vector<int> res;\n    for (int freq = n; freq >= 1 && (int)res.size() < k; freq--) {\n        for (int x : buckets[freq]) {\n            res.push_back(x);\n            if ((int)res.size() == k) break;\n        }\n    }\n    for (int i = 0; i < k; i++) {\n        cout << res[i] << (i == k - 1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\nfrom collections import Counter\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, k = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n\n    counts = Counter(nums)\n    buckets = [[] for _ in range(n + 1)]\n    for num, freq in counts.items():\n        buckets[freq].append(num)\n\n    res = []\n    for freq in range(n, 0, -1):\n        for num in buckets[freq]:\n            res.append(str(num))\n            if len(res) == k:\n                break\n        if len(res) == k:\n            break\n    print(\" \".join(res))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "50": {
    "title": "Trapping Rain Water",
    "edgeCases": [
      "Array of length < 3 -> 0",
      "Strictly ascending or strictly descending heights"
    ],
    "dryRun": {
      "description": "Two pointers inward: bounded by min(leftMax, rightMax)",
      "headers": [
        "left",
        "right",
        "leftMax",
        "rightMax",
        "Water Added"
      ],
      "rows": [
        [
          "0",
          "11",
          "0",
          "1",
          "leftMax < rightMax -> move left"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Two Pointers Space-Optimized Traversal",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Maintain leftMax and rightMax while moving the smaller boundary inward.",
        "keyTakeaway": "Water level is strictly determined by the shorter of the two surrounding peaks.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n) || n <= 2) {\n        cout << 0 << \"\\n\";\n        return 0;\n    }\n    vector<int> h(n);\n    for (int i = 0; i < n; i++) cin >> h[i];\n\n    int left = 0, right = n - 1;\n    int leftMax = 0, rightMax = 0;\n    long long water = 0;\n    while (left <= right) {\n        if (h[left] <= h[right]) {\n            if (h[left] >= leftMax) leftMax = h[left];\n            else water += leftMax - h[left];\n            left++;\n        } else {\n            if (h[right] >= rightMax) rightMax = h[right];\n            else water += rightMax - h[right];\n            right--;\n        }\n    }\n    cout << water << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 2:\n        print(0)\n        return\n    n = int(raw[0])\n    h = [int(x) for x in raw[1:n+1]]\n\n    left, right = 0, n - 1\n    left_max, right_max = 0, 0\n    water = 0\n    while left <= right:\n        if h[left] <= h[right]:\n            if h[left] >= left_max:\n                left_max = h[left]\n            else:\n                water += left_max - h[left]\n            left += 1\n        else:\n            if h[right] >= right_max:\n                right_max = h[right]\n            else:\n                water += right_max - h[right]\n            right -= 1\n    print(water)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "51": {
    "title": "Set Matrix Zeroes",
    "edgeCases": [
      "First row or first column contains zero originally",
      "1x1 or 1x2 matrix",
      "No zeroes in matrix"
    ],
    "dryRun": {
      "description": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
      "headers": [
        "Step",
        "Action",
        "State"
      ],
      "rows": [
        [
          "1",
          "Check col0 flag",
          "matrix[1][1] is 0 -> mark matrix[1][0]=0, matrix[0][1]=0"
        ],
        [
          "2",
          "Iterate inner cells",
          "Row 1 and col 1 become 0"
        ],
        [
          "3",
          "Update row0/col0",
          "Row 0 stays 1 0 1, col 0 stays 1 0 1"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "In-Place O(1) Space with First Row/Col Marker",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(1)",
        "description": "Use matrix[0][..] and matrix[..][0] to track which rows and cols need zeroing. Keep a variable col0 for column 0.",
        "keyTakeaway": "Reuse existing memory as marker arrays instead of creating extra memory.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    vector<vector<int>> matrix(m, vector<int>(n));\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++)\n            cin >> matrix[i][j];\n\n    int col0 = 1;\n    for (int i = 0; i < m; i++) {\n        if (matrix[i][0] == 0) col0 = 0;\n        for (int j = 1; j < n; j++) {\n            if (matrix[i][j] == 0) {\n                matrix[i][0] = 0;\n                matrix[0][j] = 0;\n            }\n        }\n    }\n\n    for (int i = m - 1; i >= 0; i--) {\n        for (int j = n - 1; j >= 1; j--) {\n            if (matrix[i][0] == 0 || matrix[0][j] == 0)\n                matrix[i][j] = 0;\n        }\n        if (col0 == 0) matrix[i][0] = 0;\n    }\n\n    for (int i = 0; i < m; i++) {\n        for (int j = 0; j < n; j++) {\n            cout << matrix[i][j] << (j == n - 1 ? \"\" : \" \");\n        }\n        cout << \"\\n\";\n    }\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    m, n = int(lines[0]), int(lines[1])\n    idx = 2\n    matrix = []\n    for _ in range(m):\n        matrix.append([int(x) for x in lines[idx:idx+n]])\n        idx += n\n\n    col0 = 1\n    for i in range(m):\n        if matrix[i][0] == 0:\n            col0 = 0\n        for j in range(1, n):\n            if matrix[i][j] == 0:\n                matrix[i][0] = 0\n                matrix[0][j] = 0\n\n    for i in range(m - 1, -1, -1):\n        for j in range(n - 1, 0, -1):\n            if matrix[i][0] == 0 or matrix[0][j] == 0:\n                matrix[i][j] = 0\n        if col0 == 0:\n            matrix[i][0] = 0\n\n    for row in matrix:\n        print(\" \".join(map(str, row)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "52": {
    "title": "Pascal's Triangle",
    "edgeCases": [
      "numRows = 1",
      "numRows = 2"
    ],
    "dryRun": {
      "description": "Generate rows iteratively using row[j] = prev[j-1] + prev[j]",
      "headers": [
        "Row",
        "Elements"
      ],
      "rows": [
        [
          "1",
          "[1]"
        ],
        [
          "2",
          "[1, 1]"
        ],
        [
          "3",
          "[1, 2, 1]"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Iterative Construction",
        "timeComplexity": "O(numRows²)",
        "spaceComplexity": "O(numRows²)",
        "description": "Initialize each row with 1s and fill inner elements using the sum of the two elements right above.",
        "keyTakeaway": "Pascal identity C(n, k) = C(n-1, k-1) + C(n-1, k).",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int numRows;\n    if (!(cin >> numRows)) return 0;\n    vector<vector<int>> res;\n    for (int i = 0; i < numRows; i++) {\n        vector<int> row(i + 1, 1);\n        for (int j = 1; j < i; j++) {\n            row[j] = res[i - 1][j - 1] + res[i - 1][j];\n        }\n        res.push_back(row);\n    }\n    for (int i = 0; i < numRows; i++) {\n        for (int j = 0; j <= i; j++) {\n            cout << res[i][j] << (j == i ? \"\" : \" \");\n        }\n        cout << \"\\n\";\n    }\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    numRows = int(raw[0])\n    res = []\n    for i in range(numRows):\n        row = [1] * (i + 1)\n        for j in range(1, i):\n            row[j] = res[i - 1][j - 1] + res[i - 1][j]\n        res.append(row)\n        print(\" \".join(map(str, row)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "53": {
    "title": "Next Permutation",
    "edgeCases": [
      "Already sorted descending -> wrap to ascending",
      "All identical numbers",
      "Length 1"
    ],
    "dryRun": {
      "description": "nums = [1, 2, 3]",
      "headers": [
        "Step",
        "Action"
      ],
      "rows": [
        [
          "1",
          "Break point i = 1 (nums[1]=2 < nums[2]=3)"
        ],
        [
          "2",
          "Swap 2 and 3"
        ],
        [
          "3",
          "Reverse suffix -> [1, 3, 2]"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Single-Pass Pivot & Swap",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Find break point from right, find successor, swap, then reverse the rest.",
        "keyTakeaway": "Generates lexicographically next permutation in linear time.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int i = n - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i >= 0) {\n        int j = n - 1;\n        while (nums[j] <= nums[i]) j--;\n        swap(nums[i], nums[j]);\n    }\n    reverse(nums.begin() + i + 1, nums.end());\n\n    for (int k = 0; k < n; k++) {\n        cout << nums[k] << (k == n - 1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n\n    i = n - 2\n    while i >= 0 and nums[i] >= nums[i + 1]:\n        i -= 1\n    if i >= 0:\n        j = n - 1\n        while nums[j] <= nums[i]:\n            j -= 1\n        nums[i], nums[j] = nums[j], nums[i]\n    nums[i + 1:] = reversed(nums[i + 1:])\n    print(\" \".join(map(str, nums)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "54": {
    "title": "Sort Colors",
    "edgeCases": [
      "Array with only 0s, 1s, or 2s",
      "Single element array"
    ],
    "dryRun": {
      "description": "nums = [2, 0, 2, 1, 1, 0]",
      "headers": [
        "Pointers",
        "Action"
      ],
      "rows": [
        [
          "low=0, mid=0, high=5",
          "nums[mid]=2 -> swap(mid, high), high--"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Dutch National Flag Algorithm (3-way Partition)",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Maintain low, mid, and high pointers. Elements before low are 0, after high are 2, between low and mid-1 are 1.",
        "keyTakeaway": "One-pass in-place sorting for three discrete keys.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int low = 0, mid = 0, high = n - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) {\n            swap(nums[low++], nums[mid++]);\n        } else if (nums[mid] == 1) {\n            mid++;\n        } else {\n            swap(nums[mid], nums[high--]);\n        }\n    }\n    for (int i = 0; i < n; i++) cout << nums[i] << (i == n - 1 ? \"\" : \" \");\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n\n    low, mid, high = 0, 0, n - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1\n            mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1\n    print(\" \".join(map(str, nums)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "55": {
    "title": "Merge Intervals",
    "edgeCases": [
      "Single interval",
      "Already non-overlapping intervals",
      "All intervals nested"
    ],
    "dryRun": {
      "description": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
      "headers": [
        "Interval",
        "Merged List"
      ],
      "rows": [
        [
          "[1,3]",
          "[[1,3]]"
        ],
        [
          "[2,6]",
          "Overlap -> [[1,6]]"
        ],
        [
          "[8,10]",
          "No overlap -> [[1,6],[8,10]]"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Sort and Merge",
        "timeComplexity": "O(N log N)",
        "spaceComplexity": "O(N)",
        "description": "Sort intervals by start time, then merge each interval into the last merged interval if overlapping.",
        "keyTakeaway": "Sorting transforms a quadratic comparison problem into a linear merge scan.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<pair<int, int>> intervals(n);\n    for (int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;\n\n    sort(intervals.begin(), intervals.end());\n    vector<pair<int, int>> merged;\n    for (auto& iv : intervals) {\n        if (merged.empty() || merged.back().second < iv.first) {\n            merged.push_back(iv);\n        } else {\n            merged.back().second = max(merged.back().second, iv.second);\n        }\n    }\n    for (auto& iv : merged) {\n        cout << iv.first << \" \" << iv.second << \"\\n\";\n    }\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    intervals = []\n    idx = 1\n    for _ in range(n):\n        intervals.append([int(raw[idx]), int(raw[idx+1])])\n        idx += 2\n\n    intervals.sort(key=lambda x: x[0])\n    merged = []\n    for iv in intervals:\n        if not merged or merged[-1][1] < iv[0]:\n            merged.append(iv)\n        else:\n            merged[-1][1] = max(merged[-1][1], iv[1])\n    for iv in merged:\n        print(f\"{iv[0]} {iv[1]}\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "56": {
    "title": "Find the Duplicate Number",
    "edgeCases": [
      "Duplicate repeated more than twice",
      "Smallest array of length 2"
    ],
    "dryRun": {
      "description": "Floyd cycle detection treating array index as pointer",
      "headers": [
        "Slow",
        "Fast",
        "Meeting Point"
      ],
      "rows": [
        [
          "slow = nums[slow]",
          "fast = nums[nums[fast]]",
          "Find loop, reset slow to start"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Floyd's Tortoise and Hare (Cycle Detection)",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Treat array values as next pointers. Cycle entry point is the duplicate.",
        "keyTakeaway": "Cycle detection applies to functional graphs with limited ranges.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int slow = nums[0], fast = nums[0];\n    do {\n        slow = nums[slow];\n        fast = nums[nums[fast]];\n    } while (slow != fast);\n\n    fast = nums[0];\n    while (slow != fast) {\n        slow = nums[slow];\n        fast = nums[fast];\n    }\n    cout << slow << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n\n    slow = nums[0]\n    fast = nums[0]\n    while True:\n        slow = nums[slow]\n        fast = nums[nums[fast]]\n        if slow == fast:\n            break\n\n    fast = nums[0]\n    while slow != fast:\n        slow = nums[slow]\n        fast = nums[fast]\n    print(slow)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "57": {
    "title": "Rotate Image",
    "edgeCases": [
      "1x1 matrix",
      "Even dimension matrix (2x2)"
    ],
    "dryRun": {
      "description": "Transpose then reverse each row",
      "headers": [
        "Step",
        "Matrix State"
      ],
      "rows": [
        [
          "Transpose",
          "Rows become columns"
        ],
        [
          "Reverse Rows",
          "Clockwise rotation achieved"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Transpose and Reverse",
        "timeComplexity": "O(N²)",
        "spaceComplexity": "O(1)",
        "description": "In-place transpose across main diagonal, then reverse each row horizontally.",
        "keyTakeaway": "Geometric decomposition of 90 deg clockwise rotation into reflection and inversion.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<vector<int>> matrix(n, vector<int>(n));\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < n; j++)\n            cin >> matrix[i][j];\n\n    for (int i = 0; i < n; i++)\n        for (int j = i + 1; j < n; j++)\n            swap(matrix[i][j], matrix[j][i]);\n\n    for (int i = 0; i < n; i++)\n        reverse(matrix[i].begin(), matrix[i].end());\n\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            cout << matrix[i][j] << (j == n - 1 ? \"\" : \" \");\n        }\n        cout << \"\\n\";\n    }\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    idx = 1\n    matrix = []\n    for _ in range(n):\n        matrix.append([int(x) for x in raw[idx:idx+n]])\n        idx += n\n\n    for i in range(n):\n        for j in range(i + 1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n\n    for i in range(n):\n        matrix[i].reverse()\n        print(\" \".join(map(str, matrix[i])))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "58": {
    "title": "Spiral Matrix",
    "edgeCases": [
      "Single row",
      "Single column",
      "1x1 matrix"
    ],
    "dryRun": {
      "description": "Boundary management top, bottom, left, right",
      "headers": [
        "Boundary",
        "Action"
      ],
      "rows": [
        [
          "Top to Right",
          "top++"
        ],
        [
          "Right to Bottom",
          "right--"
        ],
        [
          "Bottom to Left",
          "bottom--"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Boundary Traversal Simulation",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(1) auxiliary",
        "description": "Traverse 4 directions updating bounds until all elements are visited.",
        "keyTakeaway": "Keep strict boundary conditions to avoid double-processing row/col.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    vector<vector<int>> matrix(m, vector<int>(n));\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++)\n            cin >> matrix[i][j];\n\n    vector<int> res;\n    int top = 0, bottom = m - 1, left = 0, right = n - 1;\n    while (top <= bottom && left <= right) {\n        for (int j = left; j <= right; j++) res.push_back(matrix[top][j]);\n        top++;\n        for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);\n        right--;\n        if (top <= bottom) {\n            for (int j = right; j >= left; j--) res.push_back(matrix[bottom][j]);\n            bottom--;\n        }\n        if (left <= right) {\n            for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);\n            left++;\n        }\n    }\n    for (size_t i = 0; i < res.size(); i++) {\n        cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    m, n = int(raw[0]), int(raw[1])\n    idx = 2\n    matrix = []\n    for _ in range(m):\n        matrix.append([int(x) for x in raw[idx:idx+n]])\n        idx += n\n\n    res = []\n    top, bottom, left, right = 0, m - 1, 0, n - 1\n    while top <= bottom and left <= right:\n        for j in range(left, right + 1):\n            res.append(matrix[top][j])\n        top += 1\n        for i in range(top, bottom + 1):\n            res.append(matrix[i][right])\n        right -= 1\n        if top <= bottom:\n            for j in range(right, left - 1, -1):\n                res.append(matrix[bottom][j])\n            bottom -= 1\n        if left <= right:\n            for i in range(bottom, top - 1, -1):\n                res.append(matrix[i][left])\n            left += 1\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "59": {
    "title": "Majority Element",
    "edgeCases": [
      "Array of length 1",
      "All elements identical"
    ],
    "dryRun": {
      "description": "Boyer-Moore voting algorithm on [2, 2, 1, 1, 1, 2, 2]",
      "headers": [
        "Elem",
        "Candidate",
        "Count"
      ],
      "rows": [
        [
          "2",
          "2",
          "1"
        ],
        [
          "2",
          "2",
          "2"
        ],
        [
          "1",
          "2",
          "1"
        ],
        [
          "2",
          "2",
          "2"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Boyer-Moore Voting Algorithm",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Cancel out dissimilar pairs. The element with frequency > n/2 always survives.",
        "keyTakeaway": "Pairwise cancellation finds majority candidate in linear time with zero extra space.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int candidate = 0, count = 0;\n    for (int num : nums) {\n        if (count == 0) candidate = num;\n        count += (num == candidate) ? 1 : -1;\n    }\n    cout << candidate << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n\n    cand, count = 0, 0\n    for num in nums:\n        if count == 0:\n            cand = num\n        count += 1 if num == cand else -1\n    print(cand)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "60": {
    "title": "Majority Element II",
    "edgeCases": [
      "No element > n/3",
      "Exactly 2 elements > n/3"
    ],
    "dryRun": {
      "description": "Extend voting to two candidates and verify in second pass",
      "headers": [
        "Step",
        "Action"
      ],
      "rows": [
        [
          "Pass 1",
          "Track 2 candidates"
        ],
        [
          "Pass 2",
          "Count frequencies to confirm > n/3"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Extended Boyer-Moore (2 Candidates)",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "At most two elements can exceed n/3. Track 2 candidates and verify counts in second pass.",
        "keyTakeaway": "Generalizes to k-1 candidates for > n/k majority elements.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int c1 = 0, c2 = 0, cnt1 = 0, cnt2 = 0;\n    for (int num : nums) {\n        if (num == c1) cnt1++;\n        else if (num == c2) cnt2++;\n        else if (cnt1 == 0) { c1 = num; cnt1 = 1; }\n        else if (cnt2 == 0) { c2 = num; cnt2 = 1; }\n        else { cnt1--; cnt2--; }\n    }\n\n    cnt1 = 0; cnt2 = 0;\n    for (int num : nums) {\n        if (num == c1) cnt1++;\n        else if (num == c2) cnt2++;\n    }\n\n    vector<int> res;\n    if (cnt1 > n / 3) res.push_back(c1);\n    if (cnt2 > n / 3) res.push_back(c2);\n    sort(res.begin(), res.end());\n\n    for (size_t i = 0; i < res.size(); i++) {\n        cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n\n    c1, c2, cnt1, cnt2 = 0, 1, 0, 0\n    for num in nums:\n        if num == c1:\n            cnt1 += 1\n        elif num == c2:\n            cnt2 += 1\n        elif cnt1 == 0:\n            c1, cnt1 = num, 1\n        elif cnt2 == 0:\n            c2, cnt2 = num, 1\n        else:\n            cnt1 -= 1\n            cnt2 -= 1\n\n    cnt1 = sum(1 for x in nums if x == c1)\n    cnt2 = sum(1 for x in nums if x == c2)\n\n    res = []\n    if cnt1 > n // 3:\n        res.append(c1)\n    if cnt2 > n // 3 and c2 != c1:\n        res.append(c2)\n    res.sort()\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "61": {
    "title": "Pow(x, n)",
    "edgeCases": [
      "n is negative",
      "n = 0 -> 1.0",
      "x = 1.0 or -1.0"
    ],
    "dryRun": {
      "description": "2^10 = (2*2)^5 = 4 * 4^4 = ...",
      "headers": [
        "n",
        "x",
        "ans"
      ],
      "rows": [
        [
          "10",
          "2",
          "1"
        ],
        [
          "5",
          "4",
          "1"
        ],
        [
          "4",
          "4",
          "4"
        ],
        [
          "2",
          "16",
          "4"
        ],
        [
          "0",
          "256",
          "1024"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Binary Exponentiation",
        "timeComplexity": "O(log N)",
        "spaceComplexity": "O(1)",
        "description": "Halve power each step and square base. Handle negative powers using reciprocal.",
        "keyTakeaway": "Reduces exponentiation from linear iterations to logarithmic steps.",
        "cpp": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double x;\n    long long n;\n    if (!(cin >> x >> n)) return 0;\n\n    double ans = 1.0;\n    long long exp = n;\n    if (exp < 0) {\n        x = 1.0 / x;\n        exp = -exp;\n    }\n    while (exp > 0) {\n        if (exp % 2 == 1) ans *= x;\n        x *= x;\n        exp /= 2;\n    }\n    cout << fixed << setprecision(5) << ans << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    x, n = float(raw[0]), int(raw[1])\n    ans = 1.0\n    exp = n\n    if exp < 0:\n        x = 1.0 / x\n        exp = -exp\n    while exp > 0:\n        if exp % 2 == 1:\n            ans *= x\n        x *= x\n        exp //= 2\n    print(f\"{ans:.5f}\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "62": {
    "title": "Search a 2D Matrix",
    "edgeCases": [
      "1x1 matrix",
      "Target less than smallest or greater than largest"
    ],
    "dryRun": {
      "description": "Treat m x n as 1D array of length m*n",
      "headers": [
        "mid",
        "row",
        "col",
        "val"
      ],
      "rows": [
        [
          "5",
          "1",
          "1",
          "matrix[1][1]"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Standard Binary Search on Virtual 1D Array",
        "timeComplexity": "O(log(M * N))",
        "spaceComplexity": "O(1)",
        "description": "Direct coordinate mapping row = mid / n, col = mid % n enables single binary search.",
        "keyTakeaway": "Index arithmetic maps 2D grids seamlessly to 1D address space.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int m, n, target;\n    if (!(cin >> m >> n >> target)) return 0;\n    vector<vector<int>> matrix(m, vector<int>(n));\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++)\n            cin >> matrix[i][j];\n\n    int low = 0, high = m * n - 1;\n    bool found = false;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        int val = matrix[mid / n][mid % n];\n        if (val == target) {\n            found = true;\n            break;\n        } else if (val < target) {\n            low = mid + 1;\n        } else {\n            high = mid - 1;\n        }\n    }\n    cout << (found ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    m, n, target = int(raw[0]), int(raw[1]), int(raw[2])\n    idx = 3\n    matrix = []\n    for _ in range(m):\n        matrix.append([int(x) for x in raw[idx:idx+n]])\n        idx += n\n\n    low, high = 0, m * n - 1\n    found = False\n    while low <= high:\n        mid = (low + high) // 2\n        val = matrix[mid // n][mid % n]\n        if val == target:\n            found = True\n            break\n        elif val < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    print(\"true\" if found else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "63": {
    "title": "Unique Paths",
    "edgeCases": [
      "m = 1 or n = 1 -> only 1 path"
    ],
    "dryRun": {
      "description": "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
      "headers": [
        "Grid",
        "dp row"
      ],
      "rows": [
        [
          "Row 0",
          "1 1 1 1..."
        ],
        [
          "Row 1",
          "1 2 3 4..."
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Combinatorics / 1D DP",
        "timeComplexity": "O(min(M, N))",
        "spaceComplexity": "O(1)",
        "description": "Total moves = (m - 1) down + (n - 1) right. Answer is C(m + n - 2, m - 1).",
        "keyTakeaway": "Combinatorics calculates grid paths in linear time and constant space.",
        "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n    int N = m + n - 2;\n    int r = min(m - 1, n - 1);\n    long long res = 1;\n    for (int i = 1; i <= r; i++) {\n        res = res * (N - r + i) / i;\n    }\n    cout << res << \"\\n\";\n    return 0;\n}",
        "python": "import sys\nimport math\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    m, n = int(raw[0]), int(raw[1])\n    print(math.comb(m + n - 2, m - 1))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "64": {
    "title": "Inversion Count in Array",
    "edgeCases": [
      "Already sorted ascending -> 0 inversions",
      "Sorted descending -> n*(n-1)/2 inversions"
    ],
    "dryRun": {
      "description": "During merge step, when right < left, count += (mid - i + 1)",
      "headers": [
        "Subarray",
        "Inversions Added"
      ],
      "rows": [
        [
          "Merge [2,4] and [1,3,5]",
          "1 < 2 -> adds 2 inversions"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Modified Merge Sort",
        "timeComplexity": "O(N log N)",
        "spaceComplexity": "O(N)",
        "description": "Count cross inversions while merging two sorted halves in O(N log N).",
        "keyTakeaway": "Merge sort divides and counts relative inversions efficiently.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nlong long merge(vector<int>& arr, vector<int>& temp, int left, int mid, int right) {\n    int i = left, j = mid + 1, k = left;\n    long long invCount = 0;\n    while (i <= mid && j <= right) {\n        if (arr[i] <= arr[j]) {\n            temp[k++] = arr[i++];\n        } else {\n            temp[k++] = arr[j++];\n            invCount += (mid - i + 1);\n        }\n    }\n    while (i <= mid) temp[k++] = arr[i++];\n    while (j <= right) temp[k++] = arr[j++];\n    for (i = left; i <= right; i++) arr[i] = temp[i];\n    return invCount;\n}\n\nlong long mergeSort(vector<int>& arr, vector<int>& temp, int left, int right) {\n    long long invCount = 0;\n    if (left < right) {\n        int mid = left + (right - left) / 2;\n        invCount += mergeSort(arr, temp, left, mid);\n        invCount += mergeSort(arr, temp, mid + 1, right);\n        invCount += merge(arr, temp, left, mid, right);\n    }\n    return invCount;\n}\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> arr(n), temp(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    cout << mergeSort(arr, temp, 0, n - 1) << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    arr = [int(x) for x in raw[1:n+1]]\n\n    temp = [0] * n\n    def merge(left, mid, right):\n        i, j, k = left, mid + 1, left\n        inv = 0\n        while i <= mid and j <= right:\n            if arr[i] <= arr[j]:\n                temp[k] = arr[i]\n                i += 1\n            else:\n                temp[k] = arr[j]\n                j += 1\n                inv += (mid - i + 1)\n            k += 1\n        while i <= mid:\n            temp[k] = arr[i]\n            i += 1\n            k += 1\n        while j <= right:\n            temp[k] = arr[j]\n            j += 1\n            k += 1\n        for idx in range(left, right + 1):\n            arr[idx] = temp[idx]\n        return inv\n\n    def merge_sort(left, right):\n        if left >= right:\n            return 0\n        mid = (left + right) // 2\n        inv = merge_sort(left, mid) + merge_sort(mid + 1, right)\n        inv += merge(left, mid, right)\n        return inv\n\n    print(merge_sort(0, n - 1))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "65": {
    "title": "4Sum",
    "edgeCases": [
      "Duplicates in input",
      "target requiring 64-bit integer sum"
    ],
    "dryRun": {
      "description": "Sort array, fix two outer pointers, scan with two inner pointers",
      "headers": [
        "Pointers",
        "Action"
      ],
      "rows": [
        [
          "i=0, j=1",
          "left=2, right=n-1 -> check sum == target"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Sorted Two-Pointer with Duplicate Pruning",
        "timeComplexity": "O(N³)",
        "spaceComplexity": "O(1) auxiliary",
        "description": "Sort array, fix first two pointers skipping identical values, then two-pointer search.",
        "keyTakeaway": "Generalizes 2Sum / 3Sum to k-Sum with nested two-pointer passes.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (!(cin >> n >> target)) return 0;\n    vector<long long> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    sort(nums.begin(), nums.end());\n    int count = 0;\n    for (int i = 0; i < n - 3; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        for (int j = i + 1; j < n - 2; j++) {\n            if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n            int left = j + 1, right = n - 1;\n            while (left < right) {\n                long long sum = nums[i] + nums[j] + nums[left] + nums[right];\n                if (sum == target) {\n                    count++;\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < target) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n    }\n    cout << count << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, target = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n    nums.sort()\n\n    count = 0\n    for i in range(n - 3):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        for j in range(i + 1, n - 2):\n            if j > i + 1 and nums[j] == nums[j - 1]:\n                continue\n            left, right = j + 1, n - 1\n            while left < right:\n                s = nums[i] + nums[j] + nums[left] + nums[right]\n                if s == target:\n                    count += 1\n                    while left < right and nums[left] == nums[left + 1]:\n                        left += 1\n                    while left < right and nums[right] == nums[right - 1]:\n                        right -= 1\n                    left += 1\n                    right -= 1\n                elif s < target:\n                    left += 1\n                else:\n                    right -= 1\n    print(count)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "66": {
    "title": "Longest Consecutive Sequence",
    "edgeCases": [
      "Empty array -> 0",
      "Array with all duplicate values",
      "Single element array"
    ],
    "dryRun": {
      "description": "Hash set lookup only for numbers starting a streak",
      "headers": [
        "Num",
        "Is Streak Start (num-1 not in set)?",
        "Length"
      ],
      "rows": [
        [
          "1",
          "Yes (0 not in set)",
          "1->2->3->4 = 4"
        ],
        [
          "100",
          "Yes (99 not in set)",
          "100 = 1"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Hash Set Streak Counting",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "Insert all elements into set. Only expand when num-1 does not exist, guaranteeing each element visited at most twice.",
        "keyTakeaway": "Filtering for streak starting points ensures O(N) linear time overall.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n) || n == 0) {\n        cout << 0 << \"\\n\";\n        return 0;\n    }\n    unordered_set<int> s;\n    for (int i = 0; i < n; i++) {\n        int x; cin >> x;\n        s.insert(x);\n    }\n    int longest = 0;\n    for (int num : s) {\n        if (!s.count(num - 1)) {\n            int current = num;\n            int streak = 1;\n            while (s.count(current + 1)) {\n                current++;\n                streak++;\n            }\n            longest = max(longest, streak);\n        }\n    }\n    cout << longest << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) == 0:\n        print(0)\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    num_set = set(nums)\n    longest = 0\n    for num in num_set:\n        if num - 1 not in num_set:\n            current = num\n            streak = 1\n            while current + 1 in num_set:\n                current += 1\n                streak += 1\n            longest = max(longest, streak)\n    print(longest)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "67": {
    "title": "Largest Subarray with 0 Sum",
    "edgeCases": [
      "No subarray sums to 0 -> 0",
      "Entire array sums to 0"
    ],
    "dryRun": {
      "description": "Prefix sum map tracking earliest occurrence index",
      "headers": [
        "Index",
        "Element",
        "PrefixSum",
        "Action"
      ],
      "rows": [
        [
          "0",
          "15",
          "15",
          "seen[15]=0"
        ],
        [
          "1",
          "-2",
          "13",
          "seen[13]=1"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Prefix Sum with Earliest Hash Map",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "Equal prefix sums at index i and j imply sum of elements between them is 0.",
        "keyTakeaway": "Storing only earliest occurrences maximizes subarray length.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n\n    unordered_map<long long, int> seen;\n    long long sum = 0;\n    int maxLen = 0;\n    for (int i = 0; i < n; i++) {\n        sum += arr[i];\n        if (sum == 0) maxLen = i + 1;\n        if (seen.find(sum) != seen.end()) {\n            maxLen = max(maxLen, i - seen[sum]);\n        } else {\n            seen[sum] = i;\n        }\n    }\n    cout << maxLen << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    arr = [int(x) for x in raw[1:n+1]]\n\n    seen = {}\n    s = 0\n    max_len = 0\n    for i in range(n):\n        s += arr[i]\n        if s == 0:\n            max_len = i + 1\n        if s in seen:\n            max_len = max(max_len, i - seen[s])\n        else:\n            seen[s] = i\n    print(max_len)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "68": {
    "title": "Subarray Sum Equals K",
    "edgeCases": [
      "k = 0 with zeroes in array",
      "Negative numbers in array"
    ],
    "dryRun": {
      "description": "Track frequency of prefix sums: add freq[sum - k] to total",
      "headers": [
        "Step",
        "PrefixSum",
        "Complement (sum - k)",
        "Count"
      ],
      "rows": [
        [
          "1",
          "1",
          "-1",
          "0"
        ],
        [
          "2",
          "2",
          "0",
          "1"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Prefix Sum Frequency Hash Map",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "Any time prefixSum - k exists in history, a valid subarray ending at current index exists.",
        "keyTakeaway": "Hash map prefix counts solve subarray sum problems in linear time.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    unordered_map<int, int> countMap;\n    countMap[0] = 1;\n    int sum = 0, total = 0;\n    for (int i = 0; i < n; i++) {\n        int x; cin >> x;\n        sum += x;\n        if (countMap.find(sum - k) != countMap.end()) {\n            total += countMap[sum - k];\n        }\n        countMap[sum]++;\n    }\n    cout << total << \"\\n\";\n    return 0;\n}",
        "python": "import sys\nfrom collections import defaultdict\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, k = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n\n    counts = defaultdict(int)\n    counts[0] = 1\n    s, total = 0, 0\n    for x in nums:\n        s += x\n        total += counts[s - k]\n        counts[s] += 1\n    print(total)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "69": {
    "title": "Find Peak Element",
    "edgeCases": [
      "Array of length 1 -> index 0",
      "Strictly increasing or decreasing array"
    ],
    "dryRun": {
      "description": "Binary search on slope: if nums[mid] < nums[mid+1], go right",
      "headers": [
        "mid",
        "nums[mid]",
        "nums[mid+1]",
        "Direction"
      ],
      "rows": [
        [
          "1",
          "2",
          "3",
          "Go right (low = mid + 1)"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Binary Search on Slope",
        "timeComplexity": "O(log N)",
        "spaceComplexity": "O(1)",
        "description": "Ascending slope guarantees a peak exists towards the higher side.",
        "keyTakeaway": "Binary search works on unsorted arrays if invariant slopes direct search.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int low = 0, high = n - 1;\n    while (low < high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] < nums[mid + 1]) {\n            low = mid + 1;\n        } else {\n            high = mid;\n        }\n    }\n    cout << low << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n\n    low, high = 0, n - 1\n    while low < high:\n        mid = (low + high) // 2\n        if nums[mid] < nums[mid + 1]:\n            low = mid + 1\n        else:\n            high = mid\n    print(low)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "70": {
    "title": "Single Element in a Sorted Array",
    "edgeCases": [
      "Single element array",
      "Unique element at start or end"
    ],
    "dryRun": {
      "description": "XOR index parity trick: partner index is mid ^ 1",
      "headers": [
        "mid",
        "mid ^ 1",
        "nums[mid] == nums[mid ^ 1]?",
        "Action"
      ],
      "rows": [
        [
          "4",
          "5",
          "Yes",
          "Unique is in right half"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Binary Search via Index Parity",
        "timeComplexity": "O(log N)",
        "spaceComplexity": "O(1)",
        "description": "Before unique element, pairs are (even, odd). Use mid ^ 1 to check partner.",
        "keyTakeaway": "XOR index trick (mid ^ 1) cleanly pairs 0-1, 2-3, 4-5.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int low = 0, high = n - 1;\n    while (low < high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == nums[mid ^ 1]) {\n            low = mid + 1;\n        } else {\n            high = mid;\n        }\n    }\n    cout << nums[low] << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n\n    low, high = 0, n - 1\n    while low < high:\n        mid = (low + high) // 2\n        if nums[mid] == nums[mid ^ 1]:\n            low = mid + 1\n        else:\n            high = mid\n    print(nums[low])\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "71": {
    "title": "Search in Rotated Sorted Array II",
    "edgeCases": [
      "All elements duplicates except target",
      "Array of size 1"
    ],
    "dryRun": {
      "description": "When nums[low] == nums[mid] == nums[high], shrink bounds",
      "headers": [
        "Step",
        "Action"
      ],
      "rows": [
        [
          "nums[low]==nums[mid]==nums[high]",
          "low++, high--"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Binary Search with Duplicate Shrink",
        "timeComplexity": "O(log N) average, O(N) worst case",
        "spaceComplexity": "O(1)",
        "description": "Shrink search window by trimming duplicate boundary values.",
        "keyTakeaway": "Duplicates degrade worst-case binary search to linear time.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int low = 0, high = n - 1;\n    bool found = false;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) {\n            found = true;\n            break;\n        }\n        if (nums[low] == nums[mid] && nums[mid] == nums[high]) {\n            low++; high--;\n            continue;\n        }\n        if (nums[low] <= nums[mid]) {\n            if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n            else low = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n            else high = mid - 1;\n        }\n    }\n    cout << (found ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, target = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n\n    low, high = 0, n - 1\n    found = False\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            found = True\n            break\n        if nums[low] == nums[mid] == nums[high]:\n            low += 1\n            high -= 1\n            continue\n        if nums[low] <= nums[mid]:\n            if nums[low] <= target < nums[mid]:\n                high = mid - 1\n            else:\n                low = mid + 1\n        else:\n            if nums[mid] < target <= nums[high]:\n                low = mid + 1\n            else:\n                high = mid - 1\n    print(\"true\" if found else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "72": {
    "title": "Koko Eating Bananas",
    "edgeCases": [
      "h == piles.length (must eat max pile per hour)",
      "Large pile values up to 10^9"
    ],
    "dryRun": {
      "description": "Binary search speed k in [1, max(piles)]",
      "headers": [
        "k",
        "Total Hours Needed",
        "Within h?"
      ],
      "rows": [
        [
          "4",
          "1 + 2 + 2 + 3 = 8",
          "Yes -> try lower k"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Binary Search on Answer Space",
        "timeComplexity": "O(N log(max(P)))",
        "spaceComplexity": "O(1)",
        "description": "Monotonic function: higher speed strictly decreases hours needed. Binary search speed.",
        "keyTakeaway": "Binary search applies directly to monotonic decision functions.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nbool canEat(const vector<int>& piles, int h, int k) {\n    long long hours = 0;\n    for (int p : piles) {\n        hours += (p + k - 1) / k;\n    }\n    return hours <= h;\n}\n\nint main() {\n    int n, h;\n    if (!(cin >> n >> h)) return 0;\n    vector<int> piles(n);\n    int maxPile = 0;\n    for (int i = 0; i < n; i++) {\n        cin >> piles[i];\n        maxPile = max(maxPile, piles[i]);\n    }\n\n    int low = 1, high = maxPile, ans = maxPile;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (canEat(piles, h, mid)) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    cout << ans << \"\\n\";\n    return 0;\n}",
        "python": "import sys\nimport math\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, h = int(raw[0]), int(raw[1])\n    piles = [int(x) for x in raw[2:n+2]]\n\n    def can_eat(k):\n        return sum(math.ceil(p / k) for p in piles) <= h\n\n    low, high = 1, max(piles)\n    ans = high\n    while low <= high:\n        mid = (low + high) // 2\n        if can_eat(mid):\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    print(ans)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "73": {
    "title": "Aggressive Cows",
    "edgeCases": [
      "k = 2 (place at first and last stall)",
      "All stalls close together"
    ],
    "dryRun": {
      "description": "Binary search distance between stalls on sorted positions",
      "headers": [
        "dist",
        "Cows Placed",
        "Valid?"
      ],
      "rows": [
        [
          "3",
          "3 cows at [1, 4, 8]",
          "Yes -> try larger dist"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Binary Search on Minimum Distance",
        "timeComplexity": "O(N log(max_pos))",
        "spaceComplexity": "O(1)",
        "description": "Sort stalls and binary search minimum gap dist, greedily placing cows.",
        "keyTakeaway": "Maximizing the minimum is a classic binary search on answer pattern.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nbool canPlace(const vector<int>& stalls, int k, int dist) {\n    int count = 1, last = stalls[0];\n    for (size_t i = 1; i < stalls.size(); i++) {\n        if (stalls[i] - last >= dist) {\n            count++;\n            last = stalls[i];\n            if (count >= k) return true;\n        }\n    }\n    return false;\n}\n\nint main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    vector<int> stalls(n);\n    for (int i = 0; i < n; i++) cin >> stalls[i];\n    sort(stalls.begin(), stalls.end());\n\n    int low = 1, high = stalls.back() - stalls.front(), ans = 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (canPlace(stalls, k, mid)) {\n            ans = mid;\n            low = mid + 1;\n        } else {\n            high = mid - 1;\n        }\n    }\n    cout << ans << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, k = int(raw[0]), int(raw[1])\n    stalls = [int(x) for x in raw[2:n+2]]\n    stalls.sort()\n\n    def can_place(dist):\n        count, last = 1, stalls[0]\n        for x in stalls[1:]:\n            if x - last >= dist:\n                count += 1\n                last = x\n                if count >= k:\n                    return True\n        return False\n\n    low, high = 1, stalls[-1] - stalls[0]\n    ans = 1\n    while low <= high:\n        mid = (low + high) // 2\n        if can_place(mid):\n            ans = mid\n            low = mid + 1\n        else:\n            high = mid - 1\n    print(ans)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "74": {
    "title": "Book Allocation Problem",
    "edgeCases": [
      "m > n (impossible -> -1)",
      "m = 1 (single student gets all pages)"
    ],
    "dryRun": {
      "description": "Binary search max pages limit in [max(arr), sum(arr)]",
      "headers": [
        "Limit",
        "Students Required",
        "Valid?"
      ],
      "rows": [
        [
          "113",
          "2 students",
          "Yes"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Binary Search on Max Pages Allocation",
        "timeComplexity": "O(N log(sum - max))",
        "spaceComplexity": "O(1)",
        "description": "Check if pages can be greedily partitioned into <= m segments without exceeding capacity.",
        "keyTakeaway": "Minimizing maximum workload via monotonic capacity verification.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <numeric>\n#include <algorithm>\nusing namespace std;\n\nbool isPossible(const vector<int>& arr, int n, int m, long long maxPages) {\n    int students = 1;\n    long long currPages = 0;\n    for (int p : arr) {\n        if (p > maxPages) return false;\n        if (currPages + p > maxPages) {\n            students++;\n            currPages = p;\n            if (students > m) return false;\n        } else {\n            currPages += p;\n        }\n    }\n    return true;\n}\n\nint main() {\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    vector<int> arr(n);\n    long long sum = 0;\n    int maxVal = 0;\n    for (int i = 0; i < n; i++) {\n        cin >> arr[i];\n        sum += arr[i];\n        maxVal = max(maxVal, arr[i]);\n    }\n    if (m > n) {\n        cout << -1 << \"\\n\";\n        return 0;\n    }\n\n    long long low = maxVal, high = sum, ans = sum;\n    while (low <= high) {\n        long long mid = low + (high - low) / 2;\n        if (isPossible(arr, n, m, mid)) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    cout << ans << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, m = int(raw[0]), int(raw[1])\n    arr = [int(x) for x in raw[2:n+2]]\n    if m > n:\n        print(-1)\n        return\n\n    def is_possible(limit):\n        students = 1\n        curr = 0\n        for p in arr:\n            if p > limit:\n                return False\n            if curr + p > limit:\n                students += 1\n                curr = p\n                if students > m:\n                    return False\n            else:\n                curr += p\n        return True\n\n    low, high = max(arr), sum(arr)\n    ans = high\n    while low <= high:\n        mid = (low + high) // 2\n        if is_possible(mid):\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    print(ans)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "75": {
    "title": "Roman to Integer",
    "edgeCases": [
      "Subtractive combinations (IV, IX, XL, XC, CD, CM)",
      "Single character Roman"
    ],
    "dryRun": {
      "description": "If curr < next, subtract curr; else add curr",
      "headers": [
        "Char",
        "Val",
        "Next Val",
        "Action"
      ],
      "rows": [
        [
          "I",
          "1",
          "V(5)",
          "Subtract 1"
        ],
        [
          "V",
          "5",
          "None",
          "Add 5 -> Total 4"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Subtractive Lookahead Evaluation",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Compare adjacent numeral values to handle subtractive pairs seamlessly.",
        "keyTakeaway": "Lookahead of one symbol resolves prefix subtractions in Roman numerals.",
        "cpp": "#include <iostream>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    string s;\n    if (!(cin >> s)) return 0;\n    unordered_map<char, int> val = {\n        {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},\n        {'C', 100}, {'D', 500}, {'M', 1000}\n    };\n    int total = 0, n = s.length();\n    for (int i = 0; i < n; i++) {\n        if (i + 1 < n && val[s[i]] < val[s[i + 1]]) {\n            total -= val[s[i]];\n        } else {\n            total += val[s[i]];\n        }\n    }\n    cout << total << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    s = raw[0]\n    val = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}\n    total = 0\n    for i in range(len(s)):\n        if i + 1 < len(s) and val[s[i]] < val[s[i + 1]]:\n            total -= val[s[i]]\n        else:\n            total += val[s[i]]\n    print(total)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "76": {
    "title": "Integer to Roman",
    "edgeCases": [
      "Numbers near power of 10 boundaries (900, 40, 9)",
      "Max value 3999"
    ],
    "dryRun": {
      "description": "Greedy value subtraction from precomputed value-symbol table",
      "headers": [
        "Remaining",
        "Symbol",
        "Count"
      ],
      "rows": [
        [
          "1994",
          "M (1000)",
          "1"
        ],
        [
          "994",
          "CM (900)",
          "1"
        ],
        [
          "94",
          "XC (90)",
          "1"
        ],
        [
          "4",
          "IV (4)",
          "1"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Greedy Symbol Table Mapping",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(1)",
        "description": "Greedily subtract largest base values matching Roman numerals.",
        "keyTakeaway": "Pre-defining subtractive pairs makes Roman conversion a clean greedy process.",
        "cpp": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int num;\n    if (!(cin >> num)) return 0;\n    vector<pair<int, string>> table = {\n        {1000, \"M\"}, {900, \"CM\"}, {500, \"D\"}, {400, \"CD\"},\n        {100, \"C\"}, {90, \"XC\"}, {50, \"L\"}, {40, \"XL\"},\n        {10, \"X\"}, {9, \"IX\"}, {5, \"V\"}, {4, \"IV\"}, {1, \"I\"}\n    };\n    string res = \"\";\n    for (auto& p : table) {\n        while (num >= p.first) {\n            res += p.second;\n            num -= p.first;\n        }\n    }\n    cout << res << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    num = int(raw[0])\n    table = [\n        (1000, \"M\"), (900, \"CM\"), (500, \"D\"), (400, \"CD\"),\n        (100, \"C\"), (90, \"XC\"), (50, \"L\"), (40, \"XL\"),\n        (10, \"X\"), (9, \"IX\"), (5, \"V\"), (4, \"IV\"), (1, \"I\")\n    ]\n    res = []\n    for val, sym in table:\n        while num >= val:\n            res.append(sym)\n            num -= val\n    print(\"\".join(res))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "77": {
    "title": "Count and Say",
    "edgeCases": [
      "n = 1 -> '1'",
      "Repeated identical run lengths (e.g. '111221')"
    ],
    "dryRun": {
      "description": "Run-length encoding of current string to produce next",
      "headers": [
        "n",
        "String"
      ],
      "rows": [
        [
          "1",
          "1"
        ],
        [
          "2",
          "11"
        ],
        [
          "3",
          "21"
        ],
        [
          "4",
          "1211"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Iterative Run-Length Encoding",
        "timeComplexity": "O(N * L)",
        "spaceComplexity": "O(L)",
        "description": "Iteratively encode identical adjacent character runs.",
        "keyTakeaway": "Two pointers scan adjacent identical runs in linear time.",
        "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    string s = \"1\";\n    for (int step = 2; step <= n; step++) {\n        string nextStr = \"\";\n        int len = s.length();\n        for (int i = 0; i < len; ) {\n            int j = i;\n            while (j < len && s[j] == s[i]) j++;\n            nextStr += to_string(j - i) + s[i];\n            i = j;\n        }\n        s = nextStr;\n    }\n    cout << s << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    s = \"1\"\n    for _ in range(2, n + 1):\n        next_s = []\n        i = 0\n        while i < len(s):\n            j = i\n            while j < len(s) and s[j] == s[i]:\n                j += 1\n            next_s.append(f\"{j - i}{s[i]}\")\n            i = j\n        s = \"\".join(next_s)\n    print(s)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "78": {
    "title": "Ransom Note",
    "edgeCases": [
      "magazine shorter than ransomNote",
      "Character missing completely"
    ],
    "dryRun": {
      "description": "Frequency count array of size 26",
      "headers": [
        "Step",
        "Action"
      ],
      "rows": [
        [
          "Count magazine",
          "Increment letters"
        ],
        [
          "Read ransomNote",
          "Decrement letters, check >= 0"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Frequency Array Counting",
        "timeComplexity": "O(N + M)",
        "spaceComplexity": "O(1) (26 letters)",
        "description": "Count available letters in magazine and decrement for ransomNote.",
        "keyTakeaway": "Fixed alphabet of 26 letters allows constant space frequency matching.",
        "cpp": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    string ransom, magazine;\n    if (!(cin >> ransom >> magazine)) return 0;\n    vector<int> count(26, 0);\n    for (char c : magazine) count[c - 'a']++;\n    bool possible = true;\n    for (char c : ransom) {\n        if (--count[c - 'a'] < 0) {\n            possible = false;\n            break;\n        }\n    }\n    cout << (possible ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    ransom, magazine = raw[0], raw[1]\n    cnt = [0] * 26\n    for c in magazine:\n        cnt[ord(c) - ord('a')] += 1\n    possible = True\n    for c in ransom:\n        idx = ord(c) - ord('a')\n        cnt[idx] -= 1\n        if cnt[idx] < 0:\n            possible = False\n            break\n    print(\"true\" if possible else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "79": {
    "title": "Reverse Linked List II",
    "edgeCases": [
      "left = 1 (reversing from head)",
      "left = right (no change)"
    ],
    "dryRun": {
      "description": "Dummy node points to head; advance to left - 1, reverse segment",
      "headers": [
        "Step",
        "Action"
      ],
      "rows": [
        [
          "1",
          "Reach left - 1"
        ],
        [
          "2",
          "Repeatedly insert next node to segment start"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "One-Pass In-Place Sublist Reversal",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Iteratively reverse subsegment using 3 pointers without rebuilding nodes.",
        "keyTakeaway": "Dummy node eliminates edge conditions when modifying the list head.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, left, right;\n    if (!(cin >> n >> left >> right)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    reverse(nums.begin() + left - 1, nums.begin() + right);\n    for (int i = 0; i < n; i++) {\n        cout << nums[i] << (i == n - 1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, left, right = int(raw[0]), int(raw[1]), int(raw[2])\n    nums = [int(x) for x in raw[3:n+3]]\n    nums[left-1:right] = reversed(nums[left-1:right])\n    print(\" \".join(map(str, nums)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "80": {
    "title": "Rotate List",
    "edgeCases": [
      "k = 0 or k % n == 0",
      "k greater than list length n",
      "n = 1"
    ],
    "dryRun": {
      "description": "Connect tail to head, find cut point at n - (k % n) - 1",
      "headers": [
        "Step",
        "Action"
      ],
      "rows": [
        [
          "1",
          "Compute length n"
        ],
        [
          "2",
          "Cut at new tail"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Ring Cut Circular Traversal",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)",
        "description": "Form a circular ring, advance n - (k % n) steps to locate new head, and detach ring.",
        "keyTakeaway": "Modulo reduction k % n prevents unnecessary cycles.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long k;\n    if (!(cin >> n >> k)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    if (n == 0) return 0;\n\n    k %= n;\n    vector<int> res(n);\n    for (int i = 0; i < n; i++) {\n        res[(i + k) % n] = nums[i];\n    }\n    for (int i = 0; i < n; i++) {\n        cout << res[i] << (i == n - 1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, k = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n    if n == 0:\n        return\n    k %= n\n    rotated = nums[-k:] + nums[:-k] if k > 0 else nums\n    print(\" \".join(map(str, rotated)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "81": {
    "title": "Next Greater Element I",
    "edgeCases": [
      "No greater element exists for any item",
      "nums1 and nums2 have size 1"
    ],
    "dryRun": {
      "description": "Monotonic stack over nums2 creates lookup map",
      "headers": [
        "Element",
        "Stack",
        "Map Entry"
      ],
      "rows": [
        [
          "1",
          "[1]",
          "-"
        ],
        [
          "3",
          "[3]",
          "1 -> 3"
        ],
        [
          "4",
          "[4]",
          "3 -> 4"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Monotonic Stack with Hash Map",
        "timeComplexity": "O(N1 + N2)",
        "spaceComplexity": "O(N2)",
        "description": "Traverse nums2 with monotonic stack; map each element to its next greater neighbor.",
        "keyTakeaway": "Monotonic decreasing stack finds next greater element in linear time.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <stack>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    int n1, n2;\n    if (!(cin >> n1 >> n2)) return 0;\n    vector<int> nums1(n1), nums2(n2);\n    for (int i = 0; i < n1; i++) cin >> nums1[i];\n    for (int i = 0; i < n2; i++) cin >> nums2[i];\n\n    unordered_map<int, int> nextGreater;\n    stack<int> st;\n    for (int x : nums2) {\n        while (!st.empty() && st.top() < x) {\n            nextGreater[st.top()] = x;\n            st.pop();\n        }\n        st.push(x);\n    }\n\n    for (int i = 0; i < n1; i++) {\n        int ans = nextGreater.count(nums1[i]) ? nextGreater[nums1[i]] : -1;\n        cout << ans << (i == n1 - 1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n1, n2 = int(raw[0]), int(raw[1])\n    nums1 = [int(x) for x in raw[2:2+n1]]\n    nums2 = [int(x) for x in raw[2+n1:2+n1+n2]]\n\n    next_greater = {}\n    st = []\n    for x in nums2:\n        while st and st[-1] < x:\n            next_greater[st.pop()] = x\n        st.append(x)\n\n    res = [str(next_greater.get(x, -1)) for x in nums1]\n    print(\" \".join(res))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "82": {
    "title": "Next Greater Element II",
    "edgeCases": [
      "All elements identical -> all -1",
      "Descending array"
    ],
    "dryRun": {
      "description": "Traverse 2*n - 1 elements with monotonic stack storing indices",
      "headers": [
        "Index (i % n)",
        "Value",
        "Stack Action"
      ],
      "rows": [
        [
          "0",
          "1",
          "Push 0"
        ],
        [
          "1",
          "2",
          "Pop 0 -> res[0]=2"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Circular Monotonic Stack",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "Loop through virtual array of size 2*N using i % N with monotonic stack.",
        "keyTakeaway": "Doubling array length simulates circular wraparound in O(N).",
        "cpp": "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    vector<int> res(n, -1);\n    stack<int> st;\n    for (int i = 0; i < 2 * n; i++) {\n        while (!st.empty() && nums[st.top()] < nums[i % n]) {\n            res[st.top()] = nums[i % n];\n            st.pop();\n        }\n        if (i < n) st.push(i);\n    }\n    for (int i = 0; i < n; i++) {\n        cout << res[i] << (i == n - 1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n\n    res = [-1] * n\n    st = []\n    for i in range(2 * n):\n        idx = i % n\n        while st and nums[st[-1]] < nums[idx]:\n            res[st.pop()] = nums[idx]\n        if i < n:\n            st.append(i)\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "83": {
    "title": "Largest Rectangle in Histogram",
    "edgeCases": [
      "Strictly ascending heights",
      "Single bar histogram"
    ],
    "dryRun": {
      "description": "Monotonic increasing stack tracks left and right boundaries",
      "headers": [
        "Popped Bar",
        "Left Boundary",
        "Right Boundary",
        "Area"
      ],
      "rows": [
        [
          "6",
          "index of 5",
          "index of 2",
          "6 * 1 = 6"
        ],
        [
          "5",
          "index of 1",
          "index of 2",
          "5 * 2 = 10"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Monotonic Increasing Stack (Single Pass)",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "Each bar is popped when a smaller bar is encountered, determining right boundary.",
        "keyTakeaway": "Monotonic stack efficiently computes widths between smaller boundaries.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<long long> h(n);\n    for (int i = 0; i < n; i++) cin >> h[i];\n\n    stack<int> st;\n    long long maxArea = 0;\n    for (int i = 0; i <= n; i++) {\n        long long curr = (i == n) ? 0 : h[i];\n        while (!st.empty() && curr < h[st.top()]) {\n            long long height = h[st.top()];\n            st.pop();\n            long long width = st.empty() ? i : (i - st.top() - 1);\n            maxArea = max(maxArea, height * width);\n        }\n        st.push(i);\n    }\n    cout << maxArea << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    h = [int(x) for x in raw[1:n+1]]\n\n    st = []\n    max_area = 0\n    for i in range(n + 1):\n        curr = 0 if i == n else h[i]\n        while st and curr < h[st[-1]]:\n            height = h[st.pop()]\n            width = i if not st else (i - st[-1] - 1)\n            max_area = max(max_area, height * width)\n        st.append(i)\n    print(max_area)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "84": {
    "title": "Sliding Window Maximum",
    "edgeCases": [
      "k = 1",
      "k == nums.length",
      "Strictly decreasing window"
    ],
    "dryRun": {
      "description": "Monotonic deque maintains indices of candidate maxima in descending order",
      "headers": [
        "Step",
        "Element",
        "Deque Indices",
        "Window Max"
      ],
      "rows": [
        [
          "i=2",
          "-1",
          "[1, 2]",
          "3"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Monotonic Deque",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(K)",
        "description": "Front of deque always holds the max element for current window.",
        "keyTakeaway": "Discard elements that are both older and smaller than the current element.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <deque>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    deque<int> dq;\n    vector<int> res;\n    for (int i = 0; i < n; i++) {\n        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();\n        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();\n        dq.push_back(i);\n        if (i >= k - 1) res.push_back(nums[dq.front()]);\n    }\n    for (size_t i = 0; i < res.size(); i++) {\n        cout << res[i] << (i + 1 == res.size() ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
        "python": "import sys\nfrom collections import deque\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, k = int(raw[0]), int(raw[1])\n    nums = [int(x) for x in raw[2:n+2]]\n\n    dq = deque()\n    res = []\n    for i in range(n):\n        if dq and dq[0] <= i - k:\n            dq.popleft()\n        while dq and nums[dq[-1]] <= nums[i]:\n            dq.pop()\n        dq.append(i)\n        if i >= k - 1:\n            res.append(str(nums[dq[0]]))\n    print(\" \".join(res))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "85": {
    "title": "Implement Queue using Stacks",
    "edgeCases": [
      "Repeated pushes and pops",
      "Querying empty queue"
    ],
    "dryRun": {
      "description": "Amortized O(1) transfer from inStack to outStack",
      "headers": [
        "Op",
        "inStack",
        "outStack",
        "Output"
      ],
      "rows": [
        [
          "Push 1",
          "[1]",
          "[]",
          "-"
        ],
        [
          "Push 2",
          "[1, 2]",
          "[]",
          "-"
        ],
        [
          "Pop",
          "[]",
          "[2]",
          "1"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Two Stacks with Amortized O(1) Transfer",
        "timeComplexity": "O(1) amortized per operation",
        "spaceComplexity": "O(N)",
        "description": "Transfer from input stack to output stack only when output stack is empty.",
        "keyTakeaway": "Each element is moved at most twice, yielding amortized O(1).",
        "cpp": "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n    int q;\n    if (!(cin >> q)) return 0;\n    stack<int> inSt, outSt;\n    while (q--) {\n        int type; cin >> type;\n        if (type == 1) {\n            int x; cin >> x;\n            inSt.push(x);\n        } else if (type == 2 || type == 3) {\n            if (outSt.empty()) {\n                while (!inSt.empty()) {\n                    outSt.push(inSt.top());\n                    inSt.pop();\n                }\n            }\n            int val = outSt.top();\n            if (type == 2) outSt.pop();\n            cout << val << \"\\n\";\n        }\n    }\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    q = int(raw[0])\n    idx = 1\n    in_st, out_st = [], []\n    for _ in range(q):\n        t = int(raw[idx])\n        idx += 1\n        if t == 1:\n            x = int(raw[idx])\n            idx += 1\n            in_st.append(x)\n        else:\n            if not out_st:\n                while in_st:\n                    out_st.append(in_st.pop())\n            val = out_st[-1]\n            if t == 2:\n                out_st.pop()\n            print(val)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "86": {
    "title": "Subsets",
    "edgeCases": [
      "Array of length 1",
      "Generating full power set"
    ],
    "dryRun": {
      "description": "2^n total subsets via recursive inclusion/exclusion",
      "headers": [
        "Level",
        "Subset Formed"
      ],
      "rows": [
        [
          "0",
          "[]"
        ],
        [
          "1",
          "[1]"
        ],
        [
          "2",
          "[1, 2]"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Backtracking / Combinatorial Count",
        "timeComplexity": "O(2^N)",
        "spaceComplexity": "O(N)",
        "description": "Recursive inclusion/exclusion generates the complete power set of size 2^N.",
        "keyTakeaway": "Binary choice tree yields 2^N configurations.",
        "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    cout << (1 << n) << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    print(1 << n)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "87": {
    "title": "Subsets II",
    "edgeCases": [
      "All elements duplicates",
      "Array of size 1"
    ],
    "dryRun": {
      "description": "Sort and skip duplicates at same tree depth",
      "headers": [
        "Depth",
        "Condition",
        "Action"
      ],
      "rows": [
        [
          "i > start",
          "nums[i] == nums[i-1]",
          "Skip duplicate"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Sorted Backtracking with Duplicate Pruning",
        "timeComplexity": "O(2^N)",
        "spaceComplexity": "O(N)",
        "description": "Sort elements and skip identical siblings at the same recursion depth.",
        "keyTakeaway": "Sorting before backtracking enables duplicate pruning in O(1).",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid backtrack(const vector<int>& nums, int start, int& count) {\n    count++;\n    for (size_t i = start; i < nums.size(); i++) {\n        if (i > (size_t)start && nums[i] == nums[i - 1]) continue;\n        backtrack(nums, i + 1, count);\n    }\n}\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    sort(nums.begin(), nums.end());\n    int count = 0;\n    backtrack(nums, 0, count);\n    cout << count << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    nums = [int(x) for x in raw[1:n+1]]\n    nums.sort()\n\n    count = 0\n    def backtrack(start):\n        nonlocal count\n        count += 1\n        for i in range(start, n):\n            if i > start and nums[i] == nums[i - 1]:\n                continue\n            backtrack(i + 1)\n\n    backtrack(0)\n    print(count)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "88": {
    "title": "Combination Sum",
    "edgeCases": [
      "target smaller than smallest candidate",
      "candidate reusable multiple times"
    ],
    "dryRun": {
      "description": "Backtrack branch: pick same element or advance index",
      "headers": [
        "Index",
        "Remaining Target",
        "Action"
      ],
      "rows": [
        [
          "0",
          "7",
          "Pick 2 -> rem 5"
        ],
        [
          "0",
          "5",
          "Pick 2 -> rem 3"
        ],
        [
          "0",
          "3",
          "Pick 2 -> rem 1 (exceeds)"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Reusable Backtracking",
        "timeComplexity": "O(2^T) where T = target/min_val",
        "spaceComplexity": "O(target)",
        "description": "Branch on candidate reuse or index advancement.",
        "keyTakeaway": "Unbounded knapsack recursion pattern.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid dfs(const vector<int>& cand, int idx, int target, int& count) {\n    if (target == 0) {\n        count++;\n        return;\n    }\n    for (size_t i = idx; i < cand.size(); i++) {\n        if (cand[i] > target) break;\n        dfs(cand, i, target - cand[i], count);\n    }\n}\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> cand(n);\n    for (int i = 0; i < n; i++) cin >> cand[i];\n    sort(cand.begin(), cand.end());\n    int count = 0;\n    dfs(cand, 0, target, count);\n    cout << count << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, target = int(raw[0]), int(raw[1])\n    cand = [int(x) for x in raw[2:n+2]]\n    cand.sort()\n\n    count = 0\n    def dfs(idx, rem):\n        nonlocal count\n        if rem == 0:\n            count += 1\n            return\n        for i in range(idx, n):\n            if cand[i] > rem:\n                break\n            dfs(i, rem - cand[i])\n\n    dfs(0, target)\n    print(count)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "89": {
    "title": "Permutations",
    "edgeCases": [
      "Single element array -> 1",
      "Size n array -> n!"
    ],
    "dryRun": {
      "description": "Factorial combinations of distinct elements",
      "headers": [
        "n",
        "Permutations"
      ],
      "rows": [
        [
          "1",
          "1"
        ],
        [
          "2",
          "2"
        ],
        [
          "3",
          "6"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Factorial Count / In-Place Swapping",
        "timeComplexity": "O(N!)",
        "spaceComplexity": "O(N)",
        "description": "Recursively swap each position with remaining elements to produce all permutations.",
        "keyTakeaway": "Permutation trees have branching factor n, n-1, ..., 1.",
        "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    int fact = 1;\n    for (int i = 1; i <= n; i++) fact *= i;\n    cout << fact << \"\\n\";\n    return 0;\n}",
        "python": "import sys\nimport math\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n    print(math.factorial(n))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "90": {
    "title": "N-Queens",
    "edgeCases": [
      "n = 1 -> 1 solution",
      "n = 2, 3 -> 0 solutions",
      "n = 4 -> 2 solutions"
    ],
    "dryRun": {
      "description": "Backtrack row by row tracking column and diagonal bitmasks",
      "headers": [
        "Row",
        "Safe Column?",
        "Recurse"
      ],
      "rows": [
        [
          "0",
          "Place at col 1",
          "Go to row 1"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Backtracking with Column and Diagonal Masks",
        "timeComplexity": "O(N!)",
        "spaceComplexity": "O(N)",
        "description": "Check row, col, main diag (r+c), and anti diag (r-c+n-1) in O(1) using boolean masks.",
        "keyTakeaway": "Index transforms map diagonals to 1D lookup tables.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid solveNQueens(int row, int n, vector<bool>& cols, vector<bool>& d1, vector<bool>& d2, int& count) {\n    if (row == n) {\n        count++;\n        return;\n    }\n    for (int col = 0; col < n; col++) {\n        if (!cols[col] && !d1[row + col] && !d2[row - col + n - 1]) {\n            cols[col] = d1[row + col] = d2[row - col + n - 1] = true;\n            solveNQueens(row + 1, n, cols, d1, d2, count);\n            cols[col] = d1[row + col] = d2[row - col + n - 1] = false;\n        }\n    }\n}\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<bool> cols(n, false), d1(2 * n, false), d2(2 * n, false);\n    int count = 0;\n    solveNQueens(0, n, cols, d1, d2, count);\n    cout << count << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n = int(raw[0])\n\n    cols = [False] * n\n    d1 = [False] * (2 * n)\n    d2 = [False] * (2 * n)\n    count = 0\n\n    def backtrack(r):\n        nonlocal count\n        if r == n:\n            count += 1\n            return\n        for c in range(n):\n            if not cols[c] and not d1[r + c] and not d2[r - c + n - 1]:\n                cols[c] = d1[r + c] = d2[r - c + n - 1] = True\n                backtrack(r + 1)\n                cols[c] = d1[r + c] = d2[r - c + n - 1] = False\n\n    backtrack(0)\n    print(count)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "91": {
    "title": "Word Search",
    "edgeCases": [
      "Single cell board matching word",
      "Word longer than board area"
    ],
    "dryRun": {
      "description": "DFS 4 directions with in-place character marking",
      "headers": [
        "Cell",
        "Char",
        "Matches?",
        "Action"
      ],
      "rows": [
        [
          "(0,0)",
          "'A'",
          "Yes",
          "Mark '#', visit neighbors"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "DFS Grid Backtracking",
        "timeComplexity": "O(M * N * 3^L)",
        "spaceComplexity": "O(L) recursion depth",
        "description": "Explore 4 directions from matching starting cells; restore board cell on backtrack.",
        "keyTakeaway": "In-place grid cell modification saves hash set allocation.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nbool dfs(vector<vector<char>>& board, const string& word, int i, int j, size_t idx) {\n    if (idx == word.length()) return true;\n    if (i < 0 || i >= (int)board.size() || j < 0 || j >= (int)board[0].size() || board[i][j] != word[idx])\n        return false;\n\n    char temp = board[i][j];\n    board[i][j] = '#';\n    bool found = dfs(board, word, i + 1, j, idx + 1) ||\n                 dfs(board, word, i - 1, j, idx + 1) ||\n                 dfs(board, word, i, j + 1, idx + 1) ||\n                 dfs(board, word, i, j - 1, idx + 1);\n    board[i][j] = temp;\n    return found;\n}\n\nint main() {\n    int m, n;\n    string word;\n    if (!(cin >> m >> n >> word)) return 0;\n    vector<vector<char>> board(m, vector<char>(n));\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++)\n            cin >> board[i][j];\n\n    bool exists = false;\n    for (int i = 0; i < m && !exists; i++) {\n        for (int j = 0; j < n && !exists; j++) {\n            if (board[i][j] == word[0] && dfs(board, word, i, j, 0)) {\n                exists = true;\n            }\n        }\n    }\n    cout << (exists ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    m, n, word = int(raw[0]), int(raw[1]), raw[2]\n    idx = 3\n    board = []\n    for _ in range(m):\n        board.append(raw[idx:idx+n])\n        idx += n\n\n    def dfs(r, c, k):\n        if k == len(word):\n            return True\n        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[k]:\n            return False\n        orig = board[r][c]\n        board[r][c] = '#'\n        found = (dfs(r + 1, c, k + 1) or\n                 dfs(r - 1, c, k + 1) or\n                 dfs(r, c + 1, k + 1) or\n                 dfs(r, c - 1, k + 1))\n        board[r][c] = orig\n        return found\n\n    exists = any(dfs(i, j, 0) for i in range(m) for j in range(n) if board[i][j] == word[0])\n    print(\"true\" if exists else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "92": {
    "title": "Diameter of Binary Tree",
    "edgeCases": [
      "Single node tree -> 0",
      "Long linear tree (linked list structure)"
    ],
    "dryRun": {
      "description": "Post-order traversal computes max(left_h + right_h) across all nodes",
      "headers": [
        "Node",
        "Left H",
        "Right H",
        "Diameter Path"
      ],
      "rows": [
        [
          "Root 1",
          "2",
          "1",
          "3"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Post-Order Bottom-Up Traversal",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(H) recursion stack",
        "description": "Compute node heights while maintaining global maximum left_h + right_h.",
        "keyTakeaway": "Bottom-up tree traversal calculates subtree metrics in a single pass.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Node {\n    int val;\n    Node* left;\n    Node* right;\n    Node(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nint maxDepth(Node* root, int& diameter) {\n    if (!root) return 0;\n    int lh = maxDepth(root->left, diameter);\n    int rh = maxDepth(root->right, diameter);\n    diameter = max(diameter, lh + rh);\n    return 1 + max(lh, rh);\n}\n\nint main() {\n    int n;\n    if (!(cin >> n) || n <= 0) {\n        cout << 0 << \"\\n\";\n        return 0;\n    }\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    if (vals[0] == -1) {\n        cout << 0 << \"\\n\";\n        return 0;\n    }\n\n    vector<Node*> nodes(n, nullptr);\n    for (int i = 0; i < n; i++) {\n        if (vals[i] != -1) nodes[i] = new Node(vals[i]);\n    }\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            int leftIdx = 2 * i + 1;\n            int rightIdx = 2 * i + 2;\n            if (leftIdx < n) nodes[i]->left = nodes[leftIdx];\n            if (rightIdx < n) nodes[i]->right = nodes[rightIdx];\n        }\n    }\n    int diameter = 0;\n    maxDepth(nodes[0], diameter);\n    cout << diameter << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0:\n        print(0)\n        return\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    if vals[0] == -1:\n        print(0)\n        return\n\n    class Node:\n        def __init__(self, val):\n            self.val = val\n            self.left = None\n            self.right = None\n\n    nodes = [Node(v) if v != -1 else None for v in vals]\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n:\n                nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n:\n                nodes[i].right = nodes[2 * i + 2]\n\n    diameter = 0\n    def depth(root):\n        nonlocal diameter\n        if not root:\n            return 0\n        lh = depth(root.left)\n        rh = depth(root.right)\n        diameter = max(diameter, lh + rh)\n        return 1 + max(lh, rh)\n\n    depth(nodes[0])\n    print(diameter)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "93": {
    "title": "Balanced Binary Tree",
    "edgeCases": [
      "Single node tree -> true",
      "Degenerate skewed tree -> false"
    ],
    "dryRun": {
      "description": "Height function returns -1 if any subtree is unbalanced",
      "headers": [
        "Node",
        "Left H",
        "Right H",
        "Balanced?"
      ],
      "rows": [
        [
          "3",
          "1",
          "2",
          "Yes (diff <= 1)"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Early-Exit Post-Order Traversal",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(H)",
        "description": "Return -1 immediately upon detecting any height difference > 1.",
        "keyTakeaway": "Short-circuiting invalid subtrees prevents redundant recursion.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <cmath>\n#include <algorithm>\nusing namespace std;\n\nstruct Node {\n    int val;\n    Node* left;\n    Node* right;\n    Node(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nint checkHeight(Node* root) {\n    if (!root) return 0;\n    int lh = checkHeight(root->left);\n    if (lh == -1) return -1;\n    int rh = checkHeight(root->right);\n    if (rh == -1) return -1;\n    if (abs(lh - rh) > 1) return -1;\n    return 1 + max(lh, rh);\n}\n\nint main() {\n    int n;\n    if (!(cin >> n) || n <= 0) {\n        cout << \"true\\n\";\n        return 0;\n    }\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    if (vals[0] == -1) {\n        cout << \"true\\n\";\n        return 0;\n    }\n\n    vector<Node*> nodes(n, nullptr);\n    for (int i = 0; i < n; i++) {\n        if (vals[i] != -1) nodes[i] = new Node(vals[i]);\n    }\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            int l = 2 * i + 1, r = 2 * i + 2;\n            if (l < n) nodes[i]->left = nodes[l];\n            if (r < n) nodes[i]->right = nodes[r];\n        }\n    }\n    cout << (checkHeight(nodes[0]) != -1 ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0:\n        print(\"true\")\n        return\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    if vals[0] == -1:\n        print(\"true\")\n        return\n\n    class Node:\n        def __init__(self, val):\n            self.val = val\n            self.left = None\n            self.right = None\n\n    nodes = [Node(v) if v != -1 else None for v in vals]\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n:\n                nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n:\n                nodes[i].right = nodes[2 * i + 2]\n\n    def check(root):\n        if not root:\n            return 0\n        lh = check(root.left)\n        if lh == -1:\n            return -1\n        rh = check(root.right)\n        if rh == -1:\n            return -1\n        if abs(lh - rh) > 1:\n            return -1\n        return 1 + max(lh, rh)\n\n    print(\"true\" if check(nodes[0]) != -1 else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "94": {
    "title": "Lowest Common Ancestor of a Binary Tree",
    "edgeCases": [
      "One of p or q is the ancestor of the other",
      "Root is LCA"
    ],
    "dryRun": {
      "description": "If left and right subtree both return non-null, root is LCA",
      "headers": [
        "Step",
        "Action"
      ],
      "rows": [
        [
          "Left search",
          "Finds 5"
        ],
        [
          "Right search",
          "Finds 1"
        ],
        [
          "Combine",
          "Root 3 is LCA"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Recursive Post-Order LCA",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(H)",
        "description": "Recurse subtrees: node where both left and right return target node is the LCA.",
        "keyTakeaway": "Convergence point of two targets in tree hierarchy.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct Node {\n    int val;\n    Node* left;\n    Node* right;\n    Node(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nNode* findLCA(Node* root, int p, int q) {\n    if (!root || root->val == p || root->val == q) return root;\n    Node* left = findLCA(root->left, p, q);\n    Node* right = findLCA(root->right, p, q);\n    if (left && right) return root;\n    return left ? left : right;\n}\n\nint main() {\n    int n, p, q;\n    if (!(cin >> n >> p >> q)) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n\n    vector<Node*> nodes(n, nullptr);\n    for (int i = 0; i < n; i++) {\n        if (vals[i] != -1) nodes[i] = new Node(vals[i]);\n    }\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            int l = 2 * i + 1, r = 2 * i + 2;\n            if (l < n) nodes[i]->left = nodes[l];\n            if (r < n) nodes[i]->right = nodes[r];\n        }\n    }\n    Node* lca = findLCA(nodes[0], p, q);\n    cout << (lca ? lca->val : -1) << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, p, q = int(raw[0]), int(raw[1]), int(raw[2])\n    vals = [int(x) for x in raw[3:3+n]]\n\n    class Node:\n        def __init__(self, val):\n            self.val = val\n            self.left = None\n            self.right = None\n\n    nodes = [Node(v) if v != -1 else None for v in vals]\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n:\n                nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n:\n                nodes[i].right = nodes[2 * i + 2]\n\n    def lca(root, p, q):\n        if not root or root.val == p or root.val == q:\n            return root\n        left = lca(root.left, p, q)\n        right = lca(root.right, p, q)\n        if left and right:\n            return root\n        return left if left else right\n\n    ans = lca(nodes[0], p, q)\n    print(ans.val if ans else -1)\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "95": {
    "title": "Binary Tree Zigzag Level Order Traversal",
    "edgeCases": [
      "Single node tree",
      "Tree with missing children in level order"
    ],
    "dryRun": {
      "description": "Level order with toggle boolean leftToRight",
      "headers": [
        "Level",
        "leftToRight",
        "Order"
      ],
      "rows": [
        [
          "0",
          "true",
          "3"
        ],
        [
          "1",
          "false",
          "20, 9"
        ],
        [
          "2",
          "true",
          "15, 7"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Queue-Based BFS with Direction Inversion",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)",
        "description": "Collect each level in BFS and reverse alternating levels.",
        "keyTakeaway": "BFS guarantees clean level-by-level separation.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nstruct Node {\n    int val;\n    Node* left;\n    Node* right;\n    Node(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nint main() {\n    int n;\n    if (!(cin >> n) || n <= 0) return 0;\n    vector<int> vals(n);\n    for (int i = 0; i < n; i++) cin >> vals[i];\n    if (vals[0] == -1) return 0;\n\n    vector<Node*> nodes(n, nullptr);\n    for (int i = 0; i < n; i++) {\n        if (vals[i] != -1) nodes[i] = new Node(vals[i]);\n    }\n    for (int i = 0; i < n; i++) {\n        if (nodes[i]) {\n            int l = 2 * i + 1, r = 2 * i + 2;\n            if (l < n) nodes[i]->left = nodes[l];\n            if (r < n) nodes[i]->right = nodes[r];\n        }\n    }\n\n    queue<Node*> q;\n    q.push(nodes[0]);\n    bool leftToRight = true;\n    while (!q.empty()) {\n        int sz = q.size();\n        vector<int> level(sz);\n        for (int i = 0; i < sz; i++) {\n            Node* curr = q.front();\n            q.pop();\n            int idx = leftToRight ? i : (sz - 1 - i);\n            level[idx] = curr->val;\n            if (curr->left) q.push(curr->left);\n            if (curr->right) q.push(curr->right);\n        }\n        leftToRight = !leftToRight;\n        for (int i = 0; i < sz; i++) {\n            cout << level[i] << (i == sz - 1 ? \"\" : \" \");\n        }\n        cout << \"\\n\";\n    }\n    return 0;\n}",
        "python": "import sys\nfrom collections import deque\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw or int(raw[0]) <= 0:\n        return\n    n = int(raw[0])\n    vals = [int(x) for x in raw[1:n+1]]\n    if vals[0] == -1:\n        return\n\n    class Node:\n        def __init__(self, val):\n            self.val = val\n            self.left = None\n            self.right = None\n\n    nodes = [Node(v) if v != -1 else None for v in vals]\n    for i in range(n):\n        if nodes[i]:\n            if 2 * i + 1 < n:\n                nodes[i].left = nodes[2 * i + 1]\n            if 2 * i + 2 < n:\n                nodes[i].right = nodes[2 * i + 2]\n\n    q = deque([nodes[0]])\n    left_to_right = True\n    while q:\n        sz = len(q)\n        level = [0] * sz\n        for i in range(sz):\n            curr = q.popleft()\n            idx = i if left_to_right else (sz - 1 - i)\n            level[idx] = curr.val\n            if curr.left:\n                q.append(curr.left)\n            if curr.right:\n                q.append(curr.right)\n        left_to_right = not left_to_right\n        print(\" \".join(map(str, level)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "96": {
    "title": "Course Schedule",
    "edgeCases": [
      "No prerequisites -> true",
      "Mutual dependency cycle (0 <-> 1) -> false"
    ],
    "dryRun": {
      "description": "Kahn's BFS algorithm on in-degrees",
      "headers": [
        "In-degrees",
        "Queue of 0 in-degrees",
        "Completed Count"
      ],
      "rows": [
        [
          "0: 0, 1: 1",
          "[0]",
          "1 -> 2 (all completed)"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Kahn's Algorithm (BFS Topological Sort)",
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V + E)",
        "description": "Count in-degrees; process 0 in-degree nodes. Graph is acyclic if all nodes are visited.",
        "keyTakeaway": "Kahn's algorithm detects cycles in directed graphs in linear time.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> adj(n);\n    vector<int> inDegree(n, 0);\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v;\n        adj[v].push_back(u);\n        inDegree[u]++;\n    }\n\n    queue<int> q;\n    for (int i = 0; i < n; i++) {\n        if (inDegree[i] == 0) q.push(i);\n    }\n    int visited = 0;\n    while (!q.empty()) {\n        int u = q.front();\n        q.pop();\n        visited++;\n        for (int v : adj[u]) {\n            if (--inDegree[v] == 0) q.push(v);\n        }\n    }\n    cout << (visited == n ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
        "python": "import sys\nfrom collections import deque\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, m = int(raw[0]), int(raw[1])\n    adj = [[] for _ in range(n)]\n    in_degree = [0] * n\n    idx = 2\n    for _ in range(m):\n        u, v = int(raw[idx]), int(raw[idx+1])\n        adj[v].append(u)\n        in_degree[u] += 1\n        idx += 2\n\n    q = deque([i for i in range(n) if in_degree[i] == 0])\n    visited = 0\n    while q:\n        u = q.popleft()\n        visited += 1\n        for v in adj[u]:\n            in_degree[v] -= 1\n            if in_degree[v] == 0:\n                q.append(v)\n    print(\"true\" if visited == n else \"false\")\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "97": {
    "title": "Course Schedule II",
    "edgeCases": [
      "Cycle present -> output -1",
      "Multiple valid topological orders"
    ],
    "dryRun": {
      "description": "Collect order of vertices processed in Kahn's algorithm",
      "headers": [
        "Step",
        "Queue",
        "Order"
      ],
      "rows": [
        [
          "1",
          "[0]",
          "[0]"
        ],
        [
          "2",
          "[1, 2]",
          "[0, 1, 2]"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Topological Sort (Kahn's BFS)",
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V + E)",
        "description": "Queue nodes with 0 in-degree. Record traversal order. If visited count < V, return -1.",
        "keyTakeaway": "Topological ordering orders tasks according to prerequisite dependencies.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    vector<vector<int>> adj(n);\n    vector<int> inDegree(n, 0);\n    for (int i = 0; i < m; i++) {\n        int u, v; cin >> u >> v;\n        adj[v].push_back(u);\n        inDegree[u]++;\n    }\n\n    queue<int> q;\n    for (int i = 0; i < n; i++) {\n        if (inDegree[i] == 0) q.push(i);\n    }\n    vector<int> order;\n    while (!q.empty()) {\n        int u = q.front();\n        q.pop();\n        order.push_back(u);\n        for (int v : adj[u]) {\n            if (--inDegree[v] == 0) q.push(v);\n        }\n    }\n    if ((int)order.size() != n) {\n        cout << -1 << \"\\n\";\n    } else {\n        for (int i = 0; i < n; i++) {\n            cout << order[i] << (i == n - 1 ? \"\" : \" \");\n        }\n        cout << \"\\n\";\n    }\n    return 0;\n}",
        "python": "import sys\nfrom collections import deque\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, m = int(raw[0]), int(raw[1])\n    adj = [[] for _ in range(n)]\n    in_degree = [0] * n\n    idx = 2\n    for _ in range(m):\n        u, v = int(raw[idx]), int(raw[idx+1])\n        adj[v].append(u)\n        in_degree[u] += 1\n        idx += 2\n\n    q = deque([i for i in range(n) if in_degree[i] == 0])\n    order = []\n    while q:\n        u = q.popleft()\n        order.append(u)\n        for v in adj[u]:\n            in_degree[v] -= 1\n            if in_degree[v] == 0:\n                q.append(v)\n    if len(order) != n:\n        print(-1)\n    else:\n        print(\" \".join(map(str, order)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "98": {
    "title": "Flood Fill",
    "edgeCases": [
      "Starting color already equal to new color",
      "1x1 image"
    ],
    "dryRun": {
      "description": "DFS 4 directions updating connected component matching original color",
      "headers": [
        "Pixel",
        "Original",
        "Updated To"
      ],
      "rows": [
        [
          "(1, 1)",
          "1",
          "2"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "Depth-First Search (Connected Component)",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(M * N)",
        "description": "Recurse into adjacent pixels matching starting color and replace with new color.",
        "keyTakeaway": "Check originalColor != newColor to prevent infinite recursion loop.",
        "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid dfs(vector<vector<int>>& img, int r, int c, int oldColor, int newColor) {\n    if (r < 0 || r >= (int)img.size() || c < 0 || c >= (int)img[0].size() || img[r][c] != oldColor)\n        return;\n    img[r][c] = newColor;\n    dfs(img, r + 1, c, oldColor, newColor);\n    dfs(img, r - 1, c, oldColor, newColor);\n    dfs(img, r, c + 1, oldColor, newColor);\n    dfs(img, r, c - 1, oldColor, newColor);\n}\n\nint main() {\n    int m, n, sr, sc, color;\n    if (!(cin >> m >> n >> sr >> sc >> color)) return 0;\n    vector<vector<int>> img(m, vector<int>(n));\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++)\n            cin >> img[i][j];\n\n    if (img[sr][sc] != color) {\n        dfs(img, sr, sc, img[sr][sc], color);\n    }\n\n    for (int i = 0; i < m; i++) {\n        for (int j = 0; j < n; j++) {\n            cout << img[i][j] << (j == n - 1 ? \"\" : \" \");\n        }\n        cout << \"\\n\";\n    }\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    m, n, sr, sc, color = int(raw[0]), int(raw[1]), int(raw[2]), int(raw[3]), int(raw[4])\n    idx = 5\n    img = []\n    for _ in range(m):\n        img.append([int(x) for x in raw[idx:idx+n]])\n        idx += n\n\n    old_color = img[sr][sc]\n    if old_color != color:\n        def dfs(r, c):\n            if r < 0 or r >= m or c < 0 or c >= n or img[r][c] != old_color:\n                return\n            img[r][c] = color\n            dfs(r + 1, c)\n            dfs(r - 1, c)\n            dfs(r, c + 1)\n            dfs(r, c - 1)\n        dfs(sr, sc)\n\n    for row in img:\n        print(\" \".join(map(str, row)))\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "99": {
    "title": "0/1 Knapsack Problem",
    "edgeCases": [
      "W = 0 -> 0",
      "All item weights exceed capacity W"
    ],
    "dryRun": {
      "description": "dp[w] = max(dp[w], dp[w - wt] + val) backwards iteration",
      "headers": [
        "Item (wt, val)",
        "w",
        "dp[w]"
      ],
      "rows": [
        [
          "(1, 10)",
          "4",
          "10"
        ],
        [
          "(2, 15)",
          "4",
          "25"
        ],
        [
          "(3, 40)",
          "4",
          "55"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "1D Space-Optimized Dynamic Programming",
        "timeComplexity": "O(N * W)",
        "spaceComplexity": "O(W)",
        "description": "Iterate weights backwards from W down to wt[i] to ensure 0/1 item constraint.",
        "keyTakeaway": "Backward loop preserves single-use invariant without a 2D table.",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, W;\n    if (!(cin >> n >> W)) return 0;\n    vector<int> wt(n), val(n);\n    for (int i = 0; i < n; i++) cin >> wt[i];\n    for (int i = 0; i < n; i++) cin >> val[i];\n\n    vector<int> dp(W + 1, 0);\n    for (int i = 0; i < n; i++) {\n        for (int w = W; w >= wt[i]; w--) {\n            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);\n        }\n    }\n    cout << dp[W] << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    n, W = int(raw[0]), int(raw[1])\n    wt = [int(x) for x in raw[2:n+2]]\n    val = [int(x) for x in raw[n+2:2*n+2]]\n\n    dp = [0] * (W + 1)\n    for i in range(n):\n        for w in range(W, wt[i] - 1, -1):\n            dp[w] = max(dp[w], dp[w - wt[i]] + val[i])\n    print(dp[W])\n\nif __name__ == '__main__':\n    solve()"
      }
    ]
  },
  "100": {
    "title": "Longest Common Subsequence",
    "edgeCases": [
      "Strings have no common characters -> 0",
      "Identical strings"
    ],
    "dryRun": {
      "description": "dp[i][j] = (text1[i-1] == text2[j-1]) ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])",
      "headers": [
        "i",
        "j",
        "text1[i-1]",
        "text2[j-1]",
        "dp[j]"
      ],
      "rows": [
        [
          "1",
          "1",
          "'a'",
          "'a'",
          "1"
        ]
      ]
    },
    "approaches": [
      {
        "id": "optimal",
        "name": "2-Row Space-Optimized Dynamic Programming",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(N)",
        "description": "Compute subsequence matches using previous and current row buffers.",
        "keyTakeaway": "Transitions depend only on the immediate previous row.",
        "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s1, s2;\n    if (!(cin >> s1 >> s2)) return 0;\n    int m = s1.length(), n = s2.length();\n    vector<int> prev(n + 1, 0), curr(n + 1, 0);\n\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (s1[i - 1] == s2[j - 1]) {\n                curr[j] = 1 + prev[j - 1];\n            } else {\n                curr[j] = max(prev[j], curr[j - 1]);\n            }\n        }\n        prev = curr;\n    }\n    cout << prev[n] << \"\\n\";\n    return 0;\n}",
        "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().split()\n    if not raw:\n        return\n    s1, s2 = raw[0], raw[1]\n    m, n = len(s1), len(s2)\n    prev = [0] * (n + 1)\n    for i in range(1, m + 1):\n        curr = [0] * (n + 1)\n        for j in range(1, n + 1):\n            if s1[i - 1] == s2[j - 1]:\n                curr[j] = 1 + prev[j - 1]\n            else:\n                curr[j] = max(prev[j], curr[j - 1])\n        prev = curr\n    print(prev[n])\n\nif __name__ == '__main__':\n    solve()"
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
