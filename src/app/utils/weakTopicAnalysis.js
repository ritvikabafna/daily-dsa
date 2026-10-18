/**
 * Analyzes submission history, verdicts, and topics to detect weak areas
 * and generate personalized problem recommendations based on difficulty and past performance.
 */
export function analyzeWeakTopics(submissions = [], problems = [], solvedProblems = []) {
  const solvedSet = new Set(solvedProblems);
  const topicMap = new Map();

  // Initialize all topics from problems catalog
  for (const prob of problems) {
    const topic = prob.topic || "General";
    if (!topicMap.has(topic)) {
      topicMap.set(topic, {
        topic,
        totalProblems: 0,
        problemsList: [],
        solvedCount: 0,
        totalAttempts: 0,
        wrongAttempts: 0,
        acceptedAttempts: 0,
        failedProblemIds: new Set(),
      });
    }

    const tData = topicMap.get(topic);
    tData.totalProblems += 1;
    tData.problemsList.push(prob);
    if (solvedSet.has(prob.id)) {
      tData.solvedCount += 1;
    }
  }

  // Aggregate submissions per topic
  for (const sub of submissions) {
    const prob = problems.find((p) => p.id === sub.problemId);
    if (!prob) continue;

    const topic = prob.topic || "General";
    const tData = topicMap.get(topic);
    if (!tData) continue;

    tData.totalAttempts += 1;
    const isAccepted = sub.verdict === "ACCEPTED";

    if (isAccepted) {
      tData.acceptedAttempts += 1;
    } else {
      tData.wrongAttempts += 1;
      tData.failedProblemIds.add(prob.id);
    }
  }

  // Compute metrics & weakness score per topic
  const topicStats = Array.from(topicMap.values()).map((t) => {
    const solvedPercent =
      t.totalProblems > 0 ? Math.round((t.solvedCount / t.totalProblems) * 100) : 0;
    const errorRate =
      t.totalAttempts > 0 ? Math.round((t.wrongAttempts / t.totalAttempts) * 100) : 0;
    const accuracy =
      t.totalAttempts > 0 ? Math.round((t.acceptedAttempts / t.totalAttempts) * 100) : 0;

    let status = "Not Started";
    if (t.solvedCount === t.totalProblems && t.totalProblems > 0) {
      status = "Mastered";
    } else if (t.wrongAttempts >= 2 || (t.totalAttempts >= 2 && errorRate >= 50)) {
      status = "Needs Focus";
    } else if (t.totalAttempts > 0 || t.solvedCount > 0) {
      status = "In Progress";
    }

    // Higher score = higher priority for intervention
    const weaknessScore =
      t.wrongAttempts * 10 +
      errorRate * 0.5 -
      solvedPercent * 0.2;

    const unsolvedProblems = t.problemsList.filter((p) => !solvedSet.has(p.id));

    return {
      topic: t.topic,
      totalProblems: t.totalProblems,
      solvedCount: t.solvedCount,
      unsolvedProblems,
      solvedPercent,
      totalAttempts: t.totalAttempts,
      wrongAttempts: t.wrongAttempts,
      acceptedAttempts: t.acceptedAttempts,
      failedProblemCount: t.failedProblemIds.size,
      errorRate,
      accuracy,
      status,
      weaknessScore,
    };
  });

  // Filter topics with setbacks / wrong answers
  const weakTopics = topicStats
    .filter((t) => t.wrongAttempts > 0 && t.unsolvedProblems.length > 0)
    .sort((a, b) => b.weaknessScore - a.weaknessScore);

  // Generate personalized recommendations
  const recommendedProblems = [];
  const recommendedIds = new Set();

  // 1. Target weak topics first
  for (const topicStat of weakTopics) {
    if (recommendedProblems.length >= 3) break;

    const unsolved = topicStat.unsolvedProblems;
    const unsolvedEasy = unsolved.filter((p) => p.difficulty === "Easy");
    const unsolvedMedium = unsolved.filter((p) => p.difficulty === "Medium");

    // If user has unresolved failures, recommend an Easy to rebuild foundation, or Medium if Easy is already solved
    let pickedProblem = null;
    let rationale = "";
    let badge = "";

    if (unsolvedEasy.length > 0) {
      pickedProblem = unsolvedEasy[0];
      badge = "Reinforce Foundation";
      rationale = `You encountered ${topicStat.wrongAttempts} wrong answer${
        topicStat.wrongAttempts === 1 ? "" : "s"
      } in ${topicStat.topic}. Solidify your fundamentals with this Easy challenge.`;
    } else if (unsolvedMedium.length > 0) {
      pickedProblem = unsolvedMedium[0];
      badge = "Overcome Setback";
      rationale = `Level up your ${topicStat.topic} skills. Master this Medium challenge to build algorithmic confidence.`;
    } else if (unsolved.length > 0) {
      pickedProblem = unsolved[0];
      badge = "Practice Focus";
      rationale = `Next challenge to reinforce your ${topicStat.topic} intuition.`;
    }

    if (pickedProblem && !recommendedIds.has(pickedProblem.id)) {
      recommendedIds.add(pickedProblem.id);
      recommendedProblems.push({
        ...pickedProblem,
        badge,
        rationale,
        topic: topicStat.topic,
      });
    }
  }

  // 2. Fill remaining slots with next progressive problems (In Progress or Not Started topics)
  if (recommendedProblems.length < 3) {
    const nonWeakTopics = topicStats
      .filter((t) => !weakTopics.some((wt) => wt.topic === t.topic) && t.unsolvedProblems.length > 0)
      .sort((a, b) => {
        // Prioritize in-progress topics, then unstarted
        if (a.solvedCount > 0 && b.solvedCount === 0) return -1;
        if (b.solvedCount > 0 && a.solvedCount === 0) return 1;
        return a.solvedPercent - b.solvedPercent;
      });

    for (const topicStat of nonWeakTopics) {
      if (recommendedProblems.length >= 3) break;

      const unsolved = topicStat.unsolvedProblems;
      const unsolvedEasy = unsolved.filter((p) => p.difficulty === "Easy");
      const unsolvedMedium = unsolved.filter((p) => p.difficulty === "Medium");

      const pickedProblem =
        unsolvedEasy.length > 0
          ? unsolvedEasy[0]
          : unsolvedMedium.length > 0
          ? unsolvedMedium[0]
          : unsolved[0];

      if (pickedProblem && !recommendedIds.has(pickedProblem.id)) {
        recommendedIds.add(pickedProblem.id);
        const isProgress = topicStat.solvedCount > 0;

        recommendedProblems.push({
          ...pickedProblem,
          badge: isProgress ? "Next In Path" : "Expand Breadth",
          rationale: isProgress
            ? `Continue your momentum in ${topicStat.topic} (${topicStat.solvedCount}/${topicStat.totalProblems} solved).`
            : `Broaden your horizons by exploring ${topicStat.topic} concepts.`,
          topic: topicStat.topic,
        });
      }
    }
  }

  return {
    topicStats,
    weakTopics,
    recommendedProblems,
    hasWeakTopics: weakTopics.length > 0,
    totalFailures: topicStats.reduce((acc, t) => acc + t.wrongAttempts, 0),
  };
}
