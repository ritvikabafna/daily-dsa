// Smart Spaced Repetition & Revision System for Daily DSA

export const DEFAULT_INTERVALS = {
  difficult: 2, // 2 days for challenging problems or repeated mistakes
  medium: 5,    // 5 days for standard problems
  easy: 14,     // 14 days for problems solved smoothly
};

export const INTERVAL_MULTIPLIERS = {
  difficult: 1.0, // resets to tight loop for difficult reviews
  medium: 1.8,    // steady expansion for solid recall
  easy: 2.2,      // rapid spacing for strong mastery
};

/**
 * Computes the smart revision schedule from solved problems and past submission performance.
 *
 * @param {Object} params
 * @param {number[]} params.solvedProblemIds - List of solved problem IDs
 * @param {Array} params.submissions - User's submission history
 * @param {Array} params.problems - Catalog of all 32 curated problems
 * @param {Object} [params.existingSchedule={}] - Stored revision state
 * @param {Date} [params.now=new Date()] - Reference timestamp for deterministic testing
 * @returns {Object} Full revision schedule, categorized lists, and metrics
 */
export function calculateRevisionSchedule({
  solvedProblemIds = [],
  submissions = [],
  problems = [],
  existingSchedule = {},
  now = new Date(),
}) {
  const currentTime = new Date(now).getTime();
  const problemMap = new Map(problems.map((p) => [p.id, p]));
  const schedule = { ...existingSchedule };

  // Analyze submissions per problem to detect struggles and repeated mistakes
  const submissionStatsByProblem = {};
  submissions.forEach((sub) => {
    const pid = Number(sub.problemId);
    if (!submissionStatsByProblem[pid]) {
      submissionStatsByProblem[pid] = {
        total: 0,
        failures: 0,
        verdicts: [],
        firstSolvedDate: null,
      };
    }
    const stats = submissionStatsByProblem[pid];
    stats.total += 1;
    if (sub.verdict !== "ACCEPTED") {
      stats.failures += 1;
      stats.verdicts.push(sub.verdict);
    } else if (!stats.firstSolvedDate && sub.createdAt) {
      stats.firstSolvedDate = new Date(sub.createdAt).toISOString();
    }
  });

  const uniqueSolvedIds = [...new Set(solvedProblemIds.map(Number))];

  uniqueSolvedIds.forEach((pid) => {
    const problem = problemMap.get(pid);
    if (!problem) return;

    const stats = submissionStatsByProblem[pid] || {
      total: 1,
      failures: 0,
      verdicts: [],
      firstSolvedDate: new Date(now).toISOString(),
    };

    const hasStruggled = stats.failures >= 2;
    const initialDifficulty = hasStruggled
      ? "difficult"
      : stats.failures === 1
      ? "medium"
      : "easy";

    const initialInterval = DEFAULT_INTERVALS[initialDifficulty];

    if (!schedule[pid]) {
      const firstDate = stats.firstSolvedDate || new Date(now).toISOString();
      const firstDateTime = new Date(firstDate).getTime();
      const nextDue = new Date(
        firstDateTime + initialInterval * 24 * 60 * 60 * 1000
      ).toISOString();

      schedule[pid] = {
        problemId: pid,
        title: problem.title,
        difficulty: problem.difficulty,
        topic: problem.topic,
        firstSolvedDate: firstDate,
        lastRevisedDate: null,
        revisionCount: 0,
        currentIntervalDays: initialInterval,
        difficultyRating: initialDifficulty,
        nextDueDate: nextDue,
        struggled: hasStruggled,
        failureCount: stats.failures,
        history: [],
      };
    } else {
      // Ensure metadata fields are up-to-date
      schedule[pid] = {
        ...schedule[pid],
        title: problem.title,
        difficulty: problem.difficulty,
        topic: problem.topic,
        struggled: schedule[pid].struggled || hasStruggled,
        failureCount: Math.max(schedule[pid].failureCount || 0, stats.failures),
      };
    }
  });

  const dueList = [];
  const upcomingList = [];
  const completedList = [];

  Object.values(schedule).forEach((item) => {
    const dueTime = new Date(item.nextDueDate).getTime();
    const diffMs = currentTime - dueTime;
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    const isDue = currentTime >= dueTime;
    const status = isDue
      ? diffDays > 0
        ? "overdue"
        : "due_today"
      : "upcoming";

    const daysUntilDue = !isDue
      ? Math.ceil((dueTime - currentTime) / (24 * 60 * 60 * 1000))
      : 0;

    const enrichedItem = {
      ...item,
      status,
      daysOverdue: Math.max(0, diffDays),
      daysUntilDue,
    };

    if (isDue) {
      dueList.push(enrichedItem);
    } else {
      upcomingList.push(enrichedItem);
    }

    if (item.revisionCount > 0) {
      completedList.push(enrichedItem);
    }
  });

  // Sort dueList: overdue by most days first, then those with struggle flag
  dueList.sort((a, b) => {
    if (b.daysOverdue !== a.daysOverdue) {
      return b.daysOverdue - a.daysOverdue;
    }
    if (a.struggled !== b.struggled) {
      return a.struggled ? -1 : 1;
    }
    return a.problemId - b.problemId;
  });

  // Sort upcomingList by earliest due date
  upcomingList.sort(
    (a, b) =>
      new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime()
  );

  // Sort completedList by most recent revision
  completedList.sort(
    (a, b) =>
      new Date(b.lastRevisedDate || 0).getTime() -
      new Date(a.lastRevisedDate || 0).getTime()
  );

  const totalTracked = Object.keys(schedule).length;
  const dueCount = dueList.length;
  const completedRevisionsCount = Object.values(schedule).reduce(
    (acc, curr) => acc + (curr.revisionCount || 0),
    0
  );

  return {
    schedule,
    dueList,
    upcomingList,
    completedList,
    stats: {
      totalTracked,
      dueCount,
      upcomingCount: upcomingList.length,
      completedRevisionsCount,
      overdueCount: dueList.filter((item) => item.status === "overdue").length,
      dueTodayCount: dueList.filter((item) => item.status === "due_today").length,
    },
  };
}

/**
 * Records a completed revision and advances the spaced repetition interval.
 *
 * @param {Object} params
 * @param {Object} params.existingSchedule - Current schedule dictionary
 * @param {number} params.problemId - Problem being revised
 * @param {'difficult'|'medium'|'easy'} [params.rating='medium'] - Perceived difficulty of revision
 * @param {Date} [params.revisionDate=new Date()] - Revision completion timestamp
 * @returns {Object} Updated schedule dictionary
 */
export function recordRevisionCompletion({
  existingSchedule = {},
  problemId,
  rating = "medium",
  revisionDate = new Date(),
}) {
  const pid = Number(problemId);
  const current = existingSchedule[pid];

  if (!current) {
    return existingSchedule;
  }

  const baseInterval = current.currentIntervalDays || DEFAULT_INTERVALS[rating] || 5;
  let newIntervalDays;

  if (rating === "difficult") {
    newIntervalDays = DEFAULT_INTERVALS.difficult;
  } else if (rating === "easy") {
    newIntervalDays = Math.max(
      DEFAULT_INTERVALS.easy,
      Math.round(baseInterval * INTERVAL_MULTIPLIERS.easy)
    );
  } else {
    // medium
    newIntervalDays = Math.max(
      DEFAULT_INTERVALS.medium,
      Math.round(baseInterval * INTERVAL_MULTIPLIERS.medium)
    );
  }

  // Cap interval at 90 days
  newIntervalDays = Math.min(newIntervalDays, 90);

  const completionTime = new Date(revisionDate).getTime();
  const nextDueDate = new Date(
    completionTime + newIntervalDays * 24 * 60 * 60 * 1000
  ).toISOString();

  const historyEntry = {
    date: new Date(revisionDate).toISOString(),
    rating,
    intervalDays: newIntervalDays,
    revisionNumber: (current.revisionCount || 0) + 1,
  };

  const updatedItem = {
    ...current,
    lastRevisedDate: new Date(revisionDate).toISOString(),
    revisionCount: (current.revisionCount || 0) + 1,
    currentIntervalDays: newIntervalDays,
    difficultyRating: rating,
    nextDueDate,
    history: [...(current.history || []), historyEntry],
  };

  return {
    ...existingSchedule,
    [pid]: updatedItem,
  };
}

export function getStoredRevisionSchedule() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("daily_dsa_revision_schedule");
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Failed to read revision schedule from localStorage:", e);
    return {};
  }
}

export function saveStoredRevisionSchedule(schedule) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      "daily_dsa_revision_schedule",
      JSON.stringify(schedule)
    );
  } catch (e) {
    console.error("Failed to save revision schedule to localStorage:", e);
  }
}

